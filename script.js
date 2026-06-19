const quoteBank = {
  happy: [
    "Let this good moment stretch its legs. You earned the light it is bringing.",
    "Joy is not a distraction from life. Sometimes it is life telling you that you are in the right room.",
    "Carry this feeling gently. Good days count too."
  ],
  sad: [
    "Soft days still move forward. Be kind to the part of you that is carrying more than usual.",
    "You do not have to bloom on command. Rest is also part of becoming.",
    "A low moment is not a final answer. It is a weather report."
  ],
  angry: [
    "Your fire is information. Let it point you toward what matters without letting it drive the whole car.",
    "Pause long enough to choose your next move. Power grows when it has direction.",
    "Anger can protect a boundary. Wisdom decides how to build the gate."
  ],
  stressed: [
    "One breath, one task, one next step. The whole mountain does not need to move at once.",
    "You are allowed to lower the volume of the day and handle only what is truly next.",
    "Pressure is loud, but it is not always correct. Return to the small thing you can do now."
  ],
  tired: [
    "Rest is not falling behind. It is how you return with your whole self.",
    "Even the brightest minds need a dimmer switch. Let yourself power down.",
    "You do not need to prove your worth by running on empty."
  ],
  hopeful: [
    "Hope is a small lamp, not a guarantee. Still, it helps you see the next step.",
    "Something in you still believes in tomorrow. That is a strong and beautiful signal.",
    "Keep tending the possibility. Quiet faith has changed entire lives."
  ],
  anxious: [
    "Your thoughts may be sprinting, but you can walk. Come back to the ground under you.",
    "Uncertainty does not mean danger. It means the next page has not been written yet.",
    "Name one real thing in front of you. Let the present have a voice too."
  ],
  confident: [
    "Stand in what you know. You have practiced for more moments than you remember.",
    "Confidence is not noise. It is trust with its shoulders relaxed.",
    "Walk in like your effort belongs there, because it does."
  ],
  calm: [
    "Peace does not need to announce itself. It can simply sit beside you and stay.",
    "Let the quiet be enough for now.",
    "A steady heart can make even an ordinary hour feel spacious."
  ],
  lonely: [
    "Being alone right now does not mean you are unloved. Connection can still find its way back in.",
    "You are still part of the world, even on the days it feels far away.",
    "Reach for one small thread of contact. Small warmth is still warmth."
  ],
  motivated: [
    "Start while the spark is here. Momentum loves a doorway.",
    "You do not need the whole path to begin. Begin, and the path gets more specific.",
    "Use this energy with care. A focused hour can change the shape of a week."
  ],
  default: [
    "However you arrive today, start with honesty and one gentle next step.",
    "Your mood is a message, not a verdict. Listen, then choose with care.",
    "Meet yourself where you are, then move one inch toward where you want to be."
  ]
};

const moodAliases = {
  glad: "happy",
  joyful: "happy",
  excited: "happy",
  down: "sad",
  upset: "sad",
  mad: "angry",
  annoyed: "angry",
  overwhelmed: "stressed",
  busy: "stressed",
  exhausted: "tired",
  sleepy: "tired",
  optimistic: "hopeful",
  nervous: "anxious",
  worried: "anxious",
  brave: "confident",
  strong: "confident",
  peaceful: "calm",
  relaxed: "calm",
  alone: "lonely",
  isolated: "lonely",
  inspired: "motivated",
  focused: "motivated"
};

const form = document.querySelector("#mood-form");
const input = document.querySelector("#mood-input");
const moodLabel = document.querySelector("#mood-label");
const quoteText = document.querySelector("#quote-text");
const anotherButton = document.querySelector("#another-button");
const copyButton = document.querySelector("#copy-button");
const moodButtons = [...document.querySelectorAll(".mood-chip")];

let currentMood = "default";
let currentQuote = quoteText.textContent.trim();

function normalizeMood(value) {
  const cleaned = value.trim().toLowerCase();
  if (!cleaned) return "default";
  if (quoteBank[cleaned]) return cleaned;

  const words = cleaned.split(/[^a-z]+/).filter(Boolean);
  const directMatch = words.find((word) => quoteBank[word]);
  if (directMatch) return directMatch;

  const aliasMatch = words.find((word) => moodAliases[word]);
  return aliasMatch ? moodAliases[aliasMatch] : "default";
}

function pickQuote(mood) {
  const quotes = quoteBank[mood] ?? quoteBank.default;
  let nextQuote = quotes[Math.floor(Math.random() * quotes.length)];

  if (quotes.length > 1) {
    while (nextQuote === currentQuote) {
      nextQuote = quotes[Math.floor(Math.random() * quotes.length)];
    }
  }

  return nextQuote;
}

function renderQuote(mood) {
  currentMood = mood;
  currentQuote = pickQuote(mood);
  const label = mood === "default" ? "A quote for right now" : `${mood} quote`;

  moodLabel.textContent = label;
  quoteText.textContent = currentQuote;

  moodButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.mood === mood);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderQuote(normalizeMood(input.value));
});

moodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    input.value = button.dataset.mood;
    renderQuote(button.dataset.mood);
  });
});

anotherButton.addEventListener("click", () => {
  renderQuote(currentMood);
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(currentQuote);
    copyButton.textContent = "Copied";
    setTimeout(() => {
      copyButton.textContent = "Copy";
    }, 1200);
  } catch {
    copyButton.textContent = "Select quote";
    setTimeout(() => {
      copyButton.textContent = "Copy";
    }, 1200);
  }
});
