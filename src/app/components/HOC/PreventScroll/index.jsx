export default TargetComponent => {
  class PreventScroll extends React.Component {
    getDom = tag => document.getElementsByTagName(tag)[0].style

    componentDidMount() {
      this.overflowHidden()
    }

    componentWillUnmount() {
      this.styleInit()
    }

    overflowHidden = () => {
      const bodyStlye = this.getDom('body'),
        htmlStlye = this.getDom('html')

      htmlStlye.overflow = 'hidden' // NOTE: compatible ios
      bodyStlye.overflowY = 'hidden'
      bodyStlye.height = '100%'
      bodyStlye.width = '100%'
      bodyStlye.position = 'fixed'
    }

    styleInit = () => {
      const bodyStlye = this.getDom('body'),
        htmlStlye = this.getDom('html')

      bodyStlye.overflowY = 'auto'
      bodyStlye.position = 'static'
      htmlStlye.overflow = 'auto'
    }

    render() {
      return <TargetComponent {...this.props} />
    }
  }
  return PreventScroll
}
