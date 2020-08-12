# react-resizable

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-resizable.svg)](https://www.npmjs.com/package/react-resizable) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

### use npm

```bash
npm install --save @jonathanleelx/react-resizable
```

### use yarn

```
yarn add @jonathanleelx/react-resizable
```

## Usage

```tsx
import React, { Component } from 'react'
import ResizableContainer from '@jonathanleelx/react-resizable'

import '@jonathanleelx/react-resizable/dist/index.css'

const Flex = () => {
  return <div>flex</div>
}

const Fixed = () => {
  return <div>fixed</div>
}

class App extends Component {
  render() {
    return <ResizableContainer flex={<Flex />} fixed={<Fixed />} />
  }
}
```

## License

MIT © [JonathanLee-LX](https://github.com/JonathanLee-LX)
