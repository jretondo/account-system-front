const PROJECT = ""
const LOCAL_PORT = "3020"
const API_PRODUCTION_ADDRESS = "https://api-prod.nekoadmin.com.ar"
let host = ""
let publicFiles = ""

if (process.env.NODE_ENV === "development") {
    host = `http://localhost:${LOCAL_PORT}/api`
    publicFiles = `http://localhost:${LOCAL_PORT}/static`
} else {
    host = `${API_PRODUCTION_ADDRESS}/${PROJECT}/api`
    publicFiles = `${API_PRODUCTION_ADDRESS}/${PROJECT}/static`
}

const auth = host + "/auth"
const routes = host + "/routes"
const permissions = host + "/permissions"
const users = host + "/user"
const activity = host + "/activity"
const clients = host + "/clients"
const certificates = host + "/certificates"

const authDir = {
    auth
}

const activityDir = {
    activity
}

const permissionsDir = {
    permissions,
    sub: {
        list: "/list"
    }
}

const usersDir = {
    users,
    sub: {
        details: users + "/details",
        mydata: users + "/mydata",
        permissions: users + "/permissions",
        clients: users + "/clients"
    }
}

const clientsDir = {
    clients,
    sub: {
        dataTax: clients + "/dataTax",
        dataTaxProof: clients + "/dataTaxProof"
    }
}

const certificatesDir = {
    certificates,
    sub: {
        csr: certificates + "/csr",
        crtKey: certificates + "/crt-key"
    }
}

const routesDir = {
    routes,
    sub: {
        dashboard: routes + "/dashboard",
        userAdmin: routes + "/userAdmin",
        clients: routes + "/clients",
        certificates: routes + "/certificates"
    }
}

const API_ROUTES = {
    publicFiles,
    authDir,
    routesDir,
    permissionsDir,
    usersDir,
    activityDir,
    clientsDir,
    certificatesDir
}

export default API_ROUTES