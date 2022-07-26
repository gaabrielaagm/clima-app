import Formulario from "./Formulario"
import Resultado from "./Resultado"
import Spinner from "./Spinner"
import useClima from "../hooks/useClima"

const AppClima = () => {
    const { resultado, cargando, noResultado } = useClima()

    return (
        <>
            <main className="dos-columnas">
                <Formulario /> 
                {
                    cargando ? <Spinner /> : 
                    noResultado ? noResultado :
                    resultado?.weather && <Resultado />
                }
            </main>
        </>
    )
}

export default AppClima