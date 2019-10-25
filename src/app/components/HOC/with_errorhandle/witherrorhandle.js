/*
    用法
    withErrorHandle(WrappedComponent(当前组件), callback（错误回调）, fallbackView（错误显示界面）) 
*/
// import { browserHistory } from 'react-router'
import WrongPage from 'src/app/containers/wrongpage/wrongpage'

const withErrorHandler = (WrappedComponent, callback, fallbackView) => {
  class WithErrorHandler extends React.Component {
    constructor(props) {
      super(props)
      this.state = { hasError: false }
    }

    componentDidCatch(error, info) {
      this.setState({
        hasError: true,
        error,
        errorInfo: info
      })
      // callback && callback(error, info, this.props)
      const errorInfo = {
        error,
        errorInfo: info
      }
      callback && callback(this.reportErrorMessage(errorInfo))
    }

    reportErrorMessage = errorInfo => ({
      //NOTE: update error message to server
      type: 'REPORT:ERROR:MESSAGE',
      API: true,
      method: 'GET',
      url: `/static/err?stack=${encodeURIComponent(JSON.stringify(errorInfo))}`
    })

    errorResolve = () => {
      // FIXME：目前错误处理,在错误界面点击图标先跳转首页刷新，后续进行调整
      window.location.href = '/'
    }

    render() {
      return this.state.hasError ? (
        <WrongPage
          errorInfo={this.state.error}
          errorHandle={this.errorResolve}
        />
      ) : (
        <WrappedComponent {...this.props} />
      )
    }
  }

  return WithErrorHandler
}

export default withErrorHandler
