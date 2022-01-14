import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "smarttourist.settings")

import django
django.setup()

from map.models import Place
from django.contrib.gis.geos import Point
import uuid
from django.core.files.base import ContentFile
import base64
import csv

def csv_to_image(data):
    print(data)
    format, imgstr = data.split(';base64,')
    ext = format.split('/')[-1]
    data = ContentFile(base64.b64decode(imgstr),name=str(uuid.uuid4())+'.'+ext)
    return data

with open('data_all.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        place = Place.objects.create(name=row['title'],description=row['genre'],photo=csv_to_image(row['img_url']),location=Point(float(row['longitude']),float(row['latitude'])))
        place.save()

