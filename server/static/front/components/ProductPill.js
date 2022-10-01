export class ProductPill extends HTMLElement {
	template(elem) {
		elem.innerHTML = `
<style>
@import "/front/style.css";
</style>
<a href="${this.getAttribute('url')}" class="flex flex-row gap-2 p-2 max-w-sm">
	<img class="basis-1/5 rounded-xl aspect-square w-full bg-neutral-300 dark:bg-neutral-800" src="${this.getAttribute('image')}">
	<div class="flex flex-col basis-4/5 gap-2">
		<h1 class="text-lg font-bold">${this.getAttribute('productname')}</h1>
		<p>${window.eurIT.format(this.getAttribute('price'))}</p>
	</div>
</a>
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
		return ['url', 'image', 'productname', 'price'];
	}
	attributeChangedCallback(name, oldValue, newValue) {
		this.template(this.shadowRoot);
	}
}
