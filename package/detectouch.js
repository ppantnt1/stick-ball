var output
function detect(obj){
  output=[0,0,0,0,"Norm",obj.istouch[5],0]
  var touching
  var lpos=[obj.x-obj.xs*unit/60,obj.y-obj.ys*unit/60]
  //log(obj.x,obj.y,lpos[0],lpos[1])
 for (var b in blocks){
  if(touching==1){
    break;
  } 
  
  b=b*1
  b=blocks.length-1-b
  n=blocks[b]
  var s
  
  var p=[0,0]
  if(true){
    if(obj.x>n[0][0]){
      s=0
      p[0]=Math.min(obj.x,n[1][0]/2+n[0][0])
      //console.log(obj.x,n[0][0]+n[1][0],Math.min(obj.x,n[1][0]+n[0][0]),rollx)
    }else{
      p[0]=Math.max(obj.x,-n[1][0]/2+n[0][0])
    }
    if(obj.y>n[0][1]){
      p[1]=Math.min(obj.y,n[1][1]/2+n[0][1])
      //console.log(obj.x,n[0][0]+n[1][0],Math.min(obj.x,n[1][0]+n[0][0]),rollx)
    }else{
      p[1]=Math.max(obj.y,-n[1][1]/2+n[0][1])
    }
    if(obj.y>n[0][1]&&lpos[1]<n[0][1]){
      if(Math.abs(obj.x-n[0][0])<n[1][0]/2){
        log("yo",n[2])
          output[2]=true
          //obj.y=n[0][0]+n[1][0]
          s=1
          touching=1
      }
    }
    
    //console.log(((obj.x-p[0])**2+(obj.y-p[1])**2)**0.5,b,obj.scale+.1)
    
    if(((obj.x-p[0])**2+(obj.y-p[1])**2)**0.5<=obj.scale+.1||touching==1){
      touching=1
      if (n[2]=="Move"){
        obj.aoxs=n[5][0]/5
        obj.aoys=n[5][1]/5
      }
      output[5]=b+1
      output[6]=b
      
      output[4]=n[2]
      if(true){
        if(n[2]=="TDis"){
          if(touching||n[4][0]>1/120){n[4][0]+=1/60}
          if(n[4][0]>n[3][0]){
           
           n[4][1]=1
            //console.log(n[4][1])
         }
         if((n[2]=="TDis"&&n[4][1]&&touching==1)){
           output[2]=touching=0
           //console.log(n[4])
         }
         if((n[4][0]>n[3][0]+n[3][1])&&(n[2]=="TDis"||n[2]=="TSDi")){
           n[4][1]=0
           n[4][0]=0
         }
        }
        if(n[2]=="TSDi"){
          //console.log("hgh")
          if(true){n[4][0]+=1/60;
           //console.log(n[4][0])
         }
          if(n[4][0]>n[3][0]){
           
           n[4][1]=1
           //console.log(n[4][0])
         }
         if((n[2]=="TSDi"&&n[4][1]&&touching==1)){
           output[2]=touching=0
           //log(n[4])
         }
         if((n[4][0]>n[3][0]+n[3][1])){
           n[4][1]=0
           n[4][0]=0
           //console.log("reset")
         }
        }
        if(touching){
          if(p[1]-n[0][1]<0){
            output[2]=true
            obj.y=-n[1][1]/2+n[0][1]-obj.scale*Math.cos((obj.x-p[0])/obj.scale/2*pi)
          }else{
            if(n[2]!="1way"){
              output[0]=true
              obj.y=n[1][1]/2+n[0][1]+obj.scale*Math.cos((obj.x-p[0])/obj.scale/2*pi)+1
              //obj.ys*=-1
            }
          }
        }
       }
    }
    if(touching){
          if(p[1]-n[0][1]<0||s==1){
            output[2]=true
            obj.y=-n[1][1]/2+n[0][1]-obj.scale*Math.cos((obj.x-p[0])/obj.scale/2*pi)
          }else{
            if(n[2]!="1way"){
              output[0]=true
              obj.y=n[1][1]/2+n[0][1]+obj.scale*Math.cos((obj.x-p[0])/obj.scale/2*pi)+1
              //obj.ys*=-1
            }
          }
        }
  }
  
  //ctx.beginPath()
  //ctx.moveTo(obj.x-rollx,obj.y-rolly)
  //ctx.lineTo(p[0]-rollx,p[1]-rolly)
  //ctx.stroke()
  //note_pos(0,p[0]-rollx,p[1]-rolly)
  //console.log(p[0]-n[0][0],b)
  
  
    touching=upcoll(b,n,touching,obj)
    if(!touching){
      downcoll(b,n,touching,obj)
    }
  }
  if(touching==0){
    //console.log("aaa")
  }
 if (obj.y>590){
  output[2]=1
  obj
 }
 
 //console.log(output)
 //log(output)
 return output
}

