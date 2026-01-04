import { useEffect, useState } from "react";
import { getUsers } from "../services/MainLlamados";

//Import del componente Chart de la Librería react-apexcharts que permite crear gráficos interactivos.
import Chart from "react-apexcharts";     
import "../styles/LineBar.css"

const LineBar = () => {
  const [seriesNoticias, setSeriesNoticias] = useState(0);
  const [seriesCampanas, setSeriesCampanas] = useState(0);


  //Este useEffect recibe los datos y los filtra por el tipo de publicación para luego aplicar un legth para contar la cantidad
 useEffect(() => {
  async function list() {   
    const datos = await getUsers("api/publicaciones");
    const filtradoNoticias = datos.filter((item) => item.nombre_tipo_publicacion === "Noticias");
    const filtradoCampanas = datos.filter((item) => item.nombre_tipo_publicacion === "Campañas");

    setSeriesNoticias(filtradoNoticias.length);
    setSeriesCampanas(filtradoCampanas.length);
    console.log(filtradoNoticias.length)
  }

  list();
}, []);


    
return (  
  <div className="grafico-container">
    
    <div className="grafico-header">
      <h5>Publicaciones por tipo de publicación</h5>
    </div>
    <div className="grafico-chart">
 <Chart
  options={{
    chart: { id: "basic-bar" },

    //indica la categorias del grafico
    xaxis: { categories: ["Noticias", "Campañas"] },

    //Configura la barra y el estilo del Grafico 
    plotOptions: {
      bar: {
        borderRadius: 3,
        horizontal: false,
        columnWidth: '35%',
      }
    },

    //Muestra el valor encima de cada barra
    dataLabels: {
      enabled: true
    },

    //Degradado de la barra
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: "vertical",
        shadeIntensity: 0.4,
        gradientToColors: ['#A8E6CF'],
        inverseColors: false,
        opacityFrom: 0.9,
        opacityTo: 1,
        stops: [0, 100],
      }
    },
    // Color normal de la barra
    colors: ['#2ABF91'],

    //Efecto de la barra al pasar sobre ella
    states: {
      hover: {
         filter: { type: 'darken',   value: 0.4}
      }
    }
  }}
  series={[
    {
      name: "Publicaciones",
      data: [seriesNoticias, seriesCampanas]
    }
  ]}
  type="bar"
  width="200%"
  height="300"
/>


    </div>
    <hr />
  </div>
);

};

export default LineBar;