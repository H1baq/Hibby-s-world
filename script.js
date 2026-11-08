// Spill the Tea & Read — small interactions

// Nav: switch to light style once past the hero + mobile toggle
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const hero = document.querySelector(".hero");

const onScroll = () => {
  nav.classList.toggle("is-scrolled", window.scrollY > hero.offsetHeight - 80);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const closeMenu = () => {
  navLinks.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.textContent = "Menu";
};
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", open);
  navToggle.textContent = open ? "Close" : "Menu";
});
navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("is-in");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Teapot discussion prompts
const prompts = [
  "Which letter would you have framed if it had been written to you?",
  "Is Kafka romantic, or just really, really anxious? Can it be both?",
  "We only hear his side. What do you imagine Milena was writing back?",
  "Which line did you underline twice?",
  "Does distance make their love stronger, or is it the only way it could exist?",
  "Kafka talks a lot about fear. What do you think he was most afraid of?",
  "Would this love story have survived if they'd lived in the same city?",
  "Is it okay that we're reading letters that were never meant for us?",
  "Pick one word for how this book made you feel.",
  "If you wrote one letter back to Kafka, what would the first sentence be?",
];
let current = 0;
const teapot = document.getElementById("teapot");
const prompt = document.querySelector(".prompt");
const promptText = document.getElementById("promptText");
const promptNum = document.getElementById("promptNum");

teapot.addEventListener("click", () => {
  let next;
  do { next = Math.floor(Math.random() * prompts.length); } while (next === current);
  current = next;
  teapot.classList.add("is-pouring");
  prompt.classList.add("is-swapping");
  setTimeout(() => {
    promptText.textContent = prompts[current];
    promptNum.textContent = String(current + 1).padStart(2, "0");
    prompt.classList.remove("is-swapping");
    teapot.classList.remove("is-pouring");
  }, 380);
});
