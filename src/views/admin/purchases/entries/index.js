import React, { useState } from "react";
import PurchasesLayout from "..";
import { Button, Card, CardBody, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, Label, Row } from "reactstrap";
import { TableList } from "../../../../components/Lists/TableList";

const Index = () => {
    const [activeClient, setActiveClient] = useState()
    const [confirmedPeriod, setConfirmedPeriod] = useState(false)
    const [periodMonth, setPeriodMonth] = useState(new Date().getMonth())
    const [periodYear, setPeriodYear] = useState(new Date().getFullYear())

    return (
        <PurchasesLayout
            activeClient={activeClient}
            setActiveClient={setActiveClient}
        >
            <Card className="mt-2">
                <CardBody>
                    <Row>
                        <Col md="6">
                            <Row>
                                <Col md="12">
                                    <FormGroup>
                                        <Label>Periodo</Label>
                                        <InputGroup>
                                            <Input type="select" onChange={e => setPeriodMonth(e.target.value)} value={periodMonth} disabled={confirmedPeriod}>
                                                <option value={1}>Enero</option>
                                                <option value={2}>Febrero</option>
                                                <option value={3}>Marzo</option>
                                                <option value={4}>Abril</option>
                                                <option value={5}>Mayo</option>
                                                <option value={6}>Junio</option>
                                                <option value={7}>Julio</option>
                                                <option value={8}>Agosto</option>
                                                <option value={9}>Septiembre</option>
                                                <option value={10}>Octubre</option>
                                                <option value={11}>Noviembre</option>
                                                <option value={12}>Diciembre</option>
                                            </Input>
                                            <InputGroupAddon addonType="append">
                                                <Input type="number" onChange={e => setPeriodYear(e.target.value)} value={periodYear} disabled={confirmedPeriod} />
                                            </InputGroupAddon>
                                            <InputGroupAddon addonType="append">
                                                <Button
                                                    color={confirmedPeriod ? "danger" : "primary"}
                                                    onClick={e => {
                                                        e.preventDefault()
                                                        setConfirmedPeriod(!confirmedPeriod)
                                                    }}
                                                >{confirmedPeriod ? "X" : "Cargar"}</Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Form>
                                <Row>
                                    <Col md="4">
                                        <FormGroup>
                                            <Label>Fecha</Label>
                                            <Input type="date" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="3">
                                        <FormGroup>
                                            <Label>Tipo</Label>
                                            <Input type="select">
                                                <option value={1}>Factura</option>
                                                <option value={2}>Recibo</option>
                                                <option value={3}>Tiquet</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup>
                                            <Label>Letra</Label>
                                            <Input type="text" />
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup>
                                            <Label>PV</Label>
                                            <Input type="number" />
                                        </FormGroup>
                                    </Col>
                                    <Col md="4">
                                        <FormGroup>
                                            <Label>Número</Label>
                                            <Input type="number" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                        <Col md="6" style={{ borderLeft: "4px solid #073863" }}>
                            <Row>
                                <Col md="12" className="text-center mb-2">
                                    <Button color="primary">Importar desde AFIP <i className="fas fa-download"></i></Button>
                                    <Button color="primary">Exportar txt <i className="fas fa-upload"></i></Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <TableList titlesArray={["Fecha", "Comprobante", "Proveedor", "Importe"]}>

                                    </TableList>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </PurchasesLayout>
    )
}

export default Index;
