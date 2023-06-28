import apiRoutes from '../../../../api/routes'
import React, { useContext, useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import alertsContext from 'context/alerts';
import actionsBackend from 'context/actionsBackend';

const UserPermissions = ({
    setNewForm,
    idUser,
    userName,
    setIsLoading
}) => {
    const [permissionsAvailable, setPermissionsAvailable] = useState([])
    const [newPermissions, setNewPermissions] = useState([])
    const [layoutPermissions, setLayoutPermissions] = useState(<></>)
    const [layoutUserPermissions, setLayoutUserPermissions] = useState(<></>)

    const { newAlert, newActivity } = useContext(alertsContext)
    const { axiosGet, axiosPost, loadingActions } = useContext(actionsBackend)

    const ListPermissionsUsu = async () => {

        const response = await axiosGet(apiRoutes.permissionsDir.permissions, idUser)

        if (!response.error) {
            setPermissionsAvailable(response.data.permissions)
            setNewPermissions(response.data.userPermissions)
        } else {
            newAlert("danger", "Hubo un error al consultar al servidor. Error: " + response.errorMsg)
            setPermissionsAvailable([])
            setNewPermissions([])
        }
    }

    useEffect(() => {
        setIsLoading(loadingActions)
    }, [loadingActions, setIsLoading])

    const newPermission = async () => {
        const permissions = await new Promise((resolve, reject) => {
            let list = []
            if (newPermissions.length > 0) {
                // eslint-disable-next-line
                newPermissions.map((item, key) => {
                    list.push({
                        idPermission: item.id_permission
                    })
                    if (key === newPermissions.length - 1) {
                        resolve(list)
                    }
                })
            } else {
                resolve([])
            }
        })

        const data = {
            permissions: permissions,
            idUser: idUser
        }

        const response = await axiosPost(apiRoutes.permissionsDir.permissions, data)

        if (!response.error) {
            newAlert("success", "Permisos modificados con éxito!", "")
            newActivity(`Se le han modificado los permisos de acceso al usuario ${userName} (id: ${idUser})`)
            setNewForm(false)
        } else {
            newAlert("danger", "Hubo un error!", "Intente nuevamente! Error: " + response.errorMsg)
        }
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

                </Container>
                <Container>
                    <Row>
                        <Col md="12" style={{ textAlign: "center" }}>
                            <button
                                className="btn btn-primary"
                                style={{ width: "200px", margin: "25px" }}
                                onClick={e => {
                                    e.preventDefault();
                                    newPermission();
                                }}
                            >
                                Confirmar Permisos
                            </button>

                            <button
                                className="btn btn-danger"
                                style={{ width: "200px", margin: "25px" }}
                                onClick={e => {
                                    e.preventDefault();
                                    setNewForm(false);
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