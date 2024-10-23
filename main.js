var cv=document.getElementById("BOX"),ctx=cv.getContext("2d"),pi=Math.PI,unit=5,vesion=0,seed=Math.round(Math.random()*50000),primes=[2,3,5,7,11,13,17,23,29],firstload=true

function cop(){
  //console.log(document.cookie)
  text=JSON.stringify([player,blocks,diff])
  document.cookie=text
  navigator.clipboard.writeText(text)
}
function loa(){
  data=navigator.clipboard.readText().then(data=>{
    data=JSON.parse(data)
    player=data[0]
    blocks=data[1]
    diff=data[2]
  }).catch(err => {
    document.createElement("input",style="top:0px")
  });
  
  
}
var player={
 x:400,
 y:590,
 keypress:[0,0,0,0],
 xs:0,
 maxaddspeed:0.99,
 maxspeed:70000*unit,
 g:98*unit,
 ys:0,
 timeinsky:0,
 jumpspeed:35*unit,
 istouch:[false,false,false,false,0],
 aoxs:0,
 aoys:0,
 twicejump:0,
 readytwicejump:0,
 scale:15,
 fact:0.25,
}

cv.style.height="600px"
cv.style.width="800px"
var scale=[800,600]
var rolly=0
var rollx=0
//var snd = new Audio("music.wav"); //LOL
//snd.loop = true; //設定循環播放
var color,changing=0,main=0,dev_mode=1,diff=1,choose=0,t=0,stop=0,b=0,cvh,cvw,Mods=[],ronate=0,rs=0
//snd.autoplay=true
//snd.load()
//停止
function myStop(){
    snd.pause();
    snd.currentTime = 0;
}

