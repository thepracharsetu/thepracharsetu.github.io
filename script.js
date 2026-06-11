```javascript id="tprjs01"
/* =========================
   THE PRACHAR SETU
   PREMIUM SCRIPT.JS
========================= */

// Smooth Reveal Animation

const revealElements = document.querySelectorAll(
".service-card, .stat-card, .why-card, .review-card, .portfolio-grid img"
);

const revealObserver = new IntersectionObserver(

(entries) => {

entries.forEach((entry) => {

if(entry.isIntersecting){

entry.target.style.opacity = "1";
entry.target.style.transform = "translateY(0)";

}

});

},

{
threshold:0.15
}

);

revealElements.forEach((element) => {

element.style.opacity = "0";

element.style.transform = "translateY(40px)";

element.style.transition =
"all 0.8s ease";

revealObserver.observe(element);

});


// Animated Counter

const counters =
document.querySelectorAll(".stat-card h2");

const runCounter = (counter) => {

const text = counter.innerText;

const target =
parseInt(text.replace(/\D/g,""));

if(!target) return;

let count = 0;

const speed =
Math.max(10, target / 60);

const updateCounter = () => {

if(count < target){

count += speed;

counter.innerText =
Math.floor(count) + "+";

requestAnimationFrame(updateCounter);

}else{

counter.innerText = text;

}

};

updateCounter();

};

const counterObserver =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

runCounter(
entry.target
);

counterObserver.unobserve(
entry.target
);

}

});

},

{
threshold:0.5
}

);

counters.forEach(counter=>{

counterObserver.observe(counter);

});


// Navbar Background Effect

window.addEventListener(
"scroll",
() => {

const navbar =
document.querySelector(".navbar");

if(window.scrollY > 50){

navbar.style.background =
"rgba(4,17,51,0.95)";

}else{

navbar.style.background =
"rgba(0,0,0,.15)";

}

}
);


// Service Card Hover Glow

const cards =
document.querySelectorAll(
".service-card"
);

cards.forEach(card=>{

card.addEventListener(
"mousemove",
(e)=>{

const rect =
card.getBoundingClientRect();

const x =
e.clientX - rect.left;

const y =
e.clientY - rect.top;

card.style.background =
`radial-gradient(circle at ${x}px ${y}px,
rgba(245,197,66,.18),
rgba(255,255,255,.08))`;

}
);

card.addEventListener(
"mouseleave",
()=>{

card.style.background =
"rgba(255,255,255,.08)";

}
);

});


// Smooth Anchor Scroll

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

anchor.addEventListener(
"click",
function(e){

e.preventDefault();

const target =
document.querySelector(
this.getAttribute("href")
);

if(target){

target.scrollIntoView({
behavior:"smooth"
});

}

}
);

});


// Portfolio Click Effect

const portfolioImages =
document.querySelectorAll(
".portfolio-grid img"
);

portfolioImages.forEach(img=>{

img.addEventListener(
"click",
()=>{

img.style.transform =
"scale(1.08)";

setTimeout(()=>{

img.style.transform =
"scale(1)";

},300);

}
);

});


// Console Signature

console.log(
"The Prachar Setu Website Loaded Successfully"
);
```
