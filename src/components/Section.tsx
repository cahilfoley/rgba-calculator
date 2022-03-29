import React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'

const StyledCardHeader = styled(CardHeader)`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 32px 24px;
`

export interface SectionProps {
  title: string
  children: JSX.Element | JSX.Element[]
  noCardContent?: boolean
}

export function Section(props: SectionProps) {
  const content = props.noCardContent ? props.children : <CardContent>{props.children}</CardContent>
  return (
    <Card>
      <StyledCardHeader title={props.title} />
      <Divider />
      {content}
    </Card>
  )
}

export default Section
