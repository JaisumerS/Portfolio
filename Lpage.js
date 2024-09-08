const blackhole = document.getElementById("blackholeclicker")
const aboutme = document.getElementsByClassName("appearingtext")[0];
const spinnerBanner = document.getElementById("objectspinner");
let clicked = false;
let animForward = true;

const ringKeyframes = [
    {bottom: '0%', opacity: 0},
    {bottom: '15%', opacity: 1}
];
const ringTime = {
    duration: 1500,
    easing: 'ease-in-out',
    fill: 'forwards'
};
const ringAnimation = new KeyframeEffect(
    spinnerBanner, ringKeyframes, ringTime
);
const ringSpawn = new Animation(ringAnimation, document.timeline);

blackhole.addEventListener('click', e => {
    if (!clicked) {
        aboutme.classList.add('spawncard');
        aboutme.classList.remove('spawnoutcard');
        spinnerBanner.style.pointerEvents = 'none';/*temporary*/
        if (animForward) {
            ringSpawn.play()
        } else {
            ringSpawn.reverse()
        }
        clicked = true;
    } else {
        aboutme.classList.remove('spawncard');
        aboutme.classList.add('spawnoutcard');
        spinnerBanner.style.removeProperty('pointer-events');/*temporary*/
        ringSpawn.reverse();
        animForward = false;
        clicked = false;
    }
});