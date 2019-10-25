import React, { PureComponent } from 'react'

export default class AnswerItem extends PureComponent {
  _didSelected = () => {
    const { answer, didSelected, index } = this.props
    didSelected(answer, index)
  }
  render() {
    const { answer, isSelected } = this.props
    return (
      <div
        className={isSelected ? 'isSelected' : 'answerItem'}
        onClick={this._didSelected}
      >
        <span>{answer.content}</span>
      </div>
    )
  }
}
