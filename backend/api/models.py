from django.db import models
from cloudinary_storage.storage import RawMediaCloudinaryStorage
from django.contrib.auth.models import User


class Playlist(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='playlist/', default='playlist/default.jpg')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    views = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Song(models.Model):
    title = models.CharField(max_length=100)
    file = models.FileField(upload_to='songs/', storage=RawMediaCloudinaryStorage())
    image = models.ImageField(upload_to='images/', default='images/default.jpg')
    artist = models.CharField(max_length=100, default='Unknown')
    playlist = models.ManyToManyField(Playlist, related_name='songs', blank=True)
    lyrics = models.TextField(blank=True)
    views = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
