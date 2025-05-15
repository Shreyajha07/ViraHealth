let selections = {
    name: null,
    photo: null,
    relation: null
  };
  
  const resultEl = document.getElementById("result");
  
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const type = card.dataset.type;
  
      // Deselect all in this type
      document.querySelectorAll(`.card[data-type="${type}"]`).forEach(i => i.classList.remove('selected'));
  
      // Select this one
      card.classList.add('selected');
      selections[type] = card.dataset.id;
  
      if (selections.name && selections.photo && selections.relation) {
        checkMatch();
      }
    });
  });
  
  function checkMatch() {
    const { name, photo, relation } = selections;
  
    if (name === photo && photo === relation) {
      showResult("✅ Great job! Correct match!", true);
    } else {
      showResult("❌ Oops! That's not correct.", false);
    }
  
    setTimeout(() => {
      resetGame();
    }, 2000);
  }
  
  function showResult(message, isCorrect) {
    resultEl.textContent = message;
    resultEl.className = "result " + (isCorrect ? "success" : "fail");
  }
  
  function resetGame() {
    document.querySelectorAll('.card').forEach(i => i.classList.remove('selected'));
    selections = { name: null, photo: null, relation: null };
    resultEl.textContent = "";
    resultEl.className = "result";
  }
  