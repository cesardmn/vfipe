'use client'

import { BreadcrumbsProvider } from './BreadcrumbsProvider'
import { StepProvider } from './StepProvider'

const ClientProvider = ({ children }) => {
  return (
    <StepProvider>
      <BreadcrumbsProvider>{children}</BreadcrumbsProvider>
    </StepProvider>
  )
}

export default ClientProvider
