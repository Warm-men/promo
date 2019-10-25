import ZhiMaCredit from 'src/app/containers/zhima_credit'

export default WrappedComponent =>
  class extends React.Component {
    constructor(props) {
      super(props)
      this.isNotCreditList = ['h5_page', 'kol_activity']
      this.isValid =
        (props.customer.credit_scores &&
          props.customer.credit_scores.length !== 0) ||
        props.authentication.isSubscriber
    }

    render() {
      const {
        location: {
          query: { next_page }
        }
      } = this.props
      if (_.includes(this.isNotCreditList, next_page))
        return <WrappedComponent {...this.props} />
      return this.isValid ? (
        <WrappedComponent {...this.props} />
      ) : (
        <ZhiMaCredit {...this.props} />
      )
    }
  }
