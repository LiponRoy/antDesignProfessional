import { Button, Table, Tag } from 'antd';
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

	return (
		<div>
			<div className=' flex justify-between items-center px-[.10rem] py-4'>
				<div className=' text-lg'>Total Item :{allData.length}</div>
				<Button className=' bg-zinc-600 text-white'>ADD USER</Button>
			</div>

			<Table columns={columnsAl} dataSource={allData}></Table>
		</div>
	);
};

export default Customers;
