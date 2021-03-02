/* STATUS BOARD SETUP */

//Game Board Dimensions
var canvas = document.getElementById('gameBoard');
var canvas2 = document.getElementById('contactBoard');
var canvas3 = document.getElementById('shipBoard');
ctx = canvas.getContext('2d');
ctx2 = canvas2.getContext('2d');
ctx3 = canvas3.getContext('2d');
var board = document.getElementById('gameContainer');
const d = 464; 
console.log (window.innerHeight);

var r = d/2; 
// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
setupBoard();
}
function setupBoard() {

ctx.canvas.width  = d;
ctx.canvas.height = d;
ctx2.canvas.width  = d;
ctx2.canvas.height = d;
ctx3.canvas.width  = d;
ctx3.canvas.height = d;
//...drawing code...
var circle = new Path2D();
circle.arc(r, r, r - 10, 0, 2 * Math.PI);

var circle1 = new Path2D();
circle1.arc(r, r, d/3 - 10, 0, 2 * Math.PI);

var circle2 = new Path2D();
circle2.arc(r, r, d/6 - 10, 0, 2 * Math.PI);

var img = document.getElementById("target");
var oShip = document.getElementById("os");


ctx.strokeStyle = "#65676B";
ctx.stroke(circle);
ctx.stroke(circle1);
ctx.stroke(circle2);
ctx.beginPath();
ctx.moveTo(d/2, 0);
ctx.lineTo(d/2, d);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(0, d/2);
ctx.lineTo(d, d/2);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(d, d);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(d, 0);
ctx.lineTo(0, d);
ctx2.drawImage(target, d/2-80, d/2-80, 20, 20);
ctx2.drawImage(oShip, d/2-10, d/2-10, 20, 20);
ctx.stroke();
ctx2.font = "20px Helvetica";
ctx2.fillStyle = "#cccccc";
ctx2.fillText("Position Indicator", 5, 20);
}

window.addEventListener("load", setupBoard(), setupBigBoard());

//HIMARKER  - Sea Target Movement tracker
      	//Game Board Dimensions
      	const canvas4 = document.getElementById('targetCanvas');
	const canvas5 = document.getElementById('markerCanvas');
	const canvas6 = document.getElementById('gridCanvas');
      	ctx = canvas4.getContext('2d');
	ctx2 = canvas5.getContext('2d');
	ctx3 = canvas6.getContext('2d');
	var board = document.getElementById('himarker');
	var w = window.innerWidth / 2;	
	var h = window.innerHeight - 100;
	
	var img = document.getElementById("target");
	var oS = document.getElementById("os");
	
   // d stands for dimension
      	var d;
      	if (w>h) {
     	d = h;
     	} else {
     	d = w;
     	}
 
   var r = d/2;
   //half the width of the game board equals 25 nautical miles in real life
