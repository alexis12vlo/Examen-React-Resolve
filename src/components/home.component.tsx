import { Component } from "react";
import Nav from 'react-bootstrap/Nav';
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";


type Props = {};

type State = {
  content: string;
  redirect: string | null,
  
}

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: "",
      redirect: null,
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser==='logeado') this.setState({ redirect: "/employees" });
    
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
    return (
      <div className=" mw-100 m-0p ">
        <header className="">
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
      
      
    </Nav>
        </nav>
        </header>
        <div className="HomeTitle">
          Home
        </div>
      </div>
    );
  }
}
