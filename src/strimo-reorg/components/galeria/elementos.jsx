import React, { useState } from "react";
import PopUp from "../popup";
function Elementos() {
  const [dataPopUp, setDataPopUp] = useState();
  const data = [
    { id: 1, img: "https://random.imagecdn.app/400/400" },
    { id: 4, img: "https://random.imagecdn.app/401/400" },
    { id: 3, img: "https://random.imagecdn.app/400/401" },
    { id: 4, img: "https://random.imagecdn.app/401/401" },
  ];
  const popUp = (data) => {
    setDataPopUp(data);
  };
  return (
    <>
      {dataPopUp && <PopUp data={dataPopUp} tipo="nft" />}
      <div className="container">
        <h1 className="blanco">Más Populares</h1>
        <div className="row">
          {data.map((doc) => {
            return (
              <div key={doc.id} className="col-md-4 col-sm-6 my-2 ">
                <div
                  className="col-12 caja-blanca-2 nft fondo-blanco hoover-nft d-flex flex-column justify-content-center align-items-center"
                  onClick={() => popUp(doc)}
                >
                  <img src={doc.img} alt="" width="200px" />
                  <div className="d-flex w-100 mt-3">
                    <div className="justify-content-start w-100 text-left">
                      <small>user-name</small>
                      <p className="mb-1">Picture Name</p>
                    </div>
                    <div className="justify-content-end w-100 text-right">
                      <h5 className="m-0">Price</h5>
                      <h2>4.25</h2>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Elementos;
