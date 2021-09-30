import { useEffect, useState } from "react";
import "./App.css";
import LineChart from "./components/LineChart";
import Card from "./components/Card";

import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";

async function fetchData(url) {
  const response = await fetch(url, {
    mode: "cors",
  });
  return response;
}

function App() {
  const [data, setData] = useState([]);
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const [startDate, setStartDate] = useState(
    new Date().setDate(new Date().getDate() - 1)
  );
  const [endDate, setEndDate] = useState(
    new Date().setDate(new Date().getDate() + 1)
  );

  const [url, setUrl] = useState(
    `https://pi-sensor-rest-api.herokuapp.com/api/range?start=${formatDate(
      startDate
    )}&end=${formatDate(endDate)}`
  );

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
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  function datePickerClose(selectedDates, str, instance) {
    let newEndDate = selectedDates[0];
    let newStartDate = selectedDates[0];

    if (selectedDates.length === 2) {
      newEndDate = selectedDates[1];
    }

    console.log(`Start: ${newStartDate}, End: ${newEndDate}`);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setUrl(
      `https://pi-sensor-rest-api.herokuapp.com/api/range?start=${formatDate(
        newStartDate
      )}&end=${formatDate(newEndDate)}`
    );
  }
  function updateData() {
    setDataRetrieved(false);
    fetchData(url)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setDataRetrieved(true);
      })
      .catch((err) => {
        console.error(err);
        setData({ message: "Error retrieving data" });
        setDataRetrieved(true);
      });
  }

  useEffect(() => {
    updateData();
  }, [url]);

  return (
    <div className="App">
      <div className="app-container">
        {(function () {
          if (dataRetrieved === false) {
            return <h1>Loading...</h1>;
          } else if (data.message) {
            return <h1>{data.message}</h1>;
          } else {
            return (
              <div className="charts-container">
                <h1>{data[0].description}</h1>
                <Card
                  dateTime={data[data.length - 1].date}
                  temperature={data[data.length - 1].temperature}
                  humidity={data[data.length - 1].humidity}
                />
                <LineChart
                  labelLeft="Temperature (℃)"
                  labelRight="Humidity (%)"
                  xData={getDateData(data)}
                  yDataLeft={getTemperatureData(data)}
                  yDataRight={getHumidityData(data)}
                  title={" "}
                />
                <div className="date-control">
                  <h2>Date</h2>
                  <Flatpickr
                    value={[startDate, endDate]}
                    options={{
                      maxDate: new Date().setDate(new Date().getDate() + 1),
                      mode: "range",
                    }}
                    onClose={datePickerClose}
                  />
                </div>
              </div>
            );
          }
        })()}
      </div>
    </div>
  );
}

export default App;
