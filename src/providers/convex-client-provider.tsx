'use client'
import { ClerkProvider, useAuth } from '@clerk/nextjs'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { AuthLoading, Authenticated, ConvexReactClient } from 'convex/react'
import React from 'react'
import Loading from '@/components/auth/loading'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'
interface Props {
  children: React.ReactNode
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!

const convex = new ConvexReactClient(convexUrl)

export const ConvexClientProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Provider store={storeRef.current}>
          <Authenticated>{children}</Authenticated>
          <AuthLoading>
            <Loading />
          </AuthLoading>
        </Provider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}
