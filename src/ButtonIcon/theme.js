// Default theme for ButtonIcon Component
export const theme = {
	root: {
		default: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: '#2196f3',
			outline: 'none',
			borderStyle: 'solid',
			borderColor: '#2196f3',
			color: '#fff',
			fontSize: '1.15rem',
			padding: '16px',
			transition: 'background .25s'
		},
		':focus': {
			backgroundColor: '#1b7dcb'
		},
		':hover': {
			backgroundColor: '#1b7dcb'
		},
		':active': {
			backgroundColor: '#259fff'
		},
		'[disabled]': {
			backgroundColor: '#ffffff1f',
			color: '#ffffff4d',
			borderColor: '#ffffff1f'
		}
	},
	icon: {
		default: {
			width: '24px',
			height: '24px'
		}
	}
}

export function themeValidator(theme) {
	const validatedTheme = {};
	if (theme.root) validatedTheme.root = theme.root;
	if (theme.icon) validatedTheme.icon = theme.icon;
	return validatedTheme;
}