export class ProductPill extends HTMLElement {
	template(elem) {
		elem.innerHTML = `
<style>
@import "/front/style.css";
</style>
<a href="/front/product/${this.getAttribute('slug')}" class="flex flex-row gap-2 p-2 items-center">
	<img class="w-24 rounded-xl aspect-square w-full bg-neutral-300 dark:bg-neutral-800" src="${this.getAttribute('image') ?? ''}">
	<div class="flex flex-col gap-2">
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
		return ['slug', 'image', 'productname', 'price'];
	}
	attributeChangedCallback(name, oldValue, newValue) {
		this.template(this.shadowRoot);
	}
}
