import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { routesPaths } from './routes'
import { map } from "lodash";

export const Navigation = () => {

    return (
        <BrowserRouter>
            <Routes>
                {map(routesPaths, (route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <route.layout>
                                <route.component />
                            </route.layout>
                        }
                    />
                ))}
            </Routes>
        </BrowserRouter>
    )
}
