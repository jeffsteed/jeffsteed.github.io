window.onload = function() {
  console.log("Window has loaded.");
  diceRoll();
  document.getElementById('roll-dice').addEventListener('click', function() {
    diceRoll();
  });

  setDiceEventListeners();
};

var diceImgs = {
  one: 'http://www.booksandwands.com/images/ChineseOne.bmp',
  two: 'http://www.booksandwands.com/images/ChineseTwo.bmp',
  three: 'http://www.booksandwands.com/images/ChineseThree.bmp',
  four: 'http://www.booksandwands.com/images/ChineseFour.bmp',
  five: 'http://www.booksandwands.com/images/ChineseFive.bmp'
}

// Function to identify selected dice
function setDiceEventListeners() {
  console.log("Event listeners added.");
  var diceArray = ['dice1', 'dice2', 'dice3', 'dice4', 'dice5'];
  for (var eachDie in diceArray) {
    var die = dice[diceArray[eachDie]];
    console.log(die);
    die.addEventListener('click', function() {
      var myDie = this;
      if (myDie.classList.contains('selected')) {
        myDie.classList.remove('selected');
      } else {
        myDie.classList.add('selected');
      }
    });
  }
};


var dice = {
  dice1: document.getElementById('dice1'),
  dice2: document.getElementById('dice2'),
  dice3: document.getElementById('dice3'),
  dice4: document.getElementById('dice4'),
  dice5: document.getElementById('dice5')
};


function diceRoll() {
  console.log("diceRoll ran");
  var diceArray = ['dice1', 'dice2', 'dice3', 'dice4', 'dice5'];
  var diceToRoll = [];
  for (var eachDie in diceArray) {
    var die = dice[diceArray[eachDie]];
    if (!die.classList.contains('selected')) {
      diceToRoll.push(die);
    }
  }
  for (var i = 0; i < diceToRoll.length; i++) {
    diceToRoll[i].style.backgroundImage = "url('" + roll() + "')";
  }
};

function roll() {
  var num = Math.floor(Math.random() * 5 + 1);
  switch (num) {
    case 1:
      return diceImgs.one;
      break;
    case 2:
      return diceImgs.two;
      break;
    case 3:
      return diceImgs.three;
      break;
    case 4:
      return diceImgs.four;
      break;
    case 5:
      return diceImgs.five;
      break;
    default:
      console.log("Error: the number was not between 1 and 5.");
  }
};
