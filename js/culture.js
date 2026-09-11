const mainImage = document.querySelector('.culture-main-image');
const video = mainImage.querySelector('video');

mainImage.addEventListener('mouseenter', () => {
    video.play();
});

mainImage.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
});