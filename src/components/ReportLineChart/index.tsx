import { ChartData, ChartOptions } from 'chart.js/auto'
// import { getColor } from '../../utils/colors'

import { useMemo } from 'react'
import Chart from '../Chart'
import { useAppSelector } from 'src/redux/hooks'
import { selectColorScheme } from 'src/redux/colorSchemeSlice'
import { selectDarkMode } from 'src/redux/darkModeSlice'
import { getColor } from 'src/utils/colors'

interface MainProps extends React.ComponentPropsWithoutRef<'canvas'> {
  width: number
  height: number
}

function Main(props: MainProps) {
  const colorScheme = useAppSelector(selectColorScheme)
  const darkMode = useAppSelector(selectDarkMode)

  const data: ChartData = useMemo(() => {
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: '# of Votes',
          data: [0, 200, 250, 200, 700, 550, 650, 1050, 950, 1100, 900, 1200],
          borderWidth: 2,
          borderColor: colorScheme ? getColor('primary', 0.8) : '',

          backgroundColor: 'transparent',
          pointBorderColor: 'transparent',
          tension: 0.4
        },
        {
          label: '# of Votes',
          data: [0, 300, 400, 560, 320, 600, 720, 850, 690, 805, 1200, 1010],
          borderWidth: 2,
          borderDash: [2, 2],
          borderColor: darkMode ? getColor('slate.400', 0.6) : getColor('slate.400'),
          backgroundColor: 'transparent',
          pointBorderColor: 'transparent',
          tension: 0.4
        }
      ]
    }
  }, [colorScheme, darkMode])

  const options: ChartOptions = useMemo(() => {
    return {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 12
            },
            color: getColor('slate.500', 0.8)
          },
          grid: {
            display: false,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            font: {
              size: 12
            },
            color: getColor('slate.500', 0.8),
            callback: function (value) {
              return '$' + value
            }
          },
          grid: {
            color: darkMode ? getColor('slate.500', 0.3) : getColor('slate.300'),
            borderDash: [2, 2],
            drawBorder: false
          }
        }
      }
    }
  }, [colorScheme, darkMode])

  return (
    <Chart
      type='line'
      width={props.width}
      height={props.height}
      data={data}
      options={options}
      className={props.className}
    />
  )
}

Main.defaultProps = {
  width: 'auto',
  height: 'auto',
  className: ''
}

export default Main
