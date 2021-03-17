//const model_url='https://cdn.jsdelivr.net/gh/Yashraj9983/pitchtest2/crepe/'
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
  
}
function audstop(){
  //audioContext.suspend();
  audstat=0;
  audioContext.suspend();
}
function audstart(){
  audioContext.resume();
  audstat=1;

}
function listening(){
  console.log('listening');
  audioContext.resume();

  pitch=ml5.pitchDetection(
   './crepe/',
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
      document.getElementById('curfreq').innerHTML = freq;
          }
  }
  pitch.getPitch(gotPitch);
}

function modelLoaded() {
  console.log('Model Loaded!');
  pitch.getPitch(gotPitch);
  audstat=1;
  document.getElementById('modelstatus').innerHTML = "ModelLoaded";

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
  if(cnt>100){
    Plotly.relayout(document.querySelector(".wrapper"),{
      xaxis:{
        range:[cnt-100,cnt]
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
