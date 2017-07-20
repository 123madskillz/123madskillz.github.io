function setup() {
  c = createCanvas(window.innerWidth, window.innerHeight);
  c.position(0, 0);
	//limit FPS to 30
	frameRate(30);
	colorMode(HSB,255);
}
time = 0.0;
function draw() {
	time+=.06;
	
  c = createCanvas(window.innerWidth, window.innerHeight);
	background(0);
	//blendMode(ADD)
	strokeWeight(.2);
  for(pos = 0; pos < width; pos+=2){
		stroke((time*2+(pos/30))%255,255,255);
		for(node = 0; node < 10; node++){
			//NodeX and Y old are used to define the first point in the line
			nodeXold =  ((node-1)*10)+(sin(time+(node-1)*100)*100)
			nodeYold =  ((node-1)*sin(time/10)*10)+sin((5*(node-1)+(pos/140))+(time/2))*110;
			
			//NodyX and Y are used to define the second point in the line
			nodeX = 	 (node*10)+(sin((time/2)+(node*100))*100)
			nodeY = ((node*1)*sin(time/10)*10) + sin((4*node+(pos/((sin(time/2)+20)*20)))+(time/2))*110;
			//The x position is later added to nodeX so that the wave progresses
			if(mouseIsPressed){nodeXold += mouseX-(width/2);nodeYold += (mouseY-(height/2))}
			x = pos
			//One more layer of trig on top of the nodeYs 
			y = (30*sin((pos/100)-time))//+(10*cos((pos/10)-time));
			line(x + nodeX, (height/2) + y + nodeY, x + nodeXold, (height/2) + y + nodeYold);
		}
	}
	println(frameRate())
}