import merge from 'deepmerge';
import defaultTheme from '../Theme/defaultTheme';

/**
 *
 * @param theme
 * @param variant
 * @return
 */
export const styles = (theme, variant = 'primary') => {
	const _theme = merge(defaultTheme, theme);
	return {
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
				color: _theme[variant].text
			},
			'[data-disabled=true]': {
				color: _theme.white['25']
			}
		},
		input: {
			default: {
				border: `1px solid ${_theme.white.main}`,
				fontSize: '12pt',
				padding: '24px 16px 8px 16px'
			},
			'::placeholder': {
				color: 'transparent'
			},
			':focus': {
				outline: `${_theme[variant].light} auto 1px`
			},
			':focus::placeholder': {
				color: _theme.black['25']
			},
			':focus ~ .label': {
				top: '12px',
				color: _theme[variant].main,
				fontSize: '10pt'
			},
			':not([value=""]) ~ .label': {
				top: '12px',
				fontSize: '10pt'
			},
			'[data-error=true] ~ .label': {
				color: _theme.error.main
			},
			'[disabled]': {
				backgroundColor: _theme.white['25'],
				borderColor: _theme.black['25'],
				color: _theme.white['25']
			},
			'[disabled]::placeholder': {
				color: _theme.white['25']
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
				color: _theme.error.main
			}
		},
		label: {
			default: {
				position: 'absolute',
				transform: 'translate(0, -50%)',
				top: '50%',
				left: '16px',
				color: _theme.black['50'],
				fontSize: '12pt',
				pointerEvents: 'none',
				transition: 'top .25s, font-size .25s'
			},
			'.error': {
				color: _theme.error.main
			}
		}
	}
};

export function stylesValidator(styles) {
	const validatedStyles = {};
	if (styles.root) validatedStyles.root = styles.root;
	if (styles.input) validatedStyles.input = styles.input;
	if (styles.label) validatedStyles.label = styles.label;
	return validatedStyles;
}