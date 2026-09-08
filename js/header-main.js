//html 요소 가져오기

//메인페이지 비디오를 video 변수로 저장
const video = document.querySelector('.main-video');

// PC 소리 버튼 (오른쪽)
const soundBtn = document.querySelector('.sound');
const soundOn = document.querySelector('.sound-on');
const soundOff = document.querySelector('.sound-off');

// 모바일 소리 버튼 (왼쪽)
const mSound1 = document.querySelector('.m-sound1');
const mSound2 = document.querySelector('.m-sound2');


// muted : true = 음소거, false = 음소거 해제
function soundOnHandler() {
    // muted를 false로 설정하여 비디오 소리 재생
    video.muted = false;

    // width 값이 768보다 크다면 PC사운드 아이콘이 on은 보이게 off는 안보이게 
    if (window.innerWidth > 768) {
        soundOn.style.display = 'block';
        soundOff.style.display = 'none';
    }

    // 768보다 작다면 모바일 사운드 아이콘이 on은 보이게 off는 안보이게
    else {
        mSound1.style.display = 'flex';
        mSound2.style.display = 'none';
    }
}


// 소리 끄기
function soundOffHandler() {
    // video가 음소거상태인가? true라면 계속 음소거
    video.muted = true;

    // width 값이 768보다 크다면 PC사운드 아이콘이 on은 안보이게 off는 보이게
    if (window.innerWidth > 768) {
        soundOn.style.display = 'none';
        soundOff.style.display = 'block';
    }

    //  768보다 작다면 모바일 사운드 아이콘이 on은 안보이게 off는 보이게
    else {
        mSound1.style.display = 'none';
        mSound2.style.display = 'flex';
    }
}


// PC 소리 버튼 클릭
soundBtn.addEventListener('click', function () {
    //음소거 상태라면 소리 on
    if (video.muted) {
        soundOnHandler();
        //아니라면 소리 off
    } else {
        soundOffHandler();
    }
});


// 모바일 소리 켜기 버튼 클릭
mSound1.addEventListener('click', function () {
    // 소리on 아이콘을 클릭하면 off 함수실행
    soundOffHandler();
});


// 모바일 소리 끄기 버튼 클릭
mSound2.addEventListener('click', function () {
    // 소리off 아이콘을 클릭하면 on 함수실행
    soundOnHandler();
});