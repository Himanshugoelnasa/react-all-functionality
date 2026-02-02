import Navbar from "./Nav-bar";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

const Layout = () => {
  return (
    <>
      <Navbar />

      {/* Child routes render HERE */}
      <Container fluid className="p-4">
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
