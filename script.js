const quoteBank = {
  happy: [
    {
      text: "When fortune opens one door, a prepared soul finds three more hidden in the walls.",
      source: "Inspired by cultivation and regression web novels"
    },
    {
      text: "A rare good day is not a pause in the journey. It is spirit stone for the road ahead.",
      source: "Inspired by dark cultivation web novels"
    },
    {
      text: "Smile while the sky is clear, then use the light to sharpen your blade.",
      source: "Inspired by martial world web novels"
    }
  ],
  sad: [
    {
      text: "Even a broken incarnation can keep reading the next page.",
      source: "Inspired by reader-system survival stories"
    },
    {
      text: "A heart that has fallen once already knows the shape of rising.",
      source: "Inspired by hunter and regression web novels"
    },
    {
      text: "The abyss is not always an ending. Sometimes it is the only place a new vow can echo clearly.",
      source: "Inspired by mystery and cultivation web novels"
    }
  ],
  angry: [
    {
      text: "Wrath is a demon that burns its owner first. Chain it, name it, and make it serve.",
      source: "Inspired by demonic sect web novels"
    },
    {
      text: "If the world hands you humiliation, refine it until it becomes leverage.",
      source: "Inspired by ruthless cultivation web novels"
    },
    {
      text: "A mad laugh is only chaos until discipline gives it a direction.",
      source: "Inspired by murim and revenge web novels"
    }
  ],
  stressed: [
    {
      text: "When every scenario collapses at once, survive the sentence in front of you.",
      source: "Inspired by scenario survival web novels"
    },
    {
      text: "The fog does not need to clear completely. Find one lantern, then the next.",
      source: "Inspired by occult mystery web novels"
    },
    {
      text: "Pressure is merely a tribulation arriving early. Breathe, endure, adapt.",
      source: "Inspired by cultivation web novels"
    }
  ],
  tired: [
    {
      text: "A weary vessel can still carry an immortal will, but even iron must leave the forge.",
      source: "Inspired by cultivation web novels"
    },
    {
      text: "Rest before the next floor. Pride is a poor healer.",
      source: "Inspired by tower and hunter web novels"
    },
    {
      text: "Sleep is not surrender. It is the quiet chamber where resolve repairs itself.",
      source: "Inspired by regression web novels"
    }
  ],
  hopeful: [
    {
      text: "If fate is a book, hope is the hand that dares to turn the page.",
      source: "Inspired by reader-system web novels"
    },
    {
      text: "A tiny flame is enough to insult an endless night.",
      source: "Inspired by gothic mystery web novels"
    },
    {
      text: "Heaven closes many paths, but ambition has always preferred windows.",
      source: "Inspired by cultivation web novels"
    }
  ],
  anxious: [
    {
      text: "Fear predicts ten thousand endings. Strategy asks which one is real.",
      source: "Inspired by mystery and survival web novels"
    },
    {
      text: "When the unseen watches, move cleanly. Panic leaves footprints.",
      source: "Inspired by occult mystery web novels"
    },
    {
      text: "The next scenario may be cruel, but you only need one correct choice at a time.",
      source: "Inspired by apocalypse web novels"
    }
  ],
  confident: [
    {
      text: "A true path does not become yours because others approve it. It becomes yours because you keep walking.",
      source: "Inspired by cultivation web novels"
    },
    {
      text: "Stand like someone who has died, returned, and learned the price of hesitation.",
      source: "Inspired by regression web novels"
    },
    {
      text: "Let the sects whisper. A sharpened will does not answer every passing rumor.",
      source: "Inspired by murim web novels"
    }
  ],
  default: [
    {
      text: "Every mood is a chapter. Some are curses, some are blessings, and all can be used.",
      source: "Inspired by web novel themes"
    },
    {
      text: "The world may write rules in blood and shadow. Your choice is still the ink it cannot fully control.",
      source: "Inspired by dark fantasy web novels"
    },
    {
      text: "A person who knows their weakness has already found the first hidden door.",
      source: "Inspired by cultivation and mystery web novels"
    }
  ]
};

const randomButton = document.querySelector("#random-button");
const overlay = document.querySelector("#flashcard-overlay");
const closeButton = document.querySelector("#close-button");
const moodLabel = document.querySelector("#mood-label");
const quoteText = document.querySelector("#quote-text");
const sourceNote = document.querySelector("#source-note");
const anotherButton = document.querySelector("#another-button");
const copyButton = document.querySelector("#copy-button");
const moodButtons = [...document.querySelectorAll(".mood-chip")];

let currentMood = "default";
let currentQuote = quoteText.textContent.trim();

function pickRandomMood() {
  const moods = Object.keys(quoteBank);
  return moods[Math.floor(Math.random() * moods.length)];
}

function pickQuote(mood) {
  const quotes = quoteBank[mood] ?? quoteBank.default;
  let nextQuote = quotes[Math.floor(Math.random() * quotes.length)];

  if (quotes.length > 1) {
    while (nextQuote.text === currentQuote) {
      nextQuote = quotes[Math.floor(Math.random() * quotes.length)];
    }
  }

  return nextQuote;
}

function openFlashcard(mood) {
  currentMood = mood;
  const nextQuote = pickQuote(mood);
  currentQuote = nextQuote.text;

  moodLabel.textContent = mood === "default" ? "Random quote" : `${mood} quote`;
  quoteText.textContent = currentQuote;
  sourceNote.textContent = nextQuote.source;
  overlay.setAttribute("aria-hidden", "false");

  moodButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.mood === mood);
  });

  closeButton.focus();
}

function closeFlashcard() {
  overlay.setAttribute("aria-hidden", "true");
  moodButtons.forEach((button) => button.classList.remove("active"));
}

randomButton.addEventListener("click", () => {
  openFlashcard(pickRandomMood());
});

moodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openFlashcard(button.dataset.mood);
  });
});

anotherButton.addEventListener("click", () => {
  openFlashcard(currentMood);
});

closeButton.addEventListener("click", closeFlashcard);

overlay.addEventListener("click", (event) => {
  if (event.target === overlay) {
    closeFlashcard();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && overlay.getAttribute("aria-hidden") === "false") {
    closeFlashcard();
  }
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
