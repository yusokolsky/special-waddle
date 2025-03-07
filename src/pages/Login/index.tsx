import { Form, Input, Button, Card, message } from 'antd'
import {useNavigate} from "react-router";
import {useAdminAuthControllerSignInMutation} from "../../store/api/hooks/auth.ts";
import { LoginForm } from './types'
import styles from './styles.module.css'

const LoginPage = () => {
  const navigate = useNavigate()
  const [login, { isLoading }] = useAdminAuthControllerSignInMutation()

  const onFinish = async (values: LoginForm) => {
    try {
      const response = await login(values).unwrap()
      localStorage.setItem('token', response.accessToken)
      navigate('/dashboard')
    } catch (error) {
      message.error('Login failed')
    }
  }

  return (
    <div className={styles.container}>
      <Card title="Login" className={styles.card}>
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default LoginPage 