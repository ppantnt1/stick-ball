function physics(obj,dt){
    move_mplafom(dt);  
    applyvel(obj,dt);
    //if(!(dt>0))
    //    console.log(dt);
    //console.log(obj.xs);
    for(var i=0;i<1;i++){
        move(obj,dt/1);
        player.istouch=detect(player)
        correction(obj);
    }
}
function correction(obj){
    if(obj.istouch[0]!=0){
        if(obj.istouch[2]=="1way"&&obj.ys<0)
            return;
        var mag=obj.istouch[0],ang=obj.istouch[1];
        //console.log(ang)
        obj.x-=mag*Math.sin(ang);
        obj.y-=mag*Math.cos(ang);
        //console.log(obj.xs*Math.sin(ang)+obj.ys*Math.cos(ang))
        if(obj.xs*Math.sin(ang)+obj.ys*Math.cos(ang)>0){
            var v=obj.xs*Math.sin(ang)+obj.ys*Math.cos(ang);
            var bounciness=Math.sqrt(0.005);
            if(obj.keypress[2]==1){
                bounciness=1;
            }
            obj.xs-=(1+bounciness)*v*Math.sin(ang);
            obj.ys-=(1+bounciness)*v*Math.cos(ang);
            
            //obj.xs-=
        }
    }
}
function move(obj,dt){
    obj.ys+=obj.g*dt;
    obj.x+=obj.xs*unit*dt+(obj.aoxs)*dt;
    obj.y+=(obj.ys-obj.g*dt/2)*unit*dt+(obj.aoys)*dt;
}
function applyvel(obj,dt){
    //console.log(obj.keypress)
    if ((obj.istouch[2]=="Move")){
        //console.log(n)
        var n=blocks[obj.istouch[3]];
        obj.aoxs=n[5][0]
        obj.aoys=n[5][1]
    }
    var appforce=obj.maxforce;
    if(obj.istouch[0]>0&&obj.istouch[1]==0){
        if(Math.abs(obj.xs)>obj.fric*dt){
            obj.xs-=Math.sign(obj.xs)*obj.fric*dt;
        }else{
            obj.xs=0;
        }
    }else if(obj.istouch[0]==0){
        appforce=30*unit;
    }
    obj.xs*=Math.pow(.95,dt);
    obj.ys*=Math.pow(.95,dt);
    if (obj.keypress[0]==1&&obj.istouch[0]>0&&Math.cos(obj.istouch[1])>0){
        obj.ys=-obj.jumpspeed;
        //obj.timeinsky=0
        //console.log(obj.ys);
    }
    if (obj.keypress[0]==0&&!obj.istouch[0]!=0&&obj.readytwicejump==0){
        //obj.readytwicejump=1
    }
    if(obj.keypress[0]==1&&!obj.istouch[0]!=0&&obj.readytwicejump==1&&obj.twicejump==0){
        //console.log("twicejump")
        //obj.ys=-obj.jumpspeed*5;
        //obj.timeinsky=0;
        //obj.twicejump=1
        //obj.readytwicejump=0
    }
    if(obj.keypress[2]==1){
        //obj.ys=10*obj.jumpspeed;
    }
    if (obj.keypress[1]==1){
        obj.xs+=-appforce*dt//*((1/(obj.maxaddspeed))-1);
        //obj.xs*=obj.maxaddspeed/(1-obj.fact)
    }
    if(obj.keypress[1]==1&&obj.timeinsky==0&&obj.twicejump==1){
        //obj.xs-=obj.maxspeed*.5;
    }
    if (obj.keypress[3]==1){
        obj.xs+=appforce*dt//*((1/obj.maxaddspeed)-1);
        //obj.xs*=obj.maxaddspeed/(1-obj.fact)
    //console.log(obj.xs)
    }
    if(obj.keypress[3]==1&&obj.timeinsky==0&&obj.twicejump==1){
        //obj.xs+=obj.maxspeed*.5;
    }
}
