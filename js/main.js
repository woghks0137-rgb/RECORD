const video = document.querySelector(".opening-video");
const wrap = document.querySelector("#wrap");
const yearButtons = document.querySelectorAll(".year-btn");

const soundButton = document.querySelector(".sound");
const soundOn = document.querySelector(".sound-on");
const soundOff = document.querySelector(".sound-off");
video.muted = true;

// ==========================
// 영상 경로
// ==========================

const openingVideo = "./img/메인페이지 영상/오프닝 영상 !!!!!!!!!!!!!!.mp4";
const mainVideo = "./img/메인페이지 영상/반복영상.mp4";

const yearVideos = {
    1980: "./img/메인페이지 영상/1980 동영상.mp4",
    1990: "./img/메인페이지 영상/1990 동영상.mp4",
    2000: "./img/메인페이지 영상/2000 동영상.mp4",
    2010: "./img/메인페이지 영상/2010 동영상.mp4"
};


// ==========================
// 오프닝을 본 적 있는지 확인
// ==========================

const visited = localStorage.getItem("recordVisited");


if (visited === "true") {

    // ==========================
    // 이미 오프닝을 본 경우
    // → 반복영상 바로 재생
    // ==========================

    video.src = mainVideo;
    video.loop = true;
    video.load();

    // 바로 줌아웃 상태
    wrap.classList.remove("intro-zoom");
    wrap.classList.add("zoom-out");

    video.play()
        .catch(error => {
            console.log("반복영상 재생 실패:", error);
        });


} else {

    // ==========================
    // 처음 방문
    // → 오프닝 재생
    // ==========================

    video.src = openingVideo;
    video.loop = false;
    video.load();

    // 오프닝 줌인 상태
    wrap.classList.add("intro-zoom");

    video.play()
        .catch(error => {
            console.log("오프닝 재생 실패:", error);
        });


    // ==========================
    // 오프닝 영상이 끝났을 때
    // ==========================

    video.addEventListener("ended", () => {

        // ⭐ 오프닝을 본 것으로 저장
        localStorage.setItem("recordVisited", "true");

        // 반복영상으로 변경
        video.src = mainVideo;
        video.loop = true;
        video.load();

        // 줌아웃
        wrap.classList.remove("intro-zoom");
        wrap.classList.add("zoom-out");

        video.play()
            .catch(error => {
                console.log("반복영상 재생 실패:", error);
            });

    }, { once: true });
}



// ==========================
// 연도 버튼
// ==========================

yearButtons.forEach(button => {

    button.addEventListener("click", () => {

        const year = button.dataset.year;
        const videoSrc = yearVideos[year];

        video.src = videoSrc;
        video.loop = true;

        video.load();

        video.play()
            .catch(error => {
                console.log(`${year} 영상 재생 실패:`, error);
            });

    });

});

soundButton.addEventListener("click", () => {

    video.muted = !video.muted;

    if (video.muted) {
        soundOn.style.display = "none";
        soundOff.style.display = "block";
    } else {
        soundOn.style.display = "block";
        soundOff.style.display = "none";
    }

});