const quoteBank = {
  happy: [
    "When fortune smiles, do not merely celebrate. Store the warmth as fuel for the next ascent.",
    "A bright mood is a resource. Spend it on action before the world asks for interest.",
    "Even a harsh path has clear skies. Walk while the clouds have opened."
  ],
  sad: [
    "A wounded heart can still refine resolve. Pain is bitter, but it can become medicine.",
    "Do not mistake a low valley for the end of the road. Valleys are where roots learn depth.",
    "Grief may dim your spirit today, but an ember guarded in silence can still become flame."
  ],
  angry: [
    "Rage is raw power, but raw power wastes itself. Temper it, aim it, and let your next move be deliberate.",
    "If the world provokes you, answer with strategy. A sharp mind cuts deeper than a loud outburst.",
    "Anger can reveal what you refuse to surrender. Let it guard your boundary, not govern your hand."
  ],
  stressed: [
    "A mountain is not crossed in one leap. Choose the next foothold and make it yours.",
    "When pressure surrounds you, narrow your world to one action. Momentum is built one breath at a time.",
    "Chaos is loud, but it is rarely wise. Let the noise pass and move according to your purpose."
  ],
  tired: [
    "A blade sharpened without pause will crack. Rest is not weakness; it is maintenance for future battles.",
    "Even relentless ambition needs a quiet chamber. Recover, then return with steadier steps.",
    "Running on emptiness is not discipline. Preserve the vessel that carries your will."
  ],
  hopeful: [
    "Hope is a seed buried under stone. Protect it long enough, and even stone must answer to growth.",
    "If your heart can still imagine a path, then the path has not vanished.",
    "A distant peak is not a promise, but it gives the climber a direction."
  ],
  anxious: [
    "Fear imagines a thousand traps. Wisdom checks the ground beneath the next step.",
    "Uncertainty is not always danger. Sometimes it is simply an unopened gate.",
    "Let your thoughts run ahead if they must. Your feet only need to stand in the present."
  ],
  confident: [
    "Confidence is quiet when it is real. It does not beg the room to notice its strength.",
    "Walk as one who has paid the price of practice. Your effort has earned its posture.",
    "A steady will does not need permission from the crowd."
  ],
  calm: [
    "Still water reflects the sky clearly. A still mind sees the path without distortion.",
    "Quiet is not emptiness. It is space where intention can gather.",
    "A calm heart turns ordinary moments into a hidden sanctuary."
  ],
  lonely: [
    "A solitary road is still a road. Do not confuse silence around you with absence within you.",
    "Those who walk alone learn the sound of their own resolve.",
    "Loneliness can hollow the heart, but it can also make room for a stronger self to form."
  ],
  motivated: [
    "When intent rises, act before hesitation collects a tax.",
    "A single focused hour can refine more than a day spent drifting.",
    "Use this surge with precision. Ambition without direction is only smoke."
  ],
  default: [
    "Whatever your mood, treat it as material for refinement. Nothing within you has to be wasted.",
    "The world changes by force, patience, and choice. Begin with the choice you can make now.",
    "A path is not found by staring at the horizon. It is made by the next step."
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
