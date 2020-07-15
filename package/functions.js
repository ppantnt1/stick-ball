function move(obj,sx,sy){
 obj.x+=sx*25
 obj.y+=sy/60*25
}
function gene(){
    no=stage.one.block[stage.one.block.length-1][0][1]
    no+=150
    stage.one.block.push([[Math.random()*800,no],[100,25]])
}
