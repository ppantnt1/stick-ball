function detect(obj){
  output=[0,0,0,0,"Norm"]
 for (var n in stage.one.block){
   //console.log(n,stage.one.block)
   n=stage.one.block[n]
   //console.log(obj.y+10>n[0][1]-n[1][1]/2/*,obj.y<n[0][1]-n[1][1]/2,obj.x<n[0][0]+n[1][0]*/)
   if (obj.y+10>n[0][1]-n[1][1]/2&&obj.y<n[0][1]-n[1][1]/2&&obj.x<n[0][0]+n[1][0]/2&&obj.x>n[0][0]-n[1][0]/2){
      //console.log("a")
      output[2]=1
      output[4]=n[2]
      if ((n[2]&&n[2]=="Move")){
        //console.log(n)
        player.aoxs=n[5][0]/5
      }
      break;
      
   }
   var blank=((1/60**2+2*player.timeinsky*1/60)*player.g/2+obj.ys)/60*25
   //console.log(blank)
   //if (obj.y<590){console.log(blank,obj.y+blank,obj.y-blank+10>n[0][1]+n[1][1]/2,obj.y<n[0][1]-n[1][1]/2,obj.y)}
   if (blank>0.1){/*console.log(blank)*/}
   if (Math.abs(blank)>5){
     //console.log(blank)
    //console.log(obj.y+10>n[0][1]-n[1][1]/2/*,obj.y<n[0][1]-n[1][1]/2,obj.x<n[0][0]+n[1][0])
    if (obj.y+blank>n[0][1]+n[1][1]/2&&obj.y<n[0][1]-n[1][1]/2&&obj.x<n[0][0]+n[1][0]/2&&obj.x>n[0][0]-n[1][0]/2){
      console.log("a")
      obj.y=-n[1][1]+n[0][1]+5
      output[2]=1
      output[4]=n[2]
      if ((n[2]&&n[4]=="Move")){
          console.log(n)
          player.speed=n[5][0]/5
        }
        break;
        
    }
    
    
   }
   if (obj.y-10<n[0][1]+n[1][1]/2&&obj.y>n[0][1]+n[1][1]/2&&obj.x<n[0][0]+n[1][0]/2&&obj.x>n[0][0]-n[1][0]/2){
    //console.log("a")
    if (!(n[2]&&n[2]=="1way")){
      output[0]=1
      output[4]=n[2]
    }
   }
 }
 if (obj.y>590){
  output[2]=1
 }
 
 //console.log(output)
 return output
}
