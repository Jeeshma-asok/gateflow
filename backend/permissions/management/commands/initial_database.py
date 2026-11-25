"""
GateFlow – initial RBAC database seed
=====================================

Place this file at:
    <project_root>/permissions/management/commands/seed_initial_data.py

Create the folders __init__.py if they do not already exist, then run:
    python manage.py seed_initial_data

Assumed model structure (adjust the import paths/field names if yours differ):
- users.CustomUser extends AbstractUser; USERNAME_FIELD = "email"
- user_role.Role: name, code, description, is_active, permissions (M2M)
- permissions.Module: name, code (unique SlugField), description, is_active
- permissions.Permission: module (FK), name, code, description
- CustomUser.user_role is a ManyToManyField to Role

This command is idempotent: running it again updates/keeps the same seed records
instead of creating duplicates. It creates an admin account only when it does
not already exist. Set GATEFLOW_ADMIN_PASSWORD before running in production.
"""

import os
from getpass import getpass

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from django.utils.text import slugify

from users.models import UserRole
from permissions.models import Module, CustomPermissions, Policy


MODULES = {
    "dashboard": {
        "name": "Dashboard",
        "description": "Overview and analytics",
        "permissions": [
            ("view_dashboard", "View Dashboard", "View dashboard information"),
        ],
    },
    "users": {
        "name": "Users",
        "description": "User account management",
        "permissions": [
            ("view_users", "View Users", "View the user list and details"),
            ("create_users", "Create Users", "Create user accounts"),
            ("edit_users", "Edit Users", "Update user accounts"),
            ("delete_users", "Delete Users", "Delete or deactivate user accounts"),
        ],
    },
    "roles": {
        "name": "Roles",
        "description": "Role management",
        "permissions": [
            ("view_roles", "View Roles", "View roles and their assignments"),
            ("create_roles", "Create Roles", "Create roles"),
            ("edit_roles", "Edit Roles", "Update roles"),
            ("delete_roles", "Delete Roles", "Delete roles"),
        ],
    },
    "policy": {
        "name": "Permissions",
        "description": "Module and permission policy management",
        "permissions": [
            ("view_policy", "View Policies", "View modules and permissions"),
            ("create_policy", "Create Policies", "Create permission policies"),
            ("edit_policy", "Edit Policies", "Update permission policies"),
            ("delete_policy", "Delete Policies", "Delete permission policies"),
        ],
    },
}

ROLE_DEFINITIONS = [
    ("admin", "Admin", "Administrative access to day-to-day management")
]

DEFAULT_POLICY = [{
    "name": "All Permissions",
    "description": "Manage users, roles and application permissions.",
    "permissions": {
        "view_dashboard",
        "view_users", "create_users", "edit_users", "delete_users",
        "view_roles", "create_roles", "edit_roles", "delete_roles",
        "view_policy", "create_policy", "edit_policy", 'delete_policy',
    },
}]

ROLE_POLICY_CODES = {
    "admin": {
        "all-permissions",
    },
}

class Command(BaseCommand):
    help = "Create GateFlow's initial modules, permissions, roles, and admin user."

    @transaction.atomic
    def handle(self, *args, **options):
        all_permissions = []
        permissions_by_code = {}

        for module_code, module_data in MODULES.items():
            module, _ = Module.objects.update_or_create(
                code=module_code,
                defaults={
                    "name": module_data["name"],
                    "description": module_data["description"],
                },
            )

            for permission_code, permission_name, description in module_data["permissions"]:
                permission, _ = CustomPermissions.objects.update_or_create(
                    code=permission_code,
                    defaults={
                        "module": module,
                        "name": permission_name,
                        "description": description,
                    },
                )
                all_permissions.append(permission)
                permissions_by_code[permission_code] = permission


        policies_by_code = {}

        for policy_data in DEFAULT_POLICY:

            policy_code = slugify(policy_data["name"])

            policy, _ = Policy.objects.update_or_create(
                code=policy_code,
                defaults={
                    "name": policy_data["name"],
                    "description": policy_data["description"],
                    "is_default": True
                },
            )

            policies_by_code[policy_code] = policy

            selected_codes = policy_data.get("permissions", set())

            policy.permissions.set([
                permissions_by_code[code]
                for code in selected_codes
                if code in permissions_by_code
            ])



        roles_by_code = {}

        for role_code, role_name, description in ROLE_DEFINITIONS:

            role, _ = UserRole.objects.update_or_create(
                code=role_code,
                defaults={
                    "name": role_name,
                    "description": description,
                },
            )

            roles_by_code[role_code] = role

            if role_code == "super_admin":
                selected_policies = policies_by_code.values()
            else:
                selected_policy_codes = ROLE_POLICY_CODES.get(
                    role_code, set()
                )

                selected_policies = [
                    policies_by_code[code]
                    for code in selected_policy_codes
                    if code in policies_by_code
                ]

            role.policies.set(selected_policies)


        User = get_user_model()
        admin_email = os.getenv("GATEFLOW_ADMIN_EMAIL", "admin@gmail.com").strip().lower()

        if not admin_email:
            raise CommandError("GATEFLOW_ADMIN_EMAIL cannot be empty.")

        admin_user = User.objects.filter(email__iexact=admin_email).first()
        if admin_user is None:
            password = os.getenv("GATEFLOW_ADMIN_PASSWORD")
            if not password:
                if not os.isatty(0):
                    raise CommandError(
                        "Set GATEFLOW_ADMIN_PASSWORD before running non-interactively."
                    )
                password = getpass("Set password for the initial admin user: ")

            if not password:
                raise CommandError("Admin password cannot be empty.")

            admin_user = User(email=admin_email)

            if hasattr(admin_user, "username"):
                admin_user.username = admin_email
            if hasattr(admin_user, "first_name"):
                admin_user.first_name = "GateFlow"
            if hasattr(admin_user, "last_name"):
                admin_user.last_name = "Administrator"
            if hasattr(admin_user, "is_staff"):
                admin_user.is_staff = True
            if hasattr(admin_user, "is_superuser"):
                admin_user.is_superuser = False
            if hasattr(admin_user, "is_active"):
                admin_user.is_active = True

            admin_user.set_password(password)
            admin_user.save()
            self.stdout.write(self.style.SUCCESS(f"Created admin user: {admin_email}"))
        else:
            self.stdout.write(f"Admin user already exists: {admin_email}")

        if hasattr(admin_user, "roles"):
            admin_user.roles.add(roles_by_code["super_admin"])
