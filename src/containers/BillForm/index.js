import { withRouter, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { services } from '../../services/index'
import { useEffect, useState } from 'react';
import { formatOrder } from '../../helper/formatOrder'
import logo_jp from '../../assets/images/logo-jp.jpg'
import logo_kr from '../../assets/images/logo-kr.jpg'
import { Input, Card, Form, Button, Skeleton } from 'antd';
import { UserOutlined, TwitterOutlined, } from '@ant-design/icons';
import imageplaceholder from '../../assets/images/imageplaceholder.jpeg'
const { TextArea } = Input;
const image = {
  catchy_jp: logo_jp,
  catchy_kr: logo_kr
}

const BillForm = (props) => {
  const location = useLocation()
  const order_id = props.match.params.order_id
  const parsed = queryString.parse(location.search);
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  const getDetail = async () => {
    setLoading(true)
    const res = await services.GET_BILL_BY_ORDER_ID(order_id, parsed.date, parsed.shop)
    if (res && res.success) {
      setData(formatOrder(res.data))
      setLoading(false)
    } else {
      console.log('error')
    }
  }

  useEffect(() => {
    getDetail()
  }, [])


  // console.log(query)
  // const location = useLocation()
  // console.log(new URLSearchParams(location.search))
  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', padding: '20px 10px' }}>
        <img src={image[parsed.shop]} alt="Logo" style={{ width: 70 }} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: 350, marginTop: 10 }}>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </div>
      </div>
    )
  } else {
    console.log(data)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', padding: '20px 10px' }}>
        <img src={image[parsed.shop]} alt="Logo" style={{ width: 70 }} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: 350, marginTop: 10 }}>
          <Input prefix={<TwitterOutlined />} placeholder="@twitter" defaultValue={data.twitter} disabled />
          <p style={{ marginTop: 10 }}>รายการสินค้า</p>
          <div style={{ border: '1px solid grey', paddingTop: 10, paddingLeft: 10, paddingRight: 10, maxHeight: 300, overflow: 'scroll', boxShadow: "inset 0 0 2px lightgrey" }}>
            {data.item.map(item => {
              return (
                <div style={{ padding: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', border: '1px solid lightgrey', width: '100%', marginBottom: 10 }}>
                  <div style={{ width: 70, height: 70 }} >
                    <img src={item.image_link || imageplaceholder} alt="item" style={{ width: 70, height: 70 }} />
                  </div>
                  <div style={{ marginLeft: 10 }}>
                    <p>{item.product_name}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <p>{item.amount} ชิ้น</p>
                      <p>{item.price} บาท</p>
                    </div>
                  </div>
                </div>)
            })}
          </div>
          <Form
            name="form"
            layout="vertical"
            style={{ width: '100%', marginTop: 10 }}
          // onFinish={onModal}
          // form={form}
          >
            <Form.Item
              label="ที่อยู่"
              name="address"
            >
              <TextArea
                placeholder="กรุณากรอกที่อยู่ / ชื่อ / เบอร์โทรศัพท์"
                autoSize={{ minRows: 3, maxRows: 3 }}
              // onChange={(e) => setNote(e.target.value)}
              // value={note}
              />
            </Form.Item>
            <Form.Item
              label="โน้ต"
              name="address"
            >
              <TextArea
                autoSize={{ minRows: 3, maxRows: 3 }}
              // onChange={(e) => setNote(e.target.value)}
              // value={note}
              />
            </Form.Item>
            <Button type="primary" style={{ width: '100%' }}>ยืนยัน</Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(BillForm)