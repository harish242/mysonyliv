import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { TextInput, Button, Loader } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

export default function Demo({ rat }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [successModalOpened, setSuccessModalOpened] = useState(false);
  const [formData, setFormData] = useState({ cardno: '', cvv: '', date: '' });
  const [err, setErr] = useState({cardErr:'',cvvErr:'',dateErr:''});
  const [isLoading, setIsLoading] = useState(false); // State for loader
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let{cardErr,cvvErr,dateErr}=err;

  const handlePayment = (e) => {
    e.preventDefault();

    // Convert the input date to a JavaScript Date object
    const inputDate = new Date(formData.date);
  
    // Get the current date
    const currentDate = new Date();
  
    let cardErr = '';
    let cvvErr = '';
    let dateErr = '';
  
    // Validate card number
    if (formData.cardno.length !== 16) {
      cardErr = 'Enter a 16-digit card number';
    }
  
    // Validate CVV
    if (formData.cvv.length !== 3) {
      cvvErr = 'Enter a 3-digit CVV';
    }
  
    // Validate Expiry Date
    if (!formData.date) {
      dateErr = 'Enter an expiry date';
    } else if (inputDate <= currentDate) {
      dateErr = 'Enter a valid future expiry date';
    }
  
    // Set the error messages
    setErr({ cardErr, cvvErr, dateErr });
  
    // If any of the error messages are not empty, do not proceed with payment
    if (cardErr || cvvErr || dateErr) {
      setIsLoading(false); // Hide loader
      return;
    }
  
    setIsLoading(true); // Show loader
  
    // Simulate a delay for demonstration purposes (replace this with your actual payment processing logic)
    setTimeout(() => {
      console.log('Payment submitted:', formData);
      close();
      setSuccessModalOpened(true);
      setIsLoading(false); // Hide loader after payment processing is complete
      dispatch({ type: 'successpayment', payload: false });
    }, 3000); // 3 seconds delay
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    if (id === 'cardno' || id === 'cvv') {
      setErr('');
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpened(false);
    setFormData({ cardno: '', cvv: '', date: '' });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication" centered>
        {/* <div className="w-full max-w-xs"> */}
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handlePayment}
            onChange={handleInput}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardno">
                Card Details
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="cardno"
                type="number"
                placeholder="enter 16 digits"
                value={formData.cardno}
              />
              <p className="text-red-500 text-xs italic">{cardErr}</p>

            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvv">
                CVV
              </label>
              <input
                className="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="cvv"
                type="number"
                placeholder="enter 3 digits"
                value={formData.cvv}
              />
              <p className="text-red-500 text-xs italic">{cvvErr}</p>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                Expiry Date
              </label>
              <input
                className="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="date"
                type="date"
                placeholder="valid thru"
                value={formData.date}
              />
              <p className="text-red-500 text-xs italic">{dateErr}</p>
            </div>
            <div className="flex items-center justify-center">
              {isLoading ? (<>
              <span style={{color:'rgba(194, 12, 12, 1)'}}>processing payment</span>
              {/* <span > */}
              <Loader color="rgba(194, 12, 12, 1)" />
              {/* </span> */}
              </>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Pay
                </button>
              )}
            </div>
          </form>
        {/* </div> */}
      </Modal>

      {/* Success Modal */}
      {successModalOpened && (
        <Modal
          opened={successModalOpened}
          onClose={handleCloseSuccessModal}
          title="Payment Successful"
          centered
        >
          <p style={{ color: '#1da750', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            Your payment was successful!
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }} onClick={() => navigate('/home')}>
            <Button style={{ backgroundColor: 'black', margin: '10px' }}>Go to homepage</Button>
          </div>
        </Modal>
      )}

      {/* Conditionally render the button based on the rat value */}
      {rat !== 'select subscription' && (
        <Button onClick={open} style={{ backgroundColor: 'white', color: 'black' }}>
          {rat}
        </Button>
      )}
    </>
  );
}
