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
    maxforce:150*unit,
    g:98*unit,
    ys:0,
    timeinsky:0,
    jumpspeed:35*unit,
    fric:100*unit,
    //jumpspeed:10*unit,
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
var color,changing=0,main=1,dev_mode=1,diff=2,choose=0,t=0,stop=0,b=0,cvh,cvw,Mods=[],ronate=0,rs=0
//snd.autoplay=true
//snd.load()
//停止
function myStop(){
    snd.pause();
    snd.currentTime = 0;
}
var last;

function mainloop(current){
    if(!loaded){
        window.requestAnimationFrame(mainloop);
        return;
    }
    //console.log(rollx,rolly)
    var dt=(current-last)/1000;
    if(!(dt>0)||(dt>0.1)){
        last=current;
        window.requestAnimationFrame(mainloop);
        return;
    }

    //console.log('\n'.repeat('25'));
    if(stop<0.5){clearScreen()}

    if (main){

        player.maxspeed=15*unit
        //console.log(cv.style.top)
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
        ctx.beginPath()
        ctx.strokeStyle="#000000"
        ctx.lineWidth=1
        ctx.moveTo(400,300)
        ctx.stroke()
        switch(diff){
            case 2:
                scale=[800,600]
                player.g=98*unit
                player.jumpspeed=50*unit
                drawimage("Normal",1,[762,12],[75,25])
                break;
        }
        cvh=parseInt(cv.style.height)
        cvw=parseInt(cv.style.width)
        if(player.keypress[4]){
            player.maxspeed*=0.25
        }
        //player.xs*=1-player.fact
        //Mods.forEach(Mod=>{
        //    if(player.istouch[2]==Mod.Name){
        //        Mod.Affect()
        //    }
        //})
        //if(player.istouch[2]=="1way"&&1500<Math.abs(blocks[player.istouch[6]][0][0]-player.x)){
        //    player.xs=(blocks[player.istouch[6]][0][0]-player.x)/10
        //}
        physics(player,dt);
        if (player.y<300){
            rolly+=(player.y-300-rolly)*.3
        }
        else{rolly=0}
        rollx+=(player.x-400-rollx)*.3
        //generate the map at the start
        if (firstload){
            for(var x=0;x<250;x++){
                gene()
            }
            firstload=false
        }
        //generate new tile
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
        ronate+=rs
        if(changing%5==0){
            drawball([player.x,player.y],player.scale,"#142857")
        }else{
            drawimage(`ballskin${changing%5}`,1,[player.x-rollx,player.y-rolly],[player.scale*2,player.scale*2],1,ronate)
        }

        printnum(blocks.length-3,400,10)
        printnum(player.istouch[5],400,30)
        printnum((Math.floor((player.y-600)/unit))*-1,20,25) 
        //console.log((Math.floor((player.x-400)/unit))*1)
        printnum((Math.floor((player.x-400)/unit))*1,20,40) 
        printnum((Math.floor((player.xs)/unit))*1,20,55) 
        printnum((Math.floor((player.ys)/unit))*1,100,55) 
        printnum((((.5*player.ys*player.ys+.5*player.xs*player.xs-player.y*player.g/unit)/unit/unit))*1,100,70) 
        printnum(Math.floor(1000/(current-last)),20,70) 
        printnum(Math.floor(current-last,2),20,85) 
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
    buttons.forEach(n=>{n.run()})
    //console.log(buttons)
    //printword((Math.random()*20000000).toString(36),20,50,20)
    //note_pos(1,cx,cy)
    //printword(a_str.show(),100,100,20)
    last=current;
    //setTimeout(window.requestAnimationFrame,100,mainloop);
    window.requestAnimationFrame(mainloop);
}
console.log(document.cookie)
//setInterval(mainloop,1000/50)
window.addEventListener('load',function(){
    window.requestAnimationFrame(mainloop);
})
