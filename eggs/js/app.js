var Chicken = function (x, y) {
    // 要应用到每个小鸡的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.width = 35;
    this.height = 42.5;
    this.x = x;
    this.y = y;
    this.speed = Math.floor(50 * (Math.random()));
    this.age = 0;
    // 小鸡的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/0.png';

};

// 此为游戏必须的函数，用来更新小鸡的成长
// 参数: dt ，表示时间间隙
Chicken.prototype.update = function (dt) {
    console.log(dt);
    //小鸡在成长
    let old = this.age;
    if (this.age < 1000) {
        this.age += dt * this.speed;
    }
    if (old <= 500 && this.age > 500) {
        this.sprite = ['images/1.png', 'images/2.png', 'images/2.png'][Math.floor(Math.random() * 2)];
    }
    if (this.age > 500 && this.age < 1000) {
        this.width = 35 + this.age / 40;
        this.height = 42.5 + this.age / 40;
    }
    if (this.age >= 1000) {
        this.width = 72;
        this.height = 122;
        this.sprite = 'images/99.png';
    }
};

// 此为游戏必须的函数，用来在屏幕上画出小鸡，
Chicken.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function () {
    this.width = 72;
    this.height = 122;
    this.x = 202;
    this.y = 300;
    this.sprite = 'images/99.png';
};


Player.prototype.update = function () {
    // new egg
    //其实还应该检测是否重叠
    if (++timer === 100) {
        allEnemies.push(new Chicken(player.x, player.y));
    }
}


Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y - 10, this.width, this.height);
    ctx.clearRect(0, 0, ctx.canvas.width, 40);
    ctx.textAlign = 'center';
    ctx.lineWidth = 2;
    ctx.font = '25px impact';
    ctx.fillStyle = 'black';
    ctx.fillText(`eggs：${allEnemies.length}`, 200, 30);

}
Player.prototype.handleInput = function (direction) {
    timer = 0;
    switch (direction) {
        case 'left':
            if (this.x >= 101) {
                this.x -= 10;
            }
            break;
        case 'up':
            if (this.y >= 83) {
                this.y -= 10;
            }
            break;
        case 'right':
            if (this.x < 101 * 4) {
                this.x += 10;
            }
            break;
        case 'down':
            if (this.y < 83 * 5) {
                this.y += 10;
            }
            break;
    }

}

var timer = 0; //自动下蛋记时
var allEnemies = [];
var player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});