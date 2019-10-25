import React from 'react'
import { connect } from 'react-redux'
import PageHelmet from 'src/app/lib/pagehelmet'
import LoadingViewContainer from 'src/app/components/LoadingViewContainer'
import BaseConfig from '../base_config'
import ProgressiveImage from 'src/app/components/ProgressiveImage'
import { placeholder_500_750 } from 'src/assets/placeholder'
import './index.scss'

const getState = state => {
  const { customer } = state
  return {
    customer
  }
}
@connect(getState)
export default class SingleBtnPage extends BaseConfig {
  gotoLogin = () => {
    const { btnUrl } = this.state.config
    if (_.includes(btnUrl, 'https://')) {
      window.location.href = btnUrl
    } else {
      window.location.href = `https://${window.location.host}${btnUrl}`
    }
  }

  renderData = data => {
    return _.map(data, (v, k) => (
      <ProgressiveImage key={k} src={v} placeholder={placeholder_500_750}>
        {image => <img src={image} alt="" />}
      </ProgressiveImage>
    ))
  }

  render() {
    const { config } = this.state
    if (this.isEmptyData()) return <LoadingViewContainer />
    const { header, footer, video1, video2 } = this.state.config
    let style = {}
    if (config.isNotFixed) {
      style = {
        position: 'absolute',
        backgroundColor: 'transparent',
        bottom: 25,
        bottomTop: 'none'
      }
    }
    const btnColor = !!config.btnColor
      ? `join-btn ${config.btnColor}`
      : 'join-btn'
    const videoPagesStyle = config.isHideBtn
      ? 'video-pages'
      : 'video-pages paddingBottom'
    return (
      <div className={videoPagesStyle}>
        <PageHelmet
          title={config.title}
          link="/video_page"
          shareTitle={config.shareTitle}
          shareUrl={config.shareLink}
          miniAppShareImgUrl={config.miniAppShareImgUrl}
        />
        <div
          className="video-box"
          style={{ backgroundColor: config.videoColor1 }}
        >
          <div className="video-container">
            <video
              ref={refs => (this.video1 = refs)}
              preload="true"
              className="activi-movie"
              src={video1}
              controls="controls"
              poster={config.poster1}
              onEnded={this.handleEnded}
            >
              您的浏览器不支持 video 标签。
            </video>
          </div>
        </div>
        {this.renderData(header)}
        <div
          className="video-box"
          style={{ backgroundColor: config.videoColor2 }}
        >
          <div className="video-container">
            <video
              ref={refs => (this.video2 = refs)}
              preload="true"
              className="activi-movie"
              src={video2}
              controls="controls"
              poster={config.poster2}
              onEnded={this.handleEnded}
            >
              您的浏览器不支持 video 标签。
            </video>
          </div>
        </div>
        {this.renderData(footer)}
        {!config.isHideBtn && (
          <div className="bottom-btn" style={style}>
            <div className={btnColor} onClick={this.gotoLogin}>
              {config.btnText}
            </div>
          </div>
        )}
      </div>
    )
  }
}
