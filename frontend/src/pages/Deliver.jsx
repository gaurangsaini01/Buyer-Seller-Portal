import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input';
import { deliverOrder, getPendingSellingOrders } from '../services/operations/order'
import { useSelector } from 'react-redux';
import { MdOutlineCurrencyRupee } from 'react-icons/md';

function Deliver() {
  const [otpValues, setOtpValues] = useState({});
  const [orders, setOrders] = useState([]);
  const token = useSelector(state => state.auth.token)

  const handleOtpChange = (orderId, otp) => {
    setOtpValues(prevOtpValues => ({
      ...prevOtpValues,
      [orderId]: otp,  // Save OTP for the specific order
    }));
  };

  async function handleSubmit(e, orderId) {
    e.preventDefault();
    console.log(otpValues[orderId]);
    const res = await deliverOrder(orderId, otpValues[orderId], token);
    if (res) {
      setOrders((prev) => (prev.filter(item => item._id !== res._id)))
    }
  }

  useEffect(() => {
    async function getOrder() {
      const res = await getPendingSellingOrders(token);
      if (res) {
        setOrders(res);
      }
    }
    getOrder();
  }, [])
  return (
    <div className='flex flex-col gap-4 mt-4'>
      {orders.length > 0 ? (
        orders.map((order) => {
          return (
            <div key={order._id}>
              <div className='flex bg-black/10 p-4 rounded-md gap-10 items-center'>
                <div className='flex items-center gap-10'>
                  <div className='w-[200px] rounded-md overflow-hidden'>
                    <img
                      className='w-full object-cover h-full'
                      src={`${import.meta.env.VITE_APP_BACKEND_URL}/${order.itemId.image[0]}`}
                      alt=""
                    />
                  </div>
                  <div className=''>
                    <div className='flex gap-4 items-center'>
                      <div className='text-4xl font-bold'>
                        {order.itemId.itemName}
                      </div>
                      <div className='text-4xl font-extralight'>
                        (Buyer : {order.buyerId.firstName})
                      </div>
                    </div>
                    <div className='text-2xl text-[#00000090]'>
                      {order.itemId.description}
                    </div>
                    <div className='flex gap-10 w-full items-center '>
                      <div className='text-5xl font-bold flex items-center'>
                        <div>
                          <MdOutlineCurrencyRupee size={50} />
                        </div>
                        <div>{order.itemId.price}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <form className='space-y-4' onSubmit={(e) => handleSubmit(e, order._id)}>
                  <label className='text-4xl font-semibold' htmlFor="">Enter OTP for Delivery</label>
                  <OtpInput
                    containerStyle={"space-x-2 "}
                    inputStyle={"border text-black rounded-md w-12"}
                    value={otpValues[order._id] || ''}
                    onChange={(otp) => handleOtpChange(order._id, otp)}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                    inputType='tel'
                  />
                  <button className='px-6 py-2 rounded-md bg-black text-white/80' type="submit">Submit</button>
                </form>
              </div>
            </div>
          );
        })
      ) : (
        <div>No pending orders available.</div> // Fallback message
      )}
    </div>
  )
}

export default Deliver