import { Link } from "react-router-dom";

function Productsitems({product}) {
  return (
    
       <div className="col-sm-12 col-md-6 col-lg-3 my-3" id="star">
          <div className="card p-3 rounded">
            <img
              className="card-img-top mx-auto"
              src={product.image && product.image.length > 0 ? product.image[0] : "default-image.jpg"}

            //  src={
                //product.images && product.images[0]
                //  ? product.images[0].image
                //  : "default-image.jpg" // Replace with your placeholder image URL
             // }
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">
                <a href="">{product.name || "Product Title"}</a>
              </h5>
              <div className="card-body d-flex flex-column">
              <h6 className="card-des">
                {product.description || "Product Title"}
              </h6>
              </div>
              <div className="ratings mt-auto">
                <div className="rating-outer">
                  <div className="rating-inner"></div>
                </div>
              </div>
              <p className="card-text">${product.price}</p>
              <Link to ={"/product/"+product._id} id="view_btn" className="btn btn-block">View Details</Link>
            </div>
          </div>
        </div>
    
  )
}

export default Productsitems
