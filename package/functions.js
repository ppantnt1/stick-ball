var cx;
var cy;
var cc=false;
document.onmousemove=function(e) {
    var cc=false;
	cx = event.clientX - cv.offsetLeft+400;
    cy = event.clientY - cv.offsetTop;
    //console.log(cx,cy)
}

//if mouse down, set cursor_click to true, so in the next game tick the mainloop function can detect
cv.addEventListener('mousedown',function(){
	cc=true;
})
cv.addEventListener('mouseup',function(){
	cc=false;
})
function move(obj,sx,sy){
 obj.x+=sx*unit/60
 obj.y+=sy/60*unit
}
function gene(){
    no=stage.one.block[stage.one.block.length-1][0][1]
    no-=250
    var the_x=stage.one.block[stage.one.block.length-1][0][0]+Math.random()*1000-500
    if((stage.one.block.length)%100==0){
        console.log("wow")
        stage.one.block.push([[the_x,no],[500000,25],"1way"])
    }else{
        if(Math.random()>1/3){
            stage.one.block.push([[the_x,no],[100,25],"Norm"])
            console.log("nom")
        }else if(Math.random()>4/5){
            n=Math.ceil(Math.random()*20)*10
            b=Math.ceil(Math.random()*20)*10
            stage.one.block.push([[the_x,no],[100,25],"Move",[the_x,no],[n,b],[50,20]])
            console.log("mov",n)
        }else if(Math.random()>2/5){
            n=Math.ceil(Math.random()*100)/25+2
            stage.one.block.push([[the_x,no],[100,25],"TSDi",[n,n],[0,0]])
            console.log("tds",n)
        }else{
            n=Math.ceil(Math.random()*100)/50
            stage.one.block.push([[the_x,no],[100,25],"TDis",[n,5],[0,0]])
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
function button(img,pos=[],siz=[],zoom=1.2,func=()=>{}){
    var isT=false,size=siz

    if(cx>pos[0]-size[0]/2&&cx<pos[0]+size[0]/2){
        if(cy>pos[1]-size[1]/2&&cy<pos[1]+size[1]/2){
            isT=true
        }
    }
    if (isT){
        console.log(11)
        size=[size[0]*zoom,size[1]*zoom]
        if(cc){
            console.log(111)
            func()
        }
    }
    //console.log(size)
    drawimage(img,1,pos,size)
}