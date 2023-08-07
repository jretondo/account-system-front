import React, { useContext, useEffect, useState } from "react";
import Header from "components/Headers/Header.js";
import secureContext from 'context/secureRoutes';
import apiRoutes from "../../../api/routes";
import { Container } from "reactstrap";
import ClientSelectionCard from "../../../components/Cards/ClientSelection";


const PurchasesLayout = ({ children, activeClient, setActiveClient }) => {
    const moduleId = 4
    const { setUrlRoute } = useContext(secureContext)

    useEffect(() => {
        setUrlRoute(apiRoutes.routesDir.sub.dashboard)
    }, [setUrlRoute])



    return (
        <>
            <Header />
            <Container className="mt--9" fluid>
                <ClientSelectionCard
                    activeClient={activeClient}
                    setActiveClient={setActiveClient}
                    moduleId={moduleId}
                />
                {children}
            </Container>
        </>
    )
}

export default PurchasesLayout;
