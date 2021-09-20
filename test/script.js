

        function DOMLoaded(callback) {
            if (document.readyState != "loading") {
                callback();
            } else {
                document.addEventListener("DOMContentLoaded", callback)
            }
        };

        let myDB = () => {
            let db = {
                interval: {
                    s1: 1,
                    s2: 5,
                    s3: 15
                },
                symbol: {
                    BTC: "BTCUSDT",
                    ETH: "ETHUSDT",
                    SOL: "SOLUSDT"
                },
                procent: {
                    BTC_s1: 0.25,
                    BTC_s2: 0.34,
                    BTC_s3: 0.85,
                    ETH_s1: 0.40,
                    ETH_s2: 0.55
                },

            };
            localStorage.setItem("setting", JSON.stringify(db)); //запишем его в хранилище по ключу
            //debug("myDB - "+JSON.stringify(db));
            return JSON.parse(localStorage.getItem("setting")); //спарсим его обратно объект
        };


        //console.log(myDB().symbol.ETH);
        //console.log(myDB().interval.s1);
        //console.log(myDB().procent.BTC_s1); // 'Mila'

        let timeDB = (BTC, ETH, SOL) => {
            let db = {
                timeBTC: [],
                timeETH: [],
                timeSOL: []
            };
            if (BTC) {
                db.timeBTC.push(BTC);
            }
            if (ETH) {
                db.timeETH.push(ETH);
            }
            if (SOL) {
                db.timeSOL.push(SOL);
            }
            localStorage.setItem("settingTime", JSON.stringify(db));
        };



        let getTimeDB = () => {
            const p = JSON.parse(localStorage.getItem("settingTime"))
            //console.log(p.timeBTC[0]);
            return {
                BTC: p.timeBTC[0],
                ETH: p.timeETH[0],
                SOL: p.timeSOL[0]
            };
        }
        //console.log(getTimeDB().BTC);
        //console.log(getTimeDB().ETH);


        //timeDB(null, null, 1631012400000);

        function urlPrice() {
            let url = new URL("https://api.binance.com/api/v1/klines"); // https://api.binance.com/api/v3/time
            url.searchParams.set("symbol", myDB().symbol.SOL);
            url.searchParams.set("interval", myDB().interval.s1 + "m");
            url.searchParams.set("startTime", getTimeDB().SOL);
            debug(url);
            return url;
        };
               /*
        function localStorageTime() {
            if (localStorage.getItem("startTime")) { // если есть начальное время
                return localStorage.getItem("endTime"); // возращает последнее время у функцию
            } else { // если начальное(временное) времени нет
                localStorage.setItem("startTime", timeUnix()); // установлает начальное время
                return localStorage.getItem("startTime"); // возращает начальное время у функцию
            }
            debug("получить з хранилища ...");
        };


         * procent(x, y) расчет процентнои разници между двумя числами.
         * var c - % от x, y.
         * также следит за изменении цены.
         * c.toFixed уберает ненужние числа.
         */
        function procent(a, b) {
            let c = a / b * 100 - 100;
            c = (-1) * c;
            debug(c);
            return c.toFixed(2);
        };

        /*
         * getPrice() GET запрос, тип ответа - JSON-строка.
         * price[0][1] Многомерные массивы, [0] = первое число. [1] = второе.
         */
        const getPrice = function(callback) {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", urlPrice(), true);
            xhr.responseType = "json"; // возвращает тип ответа
            xhr.addEventListener("load", callback);
            xhr.send(null); // запрос

            xhr.onload = function() {
                debug("xhr.response.length: " +xhr.response.length);
                if (xhr.response.length > 2) { //
                    log("not lost time");
                    //localStorage.clear();
                    //localStorage.removeItem("endTime");
                }
                if (xhr.response.length < 2) { // если ошибка в url «startTime» неверное время
                    log("not correct url time ");
                }
                if (xhr.status != 200) { // если ошибка url «endTime» == null
                    log("error url: " + xhr.status);
                    //localStorage.removeItem("startTime"); // перезапускает функцию localStorageTime()
                }
            };
            xhr.onerror = function() { // если ошибка в соединения
                //createElem("Error internet connection");
                log("error internet");
            };
        };

        /*
         * timer(x) для визуального учета времени в минутах.
         */
        function timer(time) {
            let t = time, min, sec;
            let timerId = setInterval(function() {
                min = parseInt(t / 60, 10)
                sec = parseInt(t % 60, 10);
                min = min < 10 ? "0" + min : min;
                sec = sec < 10 ? "0" + sec : sec;
                document.querySelector(".minutes").textContent = min + ":" + sec;
                //document.title = min + ":" + sec; // Изменить title страницы
                if (--t < 0) {
                    clearTimeout(timerId);
                }
            }, 1000);
        };

        function pushNotifications(a, b) {
            if ("Notification" in window) { // если браузер поддерживает Notifications
                let notification = new Notification(a, {
                    tag: "status", // заменит текущее уведомление с таким же тегом
                    body: b,
                    icon: "http://habrastorage.org/storage2/cf9/50b/e87/cf950be87f8c34e63c07217a009f1d17.jpg"
                });
                notification.onclick = function() { // Выполнять код при нажатии на оповещении
                    window.open("https://www.binance.com/ru/trade/BTC_USDT?layout=basichttps://www.binance.com/ru/trade/BTC_USDT?layout=basic");
                };
            };
        };

        function soundNotifications() {
            //const audio = document.querySelector(".audio");
            audio.play(); //    «audio» по id селектера
            document.onkeydown = function(event) {
                if (event.keyCode === 32) { // остановить уведомления пробелом
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    audio.pause();
                }
            };
        };


        function timeUnix() { // 10:00:00 2021-08-16 --> 1629108000000
            const input = document.querySelector(".inputTime").value; // берет с поля время
            debug(input);
            const unix = Date.parse(input); // время в unix формат
            //localStorage.setItem("startTime", unix); // установлает начальное время
            return unix;
        };

        function timeDate() {
            const time = new Date().toLocaleTimeString();
            const date = new Date().toISOString().slice(0, 10);
            document.querySelector(".inputTime").value = time.slice(0, 6) + "00 " + date; // вставляет в поле актуальне время hh/mm
            return time + " " + date;
        };

        function openLink(url) {
            window.open(url, "_blank");
            //console.log(open);
        };

        function addTable(x) {
            const tbody = document.querySelector(".new_table");
            const tr = document.createElement("tr");
            tr.setAttribute("id", "new_tr");
            for (let i = 0; i < x.length; i++) {
                tr.appendChild(document.createElement("td")).appendChild(document.createTextNode(x[i]));
            }
            tbody.prepend(tr); // вставляет в начало таблицы новие дание
        };

        function log(x) {
            const audio = new Audio();
            audio.src = "error.mp3";
            audio.autoplay = true; // Автоматически запускаем
            const elem = document.querySelector(".log");
            const data = document.createTextNode(" [" +x+ "] ");
            elem.appendChild(data);
        };


        function debug(result){
            if (document.querySelector(".debug").checked) {
             console.log("debug: " +result);
            }
        };
        function clearTime() {
            localStorage.removeItem("startTime");
            localStorage.removeItem("endTime");
            localStorage.clear();
        };


        function signal(x) {
            const BUY = localStorage.getItem("BUY");
            debug(BUY);
            // strategy3(x, x) проверяет сколько времени пройшло от последной покупки
            function strategy3(start, end) {
                const currDate = new Date(start);
                const oldDate = new Date(end);
                let result = (oldDate - currDate) / 60000;
                return result.toFixed(0)
            };
            if (x >= myDB().procent.BTC_s1) { // если цена болеше x %
                console.log("цена болеше x % ");
                if (x < 1.50) { // и если strategy(4) цена менша xx %
                    console.log("цена менша за xx %");
                    console.log(strategy3(BUY, timeDate()) + " минути");
                    if (strategy3(BUY, timeDate()) >= 60) { // и если за последние 1 час (15) нет покупок
                        localStorage.setItem("BUY", timeDate());
                        pushNotifications("Go", "BUY bitcoin");
                        soundNotifications();
                        return "BUY";
                    }
                    console.log("за последние 60 мин была покупка потому не покупать");
                }
                return "no recommend";
            }
            if (x < -0.30) { // если цена критически упадет
                return "warning";

            } else {
                return "---";
            }

        };

        /*
         * run(x) главная функция.
         *
         *
         */
        function run() {
            getPrice(function(event) {
                const price = event.currentTarget.response; // возвращает массив
                timeDB(null, null, price[1][0]);
                //localStorage.setItem("endTime", price[1][0]); // установлает актульние(последнее) время
                //document.querySelector(".procent").innerText = procent(price[0][1], price[0][4]) + "%"; // расчет процентов
                //pushNotifications("Покупать", procent(price[0][1], price[0][4]) + "%");
                addTable([myDB().symbol.SOL, procent(price[0][1], price[0][4]) + "%", "$" + price[0][1], myDB().procent.BTC_s1, signal(procent(price[0][1], price[0][4])), timeDate()]);
                //createElem(procent(price[0][1], price[0][4]) + "% [" + timeDate() + "]", price[0][1] + " ==> " + price[0][4] + "  [" + price + "]"); // расчет процентов
                //console.log(date);
                console.log(price);
                timer(60 * myDB().interval.s1); // 15 минут
            });
        };

        function go() { // запуск через кнопку
            run();
            setInterval(function() {
                run();
            }, 60000 * myDB().interval.s1) // 15 минут
        };
        DOMLoaded(function() {
            //localStorage.clear();
            //console.log(setting("5m"));
            timeDate();
        });
