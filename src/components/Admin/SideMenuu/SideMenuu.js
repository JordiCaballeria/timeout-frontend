import React, { useState } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import "./SideMenuu.scss";
import { useUser } from "../../../hooks/useUser";

export function SideMenu(props) {
  const { children } = props;
  const { pathname } = useLocation();

  return (
    <div className="side-menu-admin">
      <MenuLeft pathname={pathname} />
      <div className="content">{children}</div>
    </div>
  );
}

function MenuLeft(props) {
  const { pathname } = props;
  const { checkPermis } = useUser();
  const [activeIndex, setActiveIndex] = useState(-1)


  return (
    <Menu fixed="left" borderless className="side" vertical>
      <Menu.Item as={Link} to={"/admin"} active={pathname === "/admin"}>
        <Icon name="home" /> <b>HOME</b>
      </Menu.Item>
      {checkPermis("VeureEquips") && (
        <Menu.Item
          as={Link}
          to={"/admin/equips"}
          active={pathname === "/admin/equips"}
        >
          <Icon name="shield alternate" /> <b>EQUIPS</b>
        </Menu.Item>
      )}
      {checkPermis("VeureJugadors") && (
        <Menu.Item
          as={Link}
          to={"/admin/jugadors"}
          active={pathname === "/admin/jugadors"}
        >
          <Icon name="male" /> <b>JUGADORS</b>
        </Menu.Item>
      )}

      {checkPermis("VeureCompeticio") && (
        <>
          <Menu.Item
            onClick={() => setActiveIndex(activeIndex === 0 ? -1 : 0)}
          >
            <Icon name="trophy" /> <b>COMPETICIÓ</b>
            <span
              style={{ float: "right" }}
            >
              <Icon name={activeIndex === 0 ? "caret down" : "caret left"} />
            </span>
          </Menu.Item>
          {activeIndex === 0 ? (
            <>
              <Menu.Item
                as={Link}
                to={"/admin/divisions"}
                active={pathname === "/admin/divisions"}
              >
                <div className="padding-submenu">
                  <Icon name="star" /> Divisions
                </div>
              </Menu.Item>

              <Menu.Item
                as={Link}
                to={"/admin/categories"}
                active={pathname === "/admin/categories"}
              >
                <div className="padding-submenu">
                  <Icon name="tags" /> Categories
                </div>
              </Menu.Item>

              <Menu.Item
                as={Link}
                to={"/admin/esports"}
                active={pathname === "/admin/esports"}
              >
                <div className="padding-submenu">
                  <Icon name="football ball" /> Esports
                </div>
              </Menu.Item>
            </>
          ) : null}
        </>
      )}
      {checkPermis("VeureBotiga") && (
        <>
          <Menu.Item
            onClick={() => setActiveIndex(activeIndex === 1 ? -1 : 1)}
          >
            <Icon name="shopping cart" /> <b>BOTIGA</b>
            <span
              style={{ float: "right" }}

            >
              <Icon name={activeIndex === 1 ? "caret down" : "caret left"} />
            </span>
          </Menu.Item>
          {activeIndex === 1 ? (
            <>
              <Menu.Item
                as={Link}
                to={"/admin/botiga"}
                active={pathname === "/admin/botiga"}
              >
                <div className="padding-submenu">
                  <Icon name="desktop" /> Panell Botiga
                </div>
              </Menu.Item>
              <Menu.Item
                as={Link}
                to={"/admin/botiga/productes"}
                active={pathname === "/admin/botiga/productes"}
              >
                <div className="padding-submenu">
                  <Icon name="gift" /> Productes
                </div>
              </Menu.Item>
              <Menu.Item
                as={Link}
                to={"/admin/botiga/talles"}
                active={pathname === "/admin/botiga/talles"}
              >
                <div className="padding-submenu">
                  <Icon name="tags" /> Talles
                </div>
              </Menu.Item>
              <Menu.Item
                as={Link}
                to={"/admin/botiga/tipusproducte"}
                active={pathname === "/admin/botiga/tipusproducte"}
              >
                <div className="padding-submenu">
                  <Icon name="tags" /> Tipus de producte
                </div>
              </Menu.Item>
            </>
          ) : null}
        </>
      )}
      {checkPermis("VeureEsdeveniments") && (
        <>
          <Menu.Item
            onClick={() => setActiveIndex(activeIndex === 2 ? -1 : 2)}
          >
            <Icon name="calendar alternate" /> <b>ESDEVENIMENTS</b>
            <span
              style={{ float: "right" }}

            >
              <Icon name={activeIndex === 2 ? "caret down" : "caret left"} />
            </span>
          </Menu.Item>
          {activeIndex === 2 ? (
            <>
              <Menu.Item
                as={Link}
                to={"/admin/esdeveniments"}
                active={pathname === "/admin/esdeveniments"}
              >
                <div className="padding-submenu">
                  <Icon name="calendar alternate outline" /> Esdeveniments
                </div>
              </Menu.Item>

              <Menu.Item
                as={Link}
                to={"/admin/tipusesdeveniments"}
                active={pathname === "/admin/tipusesdeveniments"}
              >
                <div className="padding-submenu">
                  <Icon name="tags" /> Tipus d'esdeveniments
                </div>
              </Menu.Item>
            </>
          ) : null}
        </>
      )}
      {checkPermis("VeureNoticies") && (
        <Menu.Item
          as={Link}
          to={"/admin/noticies"}
          active={pathname === "/admin/noticies"}
        >
          <Icon name="newspaper" /> <b>NOTÍCIES</b>
        </Menu.Item>
      )}
      {checkPermis("VeureUsers") && (
        <>
          <Menu.Item
            onClick={() => setActiveIndex(activeIndex === 3 ? -1 : 3)}
          >
            <Icon name="user" /> <b>USUARIS</b>
            <span
              style={{ float: "right" }}
            >
              <Icon name={activeIndex === 3 ? "caret down" : "caret left"} />
            </span>
          </Menu.Item>
          {activeIndex === 3 ? (

            <>
              <Menu.Item
                as={Link}
                to={"/admin/users"}
                active={pathname === "/admin/users"}
              >
                <div className="padding-submenu">
                  <Icon name="users" /> Tots
                </div>
              </Menu.Item>

              <Menu.Item
                as={Link}
                to={"/admin/users/treballadors"}
                active={pathname === "/admin/users/treballadors"}
              >
                <div className="padding-submenu">
                  <Icon name="id badge" /> Treballadors
                </div>
              </Menu.Item>

              <Menu.Item
                as={Link}
                to={"/admin/users/socis"}
                active={pathname === "/admin/users/socis"}
              >
                <div className="padding-submenu">
                  <Icon name="user plus" /> Socis
                </div>
              </Menu.Item>
              <Menu.Item
                as={Link}
                to={"/admin/users/simpatitzants"}
                active={pathname === "/admin/users/simpatitzants"}
              >
                <div className="padding-submenu">
                  <Icon name="users" /> Simpatitzants
                </div>
              </Menu.Item>
            </>
          ) : null}
        </>
      )}
      {checkPermis("VeureRols") && (
        <Menu.Item
          as={Link}
          to={"/admin/rols"}
          active={pathname === "/admin/rols"}
        >
          <Icon name="address card" /> <b>ROLS</b>
        </Menu.Item>
      )}
      {checkPermis("VeurePatrocinadors") && (
        <Menu.Item
          as={Link}
          to={"/admin/patrocinadors"}
          active={pathname === "/admin/patrocinadors"}
        >
          <Icon name="money bill alternate outline" /> <b>PATROCINADORS</b>
        </Menu.Item>
      )}
      {checkPermis("VeurePagaments") && (
        <Menu.Item
          as={Link}
          to={"/admin/pagaments"}
          active={pathname === "/admin/pagaments"}
        >
          <Icon name="payment" /> <b>PAGAMENTS</b>
        </Menu.Item>
      )}
      {checkPermis("VeureEntrades") && (
        <Menu.Item
          as={Link}
          to={"/admin/entrades"}
          active={pathname === "/admin/entrades"}
        >
          <Icon name="ticket" /> <b>ENTRADES</b>
        </Menu.Item>
      )}
      {checkPermis("VeureEnviaments") && (
        <Menu.Item
          as={Link}
          to={"/admin/enviaments"}
          active={pathname === "/admin/enviaments"}
        >
          <Icon name="paper plane" /> <b>ENVIAMENTS</b>
        </Menu.Item>
      )}
    </Menu>
  );
}
