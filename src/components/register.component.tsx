import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import EmployeService from '../services/employee.service'

type Props = {};

type State = {
  name: string,
  last_name: string,
  birthday: number,
  successful: boolean,
  message: string
};

export default class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
      name: "",
      last_name: "",
      birthday: 0,
      successful: false,
      message: ""
    };
  }

  validationSchema() {
    return Yup.object().shape({
      name: Yup.string()
        .test(
          "len",
          "El Nombre Tiene que tener minimo 3 y maximo 30 caracteres.",
          (val: any) =>
            val &&
            val.toString().length >= 3 &&
            val.toString().length <= 20
        )
        .required("Campo Requerido!"),
      last_name: Yup.string()
        .test(
          "len",
          "El Apellido Tiene que tener minimo 3 y maximo 30 caracteres.",
          (val: any) =>
            val &&
            val.toString().length >= 3 &&
            val.toString().length <= 20
        )
        .required("Campo Requerido!"),
        
        
        
    });
  }

  handleRegister(formValue: { name: string; last_name: string; birthday: number }) {
    const { name, last_name, birthday } = formValue;

    this.setState({
      message: "",
      successful: false
    });

    EmployeService.employepost(
      name,
      last_name,
      birthday,
    ).then(
      response => {
       EmployeService.employeget();
        this.setState({
          message: response.data.data,
          successful: true
        });
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: resMessage
        });
      }
    );
  }

  render() {
    const { successful, message } = this.state;

    const initialValues = {
      name: "",
      last_name: "",
      birthday: 0,
    };

    return (
      <div className="col-md-12 mb-2">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Formik
            initialValues={initialValues}
            validationSchema={this.validationSchema}
            onSubmit={this.handleRegister}
          >
            <Form>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="name"> Nombre </label>
                    <Field name="name" type="text" className="form-control" />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="last_name"> Apellidos </label>
                    <Field name="last_name" type="text" className="form-control" />
                    <ErrorMessage
                      name="last_name"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="birthday"> Fecha de Nacimiento </label>
                    <Field
                      name="birthday"
                      type="date"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="RegistrarDiv form-group">
                    <button type="submit" className="btn btn-primary btn-block">Registrar</button>
                  </div>
                </div>
              )}

              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    );
  }
}