var steps = 26;
let timeMatrix = [
];
function tabulaRasa() {
ctx.clearRect(0, 0, d, d); 
 let result = document.getElementById('result');
result.innerHTML = '';
} 
function timePush() {
timeMatrix = [];
var time= document.getElementById('targetTime'); // Target Time Holder
var targetTime = time.value; // Target Time
var timeArray = targetTime.split(" ");
timeArray = timeArray[0].split(":");
var minutes = parseInt(timeArray[1]);
var hours = parseInt(timeArray[0]);
var h = hours;
for (let i = 0; i < steps; i ++) {
 count = minutes + (25 - i);
if (count > 59 ) {
 count = count%60;
} 
if (count < 10){
 count = '0'+count;
} 
if( minutes + (25 - i) < 60) {
	h = hours;
} else {
 h = hours + 1 ;
}
eventTime =  h +':'+ count;
timeMatrix.unshift(eventTime);
  } 
}
function futurePoint(){
 positMatrix = [];
   /* var points = input.split(/[^\d+(\,\d+)\d+(\.\d+)?\w]+/);
   var pointX = ConvertDMSToDD(points[0], points[1], points[2], points[3]); // Lattitude of Target converted to radians
   var pointY = ConvertDMSToDD(points[4], points[5], points[6], points[7]); // Longitude of Target converted to radians
 var latF = parseFloat(pointX);
   var lonF = parseFloat(pointY);  
	var lat1 = toRadians(latF);
 var lon1 = toRadians(lonF); */
 var speed = document.getElementById('targetSpeed').value;
 var course = document.getElementById('targetCourse').value; 
 var crsF = parseFloat(course)
   var t = z;
 var input = document.getElementById("targetPos").value;
   var parts = input.split(/[^\d+(\,\d+)\d+(\.\d+)?\w]+/);
   var startX = ConvertDMSToDD(parts[0], parts[1], parts[2], parts[3]);
   var startY = ConvertDMSToDD(parts[4], parts[5], parts[6], parts[7]);
 var latF = parseFloat(startX);
   var lonF = parseFloat(startY);  
	var lat1 = toRadians(latF);
 var lon1 = toRadians(lonF);
 console.log(latF);
 console.log(lonF);
 var spd = parseFloat(speed);
 const weird = 0;    // this is a weird number, just go with it
 const R = 6378100;   //Radius of the Earth in Meters, nautical Miles (3443.92 NM)
 //const R = 6975240.5949256;  //Radius of the Earth in Yards
 var crs = toRadians(crsF); //target course converted to radians
 var ss = spd * 30.8667;   //Speed per minute in meters
 //var ss = spd * 33.75619714;  //Speed per minute in Yards
 
 for (let i = 0; i < steps; i ++) {
 var d = (ss * i);     //distance = speed per minute (1 knot = 30.8667 m/min)
 var lat2 = Math.asin( Math.sin(lat1)*Math.cos(d/R) + Math.cos(lat1)*Math.sin(d/R)*Math.cos(crs) );     // Calculated lattitude of new point
 var lon2 = lon1 + Math.atan2(Math.sin(crs)*Math.sin(d/R)*Math.cos(lat1),
                       	Math.cos(d/R)-Math.sin(lat1)*Math.sin(lat2));
 
 //var lon2 = lon1 + Math.atan2(Math.sin(crs)*Math.sin(d/R)*Math.cos(lat1), Math.cos(d/R)-Math.sin(lat1)*Math.sin(lat2));// Calculated longitude of new point
 var degLat = toDegrees(lat2);
 var degLon = toDegrees(lon2);
 /*
 
 var d = (ss * 25);        //distance = speed * time  (Speed in knots *25 minutes) (1 knot = 30.8667 m/min)
 var lat2 = Math.asin( Math.sin(lat1)*Math.cos(d/R) + Math.cos(lat1)*Math.sin(d/R)*Math.cos(crs) );       // Calculated lattitude of new point
 var lon2 = lon1 + Math.atan2(Math.sin(crs)*Math.sin(d/R)*Math.cos(lat1), Math.cos(d/R)-Math.sin(lat1)*Math.sin(lat2));// Calculated longitude of new point
 var degLat = toDegrees(lat2);
 var degLon = toDegrees(lon2);
 
 console.log(d );
 */
 var latDMS = convertDMS(degLat , degLon);
 positMatrix.unshift(convertDMS(degLat , degLon));
 const reversed = positMatrix.reverse();
  }
 
 }
