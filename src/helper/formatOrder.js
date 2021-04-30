export const formatOrder = (items) => {
  const data = {
    twitter: items[0].twitter,
    shop: items[0].shop,
    date: items[0].date,
    payment_status: items[0].payment_status,
    item: []
  }
  items.map(item => {
    data.item.push({
      product_name: item.product_name,
      image_link: item.image_link,
      amount: item.amount,
      price: item.price
    })
  })
  return data
}