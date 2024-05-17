import React, { useState, useEffect, ChangeEvent } from 'react';
import { orderHeaderModel } from '../../Interfaces';
import './OrderEditForm.css';

interface OrderEditFormProps {
  orderItem: orderHeaderModel;
  onUpdate: (updatedOrder: orderHeaderModel) => void;
  onCancel: () => void; // Shtoni funksionin onCancel për të mbyllur formën pa përditësuar
}

const OrderEditForm: React.FC<OrderEditFormProps> = ({ orderItem, onUpdate, onCancel }) => {
  const [editedOrder, setEditedOrder] = useState<orderHeaderModel>({ ...orderItem });

  useEffect(() => {
    setEditedOrder({ ...orderItem });
  }, [orderItem]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedOrder((prevOrder: any) => ({ ...prevOrder, [name]: value }));
  };

  const handleUpdate = () => {
    onUpdate(editedOrder);
  };

  return (
    <div className='OrderEditForm'>
      <div className='form-header'>
        
        
      </div>
      <label>Name:</label>
      <input
        type="text"
        name="pickupName"
        value={editedOrder.pickupName}
        onChange={handleInputChange}
      />
      <label>PhoneNumber:</label>
      <input
        type="number"
        name="pickupPhoneNumber"
        value={editedOrder.pickupPhoneNumber}
        onChange={handleInputChange}
      />
      <label>Email:</label>
      <input
        type="text"
        name="pickupEmail"
        value={editedOrder.pickupEmail}
        onChange={handleInputChange}
      />
      <div className='form-footer'>
        <button className='updateButton' onClick={handleUpdate}>Update</button>
        <button className='cancelButton' onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default OrderEditForm;
