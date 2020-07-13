/*image prop.*/
//"store" array stocks images (with "Image" type) from "./pictures" folder
var store = {};
//"shift" is a automatic shift for the function "coDrawImage", based on "ctx.drawImage"
var shift={};

//function to load pictures into "store" array
function img(filename, shift_=[0,0], cofilename=".png"){

	var i = new Image();
	//get image
	i.src = "image/"+filename;

	//if onload, store and shift array stocks the image and shift property into it respectively
	i.onload=function(){
		store[filename]=this;
		shift[filename]=shift_;
	};

	return 0;
}
(function loadall() {
  img("running1.png",[12,12])
  img("running2.png",[12,12])
  img("running3.png",[12,12])
  img("running4.png",[12,12])
  img("stand.png",[12,12])
})()

var loaded=false;

//function to check if all images are loaded
function checkIfLoaded(){
	if(Object.keys(store).length==5){
		loaded=true;
	}
}
//check if loaded(looped)
setInterval(checkIfLoaded, 30);
