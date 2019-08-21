import React from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'
import theme from 'src/themes/styled.theme'
import Profile from 'src/pages/common/Header/Profile/Profile'
import MenuDesktop from 'src/components/Menu/MenuDesktop'
import MenuMobile from 'src/components/Menu/MenuMobile'
import Logo from 'src/components/Logo/Logo'

const FlexHeader = styled(Flex)`
  height: 60px;
  background-color: ${theme.colors.white};
  justify-content: space-between;
  align-items: center;
`

export class Header extends React.Component {
  render() {
    return (
      <>
        <FlexHeader>
          <Flex>
            <Logo />
          </Flex>
          <Flex>
            <MenuDesktop />
            <MenuMobile />
            <Profile />
          </Flex>
        </FlexHeader>
      </>
    )
  }
}

export default Header
