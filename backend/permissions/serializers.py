
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
from .models import Module, CustomPermissions, Policy


class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = "__all__"
        read_only_fields = ["id", "created_at", "updated_at"]

class CustomPermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomPermissions
        fields = ["uuid", "name", "code"]

class PolicySerializer(serializers.ModelSerializer):

    permissions = serializers.DictField(
        child=serializers.ListField(
            child=serializers.UUIDField()
        ),
        write_only=True,
        required=False
    )

    class Meta:
        model = Policy
        fields = [
            "id",
            "uuid",
            "name",
            "description",
            "permissions",
            "is_active",
            "is_default"
        ]

        read_only_fields = ["id", "uuid", "is_default"]

    def validate_permissions(self, value):
        validated_permissions = []

        for module_code, permission_uuids in value.items():

            try:
                module = Module.objects.get(code=module_code)
            except Module.DoesNotExist:
                return Response(
                    {
                        "message": "Invalid module code."
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            permissions = CustomPermissions.objects.filter(
                module=module,
                uuid__in=permission_uuids
            )

            if permissions.count() != len(set(permission_uuids)):
                
                return Response(
                    {
                        "message": "Cannot delete a role assigned to users."
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            validated_permissions.extend(permissions)

        return validated_permissions

    def create(self, validated_data):

        permissions = validated_data.pop("permissions", [])

        policy = Policy.objects.create(**validated_data)

        policy.permissions.set(permissions)

        return policy

    def update(self, instance, validated_data):

        permissions = validated_data.pop("permissions", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        if permissions is not None:
            instance.permissions.set(permissions)

        return instance

    def to_representation(self, instance):
        data = super().to_representation(instance)

        grouped_permissions = {}

        permissions = instance.permissions.select_related("module").all()

        for permission in permissions:
            module_code = permission.module.code

            grouped_permissions.setdefault(module_code, []).append(
                str(permission.uuid)
            )

        data["permissions"] = grouped_permissions

        return data



class PermissionModuleSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="code", read_only=True)
    permissions = CustomPermissionSerializer(many=True, read_only=True)

    class Meta:
        model = Module
        fields = ["id", "name", "permissions"]
