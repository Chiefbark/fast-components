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
			borderColor: '#ffffff1f'
		}
	},
	label: {}
}

export function themeValidator(theme) {
	return {...theme.root, ...theme.icon, ...theme.label};
}