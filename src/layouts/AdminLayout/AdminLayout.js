import React from 'react'
import { LoginAdmin } from '../../pages/auth/LoginAdmin/LoginAdmin';
import { TopMenu, SideMenu } from "../../components/Admin"
import "./AdminLayout.scss"
import { useAuth } from '../../hooks/useAuth';

export const AdminLayout = (props) => {
    const { children } = props;
    const {auth} = useAuth();

    if (!auth) return <LoginAdmin />

    return (
        <div className='admin-layout'>
            <div className='admin-layout__menu'>
                <TopMenu />
            </div>

            <div className='admin-layout__main-content'>
                <SideMenu>{children}</SideMenu>
            </div>
        </div>
    )
    //Afegir al div amb la className='admin-layout__main-content'
    //<SideMenu>{children}</SideMenu>
}
