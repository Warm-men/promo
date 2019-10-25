import React from 'react'
import { connect } from 'react-redux'
import PageHelmet from 'src/app/lib/pagehelmet'
import LoadingViewContainer from 'src/app/components/LoadingViewContainer'
import BaseConfig from '../base_config'
import './index.scss'

const getState = state => {
  return {
    customer: state.customer,
    isWechat: /MicroMessenger/i.test(navigator.userAgent)
  }
}
@connect(getState)
export default class SingleBtnPage extends BaseConfig {
  handleUrl = url =>
    `${url}${_.includes(url, '?') ? '&' : '?'}tote_id=${
      this.query.tote_id
    }&isTotesPgae=true`

  gotoLogin = () => {
    const { btnUrl } = this.state.config
    const url = _.includes(btnUrl, 'https://')
      ? btnUrl
      : `${window.location.origin}${btnUrl}`
    if (this.query.isPreventGoback) {
      const newUrl = this.query.tote_id ? this.handleUrl(url) : url
      window.location.replace(newUrl)
    } else {
      window.location.href = url
    }
  }

  render() {
    const { config } = this.state
    if (this.isEmptyData()) return <LoadingViewContainer />
    return (
      <div
        className="single-pages"
        style={{
          paddingBottom: config.isNotFixed || config.isHideBtn ? 0 : 60
        }}
      >
        <PageHelmet
          title={config.title}
          link="/kol_activity"
          shareTitle={config.shareTitle}
          shareUrl={config.shareLink}
          miniAppShareImgUrl={config.miniAppShareImgUrl}
        />
        {this.renderImages()}
        {!config.isHideBtn && (
          <div
            className="bottom-btn"
            style={{
              position: config.isNotFixed ? 'absolute' : 'fixed',
              backgroundColor: config.isNotFixed ? 'transparent' : '#ffffff',
              bottom: config.isNotFixed ? 25 : 0
            }}
          >
            <div className="join-btn" onClick={this.gotoLogin}>
              {config.btnText}
            </div>
          </div>
        )}
      </div>
    )
  }
}
