var output
function detect(obj){
    //detect only
    output=[0,0,"Norm",-1]
    var touching=[0,0];
    var lpos=[obj.x-obj.xs*unit/60,obj.y-obj.ys*unit/60]
    //log(obj.x,obj.y,lpos[0],lpos[1])
    for (var b in blocks){
        b=b*1
        var c=blocks.length-1-b
        //console.log(c)
        var n=blocks[c]
        if(Math.abs(obj.y-n[0][1])>1000){
            continue;
        }
        touching=istouching(n,obj)
        if(touching[0]!=0){
            output[0]=touching[0]
            output[1]=touching[1]
            output[2]=n[2];
            output[3]=c;
            break;
        } 

    }
    //if (obj.y>590){
    //    output[0]=1;
    //    output[1]=0;
    //}

    //console.log(output)
    //log(output)
    return output
}
function sqdist(x,y){
    return x*x+y*y
}
function vecmul(u,v){
    return u[0]*v[0]+u[1]*v[1];
}
function axisoverlap(
    projvec,//vec2
    obj,//player obj
    pts,//array of vec2
){
    var mag=Math.sqrt(sqdist(projvec[0],projvec[1]));
    var mxo=obj.scale*mag,mno=-obj.scale*mag;
    var mxp=-10000000,mnp=10000000;
    for(var i in pts){
        var v=pts[i];
        var val=vecmul(projvec,v);
        mxp=Math.max(mxp,val);
        mnp=Math.min(mnp,val);
    }
    //console.log(mxo,mno,mxp,mnp);
    if(mxp<mno||mnp>mxo){
        return 0;
    }
    
    return Math.sign(mxp,mnp)*Math.min(Math.abs(mxp-mno),Math.abs(mnp-mxo))/mag;
}

function istouching(n,obj){
    var ovlp=0,movlp=10000000,dir=0;
    var points=[];
    var axes=[[1,0],[0,1]];
    for(var i=-1;i<2;i+=2){
        for(var j=-1;j<2;j+=2){
            points.push([n[0][0]+i*n[1][0]/2-obj.x,n[0][1]+j*n[1][1]/2-obj.y]);
        }
    }
    for(var i=0;i<2;i++){
        ovlp=axisoverlap(axes[i],obj,points);
        if(Math.abs(ovlp)<movlp){
            movlp=Math.abs(ovlp);
            dir=Math.atan2(Math.sign(ovlp)*axes[i][0],Math.sign(ovlp)*axes[i][1]);
        }
    }

    for(var i=0;i<4;i++){
        ovlp=axisoverlap(points[i],obj,points);
        if(Math.abs(ovlp)<movlp){
            movlp=Math.abs(ovlp);
            dir=Math.atan2(Math.sign(ovlp)*points[i][0],Math.sign(ovlp)*points[i][1]);
        }
    }

//    if(movlp>0)
        //console.log(n[2],dir,movlp);
    return [movlp,dir]
}
