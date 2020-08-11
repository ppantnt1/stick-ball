var output
function detect(obj){
  output=[0,0,0,0,"Norm",obj.istouch[5],0]
  var touching
 for (var b in blocks){
  if(touching==1){
    break;
  } 
  b=b*1
  b=blocks.length-1-b
  n=blocks[b]
    touching=upcoll(b,n,touching,obj)
    if(!touching){
      downcoll(b,n,touching,obj)
    }
  }
 if (obj.y>590){
  output[2]=1
  obj
 }
 
 //console.log(output)
 
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
      log(Math.sin((Math.abs(n[0][0]-obj.x)-Math.abs(n[1][0]/2))/obj.scale))
      obj.aoxs=obj.g*Math.abs(Math.sin((Math.abs(n[0][0]-obj.x)-Math.abs(n[1][0]/2))/obj.scale))*-get_p_or_n(n[0][0]-obj.x)
      
  }
}
 var blank=((((obj.ys)/60)*unit+(obj.aoys*5)/60)+((1/60**2+2*player.timeinsky*1/60)*unit*player.g/2)*unit)+2
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