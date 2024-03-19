import Login from 'src/components/Login'
import Register from 'src/components/Register'
import { Card } from '@material-tailwind/react'

import loginBackground from 'src/assets/Images/Login_background.png'
import { useState } from 'react'

const Auth = () => {
  const [isLoginTab, setIsLoginTab] = useState(true)

  const handleChooseTab = () => {
    setIsLoginTab(!isLoginTab)
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-white'>
      <div className='bg-[#ebf0f4] flex-1 h-full flex justify-center items-center rounded-br-[50px]'>
        <img src={loginBackground} className='object-none'></img>
      </div>

      <div className={`w-2/5 h-full bg-[#ebf0f4]`}>
        <div className='w-full h-full bg-white flex justify-center items-center rounded-tl-[50px]'>
          <div className={`transition-[height] duration-150 ease-in-out ${isLoginTab ? 'h-[401px]' : 'h-[565px]'}`}>
            <div className='bg-[#ebeaea] w-[384px] -mt-12 absolute h-[100px] rounded-xl flex gap-8 items-start'>
              <button
                onClick={handleChooseTab}
                className={`text-[#0c2964] mt-3 ml-10 pb-[10px] ${isLoginTab ? 'border-b-2 border-[#2b6af1]' : ''}`}
              >
                Đăng nhập
              </button>
              <button
                onClick={handleChooseTab}
                className={`text-[#0c2964] mt-3 pb-[10px] ${!isLoginTab ? 'border-b-2 border-[#2b6af1]' : ''}`}
              >
                Đăng ký
              </button>
            </div>
            <Card className='w-96'>
              {isLoginTab ? <Login setIsLoginTab={setIsLoginTab} /> : <Register setIsLoginTab={setIsLoginTab} />}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Auth
