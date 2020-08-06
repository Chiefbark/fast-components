// Default theme for TextInput Component
export const theme = {
	root: {
		default: {
			position: 'relative',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'stretch',
			justifyContent: 'center',
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
		'::placeholder': {
			color: 'transparent'
		},
		':focus::placeholder': {
			color: '#00000041'
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
		},
		'[data-error=true] ~ .label': {
			color: '#f44336'
		}
	},
	helperText: {
		default: {
			alignSelf: 'flex-start',
			color: '#ffffffa1',
			fontSize: '10pt',
			padding: '4px 0 0 8px'
		},
		'.error': {
			color: '#f44336'
		}
	},
	label: {
		default: {
			position: 'absolute',
			transform: 'translate(0, -50%)',
			top: '50%',
			left: '16px',
			color: '#00000088',
			fontSize: '12pt',
			pointerEvents: 'none',
			transition: 'top .25s, font-size .25s'
		},
		'.error': {
			color: '#f44336'
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