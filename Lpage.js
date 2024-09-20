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
    {transform: `perspective(1000px) rotateX(-8deg)`}
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
        spinnerBanner.style.pointerEvents = 'auto';
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
        spinnerBanner.style.pointerEvents = 'none';
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
            { transform: `perspective(1000px) rotateX(-8deg) rotateY(${currentAngle}deg)` },
            { transform: `perspective(1000px) rotateX(-8deg) rotateY(${newAngle}deg)` }
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
    if (event.key === 'ArrowRight' & clicked == true) {
        animateSpinner(-ringDegree);
    } else if (event.key === 'ArrowLeft' & clicked == true) {
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

document.querySelectorAll('.menuoption').forEach(option => {
    option.addEventListener('click', function() {
      const targetSection = document.querySelector(this.dataset.target);
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
});

const sliderItems = document.querySelectorAll('.slider-item');

sliderItems.forEach(item => {
    item.addEventListener('click', () => {
        const url = item.getAttribute('data-link');
        window.open(url, '_blank');
    });
});

const boxes = document.querySelectorAll('.box');
const skills = document.getElementsByClassName('skills')
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-box');
            observer.unobserve(box);
        }
    });
}, {
    threshold: 0.2
});
boxes.forEach(box => {
    observer.observe(box);
});

function applyAnimationDelays() {
    const techBars = document.querySelectorAll('.tech-bar');

    techBars.forEach(bar => {
        const skillsCount = parseInt(getComputedStyle(bar).getPropertyValue('--skills'), 10);
        const time = parseInt(getComputedStyle(bar).getPropertyValue('--time'), 10);
        const items = bar.querySelectorAll('.bar-item');

        items.forEach(item => {
            const skIndex = parseInt(getComputedStyle(item).getPropertyValue('--skindx'), 10);
            const animationDelay = `calc(${time}s / ${skillsCount} * (${skillsCount} - ${skIndex}) * -1)`;
            item.style.animationDelay = animationDelay;
            item.style.animationDuration = `${time}s`;
        });
    });
}
applyAnimationDelays();