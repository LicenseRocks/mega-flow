/**
 * Storybook Configuration
 */

// React
import React from 'react'

// Storybook
import { addDecorator, addParameters } from '@storybook/react'

import { Container } from './decorators'

addParameters({
  options: {
    panelPosition: 'right'
  },
  readme: {
    excludePropTables: []
  }
})

addDecorator(Container)