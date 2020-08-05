// Default theme for Checkbox Component
export const theme = {
	root: {
		default: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: 'transparent',
			outline: 'none',
			border: 'none',
			color: '#fff',
			fontSize: '14pt'
		},
		'[data-disabled=true]': {
			color: '#ffffff4d'
		}
	},
	icon: {
		default: {
			width: '16px',
			height: '16px',
			border: '1px solid #2196f3',
			borderRadius: '2px',
			marginRight: '8px',
			transition: 'background-color .15s'
		},
		'[data-checked=true]': {
			backgroundColor: '#2196f3'
		},
		'[data-checked=true] path': {
			fill: '#fff'
		},
		'[data-disabled=true]': {
			backgroundColor: '#ffffff4d',
			borderColor: '#ffffff1f'
		}
	},
	label: {}
}

export function themeValidator(theme) {
	const validatedTheme = {};
	if (theme.root) validatedTheme.root = theme.root;
	if (theme.icon) validatedTheme.icon = theme.icon;
	if (theme.label) validatedTheme.label = theme.label;
	return validatedTheme;
}