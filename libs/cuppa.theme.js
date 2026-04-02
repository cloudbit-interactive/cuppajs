/*! v0.0.4 */

/*
 * Authors (https://github.com/cloudbit-interactive/cuppajs)
 * Licensed under MIT (https://github.com/cloudbit-interactive/cuppajs/blob/main/LICENSE)
 */

export class CuppaTheme {
	
	static init({btnToggle, callback} = {}) {
		CuppaTheme.setTheme(null, false, callback);
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches}) => {
			let userPreference = localStorage.getItem('theme');
			if (userPreference) return;
			let theme = !matches ? 'light-theme' : 'dark-theme';
			CuppaTheme.setTheme(theme, false, callback);
		});
		CuppaTheme.setBtnToggle(btnToggle, callback);
	}
	
	static setTheme(theme, store = false, callback) {
		let userPreference = theme || localStorage.getItem('theme');
		if (!userPreference) {
			if (window.matchMedia("(prefers-color-scheme: dark)").matches || userPreference === "dark-theme") {
				document.body.classList.add("dark-theme");
			} else {
				document.body.classList.add("light-theme");
			}
		} else {
			document.body.classList.remove("dark-theme");
			document.body.classList.remove("light-theme");
			document.body.classList.add(userPreference);
			if (store) {
				localStorage.setItem('theme', userPreference);
			}
		}
		if (callback) callback(CuppaTheme.getTheme());
	}
	
	static setBtnToggle(btnToggle, callback) {
		if (!btnToggle) return;
		btnToggle.onclick = (e) => {
			let theme = document.body.classList.contains("dark-theme") ? 'light-theme' : 'dark-theme';
			CuppaTheme.setTheme(theme, true, callback);
		};
	}
	
	static getTheme() {
		return document.body.classList.contains("dark-theme") ? 'dark' : 'light';
	}
}
