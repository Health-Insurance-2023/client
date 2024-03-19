export type ErrorResponse = {
  statusCode: number
  errorKey: string
  message: string
  date: string
}

export type SuccessResponseData<Data> = {
  data: Data
}

export type SuccessResponse = {
  message: string
  key?: string
}

export type PageableType = {
  pageNumber: number
  pageSize: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  offset: number
  unpaged: boolean
  paged: boolean
}

export type StatusFilterType = {
  key: string
  content: string
}
