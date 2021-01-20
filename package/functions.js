//window.addEventListener("onload",window.addEventListener("beforeunload",alert("no")))
var cx;
var cy;
var cc=false;
if(getDeviceType()=="desktop"){document.onmousemove=function(e) {
    var cc=false;
	  cx = event.clientX - cv.offsetLeft+400|| event.touches[0].clientX- cv.offsetLeft+400;
    cy = event.clientY - cv.offsetTop|| event.touches[0].clientY- cv.offsetTop;
    //console.log(cx,cy)
}
cv.addEventListener('mousedown',function(){
	cc=true;
})
cv.addEventListener('mouseup',function(){
	cc=false;
})

}else{
//are you watching?
//if u are 
//reply me at discord
console.log(1)
    cv.addEventListener("touchstart", handleStart, false);
    cv.addEventListener("touchend", handleEnd, false);
    cv.addEventListener("touchcancel", handleCancel, false);
    cv.addEventListener("touchmove", handleMove, false);
    function handleStart(evt) {
        evt.preventDefault();
        log("touchstart.");
              
        for (var i = 0; i < touches.length; i++) {
          log("touchstart:" + i + "...");
          ongoingTouches.push(copyTouch(touches[i]));
          var color = colorForTouch(touches[i]);
          ctx.beginPath();
          ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
          ctx.fillStyle = color;
          ctx.fill();
          log("touchstart:" + i + ".");
        }
      }    
      function handleEnd(evt) {
        evt.preventDefault();
        log("touchend");
        var touches = evt.changedTouches;
      
        for (var i = 0; i < touches.length; i++) {
          var color = colorForTouch(touches[i]);
          var idx = ongoingTouchIndexById(touches[i].identifier);
      
          if (idx >= 0) {
            ctx.lineWidth = 4;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
            ctx.lineTo(touches[i].pageX, touches[i].pageY);
            ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8);  // and a square at the end
            ongoingTouches.splice(idx, 1);  // remove it; we're done
          } else {
            log("can't figure out which touch to end");
          }
        }
      }
      function handleCancel(evt) {
        evt.preventDefault();
        log("touchcancel.");
        var touches = evt.changedTouches;
        
        for (var i = 0; i < touches.length; i++) {
          var idx = ongoingTouchIndexById(touches[i].identifier);
          ongoingTouches.splice(idx, 1);  // remove it; we're done
        }
      }
      function handleMove(evt) {
        evt.preventDefault();
        for (var i = 0; i < touches.length; i++) {
          var color = colorForTouch(touches[i]);
          var idx = ongoingTouchIndexById(touches[i].identifier);
      
          if (idx >= 0) {
            log("continuing touch "+idx);
            ctx.beginPath();
            log("ctx.moveTo(" + ongoingTouches[idx].pageX + ", " + ongoingTouches[idx].pageY + ");");
            ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
            log("ctx.lineTo(" + touches[i].pageX + ", " + touches[i].pageY + ");");
            ctx.lineTo(touches[i].pageX, touches[i].pageY);
            ctx.lineWidth = 4;
            ctx.strokeStyle = color;
            ctx.stroke();
      
            ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
            log(".");
          } else {
            log("can't figure out which touch to continue");
          }
        }
      }

}
function note_pos(type,x,y){
  ctx.beginPath()
  ctx.lineWidth=1
  ctx.strokeStyle="#000000"
  ctx.moveTo(x,0)
  ctx.lineTo(x,600)
  ctx.moveTo(0,y)
  ctx.lineTo(800,y)
  ctx.stroke()
}
function move(obj){
 obj.x+=obj.xs*unit/60+(obj.aoxs*5)/60
 obj.y+=obj.ys*unit/60+(obj.aoys*5)/60
 //log(((obj.ys-((1/60**2+2*player.timeinsky*1/60)*unit*player.g/2))/60)*unit+(obj.aoys*5)/60+obj.y,obj.y)
 if(obj.istouch[2]==0){
     //obj.y+=+((1/60**2+2*player.timeinsky*1/60)*unit*player.g/2)*unit
 }
}
function numtobin(num){
  var numc=num
  var op=""
  while (numc!=0){
    op=(numc%2==1?"1":"0")+op
    numc-=numc%2==1?1:0
    numc/=2
  } 
  return op
}

