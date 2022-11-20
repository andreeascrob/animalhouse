export class Service extends HTMLElement {
	template(elem) {
		elem.innerHTML = `
<style>
@import "/front/style.css";
</style>
<div class="flex flex-col md:flex-row items-center gap-4">
	<img class="w-full md:w-3/5 rounded-xl bg-neutral-300 dark:bg-neutral-800" src="${this.getAttribute('image') ?? ''}" loading="lazy" alt="">
	<div class="flex flex-col gap-2 w-full md:w-2/5">
		<h2 class="font-bold font-lg">${this.getAttribute('servicename')}</h2>
		<p>${this.getAttribute('description')}</p>
		<a href="/front/book/?serviceId=${this.getAttribute('serviceid')}${this.getAttribute('branchid') ? '&branchId=' + this.getAttribute('branchid') : ''}" class="flex flex-row gap-2 rounded p-1 bg-emerald-500 dark:bg-emerald-800 justify-center items-center w-40 hover:font-bold${localStorage.token ? '': ' hidden'}">
			<img class="dark:invert" src="/icons/calendar-plus.svg" width="20">
			<span>Prenota</span>
		</a>
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
		return ['image', 'servicename', 'description', 'serviceId', 'branchid'];
	}
	attributeChangedCallback(name, oldValue, newValue) {
		this.template(this.shadowRoot);
	}
}
