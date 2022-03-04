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