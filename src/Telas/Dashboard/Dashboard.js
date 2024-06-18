import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "./Card/Card";
import Modal from "./Modal/Modal"; // Import your Modal component
import './Dashboard.css'; // Import your CSS file

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [newProperty, setNewProperty] = useState({ // State to hold new property data
    imagem: null,
    vagas: '',
    quartos: '',
    descricao: '',
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    // if (!token)   {
    //   navigate('/login');
    // }
    const fetchData = async () => {
      try {
        //validar o token
        const response = await axios.get("http://localhost:8080/imoveis", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log("response:", response.data);
        setData(response.data);
      } catch (error) {
        console.error(
          "Erro de login:",
          error.response ? error.response.data : error.message
        );
        // navigate('/login');
      }
    };

    fetchData();
  }, []);

  
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (event) => {
    setNewProperty({
      ...newProperty,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setNewProperty({
      ...newProperty,
      imagem: event.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("descricao", newProperty.descricao);
    formdata.append("imagem", newProperty.imagem, newProperty.imagem.name);
    formdata.append("vagas", newProperty.vagas);
    formdata.append("quartos", newProperty.quartos);
    formdata.append("usuario_id", localStorage.getItem("id"));

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };

    fetch("http://localhost:8080/imoveis", requestOptions)
      .then((response) => response.text())
      .then((result) => window.location.reload())
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mt-5">
      <h1>Dashboard</h1>
      <p>Bem-vindo ao seu painel!</p>
      <div className="mt-4">
        <button className="btn btn-primary" onClick={handleOpenModal}>Adicionar Imóvel</button>
        <Modal show={showModal} handleClose={handleCloseModal}>
          <form onSubmit={handleSubmit} className="property-form">
            <input type="file" name="imagem" onChange={handleFileChange} required />
            <input placeholder="vagas" type="number" name="vagas" value={newProperty.vagas} onChange={handleInputChange} required />
            <input placeholder="Quarto" type="number" name="quartos" value={newProperty.quartos} onChange={handleInputChange} required />
            <textarea placeholder="Descrição" type="text" name="descricao" value={newProperty.descricao} onChange={handleInputChange} required />
            <button type="submit">Submit</button>
          </form>
        </Modal>
        <div className="row">
          {data?.map((imovel) => (
            <Card
              key={imovel.id}
              descricao={imovel.descricao}
              quartos={imovel.quartos}
              vagas={imovel.vagas}
              imagem={imovel.imagem}
              idImovel={imovel.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;