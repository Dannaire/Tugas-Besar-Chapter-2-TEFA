import React, { useState, useEffect } from 'react';
import './CSS/product.css'
import { Link } from 'react-router-dom';

function Product() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [q, setQ] = useState("");
    const [searchParam] = useState(["name", "description", "category"]);
    const [filterParam, setFilterParam] = useState(["All"]);


    useEffect(() => {
        fetch(
            "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1f2898db-ceb4-4565-a1eb-2d3beb8a509c/product.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230204T070238Z&X-Amz-Expires=86400&X-Amz-Signature=f947b372f279cb6509effa7fa1f28a29b07e70254b2c043d67114dd9d799b611&X-Amz-SignedHeaders=host&x-id=GetObject"
        )
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    const data = Object.values(items)

    function search(items) {
        return items.filter((item) => {
            if (item.category == filterParam) {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            } else if (filterParam == "All") {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            }
        });
    }

    if (error) {
        return (
            <p>
            Api Mungkin bermasalah, segera update API anda dengan API yang sudah disediakan di studycase 
            </p>
        );
    } else if (!isLoaded) {
        return <>loading...</>;
    } else {
        return (
            
            <div className="home">
                 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <div className="w">
            <nav>
    <div className="logo">
   Kelompok 5
    </div>
    <input type="checkbox" id="click" />
        <label htmlFor="click" className="menu-btn">
          <i className="fas fa-bars" />
        </label>
        <ul>
          <li><Link to="/">Home</Link></li> 
          <li><Link to="/Product">Product</Link></li>
        </ul>
    
  </nav>
            </div>
            <div className="wrappertop">
                <div className="search-wrapper">
                    <label htmlFor="search-form">
                        <input
                            type="search"
                            name="search-form"
                            id="search-form"
                            className="search-input"
                            placeholder="Search Product Here!"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                        <span className="sr-only">Search Product Here</span>
                    </label>

                    <div className="select">
                        <select
                            onChange={(e) => {
                                setFilterParam(e.target.value);
                            }}
                            className="custom-select"
                            aria-label="Filter Product By Category"
                        >
                            <option value="All">Filter By Category</option>
                            <option value="Ready">Ready</option>
                            <option value="Barang Bekas">Barang Bekas</option>
                            <option value="Pre-Order">Pre-Order</option>
                        </select>
                        <span className="focus"></span>
                    </div>
                </div>
                <div className="title">
                    Product
                </div>
                <div className="information">
                {data.length} Product Found
                    </div>
                </div>
                
                <div className="wrappercard">
                
                <ul className="card-grid">
                    {search(data).map((item) => (
                        <li>
                            <article className="card" key={item.name}>
                                <div className="card-image">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                    />
                                </div>
                                <div className="card-content">
                                    <h2 className="card-name">{item.name}</h2>
                                    <ol className="card-list">
                                        <li>
                                            <span>{item.description}</span>
                                        </li>
                                        <li>
                                        <h3><span>Rp.{item.price},-</span></h3>
                                        </li>
                                      
                                    </ol>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
                </div>
            </div>
            
        );
    }
}

export default Product;