function sirandom(i){
  var sa=numtobin(seed).split("").reverse(),buffer=1,op
  //console.log(sa)
  for (var x=0;x<sa.length;x++){
    if(sa[x]=="1"){
      console.log(sa[x],2**x*i)
      buffer*=Math.sin((2**x)*i/180*pi)
    }
    //console.log(Math.sin(sa[x]*2**x/180*pi))
  }
  //console.log(buffer)
  op=Math.abs(seed*i*buffer)%1
  return op
}
console.log(sirandom(1.25),seed)
function gene(){
    no=blocks[blocks.length-1][0][1]
    no-=250
    //console.log(1/(Math.log(player.y/unit*-1)),player.y*-1)
    var the_x=blocks[blocks.length-1][0][0]+sirandom(blocks.length)*1000-500
    var w=150*(1.0003**((player.y-600)/100))
    var n=0
    console.log(w)

    if((blocks.length+1)%50==0){
        console.log("wow")
        blocks.push([[the_x,no],[500000,25],"1way"])
    }else{
        Mods.forEach(Mod => {
            if(typeof(Mod)!="undefined"&&sirandom(blocks.length)<Mod.gene&&n==0){
                Mod.generation(the_x,no,w)
                n=1
                console.log("aaaaa")
            }
        });
        
        if(n==0){
            if(sirandom(blocks.length)>1-(1.001**((player.y-600)/100))){
                //console.log(1/(Math.log(player.y-10/unit*-1)))
                blocks.push([[the_x,no],[w,25],"Norm"])
                console.log("nom")
            }else if(sirandom(blocks.length*1.2)>2/5){
                n=Math.ceil(sirandom(blocks.length*.7)*20)*10
                b=Math.ceil(sirandom(blocks.length*.6)*20)*10
                blocks.push([[the_x,no],[w,25],"Move",[the_x,no],[n,b],[50,20]])
                console.log("mov",n)
            }else if(sirandom(blocks.length*1.4)>4/5){
                n=Math.ceil(sirandom(blocks.length*.9)*100)/25+2
                blocks.push([[the_x,no],[w,25],"TSDi",[n,n],[0,0]])
                console.log("tds",n)
            }else if(sirandom(blocks.length*1.5)>2/5){
                n=sirandom(blocks.length*.5)*0.1
                blocks.push([[the_x,no],[w,25],"AIce",[n]])
                console.log("tds",n)
            }else{
                n=Math.ceil(sirandom(blocks.length*.2*1.3)*100)/50
                blocks.push([[the_x,no],[w,25],"TDis",[n,5],[0,0]])
                console.log("tds",n)
            }
        }
    }
}
function move_mplafom(){
    for (var i in blocks){
        array=blocks[i]
        if (array.length>2){
            switch(array[2]){
                case "Move":
                    if(Math.abs(array[0][0]-array[3][0])>=array[4][0]){
                        array[5][0]*=-1
                    }
                    if(Math.abs(array[0][1]-array[3][1])>=array[4][1]){
                        array[5][1]*=-1
                    }
                    array[0][0]+=array[5][0]/60;
                    array[0][1]+=array[5][1]/60;
            }
        }
    }
}
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}
const log=console.log
function get_p_or_n(a){
    return a/Math.abs(a)
}
function background(image,isinvx=false,isinvy=false){
drawimage("background",1,[Math.round((player.x/800)/10)*800-rollx/10,300-rolly/10],[800,600],true)    
var b=Math.ceil(scale[0]/800)+1
//log(b)
for(var x=1;x<b;x++){
    //log(x)
    drawimage("background",1,[Math.round((player.x/800)/10)*800-rollx/10-x*800,300-rolly/10],[800,600],true)
    drawimage("background",1,[Math.round((player.x/800)/10)*800-rollx/10+x*800,300-rolly/10],[800,600],true) 
}

}
ball=(x)=>{return Math.cos(Math.asin(x))}
function movement(){
    if (player.keypress[0]==1&&!player.istouch[2]==0){
        player.ys=-player.jumpspeed;
        player.timeinsky=0
        }
        if (player.keypress[0]==0&&!player.istouch[2]==1&&player.readytwicejump==0){
          //console.log("ready")
          player.readytwicejump=1
        }
        if(player.keypress[0]==1&&!player.istouch[2]==1&&player.readytwicejump==1&&player.twicejump==0){
          console.log("twicejump")
          player.ys=-player.jumpspeed/10*5;
          player.timeinsky=0;
          player.twicejump=1
          player.readytwicejump=0
        }
        if (player.keypress[1]==1){
        player.xs-=player.maxspeed*((1/(player.maxaddspeed))-1);
        player.xs*=player.maxaddspeed/(1-player.fact)
        //log(player.xs)
        }
        /*if (player.keypress[2]==1&&player.istouch[2]==0){
        player.g=2.45*unit;
        //player.timeinsky=0
        }else{
          player.g=9.8*unit
        }*/
        if (player.keypress[3]==1){
        player.xs+=player.maxspeed*((1/player.maxaddspeed)-1);
        player.xs*=player.maxaddspeed/(1-player.fact)
        //console.log(player.xs)
        }
}
function movement_phone(){
    
}
function startup() {
    var el = document.getElementsByTagName("canvas")[0];
    el.addEventListener("touchstart", handleStart, false);
    el.addEventListener("touchend", handleEnd, false);
    el.addEventListener("touchcancel", handleCancel, false);
    el.addEventListener("touchmove", handleMove, false);
    log("initialized.");
  }