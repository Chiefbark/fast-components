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
				flexDirection: 'column',
				alignItems: 'flex-start',
				justifyContent: 'center',
				backgroundColor: 'transparent',
				outline: 'none',
				border: 'none',
				color: 'inherit',
				fontSize: '14pt'
			},
			'>div': {
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'transparent',
				borderRadius: 0
			},
			' input:focus ~ .icon': {
				outline: `${_theme[variant].light} auto 1px`
			},
			'[data-disabled=true]': {
				color: _theme.disabled.dark
			},
			'[data-error=true] .helperText': {
				color: _theme.error.main
			},
			'[data-error=true] .icon': {
				borderColor: _theme.error.main
			},
			'[data-checked=true][data-error=true] .icon': {
				backgroundColor: _theme.error.main
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
			'[data-disabled=true][data-checked=false]': {
				borderColor: _theme.disabled.dark
			},
			'[data-disabled=true][data-checked=true]': {
				backgroundColor: _theme.disabled.dark,
				borderColor: _theme.disabled.dark
			}
		},
		helperText: {
			default: {
				alignSelf: 'flex-start',
				color: _theme.muted.main,
				fontSize: '10pt',
				padding: '4px 0 0 0'
			}
		}
	}
};

export function stylesValidator(styles) {
	const validatedStyles = {};
	if (styles) {
		if (styles.root) validatedStyles.root = styles.root;
		if (styles.icon) validatedStyles.icon = styles.icon;
		if (styles.label) validatedStyles.label = styles.label;
		if (styles.helperText) validatedStyles.helperText = styles.helperText;
	}
	return validatedStyles;
}