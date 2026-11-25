import uuid

from django.db import models
from django.contrib.auth.models import AbstractUser,Group
from django.forms import ValidationError

from permissions.models import Policy
from core.validators import NAME_REGEX_VALIDATOR

# Create your models here.
class UserRole(models.Model):
    uuid = models.UUIDField(default = uuid.uuid4, editable = False)
    name = models.CharField(max_length=100, unique=True)
    code = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    policies = models.ManyToManyField(
        Policy,
        related_name="roles",
        blank=True
    )

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class CustomUser(AbstractUser):
    uuid = models.UUIDField(default = uuid.uuid4, editable = False)
    first_name = models.CharField(max_length = 30, blank = True,validators = [NAME_REGEX_VALIDATOR])
    last_name = models.CharField(max_length = 30, blank = True,validators = [NAME_REGEX_VALIDATOR])
    is_active = models.BooleanField(default = True)
    is_deleted = models.BooleanField(default = False)

    roles = models.ManyToManyField(
        UserRole,
        related_name="users",
        blank=True
    )

    def save(self, *args, **kwargs):
        import re
        if self.first_name and not re.match(r"^[a-zA-Z](?:[a-zA-Z ]*[a-zA-Z])?$",self.first_name):
            raise ValidationError(
                {'name': 'Invalid name format'}
            )  # Validate before saving
        elif self.last_name and not re.match(r"^[a-zA-Z](?:[a-zA-Z ]*[a-zA-Z])?$",self.last_name):
            raise ValidationError(
                {'name': 'Invalid name format'}
            )  # Validate before saving

        super().save(*args, **kwargs)
    
