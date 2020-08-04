// Default theme for Button Component
const theme = {
	root: {
		default: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: '#2196f3',
			outline: 'none',
			borderStyle: 'solid',
			borderRadius: '4px',
			borderColor: '#2196f3',
			color: '#fff',
			fontSize: '1.15rem',
			textTransform: 'uppercase',
			padding: '16px 32px',
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
			color: '#ffffff4d'
		}
	},
	icon: {
		default: {
			width: '24px',
			height: '24px'
		},
		'.left': {
			marginRight: '16px'
		},
		'.right': {
			marginLeft: '16px'
		}
	}
}

export default theme;