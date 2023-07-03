import index from "views/admin/dashboard"
import userAdmin from 'views/admin/userAdmin'
import clients from 'views/admin/clients'
import certificates from 'views/admin/certificates';

var routes = [
  {
    path: "/index",
    name: "Inicio",
    icon: "ni ni-tv-2 text-blue",
    component: index,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 0
  }, {
    path: "/clients",
    name: "Clientes",
    icon: "ni ni-briefcase-24 text-red",
    component: clients,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 2
  }, {
    path: "/user-admin",
    name: "Usuarios",
    icon: "ni ni-single-02 text-blue",
    component: userAdmin,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 1
  },
  {
    path: "/certificates",
    name: "Certificados Digitales",
    icon: "ni ni-key-25 text-green",
    component: certificates,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 3
  }
];
export default routes;
