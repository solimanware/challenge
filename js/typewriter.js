const config = {
    textData: [
        'Oh..',
        'Hello... 👋😄',
        'How are you..?',
        'My name is Osama Soliman',
        '＠Solimanware',
        'And I am open to new challenges 💪',
        'So do you have a cool challenge for me 😉?'
    ],
    startIndex: 0,
    id: 'typewriter',
    waitAfter: 50,
    initialDelay: 800,
    textDelay: 700,
    finalDelay: 300
};

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class TypeWriter {
    constructor(config) {
        this.config = config;
        this.element = document.getElementById(config.id);
    }

    async type(text) {
        const { waitAfter } = this.config;
        const fragment = document.createDocumentFragment();
        for (let i = 0; i <= text.length; i++) {
            await wait(waitAfter);
            fragment.textContent = text.substring(0, i);
            this.render(fragment, i);
        }
    }

    render(fragment, length) {
        this.element.textContent = fragment.textContent;
        if (fragment.textContent[length - 1] !== ' ') {
            const ratio = length / 30;
            this.element.style.fontSize = `${5 - ratio}vw`;
        }
    }

    async animate() {
        const { textData, textDelay, initialDelay } = this.config;
        await wait(initialDelay);
        for (const text of textData) {
            await wait(textDelay);
            await this.type(text);
            await wait(textDelay);
        }
    }
}

// Optimize UIManager
class UIManager {
    constructor() {
        this.typewriter = document.getElementById('typewriter');
        this.callMobile = document.getElementById('call-mobile');
        this.arrow = document.getElementById('arrow');
    }

    async finalAnimation() {
        const { finalDelay } = config;
        await wait(finalDelay);
        await this.type("Contact me now");
        this.typewriter.style.borderColor = "transparent";
        this.callMobile.style.display = "unset";
        this.arrow.style.display = "unset";
        
        // Use setTimeout instead of multiple waits
        setTimeout(() => {
            this.arrow.style.display = "none";
            setTimeout(async () => {
                await this.type("Waiting you 😉");
                this.arrow.style.display = "unset";
                setTimeout(() => {
                    this.arrow.style.display = "none";
                }, 5000);
            }, 5000);
        }, 7000);
    }

    async type(text) {
        const writer = new TypeWriter({ ...config, textData: [text] });
        await writer.animate();
    }
}

async function main() {
    const writer = new TypeWriter(config);
    await writer.animate();

    const ui = new UIManager();
    await ui.finalAnimation();
}

main().catch(console.error);

// Use requestAnimationFrame for smoother animations
function animateArrow() {
    const arrow = document.getElementById('arrow');
    let direction = 1;
    let position = 0;

    function step() {
        position += direction;
        if (position > 10 || position < 0) direction *= -1;
        arrow.style.transform = `translateY(${position}px)`;
        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

// Call animateArrow instead of using CSS animation
animateArrow();