import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Dropdown,
  Menu,
  Icon,
  Image,
  Label,
  Accordion,
  Button,
} from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { map } from "lodash";
import { ModalBasic } from "../../Common/ModalBasic";
import "./Navbar.scss";
//Navbars
import { TopMenu } from "./TopMenuu";
import SideMenu from "./SideMenu";
import { useAuth } from "../../../hooks/useAuth";
import { useEquips } from "../../../hooks/useEquips";
import { EditProfileUser } from "../Users/EditProfileUser";
import { useUser } from "../../../hooks/useUser";
import { getProductsCart } from "../../../api/cart";
import { BASE_API } from "../../../utils/constants";
import { SignSociForm } from "../SignSociForm/SignSociForm";

export function Navbar(props) {
  const [activeItem, setactiveItem] = useState("home");
  const [activeIndex, setactiveIndex] = useState(-1);
  const handleItemClick = (e, { name }) => {
    setactiveItem(name);
  };
  const { ModalLogin, ModalRegister } = props;
  const [refresh, setRefresh] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [titlewModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const { auth, logout } = useAuth();
  const { getEquipsClient, equipsClient } = useEquips();
  const { checkPermis } = useUser();

  const navigate = useNavigate();


  let nProdcutsCart = getProductsCart().length;

  useEffect(() => {
    getEquipsClient();
  }, [refresh]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseAlert = () => setShowAlert((prev) => !prev);
  const onRefesh = () => setRefresh((prev) => !prev);

  const onEditProfileUser = () => {
    setTitleModal("Editar Perfil");
    setContentModal(
      <EditProfileUser
        user={auth.me}
        onClose={openCloseModal}
        onRefesh={onRefesh}
      />
    );
    openCloseModal();
  };

  const onSoci = () => {
    setTitleModal("Fes-te soci");
    setContentModal(<SignSociForm user={auth.me} onClose={openCloseModal} />);
    openCloseModal();
  };

  const renderName = () => {
    if (auth.me?.first_name) {
      return `${auth.me.first_name}`;
    }

    return auth.me?.email;
  };

  const renderNavbar = () => {
    return (
      <>
        <div className="position-logo" >
          <Image src="https://i.postimg.cc/BvGvnW6J/SRCtr.png" centered link onClick={() => navigate(`/`)} />
        </div>
        <div className="background-image">
          <Image
            src="https://i.ibb.co/0jK4T5x/banner-Saba-Final.png"
            centered
          />
        </div>
      </>
    );
  };

  const renderLinks = () => {
    return (
      <>
        <Menu.Item
          position="left"
          style={{ height: "58px" }}
        >
          <a
            href="https://www.instagram.com/sabadellrc/"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="instagram" link size="large" />
          </a>
          <a
            href="https://www.facebook.com/sabadellrc/"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="facebook" link size="large" />
          </a>
          <a
            href="https://twitter.com/SabadellRC"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="twitter" link size="large" />
          </a>
          <a
            href="https://www.youtube.com/@sabadellrc"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="youtube" link size="large" />
          </a>
        </Menu.Item>

        <Dropdown
          text="EL CLUB"
          name="elClub"
          active={activeItem === "elClub"}
          onClick={handleItemClick}
          className="link item"
          simple
        >
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to={"/historia"}>
              Història
            </Dropdown.Item>
            <Dropdown.Item as={Link} to={"/organigrama"}>
              Organigrama
            </Dropdown.Item>
            <Dropdown.Item as={Link} to={"/soci"}>
              Fes-te soci
            </Dropdown.Item>
            <Dropdown.Item as={Link} to={"/patrocinadors"}>
              Patrocinadors
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown
          text="EQUIPS"
          name="equips"
          active={activeItem === "equips"}
          onClick={handleItemClick}
          className="link item"
          simple
        >
          <Dropdown.Menu>
            {map(equipsClient, (equip) => (
              <Dropdown.Item as={Link} to={`/equips/${equip.id}`}>
                {equip.nom}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Item
          name="noticies"
          active={activeItem === "noticies"}
          onClick={handleItemClick}
          as={Link}
          to={"/noticies"}
        >
          NOTÍCIES
        </Menu.Item>

        <Menu.Item
          name="partits"
          active={activeItem === "partits"}
          onClick={handleItemClick}
          as={Link}
          to={"/partits"}
        >
          PARTITS
        </Menu.Item>

        <Menu.Item
          name="botiga"
          active={activeItem === "botiga"}
          onClick={handleItemClick}
          as={Link}
          to={"/botiga"}
        >
          BOTIGA
        </Menu.Item>

        <Menu.Item
          name="contacte"
          active={activeItem === "contacte"}
          onClick={handleItemClick}
          as={Link}
          to={"/contacte"}
        >
          CONTACTE
        </Menu.Item>
        {auth && checkPermis("isStaff") && (
          <Menu.Item
            name="panell"
            active={activeItem === "panell"}
            onClick={handleItemClick}
            as={Link}
            to={"/admin"}
          >
            PANELL
          </Menu.Item>
        )}

        <Menu.Item
          position="right"
          name="cistella"
          active={activeItem === "cistella"}
          onClick={handleItemClick}
          as={Link}
          to={"/cistella"}
        >
          <Icon name="shopping cart" />
          {nProdcutsCart > 0 && (
            <Label circular color="red" floating size="tiny">
              {nProdcutsCart}
            </Label>
          )}
        </Menu.Item>
        {!auth?.me?.is_soci && (
          <Menu.Item onClick={auth?.me ? onSoci : ModalLogin}>
            Fes-te soci
          </Menu.Item>
        )}
        {auth ? (
          <>
            { }
            <Menu.Item
              className="imatge-perfil-item"
              onClick={onEditProfileUser}
            >
              <Image
                src={
                  auth.me.path_photo
                    ? auth.me.path_photo
                    : `${BASE_API}/uploads/User/avatar.png`
                }
              />
              Hola, {renderName()}
            </Menu.Item>
            <Menu.Item onClick={logout}>
              <Icon name="sign-out" />
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item style={{paddingRight: "0"}}>
              <Button color="green" onClick={ModalLogin}>Iniciar sessió</Button>
            </Menu.Item>
            <Menu.Item style={{paddingLeft: "0"}}>
              <Button color="orange" onClick={ModalRegister}>Registra't</Button>
            </Menu.Item>
          </>
        )}
        <ModalBasic
          show={showModal}
          title={titlewModal}
          children={contentModal}
          onClose={openCloseModal}
          size={"tiny"}
        />
      </>
    );
  };

  function handleAccordionClick(_, titleProps) {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setactiveIndex(newIndex);
  }

  const renderSideLinks = () => {
    return (
      <>
        <Menu.Item
          active={activeItem === ""}
          onClick={handleItemClick}
          as={Link}
          to={"/"}
          position="left"
        >
          <img
            src="https://i.postimg.cc/BvGvnW6J/SRCtr.png"
            width="35px"
            height="35px"
            style={{ margin: "0 auto" }}
            alt=""
          />
        </Menu.Item>

        <Accordion as={Menu} style={{ fontSize: "17px" }} vertical inverted>
          <Menu.Item
            name="elClub"
            active={activeItem === "elClub"}
            style={{ borderBottom: "1px solid #2d2e2f", }}
          >
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={handleAccordionClick}
              style={{ paddingLeft: "12px", margin: "5px 0" }}
            >
              <Icon name="dropdown" />
              EL CLUB
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={"/historia"}
                  name="historia"
                  active={activeItem === "historia"}
                  onClick={handleItemClick}
                >
                  Història
                </Dropdown.Item>
                <Dropdown.Item
                  as={Link}
                  to={"/organigrama"}
                  name="organigrama"
                  active={activeItem === "organigrama"}
                  onClick={handleItemClick}
                >
                  Organigrama
                </Dropdown.Item>
                <Dropdown.Item
                  as={Link}
                  to={"/soci"}
                  name="soci"
                  active={activeItem === "soci"}
                  onClick={handleItemClick}
                >
                  Fes-te soci
                </Dropdown.Item>
                <Dropdown.Item
                  as={Link}
                  to={"/patrocinadors"}
                  name="patrocinadors"
                  active={activeItem === "patrocinadors"}
                  onClick={handleItemClick}
                >
                  Patrocinadors
                </Dropdown.Item>
              </Dropdown.Menu>
            </Accordion.Content>
          </Menu.Item>

          <Menu.Item
            style={{
              borderBottom: "1px solid #2d2e2f",
            }}
          >
            <Accordion.Title
              active={activeIndex === 1}
              index={1}
              onClick={handleAccordionClick}
              style={{ paddingLeft: "16px", margin: "5px 0" }}
            >
              <Icon name="dropdown" />
              EQUIPS
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              <Dropdown.Menu>
                {map(equipsClient, (equip) => (
                  <Dropdown.Item
                    as={Link}
                    to={`/equips/${equip.id}`}
                    name={equip.nom}
                    active={activeItem === equip.nom}
                    onClick={handleItemClick}
                  >
                    {equip.nom}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Accordion.Content>
          </Menu.Item>
        </Accordion>

        <Menu.Item
          name="noticies"
          active={activeItem === "noticies"}
          onClick={handleItemClick}
          as={Link}
          to={"/noticies"}
        >
          NOTÍCIES
        </Menu.Item>

        <Menu.Item
          name="partits"
          active={activeItem === "partits"}
          onClick={handleItemClick}
          as={Link}
          to={"/partits"}
        >
          PARTITS
        </Menu.Item>

        <Menu.Item
          name="botiga"
          active={activeItem === "botiga"}
          onClick={handleItemClick}
          as={Link}
          to={"/botiga"}
        >
          BOTIGA
        </Menu.Item>

        <Menu.Item
          name="contacte"
          active={activeItem === "contacte"}
          onClick={handleItemClick}
          as={Link}
          to={"/contacte"}
        >
          CONTACTE
        </Menu.Item>
        {auth && checkPermis("isStaff") && (
          <Menu.Item
            name="panell"
            active={activeItem === "panell"}
            onClick={handleItemClick}
            as={Link}
            to={"/admin"}
          >
            PANELL
          </Menu.Item>
        )}

        <Menu.Item
          position="right"
          name="cistella"
          active={activeItem === "cistella"}
          onClick={handleItemClick}
          as={Link}
          to={"/cistella"}
        >
          <Icon name="shopping cart" />
          {nProdcutsCart > 0 && (
            <Label circular color="red" floating size="tiny">
              {nProdcutsCart}
            </Label>
          )}
        </Menu.Item>
        {!auth?.me?.is_soci && (
          <Menu.Item onClick={auth?.me ? onSoci : ModalLogin}>
            Fes-te soci
          </Menu.Item>
        )}
        {auth ? (
          <>
            { }
            <Menu.Item
              className="imatge-perfil-item"
              onClick={onEditProfileUser}
            >
              <Image
                src={
                  auth.me.path_photo
                    ? auth.me.path_photo
                    : `${BASE_API}/uploads/User/avatar.png`
                }
                centered
              />
              <br />
              Hola, {renderName()}
            </Menu.Item>
            <Menu.Item onClick={logout}>
              <Icon name="sign-out" />
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item
              name="login"
              active={activeItem === "login"}
              onClick={ModalLogin}
            />
            <Menu.Item
              name="sign_in"
              active={activeItem === "sign_in"}
              onClick={ModalRegister}
            />
          </>
        )}
        <ModalBasic
          show={showModal}
          title={titlewModal}
          children={contentModal}
          onClose={openCloseModal}
          size={"tiny"}
        />
      </>
    );
  };

  const none = useMediaQuery({ query: "(max-width:576px)" });
  const sm = useMediaQuery({ query: "(min-width:576px)" });
  const md = useMediaQuery({ query: "(min-width:768px)" });
  const lg = useMediaQuery({ query: "(min-width:992px)" });
  const xl = useMediaQuery({ query: "(min-width:1200px)" });
  const xxl = useMediaQuery({ query: "(min-width:1400px)" });
  const size = { none, sm, md, lg, xl, xxl };

  return (
    <div>
      {size.lg ? (
        <TopMenu renderLinks={renderLinks} renderNavbar={renderNavbar} />
      ) : (
        <SideMenu renderLinks={renderSideLinks} renderNavbar={renderNavbar} />
      )}
    </div>
  );
}
