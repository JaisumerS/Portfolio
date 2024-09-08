const blackhole = document.getElementById("blackholeclicker")
const aboutme = document.getElementsByClassName("appearingtext")[0];
const spinnerbanner = document.get
let clicked = false;

blackhole.addEventListener('click', e => {
    if (!clicked) {
        aboutme.classList.add('spawncard');
        aboutme.classList.remove('spawnoutcard');
        clicked = true;
    } else {
        aboutme.classList.remove('spawncard');
        aboutme.classList.add('spawnoutcard');
        clicked = false;
    }
});