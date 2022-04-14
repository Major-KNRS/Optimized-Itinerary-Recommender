import datetime
import os
import random

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'smarttourist.settings')

import django

django.setup()

from collector.models import Log
from map.models import Place
from tourist.models import User as UserM

SEED = 0

places = {'Religious Sites':
                 [
                    '424',
                    '427',
                    '429',
                    '430',
                    '435',
                    '440',
                    '446',
                    '454',
                    '455',
                    '456',
                    '459',
                    '465',
                    '467',
                    '468',
                    '469',
                    '470',
                    '475',
                    '476',
                    '483',
                    '484',
                    '486',
                    '487',
                    '488',
                    '491',
                    '493'],
            'Historic Sites': [
                    '448',
                    '469',
                    '485'
             ], 
            'Mountains': [
                '426',
                '428',
                '432',
                '433',
                '458',
                '460'
            ]}

class User:
    userId = 0
    likes = {}
    events = {}

    def __init__(self, user_id, Religious_Sites, Historic_Sites, Mountains):
        self.userId = user_id
        self.likes = {'Religious Sites': Religious_Sites, 'Historic Sites': Historic_Sites, 'Mountains': Mountains}

    def select_genre(self):
        return sample(self.likes)


def select_place(user):

    genre = user.select_genre()
    interested_places = places[genre]
    place_id = ''
    while place_id == '':
        place_candidate = interested_places[random.randint(0, len(interested_places) - 1)]
        place_id = place_candidate

    return place_id


def select_action(user):
    actions = {'genreView': 15, 'details': 50, 'moredetails': 24, 'addToList': 10, 'buy': 1}

    return sample(actions)


def sample(dictionary):
    random_number = random.randint(0, 100)
    index = 0
    for key, value in dictionary.items():
        index += value

        if random_number <= index:
            return key

def main():
    Log.objects.all().delete()
    random.seed(SEED)

    number_of_events = 10000

    print("Generating Data")
    users = [
        User(1, 20, 30, 50),
        User(2, 50, 20, 40),
        User(3, 20, 30, 50),
        User(4, 100, 0, 0),
        User(5, 0, 100, 0),
    ]
    print("Simulating " + str(len(users)) + " visitors")

    for x in range(0, number_of_events):
        randomuser_id = random.randint(0, len(users) - 1)
        user = users[randomuser_id]
        selected_place = select_place(user)
        action = select_action(user)
        print("user id " + str(user.userId) + " selects place " + str(selected_place) + " and " + action)

        l = Log(user_id=UserM.objects.get(id=user.userId),
                content_id=Place.objects.get(id=selected_place),
                event=action,
                )
        l.save()

if __name__ == '__main__':
    print("Starting Place Log Population script...")
    main()
