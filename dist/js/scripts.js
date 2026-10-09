//accordion
document.querySelectorAll('.accordion__item').forEach((item) => {
	const content = item.querySelector('.accordion__content');

	item.addEventListener('click', (e) => {
		if (e.target.closest('.accordion__content')) return;

		const isOpen = item.classList.contains('accordion__item--active');

		document.querySelectorAll('.accordion__item').forEach((other) => {
			other.classList.remove('accordion__item--active');
			other.querySelector('.accordion__content').style.height = '0px';
		});

		if (!isOpen) {
			item.classList.add('accordion__item--active');
			content.style.height = content.scrollHeight + 'px';
		}
	});
});


//burger-menu
const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.header__nav');
const overlay = document.querySelector('.header__overlay');

function toggleMenu() {
	burger.classList.toggle('active');
	nav.classList.toggle('active');
	overlay.classList.toggle('active');
}

function closeMenu() {
	burger.classList.remove('active');
	nav.classList.remove('active');
	overlay.classList.remove('active');
}

//smth-logo
//url-#cleaner
function cleanUrl() {
	history.replaceState(null, '', window.location.pathname + window.location.search);
}

window.addEventListener('DOMContentLoaded', function () {
	const hash = window.location.hash;
	if (!hash) return;

	const target = document.querySelector(hash);

	if (target) {
		setTimeout(() => {
			target.scrollIntoView({ behavior: 'smooth' });
			cleanUrl();
		}, 100);
	} else {
		cleanUrl();
	}
});

const logo = document.querySelector('.header__logo');

logo?.addEventListener('click', function (e) {
	const isHomePage =
		window.location.pathname.endsWith('/index.html') ||
		window.location.pathname.endsWith('/');

	if (isHomePage) {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: 'smooth' });
		cleanUrl();
	}
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
	link.addEventListener('click', function (e) {
		const href = this.getAttribute('href');
		const target = document.querySelector(href);
		if (!target) return;

		e.preventDefault();
		target.scrollIntoView({ behavior: 'smooth' });
		cleanUrl();
	});
});

//lang-switcher dissmiss
document.addEventListener('click', (e) => {
	document.querySelectorAll('.header__lang[open]').forEach((d) => {
		if (!d.contains(e.target)) d.removeAttribute('open');
	});
});

//supported countries
const pageLang = (document.documentElement.lang || 'en').slice(0, 2).toLowerCase();
const uiLang = ['ru', 'uk'].includes(pageLang) ? pageLang : 'en';

const UI = {
	en: { notFound: 'Nothing found', chooseService: 'Select...' },
	ru: { notFound: 'Ничего не найдено', chooseService: 'Выбрать...' },
	uk: { notFound: 'Нічого не знайдено', chooseService: 'Вибрати...' },
};

const countryCodes = [
	"AD", "AE", "AF", "AG", "AL", "AM", "AO", "AR", "AT", "AU", "AW", "AZ", "BA", "BB", "BD", "BE", "BF", "BG",
	"BH", "BI", "BJ", "BN", "BO", "BR", "BS", "BT", "BW", "BY", "BZ", "CA", "CD", "CF", "CG", "CH", "CI", "CL",
	"CM", "CO", "CR", "CU", "CV", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "ER",
	"ES", "ET", "FI", "FJ", "FM", "FR", "GA", "GB", "GD", "GE", "GH", "GM", "GN", "GQ", "GR", "GT", "GW", "GY",
	"HN", "HR", "HT", "HU", "ID", "IE", "IL", "IQ", "IR", "IS", "IT", "JM", "JO", "JP", "KE", "KG", "KH",
	"KI", "KM", "KN", "KP", "KR", "KW", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY",
	"MA", "MC", "MD", "ME", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MR", "MT", "MU", "MV", "MW", "MX", "MY",
	"MZ", "NA", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NZ", "OM", "PA", "PE", "PG", "PH", "PL", "PT",
	"PW", "PY", "QA", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SI", "SK", "SL", "SM", "SN",
	"SO", "SR", "SS", "ST", "SV", "SY", "SZ", "TD", "TG", "TH", "TJ", "TL", "TM", "TN", "TO", "TR", "TT", "TV",
	"TW", "TZ", "UA", "UG", "US", "UY", "UZ", "VA", "VC", "VE", "VN", "VU", "WS", "YE", "ZA", "ZM", "ZW",
];

let regionNames = null;
try {
	regionNames = new Intl.DisplayNames([uiLang], { type: 'region' });
} catch (e) {
	regionNames = null;
}

const countries = countryCodes
	.map((code) => ({ code, name: regionNames ? regionNames.of(code) : code }))
	.filter((c) => c.name)
	.sort((a, b) => a.name.localeCompare(b.name, uiLang));

