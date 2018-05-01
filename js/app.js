// Enemy object function constructor
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
      const speed = Math.floor(Math.random() * 500) + 1;
      return speed;
    })();
};

// Enemy prototype inheritance
// Update the enemy's position, required method for game
Enemy.prototype.update = function(dt) {
  if (this.x < 600) {
    this.x =  (this.x + 1 + (dt * this.speed));
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

// Enemy prototype inheritance
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player object function constructor
var Player = function () {
  // Random attribution Mechanism for player avatar selection
  this.sprite = (function() {
    const players = [
      'char-boy.png',
      'char-cat-girl.png',
      'char-horn-girl.png',
      'char-pink-girl.png',
      'char-princess-girl.png'
    ];
    const path = 'images/' + players[Math.floor(Math.random() * players.length)];
    return path;
  })();
  // Player Initial Position
  this.x = 200;
  this.y = 400;
  this.handleInput = function(key) {
    // Player Position and Movement Mechanism.
    if (key === 'left') { this.x -= 100; };
    if (key === 'up') { this.y -= 85; };
    if (key === 'right') { this.x += 100; };
    if (key === 'down') { this.y += 85; };
  };
};

// Player prototype inheritance
Player.prototype.update = function () {
  // Lock player into screen grid;
  if (this.x < 0) { this.x = 0; };
  if (this.x > 400) { this.x = 400; };
  if (this.y > 400) { this.y = 400; } ;
  // If player arrives to water, he wins and position is reset to initial values.
  if (this.y < 60 ) {
    this.x = 200;
    this.y= 400;
  } ;
};

// Player prototype inheritance
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Instantiate of objects.
let allEnemies = [];
// Set number of enemies
const enemiesNumber = 5;
// Create enemies objects and append them to list
for (let i = 0; i < enemiesNumber; ++i) {
  let enemy = new Enemy;
  allEnemies.push(enemy);
};
// Create player object
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
