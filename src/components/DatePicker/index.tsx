import Lucide from '../Lucide'
import Litepicker from 'src/components/Litepicker'

interface Props {
  date?: string
  setDate?: React.Dispatch<React.SetStateAction<string>>
  formik?: any
  id: string
  name: string
  isForm: boolean
  maxYear?: number
}

const Main = ({ isForm, date, setDate, formik, id, name, maxYear }: Props) => {
  return (
    <div className='relative min-w-20 max-w-56 mx-auto'>
      <div className='absolute flex items-center justify-center w-10 h-[38px] border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400'>
        <Lucide icon='Calendar' className='w-4 h-4' />
      </div>
      <Litepicker
        value={isForm ? formik.values[name] : date}
        onChange={isForm ? formik.handleChange : setDate}
        id={id}
        name={name}
        options={{
          format: 'YYYY-MM-DD',
          autoApply: false,
          showWeekNumbers: true,
          buttonText: {
            apply: 'Chọn',
            cancel: 'Hủy',
            previousMonth: '',
            nextMonth: '',
            reset: ''
          },
          lang: 'vi',
          dropdowns: {
            minYear: 1964,
            maxYear: maxYear,
            months: true,
            years: true
          }
        }}
        className='pl-12'
      />
    </div>
  )
}

export default Main
