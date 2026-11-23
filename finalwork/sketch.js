// 最終課題を制作しよう
let gamestate = "start";
let starttime;
const limit = 120;
let mistakes ;
let score ;
let fbmessage = "";
let fbcolor;
let fbX = 0;
let fbY = 0;

let fbUntil = 0;

let shapes = [];


function setup() {
  createCanvas(windowWidth, windowHeight);

  
}

function draw() {
  if (gamestate === "start") {
    drawstartscreen();
  } else if (gamestate === "playing") {
   
    drawgamescreen();

    let passedtime = (millis() - starttime) / 1000;
    
      if (passedtime > limit) {
        gamestate = "result";
      } else {
          let remainingtime = limit - passedtime;
          fill(0);
         textSize(50);
          textAlign(CENTER);

          text(floor(remainingtime), width/2, 50);
      }



  } else if (gamestate === "result") {
    drawresult();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function drawstartscreen() {
  background(0);
  fill(255);
  textAlign(CENTER);
  textSize(24);
  text("間違い探しゲーム", width / 2, 70);

  textSize(16);
  text("右側の間違いを見つけたらクリック！", width / 2, 140);
  text("３回失敗したらゲームオーバー", width / 2, 170);
  text("制限時間は2分間", width / 2, 230);

  text("SPACEボタンを押してスタート", width / 2, 280);
  text("※ウィンドウを最大にして始めてください", width / 2, 350);

}

function keyPressed() {
  if (gamestate === "start" && key === " ") {
    startgame();

  } else if (gamestate === "result" && key === ENTER) {
    gamestate = "start";
  }
}

function startgame() {
  starttime = millis();
  gamestate = "playing";
  mistakes = 0;
  score = 0;
  

  shapes = [];

  let size = random(50, 110);
  let margin = size / 2;
  const shapenumber = 50;

  for (let i = 0; i < shapenumber; i++) {
    shapes.push({
      type: floor(random(6)),
      x: random(50, width/2 - margin),
      y: random(50, height - margin),
      size: size,
      color: color(random(255), random(255), random(255)),
      id: i,
      found: false
    });
  }
}

function geterrortype(id) {
  if (id >= 0 && id <= 4) return "color";
  if (id >= 10 && id <= 14) return "size";
  if (id >= 20 && id <= 24) return "shape";
  return "none";

}

function drawgamescreen() {
  background(0, 0, 255);
  textAlign(LEFT);

  stroke(0);
  
  line(width/2, 70, width/2, height);
  text("正", 0, 50);
  text("誤", width-50, 50);

  for ( let shape of shapes) {
    let errortype = geterrortype(shape.id);

    drawshape(shape.type, shape.x, shape.y, shape.size, shape.color);

    let rtype = shape.type;
    let rcolor = shape.color;
    let rsize = shape.size;


    if (errortype === "color") {
      const changedcolor = color(255-red(shape.color), 255-green(shape.color), 255-blue(shape.color))
      rcolor = changedcolor;
    } else if (errortype === "shape") {
      rtype = (shape.type+1) % 6;
    } else if (errortype === "size") {
      const changedsize = shape.size*1.5;
      rsize = changedsize;
    } 
    let rx = shape.x + width/2;
    let ry = shape.y;
    drawshape(rtype, rx, ry, rsize, rcolor);



  }
  drawfb();
}

function drawresult() {
  background(0);
  fill(255);
  textAlign(CENTER);
  textSize(22);
  text("SCORE: " + score, width / 2, 70);
  text("ENTERキーを押して再挑戦!", width / 2, 140);

}

function drawshape(type,x,y,size,shapecolor) {
  noStroke();
  fill(shapecolor);
  
 

    if (type === 0) {
      circle(x, y, size);
      
    } else if (type === 1) {
      rect(x - size / 2,
        y - size / 2,
        size,
        size);
      
    } else if (type === 2) {
      triangle(x, y - size / 2,
        x - size / 2, y + size / 2,
        x + size / 2, y + size / 2);
      
      

    } else if (type === 3) {
      ellipse(x, y, size, size / 2);
      

    } else if (type === 4) {
      ellipse(x, y, size / 2, size);
      


    } else if (type === 5) {
      quad(x, y - size / 2,
        x + size / 2, y,
        x, y + size / 2,
        x - size / 2, y);
    }
  
}

function mousePressed() {
  
  if (gamestate !== "playing") {
    return;
  }

  if (mouseX < width/2) {
    return;
  }

  const originx = mouseX - width/2;
  let result = checkanswer(originx,mouseY);

  if (result === "correct") {
    score++;
    showfb("正解！",color(50,255,100));
  } else if (result === "alreadyfound") {
    showfb("発見済みです",color(255,230,80));
  }else {
    mistakes++ ;
    showfb("違います！ミス" +mistakes+ "/3", color(255,80,80));
  

    if (mistakes >= 3) {
    gamestate = "result";
    }
  }
}

function checkanswer(x,y) {
  for (let shape of shapes) {
    const errortype = geterrortype(shape.id);

    if (errortype === "none" || shape.found) continue;

    let errorsize = shape.size;
    if (errortype === "size") {
      errorsize = shape.size * 1.5;
    }

    const hit = max(25, errorsize/2);
    const distance = dist(x,y,shape.x, shape.y);

    if (distance <= hit) {
      shape.found = true;
      return "correct";
    }
  }

  for (let shape of shapes) {
    if (!shape.found || geterrortype(shape.id) === "none") continue;

    const hit = max(25, shape.size*0.75);
    if (dist(x,y,shape.x,shape.y) <= hit) {
      shape.found = true;
      return "alreadyfound";
    }
  }

  return "wrong";
}

function showfb(message, messagecolor) {
  fbmessage = message;
  fbcolor = messagecolor;
  fbUntil = millis() + 1000;
  fbX = mouseX;
  fbY = mouseY;


}

function drawfb() {
  if (gamestate !== "playing" || millis() > fbUntil) return;

  fill(fbcolor);
  noStroke();
  textAlign(CENTER);
  textSize(22);

  let x = constrain(fbX, 100, width-100);
  let y = constrain(fbY-25, 100, height-30);

  text(fbmessage, x,y);
}