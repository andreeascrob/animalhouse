export class ProductCard extends HTMLElement {
	template(elem) {
		elem.innerHTML = `
<style>
@import "/front/style.css";
</style>
<div class="flex flex-col w-64 h-full md:max-w-xs border border-neutral-300 dark:border-neutral-800 rounded-xl shadow-md hover:border-emerald-500 dark:hover:border-emerald-800 hover:scale-[1.02] snap-center">
	<a href="${this.getAttribute('url')}"><img class="w-full aspect-square rounded-t-xl bg-neutral-300 dark:bg-neutral-800" src="${this.getAttribute('image') ?? ''}" loading="lazy" alt=""></a>
	<div class="flex flex-row p-4 gap-2 grow">
		<div class="flex flex-col justify-center grow">
			<a href="${this.getAttribute('url')}"><p class="font-bold font-lg">${this.getAttribute('productname')}</p></a>
			<p>${window.eurIT.format(this.getAttribute('price'))}</p>
		</div>
		<button class="bg-emerald-500 dark:bg-emerald-800 p-4 rounded-full self-center shrink-0"><img class="dark:invert" width="20" src="/icons/cart-plus.svg"></button>
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
		return ['url', 'image', 'productname', 'price'];
	}
	attributeChangedCallback(name, oldValue, newValue) {
		this.template(this.shadowRoot);
	}
}