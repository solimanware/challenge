// Electric sketch inspired by https://codepen.io/natewiley/
const sketch = Sketch.create({ autoclear: false });
const MAX_DOTS = 80;
const CLEAR_COLOR = "rgba(0,0,0,.1)";
const CONNECT_DISTANCE_FACTOR = 0.1;

let dots = [];
let hue = 0;
let center = { x: sketch.width / 2, y: sketch.height / 2 };

const getDistance = (x1, y1, x2, y2) => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

class Dot {
    constructor() {
        this.init();
    }

    init() {
        this.x = Math.random() * sketch.width;
        this.y = Math.random() * sketch.height;
        this.vx = Math.random() * 6 - 3;
        this.vy = Math.random() * 6 - 3;
    }

    draw() {
        sketch.strokeStyle = `hsla(${hue}, 100%, 50%, .05)`;
        sketch.beginPath();
        sketch.moveTo(this.x, this.y);
        sketch.lineTo(center.x, center.y);
        sketch.stroke();

        this.connectNearbyDots();
        this.update();
    }

    connectNearbyDots() {
        const connectDistance = sketch.width * CONNECT_DISTANCE_FACTOR;
        dots.forEach(dot => {
            const dist = getDistance(this.x, this.y, dot.x, dot.y);
            if (dist < connectDistance) {
                sketch.globalCompositeOperation = "lighter";
                sketch.strokeStyle = `hsla(${hue}, 100%, 50%, .8)`;
                sketch.beginPath();
                sketch.moveTo(this.x, this.y);
                sketch.lineTo(dot.x, dot.y);
                sketch.stroke();
            }
        });
    }

    update() {
        sketch.globalCompositeOperation = "source-over";
        this.color = `hsl(${hue}, 100%, 50%)`;
        this.x += this.vx;
        this.y += this.vy;

        if (this.x >= sketch.width || this.x <= 0) this.vx *= -1;
        if (this.y >= sketch.height || this.y <= 0) this.vy *= -1;
    }
}

sketch.setup = () => {
    dots = Array.from({ length: MAX_DOTS }, () => new Dot());
};

sketch.draw = () => dots.forEach(dot => dot.draw());

sketch.update = () => {
    sketch.fillStyle = CLEAR_COLOR;
    sketch.fillRect(0, 0, sketch.width, sketch.height);
    hue++;
};

document.body.addEventListener("mousedown", (ev) => {
    center = { x: ev.clientX, y: ev.clientY };
});

sketch.resize = () => {
    center = { x: sketch.width / 2, y: sketch.height / 2 };
    dots.forEach(dot => dot.init());
};


// Optimize long-running tasks
function processChunk(tasks, index) {
    const chunkSize = 5;
    for (let i = 0; i < chunkSize && index < tasks.length; i++, index++) {
        tasks[index]();
    }
    if (index < tasks.length) {
        requestAnimationFrame(() => processChunk(tasks, index));
    }
}

// Split the main animation loop into smaller tasks
const animationTasks = dots.map(dot => () => dot.draw());
processChunk(animationTasks, 0);
