var pic,mypos=[]
function clearScreen(){
	ctx.clearRect(0, 0, cv.width, cv.height);
}

function drawimage(img,dir,pos=[0,0],size=[25,25]){
  mypos=[]
  pic=store[img];
  
  mypos[0]=shift[img][0]/(pic.width/size[0])+pos[0];
  mypos[1]=shift[img][1]/(pic.height/size[1])+pos[1];
  console.log()
  ctx.globalAlpha=1
  if(dir==1){
	   //console.log("d")	//draw image
		//l.u. corner coordinate=>(mx+sx,my+sy), e.g.: sx=-20, sy=10 => (mx-20,my+10)
		//console.log(pic,mypos[0],mypos[1],size[0],size[1])
		ctx.drawImage(pic,mypos[0],mypos[1],size[0],size[1]);
	}else{
		//save
		ctx.save();
    console.log("b")
		//zoom
		ctx.scale(-1/25,1/25);

		//draw
		ctx.drawImage(pic,mypos[0]-rollx,mypos[1]-rolly,25,25);

		//back to the original property while doing ctx.save()
		ctx.restore();
	}
}
function drawball(pos=[0,0],r=10,color='#000000'){

	ctx.beginPath()
	ctx.lineWidth=5
	ctx.strokeStyle=color;
	ctx.moveTo(pos[0]-rollx,pos[1]-rolly+r)
	//console.log(Math.cos(180*pi/180),pos)
	for (var x=0;x<361;x++){
		//console.log(Math.sin(x/Math.PI),Math.PI)
		ctx.lineTo(Math.sin(((x*pi)/180))*r+pos[0]-rollx,(Math.cos((x*pi)/180)*r+pos[1]-rolly))
		//console.log((Math.sin(x/Math.PI)*r+pos[0]-rollx),(Math.cos(x)*r+pos[1]-rolly))
	}
	ctx.stroke()
}
function drawblock(pa){
	var pas=[...pa]
	var pos=pas[0]
	var size=pas[1]
	switch(pa[2]){
		case "Norm":
			ctx.strokeStyle="#0000FF"
		break;
		case "Move":
			ctx.strokeStyle="#FF0000"
			break;
		case "1way":
			ctx.strokeStyle="#00FF00"
			break;
	}
	ctx.beginPath()
	ctx.lineWidth=2
	ctx.moveTo(pos[0]-rollx-size[0]/2,pos[1]-rolly-size[1]/2)
	ctx.lineTo(pos[0]-rollx+size[0]/2,pos[1]-rolly-size[1]/2)
	ctx.lineTo(pos[0]-rollx+size[0]/2,pos[1]-rolly+size[1]/2)
	ctx.lineTo(pos[0]-rollx-size[0]/2,pos[1]-rolly+size[1]/2)
	ctx.lineTo(pos[0]-rollx-size[0]/2,pos[1]-rolly-size[1]/2)
	ctx.stroke()
}
function printnum(num=0,x=100,y=100,size=15){
	//mudQ here?
	//hello??
	//reply me
	var p=""+num
	for (var i=0;i<p.length;i++){
		//console.log(store["1"],6567587668,store[p[i]],p,num)
		drawimage(p[i],1,[x+i*size,y],[size,size/125*160])
		
	}
}

