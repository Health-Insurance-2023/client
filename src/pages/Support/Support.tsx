import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react'
import 'animate.css'
import { Fragment, useEffect, useState } from 'react'
import WOW from 'wow.js'

type AccordionCardType = {
  title: string
  content: string
}

const data: AccordionCardType[] = [
  {
    title: '1.Chọn gói bảo hiểm và cung cấp thông tin',
    content: 'Chọn giải pháp bảo hiểm phù hợp nhu cầu. Cung cấp thông tin của Người tham gia bảo hiểm.'
  },
  {
    title: '2.Xác nhận thông tin',
    content: 'Kiểm tra thông tin sản phẩm và người tham gia. Hoàn tất việc xác nhận tham gia bảo hiểm.'
  },
  {
    title: '3.Chờ thông báo xét duyệt',
    content: 'Khi mẫu đăng ký được xét duyệt thì sẽ có thông báo qua email.'
  },
  {
    title: '4.Thanh toán và nhận hợp đồng',
    content: 'Lựa chọn phương thức và hoàn tất thanh toán. Nhận Hợp đồng bảo hiểm qua email.'
  },
  {
    title:
      '1.Bảo hiểm sức khỏe toàn diện là gì? Tôi có thể tham gia các sản phẩm bảo hiểm trực tuyến cho vợ/chồng/ba/mẹ/con của tôi không?',
    content:
      'Bảo hiểm sức khỏe toàn diện (Comprehensive Health Insurance) là một loại bảo hiểm sức khỏe mà một cá nhân hoặc gia đình có thể mua ' +
      'để bảo vệ chúng ta khỏi các chi phí y tế đắt đỏ. Bảo hiểm này thường cung cấp một loạt các dịch vụ y tế và chi trả cho các chi phí ' +
      'liên quan đến việc chăm sóc sức khỏe, bao gồm cả chi phí khám bệnh, xét nghiệm, điều trị, và các dịch vụ khám chữa bệnh khác.\nTùy ' +
      'theo sản phẩm, bạn có thể mua bảo hiểm cho chính mình hoặc tham gia cho người thân. Thủ tục tham gia cũng rất đơn giản, và chúng tôi ' +
      'khuyến khích bạn và người thân trải nghiệm việc mua bảo hiểm trực tuyến với chúng tôi'
  },
  {
    title: '2.Thanh toán phí bảo hiểm trực tuyến như thế nào?',
    content:
      'Khi tham gia các sản phẩm bảo hiểm trực tuyến của Dai-ichi Life Việt Nam, Quý khách có thể linh hoạt thanh' +
      'toán phí qua hình thức thẻ nội địa (ATM), thẻ quốc tế ( Visa, Mastercard, JCB, American Express). Các hình' +
      'thức thanh toán mới sẽ được sớm giới thiệu đến khách hàng trong các giai đoạn tiếp theo.'
  },
  {
    title: '3.Tôi nhận Hợp đồng bảo hiểm qua hình thức nào?',
    content:
      'Quý khách sẽ nhận được Hợp đồng bảo hiểm điện tử thông qua địa chỉ email đã cung cấp cho Dai-ichi Life Việt Nam, bao gồm:' +
      '\n- Chứng nhận bảo hiểm' +
      '\n- Hồ sơ yêu cầu bảo hiểm' +
      '\n- Quy tắc và điều khoản sản phẩm' +
      '\n- Minh hoạt quyền lợi bảo hiểm' +
      '\n- Các loại giấy tờ khác tùy theo quy định sản phẩm' +
      '\nBộ hợp đồng cũng đồng thời được lưu trữ tại ứng dụng Dai-ichi Connect. Quý khách có thể truy cập Dai-ichi' +
      'Connect (https://kh.dai-ichi-life.com.vn) hoặc cài đặt ứng dụng Dai-ichi Connect trên điện thoại để tham khảo thông tin.' +
      '\nVới các khách hàng mới tham gia lần đầu tiên với Dai-ichi Life Việt Nam, Dai-ichi Life Việt Nam sẽ gửi thông tin tài khoản Dai-ichi Connect để Quý khách kích hoạt tài khoản.'
  },
  {
    title: '4.Nếu không có email thì tôi có tham gia bảo hiểm trực tuyến được không?',
    content:
      'Hiện tại, email là kênh liên lạc phổ biến giúp việc trao đổi thông tin giữa Dai-ichi Life Việt Nam với khách hàng' +
      ' được kịp thời và nhanh chóng. Dai-ichi Life Việt Nam sẽ gửi thông tin bộ hợp đồng bảo hiểm qua email nên Quý khách' +
      ' vui lòng cung cấp địa chỉ email chính xác để nhận Hợp đồng bảo hiểm và cập nhật các thông tin mới nhất từ Công ty.'
  },
  {
    title: '5.Tôi có thể quản lý và xem thông tin Hợp đồng bảo hiểm điện tử đã mua ở đâu?',
    content:
      'Sau khi hợp đồng được phát hành, những khách hàng mới lần đầu tiên tham gia với Dai-ichi Life Việt Nam sẽ được Dai-ichi' +
      ' Life Việt Nam cung cấp tài khoản để truy cập vào ứng dụng Dai-ichi Connect (https://kh.dai-ichi-life.com.vn) hoặc cài' +
      ' đặt ứng dụng Dai-ichi Connect trên điện thoại để truy cập dễ dàng và thuận tiện hơn. Với Dai-ichi Connect, việc quản lý' +
      ' hợp đồng của Quý khách sẽ trở nên dễ dàng và thuận tiện.'
  },
  {
    title:
      '6.Sau khi hợp đồng bảo hiểm phát hành, nếu có điều chỉnh thông tin hợp đồng, thông tin cá nhân, tôi cần thực hiện yêu cầu ở đâu?',
    content:
      'Hiện tại, với các yêu cầu điều chỉnh thông tin hợp đồng bảo hiểm hoặc thông tin cá nhân, Quý khách vui lòng thực hiện yêu cầu trực tiếp tại văn phòng Dai-ichi Life Việt Nam gần nhất trên toàn quốc.' +
      '\nĐể giúp Dai-ichi Life Việt Nam phục vụ đúng Bên mua bảo hiểm, Quý khách vui lòng mang theo CMND/CCCD khi đến giao dịch.' +
      'Trường hợp cần được hướng dẫn trước, Quý khách có thể liên hệ với Bộ phận Dịch vụ Khách hàng của chúng tôi thông qua số điện thoại đường dây nóng: (028) 3810 0888 (bấm phím 1).' +
      '\nDai-ichi Life Việt Nam cũng đang phát triển hình thức nhận yêu cầu điều chỉnh thông tin trực tuyến và sẽ sớm giới thiệu đến Quý khách trong thời gian sắp tới.'
  },
  {
    title: '7.Sau kỳ đóng phí đầu tiên để phát hành hợp đồng, tôi đóng phí bảo hiểm định kỳ tiếp theo như thế nào?',
    content:
      'Với các Hợp đồng bảo hiểm có đóng phí định kỳ, Quý khách có thể đóng phí bảo hiểm định kỳ tiếp theo qua các hình thức như sau:' +
      '\n1. Thanh toán tại Dai-ichi Connect (http://kh.dai-ichi-life.com.vn) bằng Thẻ nội địa hoặc Thẻ quốc tế của hơn 31 ngân hàng Việt Nam' +
      '\n2. Internet banking/ Mobile banking của các ngân hàng: Sacombank, BIDV, SHB, VCB Digibank/ ATM của ngân hàng Vietcombank' +
      '\n3. Ví điện tử:' +
      '\n- Ví điện tử bằng ứng dụng Ví MoMo' +
      '\n- Ví điện tử bằng ứng dụng Payoo hoặc website https://bill.payoo.vn và đóng phí bằng tiền mặt tại 2.400 cửa hàng liên kết với Payoo trên toàn quốc.' +
      '\n- Ví điện tử bằng ứng dụng Ví Việt của ngân hàng Bưu điện Liên Việt.' +
      '\n4. Ủy thác thanh toán phí bảo hiểm (Auto Debit): dành cho khách hàng có tài khoản tại Sacombank.' +
      '\n5. Chuyển khoản vào tài khoản của Dai-ichi Life Việt Nam. Quý khách đóng phí qua Ngân hàng, vui lòng điền đầy đủ như sau:' +
      '\n+ Chủ tài khoản: Công ty TNHH Bảo hiểm Nhân thọ Dai-ichi Việt Nam' +
      '\n+ Số tài khoản của Dai-ichi Life Việt Nam: Tham khảo danh sách tài khoản tại đây' +
      '\n+ Nội dung đóng tiền: [số Hợp đồng]-[họ tên Bên mua bảo hiểm]-[số điện thoại]' +
      '\n6. Nộp tiền mặt:' +
      '\n- Mạng lưới Bưu điện của Tổng Công ty Bưu điện Việt Nam trên toàn quốc (VNPost).' +
      '\n- Mạng lưới giao dịch của Viettel và siêu thị Viettel (Viettel Store) trên toàn quốc.' +
      '\n7. Trung tâm Dịch vụ Khách hàng Dai-ichi Life Việt Nam trên toàn quốc'
  },
  {
    title: '8.Ai sẽ là người phụ trách hợp đồng của tôi? Khi cần hỗ trợ, tôi sẽ liên hệ với ai và qua hình thức nào?',
    content:
      'Hợp đồng của Quý khách sẽ được Dai-ichi Life Việt Nam quản lý và phục vụ. Trong trường hợp cần hỗ trợ, Quý khách có thể' +
      ' liên hệ Bộ phận Dịch vụ Khách hàng của chúng tôi theo số đường dây nóng: (028) 3810 0888 (bấm phím 1) hoặc e-mail customer.services@dai-ichi-life.com.vn.'
  }
]

