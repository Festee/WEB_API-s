import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const menuItemApi = createApi({
    reducerPath: "menuItemApi",//rezulati i kesaj kerkese ka mu shfaq te Redux Store sepse reducerPath eshte si metod e Reduxit
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7240/api",
        prepareHeaders: (headers: Headers, api) => {//behet authorizimi ne kerkesat nese nje token eshte i disponueshem ne localStore
          const token = localStorage.getItem("token");
          token && headers.append("Authorization", "Bearer " + token);
        },
    }),
    tagTypes: ["MenuItems"],//me tagTypes ruajme nje kopje ne Cache memorie, e kena perdor qe mos me ngarku serverin direkt
    endpoints: (builder) => ({
        getMenuItems: builder.query({
            query: () => ({
                url: "menuitem"
            }),
            providesTags: ["MenuItems"]
        }),
        getMenuItemById: builder.query({
            query: (id) => ({
                url: `menuitem/${id}`,
            }),
            providesTags: ["MenuItems"]
        }),
        createMenuItem : builder.mutation({
            query:(data)=>({
              url:"menuitem",
              method:"POST",
              body: data,
            }),
            invalidatesTags:["MenuItems"],
          }),
        updateMenuItem : builder.mutation({
            query:({data,id})=>({
              url:"menuitem/"+ id,
              method:"PUT",
              body: data,
            }),
            invalidatesTags:["MenuItems"],
          }),
          deleteMenuItem : builder.mutation({
            query:(id)=>({
              url:"menuitem/"+ id,
              method:"DELETE",
            }),
            invalidatesTags:["MenuItems"],//e kjo invalidatesTag eshte per me rifresku Cache pas ndryshime qe jan bo 
          }),
    }),
});

export const {useGetMenuItemsQuery, useGetMenuItemByIdQuery, useCreateMenuItemMutation, useUpdateMenuItemMutation, useDeleteMenuItemMutation } = menuItemApi;
export default menuItemApi; 