import React, { Component } from 'react'
import AnswerItem from './answerItem'
import TextBox from './textBox'

export default class Question extends Component {
  constructor(props) {
    super(props)
    this.state = { selectedIndexs: [], showSingleWithText: false }
    this.textareaMaxlength = 300

    this.optionIds = []
    this.singlTextValue = null
    this.singleWithTextValue = null
  }

  _didSelected = (item, key) => {
    const { quizItem, updateQuizResult } = this.props
    let newOptionIds = []
    let newSelectedIndexs = []
    switch (quizItem.q_type) {
      case 'single':
        newOptionIds[0] = item.id
        newSelectedIndexs[0] = key
        break
      case 'multi':
        if (this.state.selectedIndexs.includes(key)) {
          newSelectedIndexs = _.remove(
            this.state.selectedIndexs,
            value => value !== key
          )
          newOptionIds = _.remove(this.optionIds, value => value !== item.id)
        } else {
          newSelectedIndexs = _.uniq([...this.state.selectedIndexs, key])
          newOptionIds = _.uniq([...this.optionIds, item.id])
        }
        break
      case 'single_with_text':
        this.singleWithTextValue = item.content
        newSelectedIndexs[0] = key
        if (key === quizItem.options.length) {
          this.setState({ showSingleWithText: true })
        } else {
          this.setState({ showSingleWithText: false })
        }
        break
      default:
        newOptionIds = []
        newSelectedIndexs = []
    }
    this.setState({ selectedIndexs: newSelectedIndexs })
    this.optionIds = newOptionIds

    if (updateQuizResult) {
      this._didFinished(true)
    }
  }

  _didFinished = isUpdate => {
    const { didFinished, updateQuizResult, quizItem } = this.props
    const { q_type, optional } = quizItem

    if (q_type === 'text' && _.isEmpty(this.singlTextValue) && !optional) {
      return null
    }

    const { showSingleWithText } = this.state
    if (showSingleWithText && _.isEmpty(this.singleWithTextValue)) return null

    if (q_type === 'text') {
      if (isUpdate === true) {
        updateQuizResult(quizItem, this.singlTextValue)
      } else {
        didFinished(quizItem, this.singlTextValue, this._resetState)
      }
    } else if (q_type === 'single_with_text') {
      if (isUpdate === true) {
        updateQuizResult(quizItem, this.singleWithTextValue)
      } else {
        didFinished(quizItem, this.singleWithTextValue, this._resetState)
      }
    } else {
      if (isUpdate === true) {
        updateQuizResult(quizItem, this.optionIds)
      } else {
        didFinished(quizItem, this.optionIds, this._resetState)
      }
    }
  }

  _resetState = () => {
    this.optionIds = []
    this.singlTextValue = null
    this.singleWithTextValue = null
    this.setState({ selectedIndexs: [] })
  }

  updateSinglTextValue = value => {
    this.singlTextValue = value
    const { updateQuizResult } = this.props
    if (updateQuizResult) {
      this._didFinished(true)
    }
  }
  upSingleWithTextValue = value => {
    this.singleWithTextValue = value
    const { updateQuizResult } = this.props
    if (updateQuizResult) {
      this._didFinished(true)
    }
  }
  resetScroll = () => window.scroll(0, 0)

  render() {
    const { quizItem, quizLength, quizIndex, submitText } = this.props

    const quizOptions =
      quizItem.q_type === 'single_with_text'
        ? [...quizItem.options, { content: '其他', type: 'text' }]
        : quizItem.options

    const { showSingleWithText, selectedIndexs } = this.state

    return (
      <div className={'container'}>
        <div className={'scrollwrapper'}>
          {quizLength > 1 ? (
            <div>
              <div className={'index-wrapper'}>
                <span className={'quizIndex'}>{quizIndex + 1}</span>
                <span className={'quizLength'}>/{quizLength}</span>
              </div>
              <div className={'title-wrapper'}>
                <div className={'title'}>{quizItem.content}</div>
              </div>
            </div>
          ) : (
            <div>
              <div className={'title-wrapper fix-center'}>
                <div className={'title'}>{quizItem.content}</div>
              </div>
            </div>
          )}
          <div className={'answer-list'}>
            {quizItem.q_type === 'text' && (
              <TextBox
                updateOnChange={this.updateSinglTextValue}
                placeholder="请填写"
                textareaMaxlength={this.textareaMaxlength}
                onBlur={this.resetScroll}
              />
            )}
            {quizOptions &&
              quizItem.q_type !== 'text' &&
              quizOptions.map((item, index) => {
                return (
                  <AnswerItem
                    index={index}
                    key={index}
                    isSelected={selectedIndexs.includes(index)}
                    answer={item}
                    didSelected={this._didSelected}
                  />
                )
              })}
            {showSingleWithText && (
              <TextBox
                updateOnChange={this.upSingleWithTextValue}
                placeholder="请填写"
                textareaMaxlength={this.textareaMaxlength}
                height={100}
                onBlur={this.resetScroll}
              />
            )}
          </div>
        </div>
        <div
          className={'nextButton fix_button_positions'}
          onClick={this._didFinished}
        >
          {submitText || '提交'}
        </div>
      </div>
    )
  }
}
