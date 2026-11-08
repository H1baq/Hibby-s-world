// Spill the Tea & Read — small interactions

// Header: solid once past the hero
const nav = document.getElementById("nav");
const hero = document.querySelector(".hero");
const onScroll = () => {
  nav.classList.toggle("is-scrolled", window.scrollY > hero.offsetHeight - 70);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobile menu
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

const setMenu = (open) => {
  nav.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
};
burger.addEventListener("click", (e) => {
  e.stopPropagation();
  setMenu(!nav.classList.contains("is-open"));
});
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("click", (e) => {
  if (nav.classList.contains("is-open") && !menu.contains(e.target)) setMenu(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("is-open")) {
    setMenu(false);
    burger.focus();
  }
});

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
const card = document.querySelector(".index__card");
const promptText = document.getElementById("promptText");
const promptNum = document.getElementById("promptNum");

teapot.addEventListener("click", () => {
  let next;
  do { next = Math.floor(Math.random() * prompts.length); } while (next === current);
  current = next;
  teapot.classList.add("is-pouring");
  card.classList.add("is-swapping");
  setTimeout(() => {
    promptText.textContent = prompts[current];
    promptNum.textContent = "q. " + String(current + 1).padStart(2, "0");
    card.classList.remove("is-swapping");
    teapot.classList.remove("is-pouring");
  }, 380);
});
