// チェッカー
function setup() {
  createCanvas(200, 200);
  const size = width / 8;
 // マスの一辺の長さ


 for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){
      if ((i + j) % 2 ==0 ) {
        fill(255);
        rect(size * i,size * j, size, size)
       
      }  else if (j < 3){
          fill(196);
          rect(size*i,size*j,size,size);// BLANK[1] ヒント： rectのx座標は size * i, y座標は size * j
          fill(252,3,3);
          ellipse((i+0.5)*size,(j+0.5)*size,size*0.8,size*0.8)
        
        } else if (j < 5){
          fill(196);
          rect(size*i,size*j,size,size);
        
        } else {
          fill(196);
          rect(size*i,size*j,size,size);
          fill(0);
          ellipse((i+0.5)*size,(j+0.5)*size,size*0.8,size*0.8)
          
        }
      
        
  }
  }

}