
from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Module, CustomPermissions, Policy
from .serializers import (
    PolicySerializer,
    PermissionModuleSerializer
)
from .permissions import HasRBACPermission

class PolicyViewSet(viewsets.ModelViewSet):

    queryset = Policy.objects.prefetch_related(
        "permissions",
        "permissions__module"
    ).all().order_by("-id")

    serializer_class = PolicySerializer

    permission_classes = [
        IsAuthenticated,
        HasRBACPermission
    ]

    permission_resource = "policies"

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.roles.exists():
            return Response(
                {
                    "success": False,
                    "message": "Cannot delete this policy because it is assigned to one or more roles."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        instance.delete()

        return Response(
            {
                "success": True,
                "message": "Policy deleted successfully."
            },
            status=status.HTTP_200_OK
        )

class PermissionModuleListView(generics.ListAPIView):
    serializer_class = PermissionModuleSerializer
    permission_classes = [IsAuthenticated]

    queryset = Module.objects.prefetch_related(
        "permissions"
    ).order_by("id")
