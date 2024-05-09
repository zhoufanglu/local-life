export default function logout() {
  uni.removeStorageSync('token')
  uni.removeStorageSync('userNo')
  uni.navigateTo({
    url: '/pages/plaza/index',
  })
}
