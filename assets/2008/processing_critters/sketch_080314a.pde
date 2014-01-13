// TODO
//
// Make the lines grow with random twists
// Animate the things moving around
// Move the tendrils during animation
// Have them eat each other?
// Animated gradients, like waves

float POS = PI / 3;
float JITTER = PI / 15;
int radius = 5;
Critter critters[];
Waves waves = new Waves();

void setup(){
    size(400, 400);
    frameRate(24);
    int s, f;
    critters = new Critter[20];
    for (int i = 0; i < 20; i++){
        s = color(50, 50, 50, 10 * i);
        f = color(20, 40, 80, 8 * i);
        critters[i] = new Critter(s, f);
    }
}

void draw(){
    waves.roll();
    for (int i = 0; i < 20; i++){
        critters[i].move();
    }
}

float jitter(){
    return random(-JITTER, JITTER);
}

class Point{
    float x, y;

    Point(float x, float y){
        this.x = x;
        this.y = y;
    }
    
    void translate(float dx, float dy){
        this.x += dx;
        this.y += dy;
    }
}

class Cycle{
  float value;
  boolean increasing;
  Cycle(float range){
    this.value = random(-range, range);
    this.increasing = random(-1, 1) > 0;
  }
  float next(){
    if (this.increasing){
      this.value += 0.1;
      if (this.value > 2){
        this.increasing = false;
      }
    }else{
      this.value -= 0.1;
      if (this.value < -2){
        this.increasing = true;
      }
    }
    return this.value;
  }
}

class ColorCycle{
    int colors[];
    int index = 0;

    ColorCycle(){
        this.colors = new int[220];
        int r,g,b;
        for(int i = 0; i < 110; i++){
            r = 20 + int(i / 4.0);
            g = 40 + int(i / 2.0);
            b = 80 + i;
           this.colors[i] = color(r, g, b);
           this.colors[219 - i] = color(r, g, b);
        }
    }

    int next(){
        this.index = (this.index + 1) % this.colors.length;
        return this.colors[this.index];
    }
}

class Waves{
    ColorCycle cycle;

    Waves(){
        cycle = new ColorCycle();
    }

    void roll(){
        for (int i = -40; i < 400; i++){
            stroke(cycle.next());
            line(0, 400 - i, 399, 360 - i);
        }
        cycle.next();
    }
}



class Critter{
    Point origin;
    Cycle cycle_x;
    Cycle cycle_y;
    int stroke, fill;

    Critter(int stroke, int fill){
        this.stroke = stroke;
        this.fill = fill;
        this.origin = new Point(random(50, 350), random(50, 350));
        this.cycle_x = new Cycle(2);
        this.cycle_y = new Cycle(2);
    }

    float dx(int rot, int rad){
        return cos(rot * POS + jitter()) * radius * rad + origin.x;
     }

    float dy(int rot, int rad){
        return sin(rot * POS + jitter()) * radius * rad + origin.y;
    }


    void move(){
        pushMatrix();
        this.origin.translate(cycle_x.next(), cycle_y.next());
        translate(origin.x, origin.y);
        rotate((PI / 180) * frameCount);
        translate(-origin.x, -origin.y);
        this.draw();
        popMatrix();
    }

    void draw(){
        stroke(this.stroke);
        fill(this.fill);
        ellipse(origin.x,origin.y,radius*2,radius*2);
        for (int rot = 0; rot < 6; rot++){
            // draw radiating lines
            float x1 = dx(rot, 1);
            float y1 = dy(rot, 1);
            for (int j = 2; j < 6; j++){
                float x2 = dx(rot, j);
                float y2 = dy(rot, j);
                line(x1, y1, x2, y2);
                x1 = x2;
                y1 = y2;
            }
        }
    }
}

