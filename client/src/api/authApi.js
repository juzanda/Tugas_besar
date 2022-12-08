import axiosClient from "./axiosClient"

const authApi = {
  signup: params => axiosClient.post('auth/signup', params),
  login: params => axiosClient.post('auth/login', params),
  updatePassword: params => axiosClient.post('auth/updatePassword', params),
  forgetPassword :  params => axiosClient.post('auth/forgetPassword', params),
  verifyToken: () => axiosClient.post('auth/verify-token'),
  GoogleApi :  params => axiosClient.post('auth/google-api', params),
  getOne: (id) => axiosClient.get(`auth/${id}`)
}

export default authApi
