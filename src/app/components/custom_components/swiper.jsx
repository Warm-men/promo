import React from 'react'
import { findDOMNode } from 'react-dom'
import Swiper from 'react-id-swiper'
import 'react-id-swiper/src/styles/css/swiper.css'
import './swiper.scss'

export default class CustomSwiper extends React.PureComponent {
  constructor(props) {
    super(props)
    this.options = {
      slidesPerView: 'auto',
      paginationClickable: true,
      freeMode: true,
      freeModeMinimumVelocity: 0.1,
      preloadImages: false,
      lazy: true,
      spaceBetween: props.spaceBetween,
      on: {
        touchEnd: _.debounce(this.setTouchPosition, 100, {
          leading: true
        }),
        transitionEnd: _.debounce(this.setTouchPosition, 100, {
          leading: true
        })
      },
      ...props
    }
  }

  componentDidMount() {
    this.cacheId =
      this.props.dataArr && JSON.stringify(this.props.dataArr).slice(0, 20)
    const cacheStyle = sessionStorage.getItem(this.cacheId)
    if (cacheStyle && this.swiperDom) {
      findDOMNode(this.swiperDom).childNodes[0].style.transform = cacheStyle
    }
  }

  setTouchPosition = () => {
    if (!this.swiperDom) {
      return
    }
    const initPosition = findDOMNode(this.swiperDom).childNodes[0].style
      .transform
    sessionStorage.setItem(this.cacheId, initPosition)
  }

  createList = () => {
    const { dataArr, renderItem } = this.props
    const length = dataArr.length
    const childrens = []
    for (var i = 0; i < length; i++) {
      const item = renderItem(i, i, dataArr[i])
      childrens.push(item)
    }
    return childrens
  }

  render() {
    return this.props.dataArr.length === 0 &&
      this.props.children === undefined ? null : (
      <Swiper
        ref={ref => (this.swiperDom = ref)}
        slideClass="custom-swiper-slide"
        wrapperClass="custom-swiper-wrapper"
        {...this.options}
      >
        {this.createList()}
        {this.props.children}
      </Swiper>
    )
  }
}

CustomSwiper.defaultProps = {
  spaceBetween: 0,
  renderItem: () => {},
  dataArr: []
}
