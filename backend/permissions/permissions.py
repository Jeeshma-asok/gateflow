
from rest_framework.permissions import BasePermission


class HasRBACPermission(BasePermission):

    message = "You don't have permission to perform this action."

    ACTION_PERMISSION_MAP = {
        "list": "view",
        "retrieve": "view",
        "create": "create",
        "update": "edit",
        "toggle_status": "edit",
        "destroy": "delete",
    }

    RESOURCE_MAP = {
        "users": "users",
        "roles": "roles",
        "policies": "policy",
    }

    def has_permission(self, request, view):

        user = request.user

        if not user or not user.is_authenticated:
            return False

        if user.is_superuser:
            return True

        action = getattr(view, "action", None)

        permission_action = self.ACTION_PERMISSION_MAP.get(action)
        resource = getattr(view, "permission_resource", None)

        if not permission_action or not resource:
            return False

        permission_resource = self.RESOURCE_MAP.get(resource)

        if not permission_resource:
            return False

        permission_code = f"{permission_action}_{permission_resource}"

        return user.roles.filter(
            is_active=True,
            policies__is_active=True,
            policies__permissions__code=permission_code,
        ).exists()
