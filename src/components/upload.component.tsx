import { Component } from "react";
import Nav from 'react-bootstrap/Nav';
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { FileUploader } from "react-drag-drop-files";
import Carousel from 'react-bootstrap/Carousel';
type Props = {};

type State = {
  content: string;
  redirect: string | null,
  file : null 
  preview : any
  
}



export default class Upload extends Component<Props, State> {
  fileTypes:any = ["JPG", "PNG", "GIF"];
  sourceUrl = [
    require("../assets/react-typescript-login-example-form-validation.png")
  ]
  constructor(props: Props) {
    super(props);

    this.state = {
      content: "",
      redirect: null,
      file : null ,
      preview : []
    };
    this.handleChange = this.handleChange.bind(this);
    this.CargarImagenes = this.CargarImagenes.bind(this);    
    this.onDraggingStateChange = this.onDraggingStateChange.bind(this);
  }
  CargarImagenes(){
      if(this.state.preview.length>0){
        AuthService.uploadimages(this.state.preview)
        this.setState({ preview:  []});

      }
  }
  onDraggingStateChange(e:any){
    console.log(e)
    if(e.length>1){
      let filearray:any = []
      e.map((res:any) => {
        filearray.push(URL.createObjectURL(res))
      })
      this.setState({ preview:  filearray});
    }else{
    
    let filearray:any = []

    this.setState({ file: e});
    filearray.push(URL.createObjectURL(e))
    this.setState({ preview:  filearray});}
  }
  handleChange(e:any){
   if(e.length>1){
    console.log('mayor')
    console.log(e)

      let filearray:any = []
      for(let i = 0 ; i < e.length ; i++){
        const objectUrl = URL.createObjectURL(e[i])
        filearray.push(objectUrl)
      }
      console.log(filearray)
      this.setState({ preview:  filearray});
    }else{
      console.log(e)
      console.log(this.state.preview)
    
    let filearray:any = []

    this.setState({ file: e});
    const objectUrl = URL.createObjectURL(e[0])
    filearray.push(objectUrl)
    this.setState({ preview:  filearray});}


  };
  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser!=='logeado') this.setState({ redirect: "/home" });
  
  }
  CerrarSesion(){
    AuthService.logout();
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
      <Nav.Item>
        <Nav.Link href="#/upload">Upload</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={this.CerrarSesion} href="#/home">Cerrar Sesion</Nav.Link>
      </Nav.Item>
      
    </Nav>
        </nav>
        </header>
        <div className="Uploaddiv">
          <div className="UploaddivContainer">
          <FileUploader multiple={true} hoverTitle="AQUI" label="Seleccione o Arrastre sus Imagenes"  handleChange={this.handleChange} name="file" types={this.fileTypes} />
          </div>
          <div className="UploaddivContainerImages">
          <Carousel interval={null} className="Carrusel">{
            this.state.preview?.map((res:any) => (
              <Carousel.Item style={{height:"100%" , width:"100%"}}  key={res}>
              <img
                style={{borderRadius:"15px" , width:"100%" ,height : "100%"}}
                className="d-block w-100 imagecarrusel"
                src={res}
                alt="First slide"
              />
              
              </Carousel.Item>
            ))
          }
           
     
    </Carousel>
          </div>
    <button onClick={this.CargarImagenes} type="button" className="btn btn-primary m-3">Cargar Imagenes</button>

        </div>
      </div>
    );
  }
}
