// Electric sketch inspired by https://codepen.io/natewiley/
const sketch = Sketch.create({ autoclear: false });
let worker;

sketch.setup = () => {
    worker = new Worker('js/bgsketch-worker.js');
    worker.postMessage({ type: 'init', width: sketch.width, height: sketch.height });

    worker.onmessage = (e) => {
        const { positions, connections, hue, center } = e.data;
        sketch.clear();

        sketch.fillStyle = "rgba(0,0,0,.1)";
        sketch.fillRect(0, 0, sketch.width, sketch.height);

        sketch.strokeStyle = `hsla(${hue}, 100%, 50%, .05)`;
        positions.forEach(pos => {
            sketch.beginPath();
            sketch.moveTo(pos.x, pos.y);
            sketch.lineTo(center.x, center.y);
            sketch.stroke();
        });

        sketch.globalCompositeOperation = "lighter";
        sketch.strokeStyle = `hsla(${hue}, 100%, 50%, .8)`;
        connections.forEach(conn => {
            sketch.beginPath();
            sketch.moveTo(positions[conn.from].x, positions[conn.from].y);
            sketch.lineTo(positions[conn.to].x, positions[conn.to].y);
            sketch.stroke();
        });

        sketch.globalCompositeOperation = "source-over";
    };
};

sketch.draw = () => {
    worker.postMessage({ type: 'update', width: sketch.width, height: sketch.height });
};

document.body.addEventListener("mousedown", (ev) => {
    worker.postMessage({ type: 'updateCenter', center: { x: ev.clientX, y: ev.clientY } });
});

sketch.resize = () => {
    worker.postMessage({ type: 'init', width: sketch.width, height: sketch.height });
};
