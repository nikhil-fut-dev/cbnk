import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";
import "../styles/navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalCartItems = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-brand">
        <Link to="/" onClick={closeMenu}>
          <img
            src="/ShopNestLogo.png"
            alt="ShopNest"
            className="navbar-logo"
          />
          <span>ShopNest</span>
        </Link>
      </div>

      <button
        className={`navbar-toggle ${menuOpen ? "is-open" : ""}`}
        type="button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((isOpen) => !isOpen)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`navbar-menu ${menuOpen ? "is-open" : ""}`}>
        <ul className="navbar-links">
          <li>
            <NavLink to="/" onClick={closeMenu} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" onClick={closeMenu}>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/electronics" onClick={closeMenu}>
              Electronics
            </NavLink>
          </li>
          <li>
            <NavLink to="/fashion" onClick={closeMenu}>
              Fashion
            </NavLink>
          </li>
          <li>
            <NavLink to="/home-category" onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/accessories" onClick={closeMenu}>
              Accessories
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={closeMenu}>
              About
            </NavLink>
          </li>
          {user?.role === "admin" && (
            <li>
              <NavLink to="/admin" onClick={closeMenu}>
                Admin
              </NavLink>
            </li>
          )}
        </ul>

        <div className="navbar-actions">
          <NavLink
            to="/cart"
            className="navbar-cart"
            aria-label={`Cart with ${totalCartItems} item${
              totalCartItems === 1 ? "" : "s"
            }`}
            onClick={closeMenu}
          >
            <span className="cart-icon" aria-hidden="true">
              <span />
            </span>
            <span>Cart</span>
            {totalCartItems > 0 && (
              <span className="cart-count">{totalCartItems}</span>
            )}
          </NavLink>

          {user ? (
            <>
              <NavLink
                to="/profile"
                className="navbar-user"
                onClick={closeMenu}
              >
                <span className="user-avatar" aria-hidden="true">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </span>
                <span className="user-name">{user.name}</span>
              </NavLink>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="navbar-login" onClick={closeMenu}>
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="navbar-register"
                onClick={closeMenu}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>

      {menuOpen && (
        <button
          className="navbar-scrim"
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMenu}
        />
      )}
    </nav>
  );
};

export default Navbar;
