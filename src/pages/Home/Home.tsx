import { faFacebookF, faLinkedinIn, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faArrowUp, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Carousel } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import FloatingInput from 'src/components/FloatingInput'
import WOW from 'wow.js'
import 'animate.css' // Import các hiệu ứng CSS từ animate.css
import carousel1 from 'src/assets/images/carousel-1.jpg'
import carousel2 from 'src/assets/images/carousel-2.jpg'
import about from 'src/assets/images/about.jpg'
import icon4 from 'src/assets/images/icon/icon-04-primary.png'
import icon3 from 'src/assets/images/icon/icon-03-primary.png'
import profileImg from 'src/assets/images/profile.jpg'
import icon6 from 'src/assets/images/icon/icon-06-primary.png'
import icon7 from 'src/assets/images/icon/icon-07-primary.png'
import featureImg from 'src/assets/images/feature.jpg'
import test1 from 'src/assets/images/testimonial-1.jpg'
import test2 from 'src/assets/images/testimonial-2.jpg'
import test3 from 'src/assets/images/testimonial-3.jpg'
import team1 from 'src/assets/images/team-1.jpg'
import team2 from 'src/assets/images/team-2.jpg'
import team3 from 'src/assets/images/team-3.jpg'
import team4 from 'src/assets/images/team-4.jpg'
import icon10 from 'src/assets/images/icon/icon-10-light.png'
import icon1 from 'src/assets/images/icon/icon-01-light.png'
import icon05l from 'src/assets/images/icon/icon-05-light.png'
import icon08l from 'src/assets/images/icon/icon-08-light.png'
import icon07l from 'src/assets/images/icon/icon-07-light.png'
import icon06l from 'src/assets/images/icon/icon-06-light.png'

const teamMemberList: { url: string; name: string }[] = [
  {
    url: team1,
    name: 'Nguyen Van A'
  },
  {
    url: team2,
    name: 'Nguyen Van B'
  },
  {
    url: team3,
    name: 'Nguyen Van C'
  },
  {
    url: team4,
    name: 'Nguyen Van D'
  }
]

const serviceList: { url: string; name: string; description: string }[] = [
  {
    url: icon10,
    name: 'Bảo hiểm cuộc sống',
    description:
      'Toàn thế giới ngoại trừ Hoa Kỳ: Bạn được bảo hiểm bất kỳ đâu ngoại trừ Mỹ. Các dịch vụ được thực hiện ở Mỹ được bảo hiểm lên tới 2.320.000 VNĐ trong thời hạn bảo hiểm'
  },
  {
    url: icon1,
    name: 'Bảo hiểm sức khỏe',
    description:
      'Toàn thế giới ngoại trừ Hoa Kỳ: Bạn được bảo hiểm bất kỳ đâu ngoại trừ Mỹ. Các dịch vụ được thực hiện ở Mỹ được bảo hiểm lên tới 2.320.000 VNĐ trong thời hạn bảo hiểm'
  },
  {
    url: icon05l,
    name: 'Bảo hiểm nhà ở',
    description:
      'Toàn thế giới ngoại trừ Hoa Kỳ: Bạn được bảo hiểm bất kỳ đâu ngoại trừ Mỹ. Các dịch vụ được thực hiện ở Mỹ được bảo hiểm lên tới 2.320.000 VNĐ trong thời hạn bảo hiểm'
  },
  {
    url: icon08l,
    name: 'Bảo hiểm phương tiện',
    description:
      'Toàn thế giới ngoại trừ Hoa Kỳ: Bạn được bảo hiểm bất kỳ đâu ngoại trừ Mỹ. Các dịch vụ được thực hiện ở Mỹ được bảo hiểm lên tới 2.320.000 VNĐ trong thời hạn bảo hiểm'
  },
  {
    url: icon07l,
    name: 'Bảo hiểm kinh doanh',
    description:
      'Toàn thế giới ngoại trừ Hoa Kỳ: Bạn được bảo hiểm bất kỳ đâu ngoại trừ Mỹ. Các dịch vụ được thực hiện ở Mỹ được bảo hiểm lên tới 2.320.000 VNĐ trong thời hạn bảo hiểm'
  },
  {
    url: icon06l,
    name: 'Bảo hiểm tài sản',
    description:
      'Toàn thế giới ngoại trừ Hoa Kỳ: Bạn được bảo hiểm bất kỳ đâu ngoại trừ Mỹ. Các dịch vụ được thực hiện ở Mỹ được bảo hiểm lên tới 2.320.000 VNĐ trong thời hạn bảo hiểm'
  }
]

