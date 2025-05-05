import axios from "axios"

export const extractBackendErrorMessage = (responseError: unknown) => {
  if (
    axios.isAxiosError(responseError)
    && responseError.response
    && responseError.response.data
  ) {
    const { errors, msg } = responseError.response.data
    if (errors) return errors[0].msg
    else if (msg) return msg
  }

  return 'An unexpected axios error occurred.'
}
