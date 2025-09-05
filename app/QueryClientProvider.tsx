'use client'
import React, { PropsWithChildren } from 'react'
import {QueryClient, QueryClientProvider as TanstackQueryClientProvider} from '@tanstack/react-query'

const QueryClientProvider = ({children}: PropsWithChildren) => {
  const queryClient = new QueryClient()
  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  )
}

export default QueryClientProvider