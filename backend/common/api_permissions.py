from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminOrReadOnlyForAuthenticated(BasePermission):

    def has_permission(self, request, view):

        user = request.user

        if not user or not user.is_authenticated:
            return False

        # Allow authenticated users to read
        if request.method in SAFE_METHODS:
            return True

        # Only Admin/Super Admin can modify
        return user.is_staff or user.is_superuser