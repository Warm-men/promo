import { Router } from 'react-router-dom'
import React from 'react'
import { Provider } from 'react-redux'
import Store, { persistor } from 'src/app/store/store.js'
import { PersistGate } from 'redux-persist/es/integration/react'
import Tips from 'src/app/components/tips/tips'
import Actions from 'src/app/actions/actions'
import urlTimestamp from 'src/app/lib/url_timestamp'
import DeviceType from 'src/app/lib/device_type'
import { addPlatformSelector } from 'src/app/lib/user_agent_selectors'
import WithErrorHandle from 'src/app/components/HOC/with_errorhandle/witherrorhandle'
import createBrowserHistory from 'history/createBrowserHistory'
import Routers from './router'
const browserHistory = createBrowserHistory()

class App extends React.PureComponent {
  componentDidMount() {
    window._hmt.push(['_setAutoPageview', true])
    addPlatformSelector(Store)
    this.fetchCurrentCustomer()
  }

  fetchCurrentCustomer = () => {
    const app = Store.getState()
    if (!app.customer || !app.customer.id) {
      Store.dispatch(
        Actions.currentCustomer.fetchMe(
          this.currentMeSuccess,
          this.currentMeError
        )
      )
    }
  }

  currentMeSuccess = (dispatch, res) => {
    if (res.data.me === null) {
      this.needsSignin()
    } else {
      Store.dispatch(
        Actions.tips.changeTips({
          isShow: false,
          content: ''
        })
      )
    }
  }

  needsSignin = () => {
    const { isWechat } = Store.getState().app
    if (isWechat) {
      // FIXME:router不能跳转其他界面，如果baidu.com等，只能路由内path
      const WECHAT_AUTH_PATH = '/profile/auth/wechat'
      if (!window.location.pathname.match(WECHAT_AUTH_PATH)) {
        const newHref = `${
          global.USER_HOST
        }${WECHAT_AUTH_PATH}?return_uri=${encodeURIComponent(
          urlTimestamp(window.location.href)
        )}${window.location.search.replace('?', '&')}`
        const href = DeviceType().isAndroid ? urlTimestamp(newHref) : newHref
        window.location.replace(href)
      }
    }
  }

  currentMeError = () => {
    Store.dispatch(
      Actions.tips.changeTips({
        isShow: false,
        content: ''
      })
    )
    this.needsSignin()
  }

  render() {
    return (
      <Provider store={Store}>
        <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
          <Router history={browserHistory}>
            <Routers />
          </Router>
          <Tips />
        </PersistGate>
      </Provider>
    )
  }
}

export default WithErrorHandle(App, Store.dispatch)
