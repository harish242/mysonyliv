import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
const ResetPassword=()=>{
  const [err,setErr]=useState('')
    const store=useSelector(state=>state.persisted.resetPassword)
    const token=useSelector(state=>state.persisted.localJwtReducer.tokens)
    console.log('resetpass/5',store)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleInput=(e)=>{
        const idn=e.target.id
        console.log(idn)
        switch(idn){
            case 'name' :return dispatch({type:'nameret',payload:e.target.value})
            case 'email':return dispatch({type:'emailret',payload:e.target.value})
            case 'passwordCurrent':return dispatch({type:'passwordCurrentret',payload:e.target.value})
            case 'password':return dispatch({type:'passwordret',payload:e.target.value})
        }
    }
    // const doPost=(e)=>{
    //     e.preventDefault()
    //     try{
    //          (async()=>{
    //             const response=await fetch('https://academics.newtonschool.co/api/v1/user/updateMyPassword',
    //             {method:"PATCH",headers:{ 'Content-Type': 'application/json','projectId': 'xybcw190kyb8','Authorization':`Bearer ${token}`},
    //             body:JSON.stringify({name:store.name,email:store.email,passwordCurrent:store.passwordCurrent,password:store.password,"appType":"ott"})
    //         }
    //             )
    //             const data=await response.json()
    //             console.log('reset/29',data)
    //             if(data.status=='success'){
    //               navigate('/login')
    //             }
    //          })()
    //     }catch(err){
    //      console.log(err)
    //     }
    // }
    
    // Import Axios at the top of your file

const doPost = async (e) => {
  e.preventDefault();

  try {
    const url = 'https://academics.newtonschool.co/api/v1/user/updateMyPassword';
    const config = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'projectId': 'xybcw190kyb8',
        'Authorization': `Bearer ${token}`,
      },
    };

    const dataToSend = {
      name: store.name,
      email: store.email,
      passwordCurrent: store.passwordCurrent,
      password: store.password,
      appType: 'ott',
    };

    const response = await axios.patch(url, dataToSend, config);
    const data = response.data;

    console.log('reset/29', data);

    if (data.status === 'success') {
      navigate('/login');
    }else if(data.status==='fail'){
      setErr('Incorrect EmailId or Password')
    }
  } catch (err) {
    console.log(err);
  }
};

    return(
      <div style={{height:'100vh',width:'100vw',backgroundRepeat:'no-repeat',backgroundSize:'cover', backgroundImage:`url(https://w0.peakpx.com/wallpaper/848/320/HD-wallpaper-hanuman-pc-cool-hanuman.jpg)`}}>
         <div style={{display:"flex",justifyContent:'center',alignItems:'center',position:'relative',top:'100px'}}>
        <div class="w-full max-w-xs" >
  <form class="bg-blue-100 bg-opacity-30 shadow-md rounded px-8 pt-6 pb-8 mb-4" onChange={handleInput} onSubmit={doPost}>
  <div class="mb-4">
      <label class="block text-black text-lg font-bold mb-2" for="name">
        Name
      </label>
      <input class="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-transparent focus:shadow-outline"  id="name" type="text" placeholder="name"/>
    </div>
    <div class="mb-4">
      <label class="block text-black text-lg font-bold mb-2" for="email">
        Email
      </label>
      <input class="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-transparent focus:shadow-outline" id="email" type="email" placeholder="email"/>
    </div>
    <div class="mb-4">
      <label class="block text-black text-lg font-bold mb-2" for="passwordCurrent">
        PasswordCurrent
      </label>
      <input class="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-transparent focus:shadow-outline" id="passwordCurrent" type="password" placeholder="passwordcurrent"/>
    </div>
    <div class="mb-6">
      <label class="block text-black text-lg font-bold mb-2" for="password">
        Password
      </label>
      <input class="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-transparent focus:shadow-outline" id="password" type="password" placeholder="******************"/>
      <p class="text-red-500 text-xs italic">{err}</p>
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Confirm
      </button>
      {/* <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Reset Password?
      </a> */}
    </div>
  </form>
  <p class="text-center text-gray-500 text-xs">
    &copy;2020 Acme Corp. All rights reserved.
  </p>
</div>
</div>
      </div>
       
    )
}
export default ResetPassword