import React, { Component } from 'react'
import { Question } from './components'
import Actions from 'src/app/actions/actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PageHelmet from 'src/app/lib/pagehelmet'
import './index.scss'
import { parseQueryString } from 'src/app/lib/parseQueryString'

const getState = state => {
  return {
    isWechat: state.app.isWechat
  }
}

@connect(getState)
@withRouter
export default class QuizComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { quizData: null, quizIndex: 0 }

    this.urlParams = parseQueryString(props.location.search)
    this.questionResult = []

    this.isPaging = true
    this.headerTitle = ''
    if (this.urlParams.slug === 'QUIZSubscribeSuccess') {
      this.isPaging = false
      this.headerTitle = '续费成功'
    }
  }

  componentDidMount() {
    this._getQuizData()
  }

  _getQuizData = () => {
    this.props.dispatch(
      Actions.quiz.getQuizData(this.urlParams.slug, this._getQuizDataSuccess)
    )
  }

  _getQuizDataSuccess = (dispatch, response) => {
    const { quiz } = response.data
    if (quiz) {
      this.setState({ quizData: quiz })
      document.title = quiz.title
      window.postMessage(`${quiz.title}`, '*')
    }
  }

  _showTips = () => {
    this.props.dispatch(
      Actions.tips.changeTips({
        isShow: true,
        content: '请先回答本题',
        position: 'center'
      })
    )
  }

  _finishedCurrentQuestion = (quizItem, itemResult, resetState) => {
    if (this.isLoading) {
      return true
    }
    this.isLoading = true
    if (!quizItem.optional && _.isEmpty(itemResult)) {
      this._showTips()
      this.isLoading = false
      return false
    }
    this._updateQuizResult(quizItem, itemResult)

    if (this.isPaging) {
      this._nextQuestion(resetState)
    } else {
      const { quizData } = this.state
      if (this.questionResult.length === quizData.questions.length) {
        this._confirm()
      } else {
        this.isLoading = false
      }
    }
  }

  _updateQuizResult = (quizItem, itemResult) => {
    const result = { question_id: quizItem.id, q_type: quizItem.q_type }

    if (quizItem.q_type === 'text' || quizItem.q_type === 'single_with_text') {
      result.value = itemResult
    } else {
      result.option_ids = itemResult
    }

    const index = this.questionResult.findIndex(
      i => i.question_id === quizItem.id
    )
    if (index !== -1) {
      this.questionResult[index] = result
    } else {
      this.questionResult.push(result)
    }
  }

  _nextQuestion = resetState => {
    const { quizIndex, quizData } = this.state
    const questionLength = quizData.questions.length

    if (quizIndex < questionLength - 1) {
      let newIndex = quizIndex + 1
      this.setState({ quizIndex: newIndex }, () => {
        resetState && resetState()
      })
      this.isLoading = false
    } else {
      this._confirm()
    }
  }

  _confirm = () => {
    if (this.isConfirmLoading) {
      return true
    }
    this.isConfirmLoading = true
    _.remove(
      this.questionResult,
      value => value.text || (value.option_ids && !value.option_ids.length)
    )
    let input = {
      customer_id: this.urlParams.customer_id,
      slug: this.urlParams.slug,
      quiz_result: this.questionResult
    }
    this.props.dispatch(
      Actions.quiz.confirmQuestionResult(
        input,
        this._confirmQuestionResultSuccess,
        this._confirmQuestionResultError
      )
    )
  }
  _confirmQuestionResultError = () => {
    this.isConfirmLoading = false
  }
  _confirmQuestionResultSuccess = (dispatch, data) => {
    if (data.data.SubmitQuizResult) {
      this.props.dispatch(
        Actions.tips.changeTips({
          isShow: true,
          content: this.state.quizData.complete_hint,
          position: 'center',
          timer: 2,
          image: require('./images/success.svg')
        })
      )
      const message = JSON.stringify({
        type: 'quiz',
        hint: this.state.quizData.complete_hint
      })
      setTimeout(() => {
        window.postMessage(message, '*')
        if (this.props.isWechat) {
          this.props.history.goBack()
          return null
        }
        this.isConfirmLoading = false
      }, 2000)
    }
  }

  render() {
    const { quizData, quizIndex } = this.state
    const title = quizData && quizData.title

    if (this.isPaging) {
      //分页面问卷
      const quizItem = quizData && quizData.questions[quizIndex]
      const quizLength = quizData && quizData.questions.length

      const isLastQuestion = quizLength - 1 === quizIndex
      return (
        <div>
          <PageHelmet title={title} link="/promo/quiz" />
          {quizItem && (
            <Question
              quizLength={quizLength}
              quizIndex={this.state.quizIndex}
              quizItem={quizItem}
              didFinished={this._finishedCurrentQuestion}
              submitText={isLastQuestion ? quizData.submit_text : '下一步'}
            />
          )}
        </div>
      )
    } else {
      //单页面问卷
      if (!quizData || !quizData.questions) {
        return <div />
      }
      return (
        <div className="paging">
          <PageHelmet title={title} link="/promo/quiz" />
          {this.headerTitle ? (
            <div>
              <div className="banner-top" />
              <div className="top-view-wrapper">
                <span className="success-icon" />
                <div className="top-text">{this.headerTitle}</div>
              </div>
            </div>
          ) : null}
          <div className="questions">
            {quizData.questions.map((item, index) => {
              return (
                <Question
                  key={index}
                  quizIndex={index}
                  quizItem={item}
                  didFinished={this._finishedCurrentQuestion}
                  updateQuizResult={this._updateQuizResult}
                  submitText={quizData.submit_text}
                />
              )
            })}
          </div>
        </div>
      )
    }
  }
}
