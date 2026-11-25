
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from permissions.models import Policy
from permissions.serializers import PolicySerializer
from .models import UserRole

User = get_user_model()

class RoleSerializer(serializers.ModelSerializer):

    policies = serializers.SlugRelatedField(
        many=True,
        slug_field="uuid",
        queryset=Policy.objects.filter(is_active=True),
        required=False
    )

    policy_details = PolicySerializer(
        source="policies",
        many=True,
        read_only=True
    )

    class Meta:
        model = UserRole
        fields = [
            "id",
            "uuid",
            "name",
            "code",
            "description",
            "policy_details",
            "policies",
            "is_active",
        ]
        read_only_fields = ["id", "uuid", "code"]

    def create(self, validated_data):
        policies = validated_data.pop("policies", [])
        validated_data["code"] = slugify(validated_data["name"])
        role = UserRole.objects.create(**validated_data)
        role.policies.set(policies)
        return role

    def update(self, instance, validated_data):
        policies = validated_data.pop("policies", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        if policies is not None:
            instance.policies.set(policies)

        return instance

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        required=False,
        min_length=8
    )

    roles = serializers.SlugRelatedField(
        many=True,
        slug_field="uuid",
        queryset=UserRole.objects.filter(is_active=True),
        required=False
    )

    role_details = RoleSerializer(
        source="roles",
        many=True,
        read_only=True
    )


    class Meta:
        model = User
        fields = [
            "id",
            "uuid",
            "email",
            "username",
            "first_name",
            "last_name",
            "password",
            "role_details",
            "is_active",
            "roles"
        ]

        read_only_fields = ["id", "uuid"]

    def create(self, validated_data):
        roles = validated_data.pop("roles", [])
        password = validated_data.pop("password", None)

        if not password:
            raise serializers.ValidationError({
                "password": "Password is required."
            })

        user = User(**validated_data)
        user.set_password(password)
        user.save()
        user.roles.set(roles)

        return user

    def update(self, instance, validated_data):
        roles = validated_data.pop("roles", None)
        password = validated_data.pop("password", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()

        if roles is not None:
            instance.roles.set(roles)

        return instance


