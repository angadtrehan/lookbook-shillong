import { getPageValues }from './pageValues.js';

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

if (new Date().setHours(0,0,0,0) < new Date('04/07/2025').setHours(0,0,0,0)) {
    console.log('site should not be accessed from index');
    const message = document.createElement('div');
    const title = document.createElement('h1');
    const sub = document.createElement('p');
    const img = document.createElement('div');
    img.innerHTML = '<img src="./assets/Screenshot_2025-04-06_at_18.10.12-removebg-preview.png" alt="">';
    img.classList.add('icon');
    sub.appendChild(document.createTextNode('The full site can be accessed after you get back, come home fastly'));
    sub.id = 'by-ninki';
    title.appendChild(document.createTextNode('NOT YET'));
    message.classList.add('intro');
    message.appendChild(title);
    message.appendChild(sub);
    message.appendChild(img);
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
        y: -1000
    });
}

const queryParams = new URLSearchParams(window.location.search);
const look = atob(queryParams.get('look')).trim();
console.log(look);

const popupAnimation = [
    {transform: "translateY(100vh)"},
    {transform: "translateY(0)"}
];

const popdownAnimation = [
    {transform: "translateY(0)"},
    {transform: "translateY(100vh)"}
];

const popupAnimationOptions = {
    duration: 500, 
    easing: 'ease-out' 
};

const dialog = document.querySelector('.popup');
const lookSection = document.querySelector('#look');
const headerImage = document.querySelector('#look > .header > .header-image > img');
const headerTitle = document.querySelector('#look > .header > h1');
const pairedWithImage = document.querySelector('#look > .header > .paired-with > .image > img');
const descriptionText = document.querySelector('#look > .description > p');
const header = document.querySelector('#look > .header');
const pairedWith = document.querySelector('#look > .header > .paired-with');
let values;

const closePopup = document.querySelector('#close-icon');
closePopup.addEventListener('click', () => {
    lookSection.animate(popdownAnimation, popupAnimationOptions);
    body.style.height = '';
    body.style.overflow = '';
    setTimeout(() => {
        dialog.close();
    }, 490);
    queryParams.delete('look');
    history.replaceState(null, null, "?" + queryParams.toString());
});

handlePopups(look, true);

const links = document.querySelectorAll('.box > div a');

for (const link of links) {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        handlePopups(link.id, false);
    });
}


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
            lookSection.animate(popupAnimation, popupAnimationOptions);
            if (values['isLast'] && fromLink) {
                setTimeout(() => {
                    console.log('trigger');
                    closeHint.style.opacity = 0;
                    closeHint.innerText = 'you can try this now :)';
                    closeHint.animate(
                        [
                            {opacity: "0"},
                            {opacity: "1"}
                        ],
                        {
                            duration: 500, 
                            easing: 'ease-out' 
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
            break;
    }
    console.log(window.location.href);
    history.replaceState(null, null, "?" + queryParams.toString());
}