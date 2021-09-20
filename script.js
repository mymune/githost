        const version = async (data) => {
            document.querySelector(".version").textContent = data;
        };
        /*
         *
         * Release:  v.0.9 (13.09.2021)
         * + подготовка к большим изменений в версии 1.0
         * + правки кода
         * + исправлено мелких ошибок
         *
         */
        version("Pre-release: v.1.0.4.6");
        /*
         * Pre-release: v.1.0.3 (19.09.2021)
         * + новый дизайн
         * + база данных (localStorage)
         * + переписан код (es6)
         * + многопоточность (более 1 стратегий)
         * + Auto-запуск скрипта
         * + силка на таблицу
         * + отключено кэш js скриптов
         *
         *
         * Pre-alpha: v.1.1.0
         * - admin-панель
         * - единственная  функция по обработке ошибок try catch
         * - автоисправление сетевых ошибок
         * - визуальные улучшение
         * - панель анализа данных
         * - функция психологической поддержки
         * - серверная часть
         * - уведомления на телеграм
         * - стратегии на другие криптовалюты
         * - улучшение дизайна
         * - график (и скриншоты) свеч для сравнения и анализа
         * - улучшить debug()
         * - темная тема
         */

        /* https://vc.ru/finance/207749-kak-ya-torgovyh-robotov-razrabatyval
         *  - статегия BTC/USDT -- ETH/USDT 5m
         *  1. если предедужчая свеча больше 0.50%, не покупать.(нужна база даных)
         *  2. если 1m стратегия не сработала, не покупать.
         *
         *  - статегия SOL/USDT 1m-5m
         *  3. если за последние 1 часа был сигнал и сработала покупка (в пределах 1 ч),
         *     следующий сигнал  в премижутку 1 часа, не покупать.
         *  4. если сиглал свеча више 1.80%(5м), 1.50%(1м), не покупать.
         *  5. если цена близко до круглих значений 115, 120, 125, не покупать.
         *  6. если тренд низходящий, не покупать.
         *  6.1. если последные 15 мин есть свечи (2шт.) с болышими минусами (-0.70%), не покупать.
         *  7. если предудущая свеча с большим минусом (-0.40%)(1m), покупать, но  п.6 и 6.1.
         *  8. если торги идут с 9:00 по 21:00
         *  9. если цена  приблизилась до пиковой дневной(24ч) цены, не покупать.
         *  10. если предедужчые 2 свечы больше(1m) или 3 свечы(15m), не покупать
         *  11. если BTC растет, SOL  не покупать.
         *  12. если обем торгов по SELLкраснай больше 30к(SOL) будет падать, не покупать.
         *
         *
         *
         *  - стратегия по убиткам:
         *   1. если после сигнала, следуючие 2 свечи -0.30% -- сигнал на убыток = продавать
         */


        let debug = async (result) => {
            if (document.querySelector(".debug").checked) {
                console.log(debug.name + ": " + result);
            }
        };
        /*
//Измеряет время, необходимое для выполнения функции.
const timeTaken = callback => {
    console.time('timeTaken');
    const r = callback();
    console.timeEnd('timeTaken');
    return r;
};
timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms
        console.count("debug");
        console.trace();
        console.log(debug.name);
        var time = performance.now();

        time = performance.now() - time;
        console.log('js work = ', time);

            const getURLParameters = url =>
                (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
                    (a, v) => (
                        (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a
                    ), {}
                );
            getURLParameters('google.com'); // {}
            getURLParameters('http://url.com/page?name=Adam&surname=Smith');
        };          */


        const clock = async () => {
            const time = new Date().toLocaleTimeString();
            document.querySelector(".clock").textContent = time;
        };
        setInterval(() => clock(), 1000);



        const myDB = () => {
            const db = {
                BTC: "BTCUSDT",
                ETH: "ETHUSDT",
                SOL: "SOLUSDT",
                interval: {
                    s1: 1,
                    s5: 5,
                    s15: 15
                },
                strategy: {
                    BTC_s1: {
                        min: 0.30,
                        max: 2
                    },
                    ETH_s1: {
                        min: 0.45,
                        max: 2
                    },
                    SOL_s1: {
                        min: 0.80,
                        max: 2
                    }
                },

            };
            localStorage.setItem("setting", JSON.stringify(db));
            //debug("myDB - "+JSON.stringify(db));
            return JSON.parse(localStorage.getItem("setting"));
        };


        //console.log(myDB().symbol.ETH);
        //console.log(myDB().interval.s1);
        //console.log(myDB().strategy.BTC_s1);

        let setTimeDB = (s1, s5, s15) => {
            let time = {
                interval1: [],
                interval2: [],
                interval3: []
            };
            if (s1) {
                time.interval1.push(s1);
            }
            if (s5) {
                time.interval2.push(s5);
            }
            if (s15) {
                time.interval3.push(s15);
            }
            localStorage.setItem("settingTime", JSON.stringify(time));
        };
        //setTimeDB(1631196840000, null, null);

        let getTimeDB = () => {
            const p = JSON.parse(localStorage.getItem("settingTime"));
            return {
                s1: p.interval1[0],
                s5: p.interval2[0],
                s15: p.interval3[0]
            };
        }
        //console.log(getTimeDB().s1);
        // console.log(getTimeDB().s5);

        const timeUnix = () => { // 10:00:00 2021-08-16 --> 1629108000000
            const input = document.querySelector(".inputTime").value;
            debug(input);
            const unix = Date.parse(input);
            debug(unix);
            return unix;
        };
        const timeDate = () => {
            const time = new Date().toLocaleTimeString();
            const date = new Date().toISOString().slice(0, 10);
            document.querySelector(".inputTime").value = time.slice(0, 5) + " " + date;
            return time + " " + date;
        };
        const timer = async (time) => {
            let t = time,
                min, sec;
            let timerId = setInterval(function() {
                min = parseInt(t / 60, 10);
                sec = parseInt(t % 60, 10);
                min = min < 10 ? "0" + min : min;
                sec = sec < 10 ? "0" + sec : sec;
                debug(min + ":" + sec);
                document.querySelector(".min").textContent = min + ":" + sec;
                if (--t < 0) {
                    clearTimeout(timerId);
                    document.querySelector(".min").textContent = "";
                }
            }, 1000);
        };


        const getUrl = (symbol, interval, startTime) => {
            let url = new URL("https://api.binance.com/api/v1/klines"); // https://api.binance.com/api/v3/time
            url.searchParams.set("symbol", symbol); // + "USDT"
            url.searchParams.set("interval", interval + "m"); // parseInt('100m')
            url.searchParams.set("startTime", startTime);
            debug(url);
            return url;
        };

        const getProcent = (v1, v2) => {
            return (((v2 - v1) / Math.abs(v1)) * 100).toFixed(2);
        };

        const getError = (x) => {
            const audio = new Audio();
            audio.src = "error.mp3";
            audio.autoplay = true;
            const elem = document.querySelector(".logError");
            const data = document.createTextNode(x + ", ");
            elem.appendChild(data);
        };

        const getRequest = async (symbol, url) => {
            try {
                let xhr = await fetch(url);
                let xhrJson = await xhr.json();
                //debug(xhrJson);
                //console.log("fetch " + xhrJson[1][0]);
                await check(symbol, xhrJson);
                if (xhrJson.length > 2 || !xhrJson.length) {
                    getError("not correct url");
                    throw new Error("not correct url: " + xhrJson.length, xhr.status);
                }
                //await check(symbol, xhrJson);
            } catch (err) {
                console.log(err, err.message);
                getError("error internet");
            }

        };

        const check = (symbol, xhrJson) => {
            let firstPrice = xhrJson[0][1];
            let lastPrice = xhrJson[0][4];
            let procent = getProcent(firstPrice, lastPrice);
            setTimeDB(xhrJson[1][0], null, null);
            //addTable([setting("symbol"), procent(price[0][1], price[0][4]) + "%", "$" + price[0][1], setting("procent"), signal(procent(price[0][1], price[0][4])), timeDate()]);
            addTable([symbol, procent + "%", "$" + lastPrice, "-", signal(symbol, procent), timeDate()]);
            timer(60 * myDB().interval.s1);
            console.log(xhrJson);
        };

        const signal = (symbol, data) => {
            const s = symbol;
            const BUY = localStorage.getItem(s);
            localStorage.getItem(s);

            const lastBUY = (start, end) => {
                const currDate = new Date(start);
                const oldDate = new Date(end);
                const result = (oldDate - currDate) / 60000;
                return result.toFixed(0)
            };

            const strategyBUY = () => {
                if (s === myDB().BTC) {
                    return myDB().strategy.BTC_s1;
                }
                if (s === myDB().ETH) {
                    return myDB().strategy.ETH_s1;
                }
                if (s === myDB().SOL) {
                    return myDB().strategy.SOL_s1;
                }
            };

            const getRange = (start, num, end) => {
                return num > start && num < end
            };
            try {
                if (getRange(strategyBUY().min, data, strategyBUY().max)) {
                    console.log(s + " SIGNAL: " + data + ", Range: " + strategyBUY().max + ", 60 min = " + lastBUY(BUY, timeDate()) + " min");
                    if (lastBUY(BUY, timeDate()) >= 60) {
                        localStorage.setItem(s, timeDate());
                        //pushNotifications("Go", "BUY bitcoin");
                        soundNotification();
                        return "BUY";
                    }
                    return "no recommend";
                }
                if (data < -0.30) {
                    return "warning";

                } else {
                    return "---";
                }
            } catch (err) {
                console.log(err, err.message);
                getError("error signal");
            }
        };

        const addTable = async (data) => {
            const tbody = document.querySelector(".new_table");
            const tr = document.createElement("tr");
            tr.setAttribute("class", "new_tr");
            for (let i = 0; i < data.length; i++) {
                tr.appendChild(document.createElement("td")).appendChild(document.createTextNode(data[i]));
            }
            tbody.prepend(tr);
        };

        const soundNotification = () => {
            //const audio = document.querySelector(".audio");
            audio.play(); //    «audio» по id селектера
            document.onkeydown = function(event) {
                if (event.keyCode === 32) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    audio.pause();
                }
            };
            //const audio = new Audio();
            // audio.src = "alarm.mp3";
            //audio.autoplay = true; // Автоматически запускаем
        };
        const buttonClearStorage = () => {
            localStorage.clear();
            console.clear();
            document.querySelector(".logError").textContent = "Log: ";

            //localStorage.removeItem("startTime");
            //localStorage.removeItem("endTime");
        };
        const buttonOpenLink = (url) => {
            window.open(url, "_blank");
        };

       /*

        //Проверяет, не наступила ли дата после другой даты.

        const isAfterDate = (dateA, dateB) => dateA > dateB;
        isAfterDate(new Date(2010, 10, 21), new Date(2010, 10, 20)); // true

        const randomBoolean = () => Math.random() >= 0.5;
        //console.log(randomBoolean()); // true

            */
        const autoTime = () => {
            const inputTime = document.querySelector('.inputTime');
            let timerId = setInterval(function() {
                const time = new Date().toLocaleTimeString();
                const minute = Number(time.slice(4, 5));
                console.log(minute);
                const moment = Number(inputTime.value.slice(4, 5)) + 1;
                console.log(moment);
                if (minute === moment) {
                    //inputTime.value = timeDate();
                    console.log("good");
                    setTimeout(button1(), 2000);
                    clearInterval(timerId);
                } else {
                    console.log("bed");
                }
            }, 2000);
        };

        const button1 = () => {
            //let db = myDB();
            setTimeDB(timeUnix(), null, null);
            getRequest(myDB().BTC, getUrl(myDB().BTC, myDB().interval.s1, getTimeDB().s1));
            getRequest(myDB().ETH, getUrl(myDB().ETH, myDB().interval.s1, getTimeDB().s1));
            getRequest(myDB().SOL, getUrl(myDB().SOL, myDB().interval.s1, getTimeDB().s1));
            setInterval(function() {
                getRequest(myDB().BTC, getUrl(myDB().BTC, myDB().interval.s1, getTimeDB().s1));
                getRequest(myDB().ETH, getUrl(myDB().ETH, myDB().interval.s1, getTimeDB().s1));
                getRequest(myDB().SOL, getUrl(myDB().SOL, myDB().interval.s1, getTimeDB().s1));
            }, 60000 * myDB().interval.s1)
        };
        /*
        function goBTC() {

            getRequest(getUrl(myDB().symbol.BTC, myDB().interval.s1, getTimeDB().BTC));
            setInterval(function() {
            getRequest(getUrl(myDB().symbol.BTC, myDB().interval.s1, getTimeDB().BTC));
            }, 60000 * myDB().interval.s1)

        };
         function goSOL() {
            setTimeDB(null, null, timeUnix());
            getRequest(getUrl(myDB().symbol.SOL, myDB().interval.s1, getTimeDB().SOL));
            setInterval(function() {
            getRequest(getUrl(myDB().symbol.SOL, myDB().interval.s1, getTimeDB().SOL));
            }, 60000 * myDB().interval.s1)

        };
            */
        timeDate();