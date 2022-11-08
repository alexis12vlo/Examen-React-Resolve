import { Component  } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import EmployeService from "../services/employee.service";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import Register from "./register.component";
import './profile.css'
import IUser from "../types/user.type";

type Props = {};
type State = {
  redirect: string | null,
  userReady: boolean,
  currentUser: IUser & { accessToken: string },
  style : {},
  show :boolean
}
const {MDBDataTable} = require('mdbreact')
var arr:any = localStorage.getItem('list')
const data = {
  columns: [
    {
      label: "ID",
      field: "id",
      sort: "asc",
      width: 150
    },
    {
      label: "NAME",
      field: "name",
      sort: "asc",
      width: 270
    },
    {
      label: "LAST NAME",
      field: "last_name",
      sort: "asc",
      width: 200
    },
    {
      label: "BIRTHDAY",
      field: "birthday",
      sort: "asc",
      width: 100
    }
    
    
  ],
  rows : JSON.parse(arr)?.data.data.employees
  
}


  

export default class Employees extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { accessToken: "" },
      style : {transform: "translateX(10000px)", zIndex : "10"},
      show : false 
    };
    this.Registro = this.Registro.bind(this);
    this.handleClose  = this.handleClose .bind(this);
    this.handleShow  = this.handleShow .bind(this);

    
  }

  handleClose(){
    this.setState({show : false})  

  }
  
  handleShow (){
    this.setState({show : true})  

  }
  Registro(){
    this.setState({style : {transform: "translateX(0px)",zIndex : "100"}})  
  }
  componentWillUnmount() {
  }
  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser!=='logeado') this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true})  

  }
  Close(){
    EmployeService.employeget();
    window.location.reload()
  }
  CerrarSesion(){
    AuthService.logout();
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
    
    return (
      
      <div className="Employees" >
        <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Nav
     
    >
      <Nav.Item>
        <Nav.Link href="#/home">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#/employees">Employees</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#/login">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#/upload">Upload</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={this.CerrarSesion} href="#/home">Cerrar Sesion</Nav.Link>
      </Nav.Item>
      
    </Nav>
        </nav>
       

      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header onClick={this.Close} closeButton>
          <Modal.Title>Registrar</Modal.Title>
        </Modal.Header>
         <Register />
      </Modal>
        <div style={this.state.style} className="RegisterDiv">
            <Register />
        </div>
        <div className="Title">
          <p>Employees List
          </p>
        </div>
        <Button className="ButtonRegistro" variant="primary" onClick={this.handleShow}>
           Registrar Nuevo Cliente
        </Button>
        <div className="Table">
           <MDBDataTable noBottomColumns={true} data={data} />
        </div>
        
      </div>
    );
  }
}
