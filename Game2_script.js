const patterns = [
    {
      sequence: ["🍎", "🍌", "🍎", "🍌", "?"],
      answer: "🍎",
      choices: ["🍌", "🍇", "🍎"]
    },
    {
      sequence: ["🐶", "🐱", "🐶", "🐱", "?"],
      answer: "🐶",
      choices: ["🐶", "🐭", "🐱"]
    },
    {
      sequence: ["🎩", "👓", "🎩", "👓", "?"],
      answer: "🎩",
      choices: ["🎓", "🎩", "👓"]
    },
    {
      sequence: ["☀", "🌙", "☀", "🌙", "?"],
      answer: "☀",
      choices: ["🌧", "🌙", "☀"]
    },
    {
      sequence: ["🚗", "🚕", "🚗", "🚕", "?"],
      answer: "🚗",
      choices: ["🚌", "🚕", "🚗"]
    }
  ];
  
  let currentIndex = 0;
  
  function showPattern() {
    const pattern = patterns[currentIndex];
    const patternBox = document.getElementById("pattern");
    patternBox.innerHTML = "";
  
    pattern.sequence.forEach(item => {
      const span = document.createElement("span");
      span.textContent = item;
      patternBox.appendChild(span);
    });
  
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
  
    pattern.choices.forEach(choice => {
      const btn = document.createElement("div");
      btn.className = "option";
      btn.textContent = choice;
      btn.onclick = () => checkAnswer(choice);
      optionsDiv.appendChild(btn);
    });
  
    document.getElementById("result").textContent = "";
  }
  
  function checkAnswer(selected) {
    const correct = patterns[currentIndex].answer;
    const result = document.getElementById("result");
  
    if (selected === correct) {
      result.textContent = "✅ Correct!";
      result.style.color = "green";
      speak("Great job! That's correct.");
    } else {
      result.textContent = `❌ Oops! Correct answer: ${correct}`;
      result.style.color = "red";
      speak(`Oops! The correct answer is ${correct}`);
    }
  }
  
  function nextPattern() {
    currentIndex = (currentIndex + 1) % patterns.length;
    showPattern();
  }
  
  // Voice feedback
  function speak(message) {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(message);
    synth.speak(utter);
  }
  
  // Dark mode toggle
  document.getElementById("darkModeToggle").addEventListener("change", function () {
    document.body.classList.toggle("dark", this.checked);
  });
  
  // Load first pattern
  showPattern();