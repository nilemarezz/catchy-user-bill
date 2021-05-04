const apiPath = process.env.REACT_APP_END_POINT
// const apiPath = 'http://localhost:5000/api/'

export const services = {
  GET_BILL_BY_ORDER_ID: async (order_id, date, shop) => {
    try {
      const res = await fetch(`${apiPath}orders/user/${order_id}?date=${date}&shop=${shop}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = await res.json()
      return data
    } catch (err) {
      return { success: false }
    }
  },
  PATCH_BILL: async (order_id, value) => {
    try {
      const res = await fetch(`${apiPath}orders/user/${order_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value)
      })
      const data = await res.json()
      return data
    } catch (err) {
      return { success: false }
    }
  }
}