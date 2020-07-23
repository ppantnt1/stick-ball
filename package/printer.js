var pic,mypos=[]
function clearScreen(){
	ctx.clearRect(0, 0, cv.width, cv.height);
}

function drawimage(img,dir=1,pos=[0,0],size=[25,25],ingame=false){
  mypos=[]
  pic=store[img];
  //console.log(pic)
  //console.log(size,pos)
  
  mypos[0]=(-shift[img][0]/(pic.width/size[0])+pos[0]);
  mypos[1]=(-shift[img][1]/(pic.height/size[1])+pos[1]);
  //console.log(ingame,img)
  if(ingame){
	  mypos[0]-=(800-scale[0])/2
	  mypos[0]/=(scale[0]/800)
	  mypos[1]-=(600-scale[1])/2
	  mypos[1]/=(scale[1]/600)
	  size[0]/=(scale[0]/800)
	  size[1]/=(scale[1]/600)
	  //console.log(mypos,size)
  }
  //console.log()
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
		ctx.scale[0]*800(-1/25,1/25);

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
	ctx.moveTo((pos[0]-rollx-(800-scale[0])/2)/scale[0]*800,((pos[1]-rolly)-r-(600-scale[1])/2)/scale[1]*600)
	//console.log(Math.cos(180*pi/180),pos)
	for (var y=0;y<360;y++){
		//console.log(Math.sin(x/Math.PI),Math.PI)
		var x=(y%360)///2-45
		ctx.lineTo(((pos[0]-rollx)-(Math.sin((x*pi)/180)*r)-(800-scale[0])/2)/scale[0]*800,((pos[1]-rolly)-(Math.cos((x*pi)/180)*r)-(600-scale[1])/2)/scale[1]*600)
		//console.log((Math.sin(x/Math.PI)*r+pos[0]-rollx),(Math.cos(x)*r+pos[1]-rolly))
	}
	ctx.stroke()
}
function drawblock(pa){
	ctx.globalAlpha=1
	var pas=[...pa]
	var pos=pas[0]
	var size=pas[1]
	switch(pa[2]){
		case "Norm":
			ctx.strokeStyle="#FFFFFF"
		break;
		case "Move":
			ctx.strokeStyle="#FF0000"
			//drawblock([[pos[0],pos[1]]])
			break;
		case "1way":
			ctx.strokeStyle="#00FF00"
			break;
		case "TDis":
			//ctx.globalAlpha=(1-(pa[4][0]/pa[3][0]))**0.5
			ctx.strokeStyle=`rgba(0,255,255,${1-(pa[4][0]/pa[3][0])**2})`

			if(pa[4][1]){return;}
			//printnum(pa[3][0],pos[0]-rollx,pos[1]-rolly,25,1)
			break;
		case "TSDi":
			if(!pa[4][1]){
				ctx.strokeStyle=`rgba(0,128,255,${0.7*(1-((pa[4][0])/pa[3][0])**2)+0.3})`
				//log(2)
			}else{
				ctx.strokeStyle=`rgba(${255-(255*((pa[4][0]-pa[3][0])/pa[3][1])**2)},128,${(255*((pa[4][0]-pa[3][0])/pa[3][1])**4)},${0.7*(1*((pa[4][0]-pa[3][0])/pa[3][1])**4)+0.3})`
				//log(1)
			}
			//log(pa[4][1])
			break;
		case "AIce":
			ctx.strokeStyle=`rgb(0,255,128)`
			break;	
		case "Mov2":
			ctx.strokeStyle="#FF0000"

	}
	ctx.beginPath()
	ctx.lineWidth=2
	ctx.moveTo(((pos[0]-rollx-size[0]/2-(800-scale[0])/2)/(scale[0]/800)),(pos[1]-rolly-size[1]/2-(600-scale[1])/2)/(scale[1]/600))
	ctx.lineTo(((pos[0]-rollx+size[0]/2-(800-scale[0])/2)/(scale[0]/800)),(pos[1]-rolly-size[1]/2-(600-scale[1])/2)/(scale[1]/600))
	ctx.lineTo(((pos[0]-rollx+size[0]/2-(800-scale[0])/2)/(scale[0]/800)),(pos[1]-rolly+size[1]/2-(600-scale[1])/2)/(scale[1]/600))
	ctx.lineTo(((pos[0]-rollx-size[0]/2-(800-scale[0])/2)/(scale[0]/800)),(pos[1]-rolly+size[1]/2-(600-scale[1])/2)/(scale[1]/600))
	ctx.lineTo(((pos[0]-rollx-size[0]/2-(800-scale[0])/2)/(scale[0]/800)),(pos[1]-rolly-size[1]/2-(600-scale[1])/2)/(scale[1]/600))
	ctx.stroke()
}
function printnum(num=0,x=100,y=100,size=15,ing=0){
	//mudQ here?
	//hello??
	//reply me
	var p=""+num
	var o=0
	for (var i=0;i<p.length;i++){
		
		//console.log(store["1"],6567587668,store[p[i]],p,num)
		drawimage(p[i],1,[x+o*size,y],[size,size/125*160],ing)
		if(p[i]!="."&&p[i+1]!="."){
			o+=1
		}else{
			o+=0.6
		}
		
	}
}

