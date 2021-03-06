import sys
import Adafruit_DHT
from datetime import datetime
from time import sleep
from random import randint
from pymongo import MongoClient

def getSensor(dht_model):
	if dht_model is 11:
		sensor=Adafruit_DHT.DHT11 
	elif dht_model is 22:
		sensor=Adafruit_DHT.DHT22
	elif dht_model is 2302:
		sensor=Adafruit_DHT.AM2302
	else:
		sys.exit()
	return sensor


def formatSensorData(_refID, temp, humid):
	return {
		"_refID": _refID,
		"temp": round(temp * 1.8 + 32, 2),
		"humid": humid,
		"date": datetime.now().strftime('%Y-%m-%d %H:%M:%S')
	}
def getSensorData(SENSOR_SETUP):
	sensorData=[]
	for sensor in SENSOR_SETUP:
		_id=sensor['_id']
		dht_model=sensor['sensor']
		gpio_pin=sensor['pin']
		humid, temp = Adafruit_DHT.read_retry(getSensor(dht_model), gpio_pin)
		sensorData.append(formatSensorData(_id, temp, humid))
	return sensorData

def getSensorSetup(db):
	collection = db['sensors']
	SENSOR_SETUP=[]
	cursor = collection.find({}) # retrieves all the GPIO PINS + DHT model (11 or 22) data of your sensor setup 
	for document in cursor: # loop through each individual sensor in your setup
		SENSOR_SETUP.append(document)
	return SENSOR_SETUP

def main():
	DB_USER="username"
	DB_PASS="password"
	client = MongoClient("server", 19191)
	db = client['dht-sensors']
	if db.authenticate(DB_USER, DB_PASS):
		print("AUTH SUCCESS!")
		SENSOR_SETUP=getSensorSetup(db)
		if len(SENSOR_SETUP) >= 1:
			collection = db['sensor_readings']
			while(1):
				sensorData = getSensorData(SENSOR_SETUP)
				result = collection.insert_many(sensorData)
				sleep(60*60*1) # every hour
		else:
			print("NO SENSORS SETUP IN DATABASE!")
	else:
		print("AUTH NOT SUCCESSFUL!")


if __name__ == "__main__":
	main()
