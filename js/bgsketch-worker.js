// Web Worker for background sketch animation

let sketch, dots, hue, center;
const MAX_DOTS = 80;
const CLEAR_COLOR = "rgba(0,0,0,.1)";
const CONNECT_DISTANCE_FACTOR = 0.1;

const getDistance = (x1, y1, x2, y2) => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

class Dot {
    constructor(width, height) {
        this.init(width, height);
    }

    init(width, height) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = Math.random() * 6 - 3;
        this.vy = Math.random() * 6 - 3;
    }

    update(width, height) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x >= width || this.x <= 0) this.vx *= -1;
        if (this.y >= height || this.y <= 0) this.vy *= -1;
    }
}

function updateAnimation(width, height) {
    const connectDistance = width * CONNECT_DISTANCE_FACTOR;
    const positions = [];

    hue++;
    dots.forEach(dot => {
        dot.update(width, height);
        positions.push({ x: dot.x, y: dot.y });
    });

    const connections = [];
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            const dist = getDistance(dots[i].x, dots[i].y, dots[j].x, dots[j].y);
            if (dist < connectDistance) {
                connections.push({ from: i, to: j });
            }
        }
    }

    return { positions, connections, hue, center };
}

self.onmessage = function(e) {
    if (e.data.type === 'init') {
        const { width, height } = e.data;
        dots = Array.from({ length: MAX_DOTS }, () => new Dot(width, height));
        hue = 0;
        center = { x: width / 2, y: height / 2 };
    } else if (e.data.type === 'update') {
        const { width, height } = e.data;
        const animationData = updateAnimation(width, height);
        self.postMessage(animationData);
    } else if (e.data.type === 'updateCenter') {
        center = e.data.center;
    }
};