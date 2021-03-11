let model_url='https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/'
let pitch;
let audioContext;
let mic;
let freq=0;
const button=  document.getElementById('button');
function setup() {
  createCanvas(400, 400);
  audioContext=getAudioContext();
  mic= new p5.AudioIn();
  mic.start(listening);
  
}

function listening(){
  console.log('listening');
  
  pitch=ml5.pitchDetection(model_url,
  audioContext,
  mic.stream,
  modelLoaded);
}

function touchStarted(){
getAudioContext().resume()
}

function gotPitch(error,frequency){
  if(error){
    console.log(error);
  }
  else{
    if(frequency){
      freq=frequency;
    }
  }
  pitch.getPitch(gotPitch);
}

function modelLoaded() {
  console.log('Model Loaded!');
  pitch.getPitch(gotPitch);
}
function draw() {
  background(0);
  textAlign(CENTER,CENTER);
  fill(255);
  textSize(64);
  text(freq.toFixed(2),width/2,height/2);
}
