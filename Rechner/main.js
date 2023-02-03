'use strict';

/************/
/* ELEMENTE */
/************/

// Displayfeld einlesen
let $display = document.querySelector('#display');

// Zifferntasten einlesen
const $nr1 = document.querySelector('#nr1');
const $nr2 = document.querySelector('#nr2');
const $nr3 = document.querySelector('#nr3');
const $nr4 = document.querySelector('#nr4');
const $nr5 = document.querySelector('#nr5');
const $nr6 = document.querySelector('#nr6');
const $nr7 = document.querySelector('#nr7');
const $nr8 = document.querySelector('#nr8');
const $nr9 = document.querySelector('#nr9');
const $nr0 = document.querySelector('#nr0');

// Berechnungszeichen einlesen
const $addition = document.querySelector('#addition');
const $subtraction = document.querySelector('#subtraction');
const $multiplication = document.querySelector('#multiplication');
const $division = document.querySelector('#division');

// Berechnungsknopf einlesen
const $calculate = document.querySelector('#calculate');

// Resetknopf einlesen
const $clear = document.querySelector('#clear');


/***********/
/* RUNTIME */
/***********/

// Speichert die zuletzt eingegebenen Zahl, bevor ein Operator ausgewählt wurde und wird auf der linken Seite der Berechnung verwendet.
let memory = 0;

// Speichert das aktuell ausgewählte Berechnungszeichen
let operator = null;

// Merkt sich, ob das Display bei der Eingabe der nächsten Zahl überschrieben werden soll
let overwrite = false;


/**************/
/* FUNKTIONEN */
/**************/

//
// addNumber()
// Fügt die angegebene Zahl zum Display hinzu.
// <- newNr: Number
function addNumber(newNr) {
  // Ermitteln, ob das Display überschrieben werden soll. Dies ist entweder der Fall, wenn zB. auf die Plus Taste (ein Berechnungsoperator) gedrückt wurde, ein Berechnungsergebnis angezeigt wurde oder gerade die Zahl 0 am Display steht.
  if (overwrite || $display.value === '0') {
    $display.value = newNr;
    overwrite = false;
    return;
  }

  // Die gedrückte Zahl zum Display hinzufügen
  $display.value += newNr;
}


//
// changeOperator()
// Neuen Operator auswählen und dessen Knopf farblich kennzeichnen.
// <- $button: Element
// <- newOperator: String
function changeOperator($button, newOperator) {
  // Zuerst alle Berechnungsknöpfe von ihrer Markierung befreien
  $addition.className = '';
  $subtraction.className = '';
  $multiplication.className = '';
  $division.className = '';

  // Den gedrückten Berechnungsknopf farblich kennzeichnen
  $button.className = 'selected';

  // Neuen Berechnungsoperator merken
  operator = newOperator;

  // Die aktuelle Zahl am Display merken, da als nächstes die Zahl zum Berechnen eingegeben wird.
  memory = parseFloat($display.value);

  // Die Eingabe der nächsten Zahl soll das Display überschreiben
  overwrite = true;
}


//
// calculate()
// Berechnet das Ergebnis auf Basis des gemerkten Operators, der gemerkten Zahl sowie der aktuell am Display angezeigten Zahl und zeigt sie im Display an.
function calculate() {
  // Aktuelle Zahl vom Display als Zahl auslesen
  const number = parseFloat($display.value);

  // Passende Berechnung je nach ausgewählten Berechnungsverfahren durchführen
  if (operator === '+') {
    $display.value = memory + number;
    // $addition.className = ''
  } else if (operator === '-') {
    $display.value = memory - number;
  } else if (operator === '*') {
    $display.value = memory * number;
  } else if (operator === '/') {
    $display.value = memory / number;
  }

  // Alle Berechnungsknöpfe von ihrer Markierung befreien
  $addition.className = '';
  $subtraction.className = '';
  $multiplication.className = '';
  $division.className = '';

  // Speicher und Operator zurücksetzen sowie das Display bei der nächsten Eingabe überschreiben
  memory = 0;
  operator = null;
  overwrite = true;
}


//
// clear()
// Das komplette Programm zurücksetzen.
function clear() {
  // Alle Berechnungsknöpfe von ihrer Markierung befreien
  $addition.className = '';
  $subtraction.className = '';
  $multiplication.className = '';
  $division.className = '';

  // Speicher und Operator zurücksetzen sowie das Display bei der nächsten Eingabe überschreiben
  memory = 0;
  operator = null;
  overwrite = true;

  // Display sofort zurücksetzen
  $display.value = 0;
}


/**********/
/* EVENTS */
/**********/

// Klick auf einen Ziffer registrieren
{
  $nr1.addEventListener('click', function() {
    addNumber(1);
  });
  $nr2.addEventListener('click', function() {
    addNumber(2);
  });
  $nr3.addEventListener('click', function() {
    addNumber(3);
  });
  $nr4.addEventListener('click', function() {
    addNumber(4);
  });
  $nr5.addEventListener('click', function() {
    addNumber(5);
  });
  $nr6.addEventListener('click', function() {
    addNumber(6);
  });
  $nr7.addEventListener('click', function() {
    addNumber(7);
  });
  $nr8.addEventListener('click', function() {
    addNumber(8);
  });
  $nr9.addEventListener('click', function() {
    addNumber(9);
  });
  $nr0.addEventListener('click', function() {
    addNumber(0);
  });
}

// Klick auf einen Berechnungsoperator registrieren
{
  $addition.addEventListener('click', function() {
    changeOperator($addition, '+');
  });

  $subtraction.addEventListener('click', function() {
    changeOperator($subtraction, '-');
  });

  $multiplication.addEventListener('click', function() {
    changeOperator($multiplication, '*');
  });

  $division.addEventListener('click', function() {
    changeOperator($division, '/');
  });
}

// Klick auf der Berechnungsknopf registrieren
$calculate.addEventListener('click', calculate);

// Klick auf den Resetknopf registrieren
$clear.addEventListener('click', clear);
