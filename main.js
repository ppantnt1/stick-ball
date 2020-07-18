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
 maxspeed:0.7*unit,
 g:9.8*unit,
 ys:0,
 timeinsky:0,
 m_speed:15*unit,
 istouch:[false,false,false,false],
 aoxs:0,
 aoys:0,
 twicejump:0,
 readytwicejump:0,
 ballscale:15
}
var rolly=0
var rollx=0
var snd = new Audio("music.mp3"); //LOL
snd.loop = true; //設定循環播放
var color,changing=0

//停止
function myStop(){
    snd.pause();
    snd.currentTime = 0;
}
function mainloop(){
  clearScreen()
  //if (!changing){
    move_mplafom()  
    player.aoxs=0
    player.aoys=0
    
    
    color=HSVtoRGB(Math.abs(player.y/50000)%1,1,0.55)
    //console.log((player.y/500)%100,color)
    ctx.strokeStyle=`rgb(${color.r},${color.g},${color.b})`
    ctx.lineWidth=10000
    ctx.strokeRect(0,0,100,1000)
      player.istouch=detect(player)
    if (player.y<300){
    rolly=player.y-300
    }
    else{rolly=0}
    rollx=player.x-400
    //console.log(stage)
    
    //cv.background(color.r+color)
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
        player.twicejump=0
        player.readytwicejump=0
      }
      if (player.keypress[0]==1&&!player.istouch[2]==0){
      player.ys=-player.m_speed;
      player.timeinsky=0
      }
      if (player.keypress[0]==0&&!player.istouch[2]==1&&player.readytwicejump==0){
        console.log("ready")
        player.readytwicejump=1
      }
      if(player.keypress[0]==1&&!player.istouch[2]==1&&player.readytwicejump==1&&player.twicejump==0){
        console.log("twicejump")
        player.ys=-player.m_speed/10*9;
        player.timeinsky=0;
        player.twicejump=1
        player.readytwicejump=0
      }
      if (player.keypress[1]==1){
      player.speed-=player.maxspeed*(1-player.maxaddspeed/2);
      player.speed*=1-player.maxaddspeed/2
      }
      /*if (player.keypress[2]==1&&player.istouch[2]==0){
      player.g=2.45*unit;
      //player.timeinsky=0
      }else{
        player.g=9.8*unit
      }*/
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

    if (player.istouch[0]==1){
      player.ys*=-1
    }
    if(changing%4==0){
      drawball([player.x,player.y],player.ballscale,"#142857")
    }else{
      drawimage(`ballskin${changing%4}`,1,[player.x-rollx,player.y-rolly],[player.ballscale*2,player.ballscale*2])
    }
    move(player,player.speed+player.aoxs,player.ys+player.aoys)
    printnum(stage.one.block.length-3,400,10)
    printnum(player.istouch[5],400,30)
    printnum((Math.floor(player.y/unit)-600)*-1,20,25) 
    printnum((Math.floor(player.x/unit))*-1,20,40) 
    //x++,y++
    //console.log(player.istouch)
  /*}else{
    color=HSVtoRGB(Math.abs(player.y/50000)%1,1,0.55)
    //console.log((player.y/500)%100,color)
    ctx.strokeStyle=`rgb(${color.r},${color.g},${color.b})`
    ctx.lineWidth=10000
    ctx.strokeRect(0,0,100,1000)
  }*/
}
setInterval(mainloop,1000/60)


