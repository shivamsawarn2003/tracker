import React,{useState} from 'react';
import axios from 'axios';
const Login=()=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const handleLogin=async(e)=>{
e.preventDefault();
try{
    const response=await axios.post('http://localhost:5000/api/auth/login',{
        email,
        password,
    });
    localStorage.setItem('token',response.data.token);
    alert('Login Successfull');
}catch(err){
    console.error(err);
    alert('Invalid credentials');
}
};
return(
    <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}
        required/>
        <button type="submit">Login</button>
    </form>
);
};
export default Login;