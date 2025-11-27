// LAB_6

function haversine(lat1, lon1, lat2, lon2) {
    const earth_radius = 6371;
    const degToRad = (deg) => deg * (Math.PI / 180);
    
    const lat1Rad = degToRad(lat1);
    const lat2Rad = degToRad(lat2);
    const deltaLat = degToRad(lat2 - lat1);
    const deltaLon = degToRad(lon2 - lon1);
    
    const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
              Math.cos(lat1Rad) *    Math.cos(lat2Rad) *
              Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    return earth_radius * c;
}



document.addEventListener('DOMContentLoaded', function(){

    //ЗАДАНИЕ 1
    hero_header = document.getElementById("hero_header")
    if (hero_header){
        console.log(hero_header.innerText)
    }

    //ЗАДАНИЕ 2
    time_button = document.getElementById("time_button")
    if (time_button){
        time_button.addEventListener('click', function(){
            alert(Date())
        })
    }

    //ЗАДАНИЕ 3
    contact_submit = document.getElementById("contact_submit")
    contact_form = document.getElementById("contact_form")
    if (contact_form){
        formData = new FormData(contact_form)

        contact_submit.addEventListener('click', function(event){
            event.preventDefault()
            formData.entries().forEach(element => {
                localStorage.setItem(element[0], element[1])
            });

            contact_form.innerHTML = "Форма успешно отправлена"
        })

        is_has_info = true
        
        formData.entries().forEach(element => {
            item = localStorage.getItem(element[0])
            if (!item){
                is_has_info = false
            }
        });

        if (is_has_info){
            username = localStorage.getItem("name")
            p = document.createElement('p')
            p.innerHTML = `Добрый день, ${username}. С вами свяжутся`
            contact_form.before(p)
        }
    }
    // ЗАДАНИЕ 4

    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords)
        corp_lat = 56.32676
        corp_lon = 44.02596
        cur_lat = position.coords.latitude
        cur_lon = position.coords.longitude
        
        distance = haversine(cur_lat, cur_lon, corp_lat, corp_lon)

        distance_button = document.getElementById('distance_button')

        if (distance_button){
            distance_button.addEventListener('click', function(){
                alert(`Дистанция до 1 корпуса НГТУ: ${Math.floor(distance)} км.`)
            })
        }
    })

    // ЗАДАНИЕ 6
    article_section = document.getElementById('article_section')
    if (article_section){
        fetch("./public/articles.json").then((res) => {
            res.json().then((data) => {
                articles = data['articles']
                articles.forEach((article_content) => {
                    article = document.createElement('article')
                    h2 = document.createElement('h3')
                    p = document.createElement('p')
                    h2.innerText = article_content.title
                    p.innerHTML = article_content.text
                    article.append(h2, p)
                    
                    article.classList.add("flex", "ai-center", "article")
                    h2.classList.add("f-bel", "l-sp05", "article_h2")
                    p.classList.add("f-rub", "article__container,")
                    
                    article_section.append(article)
                })

                // ЗАДАНИЕ 5
                video = document.getElementById("forge_video")
                if (video){
                    play_button = document.getElementById("play_button")
                    back_button = document.getElementById("back_button")
                    forward_button = document.getElementById("forward_button")
        
                    play_button.addEventListener('click', () =>{
                        if (video.paused) {
                            video.play()
                            play_button.textContent = "Пауза"
                        }
                        else {
                            video.pause()
                            play_button.textContent = "Пуск"
                        }
                    })
        
                    back_button.addEventListener('click', () => {
                        video.currentTime -= 5
                    })
        
                    forward_button.addEventListener('click', () => {
                        video.currentTime += 5
                    })
                }
                audio = document.getElementById("forge_audio")
                if (audio){
                    a_play_button = document.getElementById("a_play_button")
                    a_back_button = document.getElementById("a_back_button")
                    a_forward_button = document.getElementById("a_forward_button")

                    a_play_button.addEventListener('click', () =>{
                        if (audio.paused) {
                            audio.play()
                            a_play_button.textContent = "Пауза"
                        }
                        else {
                            audio.pause()
                            a_play_button.textContent = "Пуск"
                        }
                    })
        
                    a_back_button.addEventListener('click', () => {
                        audio.currentTime -= 5
                    })
        
                    a_forward_button.addEventListener('click', () => {
                        audio.currentTime += 5
                    })
                    
                }
                })
            })
        }
    


    burger_button = document.getElementById("burger_button")
    menu = document.getElementById("header_buttons")

    if (menu){
        burger_button.addEventListener('click', function(){        
            menu.classList.toggle("menu_active")
        })
    }

    window.addEventListener('resize', function(){
        if (window.innerWidth >= 768){
            menu.classList.remove("menu_active")
        }
    })



})

