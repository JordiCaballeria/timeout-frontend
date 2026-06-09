import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Segment, Sidebar, Sticky, Icon } from 'semantic-ui-react'
import './SideMenu.scss'

function Overlay() {
  return (
    <div style={{
      backgroundColor: "rgba(0, 0, 0, 0.795)",
      position: "fixed",
      height: "110vh",
      width: "100%",
      zIndex: 2,
    }} />
  )
}

function OpenIcon() {
  return (<i className="big bars icon inverted" />)
}

function CloseIcon() {
  return (<i className="big close red icon" style={{ zIndex: 2 }} />)
}

function SideMenu({ renderLinks, renderNavbar }) {
  const [visible, setVisible] = useState(false)
  const [icon, setIcon] = useState(OpenIcon)
  let location = useLocation()

  const hideSidebar = () => {
    setIcon(OpenIcon)
    setVisible(false)
  }
  const showSidebar = () => {
    setIcon(CloseIcon)
    setVisible(true)
  }
  const toggleSidebar = () => {
    visible ? hideSidebar() : showSidebar()
  }

  useEffect(() => {
    hideSidebar();
  }, [location])

  return (
    <>
      {visible && <Overlay />}
      <Segment className='container_sidemenu' inverted attached size='mini' >
        {renderNavbar()}
        <Sticky >
          <Menu inverted
            size="tiny"
            borderless
            attached
            color='orange'
          >
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
            <Menu.Menu position='right'>
              <Menu.Item onClick={toggleSidebar}>
                {icon}
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Sticky>
      </Segment>
      <Sidebar as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        vertical
        visible={visible}
        width='thin'
      >
        {renderLinks()}
      </Sidebar>
    </>
  )
}

export default SideMenu