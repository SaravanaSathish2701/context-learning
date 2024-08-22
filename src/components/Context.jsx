import { createContext, useState, useContext } from "react";
import styles from "./context.module.css";

const CartContext = createContext(null);

const ChildA = () => {
  const { cart, handleQty, handleRemove } = useContext(CartContext);

  return (
    <>
      {console.log("Child A")}
      <div>
        {cart.map((pd) => (
          <div
            key={pd.id}
            style={{
              border: "1px solid",
              borderRadius: "5px",
              backgroundColor: "#ccc",
              height: 675,
              overflow: "scroll",
            }}
          >
            <img src={pd.image} alt={pd.title} className={styles.img} />
            <h1 className={styles.h1}>{pd.title}</h1>
            <p className={styles.p}>{pd.description}</p>
            <h3 className={styles.category}>Category: {pd.category}</h3>
            <h3 className={styles.rating}>Rating: {pd.rating.rate}</h3>
            <select
              className={styles.quantity}
              value={pd.quantity}
              onChange={(e) => {
                const { value } = e.target;
                handleQty(pd.id, value);
              }}
              style={{ color: "red" }}
            >
              <option value={"1"}>1</option>
              <option value={"2"}>2</option>
              <option value={"3"}>3</option>
              <option value={"4"}>4</option>
              <option value={"5"}>5</option>
              <option value={"6"}>6</option>
              <option value={"7"}>7</option>
              <option value={"8"}>8</option>
              <option value={"9"}>9</option>
              <option value={"10"}>10</option>
            </select>
            <h3 className={styles.price}>
              Price: ${Number(pd.price) * Number(pd.quantity)}
            </h3>
            <h4
              style={{ color: "Red", cursor: "pointer" }}
              className={styles.remove}
              onClick={() => handleRemove(pd.id)}
            >
              {"Remove"}
            </h4>
            <br />
            <br />
            <hr className={styles.line} />
            <h2 className={styles.sub}>
              SubTotal: ${Number(pd.price) * Number(pd.quantity)}
            </h2>
            <h2 className={styles.ship}>Shipping: {"Free"}</h2>
          </div>
        ))}
        <div
          style={{
            border: "1px solid",
            borderRadius: "5px",
            backgroundColor: "#ccc",
          }}
        >
          <h1 className={styles.total}>
            Total: $
            {cart.reduce(
              (acc, pd) => acc + Number(pd.price) * Number(pd.quantity),
              0
            )}
          </h1>
        </div>
      </div>
    </>
  );
};

const Parent = () => {
  const [cart, setCart] = useState([
    {
      id: 9,
      title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
      price: 64,
      description:
        "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
      category: "electronics",
      image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
      rating: {
        rate: 3.3,
        count: 203,
      },
      quantity: 1,
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      price: 22.3,
      description:
        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      category: "men's clothing",
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      rating: {
        rate: 4.1,
        count: 259,
      },
      quantity: 1,
    },
  ]);

  const handleQty = (id, newQty) => {
    const updatedCart = cart.map((pd) =>
      pd.id === id ? { ...pd, quantity: Number(newQty) } : pd
    );
    setCart(updatedCart);
  };

  const handleRemove = (id) => {
    const updatedCart = cart.filter((pd) => pd.id !== id);
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, handleQty, handleRemove }}>
      <ChildA />
    </CartContext.Provider>
  );
};

export default Parent;
