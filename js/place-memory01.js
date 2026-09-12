const mainImg = document.querySelector(".main-img");
const thumbnails = document.querySelectorAll(".thumbnail");

let currentIndex = 0;
let autoSlide;


// 이미지 변경 함수
function changeImage(index) {

    // 현재 인덱스 변경
    currentIndex = index;

    // 썸네일 이미지 가져오기
    const thumbnailImg = thumbnails[index].querySelector("img");

    // 메인 이미지 변경
    mainImg.src = thumbnailImg.src;

    // active 제거
    thumbnails.forEach((thumbnail) => {
        thumbnail.classList.remove("active");
    });

    // 현재 썸네일 active 추가
    thumbnails[index].classList.add("active");
}


// 다음 이미지로 이동
function nextImage() {

    currentIndex++;

    // 마지막이면 첫 번째로
    if (currentIndex >= thumbnails.length) {
        currentIndex = 0;
    }

    changeImage(currentIndex);
}


// 자동 슬라이드 시작
function startAutoSlide() {

    autoSlide = setInterval(() => {
        nextImage();
    }, 4000);
}


// 썸네일 클릭
thumbnails.forEach((thumbnail, index) => {

    thumbnail.addEventListener("click", () => {

        // 클릭한 이미지로 변경
        changeImage(index);

        // 기존 타이머 제거
        clearInterval(autoSlide);

        // 클릭 후 다시 5초부터 시작
        startAutoSlide();
    });

});


// 자동 슬라이드 시작
startAutoSlide();