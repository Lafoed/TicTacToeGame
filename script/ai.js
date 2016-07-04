function aiThink(field) {

  for (var y=0; y<field.length; y++){
    for (var x=0; x<field.length; x++){

      if (field[y][x] == 'cross' && field[y][x+1] == 'cross') {
        if(field[y][x+2]){
          if(field[y][x+2] == 'none') return {x:x+2, y:y};}
      }
      if (field[y][x] == 'cross' && field[y][x-1] == 'cross') {
        if(field[y][x-2]){
          if(field[y][x-2] == 'none') return {x:x-2, y:y};}
      }
      if (field[y][x] == 'cross' && field[y+1] && field[y+1][x] == 'cross') {
        if(field[y+2] && field[y+2][x]){
          if(field[y+2][x] == 'none') return {x:x, y:y+2};}
      }
      if (field[y][x] == 'cross' && field[y-1] && field[y-1][x] == 'cross') {
        if(field[y-2] && field[y-2][x]){
          if(field[y-2][x] == 'none') return {x:x, y:y-2};}
      }
      if (field[y][x] == 'cross' && field[y-1] && field[y-1][x-1] == 'cross') {
        if(field[y-2] && field[y-2][x-2]){
          if(field[y-2][x-2] == 'none') return {x:x-2, y:y-2};}
      }
      if (field[y][x] == 'cross' && field[y+1] && field[y+1][x+1] == 'cross') {
        if(field[y+2] && field[y+2][x+2]){
          if(field[y+2][x+2] == 'none') return {x:x+2, y:y+2};}
      }
      if (field[y][x] == 'cross' && field[y-1] && field[y-1][x+1] == 'cross') {
        if(field[y-2] && field[y-2][x+2]){
          if(field[y-2][x+2] == 'none') return {x:x+2, y:y-2};}
      }
      if (field[y][x] == 'cross' && field[y+1] && field[y+1][x-1] == 'cross') {
        if(field[y+2] && field[y+2][x-2]){
          if(field[y+2][x-2] == 'none') return {x:x-2, y:y+2};}
      }

    }

  }

  var coords = {x: 0, y: 0};

  while( field[coords.y][coords.x] !== 'none'){
     coords = randomizeCoords(coords)
  }
  return coords;
}

function checkEnd(field) {

  var pos = ['cross','circle'];

  for (var i=0;i<pos.length;i++){
    if (field[0][0] == pos[i] && field[0][1] == pos[i] && field[0][2] == pos[i]) return {status:true, winMark:pos[i]};
    if (field[1][0] == pos[i] && field[1][1] == pos[i] && field[1][2] == pos[i]) return {status:true, winMark:pos[i]};
    if (field[2][0] == pos[i] && field[2][1] == pos[i] && field[2][2] == pos[i]) return {status:true, winMark:pos[i]};
    if (field[0][0] == pos[i] && field[1][0] == pos[i] && field[2][0] == pos[i]) return {status:true, winMark:pos[i]};
    if (field[0][1] == pos[i] && field[1][1] == pos[i] && field[2][1] == pos[i]) return {status:true, winMark:pos[i]};
    if (field[0][2] == pos[i] && field[1][2] == pos[i] && field[2][2] == pos[i]) return {status:true, winMark:pos[i]};
    if (field[0][0] == pos[i] && field[1][1] == pos[i] && field[2][2] == pos[i]) return {status:true, winMark:pos[i]};
    if (field[2][0] == pos[i] && field[1][1] == pos[i] && field[0][2] == pos[i]) return {status:true, winMark:pos[i]};
  }

  for (var i=0; i<field.length; i++){
    for (var j=0; j<field.length; j++) {
      if(field[i][j] == 'none') return {status:false};
    }
  }
  return {status:true};
}

function randomize() {
  var coord = Math.floor(Math.random() * 3);
  return coord;
}

function randomizeCoords(coords) {
    return {
      y : randomize(),
      x : randomize()
  }
}

