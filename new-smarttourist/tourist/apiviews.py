from rest_framework import generics
from .models import User
from .serializers import UserSerializer, UserUpdateSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class UserCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserUpdate(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer