var cv=document.getElementById("BOX")
var ctx=cv.getContext("2d")
var pi=Math.PI
var unit=5
var player={
 x:400,
 y:590,
 keypress:[0,0,0,0],
 speed:0,
 maxaddspeed:0.8,
 maxspeed:15*unit,
 g:9.8*unit,
 ys:0,
 timeinsky:0,
 m_speed:35*unit,
 istouch:[false,false,false,false],
 aoxs:0,
 aoys:0,
 twicejump:0,
 readytwicejump:0,
 ballscale:15,
 fact:0.25,
}
var scale=[800,600]
var rolly=0
var rollx=0
var snd = new Audio("music.mp3"); //LOL
snd.loop = true; //設定循環播放
var color,changing=0,main=0,dev_mode=1,diff=1,choose=0,t=0,stop=0,b=0

//停止
function myStop(){
    snd.pause();
    snd.currentTime = 0;
}
function mainloop(){
  //console.log('\n'.repeat('25'));
  if(stop<0.5){clearScreen()}
  
  if (main){
    
    console.log(cv.style.top)
    move_mplafom()  
    player.aoxs*=0.9
    player.aoys*=0.9
    player.fact=0.10
    player.maxaddspeed=0.8
    //log(player.istouch)
    
    color=HSVtoRGB(Math.abs(player.y/50000)%1,1,0.55)
    //console.log((player.y/500)%100,color)
    ctx.strokeStyle=`rgb(${color.r},${color.g},${color.b})`
    ctx.lineWidth=10000
    ctx.strokeRect(0,0,100,1000)
      player.istouch=detect(player)
    if(player.istouch[2]==0){
      player.fact=0.05
      player.maxaddspeed=0.95
    }  
    if (player.y<300){
    rolly=player.y-300
    }
    else{rolly=0}
    rollx=player.x-400
    switch(diff){
      case 1:
        scale=[1000,750]
        player.g=9.8*unit/2
        drawimage("Easy",1,[762,12],[75,25])
        break;
      case 2:
        scale=[800,600]
        player.g=9.8*unit
        drawimage("Normal",1,[762,12],[75,25])
        break;
      case 3:
        t+=0.1
        //scale=[600,450]
        //player.g=9.8*unit*2
        player.m_speed=45*unit
        rollx+=Math.sin(t)*50
        drawimage("Hard",1,[762,12],[75,25])
        break;
      case 4:
        t+=0.1
        scale=[Math.sin(t)*800+900,Math.cos(t)*600+700]
        player.g=9.8*unit*2
        player.m_speed=45*unit
        rollx+=Math.cos(t+pi)*100
        rolly+=Math.sin(t+pi)*100
        drawimage("So Hard",1,[762,12],[75,25])
        break;
      case 5:
        scale=[Math.random()*800+100,Math.random()*600+100]
        player.g=9.8*unit*4
        player.m_speed=70*unit
        rollx+=Math.random()*100-50
        rolly+=Math.random()*100-50
        b=Math.random()*100-40
        cv.style.top=`${b}px`
        drawimage("HELL",1,[762,12],[75,25])
        stop=Math.random()
  
    }
    //console.log(stage)
    if (player.istouch[4]=="AIce"){
      log(player.istouch[4])
      log(stage.one.block[player.istouch[6]])
      player.fact=stage.one.block[player.istouch[6]][3][0]
      player.maxaddspeed=1-player.fact
      
    }
    //cv.background(color.r+color)
    //console.log(player.y)
    
    //console.log(keypress)
    player.speed*=1-player.fact
    if (true){
      if(player.istouch[2]==0){
      player.ys+=(1/60**2+2*player.timeinsky*1/60)*unit*player.g/2
      player.timeinsky+=1/60
      log("p")
      }
      else{
        //log("iji")
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
        player.ys=-player.m_speed/10*5;
        player.timeinsky=0;
        player.twicejump=1
        player.readytwicejump=0
      }
      if (player.keypress[1]==1){
      player.speed-=player.maxspeed*((1/(player.maxaddspeed))-1);
      player.speed*=player.maxaddspeed/(1-player.fact)
      //log(player.speed)
      }
      /*if (player.keypress[2]==1&&player.istouch[2]==0){
      player.g=2.45*unit;
      //player.timeinsky=0
      }else{
        player.g=9.8*unit
      }*/
      if (player.keypress[3]==1){
      player.speed+=player.maxspeed*((1/player.maxaddspeed)-1);
      player.speed*=player.maxaddspeed/(1-player.fact)
      //console.log(player.speed)
      }
    }
    if(player.y<stage.one.block[stage.one.block.length-3][0][1]){
      gene()
    }
    if(stop<0.5){
      if(changing%4==0){
        drawball([player.x,player.y],player.ballscale,"#142857")
      }else{
        drawimage(`ballskin${changing%4}`,1,[player.x-rollx,player.y-rolly],[player.ballscale*2,player.ballscale*2],1)
      }
      stage.one.block.forEach(n=>{
    drawblock(n)
    })
  }
    

    if (player.istouch[0]==1){
      player.ys*=-1
      player.timeinsky=0
    }
    if(changing%4==0){
      drawball([player.x,player.y],player.ballscale,"#142857")
    }else{
      drawimage(`ballskin${changing%4}`,1,[player.x-rollx,player.y-rolly],[player.ballscale*2,player.ballscale*2],1)
    }
    move(player,player.speed+player.aoxs,player.ys+player.aoys)
    printnum(stage.one.block.length-3,400,10)
    printnum(player.istouch[5],400,30)
    printnum((Math.floor((player.y-600)/unit))*-1,20,25) 
    //console.log((Math.floor((player.x-400)/unit))*1)
    printnum((Math.floor((player.x-400)/unit))*1,20,40) 
    //x++,y++
    //console.log(player.istouch)
    //console.log((1/(10**(player.y*+600))))
  }else if(!choose){
    color=HSVtoRGB(Math.abs(player.y/50000)%1,1,0.55)
    //console.log((player.y/500)%100,color)
    ctx.globalAlpha=1
    ctx.strokeStyle=`rgb(${color.r},${color.g},${color.b})`
    ctx.lineWidth=10000
    ctx.strokeRect(0,0,100,1000)
    
    
  }
  if (dev_mode==1){
    //printnum((1/(2**(player.y-600))))
    //printnum((player.y-600),700,300)
    //log((1.001**((player.y-600)/100)))
    
  }
  
  buttons.forEach(n=>{n.run()
  })
  //console.log(buttons)
  
}
setInterval(mainloop,1000/60)


