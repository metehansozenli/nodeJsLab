// önce puzzele için fetch yap
// console.log("Client side JavaScript loaded");

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);

//     });
// });


// fetch('http://localhost:3000/weather?address=tokat').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// });


// fetch('http://localhost:3000/weather?address=ankara').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             return console.log(data.error);
//         }else{
//             console.log("Address:", data.address);
//             console.log("Forecast:", data.forecast);
//         }
//     });
// });


// //uygulama 2 
// const weatherForm = document.querySelector('form');
// weatherForm.addEventListener('submit', (e) => {
//     e.preventDefault()
//     console.log("Test...");
// });


// //uygulama 3 
// const weatherForm = document.querySelector('form');
// const weatherInput = document.querySelector('input');
// weatherForm.addEventListener('submit', (e) => {
//     e.preventDefault() // sayfanın yenilenmesini engeller

//     fetch('http://localhost:3000/weather?address='+ weatherInput.value).then((response) => {
//     response.json().then((data) => {
//         // console.log(data);
//         if (data.error) {
//             return console.log(data.error);
//         }else{
//             console.log("Konum:", data.address);
//             console.log("Sıcaklık:", data.forecast);
//         }
//     });
// });
// });

//uygulama 4 
const weatherForm = document.querySelector('form');
const weatherInput = document.querySelector('input');
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');
const p3 = document.querySelector('#p3');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() 

    fetch('/weather?address='+ weatherInput.value).then((response) => {
    response.json().then((data) => {
        // console.log(data);
        if (data.error) {
            p1.textContent = data.error;
        }else{
            console.log("Konum:", data.address);
            console.log("Sıcaklık:", data.forecast);
            console.log("Yağış:", data);
            p1.textContent = data.address;
            p2.textContent = "Hava " + data.forecast + " derecedir.";
            if(data.pericipitation == 0){
                p3.textContent = "Yağış olmayacak";
            }
            else if(data.pericipitation < 10){
                p3.textContent = "Hafif yağış bekleniyor";
            }
            else if(data.pericipitation < 25){
                p3.textContent = "Orta yağış bekleniyor";
            }
            else if(data.pericipitation < 50){
                p3.textContent = "Şiddetli yağış bekleniyor";
            }
            else if(data.pericipitation < 100){
                p3.textContent = "Aşırı yağış bekleniyor";
            }
            else{
                p3.textContent = "Fırtına bekleniyor";
            }
        }
    });
});
});
