import { Button, Modal, Table, Form, Input, Select, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useAddDataMutation, useDeleteDataMutation, useGetDataQuery, useUpdateDataMutation } from '../feature/dataApi';
import { useParams } from 'react-router-dom';

const Customers = () => {
	const { id } = useParams();
	// Get Data Form RTK Query
	const { data: allData, isFetching } = useGetDataQuery();
	const [addData, { isLoading: addLoading, isSuccess }] = useAddDataMutation();
	const [updateData, { isLoading: updateLoading, updateSuccess }] = useUpdateDataMutation();
	const [deleteData] = useDeleteDataMutation();
	


	// store all data here
	// const [allData, setAllData] = useState([]);
	// Add Edit Modal Visibility useState
	const [addEditModalVisibality, seAddEditModalVisibality] = useState(false);
	// for edit item
	const [editItem, setEditItem] = useState(null);

	// columns for table
	const [columnsAl, setColumnsAll] = useState([
		{
			title: 'Name',
			dataIndex: 'name',
		},
		{
			title: 'Image',
			dataIndex: 'image',
			// width: 120,
			// maxWidth: 120,
			render: (t, r) => <img src={`${r.image}`} height='80' width='80' />,
		},
		{
			title: 'Phone',
			dataIndex: 'phone',
		},
		{
			title: 'Gender',
			dataIndex: 'gender',
		},
		{
			title: 'isActive',
			dataIndex: 'isActive',
		},
		{
			title: 'Actions',
			dataIndex: '_id',
			render: (id, record) => (
				<div className=' flex justify-center items-center gap-x-2'>
					<EditOutlined className=' mx-2 text-lg cursor-pointer' onClick={() => {
						setEditItem(record);
						seAddEditModalVisibality(true);
					}} />
					<DeleteOutlined onClick={()=>{deleteData(record._id)}} className=' mx-2 text-lg cursor-pointer' />
				</div>
			),
		},
	]);

	// const dataFetch = () => {
	// 	fetch('http://localhost:4000/user/allUser')
	// 		.then((res) => res.json())
	// 		.then((result) => {
	// 			setAllData(result);
	// 		});
	// };

	useEffect(() => {

	}, [allData]);

	const Finish = async(values) => {

		editItem!==null ? await updateData({_id:editItem._id,data:values}):await addData(values)

		
		console.log("Finish er moodhe :",editItem)
		ModalCancel();
	};

	const ModalCancel = () => {
		setTimeout(() => {
			setEditItem(null)
			seAddEditModalVisibality(false)
		}, 500);

	}

	// const dataAdd = async (val) => {
	// 	await addData(val)
	// }

	return (
		<div>
			<div className=' flex justify-between items-center px-[.10rem] py-4'>
				<div className=' text-lg'>Total Item : {allData?.length}</div>
				<Button onClick={() => seAddEditModalVisibality(true)} className=' bg-zinc-600 text-white'>
					ADD USER
				</Button>
			</div>
			<Table columns={columnsAl} dataSource={allData && allData}></Table>
			{/* // Modal for Add Edit from */}
			{addEditModalVisibality && <Modal title={`${editItem!==null ?'Edit Item':'Add Item'}`} open={addEditModalVisibality} onCancel={() => ModalCancel()} footer={[]}>
				<Form layout='vertical' initialValues={editItem} onFinish={Finish}>
					{/* // name input */}
					<Form.Item
						label='Name'
						name='name'
						rules={[
							{
								required: true,
								message: 'Please input your name!',
							},
						]}>
						<Input className=' border-2 border-pink-600'></Input>
					</Form.Item>
					{/* // phone input */}
					<Form.Item
						label='Phone'
						name='phone'
						rules={[
							{
								required: true,
								message: 'Please input your phone!',
							},
						]}>
						<Input className=' border-2 border-pink-600'></Input>
					</Form.Item>
					{/* // image input */}
					<Form.Item
						label='Image Url'
						name='image'
						rules={[
							{
								required: true,
								message: 'Please input your image url !',
							},
						]}>
						<Input className=' border-2 border-pink-600'></Input>
					</Form.Item>
					{/* // image input */}
					<Form.Item label='Gender' initialValue='male' name='gender'>
						<Select>
							<Select.Option value='male'>Male</Select.Option>
							<Select.Option value='female'>Femail</Select.Option>
							<Select.Option value='common gender'>Common Gender</Select.Option>
						</Select>
					</Form.Item>

					<Form.Item
						name="isActive"
						valuePropName="checked"
					>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>

					<div className=' flex justify-end'>
						<Button htmlType='submit' className='border-2 border-pink-600 '>
							Submit Please
						</Button>
					</div>
				</Form>
			</Modal>}
		</div>
	);
};

export default Customers;
