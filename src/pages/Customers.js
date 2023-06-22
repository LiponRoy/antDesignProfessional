import { Table, Tag } from "antd";
import React, { useEffect, useState } from "react";

const Customers = () => {
  const [columnsAl, setColumnsAll] = useState([
    {
      title:'ID',
      dataIndex: '_id',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      width: 50,
      maxWidth: 50,
      render: (t, r) => <img src={`${r.image.url}`} />
    },
    {
      title:'Name',
      dataIndex: 'name',
    },
    
    {
      title: 'Brand',
      dataIndex: 'brand',
      
    },
    {
      title:'Price',
      dataIndex: 'price',
    },
  ]);

  const [allData, setAllData] = useState([]);
  useEffect(() => {
    fetch("https://liponroy-lotus-e-shop-backend-api-2023.onrender.com/api/product/getAll")
      .then((res) => res.json())
      .then((result) => {
        setAllData(result);
      });
      console.log(allData)
  },[]);
  return <div>
    <Table columns={columnsAl} dataSource={allData}></Table>
  </div>;
};

export default Customers;
