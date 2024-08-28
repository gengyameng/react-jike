import { Link, useNavigate } from 'react-router-dom'
import {
  Card,
  Breadcrumb,
  Form,
  Radio,
  Select,
  DatePicker,
  Button,
  Table,
  Space,
  Popconfirm,
  Tag,
  message
} from 'antd'
import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons'
// 引入汉化包 时间选择器显示中文
import locale from 'antd/es/date-picker/locale/zh_CN'

import dayjs from 'dayjs';

import img404 from '@/assets/error.png'

import 'dayjs/locale/zh-cn';

import { useEffect, useState } from 'react'
import { useChannel } from '@/hooks/useChannel'
import { getArticleListApi, delArticleApi } from '@/api/article' 

dayjs.locale('zh-cn');

const { RangePicker } = DatePicker

const Article = () => {
  const navigate = useNavigate()

  // 频道 options - 自定义Hook中
  const { channelOptions } = useChannel()

  // 准备表格渲染数据
  const status = {
    1: <Tag color="warning">待审核</Tag>,
    2: <Tag color="success">审核通过</Tag>
  }
  // 表格列配置
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: (cover) => {
        const src = cover.images.length > 0 ? cover.images[0] : img404
        return <img src={src} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220

    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => status[data]
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅览数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              type="primary" shape="circle"
              icon={<EditOutlined/>} 
              disabled={data.status === 1}
              onClick={() => navigate(`/publish?id=${data.id}`)}
            />
            <Popconfirm
              title="删除文章"
              description="确认要删除当前文章吗?"
              okText="Yes"
              cancelText="No"
              onConfirm={ () => handleDelete(data.id)}
            >
              <Button
                type="primary"
                shape="circle"
                danger
                icon={<DeleteOutlined/>}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  // 筛选功能
  // 1. 准备参数
  const [reqData, setReqData] = useState({
    status: '',
    channel_id: '',
    begin_pubdate: '',
    end_pubdate: '',
    page: 1,
    per_page: 2
  })

  const [articleList, setArticleList] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    // 获取文章列表
    const getArticleList = async () => {
      const res = await getArticleListApi(reqData)
      // console.log(res);
      // const a = res.data.results[0]
      setArticleList(res.data.results)
      setCount(res.data.total_count)
    }
    getArticleList()
  }, [reqData])

  // 2. 获取筛选数据
  const handleFilter = (formData) => {
    setReqData({
      ...reqData,
      status: formData.status,
      channel_id: formData.channel_id,
      begin_pubdate: formData.date ? formData.date[0].format('YYYY-MM-DD') : '',
      end_pubdate: formData.date ? formData.date[1].format('YYYY-MM-DD') : ''
    })
    // 4. 重新拉取文章列表 + 渲染table逻辑重复的 - 复用
    // reqData依赖项发生变化 重复执行副作用函数 
  }

  // 分页切换
  const handlePage = (page, pageSize) => {
    // 修改参数依赖项，引发数据重新获取列表渲染
    setReqData({
      ...reqData,
      page,
      per_page: pageSize
    })
  }

  // 删除
  const handleDelete = async (id) => {
    await delArticleApi(id)
    message.success('删除成功')
    setReqData({...reqData})
  }

  return (
    <div className="article">
       {/* 1. 面包屑导航 */ }
      <Card
        title={
          < Breadcrumb className="article-breadcrumb"
            items={[
              { title: <Link to="/">首页</Link> },
              { title: "文章列表" }
            ]}
          />
        }
      >
      {/* 
          三部分：1. 面包屑导航 2. form表单筛选 3. 列表
        */}
      {/* 筛选表单 */}
      <Form
        labelCol={{ span: 1}}
        onFinish={handleFilter}
      >
        <Form.Item label="状态" name="status">
          <Radio.Group>
            {/* 1-待审核, 2-审核通过, 3-审核失败, 不传为全部(指的参数名也不携带) */}
            <Radio value={''}>全部</Radio>
            <Radio value={1}>待审核</Radio>
            <Radio value={2}>审核通过</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="频道" name="channel_id">
          <Select
            placeholder="请选择文章频道"
            style={{ width: 180 }}
            options={channelOptions}
          />
        </Form.Item>
        <Form.Item label="日期" name="date">
          {/* 传入locale属性，控制中文显示 */}
            <RangePicker locale={locale} /> 
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 1,
          }}
        >
          <Button type="primary" htmlType="submit">
            筛选
          </Button>
        </Form.Item>
      </Form>
    </Card>
      {/* Table:文章列表 */ }
  <Card title={`根据筛选条件共查询到 0 条结果`}>
    <Table
      rowKey="id"
      dataSource={articleList}
      columns={columns}
      pagination={{
        total: count,
        pageSize: reqData.per_page,
        onChange: handlePage
      }}
    />
  </Card>
    </div >
  )
}

export default Article