{/* <PayPalScriptProvider options={{ clientId: clientId }}>
<PayPalButtons
  createOrder={(data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total,
          },
        },
      ],
    });
  }}
  onApprove={(data, actions) => {
    return actions.order.capture().then(function (details) {
      successPaymentHandler(details);
    });
  }}
/>
</PayPalScriptProvider> */}

import React, { useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const Checkout = ({paymentSuccessHandler, shippingAddressTrue}) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [currency, setCurrency] = useState(options.currency);

    const onCurrencyChange = ({ target: { value } }) => {
        setCurrency(value);
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: value,
            },
        });
    }

    const onCreateOrder = (data,actions) => {
        
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: "8.99",
                        currency_code: currency,
                    },
                },
            ],
        });
    }

    const onApproveOrder = (data,actions) => {
        return actions.order.capture().then((details) => {
            paymentSuccessHandler(details)
        });
    }

    return (
        <div className="checkout relative z-0">
            {isPending ? <p>LOADING...</p> : shippingAddressTrue ? (
                <>
                    <select 
                    className='w-full mb-1 outline-none '
                    value={currency} onChange={onCurrencyChange}>
                            <option value="USD">💵 USD</option>
                            <option value="EUR">💶 Euro</option>
                    </select>
                    <PayPalButtons
                     
                        style={{ 
                            layout: "vertical",
                            
                         }}
                        createOrder={(data, actions) => onCreateOrder(data, actions)}
                        onApprove={(data, actions) => onApproveOrder(data, actions)}
                    />
                </>
            ) : <></>
        }
        </div>
    );
}

export default Checkout