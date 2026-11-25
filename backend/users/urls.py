from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import login_view, UserViewSet, RoleViewSet

router = DefaultRouter()
router.register("users", UserViewSet, basename="user")
router.register("roles", RoleViewSet, basename="role")

urlpatterns = [
    path("login/", login_view, name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("", include(router.urls)),
]