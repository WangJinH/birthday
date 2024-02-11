const tips = document.getElementById("text");
const tipsBox = document.getElementsByClassName('tips');
let tipsText = '';

function tipsWord() {
  const data = new Date();
  if (hour >= 6 && hour <= 8) {
    tipsText = '早安，朱佳';
  } else if (hour >= 9 && hour <= 11) {
    tipsText = '上午好，朱佳';
  } else if (hour == 12) {
    tipsText = '中午好，朱佳';
  } else if (hour >= 13 && hour <= 18) {
    tipsText = '下午好，朱佳';
  } else if (hour >= 19 && hour <= 22) {
    tipsText = '晚上好，朱佳';
  } else if (hour >= 23 || hour <= 5) {
    tipsText = '深夜啦，还不快睡觉！！！';
  }
  tips.innerText = tipsText;
}


// // 判断页面是否是首次加载
window.addEventListener('load', function () {
  svgAutoSize();
  if (window.name === '') {
    window.name = onload;
    tipsWord();
    gsap.to(tipsBox, .6, { top: "20px", autoAlpha: 1, })
    gsap.to(tipsBox, .4, { top: '0px', autoAlpha: 0, delay: 5 })
  }
})

const loadingBox = document.querySelector('.warpper');
//  删除loading效果
document.addEventListener('DOMContentLoaded',function(){
  document.body.classList.remove( "body-active");
  loadingBox.remove();
})



// 动画加载
// 定义动画属性
const fadeIn = { x: 0, autoAlpha: 1 };
const moveUp = { y: 800, visibility: "visible", ease: 'power2.inOut' };
const yoyoConfig = { yoyo: true, repeat: -1, ease: 'power1.inOut' };
const ballonsUpdown = { y: 600, visibility: "visible", ease: 'power3.in' };
// 创建时间轴
const timeline = gsap.timeline();

// 添加动画到时间轴
timeline
  .to('.text1', .4, { ...fadeIn, ease: Power2.inout })
  .to('.text2', .5, { ...fadeIn }, "+=0.8")
  .to('.text3', .4, { ...fadeIn }, 1)
  .to('.text', .5, { ...fadeIn, ease: Power3.inout }, 1.3)
  .to('.small-text', .6, { y: 0, autoAlpha: 1 }, 1.6)
  .fromTo('.one', 1, { ...moveUp }, { y: 0 }, 0.01)
  .fromTo('.two', 1, { ...moveUp }, { y: 0 }, 0.03)
  .fromTo('.three', 1, { ...moveUp, ease: 'power4.in' }, { y: 0 }, 0.05)
  .to('.one', .9, { y: 7, ...yoyoConfig }, ">")
  .to('.two', .8, { y: 5, ...yoyoConfig }, ">")
  .to('.three', 1, { y: 3, ...yoyoConfig }, ">")
  .fromTo('.d1', 1, { ...ballonsUpdown }, { y: 0 }, 0.01)
  .fromTo('.d2', 1, { ...ballonsUpdown }, { y: 0 }, 0.03)
  .fromTo('.d3', 1, { ...ballonsUpdown }, { y: 0 }, 0.04)
  .fromTo('.d4', 1, { ...ballonsUpdown }, { y: 0 }, 0.06)
  .fromTo('.d5', 1, { ...ballonsUpdown }, { y: 0 }, 0.07)
  .fromTo('.d6', 1, { ...ballonsUpdown }, { y: 0 }, 0.09)
  .to(['.d1', '.d2', '.d3', '.d4', '.d5', '.d6'], { duration: 1, x: (i) => i % 2 !== 0 ? [3, 5, 4][Math.floor(i / 2)] : 0, y: (i) => i % 2 === 0 ? [7, 2, 6][Math.floor(i / 2)] : 0, yoyo: true, ease: 'power1.inOut', repeat: -1 }, ">");


ScrollTrigger.create({
  trigger: '.wrap',
  start: 'top top',
  end: '+=600',
  scrub: true,
  onLeave: () => { timeline.pause() },
  onEnterBack: () => { timeline.resume() },
  animation:
    gsap.timeline().fromTo('.one', 0.7, { top: 0 }, { top: "-100px" }, 0.01)
      .fromTo('.two', 0.7, { top: 0 }, { top: "-100px" }, 0.04)
      .fromTo('.three', 0.7, { top: 0 }, { top: "-100px" }, 0.06)
      .fromTo('.d1', 1, { top: 0 }, { top: "-300px" }, 0.09)
      .fromTo('.d2', 1, { top: 0 }, { top: "-300px" }, 0.2)
      .fromTo('.d3', 1, { top: 0 }, { top: "-300px" }, 0.4)
      .fromTo('.d4', 1, { top: 0 }, { top: "-300px" }, 0.6)
      .fromTo('.d5', 1, { top: 0 }, { top: "-300px" }, 0.9)
      .fromTo('.d6', 1, { top: 0 }, { top: "-300px" }, 0.96),
  toggleAction: 'play pause resume none'
})

