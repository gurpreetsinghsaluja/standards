
var u_list = document.querySelector('ul');

fetch('/upload').then(response => response.json()).then(data => {
    json_array = data.standards;
    for (let i = 0; i < json_array.length; i++) {
        var terms = json_array[i];
        var list_element = document.createElement('li');
        var button = document.createElement('button');
        var span = document.createElement('span');
        var url = document.createElement('a')
        var meter = document.createElement('meter');
        button.innerHTML = terms.term;
        button.setAttribute('class', 'button');
        list_element.appendChild(button);
        span.setAttribute("contenteditable", "true");
        span.innerHTML = terms.description;
        list_element.appendChild(span);
        url.setAttribute('href', terms.URL_citation);
        url.innerHTML = "url";
        list_element.appendChild(url);
        meter.setAttribute("min", "0");
        meter.setAttribute("max", "5");
        meter.setAttribute("value", terms.difficulty);
        list_element.appendChild(meter);
        u_list.appendChild(list_element);
    }

    var buttons = document.querySelectorAll('.button');
    var meters = document.querySelectorAll('meter')
    var spans = document.querySelectorAll('span');
    var urls = document.querySelectorAll('a');
    var refresh_button = document.querySelector('#ref');

    refresh_button.addEventListener("click", function() {
        window.location.reload();
    })
    for (let i = 0; i < buttons.length; i++) {  
        
        buttons[i].addEventListener("click", function() {
            let difficulty_no = meters[i].getAttribute("value");
            difficulty_no = parseInt(difficulty_no);
            if (difficulty_no == 5) {
                difficulty_no = 0
            }
            else { 
            difficulty_no += 1 
            }
            meters[i].setAttribute("value", difficulty_no)

            var description = spans[i].innerHTML;
            var term = buttons[i].innerHTML;
            var difficulty = meters[i].getAttribute("value");
            var url_citation = urls[i].getAttribute("href");

            fetch('/mod', {
               method: "POST",
               headers: {
                   'Accept': 'application/json, text/plain, */*',
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                   "standards" : [{
                       term : term,
                       description : description,
                       URL_citation: url_citation,
                       difficulty: difficulty
                   }]
               })
           });

            });

        // task 3
        spans[i].addEventListener('focusout', function() {
             var description = spans[i].innerHTML;
             var term = buttons[i].innerHTML;
             var difficulty = meters[i].getAttribute("value");
             var url_citation = urls[i].getAttribute("href");

             fetch('/mod', {
                method: "POST",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "standards" : [{
                        term : term,
                        description : description,
                        URL_citation: url_citation,
                        difficulty: difficulty
                    }]
                })
            });

        });
    }
});
