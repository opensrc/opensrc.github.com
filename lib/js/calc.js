/*
&plusmn;  = \261
&ndash;   = \u2013
&laquo;   = \253
&times;   = \327
&bull;    = \u2219
&divide;  = \367
&middot;  = \267
&larr;    = \u2190
&empty;   = \u2205
*/

var calc = {
self: this,
curValue: '',
isPendingFunction: false,
thePendingFunction: '',
valueOneLocked: false,
valueTwoLocked: false,
valueOne: 0,
valueTwo: 0,
fromPrevious: false,
pendingFunction: '',
display: null,
buttons: [],

init: function() {
console.log("init")
  this.calculator = document.getElementById('calculator');
  this.display = document.getElementById('display');
  this.buttons = document.getElementsByTagName('button');
  for (var i = 0; i < this.buttons.length; i ++) {
    this.buttons[i].onclick = this.handler;
  }
},

resetCalc: function(v) {
console.log("-> resetCalculator("+v+")")

  calc.display.value = v;
//    $(".func").removeClass("pendingFunction");
  var current = this.calculator.getElementsByClassName("current");
//    current[0].className.replace(/(?:^|\s)current(?!\S)/ , '');
  if (current[0])
    current[0].className = current[0].className.replace(/(\s*current\s*)/, '');
//console.log(current[0].className.replace(/(\s*current\s*)/, ''));

  calc.isPendingFunction = false;
  calc.thePendingFunction = '';
  calc.valueOneLocked = false;
  calc.valueTwoLocked = false;
  calc.valueOne = v;
  calc.valueTwo = 0;
  calc.fromPrevious = false;
},

handler: function() {
  var k = this.textContent
  switch(k) {
    case "\u2205": calc.clear()  ; break;
    case "+":      calc.func('+'); this.className += " current"; break; // add
    case "\u2013": calc.func('-'); this.className += " current"; break; // subtract
    case "\327":   calc.func('*'); this.className += " current"; break; // multiply
    case "\367":   calc.func('/'); this.className += " current"; break; // divide
    case "%":      calc.func('%'); this.className += " current"; break;
    case "=":      calc.equals() ; break;

    case ".":      calc.display.value += "."; break;
    case "\u2190": calc.backspace(); break;
    case "\261":   calc.plusmn(); break;
    default:
console.log("num = "+ k)
    if (calc.fromPrevious == true) {
console.log(".. fromPrevious == true")
      calc.resetCalc(k);
    } else if (calc.isPendingFunction == true && calc.valueOneLocked == false) {
console.log(".. if isPendingFunction and NOT valueOneLocked")

      calc.valueOne = ""+ calc.display.value;
      calc.valueOneLocked = true;
      calc.valueTwo = k;
      calc.valueTwoLocked = true;
      calc.display.value = k;
    } else if (calc.isPendingFunction == true && calc.valueOneLocked == true) {
console.log(".. if isPendingFunction and valueOneLocked")

      var v = ""+ calc.display.value;
      calc.valueTwo = v + k;
      calc.valueTwoLocked = true;
      calc.display.value = v + k;
    } else {
      var v = ""+ calc.display.value;
      calc.display.value = (v == "0" ? "": v) + k;
    }
  }
},

dot: function() {
console.log("dot()")
  var v = calc.display.value;
  calc.display.value = v+".";
},

backspace: function() {
console.log("backspace()")
  var v = calc.display.value;
  calc.display.value = v.length > 1 ? v.slice(0, -1) : "0";
},

plusmn: function() {
console.log("plusmn()")
  var v = calc.display.value;
  calc.display.value = (v[0] === "-") ? v.replace(/[\-]/, '') : "-"+v;
},

clear: function(){
console.log("clear()")
  calc.resetCalc("0");
},

func: function(k) {
console.log("func("+k+")")

  if (calc.fromPrevious == true) {
console.log(".. if fromPrevious")

    calc.resetCalc(calc.display.value);
    calc.valueOneLocked = false;
    calc.fromPrevious = false;
  }
  calc.isPendingFunction = true;
  calc.thePendingFunction = k;

  // Visually represent the current function
//    $(".function-button").removeClass("pendingFunction");
//    $(this).addClass("pendingFunction");
},

equals: function() {
  if (calc.valueOneLocked == true && calc.valueTwoLocked == true) {
console.log(".. if valueOneLocked and valueTwoLocked")

    var a = parseFloat(calc.valueOne),
        b = parseFloat(calc.valueTwo),
        f = calc.thePendingFunction,
        z = 0;
    if (f === '+') z = a + b;
    else if (f === '-') z = a - b;
    else if (f === '*') z = a * b;
    else if (f === '/') z = a / b;
    else if (f === '%') z = (a/100)*b + "%"; // what is a% of b or (a/b)*100 = a is what percent of b

    calc.resetCalc(z);
    calc.fromPrevious = true;
  } else {
    // both numbers are not locked, do nothing.
console.log(".. else both numbers are not locked, do nothing")
  }
},
}

calc.init();
