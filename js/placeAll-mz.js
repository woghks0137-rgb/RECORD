const modalButtons = document.querySelectorAll(".button[data-modal]");
const modals = document.querySelectorAll(".place-modal");
const closeButtons = document.querySelectorAll(".modal-close");


// =========================
// 자세히보기 버튼
// =========================

modalButtons.forEach(button => {

    button.addEventListener("click", function (e) {

        // 모바일에서만 모달 열기
        if (window.innerWidth <= 768) {

            e.preventDefault();

            const modalId = this.dataset.modal;
            const modal = document.getElementById(modalId);

            if (modal) {
                modal.classList.add("active");
            }

        }

    });

});


// =========================
// X 버튼으로 닫기
// =========================

closeButtons.forEach(button => {

    button.addEventListener("click", function () {

        const modal = this.closest(".place-modal");

        if (modal) {
            modal.classList.remove("active");
        }

    });

});


// =========================
// 모달 바깥쪽 클릭하면 닫기
// =========================

modals.forEach(modal => {

    modal.addEventListener("click", function (e) {

        // 검은 배경 부분을 클릭했을 때만
        if (e.target === modal) {
            modal.classList.remove("active");
        }

    });

});


// =========================
// ESC 누르면 모달 닫기
// =========================

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        modals.forEach(modal => {
            modal.classList.remove("active");
        });

    }

});