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
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'transparent',
				outline: 'none',
				border: 'none',
				color: _theme[variant].text,
				fontSize: '14pt'
			},
			'[data-disabled=true]': {
				color: _theme.white['25']
			},
			' input:focus ~ .icon': {
				outline: `${_theme[variant].light} auto 1px`
			}
		},
		icon: {
			default: {
				width: '16px',
				height: '16px',
				border: `1px solid ${_theme[variant].main}`,
				borderRadius: '2px',
				marginRight: '8px',
				transition: 'background-color .15s'
			},
			'[data-checked=true]': {
				backgroundColor: _theme[variant].main
			},
			'[data-checked=true] path': {
				fill: _theme[variant].text
			},
			'[data-disabled=true]': {
				backgroundColor: _theme.white['25'],
				borderColor: _theme.black['25']
			}
		},
		label: {}
	}
};

export function stylesValidator(styles) {
	const validatedStyles = {};
	if (styles.root) validatedStyles.root = styles.root;
	if (styles.icon) validatedStyles.icon = styles.icon;
	if (styles.label) validatedStyles.label = styles.label;
	return validatedStyles;
}