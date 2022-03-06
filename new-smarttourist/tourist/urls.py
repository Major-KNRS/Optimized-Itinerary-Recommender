from django.urls import path
from .apiviews import UserCreate, UserUpdate, CustomAuthToken
from rest_framework.authtoken import views

urlpatterns = [
    path("", UserCreate.as_view(), name="user_create"),
    path("login",CustomAuthToken.as_view(),name="login"),
    path("<int:pk>/", UserUpdate.as_view(), name="user_update"),
]