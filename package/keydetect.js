function adddetectkey(dk,funcd,funcu){
  window.addEventListener("keydown",key=>{
   switch(key.code){
    case dk:
     funcd()
     break;
    }
   })
   window.addEventListener("keyup",key=>{
    switch(key.code){
     case dk:
      funcu()
      break;
     }
    })
}
adddetectkey("KeyW",()=>{player.keypress[0]=1},()=>{player.keypress[0]=0})
adddetectkey("KeyA",()=>{player.keypress[1]=1},()=>{player.keypress[1]=0})
adddetectkey("KeyS",()=>{player.keypress[2]=1},()=>{player.keypress[2]=0})
adddetectkey("KeyD",()=>{player.keypress[3]=1},()=>{player.keypress[3]=0})
adddetectkey("KeyE",()=>{changing+=1},()=>{})
adddetectkey("ArrowUp",()=>{player.keypress[0]=1},()=>{player.keypress[0]=0})
adddetectkey("ArrowLeft",()=>{player.keypress[1]=1},()=>{player.keypress[1]=0})
adddetectkey("ArrowDown",()=>{player.keypress[2]=1},()=>{player.keypress[2]=0})
adddetectkey("ArrowRight",()=>{player.keypress[3]=1},()=>{player.keypress[3]=0})
adddetectkey("ShiftLeft",()=>{player.keypress[4]=1},()=>{player.keypress[4]=0})