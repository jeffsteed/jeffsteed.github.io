window.onload = function() {
  console.log("Window has loaded.");
  // dice.diceRoll();



  gameReady();

};

var turns = 0;
var round = 1;
var currentPlayer = 'Player One';
var player1Score = 0;
var player2Score = 0;
var diceArray = ['dice1', 'dice2', 'dice3', 'dice4', 'dice5'];

var diceImgs = {
  img1: 'images/ChineseOne.bmp',
  img2: 'images/ChineseTwo.bmp',
  img3: 'images/ChineseThree.bmp',
  img4: 'images/ChineseFour.bmp',
  img5: 'images/ChineseFive.bmp'
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
  rollBtn: document.getElementById('roll-dice'),
  endTurnBtn: document.getElementById('end-turn'),
  dice1Value: null,
  dice2Value: null,
  dice3Value: null,
  dice4Value: null,
  dice5Value: null,
  diceRolled: false,

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

  // Rolls all dice that have not been selected
  diceRoll: function() {

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
    if (turns == 1 && !dice.diceRolled) {
      dice.setDiceEventListeners();
      dice.diceRolled = true;
    }
    takeTurn();
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
        return diceImgs.img1;
        break;
      case 2:
        return diceImgs.img2;
        break;
      case 3:
        return diceImgs.img3;
        break;
      case 4:
        return diceImgs.img4;
        break;
      case 5:
        return diceImgs.img5;
        break;
      default:
        console.log("Error: the number was not between 1 and 5.");
    }
  }
};

function gameReady() {
  dice.rollBtn.addEventListener('click', function() {
    dice.diceRoll();
  });
  dice.endTurnBtn.addEventListener('click', function() {
    endTurn();
  });
  introMessage();
};

function takeTurn() {
  console.log("takeTurn ran and it is turn: " + turns + " for " + currentPlayer + ".");
  if (turns == 3 && currentPlayer == "Player Two" && round == 5) {
    console.log("Game Over");
  } else if (turns == 3 && currentPlayer == "Player Two") {
    endOfTurnMessage();
    turns = 0;
    // rollBtn.removeEventListener('click', function() {
    //   dice.diceRoll();
    // });
  } else if (turns == 3) {
    endOfTurnMessage();
    turns = 0;
  } else { // Turns less than three
    rollMessage();
  }

};

function endTurn() {
  if (currentPlayer == 'Player One') {
    player1Score = calculateScore();
    document.getElementById('playerOneScore').innerHTML = "<h1>" + player1Score + "</h1>";
    setPlayer();
    resetBoard();
  } else {
    player2Score = calculateScore();
    document.getElementById('playerTwoScore').innerHTML = "<h1>" + player1Score + "</h1>";
    setPlayer();
    checkRound();
    resetBoard();
    round++;
  }
  console.log("Player has ended their turn and submitted their dice to be scored.");
};

function resetBoard() {
  var count = 1;
  for (var die in diceArray) {
    dice[diceArray[die]].classList.remove('selected');
    dice[diceArray[die]].style.backgroundImage = "url('" + diceImgs['img' + count] + "')";
    dice['num' + count].innerHTML = "<h1>" + count + "</h1>";
    count++
  }
  turns = 0;
  introMessage();
}

function calculateScore() {

}

// This function controls and checks the game state each turn
function checkRound() {
  if (round == 5) {
    resetBoard();
    var body = document.getElementsByTagName('body')[0];
    var newBody = body.cloneNode(true);
    body.replaceChild(newBody, body);
  }
};

function setPlayer() {
  if (currentPlayer == 'Player One') {
    currentPlayer = 'Player Two';
  } else {
    currentPlayer = 'Player One';
  }
}

function introMessage() {
  document.getElementById('messageBoard').innerHTML = "<h3>" + currentPlayer + ", please roll the dice</h3>";
}

function rollMessage() {
  document.getElementById('messageBoard').innerHTML = "<h2>Round: " + round + "<h3>" + currentPlayer + " - Roll: " + turns + "<br>Please select your dice and roll again.</h3>";
};

function endOfTurnMessage() {
  document.getElementById('messageBoard').innerHTML = "<h3>This was your final roll for this round. Click <em>End Turn</em> to calculate your score and pass the turn.</h3>";
};
