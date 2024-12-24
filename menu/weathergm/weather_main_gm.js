const registeredEmails = [];
let currentWeatherData = null;
let button_count = 0;
let angel_button_count = 0

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
    let move_button = document.querySelector(".button");
    let devil = document.querySelector(".devil");
    let text = document.querySelector(".devil_say");
    let devil_face = document.querySelector(".devil_face");
    button_count++;
    
    if (!city) {
        alert("Хотын нэрээ оруулна уу.");
        return;
    }
    switch (button_count) {
        case 1:
            move_button.style.position = "absolute";
            move_button.style.right = "20%";
            move_button.style.bottom = "300px";

            devil.style.display = "block";
            devil.style.position = "absolute";
            devil.style.left = "0px";
            devil.style.top = "600px";

            text.textContent = "Хүүе хүүе чи арай зүгээр ингээд харчихна гэж бодоо юу? Үгүй шүү! Энд бол би эзэн харахгүй";

            break;
        case 2:
            move_button.style.right = "100px";
            move_button.style.bottom = "600px";

            text.textContent = "Хүүеээ хэлээд байна шдээ харуулахгүй";
            break;
        case 3:
            
            move_button.style.right = "20%";
            move_button.style.bottom = "80%";
            text.textContent = "Нэмэргүй дээ";
            break;
        case 4:
            move_button.style.right = "50%";
            move_button.style.bottom = "50%";
            text.textContent = "Ямар зөрүүд юм бэ болиоч ээ";
            break;
        case 5:
            move_button.style.right = "30%";
            move_button.style.bottom = "20%";
            text.textContent = "Яг одоо боль доо сүүлийн анхааруулаг шүү";
            break;
        case 6:
            move_button.style.right = "70%";
            move_button.style.bottom = "80%";
            text.textContent = "Хэлээд байна шдээ. Сүүлийнх!";
            break;
        default:
            move_button.style.right = "0%";
            move_button.style.bottom = "0%";

            let label =document.querySelector(".weather_label");
            text.style.backgroundColor = "#0C50F0";
            text.textContent = "Заза энэ шалгуур байсан юм. чи тэнцлээ бурхан чамайг өршөөг илжигээ";
            devil_face.src = "weather_photo/angel.png";
            label.style.backgroundColor="rgb(98,118,218, 0.5)";
            // Зургуудын тохиргоо
                function setBackgroundImage() {
                    const width = window.innerWidth; // Дэлгэцийн өргөнийг авах
                    console.log(width);

                    if (width > 770) {
                        document.body.style.backgroundImage = "url('./weather_photo/heaven.jpg')";
                        console.log("is work1");
                    } else if (width > 505) {
                        document.body.style.backgroundImage = "url('./weather_photo/heaven_p2.jpg')";
                        console.log("is work2");
                    } else{
                        document.body.style.backgroundImage = "url('./weather_photo/heaven_p3.jpg')";
                        console.log("is work3");
                    }
                }

            // Эхний ачаалалд тохируулна
            setBackgroundImage();

            // Дэлгэцийн хэмжээ өөрчлөгдөх үед дахин тохируулна
            window.addEventListener("resize", setBackgroundImage);
            document.body.style.backgroundSize = "cover";

            angel_button_count ++;
            if( angel_button_count != 1){
                text.textContent = "Заа болиоч дээ ийм аймаар ч байх шиг.";
            }
            const city = document.getElementById('city').value;
            const API_KEY = "3b9c68fcd2427545a02bc9c44922af50"; // Таны OpenWeatherMap API түлхүүр

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=mn`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Мэдээлэл олдсонгүй. Хотын нэрээ шалгана уу.");
                }

                const data = await response.json();
                console.log(data);
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
    };
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
