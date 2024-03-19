import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import Support from "../../components/Support";
import HomeHeader from "src/components/HomeHeader";

const Terms = () => {
    const [isSupportVisible, setSupportVisible] = useState(false);

    const toggleSupportVisibility = () => {
        setSupportVisible(!isSupportVisible);
    };
    return (
        <div className="flex relative flex-col items-center">
            <HomeHeader />
            <Link to={'/contract'} className="flex ml-[40px] float-left justify-start mr-auto items-center text-white text-[20px] font-bold capitalize mt-[80px]"><FontAwesomeIcon icon={faArrowLeft} className="text-[20px] text-white pr-[10px]" />Trở lại </Link>
            <div className="min-w-[400px] h-[500px] inline-flex w-fit h-fit gap-2.5 bg-zinc-100 rounded-[25px] mb-[40px] shadow border-2 border-blue-900  relative flex-col text-center " >
                <div className="text-center text-blue-900 text-4xl font-bold font-['Montserrat'] capitalize pt-[40px]">Quy định</div>
                {/* <div className="w-[400px] h-[70px] relative flex text-left ml-[40px] mr-[40px] gap-6">
            <div className="left-0 top-0 absolute text-blue-900 text-[20px] font-semibold font-['Montserrat']">Name</div>
            <input className="w-[400px] h-[50px] left-0 top-[38px] absolute bg-white pl-[20px] pr-[20px] rounded-[15px] border-2 border-zinc-500" placeholder="Mehrabbozorgi"/>
        </div>
        <div className="w-[400px] h-[70px] relative flex text-left ml-[40px] mr-[40px] mt-[20px] gap-6">
            <div className="left-0 top-0 absolute text-blue-900 text-[20px] font-semibold font-['Montserrat']">Address</div>
            <input className="w-[400px] h-[50px] left-0 top-[38px] absolute bg-white pl-[20px] pr-[20px] rounded-[15px] border-2 border-zinc-500" placeholder="33062 Zboncak isle"/>
        </div>
        <div className="w-[400px] h-[70px] relative flex text-left ml-[40px] mr-[40px] mt-[20px] gap-6">
            <div className="left-0 top-0 absolute text-blue-900 text-[20px] font-semibold font-['Montserrat']">Phone Number</div>
            <input className="w-[400px] h-[50px] left-0 top-[38px] absolute bg-white pl-[20px] pr-[20px] rounded-[15px] border-2 border-zinc-500" placeholder="58077.79"/>
        </div>
        <div className="w-[400px] h-[70px] relative flex text-left ml-[40px] mr-[40px] mt-[20px] gap-6">
            <div className="left-0 top-0 absolute text-blue-900 text-[20px] font-semibold font-['Montserrat']">Email</div>
            <input className="w-[400px] h-[50px] left-0 top-[38px] absolute bg-white pl-[20px] pr-[20px] rounded-[15px] border-2 border-zinc-500" placeholder="Mehrabbozorgi.business@gmail.com"/>
        </div>
        <div className="w-[400px] h-[220px] relative flex text-left ml-[40px] mr-[40px] mt-[20px] mb-[70px] gap-6">
            <div className="left-0 top-0 absolute text-blue-900 text-[20px] font-semibold font-['Montserrat']">Insurance Type</div>
            <input className="w-[400px] h-[150px] left-0 top-[38px] absolute bg-white pl-[20px] pr-[20px] rounded-[15px] border-2 border-zinc-500" placeholder="Health insurance"/>
        </div>
        <div className="absolute right-[40px] bottom-[20px] w-44 h-[50px] px-16 py-4 bg-blue-900 rounded-[25px] shadow border-2 justify-center items-center gap-2.5 inline-flex">
            <div className="text-white text-lg font-semibold font-['Montserrat']">Send</div>
        </div> */}
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

export default Terms
