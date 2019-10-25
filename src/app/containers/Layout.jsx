export default class Layout extends React.PureComponent {
  render() {
    return (
      <div>
        {/* global_layouts */}
        {this.props.children}
      </div>
    )
  }
}
