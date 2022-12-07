import axiosClient from "./axiosClient"

const authApi = {
  signup: params => axiosClient.post('auth/signup', params),
  login: params => axiosClient.post('auth/login', params),
  forgetPassword :  params => axiosClient.post('auth/forgetPassword', params),
  verifyToken: () => axiosClient.post('auth/verify-token')
}

export default authApi
