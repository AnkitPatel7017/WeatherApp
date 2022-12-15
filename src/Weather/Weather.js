import React, { Component } from 'react'
import axios from 'axios';
import { WiDayCloudy } from 'react-icons/wi';
import './Weather.css';
export default class Weather extends Component {
    constructor(props) {
        super(props)

        this.state = {
            city: "",
            cityName: 'Enter City Name',
            feels_like: "0",
            temp: '0',
            temp_max: '0',
            temp_min: '0',
            description: '',
        }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onCheck = async () => {
        try {
            if (this.state.city === '') {
                alert("Please Enter City Name")
            } else {
                await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=e1be3edf02393776280f7846da8c147a&units=metric`)
                    .then(res => {
                        console.log(res);
                        this.setState({
                            cityName: res.data.name,
                            feels_like: res.data.main.feels_like,
                            temp: res.data.main.temp,
                            temp_max: res.data.main.temp_max,
                            temp_min: res.data.main.temp_min,
                            description: res.data.weather[0].description,
                        })
                    })
                
            }
        } catch (error) {
            console.log(error);
            alert("Enter Valid Input")
        }
    }

    render() {
        return (
            <div className='container-fluid'>
                <section className="vh-100 ">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-md-8 col-lg-6 col-xl-4 border rounded shadow-lg" style={{ padding: "38px", backgroundColor: "#9ec6cd" }}>
                                <h3 className="mb-4 pb-2 fw-normal">Check the weather forecast</h3>
                                <div className="input-group rounded mb-3">
                                    <input type="search" className="form-control rounded input" name='city' value={this.state.city} onChange={this.onChange} placeholder="City" aria-label="Search"
                                        aria-describedby="search-addon" />
                                    <a href="#!" type="button">
                                        <span className="input-group-text border-0 fw-bold" onClick={() => this.onCheck()} id="search-addon">
                                            Check!
                                        </span>
                                    </a>
                                </div>

                                <div className="card shadow-0 border" style={{ backgroundColor: "#c5dfe3" }}>
                                    <div className="card-body">
                                        <WiDayCloudy style={{ fontSize: "50px", color: '#949fab' }} />
                                        <div className="d-flex flex-column text-center mt-2 mb-2">
                                            <h6 className="display-4 mb-0 font-weight-bold" style={{ color: "#1C2331" }}>{this.state.temp}°C </h6>
                                            <span className="small" style={{ color: "#868B94" }}>{this.state.description}</span>
                                        </div>
                                        <h4 className="mb-1 sfw-normal">{this.state.cityName}</h4>
                                        <p>Feels like: <strong>{this.state.feels_like}°C</strong></p>
                                        <p>Max: <strong>{this.state.temp_max}°C</strong>, Min: <strong>{this.state.temp_min}°C</strong></p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>
            </div>

        )
    }
}
