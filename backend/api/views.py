from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework import generics, permissions, viewsets
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Playlist, Song
from .serializers import (MyTokenObtainPairSerializer, PlaylistSerializer,
                          SongSerializer, UserSerializer)


class HelloWorldView(APIView):
    permissions = [permissions.AllowAny, ]

    def get(self, request):
        return Response({"message": "Hello, World!"})


class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.order_by('-created_at')
    serializer_class = SongSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = LimitOffsetPagination

    def get_permissions(self):
        if self.action == "list" or self.action == "retrieve":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views += 1
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.order_by('-created_at')
    serializer_class = PlaylistSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = LimitOffsetPagination

    def get_permissions(self):
        if self.action == "list" or self.action == "retrieve":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


class SearchView(generics.ListAPIView):
    serializer_class = SongSerializer
    permission_classes = [permissions.AllowAny, ]

    def get_queryset(self):
        query = self.request.GET.get("q")
        object_list = Song.objects.filter(Q(title__icontains=query) | Q(
            lyrics__icontains=query) | Q(playlist__title__icontains=query)).distinct()
        return object_list


class PopularPostView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny, ]
    queryset = Song.objects.all().order_by('-views')
    serializer_class = SongSerializer
    http_method_names = ['get', 'head']


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
