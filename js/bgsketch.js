//electric sketch by https://codepen.io/natewiley/ 
var s = Sketch.create({
    autoclear: false
});
var max = 80;
var dots = [];
var clearColor = "rgba(0,0,0,.1)";
var hue = 0;
var connectDistance = s.width / 10;
var center = {
    x: s.width / 2,
    y: s.height / 2
};

var getDistance = function (x1, x2, y1, y2) {
    return sqrt((pow(x1 - x2, 2)) + (pow(y1 - y2, 2)))
};

function D() {}

D.prototype = {
    init: function () {
        this.x = random(s.width);
        this.y = random(s.height);
        this.vx = random(-3, 3);
        this.vy = random(-3, 3);
    },

    draw: function () {
        s.strokeStyle = "hsla(" + hue + ", 100%, 50%, .05)";
        s.beginPath();
        s.moveTo(this.x, this.y);
        s.lineTo(center.x || s.width / 2, center.y || s.height / 2);
        s.closePath();
        s.stroke();
        for (var i in dots) {
            d = dots[i];
            var dist = getDistance(this.x, d.x, this.y, d.y);
            if (dist < connectDistance) {
                s.globalCompositeOperation = "lighter";
                s.strokeStyle = "hsla(" + hue + ", 100%, 50%, .8)";
                s.beginPath();
                s.moveTo(this.x, this.y);
                s.lineTo(d.x, d.y);
                s.closePath();
                s.stroke();
            }
        }
        this.update();
    },

    update: function () {
        s.globalCompositeOperation = "source-over";
        this.color = "hsl(" + hue + ", 100%, 50%)";
        this.x += this.vx;
        this.y += this.vy;

        if (this.x >= s.width || this.x <= 0) {
            this.vx *= -1;
        }

        if (this.y >= s.height || this.y <= 0) {
            this.vy *= -1;
        }

    }
};


s.setup = function () {
    for (var i = 0; i < max; i++) {
        var d = new D();
        d.init();
        dots.push(d);
    }
};

s.draw = function () {
    for (var i in dots) {
        dots[i].draw();
    }
};

s.update = function () {
    s.fillStyle = clearColor;
    s.fillRect(0, 0, s.width, s.height);
    hue++;
};

//using acuall pointer location instead of canvas pointer location as canvas in sat backwards as background
document.body.addEventListener("mousedown", (ev)=>{
    center.x = ev.clientX;
    center.y = ev.clientY;
});

// s.mousedown = function () {
//     center.x = s.mouse.x;
//     center.y = s.mouse.y;
// };

s.resize = function () {
    center.x = s.width / 2;
    center.y = s.height / 2;
    for (var i in dots) {
        dots[i].init();
    }
};
