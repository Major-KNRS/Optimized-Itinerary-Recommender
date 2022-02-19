from rest_framework.response import Response
from .models import Place
from rest_framework import generics
from .serializers import PlaceSerializer
from rest_framework.views import APIView
import content_recommender
from django.http import Http404

class PlaceList(generics.ListCreateAPIView):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer

class PlaceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer

class PlaceRecommend(APIView):
    def get_place(self,pk):
        try:
            obj = Place.objects.get(pk=pk)
            query = content_recommender.get_content_based_recommendations(obj.name)
            place = Place.objects.filter(name__in=query).distinct()
            return place
        except:
            raise Http404

    def get(self, request, pk, format=None):
        place = self.get_place(pk)
        serializer = PlaceSerializer(place,many=True)
        return Response(serializer.data)
