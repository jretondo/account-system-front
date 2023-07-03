import apiRoutes from '../../../../api/routes'
import React, { useContext, useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import alertsContext from 'context/alerts';
import actionsBackend from 'context/actionsBackend';
import data from './dataExample.json';
import TabUserPermission from './tabUserPermissions';

const UserPermissions = ({
    setNewForm,
    idUser,
    userName,
    setIsLoading
}) => {
    const [permissionsList, setPermissionsList] = useState(data.data)

    const { newAlert, newActivity } = useContext(alertsContext)
    const { axiosGet, axiosPost, loadingActions } = useContext(actionsBackend)

    useEffect(() => {
        setIsLoading(loadingActions)
    }, [loadingActions, setIsLoading])

    const getPermissions = () => {

    }

    const postNewPermissions = () => {

    }

    return (
        <Card>
            <CardHeader>
                <Row>
                    <Col md="10">
                        <h2>{`Permisos para el usuario ${userName}`}</h2>
                    </Col>
                    <Col md="2" style={{ textAlign: "right" }}>
                        <button
                            className="btn btn-danger"
                            onClick={e => {
                                e.preventDefault();
                                setNewForm(false);
                            }}
                        >X</button>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <Container>
                    <div className='pb-5'>
                        <TabUserPermission
                            permissionsList={permissionsList}
                            setPermissionsList={setPermissionsList}
                        />
                    </div>
                </Container>
                <Container>
                    <Row>
                        <Col md="12" style={{ textAlign: "center" }}>
                            <button
                                className="btn btn-primary"
                                style={{ width: "200px", margin: "25px" }}
                                onClick={e => {
                                    e.preventDefault()
                                    postNewPermissions()
                                }}
                            >
                                Confirmar Permisos
                            </button>
                            <button
                                className="btn btn-danger"
                                style={{ width: "200px", margin: "25px" }}
                                onClick={e => {
                                    e.preventDefault()
                                    setNewForm(false)
                                }}
                            >
                                Cancelar
                            </button>
                        </Col>
                    </Row>
                </Container>
            </CardBody>
        </Card>
    )
}

export default UserPermissions