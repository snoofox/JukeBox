from . import views
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView

router = routers.DefaultRouter()
router.register(r'songs', views.SongViewSet, basename='song')
router.register(r'playlists', views.PlaylistViewSet, basename='playlist')
router.register(r'popular', views.PopularPostView, basename='popular')

urlpatterns = [
    path('', views.HelloWorldView.as_view(), name="home_page"),
    path('api/', include(router.urls)),
    path('search/', views.SearchView.as_view(), name='search'),
    path('auth/register/', views.UserCreateView.as_view(), name="register"),
    path('auth/token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
