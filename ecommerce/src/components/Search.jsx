import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [keyword,setKeyword]=useState("");   
  const navigate= useNavigate();



  const searchHandle = ()=>{
    navigate('/search?keyword='+keyword)
  }

  return (
  //   <div className="input-group">
  //   <input
  //     type="text"
  //     onChange={(e)=> setKeyword(e.target.value)}
  //     id="search_field"
  //     className="form-control"
  //     onBlur={searchHandle}
  //     placeholder="Enter Product Name ..."
  //   />
  //   <div className="input-group-append">
  //     <button onClick= {searchHandle} id="search_btn" className="btn">
  //       <i className="fa fa-search" aria-hidden="true"></i>
  //     </button>
  //   </div>
  // </div>
  <div className="flex items-center border-2 border-pink-400 rounded-lg overflow-hidden bg-white">
      <input style={{color:"black"}}
        type="text"
        onChange={(e) => setKeyword(e.target.value)}
        onBlur={searchHandle}
        className="w-full px-4 py-2 outline-none focus:ring-2 focus:ring-pink-500"
        placeholder="Enter Product Name..."
      />
      <button 
        onClick={searchHandle} 
        className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 transition duration-300"
      >
        <i className="fa fa-search"></i>
      </button>
    </div>
   
  )
}

export default Search
