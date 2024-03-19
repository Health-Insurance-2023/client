import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type QuestionType = {
  question: string
  key: string
}

export const healthYesNoQuestions: QuestionType[] = [
  {
    question: 'Ông/Bà đã bao giờ phải điều trị bằng tia xạ hay hóa chất?',
    key: 'radiationTreatment'
  },
  {
    question: 'Ông/Bà đã bao giờ phải điều trị các bệnh về thần kinh?',
    key: 'neurologicalTreatment'
  },
  {
    question: 'Ông/Bà đã bao giờ phải điều trị các bệnh về tim mạch hay cao huyết áp?',
    key: 'cardiovascularTreatment'
  },
  {
    question: 'Ông/Bà đã bao giờ phải điều trị bệnh tiểu đường hay các bệnh chuyển hoá?',
    key: 'metabolicTreatment'
  },
  {
    question: 'Ông/Bà đã bao giờ phải điều trị các bệnh truyền nhiễm?',
    key: 'infectiousDiseaseTreatment'
  },
  {
    question: 'Ông/Bà có đã hoặc đang mắc bệnh mãn tính hoặc di chứng do các vụ tai nạn hay bị các khuyết tật?',
    key: 'disability'
  },
  {
    question: 'Ông/Bà đã bao giờ bị mắc hoặc được bác sĩ thông báo cho biết mình bị đột quỵ/hen suyễn?',
    key: 'strokeOrAsthma'
  }
]

export const healthQuestions: QuestionType[] = [
  {
    question: 'Người được bảo hiểm có bị thương tật gì không (ghi rõ lý do và tỉ lệ thương tật là bao nhiêu)?',
    key: 'injured'
  },
  {
    question: 'Ông/Bà có đang được điều trị y tế (điểu trị ngoại trú hay nội trú và lý do)?',
    key: 'medicalTreatment'
  }
]

export const healthQuestionsForFemale: QuestionType[] = [
  {
    question: 'Bà có đang mang thai không?',
    key: 'pregnant'
  },
  {
    question: 'Bà đã bao giờ bị sẩy thai, sinh khó, mổ lấy thai hay biến chứng thai sản không?',
    key: 'ComplicationHistory'
  }
]

interface Props {
  gender: string
  healthAnswers: Record<string, string>
  setHealthAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>
}

