import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './checkbox.module.css';

/**
 * @author {@link https://github.com/Chiefbark Chiefbark}
 * @param props properties of the component
 * @see Checkbox.propTypes
 * @return {React.Component}
 */
function Checkbox(props) {
	const {initialState, disabled, color, colorChecked, onStateChange, style, children, ...others} = props;
	const inputRef = useRef(null);
	const [state, setState] = useState(initialState);
	useEffect(() => {
		onStateChange && onStateChange(state);
		inputRef.current.checked = state;
	}, [onStateChange, state]);

	return (
		<div className={styles.root} style={{...{cursor: disabled ? 'default' : 'pointer'}, ...style}}
		     onClick={() => !disabled && setState(!state)}>
			<input type={'checkbox'} disabled={disabled} value={state} aria-disabled={disabled} aria-checked={state}
			       ref={inputRef} style={{display: 'none'}}
			       {...others}/>
			<svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox={'0 0 24 24'}
			     style={{
				     backgroundColor: disabled ? 'transparent' : state ? colorChecked : 'transparent',
				     borderColor: disabled ? '#bdbdbd' : state ? colorChecked : color
			     }}>
				{state &&
				<path fill={color} d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
				}
			</svg>
			<span style={{color: disabled ? '#bdbdbd' : '#dddddd'}}>
				{children}
			</span>
		</div>
	)
}

Checkbox.propTypes = {
	/**
	 * Defines if the component is checked or not
	 *
	 * `boolean` - default `false`
	 */
	initialState: PropTypes.bool,
	/**
	 * Defines if the component is disabled or not
	 *
	 * `boolean` - default `false`
	 */
	disabled: PropTypes.bool,
	/**
	 * Color when the component is not checked
	 *
	 * Applied to border and icon
	 *
	 * `string` - default `#dddddd`
	 */
	color: PropTypes.string,
	/**
	 * Color when the component is checked
	 *
	 * Applied to background and border
	 *
	 * `string` - default `#2196f3`
	 */
	colorChecked: PropTypes.string,
	/**
	 * Triggered when the state of the component changes
	 *
	 * `function(state)`
	 */
	onStateChange: PropTypes.func,
	/**
	 * Overrides the styles of the checkbox
	 *
	 * `styles`
	 */
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

Checkbox.defaultProps = {
	initialState: false,
	disabled: false,
	color: '#dddddd',
	colorChecked: '#2196f3'
}

export default Checkbox;