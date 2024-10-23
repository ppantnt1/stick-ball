/*var jcv,jctx
if(d=="mobile"){
    let paint = false;
    var coord={x:0,y:0}
    jcv=document.getElementById("joystick")
    jctx=jcv.getContext("2d")
    setTimeout(() => {        
        resize(); 
        background();
        document.addEventListener('mousedown', startDrawing);
        document.addEventListener('mouseup', stopDrawing);
        document.addEventListener('mousemove', Draw);

        document.addEventListener('touchstart', startDrawing);
        document.addEventListener('touchend', stopDrawing);
        document.addEventListener('touchcancel', stopDrawing);
        document.addEventListener('touchmove', Draw);
        window.addEventListener('resize', resize);

        // document.getElementById("x_coordinate").innerText = 0;
        // document.getElementById("y_coordinate").innerText = 0;
        // document.getElementById("speed").innerText = 0;
        // document.getElementById("angle").innerText = 0;
    },1000);
    var width, height, radius, x_orig, y_orig;

    function resize() {
        width = window.innerWidth;
        radius = 30;
        height = radius * 6.5;
        x_orig = radius*3;
        y_orig = height / 3;
        console.log(width/2,"asdxweas")
        jctx.beginPath();
        jctx.arc(x_orig, y_orig, radius + 20, 0, Math.PI * 2, true);
        jctx.fillStyle = '#ECE5E5';
        jctx.fill();
        
        
        jctx.canvas.width = width;
        jctx.canvas.height = height;
        //jcv.style.boarder="1px"
        
        joystick(radius*3, height / 3);
    }
    function startDrawing(event) {
        paint = true;
        getPosition(event);
        if (is_it_in_the_circle()) {
            jctx.clearRect(0, 0, jcv.width, jcv.height);
            background();
            joystick(coord.x, coord.y);
            Draw();
        }
    }
    function stopDrawing() {
        paint = false;
        jctx.clearRect(0, 0, jcv.width, jcv.height);
        background();
        joystick(radius*3, height / 3);

    }
    function getPosition(event) {
        var mouse_x = event.clientX || event.touches[0].clientX;
        var mouse_y = event.clientY || event.touches[0].clientY;
        //console.log(mouse_x - jcv.offsetLeft)
        coord.x = mouse_x - jcv.offsetLeft;
        coord.y = mouse_y - jcv.offsetTop;
    }
    function Draw(event) {

            if (paint) {
                jctx.clearRect(0, 0, jcv.width, jcv.height);
                background();
                var angle_in_degrees,x, y, speed;
                var angle = Math.atan2((coord.y - y_orig), (coord.x - x_orig));

                if (Math.sign(angle) == -1) {
                    angle_in_degrees = Math.round(-angle * 180 / Math.PI);
                }
                else {
                    angle_in_degrees =Math.round( 360 - angle * 180 / Math.PI);
                }


                if (is_it_in_the_circle()) {
                    log(true)
                    joystick(coord.x, coord.y);
                    x = coord.x;
                    y = coord.y;
                }
                else {
                    log(false)
                    x = radius * Math.cos(angle) + x_orig;
                    y = radius * Math.sin(angle) + y_orig;
                    joystick(x, y);
                }

            
                getPosition(event);

                var speed =  Math.round(100 * Math.sqrt(Math.pow(x - x_orig, 2) + Math.pow(y - y_orig, 2)) / radius);

                var x_relative = Math.round(x - x_orig);
                var y_relative = Math.round(y - y_orig);
                

                console.log(x,coord.y,y_orig, x_relative,y_relative,speed,angle_in_degrees);
            }
        } 
    function joystick(width, height) {
        jctx.beginPath();
        jctx.arc(width, height, radius, 0, Math.PI * 2, true);
        jctx.fillStyle = '#F08080';
        jctx.fill();
        jctx.strokeStyle = '#F6ABAB';
        jctx.lineWidth = 8;
        jctx.stroke();
    }
    function is_it_in_the_circle() {
        var current_radius = Math.sqrt(Math.pow(coord.x - x_orig, 2) + Math.pow(coord.y - y_orig, 2));
        if (radius >= current_radius) return true
        else return false
    }
}*/
