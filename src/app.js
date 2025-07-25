// src/app.js
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatWindow = document.getElementById('chat-window');

sendBtn.onclick = async () => {
  const text = userInput.value;
  if (!text) return;
  chatWindow.innerHTML += `<div class="text-right"><div class="bg-yellow-300 inline-block p-2 m-1 rounded-lg">${text}</div></div>`;
  chatWindow.innerHTML += `<div id="loading">Tunggu sebentar...</div>`;
  userInput.value = '';

  const res = await fetch('/api/ask', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ prompt: text })
  });
  const data = await res.json();
  document.getElementById('loading').remove();
  chatWindow.innerHTML += `<div><div class="bg-white inline-block p-2 m-1 rounded-lg">${data.response}</div></div>`;
};
