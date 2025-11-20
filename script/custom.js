const header = document.querySelector("header");
let lastScrollY = window.scrollY;
const threshold = 5; // 이 정도 차이는 무시 (너무 민감하지 않게)

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  // 스크롤 변화가 너무 작으면 무시
  if (Math.abs(currentScroll - lastScrollY) < threshold) return;

  // 아래로 스크롤 + 어느 정도는 내려간 상태일 때 → 헤더 숨김
  if (currentScroll > lastScrollY && currentScroll > header.offsetHeight) {
    header.classList.add("hide");
  } else {
    // 위로 스크롤하면 다시 보여줌
    header.classList.remove("hide");
  }

  lastScrollY = currentScroll;
});

let contact = document.querySelector(".gnb li:last-child");

contact.addEventListener("mouseenter", () => {
  contact.classList.add("on");
});
contact.addEventListener("mouseleave", () => {
  contact.classList.remove("on");
});
