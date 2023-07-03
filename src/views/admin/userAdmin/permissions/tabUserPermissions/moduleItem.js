import React, { useEffect, useState } from 'react';
import { Col, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupButtonDropdown } from 'reactstrap';

const ModuleItem = ({ module, changePermission, clientId }) => {
    const [permissionGrade, setPermissionGrade] = useState({
        color: "gray",
        text: "Deshabilitado"
    })  //0=>not available, 1=>read only, 2=>read and write, 3=>total control
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const changePermissionGrade = (grade) => {
        switch (grade) {
            case 0:
                setPermissionGrade({
                    color: "gray",
                    text: "Deshabilitado"
                })
                break;
            case 1:
                setPermissionGrade({
                    color: "info",
                    text: "Sólo lectura"
                })
                break;
            case 2:
                setPermissionGrade({
                    color: "success",
                    text: "Lectura y escritura"
                })
                break;
            case 3:
                setPermissionGrade({
                    color: "warning",
                    text: "Control Total"
                })
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        changePermissionGrade(module.permission_grade)
    }, [module.permission_grade])

    return (
        <Col md="6" className="py-3">
            <InputGroup>
                <Input value={module.module_name} disabled />
                <InputGroupButtonDropdown addonType="append" isOpen={isDropdownOpen} toggle={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <DropdownToggle color={permissionGrade.color} caret>
                        {permissionGrade.text}
                    </DropdownToggle>
                    <DropdownMenu >
                        <DropdownItem
                            style={{ cursor: "pointer" }}
                            onClick={e => {
                                e.preventDefault()
                                changePermission(0, clientId, module)
                            }}
                        >Deshabilitar</DropdownItem>
                        <DropdownItem
                            style={{ cursor: "pointer" }}
                            onClick={e => {
                                e.preventDefault()
                                changePermission(1, clientId, module)
                            }}
                        >Sólo lectura</DropdownItem>
                        <DropdownItem
                            style={{ cursor: "pointer" }}
                            onClick={e => {
                                e.preventDefault()
                                changePermission(2, clientId, module)
                            }}
                        >Lectura y edición</DropdownItem>
                        <DropdownItem
                            style={{ cursor: "pointer" }}
                            onClick={e => {
                                e.preventDefault()
                                changePermission(3, clientId, module)
                            }}
                        >Control total</DropdownItem>
                    </DropdownMenu>
                </InputGroupButtonDropdown>
            </InputGroup>
        </Col>
    )
}
export default ModuleItem