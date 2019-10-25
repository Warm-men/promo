import React from 'react'
import { pure } from 'recompose'
import PreventScroll from 'src/app/components/HOC/PreventScroll'
import './index.scss'

const Alert = ({
  icon,
  title,
  content,
  handleClick,
  btnText,
  children,
  handleClose
}) => (
  <div className="alert-modal">
    <span className="shade" />
    <div className="hint-alert">
      <div className="top-text">
        {icon && <img className="icon" src={icon} alt="" />}
        {title && <p className="title">{title}</p>}
        {_.isEmpty(children) ? (
          <span className="top-content">{content}</span>
        ) : (
          children
        )}
        {btnText ? (
          <div className="btn-same alert-btn" onClick={handleClick}>
            {btnText}
          </div>
        ) : (
          <div className="error-text" />
        )}
      </div>
      <span className="icon-close" onClick={handleClose} />
    </div>
  </div>
)

export default pure(PreventScroll(Alert))