const Home = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const wow = new WOW()
    wow.init()
    window.addEventListener('scroll', function () {
      var backToTop = document.querySelector('.back-to-top')

      if (backToTop) {
        if (window.scrollY > 300) {
          backToTop.classList.add('drop-shadow-md', 'top-0', 'sticky')
        } else {
          backToTop.classList.remove('drop-shadow-md', 'top-0', 'sticky')
        }
      }
    })
  }, [])

  const handleScroll = () => {
    const scrollTop = window.scrollY
    setIsVisible(scrollTop > 600)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className='mb-12'>
      {/* <!-- Carousel Start --> */}
      <Carousel
        loop={true}
        autoplay={true}
        className=''
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className='absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2'>
            {new Array(length).fill('').map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? 'w-8 bg-[#015fc9] ' : 'w-4 bg-[#015fc9] opacity-60'
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
        prevArrow={({ loop, handlePrev, firstIndex }) => {
          return (
            <button
              onClick={handlePrev}
              disabled={!loop && firstIndex}
              className='bg-[#015fc9] !absolute top-2/4 left-4 -translate-y-2/4 rounded-full select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12 max-w-[48px] h-12 max-h-[48px] text-white hover:bg-[#87a4c6] active:bg-white/30 grid place-items-center'
            >
              <FontAwesomeIcon icon={faChevronLeft} strokeWidth={3} className='-ml-1 h-7 w-7' />
            </button>
          )
        }}
        nextArrow={({ loop, handleNext, lastIndex }) => (
          <button
            onClick={handleNext}
            disabled={!loop && lastIndex}
            className='bg-[#015fc9] !absolute top-2/4 right-4 -translate-y-2/4 rounded-full select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12 max-w-[48px] h-12 max-h-[48px] text-white hover:bg-[#87a4c6] active:bg-white/30 grid place-items-center'
          >
            <FontAwesomeIcon icon={faChevronRight} strokeWidth={3} className='-ml-1 h-7 w-7' />
          </button>
        )}
      >
        <div className='relative'>
          <img className='w-full' src={carousel1} alt='Image' />
          <div className='absolute top-0 left-0 flex items-center w-full h-full'>
            <div className='mx-20 sm:px-4'>
              <div className='flex flex-wrap '>
                <div className='w-full lg:w-1/2 pr-4 pl-4'>
                  <h1 className='text-[64px] text-[#15233c] font-[Poppins,sans-serif] leading-[74px] font-bold mb-4 animate__animated animate__slideInDown'>
                    Bảo hiểm nhân thọ không chỉ là cách để bạn bảo vệ tương lai của mình
                  </h1>
                  <p className='text-[20px] text-[#696e77] font-[ui-sans-serif] mb-5'>
                    mà còn là món quà bạn để lại cho người thân sau này.
                  </p>
                  <button className='px-12 py-4 rounded-[10px] text-center font-[ui-sans-serif] text-[17px] bg-[#015fc9] text-white hover:bg-[#0dd3f1]'>
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='relative'>
          <img className='w-full' src={carousel2} alt='Image' />
          <div className=' absolute top-0 left-0 flex items-center w-full h-full'>
            <div className='mx-20 sm:px-4'>
              <div className='flex flex-wrap '>
                <div className='w-full lg:w-1/2 pr-4 pl-4'>
                  <h1 className='text-[64px] text-[#15233c] font-[Poppins,sans-serif] leading-[74px] font-bold mb-4 animated slideInDown'>
                    Bảo hiểm nhân thọ giống như một món quà của bạn dành cho gia đình và người thân
                  </h1>
                  <p className='text-[20px] text-[#696e77] font-[ui-sans-serif] mb-5'>
                    trong trường hợp bạn không còn ở bên họ nữa.
                  </p>
                  <button className='px-12 py-4 rounded-[10px] text-center font-[ui-sans-serif] text-[17px] bg-[#015fc9] text-white hover:bg-[#0dd3f1]'>
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
      {/* <!-- Carousel End --> */}

      {/* <!-- About Start --> */}
      <div className='py-5 mt-4 px-[100px]'>
        <div className='sm:px-4 h-[578px] py-10'>
          <div className='flex flex-wrap h-full'>
            <div className='lg:w-1/2 pr-4 pl-4 h-full wow animate__animated  animate__fadeInUp ' data-wow-delay='0.1s'>
              <div className='relative overflow-hidden rounded-[10px] ps-5 pt-5 h-full' style={{ minHeight: '400px' }}>
                <img
                  className='absolute w-full h-full rounded-[10px] pl-10 pt-10'
                  src={about}
                  alt=''
                  style={{ objectFit: 'cover' }}
                />
                <div
                  className='absolute top-0 bg-white rounded-[10px] pe-3 pb-3 -ml-4'
                  style={{ width: '200px', height: '200px' }}
                >
                  <div className='flex flex-col leading-5 font-[Poppins,sans-serif] font-semibold justify-center text-center bg-[#015fc9] rounded-[10px] h-full p-6'>
                    <h1 className='text-white mb-0'>25</h1>
                    <h2 className='text-white'>Năm</h2>
                    <h5 className='text-white mb-0'>Kinh nghiệm</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className='lg:w-1/2 pr-4 pl-4 h-full wow animate__animated  animate__fadeInUp' data-wow-delay='0.5s'>
              <div className='h-full flex flex-col justify-between'>
                <h1 className='text-[40px] text-[#15233c] font-[Poppins,sans-serif] leading-[48px] font-bold mb-10'>
                  Chúng tôi sẽ giúp bạn bảo vệ tương lai cho người thân cũng như chính bạn
                </h1>
                <p className='text-[20px] text-[#015fc9] font-[Poppins,sans-serif] mb-4'>
                  Để bảo vệ tương lai của mình và gia đình, bạn cần đầu tư vào bảo hiểm nhân thọ. Nó là một khoản đầu tư
                  đáng giá cho tương lai của bạn.
                </p>
                <div className='flex flex-wrap mb-4'>
                  <div className='sm:w-1/2 pr-4 pl-4'>
                    <div className='flex items-center'>
                      <img className='flex-shrink-0 me-3' src={icon4} alt='' />
                      <h5 className=' font-[Poppins,sans-serif] font-bold'>Gói bảo hiểm linh hoạt</h5>
                    </div>
                  </div>
                  <div className='sm:w-1/2 pr-4 pl-4'>
                    <div className='flex items-center'>
                      <img className='flex-shrink-0 me-3' src={icon3} alt='' />
                      <h5 className='font-[Poppins,sans-serif] font-bold'>Cam kết hoàn lại tiền</h5>
                    </div>
                  </div>
                </div>
                <p className='mb-4 text-[#696e77]'>
                  Với chi phí chỉ từ 1.000đ/ngày, khách hàng nhận mức quyền lợi bảo vệ lên đến 2 tỷ đồng, chi phí chăm
                  sóc sức khỏe lên đến 600 triệu đồng/năm.
                </p>
                <div className='border-t border-gray-400 mt-4 pt-4'>
                  <div className='flex items-center'>
                    <img className='flex-shrink-0 rounded-full me-3' src={profileImg} alt='' />
                    <h5 className='font-[Poppins,sans-serif] font-bold'>Liên hệ: +012 345 6789</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- About End --> */}

      {/* <!-- Facts Start --> */}
      <div className='max-w-full h-[415px] sm:px-4 overflow-hidden my-5 lg:px-0'>
        <div className='sm:px-4 facts lg:px-0 h-full'>
          <div className='flex flex-wrap h-full lg:mx-0'>
            <div
              className='lg:w-1/2 facts-text wow animate__animated animate__fadeIn bg-[url(src/assets/images/carousel-1.jpg)] bg-cover'
              data-wow-delay='0.1s'
            >
              <div className='w-full h-full bg-[rgba(1,95,201,0.9)] pl-[120px] pr-2'>
                <div className='h-full w-full px-4 lg:ps-0 flex flex-col justify-center'>
                  <h1 className='text-white mb-4 font-[Poppins,sans-serif] font-bold text-start'>
                    Dành cho cá nhân và tổ chức
                  </h1>
                  <p className='text-gray-100 mb-5'>
                    VBI CARE là dòng sản phẩm với mức bảo vệ lên tới 2 tỷ đồng với những quyền lợi mở rộng bao gồm ốm
                    đau, bệnh tật, tai nạn, chi phí nằm điều trị nội trú, ngoại trú, nha khoa và thai sản.
                  </p>
                  <button className='px-12 py-4 rounded-[10px] text-center font-[ui-sans-serif] text-[17px]  bg-[#0dd3f1] text-white hover:bg-[#015fc9] mt-10 self-start'>
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
            <div
              className='lg:w-1/2 facts-counter wow animate__animated animate__fadeIn bg-[url(src/assets/images/carousel-2.jpg)] bg-cover'
              data-wow-delay='0.5s'
            >
              <div className='w-full h-full bg-[rgba(255,255,255,0.9)] px-5 flex flex-col justify-center'>
                <div className='grid grid-cols-2'>
                  <div className='mb-20'>
                    <h1
                      className='font-[Poppins,sans-serif] font-bold text-[48px] leading-[57px]'
                      data-toggle='counter-up'
                    >
                      1234
                    </h1>
                    <p className=' text-[#015fc9] font-[ui-sans-serif] text-[23px] ml-2'>Khách hàng</p>
                  </div>
                  <div className=''>
                    <h1
                      className='font-[Poppins,sans-serif] font-bold text-[48px] leading-[57px]'
                      data-toggle='counter-up'
                    >
                      1234
                    </h1>
                    <p className=' text-[#015fc9] font-[ui-sans-serif] text-[23px] ml-2'>Hợp đồng</p>
                  </div>
                  <div className=''>
                    <h1
                      className='font-[Poppins,sans-serif] font-bold text-[48px] leading-[57px]'
                      data-toggle='counter-up'
                    >
                      1234
                    </h1>
                    <p className=' text-[#015fc9] font-[ui-sans-serif] text-[23px] ml-2'>Thành tựu</p>
                  </div>
                  <div className=''>
                    <h1
                      className='font-[Poppins,sans-serif] font-bold text-[48px] leading-[57px]'
                      data-toggle='counter-up'
                    >
                      1234
                    </h1>
                    <p className=' text-[#015fc9] font-[ui-sans-serif] text-[23px] ml-2'>Đội ngũ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Facts End --> */}

      {/* <!-- Features Start --> */}
      <div className='mt-20 py-10 h-[710px] px-[120px]'>
        <div className='h-full'>
          <div className='flex flex-wrap h-full'>
            <div className='lg:w-1/2 flex flex-col px-4 wow animate__animated animate__fadeInUp' data-wow-delay='0.1s'>
              <h1 className='text-[40px] text-[#15233c] font-[Poppins,sans-serif] leading-[48px] font-bold mb-5'>
                Một số lý do khiến mọi người chọn chúng tôi!
              </h1>
              <p className='text-[#696e77] mb-4 mt-10'>
                VBI CARE là dòng sản phẩm với mức bảo vệ lên tới 2 tỷ đồng với những quyền lợi mở rộng bao gồm ốm đau,
                bệnh tật, tai nạn, chi phí nằm điều trị nội trú, ngoại trú, nha khoa và thai sản.
              </p>
              <div className='flex flex-col gap-4 mt-8'>
                <div className='flex gap-4'>
                  <div className='wow animate__animated animate__fadeIn flex-1' data-wow-delay='0.1s'>
                    <div className='bg-gray-200/70 rounded-[14px] h-full p-4'>
                      <div className='bg-white flex flex-col justify-center text-center rounded-[10px] h-full py-4 px-3'>
                        <img className='self-center mb-3' src={icon6} alt='' />
                        <h5 className='mb-0 font-[Poppins,sans-serif] font-bold'>Quy trình đơn giản</h5>
                      </div>
                    </div>
                  </div>
                  <div className='wow animate__animated animate__fadeIn flex-1' data-wow-delay='0.2s'>
                    <div className='bg-gray-200/70 rounded-[14px] h-ful p-4'>
                      <div className='bg-white flex flex-col justify-center text-center rounded-[10px] h-full py-4 px-3'>
                        <img className='self-center mb-3' src={icon3} alt='' />
                        <h5 className='mb-0 font-[Poppins,sans-serif] font-bold'>Thời gian chờ ngắn</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <div className='wow animate__animated animate__fadeIn flex-1' data-wow-delay='0.3s'>
                    <div className='bg-gray-200/70 rounded-[14px] h-full p-4'>
                      <div className='bg-white flex flex-col justify-center text-center rounded-[10px] h-full py-4 px-3'>
                        <img className='self-center mb-3' src={icon4} alt='' />
                        <h5 className='mb-0 font-[Poppins,sans-serif] font-bold'>Quản lý chính sách</h5>
                      </div>
                    </div>
                  </div>
                  <div className='wow animate__animated animate__fadeIn flex-1' data-wow-delay='0.4s'>
                    <div className='bg-gray-200/70 rounded-[14px] h-full p-4'>
                      <div className='bg-white flex flex-col justify-center text-center rounded-[10px] h-full py-4 px-3'>
                        <img className='self-center mb-3' src={icon7} alt='' />
                        <h5 className='mb-0 font-[Poppins,sans-serif] font-bold'>Tiết kiệm chi phí</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='lg:w-1/2 pr-4 pl-4 wow animate__animated animate__fadeInUp' data-wow-delay='0.5s'>
              <div className='relative rounded overflow-hidden h-full' style={{ minHeight: '400px' }}>
                <img className='absolute w-full h-full' src={featureImg} alt='' style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Features End --> */}

      {/* <!-- Service Start --> */}
      <div className='py-5 mt-4'>
        <div className='container mx-auto sm:px-4'>
          <div className='text-center mx-auto' style={{ maxWidth: '500px' }}>
            <h1 className='text-[40px] text-[#15233c] font-[Poppins,sans-serif] leading-[48px] font-bold mb-5'>
              Chúng tôi cung cấp các dịch vụ bảo hiểm chuyên nghiệp.
            </h1>
          </div>
          <div className='flex flex-wrap justify-center gap-6'>
            <div className='flex gap-3'>
              {serviceList.slice(0, 3).map((service, index) => (
                <div
                  key={index}
                  className='lg:w-1/3 md:w-1/2 pr-4 wow animate__animated animate__fadeInUp'
                  data-wow-delay={`${0.1 + index * 0.2}s`}
                >
                  <div className='service-item rounded-[10px] h-full flex flex-col justify-center py-12'>
                    <div className='flex items-center mb-4'>
                      <div className='service-icon flex-shrink-0 bg-[#015fc9] rounded-r-[10px] me-4'>
                        <img className='max-w-full h-auto' src={service.url} alt='' />
                      </div>
                      <h4 className='font-[Poppins,sans-serif] font-bold'>{service.name}</h4>
                    </div>
                    <p className='mb-4 pl-10 pr-12 mt-4 text-[#696e77]'>{service.description}</p>
                    <button className='ml-10 px-4 py-[6px] rounded-[10px] text-center font-[ui-sans-serif] text-[17px] text-[#015fc9]  bg-white hover:text-white hover:bg-[#015fc9] self-start'>
                      Mua ngay
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className='flex gap-3'>
              {serviceList.slice(3, 6).map((service, index) => (
                <div
                  key={index}
                  className='lg:w-1/3 md:w-1/2 pr-4 wow animate__animated animate__fadeInUp'
                  data-wow-delay={`${0.1 + index * 0.2}s`}
                >
                  <div className='service-item rounded-[10px] h-full flex flex-col justify-center py-12'>
                    <div className='flex items-center mb-4'>
                      <div className='service-icon flex-shrink-0 bg-[#015fc9] rounded-r-[10px] me-4'>
                        <img className='max-w-full h-auto' src={service.url} alt='' />
                      </div>
                      <h4 className='font-[Poppins,sans-serif] font-bold'>{service.name}</h4>
                    </div>
                    <p className='mb-4 pl-10 pr-12 mt-4 text-[#696e77]'>{service.description}</p>
                    <button className='ml-10 px-4 py-[6px] rounded-[10px] text-center font-[ui-sans-serif] text-[17px] text-[#015fc9]  bg-white hover:text-white hover:bg-[#015fc9] self-start'>
                      Đọc thêm
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Service End --> */}

      {/* <!-- Appointment Start --> */}
      <div
        className=' wow animate__animated animate__fadeIn bg-[url(src/assets/images/carousel-1.jpg)] bg-contain'
        data-wow-delay='0.1s'
      >
        <div className='bg-[rgba(1,95,201,0.9)] w-full h-full container max-w-full mx-auto sm:px-4 my-20 py-[100px]'>
          <div className='container mx-auto sm:px-4 '>
            <div className='flex gap-8 h-full'>
              <div className='lg:w-1/2 pr-4 pl-4 wow animate__animated animate__fadeIn h-full' data-wow-delay='0.3s'>
                <h1 className='text-[40px] font-[Poppins,sans-serif] leading-[48px] font-bold text-white mb-10'>
                  Công ty chúng tôi hướng đến mục đích “Giúp khách hàng đạt được an toàn tài chính trọn đời và tận hưởng
                  cuộc sống khoẻ mạnh hơn”.
                </h1>
                <p className='text-white mb-5'>
                  Chúng tôi không ngừng tìm kiếm các giải pháp sáng tạo, thiết thực để đáp ứng tốt nhất nhu cầu Khách
                  hàng trong mọi giai đoạn cuộc đời. Chúng tôi mong muốn giúp Khách hàng làm chủ cuộc sống của mình,
                  ngay từ bây giờ cho đến khi họ an nhàn nghỉ hưu.
                </p>
                <div className='bg-white rounded-[10px] p-4 mt-12'>
                  <div className='flex items-center bg-[#015fc9] rounded-[10px] p-4'>
                    <img className='flex-shrink-0 rounded-full me-3' src={profileImg} alt='' />
                    <h5 className='text-white font-[Poppins,sans-serif] font-bold'>Liên hệ: +012 345 6789</h5>
                  </div>
                </div>
              </div>
              <div className='lg:w-1/2 wow animate__animated animate__fadeIn' data-wow-delay='0.5s'>
                <div className='bg-white rounded p-8 h-full'>
                  <form>
                    <div className='flex flex-col'>
                      <div className='flex'>
                        <FloatingInput id='appointment-your-name' placeholder='Họ tên' height={60} />
                        <FloatingInput id='appointment-your-email' placeholder='Email' height={60} />
                      </div>
                      <div className='flex'>
                        <FloatingInput id='appointment-your-phone' placeholder='Số điện thoại' height={60} />
                        <FloatingInput id='appointment-your-service' placeholder='Loại dịch vụ' height={60} />
                      </div>
                      <FloatingInput id='appointment-your-message' placeholder='Tin nhắn' height={80} />

                      <div className='w-full px-2 mt-2'>
                        <button
                          className='px-12 py-4 rounded-[10px] text-center font-[ui-sans-serif] text-[17px] bg-[#015fc9] text-white hover:bg-[#0dd3f1]'
                          type='submit'
                        >
                          Nhận cuộc hẹn
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Appointment End --> */}

      {/* <!-- Team Start --> */}
      <div className='container-xxl py-5'>
        <div className='container mx-auto sm:px-4'>
          <div className='text-center mx-auto mb-10' style={{ maxWidth: '500px' }}>
            <h1 className='text-[40px] text-[#15233c] font-[Poppins,sans-serif] leading-[48px] font-bold mb-5'>
              Thành viên chuyên nghiệp của đội ngũ
            </h1>
          </div>
          <div className='flex flex-wrap  g-4'>
            {teamMemberList.map((member, index) => (
              <div
                key={index}
                className='lg:w-1/4 md:w-1/2 pr-4 pl-4 wow animate__animated animate__fadeInUp'
                data-wow-delay={`${index * 0.2 + 0.1}s`}
              >
                <div className='team-item rounded-[10px]'>
                  <img className='max-w-full h-auto' src={member.url} alt='' />
                  <div className='text-center p-6'>
                    <h5 className='text-[#15233c] font-[Poppins,sans-serif] font-bold'>{member.name}</h5>
                    <span className='text-[#696e77]'>CEO</span>
                  </div>
                  <div className='team-text text-center bg-white p-6'>
                    <h5 className='text-[#15233c] font-[Poppins,sans-serif] font-bold'>{member.name}</h5>
                    <p className='text-[#696e77]'>CEO</p>
                    <div className='flex justify-center'>
                      <button className='flex justify-center items-center w-[38px] h-[38px] transition duration-[300ms] rounded-[10px] py-1 px-3 bg-gray-100 hover:bg-[#015fc9] m-1 group'>
                        <FontAwesomeIcon icon={faTwitter} className='text-[#015fc9] group-hover:text-white' />
                      </button>
                      <button className='flex justify-center items-center w-[38px] h-[38px] transition duration-[300ms] rounded-[10px] py-1 px-3 bg-gray-100 hover:bg-[#015fc9] m-1 group'>
                        <FontAwesomeIcon icon={faFacebookF} className='text-[#015fc9] group-hover:text-white' />
                      </button>
                      <button className='flex justify-center items-center w-[38px] h-[38px] transition duration-[300ms] rounded-[10px] py-1 px-3 bg-gray-100 hover:bg-[#015fc9] m-1 group'>
                        <FontAwesomeIcon icon={faYoutube} className='text-[#015fc9] group-hover:text-white' />
                      </button>
                      <button className='flex justify-center items-center w-[38px] h-[38px] transition duration-[300ms] rounded-[10px] py-1 px-3 bg-gray-100 hover:bg-[#015fc9] m-1 group'>
                        <FontAwesomeIcon icon={faLinkedinIn} className='text-[#015fc9] group-hover:text-white' />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <!-- Team End --> */}

      {/* <!-- Testimonial Start --> */}
      <div className='mt-16 py-5 mb-[100px]'>
        <div className='container mx-auto sm:px-4'>
          <div className='text-center mx-auto' style={{ maxWidth: '500px' }}>
            <h1 className='text-[40px] text-[#15233c] font-[Poppins,sans-serif] leading-[48px] font-bold mb-5'>
              Họ nói gì về bảo hiểm của chúng tôi
            </h1>
          </div>
          <div className='flex flex-wrap'>
            <div className='lg:w-1/4 pr-4 pl-4 hidden lg:block'>
              <div className='testimonial-left h-full'>
                <img
                  className='max-w-full h-auto animate__animated animate__pulse animate__infinite animate__slow'
                  src={test1}
                  alt=''
                />
                <img
                  className='max-w-full h-auto animate__animated animate__pulse animate__infinite animate__slow'
                  src={test2}
                  alt=''
                />
                <img
                  className='max-w-full h-auto animate__animated animate__pulse animate__infinite animate__slow'
                  src={test3}
                  alt=''
                />
              </div>
            </div>
            <div className='lg:w-1/2 pr-4 pl-4 mb-5 wow animate__animated animate__fadeIn' data-wow-delay='0.5s'>
              <Carousel
                loop={true}
                autoplay={true}
                className=''
                navigation={() => <div className=''></div>}
                prevArrow={({ loop, handlePrev, firstIndex }) => {
                  return (
                    <button
                      onClick={handlePrev}
                      disabled={!loop && firstIndex}
                      className='bg-[#015fc9] !absolute top-[90%] left-4 -translate-y-2/4 rounded-[10px] transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12 max-w-[36px] h-12 max-h-[36px] text-white hover:bg-[#87a4c6] active:bg-white/30 grid place-items-center'
                    >
                      <FontAwesomeIcon icon={faChevronLeft} strokeWidth={3} className='-ml-1 h-5 w-5' />
                    </button>
                  )
                }}
                nextArrow={({ loop, handleNext, lastIndex }) => (
                  <button
                    onClick={handleNext}
                    disabled={!loop && lastIndex}
                    className='bg-[#015fc9] !absolute top-[90%] right-4 -translate-y-2/4 rounded-[10px] transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12 max-w-[36px] h-12 max-h-[36px] text-white hover:bg-[#87a4c6] active:bg-white/30 grid place-items-center'
                  >
                    <FontAwesomeIcon icon={faChevronRight} strokeWidth={3} className='-ml-1 h-5 w-5' />
                  </button>
                )}
              >
                <div className='text-center'>
                  <img className='max-w-full h-auto rounded mx-auto mb-4' src={test1} alt='' />
                  <p className='text-[20px] text-[#696e77] font-[Poppins,sans-serif]'>
                    Insure luôn đóng góp tích cực trong các hoạt động hướng đến việc phát triển bền vững cho cộng đồng.
                  </p>
                  <h5 className='text-[20px] text-[#15233c] font-[Poppins,sans-serif] leading-[48px] font-bold'>
                    Tên khách hàng
                  </h5>
                  <span className='text-[#696e77]'>Nghề nghiệp</span>
                </div>
                <div className='text-center'>
                  <img className='max-w-full h-auto rounded mx-auto mb-4' src={test2} alt='' />
                  <p className='text-[20px] text-[#696e77] font-[Poppins,sans-serif]'>
                    Insure luôn đóng góp tích cực trong các hoạt động hướng đến việc phát triển bền vững cho cộng đồng.
                  </p>
                  <h5 className='text-[20px] text-[#15233c] font-[Poppins,sans-serif] leading-[48px] font-bold'>
                    Tên khách hàng
                  </h5>
                  <span className='text-[#696e77]'>Nghề nghiệp</span>
                </div>
                <div className='text-center'>
                  <img className='max-w-full h-auto rounded mx-auto mb-4' src={test3} alt='' />
                  <p className='text-[20px] text-[#696e77] font-[Poppins,sans-serif]'>
                    Insure luôn đóng góp tích cực trong các hoạt động hướng đến việc phát triển bền vững cho cộng đồng.
                  </p>
                  <h5 className='text-[20px] text-[#15233c] font-[Poppins,sans-serif] leading-[48px] font-bold'>
                    Tên khách hàng
                  </h5>
                  <span className='text-[#696e77]'>Nghề nghiệp</span>
                </div>
              </Carousel>
            </div>
            <div className='lg:w-1/4 pr-4 pl-4 hidden lg:block'>
              <div className='testimonial-right h-full'>
                <img
                  className='max-w-full h-auto animate__animated animate__pulse animate__infinite animate__slow'
                  src={test1}
                  alt=''
                />
                <img
                  className='max-w-full h-auto animate__animated animate__pulse animate__infinite animate__slow'
                  src={test2}
                  alt=''
                />
                <img
                  className='max-w-full h-auto animate__animated animate__pulse animate__infinite animate__slow'
                  src={test3}
                  alt=''
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Testimonial End --> */}

      {/* <!-- Back to Top --> */}
      <button
        onClick={scrollToTop}
        className={`${
          isVisible ? 'animate__animated animate__fadeIn' : 'animate__animated animate__fadeOut pointer-events-none'
        } fixed right-[30px] bottom-[30px] z-[99] rounded-[10px] text-center py-3 px-4 bg-[#015fc9] text-white hover:bg-[#0dd3f1]`}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  )
}

export default Home
