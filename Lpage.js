const blackhole = document.getElementById("blackholeclicker")
const aboutme = document.getElementsByClassName("appearingtext")[0];
const spinnerbanner = document.getElementById("objectspinner");

let clicked = false;

blackhole.addEventListener('click', e => {
    if (!clicked) {
        aboutme.classList.add('spawncard');
        aboutme.classList.remove('spawnoutcard');
        spinnerbanner.style.pointerEvents = 'none';
        spinnerbanner.style.opacity = '1';
        clicked = true;
    } else {
        aboutme.classList.remove('spawncard');
        aboutme.classList.add('spawnoutcard');
        spinnerbanner.style.removeProperty('pointer-events');
        spinnerbanner.style.opacity = '0';
        clicked = false;
    }
});