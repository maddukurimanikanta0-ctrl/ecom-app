import { Link, useNavigate } from "react-router-dom"

function Header(){
  const name = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/")
  }
  return(
    <header>
      <h1>🏪  Online Store</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to ="/cart">Cart</Link>
        <Link to="/Layout">Layout</Link>
        <Link to="/Admin">Admin</Link>
        {name ? <button onClick = {handleLogout}>Logout</button> : null}
      </nav>
      {/* <div id="user-display">Welcome,user</div> */}
      <div id="user-display">
        {name ? `Welcome, ${name}` :" "}
      </div>

    </header>
  )
}
export default Header