const config = {
    //text that should writer display:
    textData: [
        'Oh..',
        'Hello... 👋😄',
        'How are you..?',
        'My name is Osama Soliman',
        '＠Microsmsm',
        'And I am open to new challenges 💪',
        'So do you have a cool challenge for me 😉?'
    ],
    //letter index that writer should start from:
    startIndex: 0,
    //element id that writer should draw to:
    id: 'typewriter',
    //time after every letter stroke in ms. the less the more (type speed)
    waitAfter: 50
}

//waiting function //instead of writing setTimeout everytime
const wait = (ms) => new Promise(r => setTimeout(r, ms));

//core function
async function typeWriter(text, n, elementId, waitAfter) {
    const el = document.getElementById(elementId);
    if (n < (text.length)) {
        requestAnimationFrame(() => {
            el.innerHTML = (text.substring(0, n + 1));
            //ratio that text should resize to fit screen with
            let ratio = n / 30;
            //if not space ...
            if (text[n] !== " ") {
                //apply this ratio
                el.style.fontSize = `${ 5 - ratio}vw`; //es6 template evaluation
            }
        })

        n++;
        await wait(waitAfter) //wait after letter stroke
        await typeWriter(text, n, elementId, waitAfter) //recursion untill finish
    }
}

//starting our script... using config object with arguments destruction es6 trick:
async function startScript({
    textData,
    startIndex,
    id,
    waitAfter
}) {
    //wait before excuding the script:
    await wait(800);
    for (let text of textData) {
        //wait before wrting the text from text data
        await wait(700);
        await typeWriter(text, startIndex, id, waitAfter);
        //wait after writing the text
        await wait(700);
    }
}

//calling out start function
startScript(config).then(async () => {
    //adding more ux to beatify the visuals
    await wait(300)
    await typeWriter("Contact me now", 0, 'typewriter', 50)
    document.getElementById('typewriter').style.borderColor = "transparent"
    await wait(500)
    document.getElementById("call-mobile").style.display = "unset";
    document.getElementById("arrow").style.display = "unset";
    await wait(10000)
    document.getElementById("arrow").style.display = "none";
    await wait(5000)
    await typeWriter("Waiting you 😉", 0, 'typewriter', 50)
    await wait(500)
    document.getElementById("arrow").style.display = "unset";
    await wait(5000)
    document.getElementById("arrow").style.display = "none";
})