const animationTimeline = () => {
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span`;

}

animationTimeline();

const wordsvg = document.querySelector('#wordsvg');

// 获取每个子路径的总长度
const pathLengths = Array.from(wordsvg.querySelectorAll("path")).map(path => path.getTotalLength());

// 设置初始值
wordsvg.querySelectorAll("path").forEach((path, index) => {
  path.style.strokeDasharray = pathLengths[index];
  path.style.strokeDashoffset = pathLengths[index];
});

const timelines = new TimelineMax();

// 设置路径动画
wordsvg.querySelectorAll("path").forEach((path, index) => {
  timelines.to(path, {
    duration: 0.5, // 动画持续时间
    strokeDashoffset: 0, // 将stroke-dashoffset逐渐变为0
    ease: "power2.inOut", // 缓动函数，你可以根据需要调整
    delay: 0.1 * index, // 逐渐增加的延迟时间
    onUpdate: () => {
      path.style.strokeDasharray = `${pathLengths[index]} ${pathLengths[index]}`;
    }
  });
});

// 初始化时暂停timeline动画
timelines.pause();

const otherAnimations = gsap.timeline({ paused: true });

// 设置其他动画
otherAnimations
  .staggerFromTo(".baloons img", 2.5, { visibility: 'visible', y: 1400 }, { y: -1000 }, 0.2)
  .staggerTo(".eight svg", 1.5,
    {
      visibility: "visible",
      opacity: 0,
      scale: 80,
      repeat: 3,
      repeatDelay: 1.4,
      onStart: () => {
        timelines.play();
      },
    }, 0.3)
  .staggerTo('.person', 1.3, { opacity: 1, rotation: 0 })
  .staggerFrom(".wish-hbd span", 0.7, { opacity: 0, y: -50, rotation: 150, skewX: "30deg", ease: Elastic.easeOut.config(1, 0.5) }, 0.1)
  .staggerFromTo(".wish-hbd span", 0.7, { scale: 1.4, rotationY: 150 }, { scale: 1, rotationY: 0, color: "#ff69b4", ease: Expo.easeOut }, 0.1, "party")
  .from(".wish h5", 0.5, { opacity: 0, y: 10, skewX: "-15deg" }, "party")
  .call(() => {
    doNextStep();
  });

function doNextStep() {
  ScrollTrigger.create({
    trigger: '.container',
    start: 'top top',
    end: '+=300',
    scrub: true,
    pin: true,
    animation:
      gsap.timeline().to('.word', 1.2, { skewX: 10, rotationX: 10 })
        .to('.person', 1.3, { scale: 1.1 }, '<')
        .to('.hat', {
          duration: 2,
          rotation: -30,
          autoAlpha: 1,
          ease: "power1.inOut"
        }, '<')
  })
}


const p1 = ScrollTrigger.create({
  trigger: '.container',
  start: 'top-=300px',
  end: '+=700',
  onEnter: () => { otherAnimations.play(); }
});

// 小熊jiojio点击事件
const btn = document.querySelector('.button');
const black = document.querySelector('.black');
const videoBox = document.querySelector('.video-box');
const video = document.querySelector('video');
var music = document.querySelector("audio");
const wrap = document.querySelector(".wrap");

btn.onclick = () => {
  videoBox.classList.add('video-show');
  black.classList.add('active');
  video.play();
  music.pause();
}

black.onclick = () => {
  videoBox.classList.remove('video-show');
  black.classList.remove('active');
  video.pause();
  music.play();
}
wrap.addEventListener('touchstart',()=>{
  music.play();
})



// svg自适应
function svgAutoSize() {
  var svg = document.querySelector('#wordsvg');
  var windowWidth = window.innerWidth || document.documentElement.clientWidth;
  if (windowWidth < 400) {
    svg.setAttribute('viewBox', '-80 -100 1000 800');
  } else if (windowWidth > 400 && windowWidth <= 768) {
    svg.setAttribute('viewBox', '-100 -70 1000 600');
  } else if (windowWidth > 768 && windowWidth <= 1024) {
    svg.setAttribute('viewBox', '0 -100 800 700');
  } else if (windowWidth > 1024 && windowWidth <= 1200) {
    svg.setAttribute('viewBox', '100 20 600 500');
  }
}

// 让svg自适应屏幕大小
window.addEventListener('resize', () => {
  svgAutoSize();
})