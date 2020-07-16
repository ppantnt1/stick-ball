function move(obj,sx,sy){
 obj.x+=sx*25
 obj.y+=sy/60*25
}
function gene(){
    no=stage.one.block[stage.one.block.length-1][0][1]
    no-=150
    var the_x=stage.one.block[stage.one.block.length-1][0][0]+Math.random()*1000-500
    stage.one.block.push([[the_x,no],[100,25]])
}
