export class AccountButton extends HTMLElement {
	template(elem) {
		elem.innerHTML = `
<style>
@import "/front/style.css";
</style>
<a class="flex flex-row gap-2" href="/front/${localStorage.token ? 'profile' : 'signin'}"><img width="20" class="dark:invert inline" src="/icons/person.svg"><span class="hidden md:inline">${this.getAttribute('username') ?? 'Accedi'}</span></a>
`;
	}
	constructor() {
		super();
		if (localStorage.token) {
			fetch("http://localhost:8000/api/users/profile/", {
				method: "get",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					...(localStorage.token && {'Authorization': `Bearer ${localStorage.token}`})
				}
			})
			.then(response => response.json())
			.then(data => this.setAttribute('username', data.name));
		}
		const template = document.createElement('template');
		this.template(template);
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(template.content.cloneNode(true));
	}
	static get observedAttributes() {
		return ['username'];
	}
	attributeChangedCallback(name, oldValue, newValue) {
		this.template(this.shadowRoot);
	}
}
