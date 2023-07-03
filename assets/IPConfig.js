// IP Server Address:
const IP_SERVER = 'http://35.198.193.139:3001/';

/*
    @ URL - Values(A number) of the sensors:
    * Air Temperature: IP_SERVER + 'air_temperature'
    * Air Humidity: IP_SERVER + 'air_humidity'
    * Soil Moisture: IP_SERVER + 'soil_moisture'
    * Light Intensity: IP_SERVER + 'light_intensity'
*/
const URL_AIR_TEMPERATURE = IP_SERVER + 'air_temperature';
const URL_AIR_HUMIDITY = IP_SERVER + 'air_humidity';
const URL_SOIL_MOISTURE = IP_SERVER + 'soil_moisture';
const URL_LIGHT_INTENSITY = IP_SERVER + 'light_intensity';

/*
    @ URL - state("True/False") of the engines:
    * Fan: IP_SERVER + 'fan'
    * Water Pump: IP_SERVER + 'water_pump'
    * Light: IP_SERVER + 'light'
*/
const URL_FAN = IP_SERVER + 'fan';
const URL_WATER_PUMP = IP_SERVER + 'water_pump';
const URL_LIGHT = IP_SERVER + 'light';