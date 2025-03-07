import { Card, Row, Col, Statistic } from 'antd'
import { UserOutlined } from '@ant-design/icons'

export const DashboardStats = () => {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card>
          <Statistic
            title="Active Users"
            value={777}
            prefix={<UserOutlined />}
          />
        </Card>
      </Col>
    </Row>
  )
} 