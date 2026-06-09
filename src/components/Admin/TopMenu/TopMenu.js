import React from 'react';
import { Header, Icon, Item, Menu, Image } from "semantic-ui-react"
import { useAuth } from '../../../hooks/useAuth';
import "./TopMenu.scss";
import { Link } from 'react-router-dom';

export function TopMenu() {
    const { auth, logout } = useAuth();

    const renderName = () => {
        if (auth.me?.first_name) {
            return `${auth.me.first_name}`
        }

        return auth.me?.email;
    }

    return (
        <Menu fixed='top' className='top-menu-admin'>
            <Menu.Item className='top-menu-admin__logo'>
                <Header as='h5' textAlign='center'>SABADELL RUGBY CLUB ADMIN</Header>
            </Menu.Item>

            <Menu.Item
                as={Link}
                to={"/"}
                position='left'
            >
                <Icon name='arrow left' /> <p style={{ marginLeft: '5px' }}>Torna</p>
            </Menu.Item>

            <div style={{margin: "auto"}}>
                <span>Powered by</span>{' '}
                <Image src={'https://i.ibb.co/Qv98nDc/nom-Time-Out.png'} size='tiny' verticalAlign='middle' />{'™'}
            </div>

            <Menu.Menu position='right'>
                <Menu.Item>Hola, {renderName()}</Menu.Item>
                <Menu.Item onClick={logout}>
                    <Icon name='sign-out' />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}
