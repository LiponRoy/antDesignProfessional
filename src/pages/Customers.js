import { Button, Modal, Table, Form, Input, Select, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useAddDataMutation, useDeleteDataMutation, useGetDataQuery, useUpdateDataMutation } from '../feature/dataApi';
import Notiflix from 'notiflix';

const Customers = () => {
	
	// Get Data Form RTK Query
	const { data: allData, isFetching } = useGetDataQuery();
	const [addData, { isLoading: addLoading, isSuccess }] = useAddDataMutation();
	const [updateData, { isLoading: updateLoading, updateSuccess }] = useUpdateDataMutation();
	const [deleteData] = useDeleteDataMutation();
	


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
			render: (_,record) => (
				<div className=' flex justify-center items-center gap-x-2'>
					<EditOutlined className=' mx-2 text-lg cursor-pointer' onClick={() => {
						setEditItem(record);
						seAddEditModalVisibality(true);
					}} />
					<DeleteOutlined onClick={()=>{confirmDelete(record._id,record)}} className=' mx-2 text-lg cursor-pointer' />
				</div>
			),
			

		},
	]);

	// For Table rowKey unique id
	let lastIndex = 0
	const updateIndex = () => {
		lastIndex++
		return lastIndex
	  }
	// For Table rowKey unique id End


	const Finish = async(values) => {

		try {
			editItem!==null ? await updateData({_id:editItem._id,data:values}):await addData(values)
		} catch (error) {
			console.log(error)
		}

		ModalCancel();
	};

	const ModalCancel = () => {
			setEditItem(null)
			seAddEditModalVisibality(false)
	}

	//  for delete confirmation dialog
		const confirmDelete = (id,record) => {
			Notiflix.Confirm.show(
				`Delete "${record.name}"`,
				`Do you delete ${record.name} ?`,
				'Delete',
				'NO',
				function okCb() {
					deleteData(id);
					
				},
				function cancelCb() {},
				{
					width: '320px',
					borderRadius: '8px',
					// etc...
				},
			);
		};
	//  for delete confirmation dialog  End




	return (
		<div>
			<div className=' flex justify-between items-center px-[.10rem] py-4'>
				<div className=' text-lg'>Total Item : {allData?.length}</div>
				<Button onClick={() => seAddEditModalVisibality(true)} className=' bg-zinc-600 text-white'>
					ADD USER
				</Button>
			</div>
			<Table rowKey={()=>updateIndex()}  columns={columnsAl} dataSource={allData && allData}></Table>
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
