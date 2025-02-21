import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='fixed w-full bg-white/[.3] z-[999] backdrop-blur-md p-4 px-10 uppercase justify-between flex items-center'>
      <Link to={'/'}>
        <h1 className='text-red-950 font-bold italic flex gap-1 tracking-widest rounded-full px-2'>
        <img className='h-6' draggable={false} src="https://cdn-icons-png.flaticon.com/512/3565/3565407.png" alt="" />

         RecipeStar</h1>
      </Link>
        <div className="flex items-center gap-10">

        <NavLink to={'/'} className={({isActive})=>isActive?'text-red-800':'text-red-950'}>
            <h5 className='hover:text-red-900 text-sm duration-75 cursor-pointer'>Home</h5>
        </NavLink>
        <NavLink to={'/recipes'} className={({isActive})=>isActive?'text-red-800':'text-red-950'}>
            <h5 className='hover:text-red-900 text-sm duration-75 cursor-pointer'>Recipes</h5>
        </NavLink>
        <NavLink to={'/recipes'} className={({isActive})=>isActive?'text-red-800':'text-red-950'}>
            <h5 className='hover:text-red-900 text-sm duration-75 cursor-pointer'>Find Donation Centers</h5>
        </NavLink>
        <NavLink to={'/create'} className={({isActive})=>isActive?'text-red-800':'text-red-950'}>
            <h5 className='hover:text-red-900 text-sm duration-75 cursor-pointer'>Start Meal Planning</h5>
        </NavLink>
            {/* <h4 className='hover:text-red-900 duration-75 cursor-pointer'>Services</h4> */}
        </div>
    </div>
  )
}

export default Navbar