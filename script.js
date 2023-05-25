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
            butterflySpeed = 2000; // Легкий рівень
            butterfliesPerLevel = 1;
            break;
          case 2:
            butterflySpeed = 1000; // Середній рівень
            butterfliesPerLevel = 1;
            break;
          case 3:
            butterflySpeed = 500; // Складний рівень
            butterfliesPerLevel = 1;
            break;
          default:
            butterflySpeed = 1000; // За замовчуванням встановити середній рівень
            butterfliesPerLevel = 1;
            break;
        }
      
        gameInterval = setInterval(() => {
          for (let i = 0; i < butterfliesPerLevel; i++) {
            createButterfly();
          }
        }, butterflySpeed);
      }
  
    startGame();
  });
  