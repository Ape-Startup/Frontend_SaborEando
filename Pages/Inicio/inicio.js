// Carrosel
let currentSlide = 0;
const slides = document.querySelectorAll('.frase');
const dots = document.querySelectorAll('.frame-item');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
    });

    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
    setInterval(nextSlide, 3000); // Change slide every 3 seconds
});

//splash screen
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }, 3000); // Splash screen aparecerá por 3 segundos
});