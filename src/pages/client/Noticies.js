import React, { useEffect } from 'react'
import { ListNoticies } from '../../components/Client'
import { Loader } from 'semantic-ui-react'
import { useNoticies } from '../../hooks/useNoticies'

export function Noticies(props) {
    const { loading, noticies, getNoticies } = useNoticies();
    const { menu, limitNoticies } = props;

    useEffect(() => { getNoticies() }, [])

    //{ loading ? <Loader active inline='centered' /> : <ListNoticies noticies={noticies} />} 
    return (
        <div>
            {loading ? <Loader active inline='centered' /> : <ListNoticies noticies={noticies} menu={menu} limitNoticies={limitNoticies} />}
        </div>
    )
}
