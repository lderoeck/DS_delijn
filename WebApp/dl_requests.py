import requests
from flask import json


class dl_request():
    def __init__(self):
        self.header = {
            "Ocp-Apim-Subscription-Key": "16dc01a8d7374c239ee2fb185689fb60"}
        self.baseurl = "https://api.delijn.be/DLKernOpenData/api/v1"

    def get(self, url):
        response = requests.get(self.baseurl + url, headers=self.header)
        if response.status_code != 200:
            print("DL failed:", response.content)
            return None
        return json.loads(response.content)


class open_maps_request():
    def __init__(self):
        self.baseurl = "https://api.openrouteservice.org"
        self.header = {
            "Accept": "application/json, application/geo+json; format=geojson; charset=utf-8",
            "Authorization": "5b3ce3597851110001cf624837b46bcb091c4f2e90343f4c7b50bafb"
        }

    def post(self, url, data):
        response = requests.post(
            self.baseurl + url, json=data, headers=self.header)
        if response.status_code != 200:
            print("Routing failed:", response.text)
            return None
        return response.text


class open_weather_requests():
    def __init__(self):
        self.baseurl = "https://api.openweathermap.org/data/2.5"

    def get(self, url):
        response = requests.get(self.baseurl + url +
                                "&APPID=3f648e7f1ce832c88f971c14feb94d1d")
        if response.status_code != 200:
            print("Weather failed:", response.content)
            return None
        return json.loads(response.content)
