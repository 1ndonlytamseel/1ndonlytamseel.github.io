const navbar=document.getElementById("navbar");
const menu=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav-links");
const typed=document.getElementById("typed");
const words=["Software Engineer","Data Science Enthusiast","Python Developer","Problem Solver","Future AI Engineer"];
let wi=0,ci=0,deleting=false;

function typeLoop(){
  const word=words[wi];
  typed.textContent=deleting?word.slice(0,ci--):word.slice(0,ci++);
  if(!deleting && ci>word.length){deleting=true;setTimeout(typeLoop,1300);return}
  if(deleting && ci<0){deleting=false;wi=(wi+1)%words.length;ci=0}
  setTimeout(typeLoop,deleting?45:85);
}
typeLoop();

window.addEventListener("scroll",()=>{
  navbar.classList.toggle("scrolled",window.scrollY>20);
  const sections=[...document.querySelectorAll("main section[id]")];
  const y=window.scrollY+130;
  let current="home";
  sections.forEach(s=>{if(y>=s.offsetTop)current=s.id});
  document.querySelectorAll(".nav-links a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current));
});

menu.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menu.setAttribute("aria-expanded",open);
});
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}})
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(e=>observer.observe(e));

document.getElementById("contactForm").addEventListener("submit",e=>{
  e.preventDefault();
  const form=e.currentTarget,note=document.getElementById("formNote");
  if(!form.checkValidity()){form.reportValidity();return}
  note.textContent="Thanks! The form is validated locally, but no email service/backend is configured yet.";
  note.style.color="var(--green)";
});
