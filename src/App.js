import { useEffect, useState } from "react";
import "./App.css";
import LineChart from "./components/LineChart";
import Card from "./components/Card";

async function fetchData(url) {
  const response = await fetch(url, {
    mode: "cors"
  });
  return response;
}

function App() {
  // const url = "https://pi-sensor-rest-api.herokuapp.com/api/lastday";
  // const url = "https://pi-sensor-rest-api.herokuapp.com/api/range?start=2021-09-21&end=2021-09-28";
  let startDate = new Date();
  let endDate = new Date();
  
  endDate.setDate(endDate.getDate() + 1);
  startDate.setDate(startDate.getDate() - 1);

  const end = formatDate(endDate);
  const start = formatDate(startDate);

  const url = `https://pi-sensor-rest-api.herokuapp.com/api/range?start=${start}&end=${end}`;
  
  const [data, setData] = useState([]);
  const [dataRetrieved, setDataRetrieved] = useState(false);

  function getHumidityData(data) {
    const humidity = data.map((item) => {
      return item.humidity;
    });
    return humidity;
  }

  function getTemperatureData(data) {
    const temperatures = data.map((item) => {
      return item.temperature;
    });
    return temperatures;
  }

  function getDateData(data) {
    const dates = data.map((item) => {
      // return formatDate(item.date, item.timezone);
      return item.date;
    });
    return dates;
  }

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  useEffect(() => {
    fetchData(url)
    .then(res => res.json())
    .then((result) => {
      setData(result);
      setDataRetrieved(true);
    })
    .catch((err) => {
      console.error(err);
      setData({message: "Error retrieving data"});
      setDataRetrieved(true);
    })
  }, [])

  return (
    <div className="App">
      <div className="charts-container">
        {(function() {
          if (dataRetrieved === false) {
            return <h1>Loading...</h1>
          } else if (data.message) {
            return <h1>{data.message}</h1>
          } else {
            return <>
            <Card 
              dateTime={data[data.length - 1].date} 
              temperature={data[data.length - 1].temperature}
              humidity = {data[data.length - 1].humidity}
            />
            <LineChart 
            labelLeft="Temperature (℃)" 
            labelRight="Humidity (%)" 
            xData={getDateData(data)} 
            yDataLeft={getTemperatureData(data)} 
            yDataRight={getHumidityData(data)}
            title={data[0].description} />
            </>
          }
        })()}
      </div>
    </div>
  );
}

export default App;
