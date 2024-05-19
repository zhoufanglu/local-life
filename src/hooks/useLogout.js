import { logoutApi } from '@/api/modules/user'

const useLogout = () => {
  const logout = () => {
    logoutApi({}).then((res) => {
      console.log(6, res)
      uni.clearStorage()
      uni.navigateTo({
        url: `/pages/login/index`,
      })
    })
  }

  return {
    logout,
  }
}

export { useLogout }
