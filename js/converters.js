function toDegrees(angle) {
    return angle * (180 / Math.PI);
   }

   function toRadians(angle) {
    return angle * (Math.PI / 180);
   }

   function convertDMS(lat, lng) {
	var latitude = toDegreesMinutesAndSeconds(lat);
	var latitudeCardinal = lat >= 0 ? "N" : "S";
	var longitude = toDegreesMinutesAndSeconds(lng);
	var longitudeCardinal = lng >= 0 ? "E" : "W";
	return latitude + " " + latitudeCardinal + "\n" + longitude + " " + longitudeCardinal;
 
}

function ConvertDMSToDD(degrees, minutes, seconds, direction) {
    var dd = Number(degrees) + Number(minutes) / 60 + Number(seconds) / (60 * 60);
  console.log(dd);
    return dd;
   }
 

