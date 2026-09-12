const mainImg = document.querySelector(".main-img");
const thumbnails = document.querySelectorAll(".img-btn");

let currentIndex = 0;
let autoSlide;

// 이미지 변경 함수
function changeImage(index) {
    currentIndex = index;

    // 현재 썸네일의 이미지 가져오기
    const thumbnailImg = thumbnails[index].querySelector("img");

    // 메인 이미지 변경
    mainImg.src = thumbnailImg.src;

    // 모든 썸네일의 active 제거
    thumbnails.forEach((thumbnail) => {
        thumbnail.classList.remove("active");
    });

    // 현재 썸네일에 active 추가
    thumbnails[index].classList.add("active");
}

// 다음 이미지
function nextImage() {
    currentIndex++;

    // 마지막 이미지 다음에는 첫 번째로
    if (currentIndex >= thumbnails.length) {
        currentIndex = 0;
    }

    changeImage(currentIndex);
}

// 자동 슬라이드 시작
function startAutoSlide() {
    clearInterval(autoSlide);

    autoSlide = setInterval(() => {
        nextImage();
    }, 4000);
}

// 썸네일 클릭
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
        changeImage(index);

        // 클릭하면 5초 타이머를 다시 시작
        startAutoSlide();
    });
});

// 처음 실행
changeImage(0);
startAutoSlide();