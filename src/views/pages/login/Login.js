import CIcon from "@coreui/icons-react";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogin } from "src/actions/auth";
import { removeError, setError } from "src/actions/ui";
import ucbLogo from "src/assets/images/ucb-logo.png";
import { useForm } from "src/hooks/useForm";

const Login = () => {
  const dispatch = useDispatch();
  const { msgError, loading } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    credential: "",
    password: "",
  });

  const { credential, password } = formValues;

  const handleLoginButton = (e) => {
    e.preventDefault();
    login();
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      login();
    }
  };

  const login = () => {
    if (isFormValid()) {
      dispatch(startLogin(credential, password));
    }
  };

  const isFormValid = () => {
    if (credential.trim().length === 0) {
      dispatch(setError("El nombre de usuario o correo es requerido"));
      return false;
    } else if (password.length < 6) {
      dispatch(setError("La contraseña debe ser de al menos 6 caracteres"));
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm autoComplete="off">
                    <h1>Acceso</h1>
                    <p className="text-muted">Inicie sesión en su cuenta</p>
                    {msgError && <CAlert color="danger">{msgError}</CAlert>}
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Nombre de usuario o correo"
                        autoComplete="off"
                        name="credential"
                        value={credential}
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="off"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                        onKeyDown={onKeyDown}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="info"
                          className="px-4"
                          onClick={handleLoginButton}
                          disabled={loading}
                        >
                          Acceso
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-info py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>IoT Saline</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <img src={ucbLogo} width="90%" alt="ucb logo" />
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
