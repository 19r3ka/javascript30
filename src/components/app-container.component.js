(function() {
  const template = document.createElement("template");
  template.innerHTML = /*html*/ `
        <style>
            :host {
                display: block;
                width: 100%;
                height: 100%;
                font: 15px "Yatra One", "Lato", "Arvo", cursive, sans-serif, serif;
                background: grey url("https://cdn.pixabay.com/photo/2016/11/22/19/15/dark-1850120_1280.jpg") center no-repeat; 
                background-size: cover;
            }
            
            :host section {
                height: 100%;
                display: flex;
                padding: 5px;
                flex-wrap: wrap;
                justify-content: space-around;
                align-items: center;

            }
        </style>

        <section id="app-container">
            <slot></slot>
        </section>
    `;

  class AppContainer extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      document.addEventListener("keydown", ({ key }) => {
        const button = this.querySelector(`sound-key[key-name=${key}`);
        if (!button) return; // Do nothing if there aren't any key button
        button.setAttribute("playing", "");
      });
    }

    connectedCallback() {
      const slot = this.shadowRoot.querySelector("#slot");
      console.log(slot);
    }
  }

  window.customElements.define("app-container", AppContainer);
})();
