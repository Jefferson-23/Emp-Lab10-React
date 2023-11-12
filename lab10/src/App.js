import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      recuperado: false,
    };
  }

  componentDidMount() {
    fetch('http://localhost:8000/producto/')
      .then((response) => response.json())
      .then((prod) => {
        this.setState({
          productos: prod,
          recuperado: true,
        });
      })
      .catch((error) => console.error('Error fetching data:', error));
  }
  mostrarTabla() {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.productos.map((prod) => (
              <TableRow key={prod.codigo}>
                <TableCell>{prod.codigo}</TableCell>
                <TableCell>{prod.descripcion}</TableCell>
                <TableCell>{prod.precio}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  render() {
    return this.state.recuperado ? this.mostrarTabla() : <div>Recuperando datos...</div>;
  }
}

export default App;