export const HealthInformationForm = (props: Props) => {
  const handleAnswerChange = (key: string, value: string) => {
    // Cập nhật giá trị câu trả lời
    props.setHealthAnswers((prevAnswers) => ({ ...prevAnswers, [key]: value }))
  }

  return (
    <div className='flex flex-col ml-4'>
      <div className='flex gap-2 items-center'>
        <p className='font-bold text-xl text-black'>Tình trạng sức khỏe cá nhân</p>
        <button className='w-5 h-5 rounded-full bg-[#5F33E6] text-white flex justify-center items-center'>
          <FontAwesomeIcon className='h-3 w-3' icon={faQuestion} />
        </button>
      </div>
      <p>
        Nếu câu hỏi cần có câu trả lời chi tiết vui lòng trả lời đầy đủ nếu Ông/bà đã từng bị để chúng tôi dễ dàng xét
        duyệt hồ sơ của bạn. Nếu không thì ghi không <br />
        Để đảm bảo quyền lợi cho Người được bảo hiểm, bạn vui lòng đọc kĩ và tích(✔) Có hoặc Không nếu Người được bảo
        hiểm đã, đang mắc phải một trong các bệnh hoặc tình trạng dưới đây:
      </p>
      {/* câu hỏi trả lời */}
      <div className='w-full'>
        {healthQuestions.map((question, index) => (
          <div key={index} className='mt-4 text-[18px]'>
            <span className='font-bold'>{`Câu ${index + 1}: `}</span>
            <span>{question.question}</span>
            <textarea
              value={props.healthAnswers[question.key]}
              onChange={(e) => handleAnswerChange(question.key, e.target.value)}
              placeholder='Câu trả lời'
              className='mt-2 ml-12 w-2/3 resize-none rounded-md bg-white text-gray-900 shadow-lg border-gray-300 shadow-gray-900/5 text-[17px] focus:border-2'
            />
          </div>
        ))}
      </div>
      {/* Câu hỏi có không */}
      {healthYesNoQuestions.map((question, index) => (
        <div key={index}>
          <div className='mt-4 text-[18px]'>
            <span className='font-bold'>{`Câu ${index + 3}: `}</span>
            <span>{question.question}</span>
          </div>
          <div className='flex gap-8 mt-2 ml-14'>
            {/* có */}
            <label className='flex items-center gap-3 cursor-pointer'>
              <input
                checked={props.healthAnswers[question.key] === 'Có'}
                type='radio'
                name={`questions-${question.key}`}
                className='invisible peer/privacy'
                onChange={() => handleAnswerChange(question.key, 'Có')}
              />
              <span
                className={`absolute h-5 w-5 rounded-full border-2 border-gray-500 cursor-pointer
             peer-checked/privacy:bg-white peer-checked/privacy:border-[#5F33E6] after:content-[''] after:hidden after:absolute peer-checked/privacy:after:inline
             after:w-[6px] after:h-[13px] after:border-r-[3px] after:border-b-[3px] after:left-[6px] after:top-[0px] after:border-solid after:border-[#5F33E6] after:rotate-45
             `}
              ></span>
              <p className='font-bold '>Có</p>
            </label>
            {/* không */}
            <label className='flex items-center gap-3 cursor-pointer'>
              <input
                checked={props.healthAnswers[question.key] === 'Không'}
                type='radio'
                name={`questions-${question.key}`}
                className='invisible peer/privacy'
                onChange={() => handleAnswerChange(question.key, 'Không')}
              />
              <span
                className={`absolute h-5 w-5 rounded-full border-2 border-gray-500 cursor-pointer
             peer-checked/privacy:bg-white peer-checked/privacy:border-[#5F33E6] after:content-[''] after:hidden after:absolute peer-checked/privacy:after:inline
             after:w-[6px] after:h-[13px] after:border-r-[3px] after:border-b-[3px] after:left-[6px] after:top-[0px] after:border-solid after:border-[#5F33E6] after:rotate-45
             `}
              ></span>
              <p className='font-bold '>Không</p>
            </label>
          </div>
        </div>
      ))}
      {/* Câu hỏi chỉ dành cho nữ */}
      {props.gender == 'Nữ' &&
        healthQuestionsForFemale.map((question, index) => (
          <div key={index}>
            <div className='mt-4 text-[18px]'>
              <span className='font-bold'>{`Câu ${index + 9}: `}</span>
              <span>{question.question}</span>
            </div>
            <div className='flex gap-8 mt-2 ml-14'>
              {/* có */}
              <label className='flex items-center gap-3 cursor-pointer'>
                <input
                  checked={props.healthAnswers[question.key] === 'Có'}
                  type='radio'
                  name={`questions-${question.key}`}
                  className='invisible peer/privacy'
                  onChange={() => handleAnswerChange(question.key, 'Có')}
                />
                <span
                  className={`absolute h-5 w-5 rounded-full border-2 border-gray-500 cursor-pointer
           peer-checked/privacy:bg-white peer-checked/privacy:border-[#5F33E6] after:content-[''] after:hidden after:absolute peer-checked/privacy:after:inline
           after:w-[6px] after:h-[13px] after:border-r-[3px] after:border-b-[3px] after:left-[6px] after:top-[0px] after:border-solid after:border-[#5F33E6] after:rotate-45
           `}
                ></span>
                <p className='font-bold '>Có</p>
              </label>
              {/* không */}
              <label className='flex items-center gap-3 cursor-pointer'>
                <input
                  checked={props.healthAnswers[question.key] === 'Không'}
                  type='radio'
                  name={`questions-${question.key}`}
                  className='invisible peer/privacy'
                  onChange={() => handleAnswerChange(question.key, 'Không')}
                />
                <span
                  className={`absolute h-5 w-5 rounded-full border-2 border-gray-500 cursor-pointer
           peer-checked/privacy:bg-white peer-checked/privacy:border-[#5F33E6] after:content-[''] after:hidden after:absolute peer-checked/privacy:after:inline
           after:w-[6px] after:h-[13px] after:border-r-[3px] after:border-b-[3px] after:left-[6px] after:top-[0px] after:border-solid after:border-[#5F33E6] after:rotate-45
           `}
                ></span>
                <p className='font-bold '>Không</p>
              </label>
            </div>
          </div>
        ))}
    </div>
  )
}

export default HealthInformationForm
