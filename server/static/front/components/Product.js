export class Product extends HTMLElement {
	template(elem) {
		elem.innerHTML = `
<style>
@import "/front/style.css";
</style>
<div class="flex flex-col md:flex-row gap-4 p-4 max-w-screen-lg mx-auto">
	<div class="basis-1/4">
		<img class="rounded-xl aspect-square w-full bg-neutral-300 dark:bg-neutral-800" src="${this.getAttribute('image')}">
	</div>
	<div class="basis-3/4">
		<div class="flex flex-col basis-3/4 gap-2">
			${this.getAttribute('productname') ? ('<h1 class="text-3xl font-bold">' + this.getAttribute('productname') + '</h1>') : '<div class="animate-pulse w-full h-9 bg-neutral-300 dark:bg-neutral-800 rounded"></div>'}
			${this.getAttribute('price') ? ('<p class="text-lg">' + window.eurIT.format(this.getAttribute('price')) + '</p>') : '<div class="animate-pulse w-20 h-7 bg-neutral-300 dark:bg-neutral-800 rounded"></div>'}
			<div class="flex flex-row gap-2${this.getAttribute('available') > 0 ? '' : ' hidden'}">
				<div class="flex flex-col">
					<label for="quantity">Quantità:</label>
					<input class="w-24 dark:bg-neutral-800 rounded" type="number" id="quantity" name="quantity" min="1" max="${this.getAttribute('available')}" value="1">
				</div>
				<button class="flex flex-row gap-2 rounded p-4 bg-emerald-500 dark:bg-emerald-800 justify-center items-center w-52 hover:font-bold" onclick="this.getRootNode().host.addToCart()">
					<img class="dark:invert" width="20" src="/icons/cart-plus.svg" alt="">
					<span>Aggiungi al carrello<span>
				</button>
			</div>
			<p class="font-bold${this.getAttribute('available') == 0 ? '' : ' hidden'}">Prodotto non disponibile</p>
			${this.getAttribute('description') ? ('<p class="text-justify">' + this.getAttribute('description') + '</p>') : '<div class="animate-pulse w-full h-12 bg-neutral-300 dark:bg-neutral-800 rounded"></div>'}
		</div>
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
		return ['image', 'productname', 'price', 'description', 'available'];
	}
	attributeChangedCallback(name, oldValue, newValue) {
		this.template(this.shadowRoot);
	}
	addToCart() {
		addToCart(window.location.pathname.match(/[^\/]+(?=\/?$)/)[0], this.shadowRoot.getElementById('quantity').value);
	}
}
