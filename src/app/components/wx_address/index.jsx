import React, { Component } from 'react'
// import classname from 'classnames'
import './index.scss'
import wxInit from 'src/app/lib/wx_config.js'
import PropTypes from 'prop-types'

export default class WxAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSuccess: false,
      full_name: props.customer_shipping_address.full_name, // 收货人姓名
      zip_code: props.customer_shipping_address.zip_code, // 邮编
      state: props.customer_shipping_address.state, // 国标收货地址第一级地址（省）
      city: props.customer_shipping_address.city, // 国标收货地址第二级地址（市）
      district: props.customer_shipping_address.district, // 国标收货地址第三级地址（区）
      address: props.customer_shipping_address.address_1, // 详细收货地址信息
      nationalCode: '', // 收货地址国家码
      telephone: props.customer_shipping_address.telephone // 收货人手机号码
    }
    this.isValid = this.validData(this.state)
  }

  componentDidMount() {
    this.props.getAddressInfo(this.getData())
    setTimeout(() => {
      wxInit()
    }, 100)
  }

  validData = data =>
    !!(
      data.address &&
      data.state &&
      data.city &&
      data.telephone &&
      data.full_name &&
      data.zip_code
    )

  getData = () => {
    const { customer_shipping_address } = this.props
    const { address, state, city, zip_code, telephone, full_name } = this.state
    const isChanged =
      customer_shipping_address.address_1 !== address ||
      customer_shipping_address.state !== state ||
      customer_shipping_address.city !== city ||
      customer_shipping_address.telephone !== telephone ||
      customer_shipping_address.full_name !== full_name ||
      customer_shipping_address.zip_code !== zip_code
    return {
      isValid: this.isValid,
      isChanged: isChanged,
      addressInfo: this.state
    }
  }

  handleAddress = () => {
    wx.ready(() => {
      wx.openAddress({
        success: res => {
          const validAddress = {
            isSuccess: true,
            full_name: res.userName,
            zip_code: res.postalCode,
            state: res.provinceName,
            city: res.cityName,
            district: res.countryName,
            address: res.detailInfo,
            nationalCode: res.nationalCode,
            telephone: res.telNumber
          }
          this.setState(validAddress, () => {
            this.isValid = this.validData(this.state)
            this.props.getAddressInfo(this.getData())
          })
        },
        fail: error =>
          error.errMsg !== 'openAddress:fail' &&
          wxInit(true, this.handleAddress)
      })
    })
  }
  render() {
    const { full_name, telephone, state, city, address, district } = this.state,
      { hasDefaultValue, isShowInfo, title, tipText } = this.props
    return (
      <div className="wx-address-info">
        <p className="send-title">{title}</p>
        <div className="bg-color">
          <div>
            {(hasDefaultValue || isShowInfo) && `${full_name} ${telephone}`}
          </div>
          <div onClick={this.handleAddress}>
            {hasDefaultValue || isShowInfo
              ? `${state}${city}${district}${address}`
              : `${tipText}`}
          </div>
          <span
            onClick={this.handleAddress}
            className={hasDefaultValue || isShowInfo ? 'address-icon' : ''}
          />
        </div>
      </div>
    )
  }
}

WxAddress.propTypes = {
  title: PropTypes.string,
  tipText: PropTypes.string,
  getAddressInfo: PropTypes.func.isRequired,
  customer_shipping_address: PropTypes.object,
  isShowInfo: PropTypes.bool.isRequired,
  hasDefaultValue: PropTypes.bool
}

WxAddress.defaultProps = {
  title: `地址信息`,
  tipText: `请选择地址信息`,
  getAddressInfo: () => {},
  customer_shipping_address: {},
  isShowInfo: false,
  hasDefaultValue: false
}
