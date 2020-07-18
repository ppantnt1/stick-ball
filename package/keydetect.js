function adddetectkey(dk,funcd,funcu){
  window.addEventListener("keydown",key=>{
   switch(key.key){
    case dk:
     funcd()
     break;
    }
   })
   window.addEventListener("keyup",key=>{
    switch(key.key){
     case dk:
      funcu()
      break;
     }
    })
}
adddetectkey("w",()=>{player.keypress[0]=1},()=>{player.keypress[0]=0})
adddetectkey("a",()=>{player.keypress[1]=1},()=>{player.keypress[1]=0})
adddetectkey("s",()=>{player.keypress[2]=1},()=>{player.keypress[2]=0})
adddetectkey("d",()=>{player.keypress[3]=1},()=>{player.keypress[3]=0})
adddetectkey("e",()=>{changing+=1},()=>{})
adddetectkey("ArrowUp",()=>{player.keypress[0]=1},()=>{player.keypress[0]=0})
adddetectkey("ArrowLeft",()=>{player.keypress[1]=1},()=>{player.keypress[1]=0})
adddetectkey("ArrowDown",()=>{player.keypress[2]=1},()=>{player.keypress[2]=0})
adddetectkey("ArrowRight",()=>{player.keypress[3]=1},()=>{player.keypress[3]=0})