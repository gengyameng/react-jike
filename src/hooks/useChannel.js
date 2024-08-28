// 自定义Hooks 获取频道列表

import { useEffect, useState } from 'react'

import { getChannelApi } from '@/api/article'

export function useChannel () {
  const [channelOptions, setOptions] = useState([])

  useEffect(() => {
    // 封装函数 在函数体内调用接口
    const getChannelList = async () => {
      const { data: { channels } } = await getChannelApi()
      const newChannels = channels.map(item => {
        return {
          value: item.id,
          label: item.name
        }
      })
      setOptions(newChannels)
    }
    // 调用函数
    getChannelList()
  }, [])
  // 把组件中要用到的数据return出去
  return { channelOptions }
}