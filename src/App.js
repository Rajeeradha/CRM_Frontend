import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateUsers from "./Components/Users/CreateUsers";
import ListUsers from "./Components/Users/ListUsers";
import UpdateUsers from "./Components/Users/UpdateUsers";
import Signin from "./Components/Auth/Signin";
import Home from "./Components/Dashboard/Home";
import CreateLeads from "./Components/Leads/CreateLeads";
import ListLeads from "./Components/Leads/ListLeads";
import UpdateLead from "./Components/Leads/UpdateLead";
import CreateServiceRequest from "./Components/ServiceRequest/CreateServiceRequest";
import ListServiceRequest from "./Components/ServiceRequest/ListServiceRequest";
import UpdateServiceRequest from "./Components/ServiceRequest/UpdateServiceRequest";
import CreateContacts from "./Components/Contacts/CreateContacts";
import ListContacts from "./Components/Contacts/ListContacts";
import UpdateContacts from "./Components/Contacts/UpdateContacts";
import ForgotPassword from "./Components/Auth/ForgotPassword";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Signin />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/users" element={<ListUsers />} />
          <Route exact path="/create-users" element={<CreateUsers />} />
          <Route exact path="users/:id/update-users" element={<UpdateUsers />} />
          <Route exact path="/leads" element={<ListLeads />} />
          <Route exact path="/create-leads" element={<CreateLeads />} />
          <Route exact path="leads/:id/update-leads" element={<UpdateLead />} />
          <Route exact path="/serviceRequest" element={<ListServiceRequest />} />
          <Route exact path="/create-serviceRequest"element={<CreateServiceRequest />} />
          <Route exact path="serviceRequest/:id/update-serviceRequest" element={<UpdateServiceRequest />} />
          <Route exact path="/contacts" element={<ListContacts />} />
          <Route exact path="/create-contacts" element={<CreateContacts />} />
          <Route exact path="contacts/:id/update-contacts" element={<UpdateContacts />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
