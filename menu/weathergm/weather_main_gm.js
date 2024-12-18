const registeredEmails = [];
let currentWeatherData = null;

function registerEmail() {
    const email = document.getElementById('email').value;

    if (!email || !/^[^\s@]+@gmail\.com$/.test(email)) {
        alert("Хүчинтэй Gmail хаяг оруулна уу.");
        return;
    }

    if (registeredEmails.includes(email)) {
        alert("Энэ Gmail хаяг аль хэдийн бүртгэгдсэн байна.");
        return;
    }

    registeredEmails.push(email);
}

async function getWeather() {
    console.log("Амжилттай мэдээлэл авах товч дээр дарлаа")

    const city = document.getElementById('city').value;
    const API_KEY = "3b9c68fcd2427545a02bc9c44922af50"; // Таны OpenWeatherMap API түлхүүр

    if (!city) {
        alert("Хотын нэрээ оруулна уу.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=mn`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Мэдээлэл олдсонгүй. Хотын нэрээ шалгана уу.");
        }

        const data = await response.json();
        currentWeatherData = data;

        document.getElementById('weatherInfo').innerHTML = `
                    <h2>Хот: ${data.name}</h2>
                    <p>Температур: ${data.main.temp}°C</p>
                    <p>Үзэгдэх тэнгэр: ${data.weather[0].description}</p>
                    <p>Салхины хурд: ${data.wind.speed} м/с</p>

                    <div class="mail_get">
                        <label for="email">Gmail хаяг:</label>
                        <input class="search_bar" type="email" id="email" placeholder="Жишээ: user@gmail.com">
                        <button  class="button" onclick="registerEmail(); sendEmail();" style="margin-top: 20px;">мэдээлэл илгээх</button>
                    </div>
                `;
    } catch (error) {
        document.getElementById('weatherInfo').innerHTML = `<p style="color: red;">Алдаа: ${error.message}</p>`;
    }

}

function sendEmail() {
    console.log("Амжилттай мэдээлэл илгээх товч дээр дарлаа");
    if (!currentWeatherData) {
        alert("Эхлээд цаг агаарын мэдээлэл авна уу.");
        return;
    }

    registeredEmails.forEach(email => {
        fetch('https://perweb-lnao.onrender.com/send-email', { // 'send-email'-ийг зөв оруулсан
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                subject: `Цаг агаарын мэдээлэл: ${currentWeatherData.name}`,
                text: `Энэ өдрийн мэнд\nХот: ${currentWeatherData.name}\nТемператур: ${currentWeatherData.main.temp}°C\nТэнгэрийн таалал: ${currentWeatherData.weather[0].description}\nСалхины хурд: ${currentWeatherData.wind.speed} м/с`,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Серверээс алдаа буцаж ирлээ");
                }
                return response.text();
            })
            .then(data => console.log("Амжилттай:", data))
            .catch(error => console.error('Алдаа:', error));
    });

    alert("Бүртгэгдсэн Gmail хаяг руу мэдээлэл илгээгдлээ!");
}
