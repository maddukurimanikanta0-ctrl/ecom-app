import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";

function Products1() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://dummyjson.com/products")
      .then(res => {

        const apiProducts = res.data.products;
        const adminProducts =
          JSON.parse(localStorage.getItem("adminProducts")) || [];

        const visible =
          JSON.parse(localStorage.getItem("visibleProducts")) || [];

        const deleted =
          JSON.parse(localStorage.getItem("deletedProducts")) || [];

        const merged = [...apiProducts, ...adminProducts];

        const filtered = merged
          .filter(p => !deleted.includes(p.id))
          .filter(p =>
            visible.length === 0 ? true : visible.includes(p.id)
          );

        setProducts(filtered);
      });
  }, []);

  const handleAddtoCart = (product) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      alert("Please Login first !!!");
      navigate("/login");
      return;
    }

    let cartData = JSON.parse(localStorage.getItem("cart")) || [];

    const index = cartData.findIndex(item => item.id === product.id);

    if (index !== -1) {
      cartData[index].quantity =
        (cartData[index].quantity || 1) + 1;
    } else {
      cartData.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cartData));
    navigate("/cart");
  };

  return (
    <>
      <Header />
      <section className="products">
        {products.map((p) => (
          <div className="product" key={p.id}>
            <img src={p.thumbnail} alt={p.title} />
            <h3>{p.title}</h3>
            <p>Category: {p.category}</p>
            <p>Price: ${p.price}</p>
            <button onClick={() => handleAddtoCart(p)}>
              Add to Cart
            </button>
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
}

export default Products1;
