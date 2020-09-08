import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [ dailyData, setDailyData ] = useState([]);

  useEffect( () => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    }

    fetchAPI();
  }, []);

  const lineChart = (
    dailyData.length ? ( 
    <Line 
      data = {{
        labels: dailyData.map(({ date }) => date),
        datasets: [{
          data: dailyData.map(({ confirmed }) => confirmed),
          label: 'Infected',
          borderColor: '#0075ea',
          fill: true,
          pointRadius: 0,
        }, {
          data: dailyData.map(({ deaths }) => deaths),
          label: 'Deaths',
          borderColor: '#ff4545',
          fill: true,
          pointRadius: 0,
        }],
      }}
    /> ) : null 
  );

  const barChart = (
    confirmed ? (
    <Bar 
      data = {{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [{
          label: 'People',
          backgroundColor: ['rgba(0,117,234,0.8)', 'rgba(166,191,72,0.8)', 'rgba(255,69,69,0.8)'],
          data:[confirmed.value, recovered.value, deaths.value]
        }],
      }}
      options = {{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}`},
      }}
    />

    ) : null
  )
  
  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  )
}

export default Chart;