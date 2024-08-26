import { Card, Form, Button, Input, message } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { fetchLogin } from '@/store/modules/user'

import logo from '@/assets/logo.png'
import './index.scss'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 表单验证通过后回调函数
  const onFinish = async (values) => {
    // 验证 登录
    console.log(values);
    // 触发异步action fetchLogin 
    await dispatch(fetchLogin(values))
    // 成功后。。。
    // 1. 跳转到首页
    navigate('/')
    // 2. 提示用户
    message.success('登录成功')
  }

  return (
    <div className="login">
      <Card className="login-container">
        {/* Logo */}
        <img className="login-logo" src={logo} alt="" />
        {/* Form表单 
          validateTrigger: 触发校验时机
        */}
        <Form
          validateTrigger="onBlur"
          onFinish={onFinish}
        >
          <Form.Item
            name="mobile"
            // 多条校验逻辑，先校验第一条，第一条通过后，再校验第二条
            rules={[
              { required: true, message: "请输入手机号"},
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式'}
            ]}
          >
            <Input placeholder="请输入手机号" size="large"/>
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              { required: true, message: '请输入验证码' },
              { len: 6, message: '验证码位数不正确'}
            ]}
          >
            <Input placeholder="请输入验证码" size="large" />
          </Form.Item>
          <Form.Item
          >
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login