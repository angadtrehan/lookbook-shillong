import { getPageValues } from './pageValues.js';
import { Countdown } from './timer.js';

// Initialize Lenis
const lenis = new Lenis({
    syncTouch: true
});

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const body = document.querySelector('.view');
const TARGET_DATE = 'April, 12 2025 00:00:00';

if (dateCompare()) {
    console.log('site should not be accessed from index');
    const message = document.createElement('div');
    const title = document.createElement('h1');
    const sub = document.createElement('p');
    const img = document.createElement('div');
    img.innerHTML = '<img src="./assets/Logo.png" alt="">';
    img.classList.add('icon');
    sub.appendChild(document.createTextNode("The full site can be accessed after you get back, come home fastly :')"));
    sub.id = 'by-ninki';
    sub.classList.add('special');
    title.appendChild(document.createTextNode('NOT YET'));
    message.classList.add('intro');
    message.classList.add('special');

    const timer = new Countdown({
        doc: document,
        targetDate: new Date(TARGET_DATE) 
    });

    message.appendChild(title);
    message.appendChild(sub);
    message.appendChild(img);
    message.appendChild(timer.getTimerObject());
    body.innerHTML = '';
    body.appendChild(message);
    body.style.position = 'relative';
} else {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.normalizeScroll(true);
    // gsap animation
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.intro',
            start: 'top top',
            end: 'bottom center',
            scrub: true,
            markers: false,
            pin: true,
            pinSpacing: false,
        }
    });
    
    tl.to('.intro', {
        y: (-(window.innerHeight + 100)) 
    });
}

let queryParams = new URLSearchParams(window.location.search);
let look = atob(queryParams.get('look')).trim();
console.log(look);

const popupAnimation = [
    {transform: "translateY(100vh)"},
    {transform: "translateY(0)"}
];

const backdropAnimationUp = [
    {opacity: "0"},
    {opactiy: "1"}
]

const backdropAnimationDown = [
    {opacity: "1"},
    {opactiy: "0"}
]

const popdownAnimation = [
    {transform: "translateY(-5vh)"},
    {transform: "translateY(100vh)"}
];

const popupAnimationOptions = {
    duration: 500, 
    easing: 'ease-in-out' 
};

const dialog = document.querySelector('.popup');
const lookSection = document.querySelector('#look');
const backdropSpan = document.querySelector('#backdrop');
const headerImage = document.querySelector('#look > .header > .header-image > img');
const headerTitle = document.querySelector('#look > .header > h1');
const pairedWithImage = document.querySelector('#look > .header > .paired-with > .image > img');
const descriptionText = document.querySelector('#look > .description > p');
const header = document.querySelector('#look > .header');
const pairedWith = document.querySelector('#look > .header > .paired-with');
const wornOn = document.querySelector('#worn');
let values;

const closePopup = document.querySelector('#close-icon');
closePopup.addEventListener('click', () => {
    if (!dateCompare()) {
        wornOn.style.zIndex = '0';
        wornOn.animate(
            [
                {opacity: "1", left: "70%"},
                {opacity: "0", left: "50%"}
            ],
            popupAnimationOptions
        );
        wornOn.style.opacity = 0;
        wornOn.style.left = '50%';
    }
    lookSection.animate(
        [
            {transform: "translateY(0vh)", borderBottomLeftRadius: `${window.getComputedStyle(lookSection).getPropertyValue('border-bottom-left-radius')}`, borderBottomRightRadius: `${window.getComputedStyle(lookSection).getPropertyValue('border-bottom-right-radius')}`},
            {transform: "translateY(-5vh)", borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px'}
        ],
        {
            duration: 500,
            easing: 'ease-in-out'
        }
    );
    setTimeout(() => {
        backdropSpan.animate(backdropAnimationDown, popupAnimationOptions);
        backdropSpan.style.opacity = 0;
        lookSection.animate(popdownAnimation, popupAnimationOptions);
        body.style.height = '';
        body.style.overflow = '';
        setTimeout(() => {
            dialog.close();
        }, 490);
        queryParams.delete('look');
        history.pushState(null, null, "?" + queryParams.toString());
    }, 500);
});

handlePopups(look, true);

const links = document.querySelectorAll('.box > div a');

for (const link of links) {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        handlePopups(link.id, false);
    });
}

window.addEventListener('popstate', () => {
    queryParams = new URLSearchParams(window.location.search);
    look = atob(queryParams.get('look')).trim();
    console.log(look);
    handlePopups(look, true);
})


function handlePopups(look, fromLink) {
    switch(look) {
        case 'blue':
        case 'black':
        case 'rust':
        case 'dungaree':
        case 'beige':
            console.log(getPageValues(look));
            values = getPageValues(look);
            headerImage.src = values['headerImageSource'];
            headerTitle.innerText = values['headerTitle'];
            headerTitle.style.color = values['headerTitleColour'];
            pairedWithImage.src = values['pairedWithImageSource'];
            descriptionText.innerText = values['descriptionText'];
            header.style.backgroundColor = values['headerColour'];
            pairedWith.style.backgroundColor = values['pairedWithBgColour'];
            closePopup.style.color = values['headerTitleColour'];
            const closeHint = document.querySelector('#close-hint');
            closeHint.innerText = '';
            dialog.showModal();
            backdropSpan.style.opacity = 0;
            backdropSpan.animate(backdropAnimationUp, popupAnimationOptions);
            lookSection.animate(popupAnimation, popupAnimationOptions);
            backdropSpan.style.opacity = 1;
            if (!dateCompare()) {
                if (values['wornOn'] !== '') {
                    wornOn.textContent = `Worn on ${values['wornOn']}`;
                } else {
                    wornOn.textContent = `Not worn (yet)`;
                }
                setTimeout(() => {
                    wornOn.animate(
                        [
                            {opacity: "0", left: "50%"},
                            {opacity: "1", left: "70%"}
                        ],
                        popupAnimationOptions
                    );
                    wornOn.style.opacity = 1;
                    wornOn.style.left = '70%';
                }, 500);  
            }
            if (fromLink && dateCompare(true)) {
                setTimeout(() => {
                    console.log('trigger');
                    closeHint.style.opacity = 0;
                    closeHint.innerText = 'you can try this now :)';
                    closeHint.style.color = values['headerTitleColour'];
                    closeHint.animate(
                        [
                            {opacity: "0"},
                            {opacity: "1"}
                        ],
                        {
                            duration: 500, 
                            easing: 'ease-in-out' 
                        }
                    );
                    closeHint.style.opacity = 1;
                }, 2000);
            }
            queryParams.set('look', btoa(look));
            break;
        default:
            console.log('invalid look');
            queryParams.delete('look');
            closePopup.dispatchEvent(new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            }));
            break;
    }
    console.log(window.location.href);
    history.pushState(null, null, "?" + queryParams.toString());
}

function dateCompare(specific) {
    if (specific) {
        return new Date().setHours(0,0,0,0) === new Date(TARGET_DATE).setHours(0,0,0,0);
    }
    return new Date().setHours(0,0,0,0) < new Date(TARGET_DATE).setHours(0,0,0,0);
}