function toDegreesMinutesAndSeconds(coordinate) {
	var absolute = Math.abs(coordinate);
	var degrees = Math.floor(absolute);
	var minutesNotTruncated = (absolute - degrees) * 60;
	var minutes = Math.floor(minutesNotTruncated);
	var seconds = Math.floor((minutesNotTruncated - minutes) * 60)+1;
 if (minutes < 10){
 minutes = '0'+ minutes;
} 
if (seconds < 10){
 seconds = '0'+ seconds;
} 
 
	return degrees + " " + minutes + " " + seconds;
}
function convertDMS(lat, lng) {
	var latitude = toDegreesMinutesAndSeconds(lat);
	var latitudeCardinal = lat >= 0 ? "N" : "S";
	var longitude = toDegreesMinutesAndSeconds(lng);
	var longitudeCardinal = lng >= 0 ? "E" : "W";
	return latitude + " " + latitudeCardinal + "\n" + longitude + " " + longitudeCardinal;
 
}
//This function is a test function used to test various results of equations and UI interactions
function historyTest() {
var speed = document.getElementById('targetSpeed').value;
var course = document.getElementById('targetCourse').value;
//Triangle Math Stuff for Target Course
//Convert Degrees to Radians for javascript Math Functions
var crsRad = course * (Math.PI / 180);
//Sin and Cosin of Target's Course
var tgtCrsSin = Math.sin(crsRad);
var tgtCrsCos = Math.cos(crsRad) * -1;
var xSpeed = tgtCrsSin * speed;
var ySpeed = tgtCrsCos * speed ;
var threeMinuteRule = speed *100;
var knot = (r / (speed/2)) ;
console.log(knot);
var yardsPerMinute = (knot / 60);
var pointStep = Math.ceil(yardsPerMinute * speed);
var xStep = yardsPerMinute * xSpeed;
var yStep = yardsPerMinute * ySpeed;
 
 timePush();
 futurePoint();
 tabulaRasa();
  for (let i = 0; i < steps; i ++) {
  	// draw vertical line
   ctx.drawImage(target, (r - 2) + (xStep * i) , (r - 2) + (yStep * i), 6, 6);
  	// draw text
  	//ctx.fillText(Math.round(x), x, 12)	
 }
   ctx.strokeStyle = 'red' // line colors
   ctx.beginPath()
  	ctx.moveTo(r, r)
  	ctx.lineTo(r + (xStep * (steps -1)) , r + (yStep * (steps -1)))
  	ctx.stroke()
 
   // (A) DUMMY ARRAY
  // (B) CREATE HTML TABLE STRING
  var perrow = 1, // 2 CELLS PER ROW
  	html = "<div class='divTableRow'>";
  // LOOP THROUGH ARRAY AND ADD TABLE CELLS
  for (var i = 0; i < timeMatrix.length; i++) {
	// "NORMAL" CELL
	html += `<div class="divTableCell">${timeMatrix[i]}</div><div class="divTableCell">${positMatrix[i]}</div>`;
	
	// CLICK ON CELL TO DO SOMETHING
	// html += `<td onclick="FUNCTION()">${data[i]}</td>`;
	
	// TO PASS IN A RUNNING NUMBER OR PARAMETER
	// html += `<td onclick="FUNCTION(${i})">${data[i]}</td>`;
	
	// BREAK INTO NEXT ROW
	var next = i + 1;
	if (next%perrow==0 && next!=timeMatrix.length) {
  	html += "</div><div class='divTableRow'>";
	}
  }
  html += "</div>";
  // (C) ATTACH HTML TO CONTAINER
  document.getElementById("result").innerHTML = html;


 /*
 timeMatrix.forEach(element => {
  	document.getElementById('result').innerHTML +=
  	`<li>${element}</li>`;
  	// here result is the id of the div present in the DOM
   });
*/
 /* var time = document.getElementById('targetTime');
 for (let i = 0; i < steps; 1++) {
  time = time + i;
 }
 
  var hour = time.getHours();
  var minute = time.getMinutes();
  var second = time.getSeconds();
  var temp = '' + ((hour > 12) ? hour - 12 : hour);
  if (hour == 0)
	temp = '12';
  temp += ((minute < 10) ? ':0' : ':') + minute;
  temp += ((second < 10) ? ':0' : ':') + second;
  temp += (hour >= 12) ? ' P.M.' : ' A.M.';
  return temp;*/
};
  ctx.canvas.width  = d;
  ctx.canvas.height = d;
  ctx2.canvas.width  = d;
  ctx2.canvas.height = d;
  ctx3.canvas.width  = d;
  ctx3.canvas.height = d;
function setupMarker() {
  
  ctx2.drawImage(target, r - 8 , r - 8 , 20, 20);
  //...drawing code...
 
 var img = document.getElementById("target");
 var oS = document.getElementById("os");
 
   // draw a line every *step* pixels
	const step = (d/10)
	// set our styles
	ctx3.strokeStyle = '#606060' // line colors
	ctx3.fillStyle = 'gray' // text color
	ctx3.font = '14px Monospace'
	ctx3.lineWidth = 0.35
	// draw vertical from X to Height
	for (let x = 0; x < d; x += step) {
  	// draw vertical line
  	ctx3.beginPath()
  	ctx3.moveTo(x, 0)
  	ctx3.lineTo(x, d)
  	ctx3.stroke()
  	// draw text
  	//ctx.fillText(Math.round(x), x, 12)
	}
	// draw horizontal from Y to Width
	for (let y = 0; y < d; y += step) {
  	// draw horizontal line
  	ctx3.beginPath()
  	ctx3.moveTo(0, y)
  	ctx3.lineTo(d, y)
  	ctx3.stroke()
}
	console.log (w);
	console.log (h);
	console.log (d);
 console.log (r);
};
