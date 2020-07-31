import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './button.module.css';
import path from 'path';

/**
 * @author {@link https://github.com/Chiefbark Chiefbark}
 * @param props properties of the component
 * @see Button.propTypes
 * @return {React.Component}
 */
function Button(props) {
	const {leftIcon: LeftIcon, rightIcon: RightIcon, className, style, hoverStyle, activeStyle, children, onMouseDown, onMouseUp, onMouseEnter, onMouseLeave, ...others} = props;

	const [hover, isHover] = useState(false);
	const [active, isActive] = useState(false);

	let buttonStyles = {...{cursor: others.disabled ? 'default' : 'pointer'}, ...style.button};
	let iconStyles = style.icon;
	if (hover) {
		buttonStyles = {...buttonStyles, ...hoverStyle.button};
		iconStyles = {...iconStyles, ...hoverStyle.icon};
	}
	if (active) {
		buttonStyles = {...buttonStyles, ...activeStyle.button};
		iconStyles = {...iconStyles, ...hoverStyle.icon};
	}

	return (
		<button type={'button'}
		        className={`${styles.root} ${className.button}`.trim()}
		        style={buttonStyles}
		        aria-disabled={others.disabled}
		        onMouseDown={() => {
			        isActive(true);
			        onMouseDown && onMouseDown();
		        }}
		        onMouseUp={() => {
			        isActive(false);
			        onMouseUp && onMouseUp();
		        }}
		        onMouseEnter={() => {
			        isHover(true);
			        onMouseEnter && onMouseEnter();
		        }}
		        onMouseLeave={() => {
			        isHover(false);
			        onMouseLeave && onMouseLeave();
		        }}
		        {...others}>
			{
				typeof LeftIcon === 'string' ?
					<img src={LeftIcon} alt={path.basename(LeftIcon, path.extname(LeftIcon))}
					     className={`${styles.iconLeft} ${className.icon}`.trim()}
					     style={iconStyles}/>
					:
					LeftIcon &&
					<LeftIcon className={`${styles.iconLeft} ${className.icon}`.trim()} style={iconStyles}/>
			}
			{children}
			{
				typeof RightIcon === 'string' ?
					<img src={RightIcon} alt={path.basename(RightIcon, path.extname(RightIcon))}
					     className={`${styles.iconRight} ${className.icon}`.trim()}
					     style={iconStyles}/>
					:
					RightIcon &&
					<RightIcon className={`${styles.iconRight} ${className.icon}`.trim()} style={iconStyles}/>
			}
		</button>
	)
}

Button.propTypes = {
	/**
	 * Displays an icon before the text. Can be either a component or a path/url to the image
	 *
	 * `React Element | string`
	 */
	leftIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	/**
	 * Displays an icon after the text. Can be either a component or a path/url to the image
	 *
	 * `React Element | string`
	 */
	rightIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	/**
	 * ClassNames for the button and icon
	 *
	 * `{button: string, icon: string}`
	 */
	className: PropTypes.shape({button: PropTypes.string, icon: PropTypes.string}),
	/**
	 * Styles for the button and icon
	 *
	 * `{button: styles, icon: styles}`
	 */
	style: PropTypes.shape({button: PropTypes.object, icon: PropTypes.object}),
	/**
	 * Styles for the button and icon when the component is hovered
	 *
	 * `{button: styles, icon: styles}`
	 */
	hoverStyle: PropTypes.shape({button: PropTypes.object, icon: PropTypes.object}),
	/**
	 * Styles for the button and icon when the component is pressed
	 *
	 * `{button: styles, icon: styles}`
	 */
	activeStyle: PropTypes.shape({button: PropTypes.object, icon: PropTypes.object})
}

Button.defaultProps = {
	disabled: false,
	className: {button: '', icon: ''},
	style: {button: {}, icon: {}},
	hoverStyle: {button: {}, icon: {}},
	activeStyle: {button: {}, icon: {}}
}
export default Button;