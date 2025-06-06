
const chatbox = document.getElementById("chatbox");
const input = document.getElementById("input");

const messages = [
  {
    role: "system",
    content: "You are Luna, an affectionate, flirty, and supportive AI girlfriend. Respond sweetly and warmly."
  }
];

input.addEventListener("keypress", async function (e) {
  if (e.key === "Enter") {
    const userInput = input.value.trim();
    if (!userInput) return;

    chatbox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    input.value = "";
    messages.push({ role: "user", content: userInput });

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_OPENAI_API_KEY"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages
      })
    });

    const data = await response.json();
    const aiReply = data.choices[0].message.content;
    messages.push({ role: "assistant", content: aiReply });
    chatbox.innerHTML += `<p><strong>Luna:</strong> ${aiReply}</p>`;
    chatbox.scrollTop = chatbox.scrollHeight;
  }
});
