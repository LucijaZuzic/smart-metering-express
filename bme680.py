import time
import board
from busio import I2C
import adafruit_bme680
# Create library object using our Bus I2C port
i2c = I2C(board.SCL, board.SDA)
bme680 = adafruit_bme680.Adafruit_BME680_I2C(i2c, debug=False)
# change this to match the location's pressure (hPa) at sea level
bme680.sea_level_pressure = 1013.25
print("\nTemperature: %0.1f C" % bme680.temperature)
g = bme680.gas
print("Gas: %d ohm" % g)
h = bme680.humidity
print("Humidity: %0.1f %%" % h)
print("Pressure: %0.3f hPa" % bme680.pressure)
print("Altitude = %0.2f meters" % bme680.altitude)
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