import { useState } from "react";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

import CategoryModal from "../category-modal/category-modal.component";

import "./header.style.css";

const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="hotel building with four window pane" />
      </Link>
      <nav>
        {window.innerWidth >= 900 && (
          <Link onClick={() => setModalIsOpen(false)} to="/">
            Home
          </Link>
        )}
        <Link onClick={() => setModalIsOpen(false)} to="hotel-form">
          Add hotel
        </Link>
        <button
          onClick={() => setModalIsOpen(!modalIsOpen)}
          className={`create-category ${
            modalIsOpen ? "create-category--active" : ""
          }`}
        >
          Create Category
        </button>
      </nav>

      {modalIsOpen && (
        <CategoryModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
      )}
    </header>
  );
};

export default Header;
