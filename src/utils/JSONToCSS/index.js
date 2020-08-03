function JSONToCSS(obj) {
	return Object.entries(obj)
		.map(([k, v]) =>
			`${k.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}:${v}`
		).join(';');
}

export default JSONToCSS;