var cv=document.getElementById("BOX")
var ctx=cv.getContext("2d")
var pi=Math.PI
var player={
 x:400,
 y:200,
 keypress:[0,0,0,0],
 speed:0,
 g:19.6,
 ys:0,
 timeinsky:0,
 istouch:false
}

function mainloop(){
  player.istouch=detect(player)
  //console.log(keypress)
  player.speed*=0.95
  if(player.istouch){
   player.ys+=(1/60**2+2*player.timeinsky*1/60)*player.g/2
   player.timeinsky+=1/60
  }else{
   player.ys=0
   player.timeinsky=0
  }
  clearScreen()
  drawball([player.x,player.y],10,"#142857")
  adddetectkey("w",()=>{player.keypress[0]=1},()=>{player.keypress[0]=0})
  adddetectkey("a",()=>{player.keypress[1]=1},()=>{player.keypress[1]=0})
  adddetectkey("s",()=>{player.keypress[2]=1},()=>{player.keypress[2]=0})
  adddetectkey("d",()=>{player.keypress[3]=1},()=>{player.keypress[3]=0})
  if (player.keypress[0]==1&&!player.istouch){
   player.ys=-5;
   player.timeinsky=0
  }
  if (player.keypress[1]==1){
   player.speed=-5;
  }
  if (player.keypress[2]==1){
   player.ys=5;
  }
  if (player.keypress[3]==1){
   player.speed=5;
  }
  move(player,player.speed,player.ys)

  //x++,y++
}
setInterval(mainloop,1000/60)
