#!/bin/bash
cd ~/Documents/sensor
forever start -c python3 sensor.py
forever start server.js