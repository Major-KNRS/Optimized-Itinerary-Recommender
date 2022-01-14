from django.contrib import admin
from .models import Place
from django.contrib.gis import admin

# Register your models here.
admin.site.register(Place)