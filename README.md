# Wechat-Web

# #ENV 使用

NODE_ENV:node.js 的环境变量，属于 node.js 模块，用来设置不同环境的配置；
process.env.NODE_ENV：默认值（development'，也可以自行设置）;

* 项目中使用到了三个 ENV
  * development;(开发环境)
  * production;(生产环境)
  * test;(测试环境)

# #DEV

* `启动`

  * clone 项目到本地，进入 wechat-web
  * npm install or yarn (需装上 node 和 npm or yarn)
    _ npm start or yarn start
    _ localhost:3000

* `proxy`

  ````javascript
  		  	"/api":{
         "target": "https://www.lt-jv.com",
         "secure": false,
         "changeOrigin": true,
         "preserveHeaderKeyCase": true,
         "hostRewrite": true,
         "autoRewrite": true,
         "protocolRewrite": "https",
         "cookieDomainRewrite": {
             " * ": "localhost"
         },
         "auth": "ltjv:pxltEZq9RNdiOqk"(需要验证)
     }
  		```
  ```javascript
  		  	"/wechat": {
         "target": "https://staging.letote.cn",
         "secure": false,
         "changeOrigin": true,
         "preserveHeaderKeyCase": true,
         "hostRewrite": true,
         "autoRewrite": true,
         "protocolRewrite": "https",
         "cookieDomainRewrite": {
             " * ": "localhost"
         }
     }
  		```

  * 可能出现的问题：由于使用HTTPS,所以需要以HTTPS形式启动，目前scripts/start.js(process.env.HTTPS = true)已启动;
  ````

# #Prettier

* 格式化目录："src/ \*_ / _ .{js,jsx,json}"
* --single-quote(单引号):true
* --no-semi(语句末尾分号):false

* 使用默认值
  * --no-bracket-spacing(对象括号间加空格):true
    _ --tab-width(缩进空格数):2
    _ --trailing-comma(多行时加逗号) :none \* --jsx-bracket-same-line(将标签的>放在末尾，而不是下一行) :none

# Unit Test

## react test tools

* mac: brew install watchman
* Jest Enzyme chi (react16 neend use resolve-url-loader enzyme-adapter-react-16 react-test-renderer)

## how to play unit test

[This is TDD tutorial](https://hackernoon.com/a-guide-to-tdd-a-react-redux-todolist-app-part-1-b8a200bb7091)

## how to run

* yarn test(npm run test)
* yarn coverage(You will see detail Test coverage in coverage folder)

# Shallow Rendering

```javascript
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import MyComponent from './MyComponent'
import Foo from './Foo'

describe('<MyComponent />', () => {
  it('renders three <Foo /> components', () => {
    const wrapper = shallow(<MyComponent />)
    expect(wrapper.find(Foo)).to.have.length(3)
  })

  it('renders an `.icon-star`', () => {
    const wrapper = shallow(<MyComponent />)
    expect(wrapper.find('.icon-star')).to.have.length(1)
  })

  it('renders children when passed in', () => {
    const wrapper = shallow(
      <MyComponent>
        <div className="unique" />
      </MyComponent>
    )
    expect(wrapper.contains(<div className="unique" />)).to.equal(true)
  })

  it('simulates click events', () => {
    const onButtonClick = sinon.spy()
    const wrapper = shallow(<Foo onButtonClick={onButtonClick} />)
    wrapper.find('button').simulate('click')
    expect(onButtonClick).to.have.property('callCount', 1)
  })
})
```

#Full DOM Rendering

```javascript
import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { mount } from 'enzyme'

import Foo from './Foo'

describe('<Foo />', () => {
  it('allows us to set props', () => {
    const wrapper = mount(<Foo bar="baz" />)
    expect(wrapper.props().bar).to.equal('baz')
    wrapper.setProps({ bar: 'foo' })
    expect(wrapper.props().bar).to.equal('foo')
  })

  it('simulates click events', () => {
    const onButtonClick = sinon.spy()
    const wrapper = mount(<Foo onButtonClick={onButtonClick} />)
    wrapper.find('button').simulate('click')
    expect(onButtonClick).to.have.property('callCount', 1)
  })

  it('calls componentDidMount', () => {
    sinon.spy(Foo.prototype, 'componentDidMount')
    const wrapper = mount(<Foo />)
    expect(Foo.prototype.componentDidMount).to.have.property('callCount', 1)
    Foo.prototype.componentDidMount.restore()
  })
})
```

## Static Rendered Markup

```javascript
import React from 'react'
import { expect } from 'chai'
import { render } from 'enzyme'

import Foo from './Foo'

describe('<Foo />', () => {
  it('renders three `.foo-bar`s', () => {
    const wrapper = render(<Foo />)
    expect(wrapper.find('.foo-bar').length).to.equal(3)
  })

  it('renders the title', () => {
    const wrapper = render(<Foo title="unique" />)
    expect(wrapper.text()).to.contain('unique')
  })
})
```

## and so on... eg

# Project structure

* components: public components
  * Higher-Order Components: components/HOC
* containers: pages
* lib: global library
* queries: graphQL api
* actions: redux action
* reducers: redux reducer
* store: redux store
* router: react router and global components and styles

## Styles and images

* Now the styles and images are placed under the current component folder

## White List

* The white list is placed under open routing
  * (eg: /open/...)

# Storage

## method

* set: setItem
* get: getItem
* remove: removeItem
* each: loop storage
* clearAll: clear all storage key
