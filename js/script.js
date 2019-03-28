window.addEventListener('DOMContentLoaded', function () {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');

        }

    }

    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }


        }


    });

    //Timer

    let deadline = '2019-1-21';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),


            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));


        return {

            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };

    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),

            timeInterval = setInterval(updateClock, 1000);


        function updateClock() {

            let t = getTimeRemaining(endtime);

            function addZero(num) {
                if (num <= 9) {
                    return '0' + num;
                } else {
                    return num
                }
            }
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);
            if (t.total <= 0) {
                clearInterval(timeInterval);

                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }




        }

    }

    setClock('timer', deadline);



    //Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });
    //Form

    let message = {
        loading: "Загрузка...",
        sucsess: "Спасибо! Скоро мы с Вами свяжемся!",
        failure: "Что-то пошло не так..."
    };

    let form = document.querySelector('.main-form'),
        formDown = document.querySelector('#form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');


    statusMessage.classList.add('status');

    function sendForm(elem) {

        elem.addEventListener('submit', function (event) {
            event.preventDefault();
            elem.appendChild(statusMessage);

            let formData = new FormData(elem);

            function postData() {
                return new Promise(function (resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

                    request.onreadystatechange = function () {
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState === 4) {
                            if (request.status == 200 && request.status < 300) {
                                resolve();
                            } else {
                                reject();
                            }
                        }
                    };

                    let obj = {};
                    formData.forEach(function (value, key) {
                        obj[key] = value;
                    });
                    let json = JSON.stringify(obj);
                    request.send(json);


                });
            }

            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }

            postData(formData)
                .then(() => statusMessage.innerHTML = message.loading)
                .then(() => statusMessage.innerHTML = message.sucsess)
                .catch(() => statusMessage.innerHTML = message.failure)
                .then(clearInput);
        });


    }

    sendForm(form);
    sendForm(formDown);


    //slider

    let slideIndex = 1, // это перемення отвечает за слайд который находится в текущий момент
        slides = document.querySelectorAll('.slider-item'), //взыввем наши слайдеры все
        prev = document.querySelectorAll('.prev'), //взыввем наши // cтрелочку крторая двигает слайдер назад
        next = document.querySelectorAll('.next'), //взыввем наши // cтрелочку крторая двигает слайдер вперед
        dotsWrap = document.querySelectorAll('.slider-dots'), //получаем обертку наших точек
        dots = document.querySelectorAll('.dot'); //получаем все точки которые будут использоваться
        
        showSlides(slideIndex);

    function showSlides(n) { //это функция будет принимать один аргумент для того чобы она переключала слайды

        if (n >slides.length) {// пишим условие для слайдов
            slideIndex = 1;//установливвем слайдер на 1
        }

        if (n < 1) {// пишим обратное условие
            slideIndex = slides.length;// если мы нажимаем стрелку назад на 1 слайде показывается последний слайд
        }
        slides.forEach((item) => item.style.display = 'none'); //1 способ каждому слайдеру передаём убрать дисплей
        //закомментировали после 10:50 for (let i = 0; i < clides.length; i++) { //2 способ каждому слайдеру передаём убрать дисплей
        //slides[i].style.display = 'none'; //2 способ каждому слайдеру передаём убрать дисплей
        //}
   
    dots.forEach((item) => item.classList.remove('dot-active')); // уберает классы dot-active  с точек
    
    slides[slideIndex - 1].style.display = 'block'; //показываем такой записью 1 слайд
    dots[slideIndex - 1].classList.add('dot-active');// показываем такой записью 1 точку
 }

function plusSlides(n) {//это функция меняет slideIndex для чтобы менять картинки в слайде
    showSlides(slideIndex += n);
}
 function currentSlaide(n) { //это функция прописывается чтобы узнать какой сейчас слайд стоит
    showSlides(slideIndex = n);
}

 prev.addEventListener('click', function() {//это пишется для кнопки перемещение назад
plusSlides(-1); 
});

next.addEventListener('click', function() {//это пишется для кнопки перемещение вперед
  plusSlides(1);
})
});