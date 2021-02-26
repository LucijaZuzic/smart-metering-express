import time
import board
from busio import I2C
import adafruit_bme680
import json

JSON_FILE = '../smart-metering/src/assets/bme680.json'

# Create library object using our Bus I2C port
i2c = I2C(board.SCL, board.SDA)
bme680 = adafruit_bme680.Adafruit_BME680_I2C(i2c, debug=False)
# change this to match the location's pressure (hPa) at sea level
bme680.sea_level_pressure = 1013.25
t = bme680.temperature
print("\nTemperature: %0.1f C" % t)
g = bme680.gas
print("Gas: %d ohm" % g)
h = bme680.humidity
print("Humidity: %0.1f %%" % h)
p = bme680.pressure
print("Pressure: %0.3f hPa" % p)
a = bme680.altitude
print("Altitude = %0.2f meters" % a)
g2 = g
h2 = h
if g > 50000:
  g = 50000
if g < 50:
  g = 50
g -= 50
if h > 100:
  h = 100
if h < 40:
  h = 40
h -= 40
q = float(g / 49950.0) * 75.0 + float(h / 60.0)* 25.0;
q = float(q / 100.0) * 500.0;
print("IAQ: %0.3f" % q)
try:
    with open(JSON_FILE) as json_data:
        data = json.load(json_data)
except IOError as e:
    data = []

# check if length is more than 100 and delete first element
if len(data) > 100:
    data.pop(0)

# append new values
jsonrow = {'temperature': t, 'gas': g2, 'humidity': h2, 'pressure': p, 'altitude': a, 'iaq': q,
           'time': time.strftime("%d.%m.%Y %H:%M:%S")}
data.append(jsonrow)

# save it
with open(JSON_FILE, 'w') as outfile:
    json.dump(data, outfile)
