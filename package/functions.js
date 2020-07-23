var cx;
var cy;
var cc=false;
document.onmousemove=function(e) {
    var cc=false;
	cx = event.clientX - cv.offsetLeft+400;
    cy = event.clientY - cv.offsetTop;
    //console.log(cx,cy)
}
cv.addEventListener('mousedown',function(){
	cc=true;
})
cv.addEventListener('mouseup',function(){
	cc=false;
})
function move(obj){
 obj.x+=obj.speed*unit/60+(obj.aoxs*5)/60
 obj.y+=((obj.ys-((1/60**2+2*player.timeinsky*1/60)*unit*player.g/2))/60)*unit+(obj.aoys*5)/60
 //log(((obj.ys-((1/60**2+2*player.timeinsky*1/60)*unit*player.g/2))/60)*unit+(obj.aoys*5)/60+obj.y,obj.y)
 if(obj.istouch[2]==0){
     obj.y+=+((1/60**2+2*player.timeinsky*1/60)*unit*player.g/2)*unit
 }
}
function gene(){
    no=stage.one.block[stage.one.block.length-1][0][1]
    no-=250
    //console.log(1/(Math.log(player.y/unit*-1)),player.y*-1)
    var the_x=stage.one.block[stage.one.block.length-1][0][0]+Math.random()*1000-500
    var w=150*(1.0003**((player.y-600)/100))
    console.log(w)
    if((stage.one.block.length+1)%50==0){
        console.log("wow")
        stage.one.block.push([[the_x,no],[500000,25],"1way"])
    }else{
        if(Math.random()>1-(1.001**((player.y-600)/100))){
            //console.log(1/(Math.log(player.y-10/unit*-1)))
            stage.one.block.push([[the_x,no],[w,25],"Norm"])
            console.log("nom")
        }else if(Math.random()>2/5){
            n=Math.ceil(Math.random()*20)*10
            b=Math.ceil(Math.random()*20)*10
            stage.one.block.push([[the_x,no],[w,25],"Move",[the_x,no],[n,b],[50,20]])
            console.log("mov",n)
        }else if(Math.random()>2/5){
            n=Math.ceil(Math.random()*100)/25+2
            stage.one.block.push([[the_x,no],[w,25],"TSDi",[n,n],[0,0]])
            console.log("tds",n)
        }else if(Math.random()>2/5){
            n=Math.random()*0.1
            stage.one.block.push([[the_x,no],[w,25],"AIce",[n]])
            console.log("tds",n)
        }else{
            n=Math.ceil(Math.random()*100)/50
            stage.one.block.push([[the_x,no],[w,25],"TDis",[n,5],[0,0]])
            console.log("tds",n)
        }
    }
}
function move_mplafom(){
    for (var i in stage.one.block){
        array=stage.one.block[i]
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
function log(...arg){
    if (dev_mode){
        console.log(...arg)
    }
}

