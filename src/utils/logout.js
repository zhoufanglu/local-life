export default function logout() {
  uni.removeStorageSync('token')
  uni.navigateTo({
    url: '/pages/plaza/index',
  })
}
