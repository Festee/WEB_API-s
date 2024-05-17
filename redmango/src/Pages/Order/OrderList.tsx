import React from "react";
import orderListProps from "./orderListType";
import MainLoader from "../../Components/Layout/Page/Common/MainLoader";
import { orderHeaderModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";
import { getStatusColor } from "../../Helper";
import { useDeleteOrderMutation, useUpdateOrderHeaderMutation } from "../../apis/orderApi";
import { toast } from "react-toastify";
import OrderDetails from "./OrderDetails";
import OrderEditForm from "./OrderEditForm"; // Importoni komponentin e ri
import {useState} from 'react';

function OrderList({ isLoading, orderData }: orderListProps) {
  const navigate = useNavigate();
  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrder] = useUpdateOrderHeaderMutation(); // Përdorni hook-in e përditësimit të porosisë
  const handleCancel = () => {
    setIsEditing(false);
    setSelectedOrder(null);
  };
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<orderHeaderModel | null>(null);

  const handleOrderDelete = async (id: number) => {
    deleteOrder(id);
    toast.promise(
      deleteOrder(id),
      {
        pending: "Processing your request...",
        success: "Menu Item Deleted Successfully 👌",
        error: "Error encountered 🤯",
      },
      {
        theme: "dark",
      }
    );
  };

  const handleOrderEdit = (orderItem: orderHeaderModel) => {
    setSelectedOrder(orderItem);
    setIsEditing(true);
  };

  const handleUpdateOrder = async (updatedOrder: orderHeaderModel) => {
    try {
      const result = await updateOrder(updatedOrder);
      
    } catch (error) {
      console.error("Error updating order:", error);
    }

    setIsEditing(false);
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table px-5">
          <div className="p-2">
            <div className="row border">
              <div className="col-1">ID</div>
              <div className="col-1">Name</div>
              <div className="col-2">Phone</div>
              <div className="col-1">Total</div>
              <div className="col-1">Items</div>
              <div className="col-2">Email</div>
              <div className="col-1"></div>
              <div className="col-2">Status</div>
              <div className="col-1"></div>
            </div>

            

            {orderData.map((orderItem: orderHeaderModel) => {
              const badgeColor = getStatusColor(orderItem.status!);
              return (
                <div className="row border" key={orderItem.orderHeaderId}>
                  <div className="col-1">{orderItem.orderHeaderId}</div>
                  <div className="col-1">{orderItem.pickupName}</div>
                  <div className="col-2">{orderItem.pickupPhoneNumber}</div>
                  <div className="col-1">
                    ${orderItem.orderTotal!.toFixed(2)}
                  </div>
                  <div className="col-1">{orderItem.totalItems}</div>
                  <div className="col-1">{orderItem.pickupEmail}</div>
                  <div className="col-2">
                    <span className={`badge bg-${badgeColor}`}>
                      {orderItem.status}
                    </span>
                  </div>
                  <div className="col-3">
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        navigate(
                          "/order/orderDetails/" + orderItem.orderHeaderId
                        )
                      }
                    >
                      Details
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleOrderDelete(orderItem.orderHeaderId)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                    <button
                      className="btn btn-warning mx-2"
                      onClick={() => {
                    alert("Mund te behen ndryshime bazike per pjesen e pranuesit te porosise!Nese nuk jeni dakord me porosi mund ta perdorni butonin Delete dhe te vazhdoni me Porosi te re");
                    
                    handleOrderEdit(orderItem)
                  }}
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                  </div>
                </div>
              );
            })}
            
          </div>
          {isEditing && selectedOrder && (
              <OrderEditForm
                orderItem={selectedOrder}
                onUpdate={handleUpdateOrder}
                onCancel={handleCancel}
              />
            )}
        </div>
      )}
    </>
  );
}

export default OrderList;
