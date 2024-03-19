window.onload = function(){
    var stage = document.getElementById('stage');
    var ctx = stage.getContext("2d");
    document.addEventListener("keydown", keyPush);

    var firstMove = false; // Nova variável para rastrear a primeira movimentação

    setInterval(game, 120);

    const vel = 1;
    var gameOver = false;
    var vx = vy = 0;
    var px = py = 10;
    var tp = 20;
    var qp = 30;
    var ax = ay = 15;

    var trail = [];
    tail = 1;

    function game() {
        if (gameOver) {
            if (vx !== 0 || vy !== 0) {
                resetGame();
            } else {
                ctx.fillStyle = "white";
                ctx.font = "30px Arial";
                ctx.fillText("Perdeu Mané", stage.width / 3, stage.height / 2);
                return;
            }
        }

        if (!firstMove) {
            return;
        }

        px += vx;
        py += vy;

        if (px < 0) {
            px = qp - 1;
        }
        if (px > qp - 1) {
            px = 0;
        }
        if (py < 0) {
            py = qp - 1;
        }
        if (py > qp - 1) {
            py = 0;
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, stage.width, stage.height);

        ctx.fillStyle = "red";
        ctx.fillRect(ax * tp, ay * tp, tp, tp);

        ctx.fillStyle = "green";
        for (var i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1);
            if (trail[i].x == px && trail[i].y == py) {
                gameOver = true;
                vx = vy = 0;
                tail = 1;
            }
        }
        trail.push({ x: px, y: py });
        while (trail.length > tail) {
            trail.shift();
        }

        if (ax == px && ay == py) {
            tail++;
            ax = Math.floor(Math.random() * qp);
            ay = Math.floor(Math.random() * qp);
        }
    }

    function keyPush(event) {
        if (!firstMove) {
            firstMove = true; // A primeira movimentação ocorreu
        }

        if (vx !== 0 || vy !== 0) {

        } else {
            resetGame();
        }

        // Verifica se a tecla pressionada não é na direção oposta à atual
        if (!(event.keyCode === 37 && vx === vel) &&    // Tecla esquerda e movimento atual não é para a direita
            !(event.keyCode === 38 && vy === vel) &&    // Tecla cima e movimento atual não é para baixo
            !(event.keyCode === 39 && vx === -vel) &&   // Tecla direita e movimento atual não é para a esquerda
            !(event.keyCode === 40 && vy === -vel)) {   // Tecla baixo e movimento atual não é para cima
            switch (event.keyCode) {
                case 37: //left
                    vx = -vel;
                    vy = 0;
                    break;
                case 38: //up
                    vx = 0;
                    vy = -vel;
                    break;
                case 39: //right
                    vx = vel;
                    vy = 0;
                    break;
                case 40: //down
                    vx = 0;
                    vy = vel;
                    break;
                default:
                    break;
            }
        }
    }

    function resetGame() {
        gameOver = false;
        px = py = 10;
        vx = vy = 0;
        tail = 5;
        trail = [];
        ax = ay = 15;
    }
}