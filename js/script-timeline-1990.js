const musicPlayer = document.querySelector('.music-player');
const recordPlayer = musicPlayer.querySelector('.record-player');
const recordDisc = musicPlayer.querySelector('.record-disc');
const tonearm = musicPlayer.querySelector('.tonearm');
const playBtn = musicPlayer.querySelector('.play-btn');
const playBtnImg = playBtn.querySelector('img');
const audio = musicPlayer.querySelector('.audio');
const progressBar = musicPlayer.querySelector('.progress span');
const currentTimeText = musicPlayer.querySelector('.current-time');
const durationText = musicPlayer.querySelector('.duration');
const prevBtn = musicPlayer.querySelector('.prev-btn');
const nextBtn = musicPlayer.querySelector('.next-btn');

const detailBtns = document.querySelectorAll('.detail-btn');

const songs = [
    {
        title: '붉은 노을 - 이문세',
        src: './audio/테스트.mp3'
    },
    {
        title: '테스트 02',
        src: './audio/테스트02.mp3'
    },
    {
        title: '테스트 03',
        src: './audio/테스트03.mp3'
    }
];

let currentSong = 0;
/* =========================
   상태
========================= */

let isPlaying = false;
let isMovingTonearm = false;
let playTimer = null;


/* =========================
   시간 표시
========================= */

function formatTime(time) {

    if (isNaN(time)) {
        return '0:00';
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
        .toString()
        .padStart(2, '0');
    return `${minutes}:${seconds}`;
}


/* =========================
   오디오 메타데이터 로드
========================= */

audio.addEventListener('loadedmetadata', () => {

    durationText.textContent = formatTime(audio.duration);

});


/* =========================
   재생
========================= */

function startMusic() {

    isPlaying = true;

    /* LP 회전 시작 */
    recordDisc.classList.add('is-rotating');

    /* 바늘 도착 상태 */
    recordPlayer.classList.add('is-playing');

    /* 재생 버튼 → 정지 버튼 */
    playBtnImg.src = './img/pause.png';
    playBtnImg.alt = '정지';

    /* 음악 재생 */
    audio.play();
}


/* =========================
   정지
========================= */

function stopMusic() {

    isPlaying = false;

    /* 예약된 재생 취소 */
    clearTimeout(playTimer);

    /* 음악 정지 */
    audio.pause();

    /* LP 회전 정지 */
    recordDisc.classList.remove('is-rotating');

    /* 바늘 원위치 */
    recordPlayer.classList.remove('is-playing');

    /* 정지 버튼 → 재생 버튼 */
    playBtnImg.src = './img/타임라인 노래 버튼.png';
    playBtnImg.alt = '재생';
}


/* =========================
   재생 버튼
========================= */

playBtn.addEventListener('click', () => {


    /* --------------------------------
       이미 재생 중이면 정지
    -------------------------------- */

    if (isPlaying) {

        stopMusic();

        return;
    }


    /* --------------------------------
       바늘이 이동 중이면
       중복 클릭 방지
    -------------------------------- */

    if (isMovingTonearm) {

        return;
    }


    /* --------------------------------
       재생 시작
    -------------------------------- */

    isMovingTonearm = true;


    /*
        바늘을 LP 쪽으로 이동

        여기서는 아직
        음악 X
        LP 회전 X
    */

    recordPlayer.classList.add('is-playing');


    /*
        CSS transition이 0.8초니까
        0.8초 후에 실제 음악 재생
    */

    playTimer = setTimeout(() => {

        isMovingTonearm = false;
        startMusic();

    }, 800);

});


/* =========================
   현재 재생 시간
========================= */

audio.addEventListener('timeupdate', () => {

    if (!audio.duration) {
        return;
    }


    /* 현재 시간 */

    currentTimeText.textContent =
        formatTime(audio.currentTime);


    /* 진행률 */

    const progress =
        (audio.currentTime / audio.duration) * 100;


    progressBar.style.width = `${progress}%`;

});


/* =========================
   노래 종료
========================= */

audio.addEventListener('ended', () => {

    isPlaying = false;
    isMovingTonearm = false;

    recordDisc.classList.remove('is-rotating');

    recordPlayer.classList.remove('is-playing');

    progressBar.style.width = '0%';

    currentTimeText.textContent = '0:00';

    playBtnImg.src = './img/타임라인 노래 버튼.png';
    playBtnImg.alt = '재생';
});

prevBtn.addEventListener('click', () => {

    let prevSong = currentSong - 1;

    if (prevSong < 0) {
        prevSong = songs.length - 1;
    }

    changeSong(prevSong);
});


nextBtn.addEventListener('click', () => {

    let nextSong = currentSong + 1;

    if (nextSong >= songs.length) {
        nextSong = 0;
    }

    changeSong(nextSong);
});
function changeSong(index) {

    currentSong = index;

    const song = songs[currentSong];

    // 제목 변경
    musicPlayer.querySelector('.title').textContent = song.title;

    // 기존 예약 취소
    clearTimeout(playTimer);

    // 기존 음악 정지
    audio.pause();

    // 오디오 변경
    audio.src = song.src;
    audio.currentTime = 0;

    // 시간 초기화
    currentTimeText.textContent = '0:00';
    durationText.textContent = '0:00';
    progressBar.style.width = '0%';

    // 상태
    isPlaying = false;
    isMovingTonearm = true;

    // LP 회전
    recordDisc.classList.add('is-rotating');

    // 바늘 이동
    recordPlayer.classList.add('is-playing');

    // 정지 버튼 유지
    playBtnImg.src = './img/pause.png';
    playBtnImg.alt = '정지';

    // 1.5초 후 재생
    playTimer = setTimeout(() => {

        isMovingTonearm = false;
        isPlaying = true;

        audio.play();

    }, 1500);
}

detailBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".modal").forEach((modal) => {
            modal.classList.remove("active")
        });

        const modalId = btn.dataset.modal;

        const modal = document.querySelector(`#${modalId}`)

        modal.classList.add("active")
    })
})


const closeBtns = document.querySelectorAll('.closeBtn');
closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').classList.remove('active');
    });
});

document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach((modal) => {
            modal.classList.remove('active');
        });
    }
});