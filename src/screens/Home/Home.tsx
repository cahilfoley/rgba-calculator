import { colord } from 'colord'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useMemo, useState } from 'react'
import Screen from '../../components/Screen'
import Section from '../../components/Section'
import Grid from '@mui/material/Grid'
import DetailsList from '../../components/DetailsList'
import Box from '@mui/material/Box'

const invalidColorMessage = `The provided color isn't in a valid format, please provide a valid RGB or HEX value.`
const invalidOpacityMessage = `The provided opacity isn't valid, please provide a number between 0 and 1 inclusive.`

export function Home() {
  const [foregroundColorInput, setForegroundColorInput] = useState('#FFFFFF')
  const foregroundColor = useMemo(() => colord(foregroundColorInput), [
    foregroundColorInput,
  ])
  const foregroundColorIsValid = useMemo(
    () => foregroundColorInput.length === 0 || foregroundColor.isValid(),
    [foregroundColorInput, foregroundColor],
  )
  const foregroundRGB = useMemo(() => foregroundColor.toRgb(), [
    foregroundColor,
  ])

  const [backgroundColorInput, setBackgroundColorInput] = useState(
    'rgb(100, 120, 140)',
  )
  const backgroundColor = useMemo(() => colord(backgroundColorInput), [
    backgroundColorInput,
  ])
  const backgroundColorIsValid = useMemo(
    () => backgroundColorInput.length === 0 || backgroundColor.isValid(),
    [backgroundColorInput, backgroundColor],
  )

  const [opacityInput, setOpacityInput] = useState('0.5')
  const opacity = +opacityInput
  const opacityIsValid = useMemo(() => opacity >= 0 && opacity <= 1, [opacity])

  const result = useMemo(() => {
    const foregroundRGB = foregroundColor.toRgb()
    const backgroundRGB = backgroundColor.toRgb()
    const r = opacity * foregroundRGB.r + (1 - opacity) * backgroundRGB.r
    const g = opacity * foregroundRGB.g + (1 - opacity) * backgroundRGB.g
    const b = opacity * foregroundRGB.b + (1 - opacity) * backgroundRGB.b
    return colord(`rgb(${r}, ${g}, ${b})`)
  }, [foregroundColor, backgroundColor, opacity])

  return (
    <Screen title="RGBA Color Calculator">
      <Typography paragraph>
        The RGBA calculator determines the effective displayed color of a
        foreground color over a background color with a given opacity.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Section title="Config">
            <TextField
              label="Foreground Color"
              value={foregroundColorInput}
              onChange={(event) => setForegroundColorInput(event.target.value)}
              error={!foregroundColorIsValid}
              helperText={!foregroundColorIsValid && invalidColorMessage}
            />
            <TextField
              label="Background Color"
              value={backgroundColorInput}
              onChange={(event) => setBackgroundColorInput(event.target.value)}
              error={!backgroundColorIsValid}
              helperText={!backgroundColorIsValid && invalidColorMessage}
            />
            <TextField
              label="Opacity"
              type="number"
              value={opacityInput}
              onChange={(event) => setOpacityInput(event.target.value)}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*.?[0-9]*' }}
              error={!opacityIsValid}
              helperText={!opacityIsValid && invalidOpacityMessage}
            />
          </Section>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Section title="Results" noCardContent>
            <DetailsList
              items={[
                {
                  label: 'Foreground color',
                  value: foregroundColor.toRgbString(),
                },
                {
                  label: 'Background color',
                  value: backgroundColor.toRgbString(),
                },
                {
                  label: 'Display color',
                  value: result.toRgbString(),
                },
              ]}
            />

            <Box
              sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}
            >
              {/* Foreground on background preview box */}
              <Box
                sx={{
                  p: 2,
                  background: backgroundColor.toRgbString(),
                  borderRadius: 1,
                }}
              >
                <Typography
                  sx={{
                    color: backgroundColor.isDark() ? '#EDF2F7' : '#121828',
                  }}
                  gutterBottom
                >
                  {backgroundColor.toRgbString()}
                </Typography>
                <Box
                  sx={{
                    p: 2,
                    background: `rgba(${foregroundRGB.r}, ${foregroundRGB.g}, ${foregroundRGB.b}, ${opacity})`,
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    sx={{ color: result.isDark() ? '#EDF2F7' : '#121828' }}
                  >
                    rgba({foregroundRGB.r}, {foregroundRGB.g}, {foregroundRGB.b}
                    , {opacity})
                  </Typography>
                </Box>
              </Box>

              {/* Result only preview box */}
              <Box
                sx={{ p: 2, background: result.toRgbString(), borderRadius: 1 }}
              >
                <Typography
                  sx={{ color: result.isDark() ? '#EDF2F7' : '#121828' }}
                >
                  {result.toRgbString()}
                </Typography>
              </Box>
            </Box>
          </Section>
        </Grid>
      </Grid>
    </Screen>
  )
}

export default Home
