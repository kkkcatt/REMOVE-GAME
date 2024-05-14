const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
let letterImgs = []
let screen = document.getElementById('screen');
let scoreDisplay = document.getElementById('score-js');
let score = 0;
let createInterval;
let dropInterval;
let level = 1;
let keyIsPressed = false
  

function startGame() {
    clearInterval(createInterval); 
    clearInterval(dropInterval);
    createInterval = setInterval(createLetter, 500);
    dropInterval = setInterval(dropLetters, 10);
    window.addEventListener('keydown', checkKey);
    window.addEventListener('keyup', () => { keyIsPressed = false; }); 
}

function createLetter() {
    let randomLocation = Math.floor(Math.random() * (window.innerWidth-100));
    let randomLetter = letters[Math.floor(Math.random() * letters.length)];
    let letterElement = document.createElement('input');
    letterElement.value = randomLetter;
    letterElement.className = 'letter';
    letterElement.style.background =
     "url(img/chracters/"+randomLetter+".png) no-repeat"
     letterElement.style.top = "0px"
     letterElement.style.left = randomLocation + "px"
     screen.appendChild(letterElement);
     letterImgs.push(letterElement); 
}

function dropLetters() {
    letterImgs.forEach((letterImg) => {
        let top = parseInt (letterImg.style.top,10)|| 0; 
        top = (top < 900) ? letterImg.style.top = `${top + level}px` : endGame();
    }
    )
}

function endGame() {
    clearInterval(createInterval);
    clearInterval(dropInterval);
    screen.innerHTML = '';
    score = 0;
    level = 1;
    scoreDisplay.textContent = score;
    letterImgs = [];
    alert('Oops,maybe try again will eat more fishes')
}

function checkKey(event) {
    if (keyIsPressed) return;
    let pressedKey = event.key.toUpperCase();
    let letterRemoved = false;
    letterImgs.forEach((letter,index) => {
        if (!letterRemoved && letter.value === pressedKey) {
            score++; 
            scoreDisplay.textContent = score;
            letter.remove();
            letterRemoved = true
            keyIsPressed = true; 
            letterImgs.splice(index, 1);
            if (score === 20 || score === 50 || score === 80 ) { 
                setTimeout(()=>{
                    clearInterval(createInterval);
                    clearInterval(dropInterval);
                    screen.innerHTML = '';
                    letterImgs = [];
                    scoreDisplay.textContent = score;
                    alert(`Congratulations! You've reached level ${level + 1}. Click OK to continue.`);
                    level++
                    startGame()
                },100)
            }else if (score === 70){
                alert('You finished it !')
            }
        }
    })
}