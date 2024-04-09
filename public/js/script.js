const cardList = [{
    title: "Flowers",
    image: "images/flowers.webp",
    link: "Beautiful flowers",
    desciption: "Flowers in a vase",
    size: "medium"
},
{
    title: "Flowers 2",
    image: "images/pink.webp", 
    link: "Beautiful flowers",
    desciption: "Pink Flowers in a vase",
    size: "small"
}]

const clickMe = () => {
    $('#modal1').modal('open');
}

const submitForm = () => {
    let formData = {};
    formData.first_name = $('#first_name').val();
    formData.last_name = $('#last_name').val();
    formData.password = $('#password').val();
    formData.email = $('#email').val();

    var xhr = new XMLHttpRequest();
    var url = "http://localhost:3000/api/flower";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json);
        }
    };
    var data = JSON.stringify(formData);
    xhr.send(data);

    console.log("Form Data Submitted: ", formData);
}

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">' 
        + '<div class="card '+item.size+' "><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' 
        + item.image + '">' 
        + '</div><div class="card-content">' 
        + '<span class="card-title activator grey-text text-darken-4">' 
        + item.title + '<i class="material-icons right">click here</i></span><p><a href="#">' 
        + item.link + '</a></p></div>' + '<div class="card-reveal">' 
        + '<span class="card-title grey-text text-darken-4">' 
        + item.title 
        + '<i class="material-icons right">close</i></span>' 
        + '<p class="card-text">' + item.desciption + '</p>' 
        + '</div></div></div>';
        $(".card-section").append(itemToAppend)
    });
}
 //added
$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        submitForm();
    });
    $('#clickMeButton').click(() => {
        clickMe();
    });
    addCards(cardList);
    $('.modal').modal();
});
//added
const getcards = () => {
    $.get('/api/cards', (response) => {
    if(response.statusCode==200){
        addCards (response.data)
    }
    })
    }