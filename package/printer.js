var pic,mypos=[]
function clearScreen(){
	ctx.clearRect(0, 0, cv.width, cv.height);
}
/*
function drawimage(img,dir,pos=[0,0]){
  mypos=[]
  pic=store[img];
  console.log(shift[img][0]+pos[0],pic)
  mypos[0]+=shift[img][0]+pos[0];
  mypos[1]-rolly+=shift[img][1]+pos[1]-rolly;
  ctx.globalAlpha=1
  if(dir==1){
	   console.log("d")	//draw image
		//l.u. corner coordinate=>(mx+sx,my+sy), e.g.: sx=-20, sy=10 => (mx-20,my+10)
		ctx.drawImage(pic,mypos[0],mypos[1]-rolly,25,25);
	}else{
		//save
		ctx.save();
    console.log("b")
		//zoom
		ctx.scale(-1/25,1/25);

		//draw
		ctx.drawImage(pic,mypos[0],mypos[1]-rolly,25,25);

		//back to the original property while doing ctx.save()
		ctx.restore();
	}
}*/
function drawball(pos=[0,0],r=10,color='#000000'){

	ctx.beginPath()
	ctx.lineWidth=5
	ctx.storkeStyle=color
	ctx.moveTo(pos[0],pos[1]-rolly+r)
	//console.log(Math.cos(180*pi/180),pos)
	for (var x=0;x<361;x++){
		//console.log(Math.sin(x/Math.PI),Math.PI)
		ctx.lineTo(Math.sin(((x*pi)/180))*r+pos[0],(Math.cos((x*pi)/180)*r+pos[1]-rolly))
		//console.log((Math.sin(x/Math.PI)*r+pos[0]),(Math.cos(x)*r+pos[1]-rolly))
	}
	ctx.stroke()
}
function drawblock(pa){
	var pas=[...pa]
	var pos=pas[0]
	var size=pas[1]
	ctx.beginPath()
	ctx.lineWidth=2
	ctx.moveTo(pos[0]-size[0]/2,pos[1]-rolly-size[1]/2)
	ctx.lineTo(pos[0]+size[0]/2,pos[1]-rolly-size[1]/2)
	ctx.lineTo(pos[0]+size[0]/2,pos[1]-rolly+size[1]/2)
	ctx.lineTo(pos[0]-size[0]/2,pos[1]-rolly+size[1]/2)
	ctx.lineTo(pos[0]-size[0]/2,pos[1]-rolly-size[1]/2)
	ctx.stroke()
}
