const arr = x => Array.from(x);
const num = x => Number(x) || 0;
const str = x => String(x);
const isEmpty = xs => xs.length === 0;
const take = n => xs => xs.slice(0,n);
const drop = n => xs => xs.slice(n);
const reverse = xs => xs.slice(0).reverse();
const comp = f => c => x => f (c (x));
const not = x => !x;
const chunk = n => xs =>
isEmpty(xs) ? [] : [take(n)(xs), ...chunk (n) (drop (n) (xs))];

let numToWords = n => {
  
  let a = [
    '','один','два','три','четыре','пять','шесть','семь','восемь','девять',
    'десять','одиннадцать','двенадцать','тринадцать','четырнадцать','пятнадцать',
    'шестнадцать','семнадцать','восемнадцать','девятнадцать'
  ];
  
  let b = [
    '', '', 'двадцать','тридцать','сорок','пятьдесят','шестьдесят','семьдесят',
    'восемьдесят','девяносто'
  ];
  
  let c = [
    '','сто','двести','триста','четыреста','пятьсот','шестьсот','семьсот',
    'восемьсот','девятьсот'
  ];
  
  let makeGroup = ([ones,tens,huns]) => {
    return [
      num(huns) === 0 ? '' : c[huns] + ' ',
      num(ones) === 0 ? b[tens] : b[tens] && b[tens] + ' ' || '',
      a[tens+ones] || a[ones]
    ].join('');
  };
  
  if (typeof n === 'number') 
    return numToWords(String(n));
  else if (n === '0')
    return 'ноль';
  else
    return comp (chunk(3)) (reverse) (arr(n))
      .map(makeGroup)
      .reverse()
      .join();
};

let alert;
let minValue;
let maxValue;
let answerNumber;
let orderNumber;
let gameRun = false;
let numWords;
let orderNumberField;
let answerField;
document.getElementById('inputMin').value = "0"
document.getElementById('inputMax').value = "100"

function gameStart() {
    minValue = (parseInt(document.getElementById('inputMin').value) || 0);
    maxValue = (parseInt(document.getElementById('inputMax').value) || 100);
    minValue = (minValue < -999) ? -999 : minValue;
    maxValue = (maxValue > 999) ? 999 : maxValue;
    answerNumber = Math.floor((minValue + maxValue) / 2);
    alert = document.getElementById('alert')
    alert.innerText = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю.`
    orderNumber = 1;
    gameRun = true;
    numWords;
    orderNumberField = document.getElementById('orderNumberField');
    orderNumberField.innerText = orderNumber;
    answerField = document.getElementById('answerField');
    numOrWords();
    answerField.innerText = numWords;
    document.getElementById('inputMin').value = minValue
    document.getElementById('inputMax').value = maxValue
    return;
}

document.getElementById('btnOkay').addEventListener('click', function () {
    gameStart()
    document.getElementById('btnOkay').innerText = "Заново"
})

function numOrWords() {
    if (numToWords(answerNumber).length > 20) {
        numWords = "Вы загадали число " + answerNumber + "?";
        return;
    }
    else {
        if (answerNumber >= 0) {
            numWords = "Вы загадали число " + numToWords(answerNumber) + "?";
            return;
        }
        else if (("minus " + numToWords(answerNumber)).length < 20) {
            numWords = "Вы загадали число минус " + numToWords(answerNumber) + "?";
            return;
        }
        else {
            numWords = "Вы загадали число " + answerNumber + "?";
            return;
        } 
    }
}

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        alert = document.getElementById('alert')
        alert.innerText = ""
        document.getElementById('btnOkay').innerText = "Заново"
        if (minValue == maxValue - 1){
            const phraseRandom = Math.round( Math.random() * 2);
            if (phraseRandom == 0) {
                const answearPhrase = `Вы загадали неправильное число!\n\u{1F914}`;
                answerField.innerText = answearPhrase;
            } 
            else if (phraseRandom == 1) {
                const answearPhrase = `Я сдаюсь..\n\u{1F92F}`;
                answerField.innerText = answearPhrase;
            } 
            else {
                const answearPhrase = `Попробуйте ещё раз!`;
                answerField.innerText = answearPhrase;
            }
            gameRun = false;
        } else {
            maxValue = answerNumber;
            answerNumber = Math.floor((maxValue + minValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            numOrWords();
            answerField.innerText = numWords;
        }
    }
})

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        alert = document.getElementById('alert')
        alert.innerText = ""
        document.getElementById('btnOkay').innerText = "Заново"
        if (minValue == maxValue){
            const phraseRandom = Math.round( Math.random() * 2);
            if (phraseRandom == 0) {
                const answearPhrase = `Вы загадали неправильное число!\n\u{1F914}`;
                answerField.innerText = answearPhrase;
            } 
            else if (phraseRandom == 1) {
                const answearPhrase = `Я сдаюсь..\n\u{1F92F}`;
                answerField.innerText = answearPhrase;
            } 
            else {
                const answearPhrase = `Попробуйте ещё раз!`;
                answerField.innerText = answearPhrase;
            }
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            numOrWords();
            answerField.innerText = numWords;
        }
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        alert = document.getElementById('alert')
        alert.innerText = ""
        document.getElementById('btnOkay').innerText = "Заново"
        const phraseRandom = Math.round( Math.random() * 2);
        if (phraseRandom == 0) {
            const answearPhrase = `Я всегда угадываю\n\u{1F60E}`;
            answerField.innerText = answearPhrase;
        } 
        else if (phraseRandom == 1) {
            const answearPhrase = `Угадал!`;
            answerField.innerText = answearPhrase;
        } 
        else {
            const answearPhrase = `Попробуйте ещё раз!`;
            answerField.innerText = answearPhrase;
        }
        gameRun = false;
    }
})

