import API_ROUTES from '../../../../api/routes';
import ActionsBackend from 'context/actionsBackend';
import AlertsContext from 'context/alerts';
import React, { useContext } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import swal from 'sweetalert';

const CertificateRow = ({
    id,
    certificate,
    first,
    page,
    setCertificateInfo,
    setIsOpenClientForm,
    setPage,
    refreshToggle
}) => {

    const { newAlert, newActivity } = useContext(AlertsContext)
    const { axiosDelete, loadingActions } = useContext(ActionsBackend)

    const deleteUser = async (e, id, certificateInfo, first, page) => {
        e.preventDefault()
        swal({
            title: "Eliminar el certificado " + certificateInfo + "!",
            text: "¿Está seguro de eliminar a este certificado? Esta desición es permanente.",
            icon: "warning",
            buttons: {
                cancel: "No",
                Si: true
            },
            dangerMode: true,
        })
            .then(async (willDelete) => {
                let backPage = false
                if (willDelete) {
                    const response = await axiosDelete(API_ROUTES.clientsDir.clients, id)
                    if (!response.error) {
                        if (first) {
                            if (page > 1) {
                                backPage = true
                            }
                        }
                        newActivity(`Se ha eliminado el certificado ${certificateInfo})`)
                        newAlert("success", "Certificado eliminado con éxito!", "")
                        if (backPage) {
                            setPage(parseInt(page - 1))
                        } else {
                            refreshToggle()
                        }
                    } else {
                        newAlert("danger", "Hubo un error!", "Intentelo nuevamente. Error: " + response.errorMsg)
                    }
                }
            });
    }

    const details = (e, client) => {
        e.preventDefault()
        setCertificateInfo(client)
        setIsOpenClientForm(true)
    }

    return (
        <tr key={id} className={loadingActions ? "shimmer" : ""} >
            <td style={{ textAlign: "center" }}>
                {certificate.business_name}
            </td>
            <td style={{ textAlign: "center" }}>
                {certificate.document_number}
            </td>
            <td>

            </td>
            <td className="text-right">
                <UncontrolledDropdown>
                    <DropdownToggle
                        className="btn-icon-only text-light"
                        href="#pablo"
                        role="button"
                        size="sm"
                        color=""
                        onClick={e => e.preventDefault()}
                    >
                        <i className="fas fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                        <DropdownItem
                            href="#pablo"
                            onClick={e => details(e, certificate)}
                        >
                            <i className="fas fa-edit"></i>
                            Editar
                        </DropdownItem>
                        <DropdownItem
                            href="#pablo"
                            onClick={e => deleteUser(e, certificate.id, certificate.business_name + " CUIT: " + certificate.document_number, first, page)}
                        >
                            <i className="fas fa-trash-alt"></i>
                            Eliminar
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </td>
        </tr>
    )
}

export default CertificateRow