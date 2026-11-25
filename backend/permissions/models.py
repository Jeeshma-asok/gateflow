from django.db import models
import uuid
# Create your models here.

class Module(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    code = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class CustomPermissions(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    module = models.ForeignKey(
        Module,
        on_delete=models.CASCADE,
        related_name="permissions"
    )
    name = models.CharField(max_length=100)
    code = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    class Meta:
        unique_together = ("module", "name")

    def __str__(self):
        return f"{self.module.name} - {self.name}"


class Policy(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=150, unique=True)
    code = models.SlugField(max_length=150, unique=True)
    description = models.TextField(blank=True)

    permissions = models.ManyToManyField(
        CustomPermissions,
        related_name="policies",
        blank=True
    )

    is_default = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
