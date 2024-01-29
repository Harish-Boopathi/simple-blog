import axios from 'axios'
// import {message} from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, selcetStatus, selcetlog ,credentials} from './loginSlice'

const Login = () => {

  
  // const [messageApi, contextHolder] = message.useMessage();

    // const data = useSelector(selcetlog)
    const status =useSelector(selcetStatus)
    const dispatch = useDispatch()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [output,setOutput] = useState('ide')


    // // const fun = () =>{ 
    // //     if(email !== '' && password !== '')
    // //     {
    // //         setStatus('idle')
    // //     }
    // // }

    // // useEffect(() => {
    // //     if(status === 'idle'){
    // //       dispatch(fetchData())
    // //     }
    // //   },)

    // function send(){
    //   if(status === 'idle'){
    //     // dispatch(credentials(email,password))
    //     dispatch(fetchData(email,password))
    //   }
    // }

    // useEffect(() => {
    //   if (status === 'succeeded'){
    //     console.log(data)
    //     alert(status)
    //   }
    // },[status])
    var FormData = require('form-data');
    var data = new FormData();
    data.append('first_name', 'Nilanth');
    data.append('last_name', 'S');
    // data.append('image', fs.createReadStream('/path/to/file'));
    data.append('_method', 'patch');
    
    function send(){
      console.log('hi')
      axios( {
        method: 'get',
maxBodyLength: Infinity,
  url: 'https://react-assignment-api.mallow-tech.com/api/posts/26',
  headers: { 
    'Content-Type': 'application/json', 
    'X-Requested-With': 'XMLHttpRequest', 
    'Authorization': '', 
  },
      })
      .then(function (response) {
        console.log(response.data);
        setOutput("success")
      })
      .catch(function (error) {
        setOutput("error")
        console.log(error.toJSON());
      });
      if(output==="success"){
        alert('success')
      }
    }

  return (
    <div>
      <input type='email' placeholder='email' onChange={e => setEmail(e.target.value)}/>
      <input type='password' placeholder='password' onChange={e => setPassword(e.target.value)}/>
      <img src="http://react-blog-api.test/storage/images/VnL6w9Z2ju0bkzbhZMfYvkSyEC7zV2DZEmWghyLL.png" alt="no pic" />
      <button onClick={send}>ok</button>
    </div>
  )
}

export default Login
