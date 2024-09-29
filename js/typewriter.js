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
        for (let i = 0; i <= text.length; i++) {
            await wait(waitAfter);
            this.render(text.substring(0, i), i);
        }
    }

    render(text, length) {
        this.element.textContent = text;
        if (text[length - 1] !== ' ') {
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
        await wait(500);
        this.callMobile.style.display = "unset";
        this.arrow.style.display = "unset";
        await wait(7000);
        this.arrow.style.display = "none";
        await wait(5000);
        await this.type("Waiting you 😉");
        await wait(500);
        this.arrow.style.display = "unset";
        await wait(5000);
        this.arrow.style.display = "none";
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