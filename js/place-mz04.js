const mainImg = document.querySelector(".place-main-image img");
const thumbnails = document.querySelectorAll(".gallery-item");

let currentIndex = 0;
let autoSlide;

// 메인 이미지 변경
function changeImage(index) {
    currentIndex = index;

    // 클릭한 썸네일의 이미지 가져오기
    const thumbnailImg = thumbnails[index].querySelector("img");

    // 메인 이미지 변경
    mainImg.src = thumbnailImg.src;

    // 모든 썸네일 active 제거
    thumbnails.forEach((thumbnail) => {
        thumbnail.classList.remove("active");
    });

    // 현재 썸네일 active
    thumbnails[index].classList.add("active");
}

// 다음 이미지
function nextImage() {
    currentIndex++;

    // 마지막 → 첫 번째
    if (currentIndex >= thumbnails.length) {
        currentIndex = 0;
    }

    changeImage(currentIndex);
}

// 자동 슬라이드
function startAutoSlide() {
    clearInterval(autoSlide);

    autoSlide = setInterval(() => {
        nextImage();
    }, 5000);
}

// 썸네일 클릭
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
        changeImage(index);
        startAutoSlide();
    });
});

// 처음 실행
changeImage(0);
startAutoSlide();