interface Props {
  name?: string
  id: string
  placeholder: string
  height?: number
  width?: number
}

const FloatingInput = ({ name, id, placeholder, height, width }: Props) => {
  return (
    <div className='w-full bg-white rounded-b-lg p-2'>
      {/*  */}
      <div className='relative p-[2px]'>
        <input
          name={name}
          id={id}
          type='input'
          style={{ width: `${width}px`, height: `${height}px` }}
          className={`peer w-full h-full border leading-5 border-[#9b9b9b] text-[17px] text-[#050505] 
          p-1 pl-4 pt-3 bg-transparent transition-colors rounded-lg placeholder:text-transparent focus:pt-3
          focus:outline-none focus:ring-4 focus:shadow-custom`}
          placeholder={placeholder}
        />
        <label
          htmlFor={id}
          className={`left-4 top-2 text-[12px] peer-placeholder-shown:text-[16px] peer-placeholder-shown:cursor-text peer-placeholder-shown:top-[calc(100%-70%)]
          peer-placeholder-shown:left-4 absolute block duration-200 text-[#9b9b9b] peer-focus:absolute peer-focus:top-2 peer-focus:duration-200
          peer-focus:text-[12px] peer-focus:text-[#0866ff]`}
        >
          {placeholder}
        </label>
      </div>
      {/*  */}
    </div>
  )
}

export default FloatingInput
