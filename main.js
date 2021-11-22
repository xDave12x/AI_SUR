video="";
status="";
objects=[];
function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture("VIDEO");
    video.hide();
}
function draw(){
    image(video,0,0,480,380);
    if(status!=""){
        objectDetector.detect(video,gotresult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="status:objects detected";
            fill("#ff0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(user==object[i].label){
                document.getElementById("number_of_objects").innerHTML=user+"object found";
            }
            else{
                document.getElementById("number_of_objects").innerHTML=user+"object not found";
            }
        }
    }
}
function gotresult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";
    user=document.getElementById("object").value;
}
function modelLoaded(){
    console.log("modelLoaded");
    status=true;
}