import CIcon from "@coreui/icons-react";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
} from "@coreui/react";
import React, { useState } from "react";
import { fetchWithToken } from "src/helpers/fetch";
import { useForm } from "src/hooks/useForm";
import { validRoles } from "src/types/types";

const CreateNewAdmin = ({ history }) => {
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formValues, handleInputChange, reset] = useForm({
    email: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    password: "",
    password2: "",
    username: "",
  });

  const {
    email,
    firstName,
    lastName,
    mobileNumber,
    password,
    password2,
    username,
  } = formValues;

  const isFormValid = () => {
    if (password !== password2) {
      setFormError("Las contraseñas deben de ser iguales");
      return false;
    }
    return true;
  };

  const handleUserCreation = async () => {
    if (isFormValid()) {
      const response = await fetchWithToken(
        "users",
        {
          email,
          firstName,
          lastName,
          mobileNumber,
          password,
          username,
          roles: [validRoles.admin],
        },
        "POST"
      );
      const { body, error } = await response.json();
      if (body) {
        setFormError("");
        setSuccess(true);
        reset();
        return;
      } else {
        setFormError(error);
        return;
      }
    }
  };

  return (
    <React.Fragment>
      <CRow>
        <CCol sm="10" lg="8" className="offset-sm-1 offset-lg-2">
          {formError && <CAlert color="danger">{formError}</CAlert>}
          <CCard>
            <CCardHeader>
              <small>NUEVO ADMINISTRADOR</small>
            </CCardHeader>
            <CCardBody>
              <CFormGroup>
                <CLabel htmlFor="firstName">Nombres</CLabel>
                <CInput
                  name="firstName"
                  placeholder="Nombres"
                  value={firstName}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="lastName">Apellidos</CLabel>
                <CInput
                  name="lastName"
                  placeholder="Apellidos"
                  value={lastName}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="email">Correo</CLabel>
                <CInput
                  name="email"
                  placeholder="Correo"
                  value={email}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="username">Nombre de usuario</CLabel>
                <CInput
                  name="username"
                  placeholder="Nombre de usuario"
                  value={username}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="mobileNumber">Celular</CLabel>
                <CInput
                  name="mobileNumber"
                  placeholder="Celular"
                  type="number"
                  value={mobileNumber}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="country">Contraseña</CLabel>
                <CInput
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  autoComplete="new-password"
                  value={password}
                  onChange={handleInputChange}
                />
                <CFormText className="help-block">
                  Por favor ingrese una contraseña compleja
                </CFormText>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="country">Repita la contraseña</CLabel>
                <CInput
                  type="password"
                  name="password2"
                  placeholder="Repita la contraseña"
                  autoComplete="off"
                  value={password2}
                  onChange={handleInputChange}
                />
              </CFormGroup>
            </CCardBody>
            <CCardFooter className="text-center">
              <CButton
                type="submit"
                size="md"
                color="info"
                onClick={handleUserCreation}
              >
                <CIcon name="cil-scrubber" /> Registrar
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>

      <CModal
        show={success}
        onClose={() => setSuccess(!success)}
        color="success"
      >
        <CModalHeader closeButton>
          <CModalTitle>Administrador creado con éxito</CModalTitle>
        </CModalHeader>
        <CModalFooter className="text-center">
          <CButton
            color="success"
            onClick={() => {
              setSuccess(!success);
              history.push("/admins/view-all-doctors");
            }}
          >
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
};

export default CreateNewAdmin;
