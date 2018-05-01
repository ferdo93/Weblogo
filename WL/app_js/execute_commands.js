 /*------------------------------------------------------
 
            Vytvoril: Ferdinand Križan
 
 ------------------------------------------------------*/
 
 function get_random_color() {
     return "#" + (Math.round(Math.random() * 0XFFFFFF)).toString(16);
 }
 var free_draw = false;
 var grid = true;
 var activity_index = 0;
 var arr_activity = [];
 var abs_angle = 0;
 var tmp_ctx_color;
 var tmp_ctx_height;



 $(document).ready(function() {
     var canvas = document.getElementById("canvas");
     var context = canvas.getContext("2d");

     var triangle_size = 18;
     var current_color = "black";
     var zoom = 1.0;

     var x = canvas.width / 2;
     var y = canvas.height / 2;
     context.strokeStyle = "black";
     context.lineCap = 'round';
     context.lineWidth = 1;

     context.strokeStyle = "black";

     var img_turtle = new Image();
     img_turtle.src = "WL/app_images/Turtle.png";
     img_turtle.width = tutle_height;
     img_turtle.height = tutle_height;
     img_turtle.onload = function() {
         drawBoard();
         if (b_draw_turtle) {
             draw_triangle(context, x, y, triangle_size);
         }
     }


     context.save();
     var pos_x = x;
     var pos_y = y;
     var rotate = false;


     var last_mousex = last_mousey = 0;
     var mousex = mousey = 0;
     var mousedown = false;
     var tooltype = 'draw';


     function drawBoard() {
         context.strokeStyle = "#" + grid_color;
         context.beginPath();
         var bw = canvas.width;
         //alert(bw);

         var bh = canvas.height;
         //alert(bh);
         var p = -0.5;
         var grid = canvas.width / grid_size;
         //alert(grid);
         context.lineWidth = 1;
         for (var x = 0; x <= bw; x += grid) {
             context.moveTo(0.5 + x + p, p);
             context.lineTo(0.5 + x + p, bh + p);
         }
         for (var x = 0; x <= bh; x += grid) {
             context.moveTo(p, 0.5 + x + p);
             context.lineTo(bw + p, 0.5 + x + p);
         }
         context.stroke();
     }


     function draw_triangle(n_context, x, y, height) {
         // the triangle
         if (b_draw_turtle) {
             /* PRI TESTOVANI SA ZISTILO, ZE ZIAKOM SA TROJUHOLNIK NEPACI. VYKRESLIME OBRAZOK KORYTNACKY
			n_context.globalAlpha = 1; // nastavime, aby bol vidiet
			y -= height;
			n_context.beginPath();
			n_context.moveTo(x, y);
			n_context.lineTo(x + height / 2, y + height);
			n_context.lineTo(x - height / 2, y + height);
			n_context.closePath();
			 
			// the outline
			n_context.lineWidth = height / 8;
			n_context.strokeStyle = '#666666';
			n_context.stroke();
			 
			// the fill color
			n_context.fillStyle = "#FFCC00";
			n_context.fill();
			n_context.stroke();
			*/

             n_context.globalAlpha = 1; // nastavime, aby bol vidiet
             //y -= height;	
             //alert(zoom);

             var new_pos_x = img_turtle.width * (zoom);
             var new_pos_y = img_turtle.height * (zoom);
             n_context.beginPath();
             n_context.drawImage(img_turtle, (x - new_pos_x / 2), (y - new_pos_y / 2), new_pos_x, new_pos_y);
             n_context.stroke();
         }
     }

     // Vytiahneme si volanie vonku
     draw_turtle = function() {
         draw_triangle(context, pos_x, pos_y, triangle_size);
     }

     set_bg_color = function(color) {
         bg_color = color;
     }


     $('#canvas').on('DOMMouseScroll mousewheel', function(event) {
         if (event.originalEvent.detail > 0 || event.originalEvent.wheelDelta > 0) {
             if (zoom < 1.9) {
                 grid_size -= 2;
                 triangle_size += 1;
                 zoom += 0.11;
             }
         } else {
             if (zoom > 0.5) {
                 grid_size += 2;
                 triangle_size -= 1;
                 zoom -= 0.11;
             }
         }
		 generate();
         return false;
     });

     function clear_canvas() {
         context.fillStyle = "#" + bg_color;
         abs_angle = 0;
         if (activity) {
             context.fillRect(0, 0, canvas.width, canvas.height);
             var img_path = aktivity[activity_index].image;
             if ((img_path === undefined) || (img_path == '')) {
                 img_path = 'prazdny.png';
             }
             var imageObj = new Image();
             imageObj.src = "WL/Aktivity/" + img_path;
             var origx = imageObj.width / 2;
             var origy = imageObj.height / 2;
             imageObj.width *= (zoom);
             imageObj.height *= (zoom);
             context.save();
             context.globalAlpha = 0.4;
             context.drawImage(imageObj, (canvas.width / 2 - imageObj.width / 2), (canvas.height / 2 - imageObj.height / 2), imageObj.width, imageObj.height);
             context.globalAlpha = 1;
             context.restore();
         } else {
             context.fillRect(0, 0, canvas.width, canvas.height);
         }
     }


     draw_init = function() {
         clear_canvas();
         if (grid) {
             drawBoard();
         }
         context.strokeStyle = "black";
         context.lineCap = 'round';
         context.save();
         pos_x = x;
         pos_y = y;
         var rotate = false;
     }

     draw_end = function() {
         context.restore();
     }

     clear_board = function() {
         draw_init();
         draw_turtle();
         draw_end();
     }

     execute_forward = function(value) {
         context.beginPath();
         context.moveTo(pos_x, pos_y);
         if (abs_angle % 90 != 0) {
             context.lineTo(pos_x, pos_y - (value * Math.sqrt(2 * Math.pow((canvas.width / grid_size), 2))));
             pos_y -= (value * Math.sqrt(2 * Math.pow((canvas.width / grid_size), 2)));
         } else {
             context.lineTo(pos_x, pos_y - (value * canvas.width / grid_size));
             pos_y -= (value * canvas.width / grid_size);
         }

         context.stroke();
     }

     execute_left = function(value) {
         abs_angle -= value;
         context.translate(pos_x, pos_y);
         context.rotate(-value * Math.PI / 180);
         context.translate(-pos_x, -pos_y);
     }

     execute_right = function(value) {
         abs_angle += value;
         context.translate(pos_x, pos_y);
         context.rotate(value * Math.PI / 180);
         context.translate(-pos_x, -pos_y);
     }

     execute_pw = function(value) {
         context.lineWidth = parseInt(value);
         tmp_ctx_height = context.lineWidth;
     }

     execute_pc = function(value) {
         if (value == "#random") {
             context.strokeStyle = get_random_color();
         } else {
             context.strokeStyle = value;
         }
         tmp_ctx_color = context.strokeStyle;
     }

     execute_pt = function(value) {
         context.beginPath();
         context.arc(pos_x, pos_y, value * (triangle_size / 2), 0, 2 * Math.PI, true);
         context.fillStyle = context.strokeStyle;
         context.fill();
         context.stroke();
     }
     execute_sp = function(value) {
         if (get_instruction(value) == INSTRUCTION_UP) {
             context.globalAlpha = 0;
         } else if (get_instruction(value) == INSTRUCTION_DOWN) {
             context.globalAlpha = 1;
         }
     }
     execute_write_text = function(value) {
         if (value.length > 0) {
             var temp_font = context.font;
             context.font = "30px Arial";
             context.strokeText(value, pos_x, pos_y);
             context.font = temp_font;
         }
     }

     draw_image = function(img) {
         context.drawImage(img, canvas.width / 2 - img.width / 2, canvas.height / 2 - img.height / 2);
         if (grid) {
             drawBoard();
         }
         draw_triangle(context, x, y, triangle_size);
     }

     $('#clear_canvas').click(function() {
         clear_canvas();
     });

     download_image_from_canvas = function(filename) {
         var lnk = document.createElement('a'),
             e;

         lnk.download = filename;

         lnk.href = canvas.toDataURL("image/png");

         if (document.createEvent) {

             e = document.createEvent("MouseEvents");
             e.initMouseEvent("click", true, true, window,
                 0, 0, 0, 0, 0, false, false, false,
                 false, 0, null);

             lnk.dispatchEvent(e);

         } else if (lnk.fireEvent) {

             lnk.fireEvent("onclick");
         }
     }

     // free draw

     //Mousedown
     $(canvas).on('mousedown', function(e) {
         var pos = getMousePos(canvas, e);
         mousex = pos.x;
         mousey = pos.y;
         mousedown = true;
     });

     //Mouseup
     $(canvas).on('mouseup', function(e) {
         mousedown = false;
     });

     function getMousePos(canvas, evt) {
         var rect = canvas.getBoundingClientRect();
         return {

             x: (evt.clientX - rect.left) * canvas.width / canvas.clientWidth,
             y: (evt.clientY - rect.top) * canvas.height / canvas.clientHeight
         };
     }


     $(canvas).on('mousemove', function(e) {
         if (free_draw) {
             var pos = getMousePos(canvas, e);
             mousex = pos.x;
             mousey = pos.y;
             if (mousedown) {
                 //context = context;
                 context.beginPath();

                 if (tooltype == 'draw') {
                     context.globalCompositeOperation = 'source-over';
                 } else {
                     //context.globalCompositeOperation = 'destination-out';
                     //ctx.lineWidth = 10;
                 }
                 context.strokeStyle = tmp_ctx_color;
                 console.log(tmp_ctx_color);
                 context.lineWidth = tmp_ctx_height;
                 context.moveTo(last_mousex, last_mousey);
                 context.lineTo(mousex, mousey);
                 //context.lineJoin = context.lineCap = 'round';
                 context.stroke();
             }
             last_mousex = mousex;
             last_mousey = mousey;
         }
     });

 });