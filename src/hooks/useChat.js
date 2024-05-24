import { WK_ADDR_WS } from '@/config/config'
import { getConversation } from '@/api/modules/im'
import { onBeforeUnmount } from 'vue'
import {
  MessageText,
  Channel,
  WKSDK,
  ChannelTypePerson,
  ChannelTypeGroup,
} from 'wukongimjssdk'

const useChat = (variables, getAllMessageCallBack) => {
  WKSDK.shared().config.addr = WK_ADDR_WS
  // 认证信息
  WKSDK.shared().config.uid = uni.getStorageSync('userNo').toString() // 用户uid（需要在悟空通讯端注册过）
  WKSDK.shared().config.token = uni.getStorageSync('token') // 用户token （需要在悟空通讯端注册过）
  console.log(9, WKSDK.shared().config)
  //?开启
  const connectWK_WK = () => {
    WKSDK.shared().connectManager.connect()
  }
  //?关闭
  const disconnectWK_WK = () => {
    WKSDK.shared().connectManager.disconnect()
  }
  //?监听
  const listener = () => {
    console.log('监听ws------')
    // 连接状态监听
    WKSDK.shared().connectManager.addConnectStatusListener(
      (status, reasonCode) => {
        console.log(23, status)
      },
    )
  }
  // listener()
  //?发送消息
  /**
   *
   * @param userNo
   * @param message
   */
  const sendMessageToUser = (userNo, message) => {
    console.log('发送消息--------', userNo, message)
    // 例如发送文本消息hello给用户u10001
    const text = new MessageText(message) // 文本消息
    WKSDK.shared().chatManager.send(
      text,
      new Channel(userNo, ChannelTypePerson),
    )
  }
  //?监听---发送消息状态
  const sendListen = (packet) => {
    // console.log('消息clientSeq->', packet.clientSeq) // 消息客户端序号用来匹配对应的发送的消息
    if (packet.reasonCode === 1) {
      // 发送成功
      uni.$u.toast('发送成功')
      uni.$emit('handleMessageCallback', 'receiver')
      // messageCallback('receiver')
      /*variables.messageList.push({
        avatar: variables.myAvatar,
        content: variables.message,
        userType: 'receiver',
      })
      variables.message = ''*/
    } else {
      // 发送失败
      uni.$u.toast('发送失败')
    }
  }
  // 消息发送状态监听
  WKSDK.shared().chatManager.addMessageStatusListener(sendListen)

  //?监听---接收消息
  const acceptListen = (message) => {
    // console.log('接收消息--', message)
    // 自己的消息也会接收到， 把不是自己的塞进去
    if (Number(message.fromUID) !== Number(uni.getStorageSync('userNo'))) {
      // console.log('接收他人消息--------', message.content.text)
      /*variables.messageList.push({
        avatar: variables.avatar,
        content: message.content.text,
        userType: 'sender',
      })*/
      // messageCallback('sender', message.content.text)
      uni.$emit(
        'handleMessageCallback',
        'sender',
        message.content.text,
        message.messageID,
      )
    }
  }
  WKSDK.shared().chatManager.addMessageListener(acceptListen)

  //?同步最近会话列表（所有人）
  const getRecentMessage = async () => {
    uni.showLoading({
      title: '读取中...',
      mask: true,
    })
    getConversation({
      uid: uni.getStorageSync('userNo').toString(), // 当前登录用户uid
      version: 0, //  当前客户端的会话最大版本号(从保存的结果里取最大的version，如果本地没有数据则传0)，
      // last_msg_seqs: 'xxx:2:123|xxx:1:3434', //   客户端所有频道会话的最后一条消息序列号拼接出来的同步串 格式： channelID:channelType:last_msg_seq|channelID:channelType:last_msg_seq  （此字段非必填，如果不填就获取全量数据，填写了获取增量数据，看你自己的需求。）
      msg_count: 2000, // 每个会话获取最大的消息数量，一般为app点进去第一屏的数据
    })
      .then((res) => {
        getAllMessageCallBack(res.data)
      })
      .finally(() => {
        uni.hideLoading()
      })
  }
  // getRecentMessage()

  //?获取频道的历史消息
  /*
  const getChanelHistoryMessages = async (channel) => {
    const opts = {
      startMessageSeq: 0, // 开始消息列号（结果包含startMessageSeq的消息）
      endMessageSeq: 0, //  结束消息列号（结果不包含endMessageSeq的消息）0表示不限制
      limit: 10000, // 每次限制数量
      pullMode: 0, // 拉取模式 0:向下拉取 1:向上拉取
    }
    const messages = await WKSDK.shared().chatManager.syncMessages(
      channel,
      opts,
    )
    console.log(102, messages)
  }
*/

  //?最近会话数据源
  // 提供最近会话同步的数据源
  /*WKSDK.shared().config.provider.syncConversationsCallback = async () => {
    // 后端提供的获取最近会话列表的接口数据 然后构建成 Conversation对象数组返回
    let conversations = [];
    conversations = await request(...)
    return conversations
  })*/

  //?销毁监听
  onBeforeUnmount(() => {
    // !销毁监听
    WKSDK.shared().chatManager.removeMessageStatusListener(sendListen)
    WKSDK.shared().chatManager.removeMessageListener(acceptListen)
    disconnectWK_WK()
    uni.$off('handleMessageCallback')
  })

  return {
    connectWK_WK,
    disconnectWK_WK,
    listener,
    sendMessageToUser,
    getRecentMessage,
    // getChanelHistoryMessages,
  }
}

export { useChat }
