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
				backgroundColor: _theme[variant].main,
				outline: 'none',
				borderStyle: 'solid',
				borderColor: _theme[variant].main,
				color: _theme[variant].text,
				fontSize: '1.15rem',
				padding: '16px',
				transition: 'background .25s'
			},
			':focus': {
				backgroundColor: _theme[variant].dark
			},
			':hover': {
				backgroundColor: _theme[variant].dark
			},
			':active': {
				backgroundColor: _theme[variant].light
			},
			'[disabled]': {
				backgroundColor: _theme.black['25'],
				borderColor: _theme.black['25'],
				color: _theme.white['25']
			}
		},
		icon: {
			default: {
				width: '24px',
				height: '24px'
			}
		}
	}
};

export function stylesValidator(styles) {
	const validatedStyles = {};
	if (styles.root) validatedStyles.root = styles.root;
	if (styles.icon) validatedStyles.icon = styles.icon;
	return validatedStyles;
}