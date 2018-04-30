// Enemies our player must avoid
var Enemy = function() {
    // Setting Enemy Image
    this.sprite = 'images/enemy-bug.png';
    // Enemy Positions (Random)
    this.x = Math.floor(Math.random() * (-100 + 1));
    this.y = (function () {
      const yPositions = [60, 145, 230];
      return yPositions[Math.floor(Math.random() * yPositions.length)];
    })();
    // Set random enemy speed (between 1 to 5)
    this.speed = (function () {
      const speed = Math.floor(Math.random() * 5) + 1;
      return speed;
    })();
};

// Update the enemy's position, required method for game
Enemy.prototype.update = function(dt) {
  if (this.x < 600) {
    this.x =  (this.x + (1 * dt)) + this.speed;
    // Enemy-Player Collision Mechanism
    if (this.y === player.y && this.x > (player.x - 50) && this.x < (player.x + 50)) {
      player.x = 200;
      player.y = 400;
    };
  // If enemy is offscreen reset position to a random value between -499 and 0
  } else {
    this.x = Math.floor(Math.random() * (-500 + 1));
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Instantiate of objects.
let allEnemies = [];
// Set number of enemies
const enemiesNumber = 5;
// Create enemies objects and append them to list
for (let i = 0; i < enemiesNumber; ++i) {
  let enemy = new Enemy;
  allEnemies.push(enemy);
};



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
