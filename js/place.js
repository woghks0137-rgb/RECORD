//html 플레이스 카드 갖고오기
const placeCards = document.querySelectorAll('.place-card');

//카드를 forEach로 하나씩 꺼내서 
placeCards.forEach(card => {
    //카드에 있는 영상을 빼오고
    const video = card.querySelector('.place-video');

    //그 영상에 마우스가 올라간다면 영상을 재생시키기
    card.addEventListener('mouseenter', () => {
        video.play();
    });

    //마우스가 이탈한다면 
    card.addEventListener('mouseleave', () => {
        video.pause(); //영상 멈췄다가 
        video.currentTime = 0; // 영상 0초부터 시작
        video.load(); //영상이 끝나면 다시 처음부터 실행
    });
});