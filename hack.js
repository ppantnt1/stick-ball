Mods=[{
    Stroke:"#000000",
    Affect:function (){
        player.jumpspeed*=10
        console.log(player.jumpspeed)
    },
    generation:function (x,y,scale){
        blocks.push([[x,y],[scale,25],"Tper"])
        
    },
    gene:1,
    Name:"Tper",
},]
