import { ChartData, ChartOptions } from 'chart.js/auto'

import { useMemo } from 'react'
import { selectColorScheme } from 'src/redux/colorSchemeSlice'
import { selectDarkMode } from 'src/redux/darkModeSlice'
import { useAppSelector } from 'src/redux/hooks'
import { getColor } from 'src/utils/colors'
import Chart from '../Chart'
import { IncomeReport } from 'src/types/report.type'
import { formatNumberToM } from 'src/utils/utils'

interface MainProps extends React.ComponentPropsWithoutRef<'canvas'> {
  width: number
  height: number
  incomeReport: IncomeReport[]
}

function Main(props: MainProps) {
  const colorScheme = useAppSelector(selectColorScheme)
  const darkMode = useAppSelector(selectDarkMode)

  const compensationAmounts = props.incomeReport.map((item) => item.compensationAmount)

  // Lọc giá trị totalAmount
  const totalAmounts = props.incomeReport.map((item) => item.totalAmount)

  const data: ChartData = useMemo(() => {
    return {
      labels: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12'
      ],
      datasets: [
        {
          label: 'Doanh thu',
          barPercentage: 0.5,
          barThickness: 10,
          maxBarThickness: 10,
          minBarLength: 2,
          data: totalAmounts,
          backgroundColor: colorScheme ? getColor('success') : ''
        },
        {
          label: 'Bồi thường',
          barPercentage: 0.5,
          barThickness: 10,
          maxBarThickness: 10,
          minBarLength: 2,
          data: compensationAmounts,
          backgroundColor: darkMode ? getColor('darkmode.200') : getColor('danger')
        }
      ]
    }
  }, [colorScheme, darkMode])

  const options: ChartOptions = useMemo(() => {
    return {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: getColor('slate.500', 0.8)
          }
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
              return formatNumberToM(value) + ' VNĐ'
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
      type='bar'
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
