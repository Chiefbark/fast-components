import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './buttonIcon.module.css';
import path from 'path';

/**
 * @author {@link https://github.com/Chiefbark Chiefbark}
 * @param props properties of the component
 * @see ButtonIcon.propTypes
 * @return {React.Component}
 */
function ButtonIcon(props) {
	const {icon: Icon, className, style, hoverStyle, activeStyle, children, onMouseDown, onMouseUp, onMouseEnter, onMouseLeave, ...others} = props;

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
			{typeof Icon === 'string' ?
				<img src={Icon} alt={path.basename(Icon, path.extname(Icon))}
				     className={`${styles.icon} ${className.icon}`.trim()}
				     style={iconStyles}/>
				:
				<Icon className={`${styles.icon} ${className.icon}`.trim()}
				      style={iconStyles}/>
			}
		</button>
	)
}

ButtonIcon.propTypes = {
	/**
	 * The icon to display. Can be either a component or a path/url to the image
	 *
	 * `React Element | image path`
	 */
	icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
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

ButtonIcon.defaultProps = {
	disabled: false,
	className: {button: '', icon: ''},
	style: {button: {}, icon: {}},
	hoverStyle: {button: {}, icon: {}},
	activeStyle: {button: {}, icon: {}}
}
export default ButtonIcon;