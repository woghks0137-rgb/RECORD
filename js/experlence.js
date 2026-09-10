//html 요소 가져오기
// TV 체험관 HTML
const video = document.querySelector('.video');
const tvOnBtn = document.querySelector('.tv-btn');
const changeBtn = document.querySelector('.change-btn');
const off = document.querySelector('.off');
// 효과음
const tvOnSound = document.querySelector('#tvOnSound');
const tvOffSound = document.querySelector('#tvOffSound');

// 카세트 체험관 HTML
const cassettePlayBtn = document.querySelector('.cassette-play-btn');
const cassetteFastBtn = document.querySelector('.cassette-fast-btn');
// 효과음
const cassettePlaySound = document.querySelector('#playBtn');
const cassetteStopSound = document.querySelector('#stopBtn');
const cassetteRadioSound = document.querySelector('#radioSound');
const cassetteFastSound = document.querySelector('#fastSound');


// 카메라 체험관 HTML
const cameraBtn = document.querySelector('.camera-btn');
const nextPhotoBtn = document.querySelector('.next-photo-btn');
const cameraPhoto = document.querySelector('.camera-photo');
const cameraFlash = document.querySelector('.camera-flash');

// 효과음
const cameraSound = document.querySelector('#cameraSound');


// --------------------------------------TV 체험관 JS---------------------------------------------//

// 영상 목록
const videos = [
    "video/ex-tv01.mp4",
    "video/ex-tv02.mp4",
    "video/ex-tv03.mp4"
];

// 배열은 0부터 시작하므로 첫 번째 영상
let channel = 0;
// 처음 값은 false(off)
let tvOn = false;

tvOnBtn.addEventListener('click', function () {
    // tvOn은 false였으니 !가붙어서 true -> tv가 꺼져있다면 실행
    if (!tvOn) {
        //채널안에 비디오를 넣음 -> let = cnannel은 0이기때문에 첫번째 영상부터 시작함 
        video.src = videos[channel];
        //off는 하이드클래스가 붙어 사라짐
        off.classList.add('hide');
        //tv on
        tvOn = true;
        //영상 재생
        video.play();
        //tvon sound 재생
        tvOnSound.currentTime = 0;
        tvOnSound.play();
        // 버튼 글자 변경
        tvOnBtn.textContent = '티비 끄기';


        //티비가 켜져있다면 실행 
    } else {
        //영상 정지
        video.pause();
        //tvoff sound 재생
        tvOnSound.currentTime = 0;
        tvOffSound.play();
        //off 화면 다시 보여주기
        off.classList.remove('hide');
        //tv off
        tvOn = false;
        // 버튼 글자 변경
        tvOnBtn.textContent = '티비 켜기';
    }
});

// 채널 변경
changeBtn.addEventListener('click', function () {
    // 만약에 아직 티비켜기를 안눌러 영상이 아무것도 없다면 아무일도 안일어남 
    if (video.src === '') {
        return;
    }

    // ++ : channel를 숫자 1 증가시킴 
    channel++;

    // 영상은 3개이므로 length값은 3, 배열 번호는 0, 1, 2
    // 배열 번호 2에서 ++로 3이 되면 다시 0번부터 시작
    if (channel >= videos.length) {
        channel = 0;
    }

    // channel 번호와 같은 배열 번호의 영상을 video에 넣음 
    video.src = videos[channel];
    video.play();
    tvOnSound.currentTime = 0;
    tvOnSound.play();
});

// --------------------------------------카세트 플레이어 체험관 JS---------------------------------------------//
// 처음 값은 false(off)
let cassetteOn = false;

// PLAY / STOP 버튼
cassettePlayBtn.addEventListener('click', function () {
    // 카세트가 꺼져있다면 -> !가 붙기때문에 true로 바뀜 
    if (!cassetteOn) {
        // PLAY 소리 재생
        cassettePlaySound.currentTime = 0;
        cassettePlaySound.play();
        // 라디오 음악 재생
        cassetteRadioSound.play();
        // 카세트 켜기
        cassetteOn = true;
        // 버튼 글자 변경
        cassettePlayBtn.textContent = 'STOP';
        // 카세트가 켜져있다면
    } else {
        // STOP 소리 재생
        cassetteStopSound.currentTime = 0;
        cassetteStopSound.play();
        // 라디오 음악 정지
        cassetteRadioSound.pause();
        // 카세트 끄기
        cassetteOn = false;
        // 버튼 글자 변경
        cassettePlayBtn.textContent = 'PLAY';
    }
});


// 빨리감기 버튼
cassetteFastBtn.addEventListener('click', function () {
    // 카세트가 꺼져있으면 실행하지 않음
    if (!cassetteOn) {
        return;
    }
    // 라디오 음악을 5초 앞으로 이동
    cassetteRadioSound.currentTime += 5;
    // 테이프 감는 소리 재생
    cassetteFastSound.currentTime = 0;
    cassetteFastSound.play();
});

// --------------------------------------필름 카메라 체험관 JS---------------------------------------------//

const photos = [
    "img/EXPERLENCE/camera-photo01.png",
    "img/EXPERLENCE/camera-photo02.png",
    "img/EXPERLENCE/camera-photo03.png"

];

// 첫번째 사진부터 시작  
let photo = 0;

// 셔터 누르기   
cameraBtn.addEventListener('click', function () {
    console.log('PLAY 버튼 클릭됨');
    // 사진이 나와있다면 아무것도 하지 않음  
    if (cameraPhoto.classList.contains('on')) {
        return;
    }
    //이미지가 들어갈 공간에 photos가 갖고있는 photo를 넣음 -> let photo = 0; 이거 떄매 첫번째 사진부터 나옴   
    cameraPhoto.src = photos[photo];

    // 셔터 소리 재생   
    cameraSound.currentTime = 0;
    cameraSound.play();

    // 사진 보이기   
    cameraPhoto.classList.add('on');
    cameraPhoto.classList.add('change');

    // 화면 반짝임   
    cameraFlash.classList.add('on');

    // 0.2초후에 flash효과 제거  
    setTimeout(function () {
        // flash 클래스 제거   
        cameraFlash.classList.remove('on');
    }, 200);

});

// 다음사진을 클릭하면  
nextPhotoBtn.addEventListener('click', function () {
    // 사진이 아직 없다면 아무것도 하지 않음 -> !가 붙었기에 true가 됨   
    if (!cameraPhoto.classList.contains('on')) {
        return;
    }
    // 다음 사진 1증가  
    photo++;
    // 마지막 사진이면 다시 첫번째 사진으로 돌아감  
    if (photo >= photos.length) {
        photo = 0;
    }
    // flash 효과  
    cameraFlash.classList.add('on');
    cameraPhoto.classList.add('change');
    // 0.2초후에 실행될 코드  
    setTimeout(function () {
        // 사진 변경  
        cameraPhoto.src = photos[photo];
        // 기존 애니메이션 제거  
        cameraPhoto.classList.remove('change');
        // 다시 애니메이션 실행 -> 애니메이션 다시 시작하기 전에 브라우저가 현재 상태를 강제로 계산하게 해라  
        void cameraPhoto.offsetWidth;
        cameraPhoto.classList.add('change');
        // flash 클래스 제거  
        cameraFlash.classList.remove('on');
    }, 200);
});