const countrySelectWrap = document.getElementById("custom-country-select");
const countryInput = document.getElementById("country-input");
const countryList = document.getElementById("country-list");
let selectedCountry = null;

function isValidCountry(v) {
	const q = v.trim().toLocaleLowerCase(uiLang);
	return countries.some((c) => c.name.toLocaleLowerCase(uiLang) === q);
}

function renderCountryList(filterText = "") {
	countryList.innerHTML = "";
	const query = filterText.trim().toLocaleLowerCase(uiLang);
	const filtered = countries.filter((country) =>
		country.name.toLocaleLowerCase(uiLang).includes(query)
	);

	if (filtered.length === 0) {
		const emptyItem = document.createElement("li");
		emptyItem.className = "custom-select__item";
		emptyItem.style.cursor = "default";
		emptyItem.style.opacity = "0.6";
		emptyItem.textContent = UI[uiLang].notFound;
		countryList.appendChild(emptyItem);
		return;
	}

	filtered.forEach((country) => {
		const li = document.createElement("li");
		li.className = "custom-select__item";
		li.textContent = country.name;
		li.dataset.code = country.code;
		if (countryInput.value === country.name) {
			li.classList.add("is-selected");
		}
		li.addEventListener("mousedown", (e) => {
			e.preventDefault();
			countryInput.value = country.name;
			selectedCountry = country.name;
			countrySelectWrap.classList.remove("is-open");
		});
		countryList.appendChild(li);
	});
}

countryInput.addEventListener("blur", () => {
	if (!countryInput.value.trim() || isValidCountry(countryInput.value)) return;
	countryInput.value = "";
	selectedCountry = null;
	countrySelectWrap.classList.remove("is-open");
});

countryInput.addEventListener("input", () => {
	selectedCountry = null;
	countrySelectWrap.classList.remove("is-error");
	renderCountryList(countryInput.value);
	countrySelectWrap.classList.add("is-open");
});

document.addEventListener("pointerdown", (e) => {
	if (!countrySelectWrap.contains(e.target)) {
		countrySelectWrap.classList.remove("is-open");
	}
});

//order popup
const popup = document.getElementById('order-popup');
const customSelect = document.getElementById('custom-service-select');
const hiddenServiceInput = document.getElementById('service');
const selectBtn = customSelect.querySelector('.custom-select__button');
const selectText = customSelect.querySelector('.custom-select__text');
const selectItems = customSelect.querySelectorAll('.custom-select__item');

const serviceWrap = customSelect;

countryInput.addEventListener("focus", () => {
	customSelect.classList.remove('is-open');
	selectBtn.setAttribute('aria-expanded', 'false');
	renderCountryList(countryInput.value);
	countrySelectWrap.classList.add("is-open");
});

function setServiceError(isError) {
	serviceWrap.classList.toggle('is-error', isError);
	selectBtn.setAttribute('aria-invalid', isError ? 'true' : 'false');
}

function setCustomService(value) {
	hiddenServiceInput.value = value || "";
	if (value) {
		selectText.textContent = value;
		selectBtn.classList.remove("is-placeholder");
		setServiceError(false);
	} else {
		selectText.textContent = UI[uiLang].chooseService;
		selectBtn.classList.add("is-placeholder");
	}

	selectItems.forEach((item) => {
		if (item.dataset.value === value) {
			item.classList.add("is-selected");
		} else {
			item.classList.remove("is-selected");
		}
	});
}

selectBtn.addEventListener('click', (e) => {
	countrySelectWrap.classList.remove('is-open');
	e.stopPropagation();
	const isOpen = customSelect.classList.toggle('is-open');
	selectBtn.setAttribute('aria-expanded', isOpen);
});

selectItems.forEach((item) => {
	item.addEventListener('click', (e) => {
		e.stopPropagation();
		setCustomService(item.dataset.value);
		customSelect.classList.remove('is-open');
		selectBtn.setAttribute('aria-expanded', 'false');
	});
});


document.addEventListener('pointerdown', (e) => {
	if (!customSelect.contains(e.target)) {
		customSelect.classList.remove('is-open');
		selectBtn.setAttribute('aria-expanded', 'false');
	}
});

document.querySelectorAll('[data-popup-open]').forEach((btn) => {
	btn.addEventListener('click', () => {
		const service = btn.dataset.service;
		setCustomService(service || '');

		closeMenu();
		popup.showModal();
		document.getElementById('form_start_time').value = Date.now();
	});
});

popup.querySelector('[data-popup-close]').addEventListener('click', () => {
	customSelect.classList.remove('is-open');
	popup.close();
	resetLeadForm();
});

