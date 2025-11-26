// LAB_6


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
        console.log(position)
    })
})


