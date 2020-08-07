customElements.define('custom-element', class extends HTMLElement {
  static get observedAttributes() { return ['test']; }
  constructor() {
    super();
    console.log(this.tagName, 'constructed');
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(this.tagName, name, oldValue, newValue);
  }
  connectedCallback() {
    this.style.color = 'green';
    this.textContent = 'Connected';
  }
  disconnectedCallback() {
    document.body.appendChild(document.createElement('div')).textContent = 'OK';
  }
});
