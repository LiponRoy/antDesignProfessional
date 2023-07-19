import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dataApi = createApi({
	reducerPath: 'dataApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:4000/user/',
	}),
	tagTypes: ['dataTag'],
	endpoints: (builder) => ({
		getData: builder.query({
			query: () => '/allUser',
			transformResponse: (res) => res.reverse(),
			providesTags: ['dataTag'],
		}),
		addData: builder.mutation({
			query: (data) => ({
				url: '/addUser',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['dataTag'],
		}),
		updateData: builder.mutation({
			query: ({ _id, data }) => ({
				url: `/updateUser/${_id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['dataTag'],
		}),
		deleteData: builder.mutation({
			query: (_id) => ({
				url: `/deleteUser/${_id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['dataTag'],
		}),
		// getDataById: builder.query({
		// 	query: (_id) => `/data/getOne/${_id}`,
		// 	invalidatesTags: ['dataTag'],
		// }),
	}),
});

export const { useGetDataQuery,useAddDataMutation,useUpdateDataMutation,useDeleteDataMutation} = dataApi;
