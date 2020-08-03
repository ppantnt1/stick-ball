class monster{
 constructor(pos=[0,0],type){
  this.x=pos[0]
  this.y=pos[1]
 }
}
class button{
    constructor(img,pos=[],siz=[],zoom=1.2,func=()=>{},isTfunc=()=>{},showwhen=()=>{return true}){
        this.img=img
        this.show=showwhen
        this.pos=pos
        this.siz=siz
        this.zoom=zoom
        this.func=func
        this.isTfunc=isTfunc
        this.keydown=0
        this.keyup=0
    }
    run(){
        //log(cc)
        if(this.show()){
            var isT=false,size=this.siz,pos=this.pos,img=this.img,isTfunc=this.isTfunc,zoom=this.zoom,func=this.func

            if(cx>pos[0]-size[0]/2&&cx<pos[0]+size[0]/2){
                if(cy>pos[1]-size[1]/2&&cy<pos[1]+size[1]/2){
                    isT=true
                }
            }
            
            if(cc){
                this.keydown=1
                this.keyup=0
                log(2)
            }
            if(this.keydown&&!cc){
                    this.keydown=0
                    this.keyup=1
                }
            if (isT){
                
                isTfunc()
                size=[size[0]*zoom,size[1]*zoom]
                
                
                if(this.keyup){func()}
            }
            drawimage(img,1,pos,size)
            
        }
        //console.log(size)
        //console.log(!main,!choose)
    }
    
}

var buttons=[]


setTimeout(()=>{
buttons.push(new button("Easy",[100,300],[75,25],1.1,()=>{diff=1,main=1},undefined,()=>{return (!main&&choose)}))
buttons.push(new button("Normal",[250,300],[75,25],1.1,()=>{diff=2,main=1;},undefined,()=>{return (!main&&choose)}))
buttons.push(new button("Hard",[400,300],[75,25],1.1,()=>{diff=3,main=1},undefined,()=>{return (!main&&choose)}))
buttons.push(new button("So Hard",[550,300],[75,25],1.1,()=>{diff=4,main=1},undefined,()=>{return (!main&&choose)}))
buttons.push(new button("HELL",[700,300],[75,25],1.1,()=>{diff=5,main=1},undefined,()=>{return(!main&&choose)}))
buttons.push(new button("PLAY",[400,300],[75,25],1.2,()=>{choose=1},undefined,()=>{return(!main&&!choose)}));
console.log(buttons)},300)