function Chat() {
  const email = history.state ? history.state.email : false;

  if (!email) {
    this.redirect("/login");
  } else {
    root.innerHTML = `<input type="text" placeholder="Message..." id="message" />
      <input type="text" placeholder="Name" id="name" />
      <button id="send">Send</button>
      <ul id="messages"></ul>`;

    const messagesList = document.getElementById("messages");

    const li = this.messages
      ? Object.values(this.messages)
          .sort(message => messages.id)
          .reverse()
          .map(message => `<li><b>${message.user}</b>: ${message.text}</li>`)
          .join(" ")
      : "";

    messagesList.innerHTML = li;

    send.addEventListener("click", () => {
      const input = document.getElementById("message");
      const name = document.getElementById("name");

      const data = {
        id: +new Date(),
        user: email,
        text: input.value
      };

      this.set(`Messages/${data.id}`, data);
    });
  }
}

export default Chat;
