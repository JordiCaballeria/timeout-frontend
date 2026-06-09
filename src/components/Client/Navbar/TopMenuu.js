import { Menu, Segment, Sticky } from 'semantic-ui-react';
import './TopMenu.scss'

export function TopMenu({ renderLinks, renderNavbar }) {

  return (
    <Segment className='top-navbar' inverted attached size='mini'>
      {renderNavbar()}
      <Sticky >
        <div className='nav-menu'>
          <Menu inverted secondary>
            {renderLinks()}
          </Menu>
        </div>
      </Sticky>
    </Segment>
  )
}