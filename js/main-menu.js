class MainMenu extends HTMLElement {
  constructor() {
    super();
  }

	connectedCallback() {
		this.innerHTML = `
      <div class="container">
        <p>
        <b>Doeun Kwon</b>
        <br><br>
        <a href="about.html" style="display:inline; margin-right:15px">About</a>
        <a href="projects.html" style="display:inline; margin-right:15px">Projects</a>
        <a href="writing.html" style="display:inline; margin-right:15px">Writing</a>
        <a href="learn.html" style="display:inline; margin-right:15px">Learn</a>
        <a href="Doeun Kwon (2022 Resume).pdf" style="display:inline; margin-right:15px" target="_blank">Resume</a>
        </p>
      </div>
		`;
	}

}

customElements.define('main-menu', MainMenu);
