export class BoardMessage extends HTMLElement {
	template(elem) {
		elem.innerHTML = `
<style>
@import "/front/style.css";
</style>
<div class="flex flex-row border border-neutral-300 dark:border-neutral-800 rounded-xl shadow-md max-w-screen-lg mx-auto">
	<div class="w-1/5 p-4 gap-4">
		<img class="w-24 rounded-full" src="${this.getAttribute('profileImage') ?? 'https://placeholder.pics/svg/96x96/FFFFFF-FFFFFF/FFFFFF/%F0%9F%98%80'}">
		<p>${this.getAttribute('name') ?? ''} ${this.getAttribute('surname') ?? ''}</p>
	</div>
	<div class="w-4/5 p-4">
		<p>${this.getAttribute('text')}</p>
	</div>
</div>
`;
	}
	constructor() {
		super();
		const template = document.createElement('template');
		this.template(template);
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(template.content.cloneNode(true));
	}
	static get observedAttributes() {
		return ['profileImage', 'name', 'surname', 'text'];
	}
	attributeChangedCallback(name, oldValue, newValue) {
		this.template(this.shadowRoot);
	}
}
