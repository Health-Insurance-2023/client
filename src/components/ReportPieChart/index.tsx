import { ChartData, ChartOptions } from 'chart.js/auto'

import { useMemo } from 'react'
import { selectColorScheme } from 'src/redux/colorSchemeSlice'
import { selectDarkMode } from 'src/redux/darkModeSlice'
import { useAppSelector } from 'src/redux/hooks'
import { getColor } from 'src/utils/colors'
import Chart from '../Chart'
import { AgeReport } from 'src/types/report.type'

interface MainProps extends React.ComponentPropsWithoutRef<'canvas'> {
  width: number
  height: number
  ageReport: AgeReport[]
}

function Main(props: MainProps) {
  const colorScheme = useAppSelector(selectColorScheme)
  const darkMode = useAppSelector(selectDarkMode)

  const labels = []
  labels.push(...props.ageReport.map((item) => item.ageGroup))
  const chartData = []
  chartData.push(...props.ageReport.map((item) => item.quantity))
  const chartColors = () => [
    getColor('pending', 0.9),
    getColor('warning', 0.9),
    getColor('primary', 0.9),
    getColor('success', 0.9),
    getColor('danger', 0.9),
    '#800080'
  ]
  const data: ChartData = useMemo(() => {
    return {
      labels: labels,
      datasets: [
        {
          data: chartData,
          backgroundColor: colorScheme ? chartColors() : '',
          hoverBackgroundColor: colorScheme ? chartColors() : '',
          borderWidth: 5,
          borderColor: darkMode ? getColor('darkmode.700') : getColor('white')
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
      }
    }
  }, [colorScheme, darkMode])

  return (
    <Chart
      type='pie'
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
