var cv=document.getElementById("BOX")
var ctx=cv.getContext("2d")
var pi=Math.PI
var unit=5
var player={
 x:400,
 y:500,
 keypress:[0,0,0,0],
 speed:0,
 maxaddspeed:0.01,
 maxspeed:0.5*unit,
 g:9.8*unit,
 ys:0,
 timeinsky:0,
 m_speed:15*unit,
 istouch:[false,false,false,false]
}
var rolly=0
var rollx=0
setTimeout(()=>{
adddetectkey("w",()=>{player.keypress[0]=1},()=>{player.keypress[0]=0})
adddetectkey("a",()=>{player.keypress[1]=1},()=>{player.keypress[1]=0})
adddetectkey("s",()=>{player.keypress[2]=1},()=>{player.keypress[2]=0})
adddetectkey("d",()=>{player.keypress[3]=1},()=>{player.keypress[3]=0})},100)
var snd = new Audio("music.mp3"); //LOL
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
  }
  else{rolly=0}
  rollx=player.x-400
  //console.log(stage)
  player.istouch=detect(player)
  //console.log(player.y)
  //console.log(player.istouch[2]==0)
  //console.log(keypress)
  player.speed*=0.95
  if (true){
    if(player.istouch[2]==0){
     player.ys+=(1/60**2+2*player.timeinsky*1/60)*unit*player.g/2
     player.timeinsky+=1/60
    }
    else{
       player.ys=0
       player.timeinsky=0
    }
    if (player.keypress[0]==1&&!player.istouch[2]==0){
     player.ys=-player.m_speed;
     player.timeinsky=0
    }
    if (player.keypress[1]==1){
     player.speed-=player.maxspeed*(1-player.maxaddspeed/2);
     player.speed*=1-player.maxaddspeed/2
    }
    if (player.keypress[2]==1&&player.istouch[2]==0){
     player.g=2.45*unit;
     //player.timeinsky=0
    }else{
      player.g=9.8*unit
    }
    if (player.keypress[3]==1){
     player.speed+=player.maxspeed*(1-player.maxaddspeed/2);
     player.speed*=1-player.maxaddspeed/2
    }
  }
  if(player.y<stage.one.block[stage.one.block.length-3][0][1]){
    gene()
  }
  stage.one.block.forEach(n=>{
   drawblock(n)
  })
  move_mplafom()
  if (player.istouch[0]==1){
    player.ys*=-1
  }
  drawball([player.x,player.y],10,"#142857")
  move(player,player.speed,player.ys)
  printnum(100)
  //x++,y++
  //console.log(player.istouch)
}
setInterval(mainloop,1000/60)


