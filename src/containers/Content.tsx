import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import { DRAWER_WIDTH } from '../config/constants'

const ContentWrapper = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>`
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing(3)};
  /*
  margin-left: ${({ open }) => (open ? 0 : -DRAWER_WIDTH)}px;

  transition: ${({ theme, open }) =>
    open
      ? theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        })
      : theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        })};
        */

  position: relative;
`

interface ContentProps {
  children: React.ReactNode
  drawerOpen?: boolean
}

export default function Content(props: ContentProps) {
  return (
    <ContentWrapper open={props.drawerOpen}>
      <Toolbar />
      {props.children}
    </ContentWrapper>
  )
}
