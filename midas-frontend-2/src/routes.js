/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Timeline from './views/Timeline';
import Profile from './views/examples/Profile.js';
import Maps from './views/examples/Maps.js';
import Register from './views/examples/Register.js';
import Login from './views/examples/Login.js';
import Repository from './views/examples/Repository';
import Icons from './views/examples/Icons.js';
import Cases from "./views/Cases.js";
import ClaimFileUpload from './components/FileUpload/ClaimFileUpload.component.jsx';
import ClaimFileDownload from './components/FileDownload/ClaimFileDownload.component.jsx';
import ShareDocument from './components/ShareDocuments/ShareDocument.component';

var routes = [
  {
    path: "/cases",
    name: "Cases",
    icon: "ni ni-folder-17",
    component: Cases,
    layout: "/home",
  },
  {
    path: '/timeline',
    name: 'Timeline',
    icon: 'ni ni-tv-2 text-primary',
    component: Timeline,
    layout: '/admin',
  },
  {
    path: '/repository',
    name: 'Documents Repository',
    icon: 'ni ni-bullet-list-67 text-red',
    component: Repository,
    layout: '/admin',
  },
  // {
  //   path: '/icons',
  //   name: 'Share Documents',
  //   icon: 'ni ni-send text-blue',
  //   component: Icons,
  //   layout: '/admin',
  // },
  {
    path: '/share-document',
    name: 'Share Documents',
    icon: 'ni ni-send text-blue',
    component: ShareDocument,
    layout: '/admin',
  },
  // {
  //   path: '/maps',
  //   name: 'Maps',
  //   icon: 'ni ni-pin-3 text-orange',
  //   component: Maps,
  //   layout: '/admin',
  // },
  // {
  //   path: '/user-profile',
  //   name: 'Shared Documents',
  //   icon: 'ni ni-single-02 text-yellow',
  //   component: Profile,
  //   layout: '/admin',
  // },
  {
    path: '/login',
    component: Login,
    layout: '/auth',
  },
  {
    path: "/login/:method/:caseId",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/upload",
    component: ClaimFileUpload,
    layout: "/claim",
  },
  {
    path: "/download",
    component: ClaimFileDownload,
    layout: "/claim",
  },
];
export default routes;
