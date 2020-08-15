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
				position: 'relative',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
				justifyContent: 'center',
				outline: 'none',
				border: 'none',
				borderRadius: '4px',
				overflow: 'hidden',
				color: _theme[variant].text
			},
			'>div': {
				position: 'relative',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
				justifyContent: 'center',
				borderRadius: 0
			},
			'[data-disabled=true]': {
				color: _theme.disabled.light
			},
			'[data-error=true] .helperText': {
				color: _theme.error.main
			}
		},
		input: {
			default: {
				border: `1px solid ${_theme.disabled.main}`,
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
				color: _theme.muted.main
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
			'[data-error=true]': {
				borderColor: _theme.error.light
			},
			'[data-error=true] ~ .label': {
				color: _theme.error.main,
				borderColor: _theme.error.light
			},
			'[disabled]': {
				backgroundColor: _theme.disabled.main,
				borderColor: _theme.disabled.dark,
				color: _theme.disabled.dark
			},
			'[disabled]::placeholder': {
				color: _theme.disabled.main
			},
			'[disabled] ~ .label': {
				color: _theme.disabled.dark
			}
		},
		label: {
			default: {
				position: 'absolute',
				transform: 'translate(0, -50%)',
				top: '50%',
				left: '16px',
				color: _theme.muted.dark,
				fontSize: '12pt',
				pointerEvents: 'none',
				transition: 'top .25s, font-size .25s'
			}
		},
		helperText: {
			default: {
				alignSelf: 'flex-start',
				color: _theme.muted.main,
				fontSize: '10pt',
				padding: '4px 0 0 8px'
			}
		}
	}
};

export function stylesValidator(styles) {
	const validatedStyles = {};
	if (styles) {
		if (styles.root) validatedStyles.root = styles.root;
		if (styles.input) validatedStyles.input = styles.input;
		if (styles.helperText) validatedStyles.helperText = styles.helperText;
		if (styles.label) validatedStyles.label = styles.label;
	}
	return validatedStyles;
}