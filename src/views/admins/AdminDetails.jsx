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
  CImg,
  CInput,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { fetchWithToken } from "src/helpers/fetch";

import defaultUser from "src/assets/images/default-user.jpg";
import { useSelector } from "react-redux";

const AdminDetails = ({ match, history }) => {
  const { id: userId } = useSelector((state) => state.auth);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);
  const [danger, setDanger] = useState(false);
  const [user, setUser] = useState({});
  const [fixedUser, setFixedUser] = useState({});
  const { id } = match.params;

  useEffect(() => {
    const ac = new AbortController();
    const fetchUser = async () =>
      fetchWithToken(`users/admins/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data.body);
          setFixedUser(data.body);
        })
        .catch((error) => console.log(error));
    fetchUser();
    return () => ac.abort();
  }, [id]);

  const handleInputChange = ({ target }) => {
    setUser({
      ...user,
      [target.name]: target.value,
    });
  };

  const isFormValid = () => {
    if (user.password !== user.password2) {
      setFormError("Las contraseñas deben de ser iguales");
      return false;
    }
    return true;
  };

  const handleUserModification = async () => {
    if (isFormValid()) {
      const response = await fetchWithToken(
        `users/${id}`,
        {
          ...(user.email && { email: user.email }),
          ...(user.firstName && { firstName: user.firstName }),
          ...(user.lastName && { lastName: user.lastName }),
          ...(user.mobileNumber && { mobileNumber: user.mobileNumber }),
          ...(user.password && { password: user.password }),
          ...(user.username && { username: user.username }),
        },
        "PUT"
      );
      if (response.status === 204) {
        setFormError("");
        setSuccess(true);
      } else {
        const { error } = await response.json();
        setFormError(error);
        return;
      }
    }
  };

  const handleUserElimination = async () => {
    const response = await fetchWithToken(`users/admins/${id}`, {}, "DELETE");
    if (response.status === 204) {
      setDanger(false);
      history.push("/admins/view-all-admins");
    }
    setDanger(false);
    return;
  };

  const deletionValid = () => {
    if (id === userId) {
      setFormError("No puede eliminar su propia cuenta");
      return;
    }
    setDanger(true);
  };

  return (
    <React.Fragment>
      <CRow>
        <CCol xs="12" sm="12" md="5">
          <CCard color="gradient-secondary">
            <CCardBody className="text-center">
              <CImg
                src={user.imageUrl ? user.imageUrl : defaultUser}
                shape="rounded-circle"
                fluid
                width="200px"
                align="center"
              />
            </CCardBody>
            <CCardBody color="light">
              <p>
                <span className="font-weight-bold">Nombres: </span>
                {fixedUser.firstName}
              </p>
              <p>
                <span className="font-weight-bold">Apellidos: </span>
                {fixedUser.lastName}
              </p>
              <p>
                <span className="font-weight-bold">Correo: </span>
                {fixedUser.email}
              </p>
              <p>
                <span className="font-weight-bold">Nombre de usuario: </span>
                {fixedUser.username}
              </p>
              <p>
                <span className="font-weight-bold">Celular: </span>
                {fixedUser.mobileNumber}
              </p>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="12" md="7">
          {formError && <CAlert color="danger">{formError}</CAlert>}
          <CCard>
            <CCardHeader>
              <small>EDITAR ADMINISTRADOR</small>
            </CCardHeader>
            <CCardBody>
              <CFormGroup>
                <CLabel htmlFor="firstName">Nombres</CLabel>
                <CInput
                  name="firstName"
                  placeholder="Nombres"
                  defaultValue={user.firstName}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="lastName">Apellidos</CLabel>
                <CInput
                  name="lastName"
                  placeholder="Apellidos"
                  defaultValue={user.lastName}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="email">Correo</CLabel>
                <CInput
                  name="email"
                  placeholder="Correo"
                  autoComplete="off"
                  defaultValue={user.email}
                  onChange={handleInputChange}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="username">Nombre de usuario</CLabel>
                <CInput
                  name="username"
                  placeholder="Nombre de usuario"
                  defaultValue={user.username}
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
                  defaultValue={user.mobileNumber}
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
                  defaultValue={user.password}
                  onChange={handleInputChange}
                />
                <CFormText className="help-block">
                  * La contraseña no es un campo necesario, se la puede dejar
                  vacía
                </CFormText>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="country">Repita la contraseña</CLabel>
                <CInput
                  type="password"
                  name="password2"
                  placeholder="Repita la contraseña"
                  autoComplete="off"
                  defaultValue={user.password2}
                  onChange={handleInputChange}
                />
              </CFormGroup>
            </CCardBody>
            <CCardFooter className="text-center">
              <CButton
                type="submit"
                size="md"
                color="info"
                onClick={handleUserModification}
                className="mx-2"
              >
                <CIcon name="cil-scrubber" /> Editar
              </CButton>
              <CButton
                type="reset"
                size="md"
                color="danger"
                className="mx-2"
                onClick={deletionValid}
              >
                <CIcon name="cil-ban" /> Eliminar
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
          <CModalTitle>Administrador editado correctamente</CModalTitle>
        </CModalHeader>
        <CModalFooter className="text-center">
          <CButton
            color="success"
            onClick={() => {
              setSuccess(!success);
              history.push("/admins/view-all-admins");
            }}
          >
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal show={danger} onClose={() => setDanger(!danger)} color="danger">
        <CModalHeader closeButton>
          <CModalTitle>Eliminar Administrador</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ¿Está seguro que desea continuar? Esta acción es irreversible.
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={handleUserElimination}>
            Eliminar
          </CButton>{" "}
          <CButton color="secondary" onClick={() => setDanger(!danger)}>
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
};

export default AdminDetails;
