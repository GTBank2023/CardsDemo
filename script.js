let currentAngle = 0;
const carousel = document.querySelector('.carousel');
const cards = document.querySelectorAll('.card');
let autoplayInterval;

function rotateCarousel(direction) {
    currentAngle += direction === 'next' ? -120 : 120;
    carousel.style.transform = `rotateY(${currentAngle}deg)`;
    updateActiveCard();
}

function updateActiveCard() {
    const activeIndex = Math.round((currentAngle % 360) / -120) % cards.length;
    const actualIndex = (activeIndex + cards.length) % cards.length; // Ensure index is positive
    const activeCard = cards[actualIndex];
    const activeInfo = activeCard.getAttribute('data-info');

    document.querySelectorAll('.info-content').forEach(info => {
        info.classList.remove('active');
    });
    document.getElementById(activeInfo).classList.add('active');
}

function startAutoplay() {
    autoplayInterval = setInterval(() => rotateCarousel('next'), 3000); // Rotate every 3 seconds
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

// Add event listeners for the buttons
document.getElementById('prevBtn').addEventListener('click', () => {
    stopAutoplay(); // Stop autoplay on manual control
    rotateCarousel('prev');
    startAutoplay(); // Restart autoplay after manual control
});

document.getElementById('nextBtn').addEventListener('click', () => {
    stopAutoplay(); // Stop autoplay on manual control
    rotateCarousel('next');
    startAutoplay(); // Restart autoplay after manual control
});

// Pause autoplay on hover
carousel.addEventListener('mouseover', stopAutoplay);
carousel.addEventListener('mouseout', startAutoplay);

// Initial content display and start autoplay
updateActiveCard();
startAutoplay();
