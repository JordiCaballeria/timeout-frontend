import React from "react";

export function NoticiaEmailTemplate({ subject, message }) {
  return (
    <>
      <div
        style={{
          width: "95%",
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src="https://i.ibb.co/txDG7YR/banner-1.png"
            alt="src banner"
            style={{
              width: "100%",
              maxWidth: "500px",
              margin: "0 auto",
              display: "block",
            }}
          />
        </div>
        <br />
        <h1 style={{ paddingLeft: "15px" }}>{subject}</h1>
        <h1 style={{ paddingLeft: "15px" }}>{"Noticiaaaaaaaaaaaaa"}</h1>
        <div
          style={{
            backgroundColor: "#f0f0f0",
            margin: "10px 5px",
            borderRadius: "10px",
            padding: "5px 20px 20px",
          }}
        >
          <div
            style={{ fontSize: "16px", color: "#000000" }}
            dangerouslySetInnerHTML={{
              __html: message,
            }}
          />
          <br />
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="https://i.postimg.cc/BvGvnW6J/SRCtr.png"
              alt="Company Logo"
              style={{ width: "50px", height: "50px", marginRight: "10px" }}
            />
            <div>
              <p style={{ margin: "0" }}>Sabadell Rugby Club</p>
              <p style={{ margin: "0" }}>
                Carrer de Rialb, 11, 08207 Sabadell, Barcelona
              </p>
              <p style={{ margin: "0" }}>Telèfon: 661 01 48 37</p>
              <p style={{ margin: "0" }}>
                Correu:{" "}
                <a href="mailto:sabrugbyclub@gmail.com">
                  sabrugbyclub@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
