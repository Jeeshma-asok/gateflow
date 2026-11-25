from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.db.models import Q

from rest_framework.exceptions import ValidationError
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.exceptions import PermissionDenied
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action

from permissions.permissions import HasRBACPermission
from common.api_permissions import IsAdminOrReadOnlyForAuthenticated
from .serializers import UserSerializer, RoleSerializer
from .models import UserRole
from .pagination import UserPagination

@api_view(['POST'])
def login_view(request):

    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(
        request,
        username=email,
        password=password
    )

    if user is None:
        return Response(
            {"message": "Invalid email or password"},
            status=status.HTTP_401_UNAUTHORIZED
        )

    refresh = RefreshToken.for_user(user)

    return Response({
        "message": "Login successful",
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }, status=status.HTTP_200_OK)


User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):

    serializer_class = UserSerializer

    permission_classes = [
        IsAuthenticated,
        HasRBACPermission
    ]

    permission_resource = "users"

    queryset = User.objects.exclude(
            is_superuser=True
        ).distinct().prefetch_related(
        "roles",
        "roles__policies"
    ).order_by("-id")

    def perform_destroy(self, instance):

        instance.delete()

    @action(detail=True, methods=["patch"], url_path="toggle-status")
    def toggle_status(self, request, pk=None):

        user = self.get_object()

        if user.is_superuser:
            return Response(
                {
                    "success": False,
                    "message": "Cannot change superuser status."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        user.is_active = not user.is_active
        user.save(update_fields=["is_active"])

        return Response(
            {
                "success": True,
                "message": (
                    "User activated successfully."
                    if user.is_active
                    else "User deactivated successfully."
                ),
                "is_active": user.is_active
            },
            status=status.HTTP_200_OK
        )


class RoleViewSet(viewsets.ModelViewSet):

    serializer_class = RoleSerializer

    permission_classes = [
        IsAuthenticated,
        HasRBACPermission
    ]

    permission_resource = "roles"

    queryset = UserRole.objects.prefetch_related(
        "policies",
        "policies__permissions"
    ).order_by("-id")

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.users.exists():
            return Response({
                "success": False,
                "message": "Cannot delete a role assigned to users."
            }, status=status.HTTP_400_BAD_REQUEST)

        self.perform_destroy(instance)

        return Response({
            "success": True,
            "message": "Role deleted successfully."
        }, status=status.HTTP_200_OK)
