export class PetCard extends HTMLElement {
	template(elem) {
		elem.innerHTML = `
<style>
@import "/front/style.css";
</style>
<a href="/front/pet/${this.getAttribute('petid')}" class="flex flex-col gap-2 pb-2 w-64 h-full md:max-w-xs border border-neutral-300 dark:border-neutral-800 rounded-xl shadow-md hover:border-emerald-500 dark:hover:border-emerald-800 hover:scale-[1.02] snap-center">
	<img class="object-contain aspect-square rounded-t-xl bg-neutral-300 dark:bg-neutral-800" src="${this.getAttribute('image') ?? ''}" loading="lazy" alt="">
	<p class="font-bold font-lg text-center">${this.getAttribute('petname')}</p>
	<p class="text-center">${this.getAttribute('animal')}: ${this.getAttribute('species')}</p>
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
		return ['petid', 'image', 'petname', 'animal', 'species'];
	}
	attributeChangedCallback(name, oldValue, newValue) {
		this.template(this.shadowRoot);
	}
}
