import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Popover, PopoverHandler, Input, PopoverContent } from '@material-tailwind/react'

interface Props {
  openPopoverError: boolean
  setOpenPopoverError: React.Dispatch<React.SetStateAction<boolean>>
  formik: any
  errorMsg: string
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>
  label: string
  id: string
  name: string
  type: string
  readOnly?: boolean
}

const CustomInput = ({
  openPopoverError,
  setOpenPopoverError,
  formik,
  errorMsg,
  setErrorMsg,
  label,
  name,
  id,
  type,
  readOnly
}: Props) => {
  return (
    <Popover
      open={openPopoverError}
      dismiss={{ referencePress: true }}
      placement='left'
      offset={{ mainAxis: 15, crossAxis: 0 }}
      handler={setOpenPopoverError}
    >
      <PopoverHandler
        onKeyDown={(e: { key: string }) => {
          if (e.key === ' ') {
            formik.setFieldValue(name, formik.values[name] + ' ')
          }
        }}
        onClick={() => {
          formik.errors[name] && formik.touched[name] ? setOpenPopoverError(true) : setOpenPopoverError(false)
        }}
      >
        <Input
          readOnly={readOnly ? readOnly : false}
          type={type}
          color='blue'
          containerProps={{ className: ' ' }}
          label={label}
          size='md'
          id={id}
          name={name}
          value={formik.values[name]}
          onChange={formik.handleChange}
          crossOrigin={undefined}
          onBlur={formik.handleBlur}
          icon={
            formik.errors[name] && formik.touched[name] ? (
              <FontAwesomeIcon icon={faCircleExclamation} beat color='red' size='sm' />
            ) : (
              ''
            )
          }
          error={formik.errors[name] && formik.touched[name] ? true : false}
        />
      </PopoverHandler>
      <PopoverContent
        onFocus={() => {
          setErrorMsg(formik.errors[name] as string)
          document.getElementById(id)?.focus()
        }}
        className={`${
          formik.errors[name] ? '' : 'hidden'
        } z-[99999] max-w-[300px] rounded py-3 border-none arrow_box-right text-white text-[0.8rem] bg-[#be4b49]`}
      >
        {errorMsg ? errorMsg : ''}
      </PopoverContent>
    </Popover>
  )
}

export default CustomInput
