import React from "react";
import "./service.css";

const Services = () => {
  const services = [
    {
      title: "Content Creation",
      description:
        "We create website content here. If you want us to create for you as well, please contact us.",
      icon: "✉️",
    },
    {
      title: "Advertising",
      description:
        "We do website advertising here. If you also want to advertise, please contact us.",
      icon: "✉️",
    },
    {
      title: "Branding",
      description:
        "We do website branding here. If you also need branding, please contact us.",
      icon: "✉️",
    },
    {
      title: "Marketing Development",
      description:
        "We do website Marketing Development here. If you also need Marketing Development, please contact us.",
      icon: "✉️",
    },
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Our Services</h2>
      <div className="row">
        {services.map((service, index) => (
          <div className="col-lg-3 col-md-6 mb-4" key={index}>
            <div className="card h-100 border-0 shadow-sm text-center p-3 card__container">
              <h5 className="card-title mb-3 card__title">
                {service.title}{" "}
                <span className="text-muted">{service.icon}</span>
              </h5>
              <p className="card-text text-muted card__text">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
