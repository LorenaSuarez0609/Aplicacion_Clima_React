import {useState} from 'react'

export const WheatherApp = () => {
    const difKelvin = 273.15
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '605507acf87117e111e54a3ab5238541'
    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (ciudad.length > 0) fetchClima()
    }
    const fetchClima = async () => {
        try{
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json()
            setDataClima(data)
        }catch (error){
            console.error('ocurrio el siguiente error:', error)
        }
    }
    return (
        <div className="container">
            <h1>Aplicacion de Clima</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text" 
                    value={ciudad}
                    onChange={handleCambioCiudad}

                >
                </input>
                <button type="submit">Buscar</button>
            </form>
            {
                dataClima &&(
                    <div>
                        <h2>{dataClima.name}</h2>
                        <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
                        <p>Condicion Metereologica: {dataClima.weather[0].description}</p>
                        <img src={` https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}
                        alt= "Imagen del clima"></img>
                    </div>

                )
            }
        </div>
    )
}
