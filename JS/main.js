// Elemenos Html
var c, ctx, buttons;

// Componentes
var paredes = [], bola, meta;

//contadores
var paradas = 0, tiempo = 500, interval = 50, fin = false;

function controller() {
    c.width = c.width;
    if (!fin) {
        tiempo -= interval;

        if (bola.crashRight(meta)) {
            fin = true;
            return;
        }

        if (paredes.find(p => ((bola.crashTop(p) && bola.dirY == -1) || (bola.crashBottom(p) && bola.dirY == 1) || (bola.crashRight(p) && bola.dirX == 1) || (bola.crashLeft(p) && bola.dirX == -1))) === undefined)
            bola.newPos();
    } else {
        //Texto en la pantalla
        ctx.font = "30px Arial";
        ctx.fillText("Has ganado!", c.width / 2 - 70, 70);
    }
    bola.update(ctx);

    //Dibuja todas las paredes
    paredes.forEach(p => p.update(ctx));

    //Dibuja la meta
    meta.update(ctx);
    //Texto en la pantalla
    ctx.font = "15px Arial";
    ctx.fillText("X=" + bola.x + " Y=" + bola.y, 15, 25);
    ctx.fillText("Tiempo : " + (tiempo / 1000).toFixed(2) + " s", 200, 25);
    ctx.fillText("Paradas : " + paradas, 400, 25);
}

//Determina a que direccion se quiere mover
function directionController() {

    if (this.textContent == 'Mas velocidad')
        bola.addVelocity();
    else if (this.textContent == 'Menos velocidad')
        bola.reduceVelocity();
    else {

        if (this.textContent == 'P') paradas++;

        if (this.textContent == 'NE' || this.textContent == 'E' || this.textContent == 'SE')
            bola.dirX = -1;

        if (this.textContent == 'NE' || this.textContent == 'N' || this.textContent == 'NO')
            bola.dirY = -1;

        if (this.textContent == 'N' || this.textContent == 'P' || this.textContent == 'S')
            bola.dirX = 0;

        if (this.textContent == 'E' || this.textContent == 'P' || this.textContent == 'O')
            bola.dirY = 0;

        if (this.textContent == 'NO' || this.textContent == 'O' || this.textContent == 'SO')
            bola.dirX = 1;

        if (this.textContent == 'SE' || this.textContent == 'S' || this.textContent == 'SO')
            bola.dirY = 1;
    }

}

window.onload = () => {
    c = document.getElementById("myCanvas");
    ctx = c.getContext('2d');
    buttons = document.querySelectorAll(".buttons button");

    buttons.forEach((b) => b.addEventListener('click', directionController));

    setInterval(controller, interval);

    //Bordes de la pantalla
    paredes.push(new Component(c.width, 10, "green", 0, 35));   //Top
    paredes.push(new Component(c.width, 10, "green", 0, c.height - 10));    //Bottom
    paredes.push(new Component(10, c.height, "green", 0, 0));    //Left
    paredes.push(new Component(10, c.height, "green", c.width - 10, 0));    //Right

    //Crea los obstaculos
    paredes.push(new Component(300, 10, "green", 50, 100));
    paredes.push(new Component(10, 90, "green", 350, 100));
    paredes.push(new Component(10, 160, "green", 410, 35));
    paredes.push(new Component(10, 150, "green", 470, 90));
    paredes.push(new Component(50, 10, "green", 470, 90));
    paredes.push(new Component(50, 10, "green", 540, 150));
    paredes.push(new Component(50, 10, "green", 470, 200));
    paredes.push(new Component(300, 10, "green", 300, 300));
    paredes.push(new Component(180, 10, "green", 300, 240));
    paredes.push(new Component(10, 50, "green", 300, 200));
    paredes.push(new Component(300, 10, "green", 0, 150));
    paredes.push(new Component(250, 10, "green", 50, 200));
    paredes.push(new Component(10, 100, "green", 50, 200));
    paredes.push(new Component(10, 200, "green", 100, 250));
    paredes.push(new Component(10, 100, "green", 150, 200));
    paredes.push(new Component(10, 200, "green", 200, 250));
    paredes.push(new Component(10, 140, "green", 250, 200));
    paredes.push(new Component(10, 50, "green", 350, 360));
    paredes.push(new Component(10, 50, "green", 400, 300));
    paredes.push(new Component(10, 50, "green", 450, 360));
    paredes.push(new Component(10, 50, "green", 500, 300));

    //crea la bola
    bola = new Ball(18, 18, 20, "red", 40, 70);

    //crea la meta
    meta = new Component(20, 20, "black", c.width - 30, c.height - 30);

}