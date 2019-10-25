import { AsyncSesameCredit } from 'src/app/router/ImportComponents'
import ZhiMaCredit from 'src/app/containers/zhima_credit'
import authentication from 'src/app/lib/authentication'

export default WrappedComponent =>
  class extends React.Component {
    constructor(props) {
      super(props)
      this.isValid =
        (props.customer.credit_scores &&
          props.customer.credit_scores.length !== 0) ||
        props.authentication.isSubscriber
    }

    render() {
      const {
        customer,
        location: {
          query: { isZhimaCredit }
        }
      } = this.props
      if (isZhimaCredit && isZhimaCredit === 'zhima_credit') {
        //NOTE: my account page enter only zhima credit, not need mobile verfication
        return authentication(customer).isSubscriber ? (
          <WrappedComponent {...this.props} />
        ) : (
          <ZhiMaCredit {...this.props} />
        )
      } else {
        return customer.telephone ? (
          <WrappedComponent {...this.props} />
        ) : (
          <AsyncSesameCredit />
        )
      }
    }
  }
