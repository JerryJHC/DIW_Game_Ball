class Component {
    constructor(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    update(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    top() {
        return this.y;
    }

    bottom() {
        return this.y + this.height;
    }

    left() {
        return this.x;
    }

    right() {
        return this.x + this.width;
    }

}

class Ball extends Component {

    constructor(width, height, radio, color, x, y) {
        super(width, height, color, x, y);
        this.dirX = 0;
        this.dirY = 0;
        this.velocidad = 1;
        this.radio = radio;
    }

    top() {
        return this.y - this.height;
    }

    bottom() {
        return this.y + this.height;
    }

    left() {
        return this.x - this.width;
    }

    right() {
        return this.x + this.width;
    }

    crashTop(otherobj) {
        return (this.left() <= otherobj.right() && this.right() >= otherobj.left() && this.top() <= otherobj.bottom() && this.bottom() > otherobj.bottom());
    }

    crashRight(otherobj) {
        return (this.top() <= otherobj.bottom() && this.bottom() >= otherobj.top() && this.right() >= otherobj.left() && this.left() < otherobj.left());
    }

    crashLeft(otherobj) {
        return (this.top() <= otherobj.bottom() && this.bottom() >= otherobj.top() && this.left() <= otherobj.right() && this.right() > otherobj.right());
    }

    crashBottom(otherobj) {
        return (this.left() <= otherobj.right() && this.right() >= otherobj.left() && this.bottom() >= otherobj.top() && this.top() < otherobj.top());
    }

    newPos() {
        this.x += this.dirX * this.velocidad;
        this.y += this.dirY * this.velocidad;
    }

    update(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }

    addVelocity() {
        if (this.velocidad < 10)
            this.velocidad++;
    }

    reduceVelocity() {
        if (this.velocidad > 1)
            this.velocidad--;
    }
}