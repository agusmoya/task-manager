import { jwtDecode } from 'jwt-decode'


export const isTokenExpired = (token: string) => {
  if (!token) return true
  try {
    const { exp } = jwtDecode<{ exp: number }>(token)
    const now = Math.floor(Date.now() / 1000)
    return exp < now
  } catch (error) {
    console.log('Error decoding token:', error)
    // Si hay un error al decodificar el token, consideramos que está expirado
    // return true
  }
}