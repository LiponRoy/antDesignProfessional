import { Button, Modal, Table, Form, Input, Select, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const Customers = () => {
	// store all data here
	const [allData, setAllData] = useState([]);
	// Add Edit Modal Visibility useState
	const [addEditModalVisibality, seAddEditModalVisibality] = useState(false);

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
			title: 'Gender',
			dataIndex: 'gender',
			render: (id, record) => (
				<div className=' flex justify-center items-center gap-x-2'>
					<DeleteOutlined className=' mx-2 text-lg cursor-pointer' />
					<EditOutlined className=' mx-2 text-lg cursor-pointer' />
				</div>
			),
		},
	]);

	const dataFetch = () => {
		fetch('http://localhost:4000/user/allUser')
			.then((res) => res.json())
			.then((result) => {
				setAllData(result);
			});
	};

	useEffect(() => {
		dataFetch();
	}, []);

	const Finish = (values) => {
		console.log(values);
	};

	return (
		<div>
			<div className=' flex justify-between items-center px-[.10rem] py-4'>
				<div className=' text-lg'>Total Item : {allData.length}</div>
				<Button onClick={() => seAddEditModalVisibality(true)} className=' bg-zinc-600 text-white'>
					ADD USER
				</Button>
			</div>
			<Table columns={columnsAl} dataSource={allData}></Table>
			{/* // Modal for Add Edit from */}
			<Modal title='Add Modal' open={addEditModalVisibality} onCancel={() => seAddEditModalVisibality(false)} footer={[]}>
				<Form layout='vertical' onFinish={Finish}>
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
					<Form.Item label='Gender' name='gender'>
						<Select>
							<Select.Option value='male'>Male</Select.Option>
							<Select.Option value='female'>Femail</Select.Option>
							<Select.Option value='other'>Other</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item name='active' valuePropName='checked'>
						<Checkbox>isActive</Checkbox>
					</Form.Item>
					<div className=' flex justify-end'>
						<Button htmlType='submit' className='border-2 border-pink-600 '>
							Submit Please
						</Button>
					</div>
				</Form>
			</Modal>
		</div>
	);
};

export default Customers;
