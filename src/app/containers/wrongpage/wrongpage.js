import React, { Component } from 'react'
import 'src/assets/stylesheets/components/desktop/wrong/wrong.scss'

class WrongPage extends Component {
  render() {
    const { errorInfo, errorHandle } = this.props
    return (
      <div className="wrong-page">
        <div className="wrong-img" onClick={errorHandle} />
        <div className="wrong-text">
          {!errorInfo ? (
            `未知错误！`
          ) : (
            <div>
              <p>{errorInfo.name}</p>
              <p>{errorInfo.message}</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default WrongPage
