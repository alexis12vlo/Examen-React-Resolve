import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {

  login(username: string, password: string) {
    
        if (username === 'prueba1' && password === '1234') {
          localStorage.setItem("user", JSON.stringify('logeado'));
          return 'logeado';
        }else{
          return 'Error'
        }

        
     
  }

  uploadimages(imagenes:any) {
    localStorage.removeItem("imagenes");
    localStorage.setItem("imagenes", JSON.stringify(imagenes));
  }
  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr){
      return JSON.parse(userStr);
    } 

    return null;
  }
}

export default new AuthService();
