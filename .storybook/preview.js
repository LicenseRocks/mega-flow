import { addDecorator, addParameters } from '@storybook/react'

import { Container } from './decorators'

addParameters({
  options: {
    panelPosition: 'right'
  }
})

addDecorator(Container)