popup.addEventListener('click', (e) => {
	if (e.target === popup) {
		customSelect.classList.remove('is-open');
		popup.close();
		resetLeadForm();
	}
});

const namePattern = /[^\p{L}\s'’-]/gu;
const phoneInputs = [document.getElementById('phone'), document.getElementById('whatsapp')];

function applyPhoneMask(input) {
	const raw = input.value;
	const caret = input.selectionStart ?? raw.length;
	const digitsBefore = raw.slice(0, caret).replace(/\D/g, '').length;
	const limit = input.maxLength > 0 ? input.maxLength : 14;
	const digits = raw.replace(/\D/g, '').slice(0, limit - 1);

	if (!digits) {
		if (document.activeElement === input) {
			if (raw !== '+') {
				input.value = '+';
				input.setSelectionRange(1, 1);
			}
		} else if (raw !== '') {
			input.value = '';
		}
		return;
	}

	const value = '+' + digits;
	if (raw === value) return;

	input.value = value;
	const pos = 1 + Math.min(digitsBefore, digits.length);
	input.setSelectionRange(pos, pos);
}

phoneInputs.forEach((input) => {
	input.addEventListener('focus', () => {
		if (input.value === '') {
			input.value = '+';
			input.setSelectionRange(1, 1);
		}
	});

	input.addEventListener('input', () => applyPhoneMask(input));

	input.addEventListener('blur', () => {
		if (input.value === '+') input.value = '';
	});
});


function filterInput(input, pattern) {
	input.addEventListener('input', () => {
		input.value = input.value.replace(pattern, '');
	});
}

filterInput(document.getElementById('name'), namePattern);
filterInput(document.getElementById('surname'), namePattern);
filterInput(countryInput, namePattern);



function resetLeadForm() {
	form.reset();
	setCustomService('');
	setServiceError(false);
	selectedCountry = null;
	countrySelectWrap.classList.remove('is-open');
}

window.addEventListener('pageshow', resetLeadForm);

//lead_id generation
const form = document.getElementById("lead-form");

form.querySelector(".form__card-submit").addEventListener("click", () => {
	setServiceError(!hiddenServiceInput.value);
});

const SCRIPT_URL = "https://api.apsaracambodia.com/api/lead";

function makeLeadId() {
	const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");

	const bytes = new Uint8Array(16);
	window.crypto.getRandomValues(bytes);

	bytes[6] = (bytes[6] & 0x0f) | 0x40;
	bytes[8] = (bytes[8] & 0x3f) | 0x80;

	const hex = [...bytes].map((b) => b.toString(16).padStart(2, "0"));
	const uuid = [
		hex.slice(0, 4).join(""),
		hex.slice(4, 6).join(""),
		hex.slice(6, 8).join(""),
		hex.slice(8, 10).join(""),
		hex.slice(10, 16).join(""),
	].join("-");

	return `F-${date}-${uuid.toUpperCase()}`; // F-20260924-550E8400-E29B-41D4-A716-446655440000
}

form.addEventListener("submit", async (e) => {
	const website = form.querySelector('input[name="website"]');
	if (website && website.value.trim() !== '') return;
	const startTime = form.querySelector('input[name="form_start_time"]');
	if (startTime && startTime.value && (Date.now() - parseInt(startTime.value) < 3000)) return;
	e.preventDefault();

	if (!selectedCountry) return;

	if (!hiddenServiceInput.value) {
		setServiceError(true);
		selectBtn.focus();
		return;
	}
	setServiceError(false);

	form.lead_id.value = makeLeadId();
	const formData = new FormData(form);

	phoneInputs.forEach((input) => {
		if (!input || !input.name) return;
		const plain = input.value.replace(/\D/g, '');
		if (!plain) return;
		formData.set(input.name, '+' + plain);
		formData.set(input.name + '_plus', '+');
		formData.set(input.name + '_plain', plain);
	});

	const payload = Object.fromEntries(formData.entries());


	const submitBtn = form.querySelector(".form__card-submit");
	if (submitBtn) submitBtn.disabled = true;

	try {
		const res = await fetch(SCRIPT_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload)
		});

		if (res.ok) {
			alert("Заявка отправлена!");
			popup.close();
			resetLeadForm();
		} else {
			alert("Ошибка сервера: " + res.status);
			if (submitBtn) submitBtn.disabled = false;
			console.error("Ошибка сервера:", res.status);
		}
	} catch (err) {
		alert("Сетевая ошибка: " + err);
		if (submitBtn) submitBtn.disabled = false;
		console.error("Сетевая ошибка:", err);
	}
});