export interface Identifiable {
  id: number
}

export interface ApiResponse<T, E>{
  success: boolean
  data: T | null
  error?: E | null
  statusCode: number
}
