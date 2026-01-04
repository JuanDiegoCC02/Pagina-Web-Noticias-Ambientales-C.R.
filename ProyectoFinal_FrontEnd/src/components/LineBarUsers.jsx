// ApexChart.jsx
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { GetUsuarios } from '../services/llamados_usuarios';
import "../styles/LineBarUsers.css"

const LineBarUsers = ({ title }) => {
  const [chartData, setChartData] = useState({
    series: [],
    categories: [],
  });

  useEffect(() => {
    async function list() {
      const datos = await GetUsuarios();

      // const de usuarios por fecha 
      const conteoPorFecha = {};

      datos.forEach((usuario) => {
        
        const fecha = new Date(usuario.date_joined).toISOString().split('T')[0];
        conteoPorFecha[fecha] = (conteoPorFecha[fecha] || 0) + 1;
      });

      // Orden y estructuracion de las fechas
      const fechasOrdenadas = Object.keys(conteoPorFecha).sort();
      const conteos = fechasOrdenadas.map((fecha) => conteoPorFecha[fecha]);

      setChartData({
        series: [{ name: 'Usuarios registrados', data: conteos }],
        categories: fechasOrdenadas,
      });
    }

    list();
  }, []);

const options = { chart: {
    height: 350,
    type: 'line', 
    zoom: { enabled: false },
    toolbar: { show: false }
  },
  colors: ['#0EA676'], // Verde oscuro para linea usuarios
  dataLabels: { enabled: false },
  stroke: {
    curve: 'smooth',
    width: 3
  },

  //Titulo del Grafico
  title: { text: title || 'Registro de Usuarios por Fecha', align: 'left',
    style: {
      fontSize: '16px',
      color: '#0d6e63'
    }
  },
  grid: { borderColor: '#d9f1e8',
    row: {
      colors: ['#e3f8f2', 'transparent'],
      opacity: 0.4,
    },
  },

  //Indica las categorias del grafico
  xaxis: { categories: chartData.categories,
    title: { text: 'Fecha de registro', style: { color: '#0d6e63' } },
    labels: { style: { colors: '#0B3D28' } }
  },
  yaxis: {
    title: { text: 'Cantidad de usuarios', style: { color: '#0B3D28' } },
    labels: { style: { colors: '#0B3D28' } }
  },
  tooltip: {
    theme: 'light',
    x: { format: 'yyyy-MM-dd' }
  }
};


  return (
    <div className='grafico-usuarios-container'>
      <ReactApexChart options={options} series={chartData.series} type="line" height={350}  />
    </div>
  );
};

export default LineBarUsers;
