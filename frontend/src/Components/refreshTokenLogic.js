//sending refresh token to create new access token
const refreshToken = async()=>{
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/refresh-token`,{
      method:'POST',
      credentials:'include'
    })
    const data = await res.json()
    sessionStorage.setItem("token", data.token)
  }

export default refreshToken