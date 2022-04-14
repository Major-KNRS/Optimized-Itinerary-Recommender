from .models import Log 
from rest_framework import generics
from .serializers import LogSerializer
from django.db.models import Count
from map.models import Place
from django.http import JsonResponse

class LogList(generics.ListCreateAPIView):
    queryset = Log.objects.all()
    serializer_class = LogSerializer

class LogDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Log.objects.all()
    serializer_class = LogSerializer

def PopularityBasedRecs(num=6):    
    items = Log.objects.values('content_id')
    items = items.filter(event='buy').annotate(Count('user_id'))
    sorted_items = sorted(items, key=lambda item: -float(item['user_id__count']))
    return sorted_items[:num]

def chart(request, take=10):
    sorted_items = PopularityBasedRecs(take)
    ids = [i['content_id'] for i in sorted_items]

    ms = {m['id']: m['name'] for m in
          Place.objects.filter(id__in=ids).values('name', 'id')}

    if len(ms) > 0:
        sorted_items = [{'id': i['content_id'],
                          'name': ms[i['content_id']]} for i in sorted_items]
    else:
        print("No data for chart found. This can either be because of missing data, or missing movie data")
        sorted_items = []
    data = {
        'data': sorted_items
    }

    return JsonResponse(data, safe=False)
