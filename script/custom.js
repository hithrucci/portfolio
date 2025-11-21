//---------------------------------------------
// header
//---------------------------------------------
const header = document.querySelector("header");
let lastScrollY = window.scrollY;
const threshold = 5;
window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  if (Math.abs(currentScroll - lastScrollY) < threshold) return;
  if (currentScroll > lastScrollY && currentScroll > header.offsetHeight) {
    header.classList.add("hide");
  } else {
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

//---------------------------------------------
// wroks 스크롤트리거
//---------------------------------------------

const works = document.querySelector("#works");
const worksTitle = works.querySelector(".sectionTitle");
const overView = works.querySelector(".projectOverview");
const worksText = works.querySelector(".text h3");
const guide = works.querySelector(".guideLine");
const length = guide.getTotalLength();
const projects = works.querySelector(".projects");
const numList = projects.querySelector("li:nth-child(1)");
const weatherList = projects.querySelector("li:nth-child(2)");
const dreamList = projects.querySelector("li:nth-child(3)");
const todoList = projects.querySelector("li:nth-child(4)");

gsap.registerPlugin(ScrollTrigger);
gsap.set(guide, {
  strokeDasharray: length,
  strokeDashoffset: length,
});

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: works,
    start: "top top",
    end: "+=3000px top",
    scrub: 1,
    pin: true,
    // markers: true,
    duration: 100,
  },
});
tl.fromTo(
  ".flowText",
  { y: 300, width: "90%" },
  { width: "80%", y: -515, x: 150 }
)
  .fromTo(
    guide,
    { opacity: 0 },
    {
      strokeDashoffset: "0",
      opacity: 1,
    },
    0.2
  )
  .to(
    worksText,
    {
      "-webkit-text-stroke": "1px #F99E1B",
      duration: 2,
    },
    0.4
  )
  .fromTo(
    numList,
    { opacity: 0 },
    { opacity: 1, x: -400, y: -300, rotation: -30 },
    0.6
  )
  .fromTo(
    weatherList,
    { opacity: 0 },
    {
      opacity: 1,
      x: 400,
      y: -280,
      rotation: 35,
    },
    0.8
  )
  .fromTo(
    dreamList,
    { opacity: 0 },
    {
      opacity: 1,

      x: 360,
      y: 150,
      rotation: 26,
    },
    1
  )
  .fromTo(
    todoList,
    { opacity: 0 },
    {
      opacity: 1,
      x: -380,
      y: 150,
      rotation: 26,
    },
    1.2
  )
  .add(startFloating, 1.3)

  .to(
    worksText,
    {
      opacity: 0,
    },
    2.5
  )
  .to(guide, { opacity: 0 }, 2.5);

//---------------------------------------------
// startFloating
//---------------------------------------------
const listItems = gsap.utils.toArray("#works .projectOverview .lists li");
const linkSvg = document.querySelector("#works .projectOverview .link-svg");
const linkLine = linkSvg.querySelector(".link-line");

function updateLinkLine() {
  const baseRect = projects.getBoundingClientRect();
  const points = listItems
    .map((li) => {
      const r = li.getBoundingClientRect();
      const x = r.left + r.width / 2 - baseRect.left;
      const y = r.top + r.height / 2 - baseRect.top;
      return `${x},${y}`;
    })
    .join(" ");
  linkLine.setAttribute("points", points);
}

function startFloating() {
  listItems.forEach((li) => {
    gsap.to(li, {
      x: "+=" + gsap.utils.random(-300, 300),
      y: "+=" + gsap.utils.random(-300, 300),
      duration: gsap.utils.random(4, 7),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      onUpdate: updateLinkLine,
    });
  });
  updateLinkLine();
}

//---------------------------------------------
// projectDetail
//---------------------------------------------
const projectDetail = document.querySelector(".projectDetail");
const numberGame = projectDetail.querySelector(".numberGame");
console.log(numberGame);
gsap.fromTo(
  numberGame,
  {
    opacity: 0,
    transform: "rotateX(10deg)",

    y: 50,
  },
  {
    opacity: 1,
    transform: "rotateX(0deg)",
    y: 0,
    duration: 1,
    scrollTrigger: {
      trigger: numberGame,
      start: "3000px 50%",
      end: "bottom bottom",
      markers: true,
      scrub: 3,
    },
  }
);
