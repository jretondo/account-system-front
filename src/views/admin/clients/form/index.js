import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';

const ClientsForm = ({
    clientInfo,
    setIsOpenClientForm
}) => {
    const [documentNumber, setDocumentNumber] = useState("")
    const [businessName, setBusinessName] = useState("")
    const [fantasieName, setFantasieName] = useState("")
    const [email, setEmail] = useState("")
    const [ivaConditionId, setIvaConditionId] = useState(0)
    const [direction, setDirection] = useState("")

    const newClientPost = () => {

    }

    return (<>
        <Card>
            <CardHeader>
                <Row>
                    <Col md="10">
                        <h2>{clientInfo ? `Modificar cliente ${clientInfo.business_name} CUIT: ${clientInfo.document_number}` : "Cliente Nuevo"}</h2>
                    </Col>
                    <Col md="2" style={{ textAlign: "right" }}>
                        <button
                            className="btn btn-danger"
                            onClick={e => {
                                e.preventDefault();
                                setIsOpenClientForm(false);
                            }}
                        >X</button>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <Form onSubmit={e => {
                    e.preventDefault();
                    newClientPost();
                }} >
                    <Row>
                        <Col md="4">
                            <FormGroup>
                                <Label for="cuitTxt">CUIT</Label>
                                <Input
                                    type="number"
                                    id="cuitTxt"
                                    placeholder="CUIT del cliente..."
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
                        <Col md="6">
                            <FormGroup>
                                <Label for="fantasieTxt">Nombre de Fantasía</Label>
                                <Input
                                    type="text"
                                    id="fantasieTxt"
                                    placeholder="Nombre de fantasía..."
                                    value={fantasieName}
                                    onChange={e => setFantasieName(e.target.value)}
                                    onFocus={() => setFantasieName(businessName)}
                                    required />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label for="fantasieTxt">Condición frente al IVA</Label>
                                <Input
                                    type="select"
                                    id="fantasieTxt"
                                    placeholder="Nombre de fantasía..."
                                    value={ivaConditionId}
                                    onChange={e => setIvaConditionId(e.target.value)}
                                >
                                    <option value={1}>IVA Responsable Inscripto</option>
                                    <option value={4}>IVA Sujeto Exento</option>
                                    <option value={6}>Responsable Monotributo</option>
                                    <option value={7}>Sujeto no Categorizado</option>
                                    <option value={11}>IVA Responsable Inscripto – Agente de Percepción</option>
                                    <option value={13}>Monotributista Social</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                            <FormGroup>
                                <Label for="emailTxt">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="emailTxt"
                                    placeholder="Email del usuario..."
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required />
                            </FormGroup>
                        </Col>
                        <Col md="8">
                            <FormGroup>
                                <Label for="directionTxt">Dirección</Label>
                                <Input
                                    type="text"
                                    id="directionTxt"
                                    placeholder="Dirección del cliente..."
                                    value={direction}
                                    onChange={e => setDirection(e.target.value)}
                                    required />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12" style={{ textAlign: "center" }}>
                            <button
                                className="btn btn-primary"
                                style={{ width: "150px", margin: "20px" }}
                                type="submit"
                            >
                                {clientInfo ? "Modificar" : "Agregar"}
                            </button>
                            <button
                                className="btn btn-danger"
                                style={{ width: "150px", margin: "20px" }}
                                onClick={e => {
                                    e.preventDefault();
                                    setIsOpenClientForm(false);
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

export default ClientsForm