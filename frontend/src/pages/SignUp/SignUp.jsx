import React, { useState } from 'react'

const SignUp = () => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);
  const handleSignUp = async (e) => {
    e.preventDefault();
    if(!name) {
      setError("Please enter your name");
      return;
    }
    if(!email){
      setError("Please enter a valid email address");
      return;
    }
    if(!password){
      setError("Please enter a password");
      return;
    }
  };
  return (
    <div className=' h-screen bg-blue-500 flex items-center justify-center'>
      <div className="rounded w-96 border bg-white px-7 py-10">
        <h2 className='text-2xl font-bold mb-6'>Sign-up to Proceed</h2>
        <form onSubmit={handleSignUp}>
            <input type="name" id='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='shadow mb-6 appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:shadow-outline focus:outline-none' />
            <input type="email" id='password' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='shadow mb-6 appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:shadow-outline focus:outline-none' />
            <input type="password" id='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='shadow mb-6 appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:shadow-outline focus:outline-none' />
            {error && <p className='text-red-500 text-xs pb-3'>{error}</p>}
            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 w-full focus:outline-none focus:shadow-outline'>SignUp</button>
            <div>
              <p className="mt-4 text-sm text-center">
                Already have an account?  
                <a href="/Login" className='font-medium text-blue-500 underline ml-2'>Login</a>
              </p>
            </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp