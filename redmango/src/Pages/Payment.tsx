import React from 'react'
import { useLocation } from 'react-router';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { PaymentForm } from '../Components/Layout/Page/Payment';
import OrderSummary  from '../Components/Layout/Page/Order/OrderSummary';

function Payment(){
    const{
        state : { apiResult , userInput}
    } = useLocation();

    const stripePromise = loadStripe('pk_test_51OMquYBK2XSwfVdjic4gRyA9Dz1y0bR4uJyPeP6eqEybDxO3KYvGOHbhpdoJBTreruJjiEJMXBYSHiN7MVorJ5Tq00AI9ieUM3');
    const options = {
        
        clientSecret: apiResult.clientSecret,
      };
    
    return(
        <Elements stripe={stripePromise} options={options}>
            <div className="container m-5 p-5">
                <div className="row">
                    <div className="col-md-7">
                        <OrderSummary data={apiResult} userInput={userInput}/>
                        </div>
                    <div className="col-md-4 offset-md-1">
                        <h3 className="text-success">Payment</h3>
                        <div className="mt-5"></div>
                        <PaymentForm data={apiResult} userInput={userInput} />
                    </div>
                </div>
            </div>     
    </Elements>
    );
}

export default Payment