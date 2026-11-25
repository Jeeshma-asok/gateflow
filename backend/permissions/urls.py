from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import PolicyViewSet, PermissionModuleListView

router = DefaultRouter()
router.register("", PolicyViewSet, basename="policy")

urlpatterns = [
    path(
        "permission-modules/",
        PermissionModuleListView.as_view(),
        name="permission-modules"
    ),
    path("", include(router.urls)),
]