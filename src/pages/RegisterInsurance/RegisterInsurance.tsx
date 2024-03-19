import { faCircleCheck, faEye, faPenToSquare, faWeightScale } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Stepper, Step, Typography } from '@material-tailwind/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { ErrorResponse, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import insurancePlanApi from 'src/apis/insurancePlan.api'
import registrationFormApi from 'src/apis/registrationForm.api'
import BenefitDialog from 'src/components/BenefitDialog'
import ConfirmInfor from 'src/components/ConfirmInfor'
import HealthInformationForm from 'src/components/HealthInformationForm'
import { AdditionalBenefitListType } from 'src/components/InsurancePlanCard/InsurancePlanCard'
import InsuranceRegistrationForm from 'src/components/InsuranceRegistrationForm'
import routes from 'src/constants/routes'
import { InsurancePlan } from 'src/types/insurancePlan.type'
import {
  newHealthInformationType,
  newInsuranceInformationType,
  newInsuredPersonType,
  newRegistrationFormType,
  registrationFormSchema
} from 'src/types/registrationForm.type'
import { isAxiosInternalServerError } from 'src/utils/utils'

export const RegisterInsurance = () => {
  const getAllPlan = useQuery({
    queryKey: [`get-all-plan`],
    queryFn: () => insurancePlanApi.getAllInsurancePlan(),
    onError: (err) => console.log(err)
  })
  const insurancePlanList = getAllPlan.data?.data as InsurancePlan[]

  const [activeStep, setActiveStep] = useState(0)
  const [isLastStep, setIsLastStep] = useState(false)
  const [isFirstStep, setIsFirstStep] = useState(false)
  const [checkboxState, setCheckboxState] = useState({
    OutpatientCheckbox: false,
    DentalCheckbox: false,
    MaternityCheckbox: false,
    DeathCheckbox: false
  })
  const [isSuccess, setIsSuccess] = useState(false)
  const [date, setDate] = useState(new Date('2023-1-19').toDateString())
  const [age, setAge] = useState(0)
  const [relationship, setRelationship] = useState('Bản thân')
  const [gender, setGender] = useState('Nam')
  const [selectedPlan, setSelectedPlan] = useState<number>(0)
  const [additionalBenefitList, setAdditionalBenefitList] = useState<AdditionalBenefitListType>({
    outpatient: [],
    dental: [],
    maternity: [],
    death: []
  })
  const [isHasAdditionalBenefits, setIsHasAdditionalBenefits] = useState(false)
  const [groupAge, setGroupAge] = useState<number>(1)

  const [healthAnswers, setHealthAnswers] = useState<Record<string, string>>({
    radiationTreatment: 'Không',
    neurologicalTreatment: 'Không',
    cardiovascularTreatment: 'Không',
    metabolicTreatment: 'Không',
    infectiousDiseaseTreatment: 'Không',
    Disability: 'Không',
    strokeOrAsthma: 'Không',
    injured: '',
    medicalTreatment: '',
    pregnant: 'Không',
    ComplicationHistory: 'Không'
  })

  const [openBenefitDialog, setOpenBenefitDialog] = useState(false)
  const [isAcceptPolicy, setIsAcceptPolicy] = useState(false)
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const handleOpenBenefitDialog = () => setOpenBenefitDialog(!openBenefitDialog)

  const handleCheckboxChange = (checkboxName) => {
    setCheckboxState((prevState) => ({
      ...prevState,
      [checkboxName]: !prevState[checkboxName]
    }))
  }

  const handleNext = () => {
    if (activeStep === 0) {
      !isLastStep && !checkErrorStep1() && setActiveStep((cur) => cur + 1)
    }
    if (activeStep === 1) {
      !isLastStep && !checkErrorStep2() && setActiveStep((cur) => cur + 1)
    }
  }
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    scrollToTop()
  }, [activeStep])

  const signupNewInsuranceMutation = useMutation({
    mutationFn: (body: newRegistrationFormType) => registrationFormApi.signUpNewInsurance(body),
    onSuccess: () => {
      setIsSuccess(true)
      // toast.success(res.data.message, { autoClose: 2000 })
    },
    onError: (error) => {
      if (isAxiosInternalServerError<ErrorResponse>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          toast.error('Đã có lỗi xảy ra. Vui lòng thử lại', { autoClose: 2000 })
        }
      }
    }
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      cmnd: '',
      address: ''
    },
    validationSchema: registrationFormSchema,
    initialTouched: {
      name: false,
      email: false,
      phone: false,
      cmnd: false,
      address: false
    },

    onSubmit: async (data) => {
      let outpatientPrice = 0
      let dentalPrice = 0
      let maternityPrice = 0
      let deathPrice = 0

      if (checkboxState.OutpatientCheckbox == true) {
        outpatientPrice = additionalBenefitList.outpatient[groupAge - 1].price
      }
      if (checkboxState.DentalCheckbox == true) {
        dentalPrice = additionalBenefitList.dental[0].price
      }
      if (checkboxState.MaternityCheckbox == true) {
        maternityPrice += additionalBenefitList.maternity[0].price
      }
      if (checkboxState.DeathCheckbox == true) {
        deathPrice += additionalBenefitList.death[0].price
      }

      const insuredPerson: newInsuredPersonType = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        birthday: new Date(date),
        gender: gender === 'Nam' ? 'male' : 'female',
        address: data.address,
        relationshipWithBuyers: relationship,
        cmnd: data.cmnd
      }

      const healthInformation: newHealthInformationType = {
        injured: healthAnswers.injured,
        medicalTreatment: healthAnswers.medicalTreatment,
        radiationTreatment: healthAnswers.radiationTreatment,
        neurologicalTreatment: healthAnswers.neurologicalTreatment,
        cardiovascularTreatment: healthAnswers.cardiovascularTreatment,
        metabolicTreatment: healthAnswers.metabolicTreatment,
        infectiousDiseaseTreatment: healthAnswers.infectiousDiseaseTreatment,
        disability: healthAnswers.Disability,
        strokeOrAsthma: healthAnswers.strokeOrAsthma,
        pregnant: gender === 'Nam' ? null : healthAnswers.pregnant,
        complicationHistory: gender === 'Nam' ? null : healthAnswers.ComplicationHistory
      }

      const insuranceInformation: newInsuranceInformationType = {
        planName: insurancePlanList[selectedPlan].planName,
        planCost: insurancePlanList[selectedPlan].prices[groupAge - 1].price,
        additionalCost: outpatientPrice + dentalPrice + maternityPrice + deathPrice,
        accidentInsurance: insurancePlanList[selectedPlan].accidentInsurance,
        hospitalization: insurancePlanList[selectedPlan].hospitalization,
        surgery: insurancePlanList[selectedPlan].surgery,
        beforeAdmission: insurancePlanList[selectedPlan].beforeAdmission,
        afterDischarge: insurancePlanList[selectedPlan].afterDischarge,
        takeCareAtHome: insurancePlanList[selectedPlan].takeCareAtHome,
        hospitalizationAllowance: insurancePlanList[selectedPlan].hospitalizationAllowance,
        emergencyTransport: insurancePlanList[selectedPlan].emergencyTransport,
        funeralAllowance: insurancePlanList[selectedPlan].funeralAllowance,
        outpatientTreatmentMax: checkboxState.OutpatientCheckbox
          ? additionalBenefitList.outpatient[groupAge - 1].maxPayout
          : 0,
        outpatientTreatment: checkboxState.OutpatientCheckbox
          ? additionalBenefitList.outpatient[groupAge - 1].perTimesPayout
          : 0,
        dentalCare: checkboxState.DentalCheckbox ? additionalBenefitList.dental[0].maxPayout : 0,
        maternity: checkboxState.MaternityCheckbox ? additionalBenefitList.maternity[0].maxPayout : 0,
        death: checkboxState.DeathCheckbox ? additionalBenefitList.death[0].maxPayout : 0
      }

      signupNewInsuranceMutation.mutate({
        insuredPerson: insuredPerson,
        healthInformation: healthInformation,
        insuranceInformation: insuranceInformation
      })
    }
  })

  const checkErrorStep1 = (): boolean => {
    if (
      formik.errors.name ||
      formik.errors.email ||
      formik.errors.phone ||
      formik.errors.cmnd ||
      formik.errors.address ||
      formik.values.name === '' ||
      formik.values.email === '' ||
      formik.values.phone === '' ||
      formik.values.cmnd === '' ||
      formik.values.address === ''
    ) {
      toast.error('Hãy nhập đầy đủ thông tin', { autoClose: 3000 })
      return true
    }
    return false
  }

  const checkErrorStep2 = (): boolean => {
    if (healthAnswers.injured === '' || healthAnswers.medicalTreatment === '') {
      toast.error('Hãy nhập đầy đủ thông tin', { autoClose: 3000 })
      return true
    }
    return false
  }

  if (getAllPlan.isLoading) {
    return (
      <div className='loading loading-center-body bg-gray-200'>
        <div className='loader-circle-8'>
          <svg className='circular' viewBox='25 25 50 50'>
            <circle className='path' cx='50' cy='50' r='20' fill='none' strokeWidth='5' strokeMiterlimit='10' />
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full px-24 py-4 bg-gradient-to-b from-[#d0edfc] via-white to-[#FFF7F0]'>
      {isSuccess ? (
        <div className='bg-white rounded-md py-12 shadow-md h-[500px] flex flex-col items-center justify-center gap-4 '>
          <FontAwesomeIcon
            icon={faCircleCheck}
            className='h-[120px] text-green-400 animate__animated animate__bounceIn'
          />
          <div className='font-bold text-2xl animate__animated animate__fadeInUp'>
            Đơn đăng ký của bạn đã được gửi thành công
          </div>
          <div className='animate__animated animate__fadeInUp'>
            Bạn có thể theo dõi{' '}
            <Link to={routes.userFormManagement} className='hover:underline text-semibold text-yellow-600'>
              tại đây
            </Link>
          </div>
        </div>
      ) : (
        <div className='bg-white rounded-md py-12 shadow-md'>
          {/* stepper */}
          <div className='px-[400px]'>
            <Stepper
              lineClassName='bg-gray-200'
              activeLineClassName='bg-blue-500'
              activeStep={activeStep}
              isLastStep={(value) => setIsLastStep(value)}
              isFirstStep={(value) => setIsFirstStep(value)}
            >
              <Step
                activeClassName='ring-0 bg-[#1E40AF] text-white'
                completedClassName='bg-[#1E40AF] text-white'
                className='cursor-pointer'
                onClick={() => setActiveStep(0)}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
                <div className='absolute -bottom-[3.5rem] w-max text-center'>
                  <Typography variant='h6' color={activeStep === 0 ? 'blue-gray' : 'gray'}>
                    Bước 1
                  </Typography>
                  <Typography color={activeStep === 0 ? 'blue-gray' : 'gray'} className='font-normal'>
                    Điền thông tin cá nhân
                  </Typography>
                </div>
              </Step>
              <Step
                activeClassName='ring-0 bg-[#1E40AF] text-white'
                completedClassName='bg-[#1E40AF] text-white'
                className='cursor-pointer'
                onClick={() => {
                  // setCountRerender((cur) => cur + 1)
                  !checkErrorStep1() && setActiveStep(1)
                }}
              >
                <FontAwesomeIcon icon={faWeightScale} />
                <div className='absolute -bottom-[3.5rem] w-max text-center'>
                  <Typography variant='h6' color={activeStep === 1 ? 'blue-gray' : 'gray'}>
                    Bước 2
                  </Typography>
                  <Typography color={activeStep === 1 ? 'blue-gray' : 'gray'} className='font-normal'>
                    Điền thông tin sức khỏe
                  </Typography>
                </div>
              </Step>
              <Step
                activeClassName='ring-0 bg-[#1E40AF] text-white'
                completedClassName='bg-[#1E40AF] text-white'
                className='cursor-pointer'
                onClick={() => !checkErrorStep2() && setActiveStep(2)}
              >
                <FontAwesomeIcon icon={faEye} />
                <div className='absolute -bottom-[3.5rem] w-max text-center'>
                  <Typography variant='h6' color={activeStep === 2 ? 'blue-gray' : 'gray'}>
                    Bước 3
                  </Typography>
                  <Typography color={activeStep === 2 ? 'blue-gray' : 'gray'} className='font-normal'>
                    Xác nhận thông tin
                  </Typography>
                </div>
              </Step>
            </Stepper>
          </div>
          <hr className='mt-[80px]' />
          {/*end stepper */}
          {/* form */}
          <div className='px-20 mt-[40px]'>
            {activeStep === 0 && (
              <InsuranceRegistrationForm
                age={age}
                setAge={setAge}
                date={date}
                setDate={setDate}
                relationship={relationship}
                setRelationship={setRelationship}
                gender={gender}
                setGender={setGender}
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
                formik={formik}
                insurancePlanList={insurancePlanList}
                checkboxState={checkboxState}
                handleCheckboxChange={handleCheckboxChange}
                handleOpenBenefitDialog={handleOpenBenefitDialog}
                additionalBenefitList={additionalBenefitList}
                setAdditionalBenefitList={setAdditionalBenefitList}
                isHasAdditionalBenefits={isHasAdditionalBenefits}
                setIsHasAdditionalBenefits={setIsHasAdditionalBenefits}
                groupAge={groupAge}
                setGroupAge={setGroupAge}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
              />
            )}
            {activeStep === 1 && (
              <HealthInformationForm
                gender={gender}
                healthAnswers={healthAnswers}
                setHealthAnswers={setHealthAnswers}
              />
            )}
            {activeStep === 2 && (
              <ConfirmInfor
                checkboxState={checkboxState}
                insurancePlanList={insurancePlanList}
                selectedPlan={selectedPlan}
                formik={formik}
                gender={gender}
                birthday={date}
                groupAge={groupAge}
                age={age}
                additionalBenefitList={additionalBenefitList}
                healthAnswers={healthAnswers}
                setIsAcceptPolicy={setIsAcceptPolicy}
              />
            )}
          </div>
          {/* button nex. prev */}
          <div className='mt-20 flex justify-end gap-4 px-20'>
            <button
              className={`${
                isFirstStep ? 'bg-gray-400' : 'bg-[#1E40AF] text-white hover:bg-blue-600'
              } font-bold w-[90px] py-1 rounded-md `}
              onClick={handlePrev}
              disabled={isFirstStep}
            >
              Trước
            </button>
            {isLastStep ? (
              <button
                className={`font-bold w-[90px] py-1 rounded-md ${
                  !isAcceptPolicy ? 'bg-gray-400' : 'bg-[#1E40AF] text-white hover:bg-blue-600'
                }`}
                onClick={formik.submitForm}
                disabled={!isAcceptPolicy}
              >
                Gửi
              </button>
            ) : (
              <button
                className={`${
                  isLastStep ? 'bg-gray-400' : 'bg-[#1E40AF] text-white hover:bg-blue-600'
                } font-bold w-[90px] py-1 rounded-md `}
                onClick={handleNext}
                disabled={isLastStep}
              >
                Tiếp
              </button>
            )}
          </div>
        </div>
      )}
      <BenefitDialog
        openBenefitDialog={openBenefitDialog}
        handleOpenBenefitDialog={handleOpenBenefitDialog}
        checkboxState={checkboxState}
        insurancePlanList={insurancePlanList}
        selectedPlan={selectedPlan}
        additionalBenefitList={additionalBenefitList}
        isHasAdditionalBenefits={isHasAdditionalBenefits}
        groupAge={groupAge}
      />
    </div>
  )
}

export default RegisterInsurance
