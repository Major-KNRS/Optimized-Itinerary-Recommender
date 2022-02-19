from django.urls import path,include
from .views import index,recommend,detail,search_recommend,searchcollaborative_recommend
from .apiviews import PlaceList, PlaceDetail, PlaceRecommend

urlpatterns = [
    path('',index,name='home'),
    path('recommend',recommend,name='recommend'),
    path('place/<int:place_id>', detail, name='detail'),
    path('search', search_recommend, name='search'),
    path('search-collaborative', searchcollaborative_recommend, name='search-collaborative'),
    path('api/places/',PlaceList.as_view(), name = "places_list"),
    path('api/places/<int:pk>', PlaceDetail.as_view(), name = "places_detail"),
    path('api/places/recommend/<int:pk>', PlaceRecommend.as_view(), name='places_recommend'),
]