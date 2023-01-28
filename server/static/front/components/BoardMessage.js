export class BoardMessage extends HTMLElement {
	template(elem) {
		elem.innerHTML = `
<style>
@import "/front/style.css";
</style>
<div class="flex flex-row border border-neutral-300 dark:border-neutral-800 rounded-xl shadow-md max-w-screen-lg mx-auto">
	<div class="w-1/5 p-4 gap-4">
		<img class="w-24 aspect-square object-cover rounded-full" src="${this.getAttribute('profileimage') ?? 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}" alt="">
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
		return ['profileimage', 'name', 'surname', 'text'];
	}
	attributeChangedCallback(name, oldValue, newValue) {
		this.template(this.shadowRoot);
	}
}
