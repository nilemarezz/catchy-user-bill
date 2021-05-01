import { useLocation, withRouter } from 'react-router-dom'
import queryString from 'query-string'
import logo_jp from '../../assets/images/logo-jp.jpg'
import logo_kr from '../../assets/images/logo-kr.jpg'
import { Result, Button } from 'antd';

const image = {
  catchy_jp: logo_jp,
  catchy_kr: logo_kr
}
const Success = (props) => {
  const location = useLocation()
  const parsed = queryString.parse(location.search);
  const order_id = props.match.params.order_id
  console.log(order_id)
  console.log(location)
  console.log(parsed)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', padding: '20px 10px' }}>
      <img src={image[parsed.shop]} alt="Logo" style={{ width: 70 }} />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: 350, marginTop: 10 }}>
        <h2>Successfully Submit Form</h2>
        <div style={{ width: 300 }}>
          <div>Order number: {order_id}</div>
          <div style={{
            whiteSpace: "nowrap",
            width: "300px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}>Twitter: {location.state.twitter}</div>
          <div>Time : {new Date().toDateString()} {new Date().toTimeString().substring(0, 8)}</div>
        </div>
        <img src={location.state.image} style={{ width: "70%", height: "70%", marginTop: 10, objectFit: "cover" }} />
        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start', paddingLeft: '10%', marginTop: 20, color: 'red' }}>
          * แคปหน้านี้ให้แม่ค้าด้วยน้าาาา~
        </div>
        {/* <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
          <p style={{ float: 'right' }}>{new Date().toDateString()} {new Date().toTimeString().substring(0, 8)}</p>
        </div> */}
        {/* <Result
          status="success"
          title="Successfully Submit Form!"
          subTitle={`Order number: ${order_id}`}
        /> */}
      </div>
    </div>
  )
}

export default withRouter(Success)