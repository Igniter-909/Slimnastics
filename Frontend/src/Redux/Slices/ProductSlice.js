import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    allProducts : [],
    current: {}
};

export const addProduct = createAsyncThunk(
    "/products/addProduct",
    async(data) => {
        try {
            const res = axiosInstance.post("/product/add-product",data);
            toast.promise(res,{
                loading: "Adding Product...",
                success: (res) => {
                    return res.data.message;
                },
                failed: "Failed to add the product"
            })
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
)

export const getAProduct = createAsyncThunk(
    "/products/getAProduct/:id",
    async(id) => {
        try {
            const res = axiosInstance.get(`/product/get-product/${id}`);
                toast.promise(res,{
                    loading: "Fetching Product...",
                    success: (res) => {
                        return res.data.product;
                    },
                    failed: "Failed to fetch the product"
                })
                return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
)

export const getAllProducts = createAsyncThunk(
    "/products/getAllProducts",
    async() => {
        try {
            const res = axiosInstance.get("/product/get-all-products");
            toast.promise(res,{
                loading: "Fetching all products...",
                success: (res) => {
                    return res.data.products;
                },
                failed: "Failed to fetch all products"
            })
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
)

export const updateProduct = createAsyncThunk(
    "/products/update/:id",
    async(data) => {
        try {
            const res = axiosInstance.put(`/product/update-product/${data.id}`,data);
            toast.promise(res,{
                loading: "Updating Product...",
                success: (res) => {
                    return res.data.message;
                },
                failed: "Failed to update the product"
            })
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
)

export const deleteProduct = createAsyncThunk(
    "/products/delete/:id",
    async(id) => {
        try {
            const res = axiosInstance.delete(`/product/delete-product/${id}`);
            toast.promise(res,{
                loading: "Deleting Product...",
                success: (res) => {
                    return res.data.message;
                },
                failed: "Failed to delete the product"
            })
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
)

const AllProductSlice = createSlice({
    name: "AllProductSlice",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled,(state,action) => {
            state.allProducts = action.payload.data;
        })
        builder.addCase(getAProduct.fulfilled,(state,action) => {
            state.current = action.payload.data;
        })
        builder.addCase(addProduct.fulfilled,(state,action) => {
            state.allProducts.push(action.payload.data);
        })
        builder.addCase(updateProduct.fulfilled,(state,action) => {
            const index = state.allProducts.findIndex(product => product._id === action.payload._id);
            state.allProducts[index] = action.payload.data;
        })
    }
})

export default AllProductSlice.reducer;