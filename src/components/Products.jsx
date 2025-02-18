import React from "react";

const Products = () => {
  return (
    <section className="product-head">
      <div className="products">
        <h2>Our Products</h2>
        <div className="product-row">
          <div className="product-col">
            <h3>Nike Football Shoes</h3>
            <p>Price: ₹2500</p>
            <p>
              High-performance football shoes with excellent grip and
              durability.
            </p>
          </div>
          <div className="product-col">
            <h3>Adidas Cricket Bat</h3>
            <p>Price: ₹6000</p>
            <p>
              Lightweight and powerful cricket bat, ideal for professionals
              and beginners.
            </p>
          </div>
          <div className="product-col">
            <h3>Wilson Tennis Racket</h3>
            <p>Price: ₹4000</p>
            <p>
              Premium quality tennis racket with a comfortable grip for
              enhanced performance.
            </p>
          </div>
          <div className="product-col">
            <h3>Spalding Basketball</h3>
            <p>Price: ₹1200</p>
            <p>
              Durable basketball, perfect for both indoor and outdoor courts.
            </p>
          </div>
        </div>
        <a href="index.html" className="button">View More Products</a>
      </div>
    </section>
  );
};

export default Products;
