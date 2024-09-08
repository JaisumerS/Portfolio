const blackhole = document.getElementById("blackholeclicker")
const aboutme = document.getElementsByClassName("appearingtext")[0];
const spinnerBanner = document.getElementById("objectspinner");
const spinnerRing = document.getElementById("ring");
const ringAmount = parseInt(getComputedStyle(spinnerRing).getPropertyValue('--amount').trim(), 10)
const bhp1 = document.getElementById("bhclick1");
const bhp2 = document.getElementById("bhclick2");
let clicked = false;
let animForward = true;
//BANNER
const bannerKeyframes = [
    {bottom: '0%', opacity: 0},
    {bottom: '18%', opacity: 1}
];
const spinnerTime = {
    duration: 1500,
    easing: 'ease-in-out',
    fill: 'forwards'
};
const bannerAnimation = new KeyframeEffect(
    spinnerBanner, bannerKeyframes, spinnerTime
);
const bannerSpawn = new Animation(bannerAnimation, document.timeline);
//RING
let ringDegree = (360/ringAmount);
let currentAngle = 0;
const ringKeyframes = [
    {transform: `perspective(1000px) rotateX(-10deg)`}
]
const ringAnimation = new KeyframeEffect(
    spinnerRing, ringKeyframes, spinnerTime
);
const ringSpawn = new Animation(ringAnimation, document.timeline);
//BLACKHOLE
const bhKeyframes = [
    {transform: 'translateY(120%) scale(0.5) rotate(360deg)', zIndex: 4}
];
const bhTime = {
    duration: 1500,
    easing: 'ease-in-out',
    fill: 'forwards'
};
const bhAnimation = new KeyframeEffect(
    blackhole, bhKeyframes, bhTime
);
const bhSpawn = new Animation(bhAnimation, document.timeline);

blackhole.addEventListener('click', e => {
    if (!clicked) {
        aboutme.classList.add('spawncard');
        aboutme.classList.remove('spawnoutcard');
        bhp1.style.transitionDelay = '0s';
        bhp2.style.transitionDelay = '0.75s';
        bhp1.style.opacity = 0;
        bhp2.style.opacity = 1;
        spinnerBanner.style.pointerEvents = 'auto';/*temporary*/
        if (animForward) {
            bannerSpawn.play()
            bhSpawn.play()
            ringSpawn.play()
        } else {
            bannerSpawn.reverse()
            bhSpawn.reverse()
            ringSpawn.reverse();
        }
        clicked = true;
    } else {
        aboutme.classList.remove('spawncard');
        aboutme.classList.add('spawnoutcard');
        bhp1.style.transitionDelay = '0.75s';
        bhp2.style.transitionDelay = '0s';
        bhp1.style.opacity = 1;
        bhp2.style.opacity = 0;
        spinnerBanner.style.pointerEvents = 'none';/*temporary*/
        bannerSpawn.reverse();
        bhSpawn.reverse();
        ringSpawn.reverse();
        animForward = false;
        clicked = false;
    }
});

function animateSpinner(angle) {
    const newAngle = currentAngle + angle;
    spinnerRing.animate(
        [
            { transform: `perspective(1000px) rotateX(-10deg) rotateY(${currentAngle}deg)` },
            { transform: `perspective(1000px) rotateX(-10deg) rotateY(${newAngle}deg)` }
        ],
        {
            duration: 1000,
            easing: 'ease-in-out',
            fill: 'forwards'
        }
    );
    currentAngle = newAngle;
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || clicked == true) {
        animateSpinner(-ringDegree);
    } else if (event.key === 'ArrowLeft' || clicked == true) {
        animateSpinner(ringDegree);
    }
});

const leftButton = document.getElementById('left-arrow');
const rightButton = document.getElementById('right-arrow');
leftButton.addEventListener('click', () => {
    animateSpinner(ringDegree);
});
rightButton.addEventListener('click', () => {
    animateSpinner(-ringDegree);
});