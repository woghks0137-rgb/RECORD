const musicPlayer = document.querySelector('.music-player');

if (musicPlayer) {

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

    const titleText = musicPlayer.querySelector('.title');

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
    let isPlaying = false;
    let isMovingTonearm = false;
    let playTimer = null;


    function formatTime(time) {
        if (!isFinite(time)) {
            return '0:00';
        }

        const minutes = Math.floor(time / 60);

        const seconds = Math.floor(time % 60)
            .toString()
            .padStart(2, '0');

        return `${minutes}:${seconds}`;
    }


    function updateProgress() {

        if (!audio.duration || !isFinite(audio.duration)) {
            return;
        }

        currentTimeText.textContent =
            formatTime(audio.currentTime);

        const progress =
            (audio.currentTime / audio.duration) * 100;

        progressBar.style.width = `${progress}%`;
    }


    function updatePlayButton(isPlaying) {

        if (isPlaying) {
            playBtnImg.src = './img/pause.png';
            playBtnImg.alt = '정지';
        } else {
            playBtnImg.src = './img/타임라인 노래 버튼.png';
            playBtnImg.alt = '재생';
        }
    }


    function startMusic() {

        isMovingTonearm = false;
        isPlaying = true;

        recordPlayer.classList.add('playing');
        recordDisc.classList.add('is-rotating');

        updatePlayButton(true);

        audio.play()
            .then(() => {
                console.log('음악 재생');
            })
            .catch((error) => {

                console.error('음악 재생 실패:', error);

                isPlaying = false;

                recordPlayer.classList.remove('playing');
                recordDisc.classList.remove('is-rotating');

                updatePlayButton(false);
            });
    }


    function stopMusic() {

        clearTimeout(playTimer);

        isPlaying = false;
        isMovingTonearm = false;

        audio.pause();

        recordPlayer.classList.remove('playing');
        recordDisc.classList.remove('is-rotating');

        updatePlayButton(false);
    }


    playBtn.addEventListener('click', () => {

        if (isMovingTonearm) {
            return;
        }

        if (isPlaying) {
            stopMusic();
            return;
        }

        isMovingTonearm = true;

        recordPlayer.classList.add('playing');

        clearTimeout(playTimer);

        playTimer = setTimeout(() => {

            startMusic();

        }, 800);
    });


    audio.addEventListener('loadedmetadata', () => {

        durationText.textContent =
            formatTime(audio.duration);
    });


    audio.addEventListener('timeupdate', () => {

        updateProgress();
    });


    audio.addEventListener('play', () => {

        isPlaying = true;

        recordPlayer.classList.add('playing');
        recordDisc.classList.add('is-rotating');

        updatePlayButton(true);
    });


    audio.addEventListener('pause', () => {

        if (audio.ended) {
            return;
        }

        isPlaying = false;

        recordPlayer.classList.remove('playing');
        recordDisc.classList.remove('is-rotating');

        updatePlayButton(false);
    });


    audio.addEventListener('ended', () => {

        clearTimeout(playTimer);

        isPlaying = false;
        isMovingTonearm = false;

        recordPlayer.classList.remove('playing');
        recordDisc.classList.remove('is-rotating');

        progressBar.style.width = '0%';
        currentTimeText.textContent = '0:00';

        updatePlayButton(false);
    });


    audio.addEventListener('error', () => {

        console.error(
            '오디오 파일을 불러오지 못했습니다:',
            audio.src
        );
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

        clearTimeout(playTimer);

        currentSong = index;

        const song = songs[currentSong];

        isPlaying = false;
        isMovingTonearm = true;

        audio.pause();

        recordPlayer.classList.add('playing');
        recordDisc.classList.remove('is-rotating');

        titleText.textContent = song.title;

        currentTimeText.textContent = '0:00';
        durationText.textContent = '0:00';
        progressBar.style.width = '0%';

        updatePlayButton(true);

        audio.src = song.src;
        audio.load();

        playTimer = setTimeout(() => {

            startMusic();

        }, 800);
    }


    audio.src = songs[currentSong].src;
    audio.load();
}


/* =========================
   MODAL
========================= */

const detailBtns = document.querySelectorAll('.detail-btn');

detailBtns.forEach((btn) => {

    btn.addEventListener('click', (e) => {

        const modalId = btn.dataset.modal;

        if (!modalId) {
            return;
        }

        document.querySelectorAll('.modal').forEach((modal) => {
            modal.classList.remove('active');
        });

        const modal = document.getElementById(modalId);

        if (modal) {
            modal.classList.add('active');
        }
    });
});


const closeBtns = document.querySelectorAll('.closeBtn');

closeBtns.forEach((btn) => {

    btn.addEventListener('click', () => {

        const modal = btn.closest('.modal');

        if (modal) {
            modal.classList.remove('active');
        }
    });
});


document.querySelectorAll('.modal').forEach((modal) => {

    modal.addEventListener('click', (e) => {

        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});


document.addEventListener('keydown', (e) => {

    if (e.key !== 'Escape') {
        return;
    }

    document.querySelectorAll('.modal').forEach((modal) => {
        modal.classList.remove('active');
    });
});


/* =========================
   SWIPER
========================= */

let objectSwiper = null;
let cultureSwiper = null;


function startMobileSwiper() {

    const objectList =
        document.querySelector('.mobile-object-swiper');

    const cultureList =
        document.querySelector('.mobile-culture-swiper');


    if (objectList && !objectSwiper) {

        objectSwiper = new Swiper(objectList, {

            slidesPerView: 'auto',
            spaceBetween: 0,
            freeMode: true,
            grabCursor: true,
            resistanceRatio: 0.85

        });
    }


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


function checkSwiperMode() {

    if (window.innerWidth <= 768) {

        startMobileSwiper();

    } else {

        stopMobileSwiper();
    }
}


window.addEventListener('DOMContentLoaded', () => {

    if (typeof Swiper === 'undefined') {

        console.error(
            'Swiper 라이브러리를 불러오지 못했습니다.'
        );

        return;
    }

    checkSwiperMode();

    window.addEventListener(
        'resize',
        checkSwiperMode
    );
});