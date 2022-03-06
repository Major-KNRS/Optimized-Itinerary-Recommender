from unittest.util import _MAX_LENGTH
from rest_framework import serializers
from .models import Place, Rating

class PlaceSerializer(serializers.ModelSerializer):
    lat_lng = serializers.ReadOnlyField()
    class Meta:
        model = Place
        fields = ('id','name','lat_lng','description','photo','location')

class RatingSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Rating
        fields = '__all__'

# class HybridSerializer(serializers.ModelSerializer):
#     place = serializers.CharField(max_length=300)
#     user = serializers.IntegerField()
#     lat_lng = serializers.ReadOnlyField()
#     class Meta:
#         model = Place
#         fields = ('id','name','lat_lng','description','photo','location')