type InsuranceBenefit = {
  name: string
  description?: string
}

// Định nghĩa loại bảo hiểm tai nạn với danh sách quyền lợi
type InsuranceType = {
  typeName: string
  benefits: InsuranceBenefit[]
}

type AdditionalBenefits = {
  key: string
  name: string
  description?: string
}

type AdditionalInsuranceType = {
  typeName: string
  AdditionalBenefits: AdditionalBenefits[]
}

export const insuranceBenefits: InsuranceType[] = [
  {
    typeName: 'Bảo hiểm tai nạn',
    benefits: [
      {
        name: 'Tử vong/thương tật toàn bộ vĩnh viễn'
      },
      {
        name: 'Thương tật bộ phận vĩnh viễn'
      }
    ]
  },
  {
    typeName: 'Bảo hiểm Điều trị nội trú do ốm đau bệnh tật, tai nạn',
    benefits: [
      {
        name: 'Nằm viện (Tối đa 60 ngày/năm)\n',
        description:
          '- Tiền giường điều trị \n- Xét nghiệm, chẩn đoán hình ảnh \n- Thuốc điều trị\n- Các chi phí y tế khác trong\n thời gian nằm viện'
      },
      {
        name: 'Phẫu thuật',
        description: 'bao gồm cấy ghép nội tạng trừ chi phí mua các bộ phận nội tạng và chi phí hiến nội tạng'
      }
    ]
  },
  {
    typeName: 'Các quyền lợi khác',
    benefits: [
      {
        name: 'Chi phí trước khi nhập viện (30 ngày trước khi nhập viện)'
      },
      {
        name: 'Chi phí điều trị sau khi xuất viện (30 ngày kể từ ngày xuất viện)'
      },
      {
        name: 'Chi phí y tá chăm sóc tại nhà ngay sau khi xuất viện (tối đa 15 ngày/ năm)'
      },
      {
        name: 'Trợ cấp nằm viện tại bệnh viện công (tối đa 60 ngày/ năm)'
      },
      {
        name: 'Vận chuyển cấp cứu',
        description:
          '(loại trừ bằng đường hàng không). Trong trường hợp không có dịch vụ cứu thương của địa phương, Người được bảo hiểm có thể dùng taxi với giới hạn trách nhiệm tới 200.000VNĐ/ vụ. Hóa đơn taxi phải được cung cấp với thông tin liên quan'
      },
      {
        name: 'Trợ cấp mai táng',
        description: 'trong trường hợp NĐBH bị chết tại bệnh viện sau khi điều trị nội trú do ốm đau, bệnh tật'
      }
    ]
  }
]

export const additionalBenefits: AdditionalInsuranceType = {
  typeName: 'Quyền lợi bổ sung',
  AdditionalBenefits: [
    {
      key: 'Outpatient treatment',
      name: 'Bảo hiểm Điều trị ngoại trú',
      description:
        '-Chi phí khám bệnh.\n- Chi phí thuốc theo kê đơn của bác sĩ\n- Chi phí xét nghiệm, chẩn đoán hình ảnh và điều trị bệnh do bác sĩ chỉ định\n- Bao gồm cả điều trị và phẫu thuật trong ngày'
    },
    {
      key: 'Physical therapy',
      name: 'Vật lý trị liệu'
    },
    {
      key: 'Dental Care',
      name: 'Bảo hiểm Chăm sóc răng'
    },
    {
      key: 'Maternity',
      name: 'Bảo hiểm Thai sản',
      description: '- Biến chứng thai sản\n- Sinh thường\n- Sinh mổ'
    },
    {
      key: 'Death',
      name: 'Bảo hiểm Tử vong\n do ốm đau, bệnh tật'
    }
  ]
}
