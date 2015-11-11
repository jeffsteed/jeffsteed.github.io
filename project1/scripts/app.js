window.onload = function() {
  console.log("Window has loaded.");
  diceRoll();
  document.getElementById('roll-dice').addEventListener('click', function() {
    diceRoll();
  });
};

var one = 'http://www.booksandwands.com/images/ChineseOne.bmp';
var two = 'http://www.booksandwands.com/images/ChineseTwo.bmp';
var three = 'http://www.booksandwands.com/images/ChineseThree.bmp';
var four = 'http://www.booksandwands.com/images/ChineseFour.bmp';
var five = 'http://www.booksandwands.com/images/ChineseFive.bmp';


function diceRoll() {
  console.log("diceRoll ran");
  document.getElementById('diceOne').style.backgroundImage = "url('" + roll() + "')";
  document.getElementById('diceTwo').style.backgroundImage = "url('" + roll() + "')";
  document.getElementById('diceThree').style.backgroundImage = "url('" + roll() + "')";
  document.getElementById('diceFour').style.backgroundImage = "url('" + roll() + "')";
  document.getElementById('diceFive').style.backgroundImage = "url('" + roll() + "')";
};

function roll() {
  var num = Math.floor(Math.random() * 5 + 1);
  switch (num) {
    case 1:
      return one;
      break;
    case 2:
      return two;
      break;
    case 3:
      return three;
      break;
    case 4:
      return four;
      break;
    case 5:
      return five;
      break;
    default:
      console.log("Error: the number was not between 1 and 5.");
  }
};
