function detect(obj){
  output=[0,0,0,0,"Norm",obj.istouch[5]]
  var touching
 for (var b in stage.one.block){
   touching=0
   //console.log(n,stage.one.block)
   n=stage.one.block[b]
   b=b*1
   //console.log(obj.y+10>n[0][1]-n[1][1]/2/*,obj.y<n[0][1]-n[1][1]/2,obj.x<n[0][0]+n[1][0]*/)
   if (obj.y+player.ballscale>n[0][1]-n[1][1]/2&&obj.y<n[0][1]-n[1][1]/2&&obj.x<n[0][0]+n[1][0]/2&&obj.x>n[0][0]-n[1][0]/2){
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
   var blank=((1/60**2+2*obj.timeinsky*1/60)*obj.g/2+obj.ys)/60*25
   //console.log(blank)
   //if (obj.y<590){//console.log(blank,obj.y+blank,obj.y-blank+10>n[0][1]+n[1][1]/2,obj.y<n[0][1]-n[1][1]/2,obj.y)}
   if (blank>0.1){/*//console.log(blank)*/}
   if (Math.abs(blank)>5){
     //console.log(blank)
    //console.log(obj.y+10>n[0][1]-n[1][1]/2/*,obj.y<n[0][1]-n[1][1]/2,obj.x<n[0][0]+n[1][0])
    if (obj.y+blank>n[0][1]+n[1][1]/2&&obj.y<n[0][1]-n[1][1]/2&&obj.x<n[0][0]+n[1][0]/2&&obj.x>n[0][0]-n[1][0]/2){
      //console.log("a")
      obj.y=-n[1][1]+n[0][1]//+obj.ballscale/2
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
      output[2]=0
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
      output[2]=0
      //console.log(n[4])
    }
    if((n[4][0]>n[3][0]+n[3][1])){
      n[4][1]=0
      n[4][0]=0
      //console.log("reset")
    }
   }
  }
   if (obj.y-10<n[0][1]+n[1][1]/2&&obj.y>n[0][1]+n[1][1]/2&&obj.x<n[0][0]+n[1][0]/2&&obj.x>n[0][0]-n[1][0]/2){
    //console.log("a")
    if (!(n[2]&&n[2]=="1way")){
      output[0]=1
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
 if (obj.y>590){
  output[2]=1
  obj
 }
 
 //console.log(output)
 
 return output
}
