function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();
  
    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript.toLowerCase();
      document.getElementById("user-query").innerText = "You said: " + transcript;
      respond(transcript);
    };
  
    recognition.onerror = function () {
      document.getElementById("assistant-response").innerText = "Sorry, I didn't understand that. Please try again.";
    };
  }
  
  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }
  
  function respond(query) {
    let response = "";
  
    // Personal Identity
    if (query.includes("my name")) {
      response = "Your name is John.";
    } else if (query.includes("how old am i")) {
      response = "You are 72 years old.";
    } else if (query.includes("where do i live")) {
      response = "You live in Hyderabad.";
    } else if (query.includes("when is my birthday")) {
      response = "Your birthday is on March 5th.";
    } else if (query.includes("what is my phone number")) {
      response = "Your phone number is 9876543210.";
    
    // Family & Relationships
    } else if (query.includes("who is my daughter")) {
      response = "Your daughter’s name is Emily.";
    } else if (query.includes("who is my son")) {
      response = "Your son's name is Rahul.";
    } else if (query.includes("who is my wife")) {
      response = "Your wife's name is Sarah.";
    } else if (query.includes("who is my husband")) {
      response = "Your husband's name is David.";
    } else if (query.includes("do i have grandchildren")) {
      response = "Yes, you have two lovely grandchildren.";
    } else if (query.includes("who is my best friend")) {
      response = "Your best friend is Ravi from college.";
  
    // Time & Date
    } else if (query.includes("what day is it") || query.includes("what day is today")) {
      const today = new Date();
      response = `Today is ${today.toLocaleDateString('en-US', { weekday: 'long' })}`;
    } else if (query.includes("what is the date today")) {
      const today = new Date();
      response = `Today is ${today.toDateString()}`;
    } else if (query.includes("what time is it")) {
      const now = new Date();
      response = `It is ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  
    // Daily Routine
    else if (query.includes("did i eat")) {
      response = "Yes, you had lunch about an hour ago.";
    } else if (query.includes("did i take medicine")) {
      response = "Yes, your morning medicine was taken.";
    } else if (query.includes("what do i do now")) {
      response = "You can listen to music or take a short walk.";
    } else if (query.includes("what is my schedule")) {
      response = "You have a walk at 5 PM and dinner at 7 PM.";
  
    // Favorites
    } else if (query.includes("what is my favorite food")) {
      response = "Your favorite food is pulao.";
    } else if (query.includes("what is my favorite movie")) {
      response = "Your favorite movie is The Sound of Music.";
    } else if (query.includes("what is my favorite song")) {
      response = "Your favorite song is Imagine by John Lennon.";
    } else if (query.includes("what is my favorite color")) {
      response = "Your favorite color is blue.";
    }
  
    // General Support
    else if (query.includes("who are you")) {
      response = "I’m your memory assistant. I'm here to help you remember things.";
    } else if (query.includes("thank you")) {
      response = "You’re welcome! I'm always here to help.";
    } else if (query.includes("how are you")) {
      response = "I'm doing great! Thank you for asking.";
    } else if (query.includes("how am i")) {
      response = "You're doing just fine today.";
    } else if (query.includes("am i safe")) {
      response = "Yes, you are safe and surrounded by people who care about you.";
    } else if (query.includes("am i loved")) {
      response = "Absolutely, you are very much loved by your family and friends.";
  
    // Orientation Help
    } else if (query.includes("where am i")) {
      response = "You are at your home in Hyderabad.";
    } else if (query.includes("what year is it")) {
      const year = new Date().getFullYear();
      response = `It's the year ${year}.`;
    } else if (query.includes("what month is it")) {
      const month = new Date().toLocaleString('default', { month: 'long' });
      response = `It's the month of ${month}.`;
    } else if (query.includes("is it morning") || query.includes("is it evening")) {
      const hour = new Date().getHours();
      if (hour < 12) response = "It is morning.";
      else if (hour < 18) response = "It is afternoon.";
      else response = "It is evening.";
    }
  
    // Fallback
    else {
      response = "I'm here to help you remember important things. You can ask me about your family, time, or favorites.";
    }

    document.getElementById("assistant-response").innerText = response;
    speak(response);
  }