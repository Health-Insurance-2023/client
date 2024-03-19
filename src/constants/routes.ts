const routes = {
  home: '/',
  login: '/login',
  confirmAccount: '/confirm/:email',
  service: '/service',
  support: '/support',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password/:email',
  admin: '/admin',
  dashboard: '/admin/dashboard',
  formManagement: '/admin/form-management',
  accountManagement: '/admin/account-management',
  insurancePackageManagement: '/admin/insurance-package-management',
  contractManagemet: '/admin/contract-management',
  paymentManagement: '/admin/payment-management',
  claimManagement: '/admin/claim-management',

  /* user */
  profile: '/user/profile',
  userFormManagement: '/user/form',
  userPaymentManagement: '/user/payment',
  userContractManagement: '/user/contract',
  userClaimManagement: '/user/claim/management',
  userHealthManagement: '/user/health/management',
  claimRequest: '/user/claim',
  request: '/request',
  registerInsurance: '/register-insurance'
} as const

export default routes
