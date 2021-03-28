import React, { useEffect, useState } from 'react'
import { dataBase } from '../../firebase'
import Order from '../Order/Order'
import './Orders.css'

function Orders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (user) {
      dataBase
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
            }))
          )
        )
    } else {
      setOrders([])
    }
  }, [])

  return (
    <div className='orders'>
      <h1>Your Orders</h1>

      <div className='orders__order'>
        {orders.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  )
}

export default Orders
