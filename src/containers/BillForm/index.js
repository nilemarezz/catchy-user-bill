import { withRouter, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { services } from '../../services/index'
import { useEffect, useState, useRef } from 'react';
import { formatOrder } from '../../helper/formatOrder'
import logo_jp from '../../assets/images/logo-jp.jpg'
import logo_kr from '../../assets/images/logo-kr.jpg'
import { Input, Card, Form, Button, Skeleton, Row, Col, notification, Spin } from 'antd';
import { UserOutlined, TwitterOutlined, } from '@ant-design/icons';
import imageplaceholder from '../../assets/images/imageplaceholder.jpeg'
import { Apploader } from '../../components/Apploader'
import { storage } from '../../services/firebase/uploadImage'
import { numberWithCommas } from '../../helper/addComma'

const resData = {
  date: "4_2021",
  item: [
    {
      amount: "7",
      image_link: "https://res.cloudinary.com/demo/image/upload/w_700/pricing_change.png",
      price: "310",
      product_name: "ฟิกเกอร์ + ฟิกเกอร์เล็ก บาส + ฟิกเกอร์เล็ก + พกจ 3 + พกจ ฟองน้ำ 1"
    }, {
      amount: "1",
      image_link: "https://res.cloudinary.com/demo/image/upload/w_700/pricing_change.png",
      price: "280",
      product_name: "โมจิคุโรโกะ"
    }, {
      amount: "1",
      image_link: null,
      price: "15",
      product_name: "พกจ. กาชาคุโรโกะถือบาส มีตำหนิเลอะ"
    }],
  payment_status: "มัดจำ",
  shop: "catchy_jp",
  twitter: "@ohimindIy",
}
const { TextArea } = Input;
const image = {
  catchy_jp: logo_jp,
  catchy_kr: logo_kr
}

const BillForm = (props) => {
  const [form] = Form.useForm();
  const location = useLocation()
  const order_id = props.match.params.order_id
  const parsed = queryString.parse(location.search);
  const [loading, setLoading] = useState(true)
  const [orderData, setOrderData] = useState(null)
  const [slip, setSlip] = useState(null)
  const [slipname, setSlipName] = useState(null)
  const [submitLoading, setSubmitLoading] = useState(false)
  const upload = useRef()

  const getDetail = async () => {
    setLoading(true)
    const res = await services.GET_BILL_BY_ORDER_ID(order_id, parsed.date, parsed.shop)
    console.log(res)
    if (res && res.success) {
      // setData(formatOrder(res.data))
      setOrderData(formatOrder(res.data))
      setLoading(false)
    } else {
      console.log('error')
    }
  }

  const handleSelectSlip = (file) => {
    setSlip(file[0])
    setSlipName(file[0].name)
  }

  const handleSubmit = (data) => {
    if (!slip) {
      notification["error"]({
        message: 'Please Upload Slip Before Submit Form'
      });
    } else {
      setSubmitLoading(true)

      const dataRes = {
        "shop": parsed.shop,
        "date": parsed.date,
        "id": [],
        "address": data.address,
        "note": data.note,
        "slip_link": null
      }
      orderData.item.map(item => dataRes.id.push(item.id))

      const uploadTask = storage.ref(`slip_payment/${order_id + slip.name}`).put(slip);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(progress);
        },
        error => {
          notification["error"]({
            message: 'Upload image fail '
          });
        },
        () => {
          storage
            .ref("slip_payment")
            .child(order_id + slip.name)
            .getDownloadURL()
            .then(async url => {
              dataRes.slip_link = url;
              const res = await services.PATCH_BILL(order_id, dataRes)
              if (res && res.success) {
                props.history.push({ pathname: `/success/${order_id}`, search: `?shop=${parsed.shop}`, state: { image: url, twitter: orderData.twitter } })
              } else {
                notification["error"]({
                  message: 'Submit data fail'
                });
                setSubmitLoading(false)
              }
            });
        }
      );

      // alert(JSON.stringify(data))
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
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', padding: '20px 10px' }}>
        <img src={image[parsed.shop]} alt="Logo" style={{ width: 70 }} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: 350, marginTop: 10 }}>
          <Input prefix={<TwitterOutlined />} placeholder="@twitter" defaultValue={orderData.twitter} disabled />
          <p style={{ marginTop: 10 }}>รายการสินค้า</p>
          <div style={{ border: '1px solid grey', paddingTop: 10, paddingLeft: 10, paddingRight: 10, maxHeight: 300, overflow: 'scroll', boxShadow: "inset 0 0 2px lightgrey", width: '100%' }}>
            {orderData.item.map(item => {
              return (
                <div style={{ padding: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', border: '1px solid lightgrey', width: '100%', marginBottom: 10 }}>
                  <div style={{ width: 70, height: 70 }} >
                    <img src={item.image_link || imageplaceholder} alt="item" style={{ width: 70, height: 70 }} />
                  </div>
                  <div style={{ marginLeft: 10, width: '100%' }}>
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
            onFinish={(data) => handleSubmit(data)}
            form={form}
          >
            <Form.Item
              label="ที่อยู่"
              name="address"
            >
              <TextArea
                placeholder="กรุณากรอกที่อยู่ / ชื่อ / เบอร์โทรศัพท์"
                autoSize={{ minRows: 3, maxRows: 3 }}
                required
                rules={[{ required: true, message: 'Please input address' }]}
                disabled={submitLoading}
              />
            </Form.Item>
            <Form.Item
              label="โน้ต"
              name="note"
            >
              <Input disabled={submitLoading} />
            </Form.Item>
            <Row gutter={[5, 5]}>
              <Col sm={12} xs={12}>
                <Form.Item
                  label="ค่าส่ง"
                  name="shipping_type"
                >
                  <Input defaultValue={`${orderData.payment_method} / ${orderData.shipping_price} บาท`} disabled />
                </Form.Item>
              </Col>
              <Col sm={12} xs={12}>
                <Form.Item
                  label="จ่ายแบบ"
                  name="payment_method"
                >
                  <Input defaultValue={`${orderData.payment_status}`} disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ alignItems: "center" }}>
              <Col sm={12} xs={12}>
                <p style={{ paddingTop: 15 }}>ยอดทั้งหมด : <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{numberWithCommas(orderData.pay_amount)} ฿</span></p>
                <input type="file" style={{ display: 'none' }} ref={upload} onChange={e => handleSelectSlip(e.target.files)} />
              </Col>
              <Col sm={12} xs={12}>
                <Button style={{ width: '100%', backgroundColor: "#eb2f96", color: 'white' }} onClick={() => upload.current.click()} disabled={submitLoading}>อัพโหลดสลิป</Button>
              </Col>
            </Row>
            <div style={{
              whiteSpace: "nowrap",
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>Slip Image : {slipname || "-"}</div>
            <Form.Item>
              {submitLoading ? <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 20 }}><Spin /> </div> : <Button type="primary" style={{ width: '100%', marginTop: 20 }} htmlType="submit" >ยืนยัน</Button>}
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(BillForm)