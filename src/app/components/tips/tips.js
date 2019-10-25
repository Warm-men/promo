import React from 'react'
import { connect } from 'react-redux'
import Actions from 'src/app/actions/actions'
import './tips.scss'

/*
    用法
    this.props.dispatch(
        Actions.tips.changeTips({
            isShow:显示与否（boolean）,
            content:内容（string）,
            timer:显示秒数(number，默认2)
        })
    )
*/

class Tips extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tips.isShow !== this.props.tips.isShow) {
      if (this.props.tips.isShow) {
        const timer = this.props.tips.timer || prevProps.tips.timer
        this.timer && clearTimeout(this.timer)
        this.setTime(timer)
      }
    }
  }

  setTime = timer => {
    this.timer = setTimeout(() => {
      this.changeState()
    }, timer * 1000)
  }

  changeState = () => {
    this.props.dispatch(Actions.tips.changeTips())
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }

  render() {
    const { image, isShow, content, position } = this.props.tips
    const className = position === 'center' ? 'tips_center' : 'tips_normol'
    return (
      <div className={`${isShow ? className : 'hidden'}`}>
        {image && <img src={image} alt="" />}
        <span
          className="alert-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    tips: state.tips,
    customer: state.customer
  }
}

export default connect(mapStateToProps)(Tips)
