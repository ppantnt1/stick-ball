function move(obj,sx,sy){
 obj.x+=sx*unit/60
 obj.y+=sy/60*unit
}
function gene(){
    no=stage.one.block[stage.one.block.length-1][0][1]
    no-=150
    var the_x=stage.one.block[stage.one.block.length-1][0][0]+Math.random()*1000-500
    if(Math.random()>1/10){
        stage.one.block.push([[the_x,no],[100,25]])
        console.log("nom")
    }else{
        n=Math.floor(Math.random()*5)*40
        stage.one.block.push([[the_x,no],[100,25],"Move",[the_x,no],[n,0],[50,0]])
        console.log("mov",n)
    }
}
function move_mplafom(){
    for (var i in stage.one.block){
        array=stage.one.block[i]
        if (array.length>2){
            switch(array[2]){
                case "Move":
                    if(Math.abs(array[0][0]-array[3][0])>=array[4][0]){
                        array[5][0]*=-1
                    }
                    if(Math.abs(array[0][1]-array[3][1])>=array[4][1]){
                        array[5][1]*=-1
                    }
                    array[0][0]+=array[5][0]/60;
                    array[0][1]+=array[5][1]/60;
            }
        }
    }
}
