function setup() {
  canvas=createCanvas(380,380);
  canvas.center();
  video=createCapture(VIDEO);
  video.hide();
  objectdetector=ml5.objectDetector("cocossd", modelLoaded);
document.getElementById("status").innerHTML="Detecting Objects....";
}

Alert="";
status="";
objects=[];

function modelLoaded() {
console.log("cocossd has loaded!😊🌈");
status=true;
}

function gotResult(error,results) {
if (error) {
  console.error(error);
}
else {
  console.log(results);
  objects=results;
}
}

function preload() {
Alert=loadSound('Alert.mp3');  
}

function draw() {
image(video,0,0,380,380);
if(status !="") {
  objectdetector.detect(video,gotResult);
  for (i=0;i<objects.length;i++){
    document.getElementById("status").innerHTML="Object Detected!😊🌈";
    fill("#FF0000");
    percent=floor(objects[i].confidence*100)
    text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
    noFill();
    stroke("#FF0000");

    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       
    if(objects[i].label == "person")
    {
      document.getElementById("detection").innerHTML = "Baby Detected 👶🌈";
      console.log("stop");
      Alert.stop();
    }
    else
    {
      document.getElementById("detection").innerHTML = "Baby Not Detected!😡";
      console.log("play"); 
      Alert.play();
    }
   }

  if(objects.length == 0)
  {
    document.getElementById("detection").innerHTML = "Baby Not Found!😡";
    console.log("play"); 
    Alert.play();
  }
}
}




