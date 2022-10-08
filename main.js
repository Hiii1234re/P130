song1="";
song2="";
song1_status = "";
song2_status = "";
scoreleftWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("Monkeys-Spinning-Monkeys.mp3");
}
function setup(){
    canvas = createCanvas(500,400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +"leftWristY"+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +"rightWristY"+ rightWristY);
    }
}

function modelLoaded(){
    console.log('PoseNet is Initialized');
}

function draw(){
    image(video, 0, 0, 500, 400);

    if (scoreleftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if (song2_status == false){
            song2.play();
            document.getElementById("song").innerHTML = "playing song 2";
        }
    }
    if (scorerightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if (song1_status == false){
            song1.play();
            document.getElementById("song").innerHTML = "playing song 1";
        }
    }
}
function play(){
    song1.play();
}

