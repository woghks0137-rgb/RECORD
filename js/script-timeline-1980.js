/* =========================
   MUSIC PLAYER
========================= */

const musicPlayer = document.querySelector('.music-player');

if (musicPlayer) {

    const recordPlayer = musicPlayer.querySelector('.record-player');
    const recordDisc = musicPlayer.querySelector('.record-disc');
    const tonearm = musicPlayer.querySelector('.tonearm');

    const playBtn = musicPlayer.querySelector('.play-btn');
    const prevBtn = musicPlayer.querySelector('.prev-btn');
    const nextBtn = musicPlayer.querySelector('.next-btn');

    const audio = musicPlayer.querySelector('.audio');
    const currentTimeEl = musicPlayer.querySelector('.current-time');
    const durationEl = musicPlayer.querySelector('.duration');
    const progress = musicPlayer.querySelector('.progress');
    const progressBar = progress ? progress.querySelector('span') : null;

    const title = musicPlayer.querySelector('.title');


    /* =========================
       음악 목록
    ========================= */

    const musicList = [
        {
            title: '붉은 노을 - 이문세',
            src: './audio/테스트.mp3'
        }
    ];

    let currentMusic = 0;


    /* =========================
       시간 표시
    ========================= */

    function formatTime(time) {

        if (isNaN(time)) {
            return '0:00';
        }

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }


    /* =========================
       음악 불러오기
    ========================= */

    function loadMusic(index) {

        if (!musicList[index]) {
            return;
        }

        const music = musicList[index];

        audio.src = music.src;
        title.textContent = music.title;

        currentTimeEl.textContent = '0:00';
        durationEl.textContent = '0:00';

        if (progressBar) {
            progressBar.style.width = '0%';
        }

        audio.load();
    }

    /* =========================
       재생 / 일시정지
    ========================= */

    function togglePlay() {

        const playImg = playBtn ? playBtn.querySelector('img') : null;

        if (audio.paused) {

            /* ★ 버튼을 누르자마자 일시정지 이미지로 변경 */
            if (playImg) {
                playImg.src = './img/pause.png';
            }

            if (playBtn) {
                playBtn.setAttribute('aria-label', '일시정지');
            }


            /* 톤암을 LP 위로 이동 */
            if (tonearm) {
                tonearm.classList.add('playing');
            }

            if (recordPlayer) {
                recordPlayer.classList.add('playing');
            }


            /* 톤암이 LP 위로 내려간 후 음악 재생 */
            setTimeout(() => {

                if (audio.paused) {

                    audio.play();

                    if (recordDisc) {
                        recordDisc.classList.add('playing');
                    }

                }

            }, 800);


        } else {

            /* ★ 버튼을 누르자마자 재생 이미지로 변경 */
            audio.pause();

            if (playImg) {
                playImg.src = './img/타임라인 노래 버튼.png';
            }

            if (playBtn) {
                playBtn.setAttribute('aria-label', '재생');
            }


            if (recordDisc) {
                recordDisc.classList.remove('playing');
            }

            /* 톤암 원래 위치 */
            if (tonearm) {
                tonearm.classList.remove('playing');
            }

            if (recordPlayer) {
                recordPlayer.classList.remove('playing');
            }

        }
    }

    /* =========================
       이전 곡
    ========================= */

    function prevMusic() {

        currentMusic--;

        if (currentMusic < 0) {
            currentMusic = musicList.length - 1;
        }

        loadMusic(currentMusic);
        audio.play();

    }


    /* =========================
       다음 곡
    ========================= */

    function nextMusic() {

        currentMusic++;

        if (currentMusic >= musicList.length) {
            currentMusic = 0;
        }

        loadMusic(currentMusic);
        audio.play();

    }


    /* =========================
       재생 버튼
    ========================= */

    if (playBtn) {
        playBtn.addEventListener('click', togglePlay);
    }


    /* =========================
       이전 / 다음 버튼
    ========================= */

    if (prevBtn) {
        prevBtn.addEventListener('click', prevMusic);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextMusic);
    }


    /* =========================
       음악 재생 시간
    ========================= */

    audio.addEventListener('loadedmetadata', () => {

        durationEl.textContent = formatTime(audio.duration);

    });


    audio.addEventListener('timeupdate', () => {

        currentTimeEl.textContent = formatTime(audio.currentTime);

        if (audio.duration && progressBar) {

            const percent =
                (audio.currentTime / audio.duration) * 100;

            progressBar.style.width = `${percent}%`;

        }

    });


    /* =========================
       음악 종료
    ========================= */

    audio.addEventListener('ended', () => {

        nextMusic();

    });


    /* =========================
       진행바 클릭
    ========================= */

    if (progress) {

        progress.addEventListener('click', (e) => {

            if (!audio.duration) {
                return;
            }

            const rect = progress.getBoundingClientRect();

            const clickX = e.clientX - rect.left;

            const percent = clickX / rect.width;

            audio.currentTime = audio.duration * percent;

        });

    }


    /* =========================
       최초 음악 설정
    ========================= */

    loadMusic(currentMusic);

}


