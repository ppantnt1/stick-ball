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
