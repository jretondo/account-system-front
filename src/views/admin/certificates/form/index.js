import React, { useContext, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import certImg from 'assets/img/icons/crtImg.png';
import keyImg from 'assets/img/icons/keyImg.png';
import AlertsContext from 'context/alerts';
import ActionsBackend from 'context/actionsBackend';
import API_ROUTES from '../../../../api/routes';
import { randomNumber } from 'function/randomNumber';

const CertificatesForm = ({
    certificateInfo,
    setIsOpenCertificateForm
}) => {
    const [documentNumber, setDocumentNumber] = useState("")
    const [businessName, setBusinessName] = useState("")
    const [certFile, setCertFile] = useState("")
    const [keyFile, setKeyFile] = useState("")
    const [urlCrt, setUrlCrt] = useState("")
    const [urlKey, setUrlKey] = useState("")

    const { newAlert, newActivity } = useContext(AlertsContext)
    const { axiosGet, fetchPostFormData, loadingActions } = useContext(ActionsBackend)

    const newCertificatePost = async () => {
        const dataPost = new FormData();
        dataPost.append("certFile", certFile, `${documentNumber}-${randomNumber()}.crt`);
        dataPost.append("keyFile", keyFile, `${documentNumber}-${randomNumber()}.key`);
        dataPost.append("documentNumber", documentNumber);
        dataPost.append("businessName", businessName);

        await fetchPostFormData(API_ROUTES.certificatesDir.certificates, dataPost)
    }

    const PickCert = (e) => {
        setUrlCrt(e.target.value)
        setCertFile(e.target.files[0])
    }

    const PickKey = (e) => {
        setUrlKey(e.target.value)
        setKeyFile(e.target.files[0])
    }


    return (<>
        <Card>
            <CardHeader>
                <Row>
                    <Col md="10">
                        <h2>{certificateInfo ? `Modificar certificado ${certificateInfo.business_name} CUIT: ${certificateInfo.document_number}` : "Certificado Nuevo"}</h2>
                    </Col>
                    <Col md="2" style={{ textAlign: "right" }}>
                        <button
                            className="btn btn-danger"
                            onClick={e => {
                                e.preventDefault();
                                setIsOpenCertificateForm(false);
                            }}
                        >X</button>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <Form onSubmit={e => {
                    e.preventDefault();
                    newCertificatePost();
                }} >
                    <Row>
                        <Col md="4">
                            <FormGroup>
                                <Label for="cuitTxt">CUIT</Label>
                                <Input
                                    type="number"
                                    id="cuitTxt"
                                    placeholder="CUIT..."
                                    value={documentNumber}
                                    onChange={e => setDocumentNumber(e.target.value)}
                                    required />
                            </FormGroup>
                        </Col>
                        <Col md="8">
                            <FormGroup>
                                <Label for="businessNameTxt">Razón Social</Label>
                                <Input
                                    type="text"
                                    id="businessNameTxt"
                                    placeholder="Razón Social..."
                                    value={businessName}
                                    onChange={e => setBusinessName(e.target.value)}
                                    required />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6">
                            {
                                urlCrt === "" ?
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-crt"
                                        >
                                            Certificado Digital (.crt)
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            style={{ marginTop: "10px" }}
                                            id="input-crt"
                                            placeholder="Logo..."
                                            type="file"
                                            accept=".crt"
                                            onChange={e => PickCert(e)}
                                            required
                                        />
                                    </FormGroup> :
                                    <Col lg="4" style={{ padding: 0, margin: "auto", textAlign: "center" }}>
                                        <img
                                            src={certImg}
                                            alt="logo"
                                            style={{
                                                height: "140px",
                                                marginTop: "15px"
                                            }}
                                        />
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setUrlCrt("")
                                            }}
                                            className="btn btn-danger"
                                            style={{
                                                paddingInline: "10px",
                                                paddingTop: "4px",
                                                paddingBottom: "3px",
                                                borderRadius: "20px",
                                                position: "absolute",
                                                top: "5px",
                                                left: "8px"
                                            }}>
                                            <i className="fa fa-times" style={{ fontSize: "13px" }}></i>
                                        </button>
                                        <h3>{certFile.name}</h3>
                                    </Col>
                            }

                        </Col>
                        <Col lg="6">
                            {
                                urlKey === "" ?
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-key"
                                        >
                                            Llave privada (.key)
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            style={{ marginTop: "10px" }}
                                            id="input-crt"
                                            placeholder="Logo..."
                                            type="file"
                                            accept=".key"
                                            onChange={e => PickKey(e)}
                                            required
                                        />
                                    </FormGroup> :
                                    <Col lg="4" style={{ padding: 0, margin: "auto", textAlign: "center" }}>
                                        <img
                                            src={keyImg}
                                            alt="logo"
                                            style={{
                                                height: "140px",
                                                marginTop: "15px"
                                            }}
                                        />
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setUrlKey("")
                                            }}
                                            className="btn btn-danger"
                                            style={{
                                                paddingInline: "10px",
                                                paddingTop: "4px",
                                                paddingBottom: "3px",
                                                borderRadius: "20px",
                                                position: "absolute",
                                                top: "5px",
                                                left: "8px"
                                            }}>
                                            <i className="fa fa-times" style={{ fontSize: "13px" }}></i>
                                        </button>
                                        <h3>{keyFile.name}</h3>
                                    </Col>
                            }
                        </Col>
                    </Row>

                    <Row>
                        <Col md="12" style={{ textAlign: "center" }}>
                            <button
                                className="btn btn-primary"
                                style={{ width: "150px", margin: "20px" }}
                                type="submit"
                            >
                                {certificateInfo ? "Modificar" : "Agregar"}
                            </button>
                            <button
                                className="btn btn-danger"
                                style={{ width: "150px", margin: "20px" }}
                                onClick={e => {
                                    e.preventDefault();
                                    setIsOpenCertificateForm(false);
                                }}
                            >
                                Cancelar
                            </button>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card>
    </>)
}

export default CertificatesForm