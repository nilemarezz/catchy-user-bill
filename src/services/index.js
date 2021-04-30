const apiPath = "http://localhost:5000"

export const services = {
  GET_BILL_BY_ORDER_ID: async (order_id, date, shop) => {
    try {
      const res = await fetch(`${apiPath}/api/orders/user/${order_id}?date=${date}&shop=${shop}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = await res.json()
      return data
    } catch (err) {
      return { success: false }
    }
  }
}