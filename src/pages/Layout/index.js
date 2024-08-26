import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation, replace } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserInfo, clearUserInfo } from '@/store/modules/user'
import { Layout, Menu, Popconfirm } from 'antd'

import {
  LogoutOutlined,
  HomeOutlined,
  EditOutlined,
  DiffOutlined
} from '@ant-design/icons';

import './index.scss'

const { Header, Sider, Content } = Layout

// 导航菜单项
const items = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: '首页',
  },
  {
    key: '/article',
    icon: <EditOutlined />,
    label: '文章管理',
  },
  {
    key: '/publish',
    icon: <DiffOutlined />,
    label: '创建文章',
  },
]

const GeekLayout = () => {
  const navigate = useNavigate()

  const handleMenu = ({ key }) => {
    // key 设置为组件对应二级路由
    navigate(key)
  }
  // 反向高亮 - 设置根据路由 路径 设置选中的菜单想
  // 1. 获取当前路径
  const location = useLocation()
  const selectedKey = location.pathname
  
  // 触发个人用户信息 action
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])

  // 确认退出
  const handleLogout = () => {

    console.log('确认退出');
    dispatch(clearUserInfo())
    // 回到登录页
    navigate('/login', replace)
  }

  const name = useSelector(state => state.user.userInfo.name)
  return (
    <Layout className="layout-container">
      {/* Header */}
      <Header className="layout-header">
        <div className="logo">Logo</div>
        <div className="user-info">
          {/* 两部分： userName 退出登录 */}
          <span className="user-name">{name}</span>
          <span className="user-logout">
          <Popconfirm
            title="是否确认提出?"
            okText="退出"
            cancelText="取消"
            onConfirm={handleLogout}
          >
            <LogoutOutlined/> 退出
          </Popconfirm>
            
          </span>
        </div>
      </Header>
      <Layout>
        {/* Sider Menu */}
        <Sider className="layout-sider">
          <Menu
            selectedKeys={selectedKey}
            mode="inline"
            theme="dark"
            items={items}
            style={{ height: '100%', borderRight: 0}}
            onClick={handleMenu}
          />
        </Sider>
        {/* 二级路由出口 */}
        <Layout>
          <Content className="layout-content">
            <Outlet/>
          </Content>
        </Layout>
      </Layout>
      
    </Layout>
  )
}

export default GeekLayout