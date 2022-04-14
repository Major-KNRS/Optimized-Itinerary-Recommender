from django.urls import path 
from .apiviews import LogList,LogDetail,chart

urlpatterns = [
    path('',LogList.as_view(), name="log_list"),
    path('<int:pk>',LogDetail.as_view(), name="log_detail"),
    path('chart',chart, name="chart"),
]