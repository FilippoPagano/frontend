import { CustomSimplebar } from '@src/components/shared/simplebar'
import { ContentContainer } from './content-container'
import { Header } from './header'
import './layout.scss'

import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="layout-container">
      <Header />
      <CustomSimplebar>
        <ContentContainer>{children}</ContentContainer>
      </CustomSimplebar>
    </div>
  )
}

export { Layout }
