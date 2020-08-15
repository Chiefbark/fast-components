import hash from 'object-hash';
import {defaultTheme} from '../Theme';

function stylesToCSS(obj, prefix = '') {
	return Object.keys(obj).map(x =>
		Object.keys(obj[x]).map(y =>
			y === 'default' ? `${prefix}.${x}{${getStyles(obj[x][y])}}` : `${prefix}.${x}${y}{${getStyles(obj[x][y])}}`
		).join('')
	).join('');
}

function getStyles(obj) {
	return Object.entries(obj)
		.map(([k, v]) =>
			`${k.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}:${v}`
		).join(';');
}

export function withCSS(styles, Component, dataId) {
	if (!document.querySelector(`style[data-id=${dataId}]`)) {
		const stylesheet = document.createElement('style');
		stylesheet.setAttribute('type', 'text/css');
		stylesheet.setAttribute('data-id', dataId);
		stylesheet.innerText = stylesToCSS(styles, `.${dataId}`);
		document.head.appendChild(stylesheet);
	}
	return Component;
}

export function getClassName(theme, styles, Component) {
	const themeHash = hash(theme);
	const hashIndex = Component.themeHashes.indexOf(themeHash);
	if (hashIndex < 0) Component.themeHashes.push(themeHash);

	let className = '';
	if (theme !== defaultTheme) {
		if (hashIndex < 0) Component.themeID++;
		className += `-t${hashIndex < 0 ? Component.themeID : hashIndex}`;
	}
	if (styles) {
		Component.stylesID++;
		className += `-s${Component.stylesID}`;
	}

	return className;
}