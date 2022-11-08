import { Component } from "react";
import { HashRouter as Router , Routes, Route, Link  } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import EmployeService from "./services/employee.service";

import IUser from './types/user.type';

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Upload from "./components/upload.component";


import Employees from "./components/employees.component";


import EventBus from "./common/EventBus";
import { string } from "yup";

type Props = {};

type State = {
  showModeratorBoard: boolean,
  showAdminBoard: boolean,
  currentUser: IUser | undefined
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
       EmployeService.employeget();

    
  }

  componentWillUnmount() {
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (

      <div>
        

        <div >

          <Routes>
          
            <Route  path="/" element={<Home />} />
            <Route  path="*" element={<Home />}/>
            <Route path="/home" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/login" element={<Login />} />
            <Route path="/employees" element={<Employees />} />

          </Routes>
        </div>

       
      </div>


    );
  }
}

export default App;