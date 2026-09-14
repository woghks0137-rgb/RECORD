const cards = document.querySelectorAll('.card-photo');

cards.forEach(card => {
    const video = card.querySelector('video');

    card.addEventListener('mouseenter', () => {
        video.currentTime = 0;
        video.play();
    });

    card.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});