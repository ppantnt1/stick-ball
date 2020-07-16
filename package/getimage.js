/*image prop.*/
//"store" array stocks images (with "Image" type) from "./pictures" folder
var store = {};
//"shift" is a automatic shift for the function "coDrawImage", based on "ctx.drawImage"
var shift={};

//function to load pictures into "store" array
function img(filename, shift_=[0,0], cofilename=".png"){

	var i = new Image();
	//get image
	i.src = "image/"+filename+cofilename;

	//if onload, store and shift array stocks the image and shift property into it respectively
	i.onload=function(){
		store[filename]=this;
		console.log(store[1],filename)
		shift[filename]=shift_;
	};

	return 0;
}
(function loadall() {
  img("running1",[12,12])
  img("running2",[12,12])
  img("running3",[12,12])
  img("running4",[12,12])
  img("stand",[12,12])

  //numbruh
	img("1",[63,80])
	img("2",[63,80])
	img("3",[63,80])
	img("4",[63,80])
	img("5",[63,80])
	img("6",[63,80])
	img("7",[63,80])
	img("8",[63,80])
	img("9",[63,80])
	img("0",[63,80])
})()

var loaded=false;

//function to check if all images are loaded
function checkIfLoaded(){
	if(Object.keys(store).length==15){
		loaded=true;
		
	}
	//console.log(loaded)
}
//check if loaded(looped)
setInterval(checkIfLoaded, 30);
