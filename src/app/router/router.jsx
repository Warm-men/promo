import React, { PureComponent } from 'react'
import * as AsyncComponents from 'src/app/router/ImportComponents'
import { Route, Switch, withRouter } from 'react-router-dom'
@withRouter
export default class App extends PureComponent {
  componentDidUpdate(prevProps, prevState) {
    this.scrollPosition(prevProps, this.props)
  }

  scrollPosition = (preState, nextState) => {
    //storage current scroll position
    const preStoragePos = !window.SCROLL_ELEMENT
      ? document.documentElement.scrollTop || document.body.scrollTop
      : document[window.SCROLL_ELEMENT].scrollTop
    if (!window.SCROLL_ELEMENT && preStoragePos) {
      const { scrollTop } = document.body
      window.SCROLL_ELEMENT =
        scrollTop && _.isNumber(scrollTop) ? 'body' : 'documentElement'
    }
    const { pathname, search } = preState.location
    sessionStorage.setItem(pathname + search, preStoragePos)
    //restore next page scroll position
    if (window.SCROLL_ELEMENT) {
      const { pathname, search } = nextState.location
      let nextStoragePos = sessionStorage.getItem(pathname + search)
      nextStoragePos = nextStoragePos ? parseInt(nextStoragePos, 10) : 0
      document[window.SCROLL_ELEMENT].scrollTop = nextStoragePos
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={AsyncComponents.AsyncKolContainer} />
        <Route
          path="/promo/kol_activity"
          component={AsyncComponents.AsyncKolContainer}
        />
        <Route
          path="/promo/seventy_nine"
          component={AsyncComponents.AsyncSeventyNine}
        />
        <Route
          path="/promo/vacation"
          component={AsyncComponents.AsyncVacation}
        />
        <Route
          path="/promo/single_btn_page"
          component={AsyncComponents.AsyncSingleBtnPage}
        />
        <Route
          path="/promo/jd/email/homepage"
          component={AsyncComponents.AsyncJdEmail}
        />
        <Route
          path="/promo/coupon_success"
          component={AsyncComponents.AsyncCouponSuccess}
        />
        <Route
          path="/promo/coupon_fail"
          component={AsyncComponents.AsyncCouponFail}
        />
        <Route
          path="/promo/newyear_activity"
          component={AsyncComponents.AsyncNewYearActivity}
        />
        <Route
          path="/promo/video_pages"
          component={AsyncComponents.AsyncVideoPages}
        />
        <Route
          path="/promo/agreement_pages"
          component={AsyncComponents.AsyncAgreementPages}
        />
        <Route path="/promo/quiz" component={AsyncComponents.AsyncQuiz} />
        <Route
          path="/promo/video_page_two_player"
          component={AsyncComponents.AsyncVideoPagesTwoPlayer}
        />
      </Switch>
    )
  }
}
