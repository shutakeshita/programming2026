// 2D アニメーションゲームのようなインタラクション
let x, y;
let vx, vy;
const g = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
  vx = 0;
  vy = 2;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



function draw() {
  background(160, 192, 255);
  const size = height * 0.1; // キャラクターのサイズ

  // 地面を描く
  const groundY = height * 0.8;
  fill(64, 192, 64);
  rect(0, groundY, width, height - groundY);
  
  
  // BLANK[1] キャラクターの左右移動
  if (keyIsDown(LEFT_ARROW)) { x -= 1; }
  if (keyIsDown(RIGHT_ARROW)) { x += 1; }
  if (keyIsDown("KeyA")) { x -= 10;}
  if (keyIsDown("KeyS")) { x += 10;}


  // BLANK[2] 重力とジャンプ
  vy += g;
  // 速くなりすぎないように制限
  vx = constrain(vx, -100, 100);
  vy = constrain(vy, -20, 20);

  // 位置を更新
  x += vx;
  y += vy;

  x = constrain(x, size/2 , width - size/2);
  y = constrain(y, 0, groundY - size / 2);

  // キャラクターを描く
  fill(0);
  ellipse(x, y, size, size);
}
        
function keyPressed() {
  const groundY = height * 0.8;
  const size = height * 0.1; // キャラクターのサイズ
  if (key === " " && y == groundY - size/2 ) 
    {vy -= 100;} 
  

}