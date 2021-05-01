import { Spin, Space } from 'antd';

export const Apploader = () => {
  return (
    <div style={{
      display: "flex", justifyContent: 'center',
      alignItems: 'center', width: window.innerWidth, height: window.innerWidth, backgroundColor: 'white', position: 'absolute'
    }}>
      <Spin size="large" />
    </div>
  )
}