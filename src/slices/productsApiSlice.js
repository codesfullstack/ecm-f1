import { apiSlice } from './apiSlice';
const FAKE_STORE_API_URL = 'https://xxxxxxxxx.com';
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => `${FAKE_STORE_API_URL}/products`,
    }),
    getProductById: builder.query({
      query: (id) => `${FAKE_STORE_API_URL}/products/${id}`,
    }),
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: `${FAKE_STORE_API_URL}/products`,
        method: 'POST',
        body: JSON.stringify(newProduct),
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...updatedProduct }) => ({
        url: `${FAKE_STORE_API_URL}/products/${id}`,
        method: 'PUT',
        body: JSON.stringify(updatedProduct),
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${FAKE_STORE_API_URL}/products/${id}`,
        method: 'DELETE',
      }),
    }),
    getAllCategories: builder.query({
      query: () => `${FAKE_STORE_API_URL}/products/categories`,
    }),
  }),
});
export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAllCategoriesQuery,
} = productsApiSlice;
