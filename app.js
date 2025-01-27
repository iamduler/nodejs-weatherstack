const asyncRequest = require("async-request");

const getWeather = async (location = '') => {
    const secretKey = '38a76df12883d084a95aaa136bc9d5c8';
    
    if (!location) {
        location = 'Hai Phong'; // Set default value
    }

    let url = `http://api.weatherstack.com/current?access_key=${secretKey}&query=${location}`;

    try {
        const res = await asyncRequest(url);
        const data = JSON.parse(res.body);

        let result = {
            region: data.location.region,
            country: data.location.country,
            temperature: data.current.temperature,
            wind_speed: data.current.wind_speed,
            precip: data.current.precip,
            cloudcover: data.current.cloudcover,
        }

        console.log(result);
        return result;
    }
    catch (error) {
        console.log(error)
        return false;
    }
}

// getWeather('Ho Chi Minh City');

// Server
const express = require("express");
const app = express();

// Cấu hình port cụ thể (randomly)
const port = 7000;
app.listen(port, () => {
    console.log(`App run on port ${port}.`)
})

// http://localhost:7000/
// Khi truy cập vào đường dẫn trên thì sẽ chạy vào hàm dưới đây
// Có 2 tham số mặc định là request và response
app.get("/", (req, res) => {
    res.send("Hello world!"); // Gửi về trình duyệt
})