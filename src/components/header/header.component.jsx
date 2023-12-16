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
        <Link to="hotel-form" className="add-hotel-link">
          Add hotel
        </Link>
        <button
          onClick={() => setModalIsOpen(!modalIsOpen)}
          className="create-category"
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
