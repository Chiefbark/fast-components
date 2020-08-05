// Default theme for TextInput Component
export const theme = {
	root: {
		default: {
			position: 'relative',
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'stretch',
			justifyContent: 'center',
			backgroundColor: '#ffffff4d',
			outline: 'none',
			border: 'none',
			borderRadius: '4px',
			overflow: 'hidden',
			color: '#fff'
		},
		'[data-disabled=true]': {
			color: '#ffffff4d'
		}
	},
	input: {
		default: {
			border: '1px solid #fff',
			fontSize: '12pt',
			padding: '24px 16px 8px 16px'
		},
		':focus ~ .label': {
			top: '12px',
			color: '#1b7dcb',
			fontSize: '10pt'
		},
		':not([value=""]) ~ .label': {
			top: '12px',
			color: '#1b7dcb',
			fontSize: '10pt'
		}
	},
	label: {
		default: {
			position: 'absolute',
			top: '50%',
			left: '16px',
			transform: 'translate(0, -50%)',
			color: '#00000088',
			fontSize: '12pt',
			transition: 'top .25s, font-size .25s'
		}
	}
}

export function themeValidator(theme) {
	const validatedTheme = {};
	if (theme.root) validatedTheme.root = theme.root;
	if (theme.input) validatedTheme.input = theme.input;
	if (theme.label) validatedTheme.label = theme.label;
	return validatedTheme;
}