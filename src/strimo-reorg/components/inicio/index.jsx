import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import strimoLogo from "../../images/strimo logo.png";
import strimo1 from "../../images/strimo1.png";
import strimo2 from "../../images/strimo2.png";
import strimo3 from "../../images/strimo3.png";
import strimo4 from "../../images/strimo4.png";
import strimo5 from "../../images/strimo5.png";
import strimo6 from "../../images/strimo6.png";
import strimo7 from "../../images/strimo7.png";
import backgorundFinance from "../../images/backgorundFinance.png";
import TechPilars from "../../images/backgroundImagen.png";
import WavesDark from "../waves/wavesDark";
import PopUp from "../popup";
import CountDown from "../countdown-preventa";
import "../../styles/inicio.css";
const FadeInSection = ({ children }) => {
  const domRef = useRef();

  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // In your case there's only one element to observe:
      if (entries[0].isIntersecting) {
        // Not possible to set it back to false like this:
        setVisible(true);
        // No need to keep observing:
        return observer.unobserve(domRef.current);
      }
    });

    observer.observe(domRef.current);

    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div ref={domRef} className={isVisible ? " fade-in" : "fade"}>
      {children}
    </div>
  );
};
const FadeInRoadmap = ({ children }) => {
  const domRef = useRef();

  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // In your case there's only one element to observe:
      if (entries[0].isIntersecting) {
        // Not possible to set it back to false like this:
        setVisible(true);

        // No need to keep observing:
        observer.unobserve(domRef.current);
      }
    });

    observer.observe(domRef.current);

    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <li
      ref={domRef}
      className={isVisible ? " roadmap-fade-in" : "roadmap-fade"}
    >
      {children}
    </li>
  );
};
function Index() {
  let location = useLocation();
  const [popUp, setPopUp] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setPopUp(true);
    }, 5000);
    return timer;
  }, []);
  return (
    <>
      {popUp && <PopUp tipo="landing" />}
      <div>
        <div className="jumbotron-landing-page">
          <FadeInSection>
            <img src={strimoLogo} style={{ maxWidth: "90vw" }} />
          </FadeInSection>
          <div className="bubbles-background"></div>
        </div>
        <div className="title-text section-inicio">
          <h1 className="font-title section-title text-center">
            <b>STRIMO</b>
          </h1>
          <div className="section-inicio-info">
            <p>
              It is a Web-Based and Mobile platform for{" "}
              <b>live entertainment</b>, it also has an <b>NFT Gallery</b> for
              all artists who want to exhibit their art. This platform allows
              the monetization of its content and access through its own token{" "}
              <b>"STRIMO TOKEN (ERC-20)"</b> and{" "}
              <b>"STRIMO GALLERY (ERC-721)"</b>, maintaining the security and
              trust of <b>BLOCKCHAIN ​​TECHNOLOGY</b>.
            </p>
          </div>
        </div>
        <WavesDark>
          <FadeInSection>
            <div className="section-inicio">
              <h1 className="font-title blanco">TOKEN</h1>
              <div className="section-inicio-info">
                <div className="blanco">
                  <p>
                    STRIMO TOKEN is designed as an incentive for hodlers and
                    traders. Which will be listed in the Exchange, and will be
                    used as a savings method.
                  </p>
                  <p>
                    The STRIMO ERC-20 TOKEN has its correlative in BINANCE SMART
                    CHAIN ​​(BSC), and has a BRIDGE between BLOCKCHAIN
                    ​​ETHEREUM and the BINANCE CHAIN.
                  </p>
                </div>
                <div className=" token-info-image floating">
                  <img src={backgorundFinance} alt="" />
                </div>
              </div>
            </div>
          </FadeInSection>
          <h1 className="font-title section-title text-center blanco">
            About <b>STRIMO:</b>
          </h1>
          <div className="grid blanco">
            <FadeInSection>
              <div className="wave-item">
                <img src={strimo1} alt="" width="50%" />
                <p className="wave-list-text">
                  The <b>STRIMO</b> platform offers possibilities to new
                  talents, who want to boost their content.
                </p>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div className="wave-item">
                <img src={strimo2} alt="" width="50%" />
                <p className="wave-list-text">
                  When uploading the content is more flexible, you only have to
                  comply with the rules, use policies and the right of
                  reproduction.
                </p>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div className="wave-item">
                <img src={strimo3} alt="" width="50%" />
                <p className="wave-list-text">
                  We monetize all the content found on the platform.
                </p>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div className="wave-item">
                <img src={strimo4} alt="" width="50%" />
                <p className="wave-list-text">
                  The access must be democratized; Anyone can contribute to{" "}
                  <b>STRIMO</b>, following the rules of the protocol, and all
                  information is publicly accessible.
                </p>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div className="wave-item">
                <img src={strimo5} alt="" width="50%" />
                <p className="wave-list-text">
                  We emphasize the direct relationship between the artist who
                  created the content and their fans.
                </p>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div className="wave-item">
                <img src={strimo6} alt="" width="50%" />
                <p className="wave-list-text">
                  Governance power must be earned by creating value in{" "}
                  <b>STRIMO</b> and have that content consistently shared among
                  user groups that contribute to the protocol.
                </p>
              </div>
            </FadeInSection>
            <div></div>
            <FadeInSection>
              <div className="wave-item">
                <img src={strimo7} alt="" width="50%" />
                <p className="wave-list-text">
                  Prices and earnings for participants must be consistent,
                  predictable and transparent.
                </p>
              </div>
            </FadeInSection>
          </div>
        </WavesDark>
      </div>
      <FadeInSection>
        <div className="section-inicio">
          <h1 className="font-title">
            Our Support to <b>Artists</b>
          </h1>
          <div className="section-inicio-info">
            <h5>
              <b>STRIMO NFT</b>, will provide during the launch period,
              sponsorship to the first three NFTs of each artist that registers
              in the system. <b>STRIMO NFT</b> will be dedicated to supporting
              Latin American talent that enhances our identity. In addition, it
              allows the artist to live a direct experience through question and
              answer rooms.
            </h5>

            <div className="section-inicio-image">
              <img src={TechPilars} className="floating" alt="" />
            </div>
          </div>
        </div>
      </FadeInSection>
      <div className="container-roadmap">
        <div className="roadmap blanco">
          <ul>
            <FadeInRoadmap>
              <div className="roadmap-content">
                <h1>2021</h1>
                <hr className="hr-roadmap" />
                <p>
                  Architecture and layout of the <b>STRIMO</b> idea with{" "}
                  <b>NFT</b>, based on the post-pandemic need for home
                  entertainment.
                </p>
              </div>
            </FadeInRoadmap>
            <FadeInRoadmap>
              <div className="roadmap-content">
                <h1>3Q 2021</h1>
                <hr className="hr-roadmap" />
                <p>
                  Development of the visual proposal and user experience of{" "}
                  <b>STRIMO</b> Web application.
                </p>
                <p>
                  Architecture of the functionality of user interaction with the
                  platform.
                </p>
                <p>
                  Architecture and development of microservices for requesting
                  live broadcasts and prepaid services.
                </p>
              </div>
            </FadeInRoadmap>
            <FadeInRoadmap>
              <div className="roadmap-content">
                <h1>4Q 2021</h1>
                <hr className="hr-roadmap" />
                <p>
                  Development of the <b>NFT</b> Marketplace and interaction with
                  the user.
                </p>
                <p>
                  Creation of social media accounts for the visualization of{" "}
                  <b>STRIMO PLATFORM</b> with its respective <b>NFT</b>{" "}
                  Marketplace.
                </p>
                <p>
                  Proof of concept of the Token Bridge between the Ethereum{" "}
                  <b>BLOCKCHAIN</b> ​​and the Binance Smart Chain (BSC).
                </p>
                <p>
                  Engagement with Latin American artists for release concerts
                  and approaches with digital and 3D artists.
                </p>
              </div>
            </FadeInRoadmap>
            <FadeInRoadmap>
              <div className="roadmap-content">
                <h1>1Q 2022</h1>
                <hr className="hr-roadmap" />
                <p>
                  Profile creation, lobby redesign, video status creation,
                  displayer redesign.
                </p>
                <p>Redesign of the White Paper.</p>
                <p>
                  Creation of algorithm for downloading pre-recorded content.
                </p>
                <p>
                  Development of a security layer with respect to STREAMING
                  content.
                </p>
                <p>
                  Creación de arquitectura del ecosistema para el Marketplace de{" "}
                  <b>NFT STRIMO</b>.
                </p>
                <p>
                  <b>STRIMO TOKEN</b> launch page published.
                </p>
              </div>
            </FadeInRoadmap>
            <FadeInRoadmap>
              <div className="roadmap-content">
                <h1>2Q 2022</h1>
                <hr className="hr-roadmap" />
                <p>Creation of chat for the fandom of the artists.</p>
                <p>Redesign of the White Paper.</p>
                <p>Inclusion of STRIMO social network functions.</p>
                <p>
                  <b>STRIMO STREAMING</b> and <b>STRIMO NFT</b> engineering to
                  add security and performer.
                </p>
                <p>Improvement of mobile user experience.</p>
                <p>
                  Migration of the <b>STRIMO</b> application and the financial{" "}
                  <b>STRIMO</b> application.
                </p>
              </div>
            </FadeInRoadmap>
            <FadeInRoadmap>
              <div className="roadmap-content">
                <h1>3Q 2022</h1>
                <hr className="hr-roadmap" />
                <p>
                  <b>STRIMO</b> team expansion.
                </p>
                <p>First live concert.</p>
                <p>
                  Opening of the <b>NFT Marketplace</b>.
                </p>
                <p>Security optimization and performance.</p>
                <p>Creación de aplicación Móvil.</p>
                <p>Mobile application creation.</p>
                <p>
                  Creation of <b>STRIMO FINANCE</b> that allows the user to{" "}
                  <b>SWAP</b> the <b>STRIMO</b> Token in Binance Smart Chain.
                </p>
                <p>
                  Launch of <b>STRIMO</b>
                </p>
              </div>
            </FadeInRoadmap>
            <FadeInRoadmap>
              <div className="roadmap-content">
                <h1>4Q 2022</h1>
                <hr className="hr-roadmap" />
                <p>
                  In the <b>NFT Markeplace</b> the user can swap between{" "}
                  <b>NFT</b>. In addition, the auction option will be opened for
                  general users and artists.
                </p>
                <p>
                  Architecture and development of the <b>STRIMO GAMES</b> and{" "}
                  <b>STRIMO GAMBLE</b> module.
                </p>
              </div>
            </FadeInRoadmap>
          </ul>
        </div>
      </div>
      <div className="newsteller section-inicio" id="newsteller">
        <h1 className="font-title">Newsteller</h1>
        <div className="row d-flex justify-content-center align-items-center">
          {/* <div className="col-md-6"></div> */}
          <div className="col-md-6 form my-5">
            <h1>Subscribe to our Newsteller!</h1>
            <form>
              <div className="form-element">
                <label htmlFor="name">Email: </label>
                <input
                  className="login"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Email"
                />
              </div>
              <div className="form-element">
                <label htmlFor="passowrd">Name: </label>
                <input
                  className="login"
                  type="text"
                  id="nombre"
                  placeholder="Name"
                />
              </div>
              <button
                style={{ width: "50%" }}
                // disable={}
                type="Submit"
                className="primario margenes-boton"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>Developed by Improtecnologia</p>
      </div>
    </>
  );
}

export default Index;