/* =========================
   MODAL
========================= */

const detailButtons = document.querySelectorAll('.detail-btn');
const closeButtons = document.querySelectorAll('.closeBtn');
/* =========================
   모달 열기
========================= */

const modalButtons = document.querySelectorAll('.detail-btn[data-modal');

modalButtons.forEach(button => {

    button.addEventListener('click', (e) => {

        e.preventDefault();
        e.stopPropagation();

        const modalId = button.dataset.modal;
        const modal = document.getElementById(modalId);

        if (!modal) {
            console.log('모달을 찾을 수 없음:', modalId);
            return;
        }

        modal.classList.add('active');

    });

});

/* =========================
   모달 닫기
========================= */

closeButtons.forEach(button => {

    button.addEventListener('click', () => {

        const modal = button.closest('.modal');

        if (modal) {
            modal.classList.remove('active');
        }

    });

});


/* =========================
   모달 바깥 클릭
========================= */

document.querySelectorAll('.modal').forEach(modal => {

    modal.addEventListener('click', (e) => {

        if (e.target === modal) {
            modal.classList.remove('active');
        }

    });

});


/* =========================
   ESC로 모달 닫기
========================= */

document.addEventListener('keydown', (e) => {

    if (e.key === 'Escape') {

        document.querySelectorAll('.modal').forEach(modal => {

            modal.classList.remove('active');

        });

    }

});


/* =========================
   MOBILE SWIPER
   PC / MOBILE 카드가 HTML에서 분리되어 있음
========================= */

let objectSwiper = null;
let cultureSwiper = null;


/* =========================
   모바일 Swiper 시작
========================= */

function startMobileSwiper() {

    /* 대표 물건 - 모바일 전용 */

    const objectList =
        document.querySelector('.mobile-object-swiper');

    if (objectList && !objectSwiper) {

        objectSwiper = new Swiper(objectList, {

            slidesPerView: 'auto',

            spaceBetween: 0,

            freeMode: true,

            grabCursor: true,

            resistanceRatio: 0.85

        });

    }


    /* 당시 문화 - 모바일 전용 */

    const cultureList =
        document.querySelector('.mobile-culture-swiper');

    if (cultureList && !cultureSwiper) {

        cultureSwiper = new Swiper(cultureList, {

            slidesPerView: 'auto',

            spaceBetween: 0,

            freeMode: true,

            grabCursor: true,

            resistanceRatio: 0.85

        });

    }

}


/* =========================
   모바일 Swiper 종료
========================= */

function stopMobileSwiper() {

    if (objectSwiper) {

        objectSwiper.destroy(true, true);

        objectSwiper = null;

    }


    if (cultureSwiper) {

        cultureSwiper.destroy(true, true);

        cultureSwiper = null;

    }

}


/* =========================
   PC / 모바일 전환
========================= */

let swiperMode = null;


function checkSwiperMode() {

    const nextMode =
        window.innerWidth <= 768
            ? 'mobile'
            : 'pc';


    /* 같은 화면이면 다시 실행하지 않음 */

    if (nextMode === swiperMode) {
        return;
    }


    /* 모바일 */

    if (nextMode === 'mobile') {

        startMobileSwiper();

    }


    /* PC */

    else {

        stopMobileSwiper();

    }


    swiperMode = nextMode;

}


/* =========================
   최초 실행
========================= */

checkSwiperMode();


/* =========================
   화면 크기 변경
========================= */

window.addEventListener('resize', checkSwiperMode);

window.addEventListener('load', () => {
    if (window.location.hash === '#culture04') {
        const target = document.querySelector('#culture04');

        if (target) {
            setTimeout(() => {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 100);
        }
    }
});