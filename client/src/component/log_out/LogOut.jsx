import { removeToken } from '../../services/auth'

export const logOut = () => {
  localStorage.removeItem("authToken")
  removeToken()
}