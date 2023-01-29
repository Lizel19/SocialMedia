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
