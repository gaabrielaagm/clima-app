import useClima from "../hooks/useClima"

const Resultado = () => {
    const { resultado } = useClima()
    const { name, main } = resultado

    // Grados kelvin
    const KELVIN = 273.15

    return (
        <div className="contenedor clima">
            <h2>El clima de {name} es: </h2>
            <p>
                {parseInt(main.temp - KELVIN)} <span>&#x2103;</span>
            </p>
            <div className="temp_min_max">
                <p>
                    Min: {parseInt(main.temp_min - KELVIN)} <span>&#x2103;</span>
                </p>
                <p>
                    Max: {parseInt(main.temp_max - KELVIN)} <span>&#x2103;</span>
                </p>
            </div>
        </div>
    )
}

export default Resultado