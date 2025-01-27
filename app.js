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
            region: data.location.region || data.location.name,
            country: data.location.country,
            temperature: data.current.temperature,
            wind_speed: data.current.wind_speed,
            precip: data.current.precip,
            cloudcover: data.current.cloudcover,
        }

        console.log(data);
        return result;
    }
    catch (error) {
        console.log(error)
        return false;
    }
}

// Server
const express = require("express");
const app = express();
const path = require("path");

// Cấu hình đường dẫn tĩnh để truy xuất vào tài nguyên từ trình duyệt
const pathPublic = path.join(__dirname, './public');
app.use(express.static(pathPublic));

// Cấu hình port cụ thể (randomly)
const port = 7000;
app.listen(port, () => {
    console.log(`App run on port ${port}.`)
})

// http://localhost:7000/
// Khi truy cập vào đường dẫn trên thì sẽ chạy vào hàm dưới đây
// Có 2 tham số mặc định là request và response
app.get("/", async (req, res) => {
    // res.send("Hello world!"); // Gửi về trình duyệt
    const params = req.query;
    const location = params.address;
    const weather = await getWeather(location);

    res.render('weather', {
        region: weather.region,
        country: weather.country,
        temperature: weather.temperature,
        wind_speed: weather.wind_speed,
        precip: weather.precip,
        cloudcover: weather.cloudcover,
        address: location
    });
})

app.set('view engine', 'hbs');