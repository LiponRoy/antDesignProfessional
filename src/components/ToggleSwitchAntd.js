import React, { useState } from 'react'
import { Switch } from 'antd';
import { useEffect } from 'react';
const ToggleSwitchAntd = () => {

  const[toggle,setToggle]=useState(false)

  const onChange = (value) => {
    setToggle(value)
    // console.log(`switch to ${checked}`);
  };

  useEffect(()=>{
    console.log(toggle);
  },[toggle])

  const colorVariable =toggle?(" text-green-900 text-"):("text-blue-800");

  return (
    <div className=' h-screen w-full flex flex-col justify-center items-center gap-y-2 text-lg'>
      <span className={colorVariable}>{toggle?"Ami achi":"ami nei kintu"}</span>
      {/* size="default" */}
      <Switch defaultChecked={false} size="small" onChange={onChange} />
      
    </div>
  )
}

export default ToggleSwitchAntd
