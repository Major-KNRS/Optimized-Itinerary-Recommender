from rest_framework import serializers
from .models import Place

class PlaceSerializer(serializers.ModelSerializer):
    lat_lng = serializers.ReadOnlyField()
    class Meta:
        model = Place
        fields = ('id','name','lat_lng','description','photo','location')