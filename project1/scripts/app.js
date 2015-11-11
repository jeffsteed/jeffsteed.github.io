window.onload = function() {
  console.log("Window has loaded.");
  // dice.diceRoll();
  dice.setDiceEventListeners();
  document.getElementById('messageBoard').innerHTML = "<h3>Player One, please roll the dice</h3>";
  document.getElementById('roll-dice').addEventListener('click', function() {
    dice.diceRoll();
  });

};

var turns = 1;
var round = 1;
var currentPlayer = 'Player One';
var diceArray = ['dice1', 'dice2', 'dice3', 'dice4', 'dice5'];

var diceImgs = {
  one: 'http://www.booksandwands.com/images/ChineseOne.bmp',
  two: 'http://www.booksandwands.com/images/ChineseTwo.bmp',
  three: 'http://www.booksandwands.com/images/ChineseThree.bmp',
  four: 'http://www.booksandwands.com/images/ChineseFour.bmp',
  five: 'http://www.booksandwands.com/images/ChineseFive.bmp'
}

var dice = {
  dice1: document.getElementById('dice1'),
  dice2: document.getElementById('dice2'),
  dice3: document.getElementById('dice3'),
  dice4: document.getElementById('dice4'),
  dice5: document.getElementById('dice5'),
  num1: document.getElementById('num1'),
  num2: document.getElementById('num2'),
  num3: document.getElementById('num3'),
  num4: document.getElementById('num4'),
  num5: document.getElementById('num5'),
  dice1Value: null,
  dice2Value: null,
  dice3Value: null,
  dice4Value: null,
  dice5Value: null,

  // Function to identify selected dice
  setDiceEventListeners: function() {
    console.log("Event listeners added.");
    for (var eachDie in diceArray) {
      var die = dice[diceArray[eachDie]];
      die.addEventListener('click', function() {
        var myDie = this;
        if (myDie.classList.contains('selected')) {
          myDie.classList.remove('selected');
        } else {
          myDie.classList.add('selected');
        }
      });
    }
  },

  // This function checks the game state each turn
  takeTurn: function() {

  },

  // Rolls all dice that have not been selected
  diceRoll: function() {
    if (turns <= 3) {
      console.log("diceRoll ran and it is turn: " + turns + " for " + currentPlayer + ".");

      if (turns == 3 && currentPlayer == "Player Two" && round == 5) {
        console.log("Game Over");
      } else if (turns == 3) {
        endOfTurnMessage();
        setPlayer();
      } else {
        rollMessage();
      }

      var diceToRoll = [];
      for (var eachDie in diceArray) {
        var die = this[diceArray[eachDie]];
        if (!die.classList.contains('selected')) {
          diceToRoll.push(die);
        }
      }
      for (var i = 0; i < diceToRoll.length; i++) {
        diceToRoll[i].style.backgroundImage = "url('" + this.roll(diceToRoll[i]) + "')";
      }
      turns++;
    }
  },

  // Randomly selects an outcome of each dice roll
  roll: function(diceID) {
    console.log("roll has ran");
    var num = Math.floor(Math.random() * 5 + 1);
    switch (diceID.id) {
      case 'dice1':
        dice.dice1Value = num;
        dice.num1.innerHTML = "<h1>" + dice.dice1Value + "</h1>";
        break;
      case 'dice2':
        dice.dice2Value = num;
        dice.num2.innerHTML = "<h1>" + dice.dice2Value + "</h1>";
        break;
      case 'dice3':
        dice.dice3Value = num;
        dice.num3.innerHTML = "<h1>" + dice.dice3Value + "</h1>";
        break;
      case 'dice4':
        dice.dice4Value = num;
        dice.num4.innerHTML = "<h1>" + dice.dice4Value + "</h1>";
        break;
      case 'dice5':
        dice.dice5Value = num;
        dice.num5.innerHTML = "<h1>" + dice.dice5Value + "</h1>";
        break;
      default:
        console.log("Error: Incorrect ID passed.");
    }

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
  }
};

function setPlayer() {
  if (currentPlayer == 'Player One') {
    currentPlayer = 'Player Two';
    turns = 0;
    // resetBoard();
  } else {
    currentPlayer = 'Player One';
    turns = 0;
    // resetBoard();
  }
}

function rollMessage() {
  document.getElementById('messageBoard').innerHTML = "<h2>Round: " + round + "<h3>" + currentPlayer + " - Roll: " + turns + "<br>Please select your dice and roll again.</h3>";
};

function endOfTurnMessage() {
  document.getElementById('messageBoard').innerHTML = "<h3>This was your final roll for this round. It is now the next player\'s turn</h3>";
};
