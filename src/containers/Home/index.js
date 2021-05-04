import logo_jp from '../../assets/images/logo-jp.jpg'
import logo_kr from '../../assets/images/logo-kr.jpg'
import logo_br from '../../assets/images/logo-br.jpg'
import logo_fa from '../../assets/images/logo-fa.jpeg'
import { TwitterOutlined, InstagramFilled } from '@ant-design/icons'

const image = {
  catchy_jp: logo_jp,
  catchy_kr: logo_kr,
  br_bitty: logo_br,
  catchy_fa: logo_fa
}

const Home = () => {
  return (
    <div style={{
      display: 'flex', width: '100%', height: window.innerHeight, alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
    }}>
      <div style={{ width: 300, backgroundColor: '#E6E6E6', margin: 20, padding: 20, }}>
        <h1 style={{ textAlign: 'center' }}> CATCHY STORE</h1>
        <h3 style={{ textAlign: 'center' }}>พรีออร์เดอร์สินค้าจาก จีน, ญี่ปุ่น,เกาหลี และเสื้อผ้า</h3>
        <a href="https://twitter.com/catchyshoppp" style={{ color: "#00acee" }}>
          <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', marginBottom: 20, marginTop: 20 }}>
            <img src={image.catchy_jp} alt="Logo" style={{ width: 40 }} />
            <div style={{ marginLeft: 20 }}>     <TwitterOutlined /><span style={{ marginLeft: 5 }}>@catchyshoppp</span></div>
          </div>
        </a>
        <a href="https://twitter.com/catchy_jp" style={{ color: "#00acee" }}>
          <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', marginBottom: 20 }}>
            <img src={image.catchy_kr} alt="Logo" style={{ width: 40 }} />
            <div style={{ marginLeft: 20 }}>     <TwitterOutlined /><span style={{ marginLeft: 5 }}>@catchy_jp</span></div>
          </div>
        </a>
        <a href="https://twitter.com/brbittyStore" style={{ color: "#00acee" }}>
          <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', marginBottom: 20 }}>
            <img src={image.br_bitty} alt="Logo" style={{ width: 40 }} />
            <div style={{ marginLeft: 20 }}>     <TwitterOutlined /><span style={{ marginLeft: 5 }}>@brbittyStore</span></div>
          </div>
        </a>
        <a href="https://www.instagram.com/catchystore/" style={{ color: '#cd486b' }}>
          <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', marginBottom: 20 }}>
            <img src={image.catchy_fa} alt="Logo" style={{ width: 40 }} />
            <div style={{ marginLeft: 20 }}>     <InstagramFilled /><span style={{ marginLeft: 5 }}>catchystore</span></div>
          </div>
        </a>
      </div>
    </div >
  )
}
export default Home