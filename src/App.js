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

function getHumidityData(data) {
  const humidity = data.map((item) => {
    return item.humidity;
  });
  return humidity;
}

function App() {
  const url = "https://pi-sensor-rest-api.herokuapp.com/api/lastday";
  
  const [data, setData] = useState([]);
  const [dataRetrieved, setDataRetrieved] = useState(false);

  function getTemperatureData(data) {
    const temperatures = data.map((item) => {
      return item.temperature;
    });
    return temperatures;
  }

  function getDateData(data) {
    const dates = data.map((item) => {
      return formatDate(item.date, item.timezone);
    });
    return dates;
  }

  function formatDate(date, timezone) {
    let d = new Date(date);
    let formattedDateTime = " " + d.toLocaleTimeString('en-GB', {timeZone: 'UTC'});
    return formattedDateTime;
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
            {/* <LineChart label="Humidity (%)" xData={getDateData(data)} yData={getHumidityData(data)} title={data[0].description} /> */}
            </>
          }
        })()}
      </div>
    </div>
  );
}

export default App;
