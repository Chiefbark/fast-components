import merge from 'deepmerge';
import {defaultTheme} from '../Theme';

/**
 *
 * @param theme
 * @param variant
 * @return
 */
export const styles = (theme, variant) => {
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
				borderRadius: '4px',
				borderColor: _theme[variant].main,
				color: _theme[variant].text,
				fontSize: '1.15rem',
				textTransform: 'uppercase',
				padding: '16px 32px',
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
				backgroundColor: _theme.disabled.main,
				borderColor: _theme.disabled.main,
				color: _theme.disabled.dark
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
};

export function stylesValidator(styles) {
	const validatedStyles = {};
	if (styles) {
		if (styles.root) validatedStyles.root = styles.root;
		if (styles.icon) validatedStyles.icon = styles.icon;
	}
	return validatedStyles;
}