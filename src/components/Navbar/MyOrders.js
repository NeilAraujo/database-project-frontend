import React from 'react';
import { OrderDisplay } from '../Content/MyOrdersBasics';
import '../Content/MyOrders.css'; 

const MyOrders = () => {
    return (
        <div>
            Orders
            <OrderDisplay />
        </div>
    );
};

export default MyOrders;