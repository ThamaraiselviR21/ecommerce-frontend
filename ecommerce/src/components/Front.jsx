import './style.css';




function Front() {
   const scrollToProducts = () => {
      document.getElementById('products_heading')?.scrollIntoView({ behavior: 'smooth' });
   }
  return (
     
     <div className='bg   container  '>
        <div className='con1'>
            <img src="/images/on.png" className='pic'/>
            <h1>Shop with style, stay for a while <br/> the best deals will make you smile!</h1>
            <img src='/images/shm.png'className='pic'/>

        </div>
        <div className='con2'><div className='picbox'>
         <img src='/images/s.png' className='pic'/>
         </div>

         <div className='picbox' id='pic'>
         <img src='/images/sh.png'className='pic'/></div>
         
         <img src='/images/og.png' className='pics'/>
         
        </div>
       
       <div className='btn'> 
             <button  onClick={scrollToProducts} className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 transition duration-300">Shop now</button>
       </div>
     </div>
     
  
  )
}

export default Front
