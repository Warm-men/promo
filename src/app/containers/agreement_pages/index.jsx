import React from 'react'
import { connect } from 'react-redux'
import PageHelmet from 'src/app/lib/pagehelmet'
import LoadingViewContainer from 'src/app/components/LoadingViewContainer'
import BaseConfig from '../base_config'
import './index.scss'

const getState = state => {
  const { customer } = state
  return {
    customer,
    isWechat: /MicroMessenger/i.test(navigator.userAgent)
  }
}
@connect(getState)
export default class AgreementPages extends BaseConfig {
  gotoLogin = () => {
    const { btnUrl } = this.state.config
    if (_.includes(btnUrl, 'https://')) {
      window.location.href = btnUrl
    } else {
      window.location.href = `https://${window.location.host}${btnUrl}`
    }
  }

  gotoAgreement = () => {
    const { agreementUrl } = this.state.config
    if (_.includes(agreementUrl, 'https://')) {
      window.location.href = agreementUrl
    } else {
      window.location.href = `https://${window.location.host}${agreementUrl}`
    }
  }

  render() {
    const { config } = this.state
    if (this.isEmptyData()) return <LoadingViewContainer />
    return (
      <div
        className="single-pages"
        style={{
          paddingBottom: config.isNotFixed ? 0 : 60
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
        <div className="agreement-text" onClick={this.gotoAgreement}>
          {config.agreementText}
        </div>
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
