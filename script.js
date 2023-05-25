document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const scoreElement = document.getElementById('score');
    const levelElement = document.getElementById('level');
  
    let score = 0;
    let level = 1;
    let butterfliesCaught = 0;
    let gameInterval;
  
    function createButterfly() {
      const butterfly = document.createElement('div');
      butterfly.classList.add('butterfly');
  
      const x = Math.random() * (gameContainer.offsetWidth - 50);
      const y = Math.random() * (gameContainer.offsetHeight - 50);
  
      butterfly.style.left = `${x}px`;
      butterfly.style.top = `${y}px`;
  
      butterfly.addEventListener('click', () => {
        butterfly.remove();
        score += 1;
        butterfliesCaught++;
  
        if (butterfliesCaught % 10 === 0) {
          level++;
          clearInterval(gameInterval);
          startGame();
        }
  
        scoreElement.textContent = `Рахунок: ${score}`;
        levelElement.textContent = `Рівень: ${level}`;
      });
  
      gameContainer.appendChild(butterfly);
    }
  
    function startGame() {
      butterfliesCaught = 0;
  
      gameInterval = setInterval(() => {
        for (let i = 0; i < level; i++) {
          createButterfly();
        }
      }, 1000);
    }
  
    startGame();
  });
  