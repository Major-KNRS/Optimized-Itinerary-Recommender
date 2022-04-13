from django.urls import path 
from .apiviews import LogList,LogDetail

urlpatterns = [
    path('',LogList.as_view(), name="log_list"),
    path('<int:pk>',LogDetail.as_view(), name="log_detail"),
]