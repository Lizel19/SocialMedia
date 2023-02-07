from django.contrib.auth.models import AbstractUser
from django.db import models


def upload_path(instance, filname):
    #return '/'.join(['covers', str(instance.title), filname])
    return '/'.join([filname])

class Outfit(models.Model):
    title = models.CharField(max_length=32, blank=False)
    cover = models.ImageField(blank=True, null=True, upload_to=upload_path)

class User(AbstractUser):
    full_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def image_path(instance, filename):
    return 'posting/{filename}'.format(filename=filename)

class Posting(models.Model):
    post_id = models.AutoField(primary_key=True)
    user_id = models.IntegerField(null=True)
    content = models.TextField(blank=False)
    image = models.ImageField(upload_to=image_path, default='posting/image.jpg')
    created_at = models. DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

def upload_path(instance, filname):
    #return '/'.join(['image', str(instance.content), filname])
    return '/'.join([filname])

class Outfit(models.Model):
    post_id = models.AutoField(primary_key=True)
    user_id = models.IntegerField(null=True)
    content = models.CharField(max_length=255, blank=False)
    image = models.ImageField(blank=True, null=True, upload_to=upload_path)
    date_created = models. DateTimeField(auto_now_add=True)
