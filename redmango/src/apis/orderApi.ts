import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OrderDetails } from "../Pages";


const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl:  "https://localhost:7240/api/",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
    }),
    tagTypes: ["Orders"],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
          query: (orderDetails) => ({
            url: "order",
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: orderDetails,
          }),
          invalidatesTags: ["Orders"],
        }),
        getAllOrders: builder.query({
          query: ({userId,searchString,status,pageSize,pageNumber}) => ({
              url: "order",
              params: { //parametrat qe i shtohen urls
                ...(userId && {userId}),
                ...(searchString && {searchString}),
                ...(status && {status}),
                ...(pageSize && {pageSize}),
                ...(pageNumber && {pageNumber})
              },
          }),
          transformResponse(apiResponse:{result:any},meta:any){
            return{
              apiResponse,
              totalRecords:meta.response.headers.get("X-Pagination")
            }
          },
          providesTags: ["Orders"]
      }),
      getOrderDetails: builder.query({
          query: (id) => ({
              url: `order/${id}`,
          }),
          providesTags: ["Orders"]
      }),
      updateOrderHeader : builder.mutation({
        query:(OrderDetails)=>({
          url:"order/"+OrderDetails.orderHeaderId,
          method:"PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: OrderDetails
        }),
        invalidatesTags:["Orders"]
      }),
      deleteOrder: builder.mutation({
        query: (id) => ({
          url: "order/"+id,
          method: "DELETE",
        }),
        invalidatesTags: ["Orders"],
      }),
      }),
    });
    
    export const { useCreateOrderMutation, useGetAllOrdersQuery, useGetOrderDetailsQuery, useUpdateOrderHeaderMutation,useDeleteOrderMutation } = orderApi;
    export default orderApi;