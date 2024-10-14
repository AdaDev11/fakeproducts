import React, { useRef, useState } from "react";
import allProductsStore from "./AllProductsStore";
import { observer } from "mobx-react-lite";
import './AllProducts.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const AllProducts = observer(() => {
    const divRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;
    const [productSearch, setProductSearch] = useState(allProductsStore.products);
    const [search, setSearch] = useState('');
    const [cart, setCart] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showProducts, setShowProducts] = useState(false);

    const searchProduct = productSearch.filter(searchitem =>
        searchitem.title.toLowerCase().includes(search.toLowerCase())
    );

    const btnGet = () => {
        allProductsStore.allFetch();
        setProductSearch(allProductsStore.products);
        setShowProducts(!showProducts);
        console.log("FetchAll products get products function: ", allProductsStore.allFetch());
        console.log("FetchAll products get products: ", allProductsStore.products);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = search ? searchProduct.slice(indexOfFirstProduct, indexOfLastProduct) : allProductsStore.products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(search ? searchProduct.length : allProductsStore.products.length / productsPerPage); i++) {
        pageNumbers.push(i);
    };

    const handleBuy = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const handleDecrease = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (!existingProduct) return;

        if (existingProduct.quantity === 1) {
            setCart(cart.filter(item => item.id !== product.id));
        } else {
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ));
        }
    };

    const handleClearCart = () => {
        setCart([]);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="container-fluid">
            <br/>
            <input
                type='text'
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                }}
                placeholder='Search'
            />
            <br /> <br/>

            <Button variant="primary" onClick={() => handleShowModal()}>
                View Cart ({totalItems} items)
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cart.length > 0 ? (
                        <div>
                            {cart.map((item) => (
                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <div>
                                        <img src={item.images} className="card-img-top" style={{ width: '40px', height: '40px' }} />
                                        <p>{item.title}</p>
                                        <p>Price: ${item.price}</p>
                                    </div>
                                    <div style={{ display: 'flex', height: '50%'}}>
                                        <Button variant="secondary" onClick={() => handleDecrease(item)}>-</Button>
                                        <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                                        <Button variant="secondary" onClick={() => handleBuy(item)}>+</Button>
                                    </div>
                                </div>
                            ))}
                            <hr />
                            <p>Total Price: ${totalPrice.toFixed(2)}</p>
                        </div>
                    ) : (
                        <p>Your cart is empty</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleClearCart()}>
                        Clear Cart
                    </Button>
                    <Button variant="secondary" onClick={() => handleCloseModal()}>
                        Close
                    </Button>
                    <Button variant="primary" >
                        Checkout
                    </Button>
                </Modal.Footer>
            </Modal>

            <Button variant="primary" onClick={() => btnGet()}>
                {showProducts ? 'Hide products' : 'Show all products'}
            </Button>

            {showProducts && (
                <div className="row contentDiv" ref={divRef}>
                    {currentProducts && currentProducts.length > 0 ? (
                        currentProducts.map((product) => (
                            <div key={product.id} className="col-md-4 productDiv" style={{ width: '240px', height: '400px', backgroundColor: '#5678', padding: '12px', margin: '12px', border: '1px solid #5678', borderRadius: '10px' }}>
                                <div className="card">
                                    <img src={product.images} className="card-img-top" style={{ width: '10rem', height: '10rem' }} />
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ width: '200px', height: '100px' }}>{product.title}</h5>
                                        <p className="card-text">{product.category}</p>
                                        <p className="card-text">${product.price}</p>
                                        <button variant="primary" className="bg-primary" onClick={() => handleBuy(product)}>Buy</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products available</p>
                    )}

                    <nav>
                        <ul className="pagination">
                            {pageNumbers.map(number => (
                                <li key={number} className="page-item">
                                    <button onClick={() => paginate(number)} className="page-link">
                                        {number}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}

        </div>
    );
});

export default AllProducts;