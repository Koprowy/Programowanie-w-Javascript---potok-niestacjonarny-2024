let currentIndex = 0;
let isPlaying = true; // Flaga kontrolująca stan animacji
let interval;

const slides = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');
const totalSlides = dots.length;

const showSlide = (index) => {
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }
    const offset = -currentIndex * 100; /* Przesunięcie o 100% na każdy slajd */
    slides.style.transform = `translateX(${offset}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

const startSlider = () => {
    interval = setInterval(() => {
        showSlide(currentIndex + 1);
    }, 2000);
}

const stopSlider = () => {
    clearInterval(interval);
}

document.querySelector('.arrow-left').addEventListener('click', () => {
    showSlide(currentIndex - 1);
});

document.querySelector('.arrow-right').addEventListener('click', () => {
    showSlide(currentIndex + 1);
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Uruchomienie slidera na start
startSlider();

// Funkcja nasłuchująca na spację
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if (isPlaying) {
            stopSlider();
        } else {
            startSlider();
        }
        isPlaying = !isPlaying; // Zmiana stanu animacji
    }
});