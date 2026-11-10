// カレンダーを描画しよう
function setup(){
  createCanvas(200, 200);
  drawCalendar(2025, 10);
}

function drawCalendar(y, m){
  background(30);
  fill(255);
  noStroke();
  textAlign(CENTER);

  for(let i = 0; i < 7; i++){
    const x = (i+0.5) * width / 7;
    const y = 20;    
    stroke(255);
    if (i == 0) {
      fill(255,0,0);
    } else if (i == 6) {
      fill(0,0,255);
    } else {
      fill(0);
    }
    text(dayOfWeekAsString(i), x, y);
  }

  let dow = dayOfWeek(y, m, 1);
  for(let d = 1; d <= daysInMonth(y, m); d++){
    let day = (dow + d - 1) % 7;
    let row = Math.floor((dow + d - 1) / 7);
    
    let x = (day+0.5) * width / 7;
    let y = 50 + row * 25;
    
    
    if (day == 0) {
      fill(255,0,0);
    } else if (day == 6) {
      fill(0,0,255);
    } else {
      fill(0);
    }
    text(d,x,y);// BLANK[3] まずは daysInYear, dayOfWeek を作ろう
  }
}

function isLeapYear(y){
  return (y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0);
}

function daysInYear(y){
  if (isLeapYear(y)) {
    return 366;
  } else {
    return 365;
  }// BLANK[1] hint: 閏年なら366日、そうでなければ365日
}

function daysInMonth(y, m){
  if(m == 2){
    return isLeapYear(y) ? 29 : 28;
  }
  else if(m == 4 || m == 6 || m == 9 || m == 11){
    return 30;
  }
  else{
    return 31;
  }
}

function dayOfYear(y, m, d){
  let count = 0;
  for(let i = 1; i < m; i++){
    count += daysInMonth(y, i);
  }
  return count + d;
}

function dayOfWeek(y, m, d){
  let count = 0;
  for (let i =1970; i<y; i++){
    count += daysInYear(i)
  }
  count += dayOfYear(y,m,d) -1;
  
  return (count + 4)%7;// BLANK[2] hint: 曜日がわかる日からの経過日数を求め7の剰余を取る　たとえば1970年1月1日木曜日
}

function dayOfWeekAsString(dow){
  const a = ["日", "月", "火", "水", "木", "金", "土"];
  return a[dow];
}
