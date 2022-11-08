import axios from "axios";

const API_URL = "https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/:alexis_lujan";
const API_URL_2 = "https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/:alexis_lujan";
class EmployeService {



  employeget() {
    axios.get(API_URL)
         .then(function (response) {
            localStorage.setItem("list", JSON.stringify(response));
            
            return response
            })
         .catch(function (error) {
            console.log(error);
            })    
  }
  employepost(name: string, last_name: string, birthday: number) {
    return axios.post(API_URL, {
      name,
      last_name,
      birthday
    });
  }
  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr){
      return JSON.parse(userStr);
    } 

    return null;
  }
}

export default new EmployeService();
