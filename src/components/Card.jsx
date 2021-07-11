import React from 'react';
import "..//styles/Card.css";

export default class Card extends React.Component {
    formatDate(date) {
        let d = new Date(date);
        let options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC'
        }
        return d.toLocaleTimeString([], options)
    }

    render() {
        return <div className="card-container">
            <span className="card-container__temperature">{this.props.temperature}℃</span>
            <span className="card-container__humidity">{this.props.humidity}%</span>
            <span className="card-container__date">{this.formatDate(this.props.dateTime)}</span>
        </div>
    }
}