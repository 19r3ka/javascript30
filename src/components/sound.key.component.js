import { randomColor } from "../helpers.js";

(function() {
  const template = document.createElement("template");
  template.innerHTML = /*html*/ `
        <style>
            :host {
                --border-color: white;
                display: flex;
                flex-wrap: wrap;
                width: 9vw;
                max-width: 80px;
                height: 9vw;
                max-height: 100px;
                border: 0.3rem black solid;
                border-radius: 0.7rem;
                background: rgba(0, 0, 0, 0.7);
                transition: all 0.2s ease-in-out;
                color: white;
            }

            #key-name,
            #key-sound {
                display: block;
                width: 100%;
                margin: auto;
                text-transform: uppercase;
                text-align: center;
                color: gold;
            }

            #key-name {
                margin-bottom: 10px;
                font: 2rem Georgia, Verdana, Courier, serif;
                color: white;
            }

            :host(.playing) {
                transform: scale(1.2);
                border: 0.3rem var(--border-color) solid;
            }
        </style>
     
        <kbd id="key-name"></kbd>
        <span id="key-sound"></span>
        <audio src="" id="audio" preload="metadata"></audio>
    `;

  class SoundKey extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      // give key button a random flash border color
      this.style.setProperty("--border-color", randomColor());

      this.addEventListener("click", this._play);
      this.addEventListener("transitionend", () =>
        this.classList.remove("playing")
      );
    }

    static get observedAttributes() {
      return ["data-src", "key-name", "key-sound", "playing"];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      if (oldVal === newVal) return;

      const { shadowRoot } = this;

      switch (name) {
        case "data-src":
          const audio = shadowRoot.getElementById("audio");
          audio.setAttribute("src", newVal);
          break;
        case "key-name":
        case "key-sound":
          shadowRoot.getElementById(name).innerHTML = newVal;
          break;
        default:
          // when it is 'playing'
          this._play();
          this.playing = false;
      }
    }

    get dataSrc() {
      return this.getAttribute("data-src");
    }

    set dataSrc(val) {
      this.setAttribute("data-src", val);
    }

    get keyName() {
      return this.getAttribute("key-name");
    }

    set keyName(val) {
      if (!val) throw "All sound keys must have a valid key name";
      this.setAttribute("key-name", val);
    }

    get keySound() {
      return this.getAttribute("key-sound");
    }

    set keySound(val) {
      if (!val) throw "All sound keys must have a valid key sound";
      this.setAttribute("key-sound", val);
    }

    get playing() {
      return this.hasAttribute("playing");
    }

    set playing(val) {
      if (val) {
        this.setAttribute("playing", "");
      } else {
        this.removeAttribute("playing");
      }
    }

    _play() {
      const audio = this.shadowRoot.getElementById("audio");

      audio.currentTime = 0; // always restart sound on keydown
      audio.play();

      this.classList.add("playing");
    }
  }

  window.customElements.define("sound-key", SoundKey);
})();
