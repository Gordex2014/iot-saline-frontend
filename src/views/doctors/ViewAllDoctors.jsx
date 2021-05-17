import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardTitle,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CImg,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { fetchWithToken } from "src/helpers/fetch";
import { useForm } from "src/hooks/useForm";
import defaultUser from "src/assets/images/default-user.jpg";

const ViewAllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [formValues, handleInputChange, reset] = useForm({ query: "" });
  const { query } = formValues;
  useEffect(() => {
    fetchWithToken("users/doctors")
      .then((response) => response.json())
      .then((data) => setDoctors(data.body))
      .catch((error) => console.log(error));
  }, []);

  const handleFetchQuery = async () => {
    const resp = await fetchWithToken(`users/doctors?filter=${query}`);
    const { body } = await resp.json();
    if (body) {
      setDoctors(body);
      reset();
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      handleFetchQuery();
    }
  };

  return (
    <React.Fragment>
      <CRow>
        <CCol>
          <CForm>
            <CFormGroup>
              <CRow>
                <CCol>
                  <CLabel htmlFor="nf-email">Búsqueda por nombre</CLabel>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="9" sm="10" md="11" lg="11">
                  <CInput
                    type="text"
                    id="nf-text"
                    name="query"
                    placeholder="Busque por nombre..."
                    autoComplete="off"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={onKeyDown}
                  />
                </CCol>
                <CCol xs="3" sm="2" md="1" lg="1">
                  <CButton
                    color="info"
                    shape="square"
                    size="sm"
                    className="my-1"
                    onClick={handleFetchQuery}
                  >
                    Buscar
                  </CButton>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CFormText className="help-block">
                    Por favor ingrese el nombre del médico que desea buscar
                  </CFormText>
                </CCol>
              </CRow>
            </CFormGroup>
          </CForm>
        </CCol>
      </CRow>
      <CRow>
        {doctors.map((doctor) => {
          return (
            <CCol xs="12" sm="6" xl="4" key={doctor.id}>
              <CCard>
                <CCardHeader>
                  {doctor.firstName} {doctor.lastName}
                  <div className="card-header-actions">
                    <CIcon name="cil-check" className="float-right" />
                  </div>
                </CCardHeader>
                <CCardBody>
                  <CCardTitle className="text-center">
                    <CImg
                      src={doctor.imageUrl ? doctor.imageUrl : defaultUser}
                      shape="rounded-circle"
                      fluid
                      width="100px"
                      align="center"
                      className="my-3 mx-2"
                    />
                  </CCardTitle>

                  <p>
                    <span className="font-weight-bold">
                      Nombre de usuario:{" "}
                    </span>
                    {doctor.username}
                  </p>
                  <p>
                    <span className="font-weight-bold">Correo: </span>
                    {doctor.email}
                  </p>
                  <p>
                    <span className="font-weight-bold">Celular: </span>
                    {doctor.mobileNumber}
                  </p>

                  <CCardFooter className="text-center">
                    <Link to={`/doctors/${doctor.id}`}>
                      <CButton
                        color="outline-info"
                        shape="pill"
                        className="m-2"
                        size="lg"
                      >
                        Editar
                      </CButton>
                    </Link>
                  </CCardFooter>
                </CCardBody>
              </CCard>
            </CCol>
          );
        })}
      </CRow>
    </React.Fragment>
  );
};

export default ViewAllDoctors;
