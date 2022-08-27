import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import SubHeader from "./subHeader";
import Footer from "./footer";

const AdminTheme = (props) => {
  return (
    <>
      <section>
        <div className="row sidepadding">
          {/* sidebar */}
          <div className="col-lg-1">
            <Sidebar />
          </div>
          {/* main part */}
          <div className="col-lg-11 col-md-12 col-sm-12">
            <Header />
            <div className="wrapper">
              <SubHeader props={props.header} />
              {props.children}
            </div>
            <Footer />
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminTheme;