export function Icon({ id, open }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={2}
      stroke='currentColor'
      className={`${id === open ? 'rotate-180' : ''} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
    </svg>
  )
}

interface AccordionCardProps {
  open: number
  handleOpen: (value: any) => void
  index: number
  item: AccordionCardType
}

const AccordionCard = ({ open, handleOpen, index, item }: AccordionCardProps) => {
  return (
    <Accordion
      className='wow animate__animated animate__fadeInUp'
      data-wow-delay={index * 0.1 + 's'}
      open={open === index}
      icon={<Icon id={index} open={open} />}
    >
      <AccordionHeader
        onClick={() => handleOpen(index)}
        className={`${open === index ? 'text-[#99542d]' : ''} hover:text-[#99542d]`}
      >
        {item.title}
      </AccordionHeader>
      <AccordionBody className='text-[17px]'>
        <div className={``}>
          {item.content.split('\n').map((line, index) => (
            <Fragment key={index}>
              {line}
              {index !== item.content.split('\n').length - 1 && <br />}
            </Fragment>
          ))}
        </div>
      </AccordionBody>
    </Accordion>
  )
}

const Support = () => {
  const [open, setOpen] = useState(0)
  const [isMore, setIsMore] = useState(false)

  const handleOpen = (value) => setOpen(open === value ? 0 : value)
  useEffect(() => {
    const wow = new WOW()
    wow.init()
  }, [])

  const loadMore = () => {
    setIsMore(true)
  }
  return (
    <div className='h-full flex flex-col items-center pt-12 pb-6 bg-gradient-to-b from-[#FCE4D0] via-white to-[#FFF7F0]'>
      <p className='mx-auto text-2xl font-bold lg:text-6xl '>
        <span className='text-[#99542D]'>Ưu điểm</span> khi mua bảo hiểm trực tuyến
      </p>

      <div className='flex gap-8 justify-center items-center mt-10 wow animate__animated  animate__fadeInUp'>
        <div className='w-[358px] h-[208px] bg-white rounded-lg shadow-md flex flex-col items-center p-8'>
          <div className='flex justify-start w-full'>
            <img
              className='mb-4 w-70 h-70 animate__animated bounce animate__slower animate__infinite'
              src='src/assets/images/icon/calender_icon.svg'
            />
          </div>
          <p className='text-start'>
            Tiện lợi và nhanh chóng. Mua bảo hiểm chỉ cần vài bước đơn giản trực tuyến, tiết kiệm thời gian và công sức.
          </p>
        </div>
        <div className='w-[358px] h-[208px] bg-white rounded-lg shadow-md flex flex-col items-center p-8'>
          <div className='flex justify-start w-full'>
            <img
              className='mb-4 w-70 h-70 animate__animated bounce animate__slower animate__infinite'
              src='src/assets/images/icon/linh_hoat.svg'
            />
          </div>
          <p className='text-start'>
            Linh hoạt theo nhu cầu cá nhân. Tùy chọn gói bảo hiểm phù hợp với tài chính và mục tiêu cá nhân.
          </p>
        </div>
        <div className='w-[358px] h-[208px] bg-white rounded-lg shadow-md flex flex-col items-center p-8'>
          <div className='flex justify-start w-full'>
            <img
              className='mb-4 w-70 h-70 animate__animated bounce animate__slower animate__infinite'
              src='src/assets/images/icon/bao_mat.svg'
            />
          </div>
          <p className='text-start'>
            Bảo mật và đáng tin cậy. Thông tin được bảo mật tối đa và an toàn xuyên suốt quá trình đăng ký.
          </p>
        </div>
      </div>

      {/*  */}
      <div className='mt-8 flex flex-wrap-reverse justify-start px-4 mx-auto lg:px-24 max-w-7xl'>
        <div
          className='py-10 h-full lg:max-w-[60%] mx-auto lg:mx-0 wow animate__animated  animate__fadeInRight'
          data-wow-delay='0.1s'
        >
          <p
            data-aos='fade-left'
            data-aos-duration='500'
            className='mx-auto mb-5 text-2xl font-bold lg:text-4xl aos-init aos-animate'
          >
            Hướng dẫn mua <span className='text-[#99542D]'>trực tuyến</span>
          </p>
          <p
            data-aos='fade-left'
            data-aos-duration='500'
            className='mx-auto mb-5 text-justify text-2xl lg:text-xl aos-init'
          >
            Chỉ với 04 bước đơn giản, bạn đã có thể tham gia bảo hiểm trực tuyến vô cùng nhanh chóng.
          </p>
        </div>
        <div
          data-aos='fade-left'
          data-aos-duration='500'
          className='h-full lg:max-w-[40%] mx-auto lg:mx-0 aos-init aos-animate'
        >
          <div>
            <div className='float-right'>
              <img className='rounded-[40%_80%_40%_60%]' src='src/assets/images/support_banner.png' />
            </div>
          </div>
        </div>
      </div>
      {/* các bước */}
      <div className='flex flex-col w-[1000px] mt-8'>
        {data.slice(0, 4).map((item, index) => (
          <AccordionCard key={index} open={open} handleOpen={handleOpen} index={index + 1} item={item} />
        ))}
      </div>
      <h2 className='mb-8 text-4xl font-bold mt-10' data-v-2402277b=''>
        Câu hỏi thường gặp khi tham gia bảo hiểm trực tuyến
      </h2>
      <div className='flex flex-col w-[1000px] mt-8'>
        {data.slice(4, 8).map((item, index) => (
          <AccordionCard key={index} open={open} handleOpen={handleOpen} index={index + 1} item={item} />
        ))}
      </div>
      <button className={`text-[#ba000a] font-bold mt-4 ${isMore ? 'hidden' : ''}`} onClick={loadMore}>
        Xem thêm
      </button>
      {isMore && (
        <div className='flex flex-col w-[1000px]'>
          {data.slice(8, 12).map((item, index) => (
            <AccordionCard key={index} open={open} handleOpen={handleOpen} index={index + 1} item={item} />
          ))}
        </div>
      )}
      {/* THông tin liên hệ trưc tiếp */}
      <div className='px-4 lg:pt-10 mx-auto lg:px-24 bg-[#fefcfa]'>
        <div className='mx-auto max-w-7xl lg:px-24'>
          <h2 className='mb-4 text-4xl font-bold'>Liên hệ với Insure Life Việt Nam</h2>
          <p className='mb-8'>
            Bạn có thể liên hệ với Insure Life Việt Nam qua điện thoại, email hoặc gửi thư qua đường bưu điện.
          </p>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24'>
            <div>
              <div className='mb-4'>
                <img src='src/assets/images/icon/email.svg' />
              </div>
              <p className='mb-4 text-xl font-bold'>Email liên hệ</p>
              <div>
                <p>Thông tin liên quan sản phẩm và dịch vụ chăm sóc khách hàng hoặc quyền lợi khi tham gia bảo hiểm:</p>
                <p className='mb-4'>
                  <a href='mailto: customer.services@dai-ichi-life.com.vn' className='text-c2-500 hover:underline'>
                    customer.services@dai-ichi-life.com.vn
                  </a>
                </p>
                <p>Trung tâm dịch vụ khách hàng trên toàn quốc:</p>
                <p className='mb-4 text-c2-500 hover:underline'>
                  <a target='_blank' href='https://www.dai-ichi-life.com.vn/mang-luoi/282/'>
                    Xem tại đây
                  </a>
                </p>
              </div>
            </div>
            <div>
              <div className='mb-4'>
                <img src='src/assets/images/icon/phone.svg' />
              </div>
              <p className='mb-4 text-xl font-bold'>Hotline</p>
              <div>
                <p className='mb-4 text-c2-500 hover:underline'>
                  <a href='tel:02838100888'>(028) 3810 0888 </a>
                </p>
                <p>Thời gian phục vụ:</p>
                <p>Thứ Hai đến Chủ nhật: từ 08:00 - 17:30</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support
