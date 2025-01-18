//styling
const container=document.querySelector('.container');
container.setAttribute('align','center');

const time=document.querySelector('#time');
time.style.fontSize='xx-large';
time.style.backgroundColor='black';
time.style.color='yellow';
time.style.height='200px';
time.style.width='1000px'

const start=document.querySelector("#start");
start.style.backgroundColor='green';

const stop=document.querySelector("#stop");
stop.style.backgroundColor='red';

const reset=document.querySelector("#reset");
reset.style.backgroundColor='yellow';

//code
let paused=false,intervalId=null;
let startTiming=0;
let elapsedTime=0;
let sec=0,min=0,hr=0;

function startTime(){

    
elapsedTime=Date.now()-startTiming;
sec=Math.floor((elapsedTime/1000)%60);
min=Math.floor((elapsedTime/(1000*60))%60);
hr=Math.floor((elapsedTime/(1000*60*60))%60);
// console.log(sec,hr,min);
sec=doubleDigit(sec);
min=doubleDigit(min);
hr=doubleDigit(hr);

time.textContent=`${hr}:${min}:${sec}`;
}
 
function doubleDigit(units){
return ("0"+units).length >2 ? units:"0"+units;
}

start.addEventListener('click',()=>{
    if(!paused){
        paused=false;
        startTiming=Date.now()-elapsedTime;
        intervalId=setInterval(startTime,1000);
    }
});
stop.addEventListener('click',()=>{
    if(!paused){
        paused=false;
        clearInterval(intervalId);
    }
});
reset.addEventListener('click',()=>{
   paused=false;
   clearInterval(intervalId);
   startTime=0;
   elapsedTime=0;
   hr=0,min=0,sec=0;

   time.textContent='00:00:00';
});


// Task1: Add a lap button also in the html of stopwatch
// Task2: on clicking the lap button the current stop watch time should be noted and displayed below the stopwatch(limit he lap to 3)
const body=document.querySelector('body');
const lap=document.querySelector('#lap');
let count=0;
let NewTime;
const LapArr=[];
//Local storage is used for task2 for save=setItem and for retrive=getItem

lap.addEventListener('click',()=>{
    clearInterval(intervalId);
    let lapTime=time.textContent;
    LapArr.push(lapTime);
    count++;
    if(count<=3){
        localStorage.setItem('LapArray',JSON.stringify(LapArr));
    body.insertAdjacentHTML('beforeend',`<div style=background-color:yellow;>Lap${count} : ${lapTime}</div>`);
}

});

window.addEventListener('load',()=>{
    //console.log("hello");
        NewTime=JSON.parse(localStorage.getItem('LapArray'));
        NewTime.forEach(t=> {
            body.insertAdjacentHTML("beforeend",`<span style=background-color:yellow;> ${t}</span><br>`);
        });
       
})
