from django.urls import path
from .apiviews import UserCreate, UserUpdate
from rest_framework.authtoken import views

urlpatterns = [
    path("", UserCreate.as_view(), name="user_create"),
    path("login",views.obtain_auth_token,name="login"),
    path("<int:pk>/", UserUpdate.as_view(), name="user_update"),
]