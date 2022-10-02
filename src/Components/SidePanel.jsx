import React from 'react'

const SidePanel = ({ locate }) => {
    // console.log(locate);
    return (
        <div className='bg-white w-full h-full p-2 flex flex-col items-center relative'>
            <div className=''>
                <p className='text-5xl text-center font-bold'>Carbon <span className='text-blue-300'>Space</span>  Tech</p>
            </div>
            <div className='rounded h-1/2 w-11/12 card mt-10'>
                <div className='h-1/3 rounded-t bg-blue-300 image'></div>
                <div className='w-full p-2'>
                    <p className='font-bold mb-3'>Features info</p>

                    <p className='text-stone-600'>Name: {locate ? locate.lng : '---'}</p>
                    <p className='text-stone-600'>Site Name: ---</p>
                    <p className='text-stone-600'>Land Cover: ---</p>
                </div>
            </div>

            <footer className='absolute bottom-0 h-14 w-full bg-black text-white items-center flex justify-center font-bold'>
                <p className=''>&copy; Carbon Space Tech</p>
            </footer>
        </div >
    )
}

export default SidePanel