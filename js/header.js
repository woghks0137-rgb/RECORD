const menuBtn = document.querySelector('.m-menu');
const gnb = document.querySelector('.header-gnb');

menuBtn.addEventListener('click', function () {
    /* gnb안에 on 클래스가 있다면 */
    if (gnb.classList.contains('on')) {
        gnb.style.opacity = '0';
        gnb.style.transform = 'translateY(-10px)';

        /* 일정 시간 기달렸다가 실행 */
        setTimeout(() => {
            /* on 클래스 제거 */
            gnb.classList.remove('on');
            /* 원래 스타일 초기화 */
            gnb.style.opacity = '';
            gnb.style.transform = '';
        }, 300);

        /* on이 없다면 */
    } else {
        /* on 추가 */
        gnb.classList.add('on');

        gnb.style.opacity = '0';
        gnb.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            gnb.style.opacity = '1';
            gnb.style.transform = 'translateY(0)';
        }, 10);
    }
});