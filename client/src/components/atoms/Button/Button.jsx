import React from 'react'
import './Button.css'

const Button = ({ButtonEvent,buttoType="button",ariaLabel,buttonStyles,buttonText,leftIcon,leftIconStyle,rightIcon,rightIconStyle,disabledButton}) => {
  return (
    <button
    type={buttoType}
      onClick={ButtonEvent}
      disabled={disabledButton}
      aria-label={ariaLabel}
      className={`button-effect relative overflow-hidden transition-all duration-300 ${buttonStyles}`}
    >
      {/* Animation background element */}
      <span className="button-effect-background"></span>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {leftIcon && <span className={leftIconStyle}>{leftIcon}</span>}
        {buttonText && <span>{buttonText}</span>}
        {rightIcon && <span className={rightIconStyle}>{rightIcon}</span>}
      </div>
    </button>
  )
}

export default Button