import { Link } from "react-router-dom";
import HomeHeader from "src/components/HomeHeader";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import Support from "../../components/Support";

const Contract = () => {
  const [isSupportVisible, setSupportVisible] = useState(false);

  const toggleSupportVisibility = () => {
    setSupportVisible(!isSupportVisible);
  };
  return (
    <div className="flex relative flex-col items-center">
      <HomeHeader />
      <div className="inline-flex gap-2.5 bg-zinc-100 rounded-[25px] mb-[40px] shadow border-2 border-blue-900 mt-[80px] relative flex-col text-center " >
        <div className="text-center text-blue-900 text-4xl font-bold font-['Montserrat'] capitalize pt-[40px]">Hợp đồng</div>
        <div className="w-[400px] h-[70px] relative flex text-left ml-[40px] mr-[40px] gap-6">
          <div className="left-0 top-0 absolute text-blue-900 text-[20px] font-semibold font-['Montserrat']">Tên</div>
          <input className="w-[400px] h-[50px] left-0 top-[38px] absolute bg-white pl-[20px] pr-[20px] rounded-[15px] border-2 border-zinc-500" placeholder="Mehrabbozorgi" />
        </div>
        <div className="w-[400px] h-[70px] relative flex text-left ml-[40px] mr-[40px] mt-[20px] gap-6">
          <div className="left-0 top-0 absolute text-blue-900 text-[20px] font-semibold font-['Montserrat']">Địa chỉ</div>
          <input className="w-[400px] h-[50px] left-0 top-[38px] absolute bg-white pl-[20px] pr-[20px] rounded-[15px] border-2 border-zinc-500" placeholder="33062 Zboncak isle" />
        </div>
        <div className="w-[400px] h-[70px] relative flex text-left ml-[40px] mr-[40px] mt-[20px] gap-6">
          <div className="left-0 top-0 absolute text-blue-900 text-[20px] font-semibold font-['Montserrat']">Số điện thoại</div>
          <input className="w-[400px] h-[50px] left-0 top-[38px] absolute bg-white pl-[20px] pr-[20px] rounded-[15px] border-2 border-zinc-500" placeholder="58077.79" />
        </div>
        <div className="w-[400px] h-[70px] relative flex text-left ml-[40px] mr-[40px] mt-[20px] gap-6">
          <div className="left-0 top-0 absolute text-blue-900 text-[20px] font-semibold font-['Montserrat']">Email</div>
          <input className="w-[400px] h-[50px] left-0 top-[38px] absolute bg-white pl-[20px] pr-[20px] rounded-[15px] border-2 border-zinc-500" placeholder="Mehrabbozorgi.business@gmail.com" />
        </div>
        <div className="w-[400px] h-[70px] relative flex text-left ml-[40px] mr-[40px] mt-[20px] gap-6">
          <div className="left-0 top-0 absolute text-blue-900 text-[20px] font-semibold font-['Montserrat']">Loại bảo hiểm</div>
          <input className="w-[400px] h-[50px] left-0 top-[38px] absolute bg-white pl-[20px] pr-[20px] rounded-[15px] border-2 border-zinc-500" placeholder="Health insurance" />
        </div>
        <div className="w-[400px] h-[70px] relative flex text-left ml-[40px] mr-[40px] mt-[20px] gap-6">
          <div className="left-0 top-0 absolute text-blue-900 text-[20px] font-semibold font-['Montserrat']">Thời hạn</div>
          <input className="w-[400px] h-[50px] left-0 top-[38px] absolute bg-white pl-[20px] pr-[20px] rounded-[15px] border-2 border-zinc-500" placeholder="5 years" />
        </div>
        <div className="w-[400px] h-[70px] relative items-center flex text-left ml-[40px] mr-[40px] mt-[20px] mb-[70px] gap-6">
          <input type="checkbox" />
          <div className="text-center">
            <span className="text-neutral-900 font-medium font-['Montserrat']">Tôi đồng ý với </span>
            <Link to={'/terms'} className="text-blue-900 font-normal font-['Montserrat']">quy định của hợp đồng</Link>
          </div>
        </div>
        <div className="absolute right-[40px] bottom-[20px] w-44 h-[50px] px-16 py-4 bg-blue-900 rounded-[25px] shadow border-2 justify-center items-center gap-2.5 inline-flex">
          <div className="text-white text-lg font-semibold font-['Montserrat']">Gửi</div>
        </div>
      </div>
      <div className="w-full flex mt-[20px] justify-center items-center flex bg-white">

        {/* <Slider/> */}
      </div>
      {/* Component Support */}
      {isSupportVisible && (
        <div
          className="absolute bottom-[100px] right-[80px] z-50"
        >
          <Support />
        </div>
      )}
      <button
        onClick={toggleSupportVisibility}
        className="w-[50px] h-[50px] flex justify-center items-center absolute right-[60px] bottom-[40px] bg-blue-900 rounded-[50px]">
        <FontAwesomeIcon icon={faQuestion} className="text-2xl text-white" />
      </button>
    </div>
  );
}

export default Contract
