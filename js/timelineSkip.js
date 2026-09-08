const cards = document.querySelectorAll('.timeline-card');

cards.forEach(card => {
    const video = card.querySelector('video');

    card.addEventListener('mouseenter', () => {
        video.play();
    });

    card.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});