function mainloop(){
  
  //console.log('\n'.repeat('25'));
  if(stop<0.5){clearScreen()}
  
  if (main){
    
    player.maxspeed=15*unit
    //console.log(cv.style.top)
    move_mplafom()  
    player.aoxs*=0.9
    player.aoys*=0.9
    player.fact=0.10
    player.maxaddspeed=0.9
    //log(player.istouch)
    
    color=HSVtoRGB(Math.abs(player.y/50000)%1,1,0.55)
    //console.log((player.y/500)%100,color)
    
    ctx.strokeStyle=`rgb(${color.r},${color.g},${color.b})`
    ctx.lineWidth=10000
    ctx.strokeRect(0,0,100,1000)
    //log(Math.round((player.x/scale[0]/800)/10)*800-rollx/10)
    //drawimage("background",1,[Math.round((player.x/800)/10)*800-rollx/10,300-rolly/10],[800,600],true)
    background()
    // drawimage("background",1,[Math.round((player.x/800)/10)*800-rollx/10-800,300-rolly/10],[800,600],true)
    // drawimage("background",1,[Math.round((player.x/800)/10)*800-rollx/10+800,300-rolly/10],[800,600],true)
      player.istouch=detect(player)
      ctx.beginPath()
      ctx.strokeStyle="#000000"
      ctx.lineWidth=1
      ctx.moveTo(400,300)
      ctx.lineTo(blocks[player.istouch[5]][0][0]-rollx,blocks[player.istouch[5]][0][1]-rolly)
      ctx.stroke()
      //note_pos(0,p[0]-rollx,p[1]-rolly)
      //console.log(p[0]-n[0][0],b)
      //log(player.istouch)
    if(player.istouch[2]==0){
      player.fact=0.02
      player.maxaddspeed=0.98
    }  
    if (player.y<300){
    rolly=player.y-300
    }
    else{rolly=0}
    rollx=player.x-400
    switch(diff){
      case 1:
        scale=[1000,750]
        player.g=98*unit/2
        player.jumpspeed=50*unit
        drawimage("Easy",1,[762,12],[75,25])
        break;
      case 2:
        scale=[800,600]
        player.g=98*unit
        player.jumpspeed=50*unit
        drawimage("Normal",1,[762,12],[75,25])
        break;
      case 3:
        t+=0.1
        scale=[600,450]
        player.g=98*unit*2
        player.jumpspeed=75*unit
        rollx+=Math.sin(t)*50
        drawimage("Hard",1,[762,12],[75,25])
        break;
      case 4:
        t+=0.1
        scale=[Math.sin(t)*800+900,Math.cos(t)*600+700]
        player.g=98*unit*2
        player.jumpspeed=45*unit
        rollx+=Math.cos(t+pi)*100
        rolly+=Math.sin(t+pi)*100
        drawimage("So Hard",1,[762,12],[75,25])
        break;
      case 5:
        t+=0.05
        scale=[Math.random()*800+100,Math.random()*600+100]
        player.g=98*unit*4
        player.jumpspeed=70*unit
        rollx+=Math.random()*100-50
        rolly+=Math.random()*100-50
        b=Math.cos(t)*100+600
        cv.style.height=`${b}px`
        drawimage("HELL",1,[762,12],[75,25])
        stop=Math.random()
  
    }
    cvh=parseInt(cv.style.height)
    cvw=parseInt(cv.style.width)
    //console.log(stage)
    if (player.istouch[4]=="AIce"){
      //log(player.istouch[4])
      //log(blocks[player.istouch[6]])
      player.fact=blocks[player.istouch[6]][3][0]
      player.maxaddspeed=1-player.fact
      
    }
    //cv.background(color.r+color)
    //console.log(player.y)
    //console.log(keypress)
    if(player.keypress[4]){
      player.maxspeed*=0.25
    }
    player.xs*=1-player.fact
    Mods.forEach(Mod=>{
      //log(Mod.Name)
      if(player.istouch[4]==Mod.Name){
        //log(111)
        Mod.Affect()
      }
    })
    //log(Math.abs(blocks[player.istouch[6]][0][0]-player.x))
    if(player.istouch[4]=="1way"&&1500<Math.abs(blocks[player.istouch[6]][0][0]-player.x)){
      player.xs=(blocks[player.istouch[6]][0][0]-player.x)/10
    }
    if (true){
      if(player.istouch[2]==0){
        player.ys+=player.g/60
        player.timeinsky+=1/60
      //log("p")
      }
      else{
        //log("iji")
        player.ys*=-.003
        //player.timeinsky=0
        player.twicejump=0
        player.readytwicejump=0
      }
      movement()
      //if(getDeviceType()=="desktop"){
      //}
    }
    if (firstload){
      for(var x=0;x<250;x++){
        gene()
      }
      firstload=false
    }
    if(player.y<blocks[blocks.length-3][0][1]){
      gene()
    }
    if(stop<0.5){
      if(changing%5==0){
        drawball([player.x,player.y],player.scale,"#142857")
      }else{
        drawimage(`ballskin${changing%5}`,1,[player.x-rollx,player.y-rolly],[player.scale*2,player.scale*2],1)
      }
      blocks.forEach(n=>{
    drawblocks(n)
    })
  }
    

    if (player.istouch[0]==1){
      player.ys*=-1
      player.timeinsky=0
    }
    if(player.istouch[2]){
      rs=(player.xs/60/((player.scale*2*pi)/360))
    }
    ronate+=rs
    if(changing%5==0){
      drawball([player.x,player.y],player.scale,"#142857")
    }else{
      drawimage(`ballskin${changing%5}`,1,[player.x-rollx,player.y-rolly],[player.scale*2,player.scale*2],1,ronate)
    }
    
    move(player,player.xs+player.aoxs,player.ys+player.aoys)
    printnum(blocks.length-3,400,10)
    printnum(player.istouch[5],400,30)
    printnum((Math.floor((player.y-600)/unit))*-1,20,25) 
    //console.log((Math.floor((player.x-400)/unit))*1)
    printnum((Math.floor((player.x-400)/unit))*1,20,40) 
    printnum((Math.floor((player.xs)/unit))*1,20,55) 
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
  
  buttons.forEach(n=>{n.run()})
  //console.log(buttons)
  //printword((Math.random()*20000000).toString(36),20,50,20)
  //note_pos(1,cx,cy)
  //printword(a_str.show(),100,100,20)
}
console.log(document.cookie)
setInterval(mainloop,1000/60)


