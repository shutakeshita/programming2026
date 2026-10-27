// 折れ線グラフ
function setup(){
  createCanvas(400, 400);
  background(240);

  // 配列をランダムに初期化する
  let scores = [];
  for(let i = 0; i < 10; i++){
    scores[i] = random(60, 100); // 60以上100未満のランダムな数を代入
  }

  // 横線を引く
  const n = 10;
  for(let i = 0; i < n; i++){ line(0, height * i / n, width, height * i / n); }

  // ここからが本番
  fill(0);
  const dx = width / scores.length;
  let px, py; // 線を引くために一つ前の点を覚えておく変数
  for(let i = 0; i < scores.length; i++){
    px = dx * i + dx / 2;
    py = height - height * scores[i] / 100;
    x = dx * i + 1.5 * dx;
    y = height - height * scores[i+1] / 100;
    circle(px,py,3);
    if (i < scores.length-1) line(px,py,x,y);
    // BLANK[1]
  }
}
