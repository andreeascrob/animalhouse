export class AccountButton extends HTMLElement {
	template(elem) {
		elem.innerHTML = `
<style>
@import "/front/style.css";
</style>
<div class="flex flex-row gap-2">
<a href="/front/${localStorage.token ? 'profile' : 'signin'}"><img width="20" class="mr-1 dark:invert inline" src="/icons/person.svg" alt=""><span class="hidden md:inline">${this.getAttribute('username') ?? 'Accedi'}</span></a>
<button class="${localStorage.token ? '' : 'hidden'}" onclick="this.getRootNode().host.logout()"><img width="20" class="dark:invert inline" src="/icons/logout.svg" alt="Esci dall'account"></button>
</div>
`;
	}
	constructor() {
		super();
    alert("BOOOOOOOO")
		if (localStorage.token) {
			fetch('/api/users/profile/', {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.token}`
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
	logout() {
		delete localStorage.userId;
		delete localStorage.token;
		window.location.reload();
	}
}
