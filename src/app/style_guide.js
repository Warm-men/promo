__webpack_public_path__ = process.env.ASSET_HOST || '/./' // eslint-disable-line no-undef

import { render } from 'react-dom'
import App from 'src/app/components/style_guide/app'

render(<App />, document.getElementById('app'))
