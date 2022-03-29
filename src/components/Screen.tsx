import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useDocumentTitle from '../hooks/useDocumentTitle'

const ScreenRoot = styled('div')`
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  position: relative;
`

const ContentWrapper = styled('div')`
  flex: 1;
  position: relative;
  overflow-y: auto;
`

interface ScreenProps {
  children: React.ReactNode | React.ReactNode[]
  title: string
  actions?: React.ReactNode | React.ReactNode[]
}

function Screen(props: ScreenProps) {
  useDocumentTitle(props.title)

  return (
    <ScreenRoot>
      <Container sx={{ position: 'relative' }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          my={2}
          flexWrap="wrap"
        >
          <Typography variant="h3" component="div" align="left">
            {props.title}
          </Typography>
          <div>{props.actions}</div>
        </Box>

        <ContentWrapper>{props.children}</ContentWrapper>
      </Container>
    </ScreenRoot>
  )
}

export default Screen