function upcoll(b,n,touchin,obj){
  var touching=0

  touching=0
 //console.log(n,blocks)

 
 //console.log(obj.y+10>n[0][1]-n[1][1]/2/*,obj.y<n[0][1]-n[1][1]/2,obj.x<n[0][0]+n[1][0]*/)
 if (obj.y+obj.scale>n[0][1]-n[1][1]/2&&obj.y<n[0][1]-n[1][1]/2&&obj.x<n[0][0]+n[1][0]/2&&obj.x>n[0][0]-n[1][0]/2){
    //console.log("a")
    output[2]=1
    output[4]=n[2]
    if ((n[2]&&n[2]=="Move")){
      //console.log(n)
      obj.aoxs=n[5][0]/5
      obj.aoys=n[5][1]/5
    }
    touching=1
    
 }
 var ballaa=obj.scale
 if (obj.y+obj.scale>n[0][1]-n[1][1]/2&&obj.y<n[0][1]-n[1][1]/2&&Math.abs(n[0][0]-obj.x)-Math.abs(n[1][0]/2)>0&&obj.y<n[0][1]-n[1][1]/2&&Math.abs(n[0][0]-obj.x)-Math.abs(n[1][0]/2)<obj.scale){
 ballaa=ball((Math.abs(n[0][0]-obj.x)-Math.abs(n[1][0]/2))/obj.scale)*obj.scale
 //log(ballaa,b)
  if (obj.y+ballaa>n[0][1]-n[1][1]/2&&obj.y<n[0][1]-n[1][1]/2){
      //console.log("a")
      output[2]=1
      output[4]=n[2]
      if ((n[2]=="Move")){
        //console.log(n)
        obj.aoxs=n[5][0]/5
        obj.aoys=n[5][1]/5
      }
      touching=1
      //log(Math.sin((Math.abs(n[0][0]-obj.x)-Math.abs(n[1][0]/2))/obj.scale))
      //obj.aoxs=obj.g*Math.abs(Math.sin((Math.abs(n[0][0]-obj.x)-Math.abs(n[1][0]/2))/obj.scale))*-get_p_or_n(n[0][0]-obj.x)
      
  }
}
 var blank=obj.ys/60+obj.g/60
 //log(obj.y,obj.y+blank,n[0][1],(1/60**2+2*player.timeinsky*1/60)*unit*player.g/2,obj.y+blank+obj.scale>n[0][1]+n[1][1]/2,n[0][1]+n[1][1]/2)
 //if (obj.y<590){//console.log(blank,obj.y+blank,obj.y-blank+10>n[0][1]+n[1][1]/2,obj.y<n[0][1]-n[1][1]/2,obj.y)}
 if (blank>0.1){/*//console.log(blank)*/}
 if (Math.abs(blank)>player.scale/2){
   //console.log(blank)
  //console.log(obj.y+10>n[0][1]-n[1][1]/2/*,obj.y<n[0][1]-n[1][1]/2,obj.x<n[0][0]+n[1][0])
  if (obj.y+blank>n[0][1]-n[1][1]/2&&obj.y<n[0][1]+n[1][1]/2&&obj.x<n[0][0]+n[1][0]/2&&obj.x>n[0][0]-n[1][0]/2){
    //console.log("a")
    output[2]=1
    output[4]=n[2]
    if ((n[2]&&n[2]=="Move")){
        //console.log(n)
        obj.aoxs=n[5][0]/5
        obj.aoys=n[5][1]/5
      }
      touching=1
      
  }
  
  
 }
// //console.log(touching)
  if(touching){
    output[5]=b+1
    output[6]=b
    //console.log(b+1)
  }
if(true){
 if(n[2]=="TDis"){
   if(touching||n[4][0]>1/120){n[4][0]+=1/60}
   if(n[4][0]>n[3][0]){
    
    n[4][1]=1
     //console.log(n[4][1])
  }
  if((n[2]=="TDis"&&n[4][1]&&touching==1)){
    output[2]=touching=0
    //console.log(n[4])
  }
  if((n[4][0]>n[3][0]+n[3][1])&&(n[2]=="TDis"||n[2]=="TSDi")){
    n[4][1]=0
    n[4][0]=0
  }
 }
 if(n[2]=="TSDi"){
   //console.log("hgh")
   if(true){n[4][0]+=1/60;
    //console.log(n[4][0])
  }
   if(n[4][0]>n[3][0]){
    
    n[4][1]=1
    //console.log(n[4][0])
  }
  if((n[2]=="TSDi"&&n[4][1]&&touching==1)){
    output[2]=touching=0
    //log(n[4])
  }
  if((n[4][0]>n[3][0]+n[3][1])){
    n[4][1]=0
    n[4][0]=0
    //console.log("reset")
  }
 }
 if(touching){
  obj.y=+n[0][1]-obj.scale-n[1][1]/2+(obj.scale-ballaa)
 }
}
return touching
}
function downcoll(b,n,t,o){
  var obj=o
  if (obj.y-obj.scale<n[0][1]+n[1][1]/2&&obj.y>n[0][1]+n[1][1]/2&&Math.abs(n[0][0]-obj.x)-Math.abs(n[1][0]/2)>0&&obj.y<n[0][1]-n[1][1]/2&&Math.abs(n[0][0]-obj.x)-Math.abs(n[1][0]/2)<obj.scale){
    ballaa=ball((Math.abs(n[0][0]-obj.x)-Math.abs(n[1][0]/2))/obj.scale)*obj.scale
    //log(ballaa,b)
     if (obj.y-ballaa<n[0][1]+n[1][1]/2&&obj.y>n[0][1]+n[1][1]/2){
         //console.log("a")
         output[0]=1
         output[4]=n[2]
         if ((n[2]=="Move")){
           //console.log(n)
           obj.aoxs=n[5][0]/5
           obj.aoys=n[5][1]/5
         }
         touching=1
         obj.aoxs=obj.g*Math.abs(ballaa)*-get_p_or_n(n[0][0]-obj.x)
         
     }
   }
    if (obj.y-obj.scale<n[0][1]+n[1][1]/2&&obj.y>n[0][1]+n[1][1]/2&&obj.x<n[0][0]+n[1][0]/2&&obj.x>n[0][0]-n[1][0]/2){
      //console.log("a")
      if (!(n[2]&&n[2]=="1way")){
        output[0]=1
        output[6]=b
        output[4]=n[2]
      }
      //console.log(n[2]=="TDis",n[4][1],touching==1)
      if(n[2]=="TDis"&&n[4][1]){
        output[0]=0
        //console.log("q")
      }
    if(n[2]=="TSDi"&&n[4][1]){
        output[0]=0
        //console.log("q")
      }
    }
}
function lrcoll(b,n,t,o){
  if (obj.y<n[0][1]+n[1][1]/2&&obj.y>n[0][1]+n[1][1]/2&&Math.abs(n[0][0]-obj.x)-Math.abs(n[1][0]/2)>0&&obj.y<n[0][1]-n[1][1]/2&&Math.abs(n[0][0]-obj.x)-Math.abs(n[1][0]/2)<obj.scale){
    ballaa=ball((Math.abs(n[0][0]-obj.x)-Math.abs(n[1][0]/2))/obj.scale)*obj.scale
    //log(ballaa,b)
     if (obj.y-ballaa<n[0][1]+n[1][1]/2&&obj.y>n[0][1]+n[1][1]/2){
         //console.log("a")
         output[0]=1
         output[4]=n[2]
         if ((n[2]=="Move")){
           //console.log(n)
           obj.aoxs=n[5][0]/5
           obj.aoys=n[5][1]/5
         }
         touching=1
         obj.aoxs=obj.g*Math.abs(ballaa)*-get_p_or_n(n[0][0]-obj.x)
         
     }
   }
    if (obj.y-obj.scale<n[0][1]+n[1][1]/2&&obj.y>n[0][1]+n[1][1]/2&&obj.x<n[0][0]+n[1][0]/2&&obj.x>n[0][0]-n[1][0]/2){
      //console.log("a")
      //console.log(n[2]=="TDis",n[4][1],touching==1)
      if(n[2]=="TDis"&&n[4][1]){
        output[0]=0
        //console.log("q")
      }
    if(n[2]=="TSDi"&&n[4][1]){
        output[0]=0
        //console.log("q")
      }
    }
    return touching
}