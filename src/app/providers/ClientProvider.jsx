'use client'

import { LoadingProvider } from './LoadingProvider'
import { StepProvider } from './StepProvider'
import { BreadcrumbsProvider } from './BreadcrumbsProvider'

const ClientProvider = ({ children }) => {
  return (

    <LoadingProvider>
      <StepProvider>
        <BreadcrumbsProvider>
          {children}
        </BreadcrumbsProvider>
      </StepProvider>
    </LoadingProvider>
  )
}

export default ClientProvider
