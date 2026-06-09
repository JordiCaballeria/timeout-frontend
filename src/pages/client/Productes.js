import React, { useEffect } from 'react'
import { Loader } from 'semantic-ui-react'
import { ListProductes } from '../../components/Client/ListProductes'
import { useProductes } from '../../hooks/useProductes'

export function Productes(props) {
    const { loading, productes, getProductes, tipusProducte, getTipusProductes } = useProductes();

    useEffect(() => { getProductes(); getTipusProductes() }, [])

    return (
        <div>
            {loading ? <Loader active inline='centered' /> : <ListProductes productes={productes} tipusProducte={tipusProducte} />}
        </div>
    )
}
