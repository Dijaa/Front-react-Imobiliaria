import React, { useState } from "react";

const Card = ({ idImovel, descricao, quartos, vagas, imagem }) => {
  const [showDelete, setShowDelete] = useState(false);

  const handleCardClick = () => {
    setShowDelete(true);
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm("Tem certeza que deseja deletar?");
    if (confirmDelete) {
      const requestOptions = {
        method: "DELETE",
        redirect: "follow"
      };

      fetch(`http://localhost:8080/imoveis/${idImovel}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          alert("Imóvel deletado com sucesso!");
          window.location.reload();
        })
        .catch((error) => console.error(error));
    }
  };

  const handleOutsideClick = () => {
    setShowDelete(false);
  };

  const buttonStyle = {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div className="card" style={{ width: '18rem', margin: '1rem' }} tabIndex="0">
      <img src={imagem} className="card-img-top" alt={descricao} />
      <div className="card-body">
        <h5 className="card-title">{descricao}</h5>
        <p className="card-text">Quartos: {quartos}</p>
        <p className="card-text">Vagas: {vagas}</p>
        <button style={buttonStyle} onClick={handleDeleteClick}>Delete</button>
      </div>
    </div>
  );
};

export default Card;