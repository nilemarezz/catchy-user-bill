export const formatOrder = (items) => {
  console.log(items)
  const data = {
    twitter: items[0].twitter,
    shop: items[0].shop,
    date: items[0].date,
    payment_status: items[0].payment_status,
    payment_method: items[0].payment_method,
    item: [],
    pay_amount: 0,
    shipping_price: 0,
    address: items[0].address,
    slip_link: items[0].slip_link
  }
  items.map(item => {
    data.pay_amount = parseFloat(data.pay_amount) + parseFloat(item.pay_amount) + parseFloat(item.shipping_price)
    data.shipping_price = parseFloat(data.shipping_price) + parseFloat(item.shipping_price)
    data.item.push({
      id: item.id,
      product_name: item.product_name,
      image_link: item.image_link,
      amount: item.amount,
      price: item.price
    })
  })
  console.log(data)
  return data
}