function Chat() {
  const email = history.state ? history.state.email : false;

  if (!email) {
    this.redirect("/login");
  } else {
    const render = () => {
      root.innerHTML = /*html*/ `<input type="text" placeholder="Message..." id="message" />
      <button id="send">Send</button>
      <ul id="messages"></ul>`;

      console.log(this.online);

      const messagesList = document.getElementById("messages");

      const li = this.messages
        ? Object.values(this.messages)
            .sort(message => messages.id)
            .reverse()
            .map(message => `<li><b>${message.user}</b>: ${message.text}</li>`)
            .join(" ")
        : "";

      messagesList.innerHTML = li;
    };

    render();

    send.addEventListener("click", () => {
      const input = document.getElementById("message");

      const data = {
        id: +new Date(),
        user: email,
        text: input.value
      };

      if (input.value) {
        this.set(`Messages/${data.id}`, data);
      }
      render();
    });
  }
}

export default Chat;
