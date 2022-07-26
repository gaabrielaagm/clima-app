import { useState, createContext } from "react"
import axios from "axios"

const ClimaContext = createContext()

const ClimaProvider = ({children}) => {
    const [busqueda, setBusqueda] = useState({
        ciudad: '', 
        pais: ''
    })

    const [resultado, setResultado] = useState({})
    const [noResultado, setNoResultado] = useState(null)
    const [cargando, setCargando] = useState(false)

    const datosBusqueda = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    const consultarClima = async datos => {
        setCargando(true)
        try {
            const { ciudad, pais } = datos
            const appId = import.meta.env.VITE_API_KEY

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
            const { data: { coord: { lat, lon } } } = await axios(url)

            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            const { data: clima} = await axios(urlClima)

            setResultado(clima)
            setNoResultado(null)
        } catch (err) {
            console.error(err)
            setNoResultado('No hay coincidencias en tu busqueda')
        } finally {
            setCargando(false)
        }
    }

    return (
        <ClimaContext.Provider
            value={{
                busqueda,
                setBusqueda,
                datosBusqueda, 
                consultarClima,
                resultado, 
                cargando,
                noResultado
            }}
        >
            {children}
        </ClimaContext.Provider>
    )
}

export {
    ClimaProvider
}

export default ClimaContext