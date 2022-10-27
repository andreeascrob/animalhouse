export class CartRemoveButton extends HTMLElement {
	template(elem) {
		elem.innerHTML = `
<style>
@import "/front/style.css";
</style>
<div class="flex justify-center h-full">
<button class="my-auto rounded-full bg-neutral-300 dark:bg-neutral-800" onclick="this.getRootNode().host.removeFromCart()">
	<img class="dark:invert" src="/icons/x.svg" width="20">
</button>
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
		return ['slug'];
	}
	attributeChangedCallback(name, oldValue, newValue) {
		this.template(this.shadowRoot);
	}
	removeFromCart() {
		let cart = JSON.parse(localStorage.cart ?? '{}');
		delete cart[this.getAttribute('slug')];
		localStorage.cart = JSON.stringify(cart);
		if (localStorage.cart == '{}') {
			window.location.reload();
		} else {
			document.getElementById('row-' + this.getAttribute('slug')).remove();
			calculateTotal();
		}
	}
}
