import { Link, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  Card,
  Form,
  Breadcrumb,
  Input,
  Select,
  Button,
  Radio,
  Upload,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { createArticleApi, getArticleById, updateArticleApi } from '@/api/article'
import { useChannel } from '@/hooks/useChannel'

import './index.scss'

const Publish = () => {

  // 频道 options - 自定义Hook中
  const { channelOptions } = useChannel()

  // 图片上传 imgList:已上传图片列表
  const [imageList, setImageList] = useState([])
  // 上传回调
  const handleImageChange = ({ fileList }) => {
    setImageList(fileList)
  }

  // imageType:图片封面类型
  const [imageType, setImageType] = useState(0)

  // 切换图片封面类型
  const handleChangeImgType = (e) => {
    // console.log(e.target.value);
    setImageType(e.target.value)

  }

  // 获取 form实例
  const [form] = Form.useForm()
  // 表单提交
  const handleCommit = async (formValue) => {
    console.log(formValue);
    
    // 验证封面类型imageType是否和实际的图片列表imageList数量是相等的
    if (imageList.length !== imageType) return message.warning('封面类型和图片数量不匹配')
    const { title, content, channel_id } = formValue

    // 表单格式数据
    const reqData = {
      title,
      content,
      cover: {
        type: imageType,  // 封面模式 单图 三图 无图
        images: imageList.map(item => {
          if (item.response) {
            return item.response.data.url
          } else {
            return item.url
          }
        })
      },
      channel_id
    }
    // 创建/编辑文章
    if (articleId) {
      await updateArticleApi({...reqData, id: articleId})
    } else {
      await createArticleApi(reqData)
      // 重置表单
      form.resetFields()
      setImageList([])
      setImageType(0)
    }
    message.success('发布成功，等待审核...')
  }

  // 回填数据
  // 获取参数ID
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  useEffect(() => {
    // 通过articleID获取数据
    async function getArticleDetail () {
      const res = await getArticleById(articleId)
      const data = res.data
      form.setFieldsValue({
        ...data,
        type: data.cover.type
      })
      setImageType(data.cover.type)
      setImageList(data.cover.images.map(url => ({url})))
    }
    if (articleId) {
      getArticleDetail()
    }
  }, [articleId, form])
  

  return (
    <div className="publish">
      {/* Card：基础卡片容器-title:面包屑导航，包含内容区域 */}
      <Card
        title={
          <Breadcrumb
            className="publish-breadcrumb"
            items={[
              {
                title: <Link to="/">首页</Link>,
              },
              {
                title: `${articleId ? '编辑' : '发布'} 文章`,
              },
            ]}
          />
        }
      >
        {/* Form表单 */}
        <Form
          className="publish-form"
          wrapperCol={{ span: 8 }}
          labelCol={{ span: 4 }}
          onFinish={handleCommit}
          initialValues={{ type: 0 }}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[
              { required: true, message: '请输入文章标题' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[
              {
                required: true, message: '请选择文章频道'
              }
            ]}
          >
            <Select
              showSearch
              optionFilterProp="label"
              placeholder="轻选择文章频道"
              options={channelOptions}
            />
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={handleChangeImgType} >
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 
              listType: 决定选择文件框的外观样式
              showUploadList:控制显示上传列表
            */}
            {imageType > 0 && <Upload
              name="image"
              action={'http://geek.itheima.net/v1_0/upload'}
              listType="picture-card"
              showUploadList
              fileList={imageList}
              maxCount={imageType}
              onChange={handleImageChange}
            >
              <div>
                <PlusOutlined />
              </div>
            </Upload>
            }
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            wrapperCol={{ span: 12 }}
            rules={[
              { required: true, message: "请输入文章内容" }
            ]}
          >
            {/* 富文本编辑器 */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            {/* 按钮：发布文章 */}
            <Button type="primary" htmlType="submit">发布文章</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish