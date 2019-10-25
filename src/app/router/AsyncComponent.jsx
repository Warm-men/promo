import React, { Component } from 'react'
import LoadingViewContainer from '../components/LoadingViewContainer'

export default function asyncComponent(importComponent) {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        component: null
      }
    }
    async componentDidMount() {
      const { default: component } = await importComponent()
      this.setState({
        component: component
      })
    }
    render() {
      const C = this.state.component
      return C ? <C {...this.props} /> : <LoadingViewContainer />
    }
  }
}
