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

const works = document.querySelector("#works");
const worksText = works.querySelector(".text h3");
const worksTitle = works.querySelector("h3");
const guide = works.querySelector(".guideLine");
const length = guide.getTotalLength();
const projects = works.querySelector(".projects");
const numList = projects.querySelector("li:nth-child(1)");
const weatherList = projects.querySelector("li:nth-child(2)");
const dreamList = projects.querySelector("li:nth-child(3)");
const todoList = projects.querySelector("li:nth-child(4)");

const floatItems = gsap.utils.toArray(
  "#works .projectOverview .lists li .itemInner"
);
const linkSvg = document.querySelector("#works .projectOverview .link-svg");
const linkLine = linkSvg.querySelector(".link-line");

gsap.registerPlugin(ScrollTrigger);
gsap.set(guide, {
  strokeDasharray: length,
  strokeDashoffset: length,
});

function updateLinkLine() {
  if (!projects || !floatItems.length) return;
  const baseRect = projects.getBoundingClientRect();

  const pointsArr = floatItems.map((inner) => {
    const r = inner.getBoundingClientRect();
    const x = r.left + r.width / 2 - baseRect.left;
    const y = r.top + r.height / 2 - baseRect.top;
    return `${x},${y}`;
  });

  if (pointsArr.length > 0) {
    pointsArr.push(pointsArr[0]);
  }

  linkLine.setAttribute("points", pointsArr.join(" "));
}

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: works,
    start: "top top",
    end: "+=3000px top",
    scrub: 1,
    pin: true,
    onUpdate: updateLinkLine,
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

  .fromTo(
    numList,
    { opacity: 0 },
    {
      opacity: 1,
      x: -400,
      y: -350,
      rotation: -30,
    },
    0.6
  )
  .fromTo(
    weatherList,
    { opacity: 0 },
    {
      opacity: 1,
      x: 400,
      y: -300,
      rotation: 35,
    },
    0.8
  )
  .fromTo(
    dreamList,
    { opacity: 0 },
    {
      opacity: 1,
      x: 420,
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
      x: -440,
      y: 150,
      rotation: 26,
    },
    1.2
  )
  .add(startFloating, 0);

updateLinkLine();
window.addEventListener("resize", updateLinkLine);
gsap.ticker.add(updateLinkLine);

function startFloating() {
  floatItems.forEach((inner) => {
    gsap.to(inner, {
      x: "+=" + gsap.utils.random(-60, 60),
      y: "+=" + gsap.utils.random(-40, 40),
      duration: gsap.utils.random(3, 5),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });
}

const projectDetail = document.querySelector(".projectDetail");
const numberGame = projectDetail.querySelector(".numberGame");

gsap.fromTo(
  numberGame,
  {
    opacity: 0,
    transform: "rotateX(10deg)",
    y: 100,
  },
  {
    opacity: 1,
    transform: "rotateX(0deg)",
    y: 0,
    duration: 1,
    scrollTrigger: {
      trigger: numberGame,
      start: "3000px 60%",
      end: "3000px 60%",
      markers: true,
      scrub: 3,
    },
  }
);
