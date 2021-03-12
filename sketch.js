let model_url='https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/'
let pitch;
let audioContext;
let mic;
let freq=0;
let audstat=0;

//const button=  document.getElementById('button');

function setup() {
 // createCanvas(400, 400);
/* crepe = (function() {

  audioContext=new AudioContext();
  mic= new p5.AudioIn();
  mic.start(listening); 
 
  if (audioContext.state === 'running') {
          status('Running ...');
        } else {
          // user gesture (like click) is required to start AudioContext, in some browser versions
          status('<a href="javascript:crepe.resume();" style="color:red;">* Click here to start the demo *</a>')
        }
   return {
    'audioContext': audioContext,
    'resume': function() {
      audioContext.resume();
      if (audioContext.state === 'running') {
      status('Running ...');}
    }
  }
})();
*/
}
 // function status(message) {
   // document.getElementById('status').innerHTML = message;
  //}
function audint(){
    audioContext=getAudioContext();
  mic= new p5.AudioIn();
  mic.start(listening);
    audstat=1;

}
function audstop(){
  audioContext.suspend();
  audstat=0;
}
function audstart(){
  audioContext.resume();
  audstat=1;

}
function listening(){
  console.log('listening');
  
  pitch=ml5.pitchDetection(model_url,
  audioContext,
  mic.stream,
  modelLoaded);
}


/*function touchStarted(){
  const button=  document.getElementById('click');
  audioContext=getAudioContext();
  mic= new p5.AudioIn();
  mic.start(listening);
}

const startButton=document.createElement("button");
startButton.innerText="play";
startButton.addEventListener("click",()=>{
});*/
//function touchStarted(){    getAudioContext().resume()}

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

function getData(){
  return freq;
}

 Plotly.plot(document.querySelector(".wrapper"),[{
  y:[getData()],
  type:'line'
}]);

var cnt=0;

setInterval(function(){
  if(audstat==1){
  Plotly.extendTraces(document.querySelector(".wrapper"),{y:[[getData()]]},[0]);
  cnt++;
  if(cnt>300){
    Plotly.relayout(document.querySelector(".wrapper"),{
      xaxis:{
        range:[cnt-300,cnt]
      }
    });
  }
}},15);

/*function draw() {
  background(0);
  textAlign(CENTER,CENTER);
  fill(255);
  textSize(64);
  text(freq.toFixed(2),width/2,height/2);
}*/
