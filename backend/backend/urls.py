from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from user.views import CustomTokenObtainPairView
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('Post.urls')),
    path('api/notification', include('notification.urls')),
    path('api/', include('Search.urls')),
    path('api/', include('comment.urls')),

    path("admin/", admin.site.urls),
    path("api/token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    # path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/", include("user.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)