import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

const StyledList = styled(List)`
  margin: 0;
  padding: 0;

  .MuiListItem-root:not(:last-of-type) {
    border-bottom: 1px solid rgb(45, 55, 72);
  }
`

const StyledListItem = styled(ListItem)`
  display: flex;
  align-items: center;
  position: relative;
  text-align: left;
`

export interface DetailsListItem {
  label: string
  value: string
}

export interface DetailsListProps {
  items: DetailsListItem[]
}

export function DetailsList(props: DetailsListProps) {
  return (
    <StyledList sx={{ m: 0, p: 0 }}>
      {props.items.map(({ label, value }, i) => {
        return (
          <StyledListItem key={i}>
            <ListItemText disableTypography sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant="subtitle2" component="h6" sx={{ m: 0, minWidth: '180px' }}>
                {label}
              </Typography>
              <Box flex="1 1 0" mt={0}>
                <Typography variant="body2" component="p" color="text.secondary">
                  {value}
                </Typography>
              </Box>
            </ListItemText>
          </StyledListItem>
        )
      })}
    </StyledList>
  )
}

export default DetailsList
