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
				borderRadius: 0,
				flexWrap: 'nowrap'
			},
			' input:focus ~ .track': {
				outline: `${_theme[variant].light} auto 1px`
			},
			'[data-disabled=true]': {
				color: _theme.disabled.dark
			},
			'[data-error=true] .helperText': {
				color: _theme.error.main
			},
		},
		track: {
			default: {
				backgroundColor: _theme.muted.main,
				border: `1px solid transparent`,
				borderRadius: '20px',
				width: '40px',
				height: '20px',
				marginRight: '8px',
				transition: 'background .15s'
			},
			'>div': {
				backgroundColor: _theme.muted.light,
				width: '20px',
				height: '20px',
				borderRadius: '10px',
				transition: 'transform .15s, background .15s, border .15s'
			},
			'[data-checked=true]': {
				backgroundColor: _theme[variant].light,
				borderColor: _theme[variant].dark
			},
			'[data-checked=true]>div': {
				backgroundColor: _theme[variant].dark,
				transform: 'translate(100%, 0)'
			},
			'[data-checked=true][data-error=true]': {
				backgroundColor: _theme.error.light,
				borderColor: _theme.error.dark
			},
			'[data-error=true]>div': {
				borderColor: _theme.error.main,
				backgroundColor: _theme.error.dark
			},
			'[data-disabled=true]': {
				backgroundColor: _theme.disabled.main,
				borderColor: 'transparent'
			},
			'[data-disabled=true]>div': {
				backgroundColor: _theme.disabled.dark
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
		if (styles.track) validatedStyles.track = styles.track;
		if (styles.label) validatedStyles.label = styles.label;
		if (styles.helperText) validatedStyles.helperText = styles.helperText;
	}
	return validatedStyles;
}