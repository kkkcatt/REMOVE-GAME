const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
let letterImgs = []
let screen = document.getElementById('screen');
let scoreDisplay = document.getElementById('score');
let score = 0;
let createInterval;
let dropInterval;
let level = 1;
let keyIsPressed = false

    const gameContorller = document.querySelector('.clock')
    gameContorller.classList.add('hidden');
    const startButton = document.querySelector('.button_img1');
    startButton.addEventListener('click', function() {
    startButton.classList.add('hidden');
    gameContorller.classList.add('block');
    });
  

function startGame() {
    clearInterval(createInterval); // 清除之前可能存在的定时器
    clearInterval(dropInterval); // 清除之前可能存在的定时器
    createInterval = setInterval(createLetter, 500);//隔1s后就执行生成的字母事件
    dropInterval = setInterval(dropLetters, 10);//0.02s后就改变一次高度（形成下落）
    window.addEventListener('keydown', checkKey);
    window.addEventListener('keyup', () => { keyIsPressed = false; }); // 添加 keyup 事件监听器
}

function createLetter() {
    let randomLocation = Math.floor(Math.random() * (window.innerWidth - 70)); // 计算随机水平位置
    let randomLetter = letters[Math.floor(Math.random() * letters.length)];//随机的字母
    let letterElement = document.createElement('input');//创建一个容器
    letterElement.value = randomLetter;//给容器放字母值
    letterElement.className = 'letter';//给容器样式绑定名字
    letterElement.style.background =
     "url(/img/chracters/"+randomLetter+".png) no-repeat"//给容器放字母图片
     letterElement.style.top = "0px"//让容器从最上面（-1px）位置往下掉
     letterElement.style.left = randomLocation + "px"//让容器以横排方式出现 
     screen.appendChild(letterElement);//把容器展示在屏幕上
     letterImgs.push(letterElement); // 将生成的字母元素存入数组中
}

function dropLetters() {
    letterImgs.forEach((letterImg) => {//对里面的每一个元素都执行下面这个函数
        let top = parseInt (letterImg.style.top)|| 0; //存储 css 的top值， //将letter.style.top 的值转换为整数，如果无法转换就返回0 ，//parseInt有转换为整数的功能
        top = (top < 900) ? letterImg.style.top = `${top + level}px` : endGame();
    }
    )
}

function endGame() {
    clearInterval(createInterval);
    clearInterval(dropInterval);
    screen.innerHTML = '';
    score = 0;
    scoreDisplay.textContent = score;
    startButton.classList.remove('hidden');
    // gameContorller.classList.remove('block');
    letterImgs = [];// 清空之前生成的所有字母元素  

}

function checkKey(event) {
    if (keyIsPressed) return;// 检查按键状态，如果已经按下了一个按键，则忽略后续按键事件
    let pressedKey = event.key.toUpperCase();//将监听到的按键 转成大写并且储存止变量pressedkey
    let letterRemoved = false;
    letterImgs.forEach(letter => {//遍历容器值，对里面每一个元素执行下面函数
        if (!letterRemoved && letter.value === pressedKey) {
            letter.remove();
            score++; 
            scoreDisplay.textContent = score;
            letterRemoved = true
            keyIsPressed = true; // 标记按键已被按下
            if (score === 20 || score === 50 || score === 70  ) {
                clearInterval(createInterval);
                clearInterval(dropInterval);
                alert(`Congratulations! You've reached level ${level + 1}. Click OK to continue.`);
                level++;
                startGame();
            }else if (score === 80){
                alert('You finished it !')
            }
        }
    })
}

function handleClick(e){
    let letterRemoved = false;
    letterImgs.forEach(letter =>{
        if (!letterRemoved && letter.value == e ) {
            letter.remove();
            score++; 
            scoreDisplay.textContent = score;
            letterRemoved = true
    }
    if (score === 20 || score === 50 || score === 70  ) {
        clearInterval(createInterval);
        clearInterval(dropInterval);
        alert(`Congratulations! You've reached level ${level + 1}. Click OK to continue.`);
        level++;
        startGame();
    }else if (score === 80){
        alert('You finished it !')
    }
})

   }
 
  document.addEventListener('DOMContentLoaded', function() {
    const numbers = document.querySelectorAll('.number');
    const radius = 95;
    const centerX = 104;
    const centerY = 98;
    const angleStep = (2 * Math.PI) / 17;
  
    numbers.forEach((number, index) => {
      const angle = index * angleStep;
      const x = centerX + radius * Math.cos(angle) - number.offsetWidth / 2;
      const y = centerY + radius * Math.sin(angle) - number.offsetHeight / 2;
      number.style.left = `${x}px`;
      number.style.top = `${y}px`;
    });
  });
  

  document.addEventListener('DOMContentLoaded', function() {
    const numbers = document.querySelectorAll('.number2');
    const radius = 50;
    const centerX = 61;
    const centerY = 60;
    const angleStep = (2 * Math.PI) / 9;
  
    numbers.forEach((number, index) => {
      const angle = index * angleStep;
      const x = centerX + radius * Math.cos(angle) - number.offsetWidth / 2;
      const y = centerY + radius * Math.sin(angle) - number.offsetHeight / 2;
      number.style.left = `${x}px`;
      number.style.top = `${y}px`;
    });
  });
  