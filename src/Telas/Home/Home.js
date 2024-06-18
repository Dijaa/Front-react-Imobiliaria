import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
   <>
    Página Inicial
    <Link to="/cadastro" className="link-primary">Entrar no sistema</Link>
   </>
  )
}

export default Home;