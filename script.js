document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.getElementById('game-container');
  const scoreElement = document.getElementById('score');
  const levelElement = document.getElementById('level');
  let butterflySpeed;
  let butterfliesPerLevel;
  let score = 0;
  let level = 1;
  let butterfliesCaught = 0;
  let gameInterval;

  function createButterfly() {
    const butterflyType = butterflyTypes[Math.floor(Math.random() * butterflyTypes.length)];
    const butterfly = document.createElement('div');
    butterfly.classList.add('butterfly');
    butterfly.style.backgroundImage = `url('${butterflyType.image}')`;

    const x = Math.random() * (gameContainer.offsetWidth - 50);
    const y = Math.random() * (gameContainer.offsetHeight - 50);

    butterfly.style.left = `${x}px`;
    butterfly.style.top = `${y}px`;

    butterfly.addEventListener('click', () => {
      butterfly.remove();
      score += butterflyType.score;
      butterfliesCaught++;

      if (butterfliesCaught % 10 === 0) {
        level++;
        clearInterval(gameInterval);
        startGame();
      }

      scoreElement.textContent = `Score: ${score}`;
      levelElement.textContent = `Level: ${level}`;
    });

    gameContainer.appendChild(butterfly);
  }

  function startGame() {
    butterfliesCaught = 0;
    levelElement.textContent = `Level: ${level}`;

    const difficultySelect = document.getElementById('difficulty-select');
    const selectedDifficulty = parseInt(difficultySelect.value);

    switch (selectedDifficulty) {
      case 1:
        butterflySpeed = 2000; 
        butterfliesPerLevel = 1;
        break;
      case 2:
        butterflySpeed = 1000; 
        butterfliesPerLevel = 1;
        break;
      case 3:
        butterflySpeed = 500; 
        butterfliesPerLevel = 1;
        break;
      default:
        butterflySpeed = 1000;
        butterfliesPerLevel = 2;
        break;
      }
  
      gameInterval = setInterval(() => {
        for (let i = 0; i < butterfliesPerLevel; i++) {
          createButterfly();
        }
      }, butterflySpeed);
    }
  
    function startTimer() {
      const timerElement = document.getElementById('timer');
      let timer = 60; 
      timerElement.textContent = `Time: ${timer}`;
  
      const interval = setInterval(() => {
        timer--;
        timerElement.textContent = `Time: ${timer}`;
  
        if (timer === 0) {
          clearInterval(interval);
          endGame();
        }
      }, 1000);
    }
  
    function endGame() {
      alert('Game over.  Your result: ' + score);
      gameContainer.innerHTML = '';
      score = 0;
      level = 1;
      butterfliesCaught = 0;
      scoreElement.textContent = `Score: ${score}`;
      levelElement.textContent = `Level: ${level}`;
    }
  
    const startButton = document.querySelector('.button');
    startButton.addEventListener('click', () => {
      startGame();
      startTimer();
    });
  
    const butterflyTypes = [
      { image: 'img/butterfly1.png', score: 1 },
      { image: 'img/butterfly2.png', score: 2 },
      { image: 'img/butterfly3.png', score: 3 }
    ];
  
  });
  