var cv=document.getElementById("BOX")
var ctx=cv.getContext("2d")
var pi=Math.PI
var player={
 x:400,
 y:500,
 keypress:[0,0,0,0],
 speed:0,
 g:1.8*25,
 ys:0,
 timeinsky:0,
 istouch:[false,false,false,false]
}
var rolly=0
setTimeout(()=>{
adddetectkey("w",()=>{player.keypress[0]=1},()=>{player.keypress[0]=0})
adddetectkey("a",()=>{player.keypress[1]=1},()=>{player.keypress[1]=0})
adddetectkey("s",()=>{player.keypress[2]=1},()=>{player.keypress[2]=0})
adddetectkey("d",()=>{player.keypress[3]=1},()=>{player.keypress[3]=0})},100)
var snd = new Audio("music.mp3");
snd.loop = true; //設定循環播放


//停止
function myStop(){
    snd.pause();
    snd.currentTime = 0;
}
function mainloop(){
  clearScreen()
  if (player.y<300){
   rolly=player.y-300
  }else{rolly=0}
  //console.log(stage)
  player.istouch=detect(player)
  //console.log(player.y)
  //console.log(player.istouch[2]==0)
  //console.log(keypress)
  player.speed*=0.95
  if (true){
    if(player.istouch[2]==0){
     player.ys+=(1/60**2+2*player.timeinsky*1/60)*player.g/2
     player.timeinsky+=1/60
    }
    else{
       player.ys=0
       player.timeinsky=0
    }
    if (player.keypress[0]==1&&!player.istouch[2]==0){
     player.ys=-15;
     player.timeinsky=0
    }
    if (player.keypress[1]==1){
     player.speed-=.01;
     player.speed*=.99
    }
    if (player.keypress[2]==1&&player.istouch[2]==0){
     player.ys=1.2;
     player.timeinsky=0
    }
    if (player.keypress[3]==1){
     player.speed+=0.01;
     player.speed*=0.99
    }
  }
  if(player.y<stage.one.block[stage.one.block.length-3][0][0]){
    gene()
  }
  stage.one.block.forEach(n=>{
   drawblock(n)
  })
  drawball([player.x,player.y],10,"#142857")
  move(player,player.speed,player.ys)

  //x++,y++
}
setInterval(mainloop,1000/60)
