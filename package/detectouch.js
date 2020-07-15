function detect(obj){
  output=[0,0,0,0]
 for (var n in stage.one.block){
   //console.log(n,stage.one.block)
   n=stage.one.block[n]
   //console.log(obj.y+10>n[0][1]-n[1][1]/2/*,obj.y<n[0][1]-n[1][1]/2,obj.x<n[0][0]+n[1][0]*/)
   if (obj.y+10>n[0][1]-n[1][1]/2&&obj.y<n[0][1]-n[1][1]/2&&obj.x<n[0][0]+n[1][0]/2&&obj.x>n[0][0]-n[1][0]/2){
      //console.log("a")
      output[2]=1
   }
   var blank=((1/60+2*obj.timeinsky/60*obj.g)-obj.ys/60)*25
   //if (obj.y<590){console.log(blank,obj.y+blank,obj.y-blank+10>n[0][1]+n[1][1]/2,obj.y<n[0][1]-n[1][1]/2,obj.y)}
   if (blank>0.1){/*console.log(blank)*/}
   if (Math.abs(blank)>5){
    //console.log(obj.y+10>n[0][1]-n[1][1]/2/*,obj.y<n[0][1]-n[1][1]/2,obj.x<n[0][0]+n[1][0])
    if (obj.y+blank+10>n[0][1]+n[1][1]/2&&obj.y<n[0][1]-n[1][1]/2&&obj.x<n[0][0]+n[1][0]/2&&obj.x>n[0][0]-n[1][0]/2){
      //console.log("a")
      obj.y=-n[1][1]+n[0][1]+1
      output[2]=1
    }
   }
 }
 if (obj.y>590){
  output[2]=1
 }

 return output
}
