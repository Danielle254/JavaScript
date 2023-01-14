// Make sure you have Node and NPM installed
// Run  npm install prompt-sync  in the terminal
const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let continueGame = true;


class Field {
  constructor(array, x, y) {
    this.field = array;
    this.locationX = x;
    this.locationY = y;
  }
  print() {
    this.field.forEach(each => console.log(each.join('')));
  }
  moveUser() {
    const move = prompt('which direction would you like to move? l = left, r = right, u = up, d = down.   ');
    switch (move) {
      case 'r':
        this.locationX += 1;
        break;
      case 'l':
        this.locationX -= 1;
        break;
      case 'u':
        this.locationY -= 1;
        break;
      case 'd':
        this.locationY += 1;
        break;
    }    
  }
  status() {
    if (this.locationY < 0 || this.locationY >= this.field.length || this.locationX < 0 || this.locationX >= this.field[0].length) {
      console.log("oops! you tried to move outside the field. game over!");
        continueGame = false;
    } else {    
        switch (this.field[this.locationY][this.locationX]) {
        case hat:
            console.log("congratulations! you've found the hat!");
            continueGame = false;
            break;
        case hole:
            console.log("oh no! you've fallen in a hole. game over");
            continueGame = false;
            break;            
        case fieldCharacter:
            this.field[this.locationY][this.locationX] = pathCharacter;
            break;
        }
    }
  }
  static generateField(height, width, difficulty) {
    let numHoles = 0;
    const totalItems = height * width;
    let newField = [];
    for (let i = 0; i < height; i++) {
        newField[i] = [];
        for (let j = 0; j < width; j++) {
            newField[i][j] = fieldCharacter;
        }
    }
    
    let randomX = Math.floor(Math.random() * width);
    let randomY = Math.floor(Math.random() * height);
    newField[randomY][randomX] = hat;    
    while (newField[randomY][randomX] === hat) {
        randomX = Math.floor(Math.random()*width);
        randomY = Math.floor(Math.random()*height);        
    }
    newField[randomY][randomX] = pathCharacter;
    const startX = randomX;
    const startY = randomY;
   
    switch (difficulty) {
        case 'easy':
            numHoles = Math.ceil(totalItems * 0.1); 
            break;           
        case 'medium':
            numHoles = Math.ceil(totalItems * 0.25);
            break;
        case 'hard':
            numHoles = Math.ceil(totalItems * 0.5);
            break;
    }
  
    while (numHoles > 0) {
        randomX = Math.floor(Math.random()*width);
        randomY = Math.floor(Math.random()*height);
        if (newField[randomY][randomX] === fieldCharacter) {
            newField[randomY][randomX] = hole;
            numHoles -= 1;
        }
    }
   
    return [newField, startX, startY];
  }
}

let values = Field.generateField(6, 6, 'medium');
let newArray = values[0],
    x = values[1],
    y = values[2];
const myField = new Field(newArray, x, y);

while (continueGame === true) {
  myField.print();
  myField.moveUser();
  myField.status();
}
