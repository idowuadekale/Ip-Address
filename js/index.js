/* ////////////////  LINK CHALLENGE ///////////////// 


https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0/hub/ip-address-tracker-Tgztko4ioL



*/

const button = document.querySelector('.input__button');
const ipNew = document.getElementById('ip');
const locationNew = document.getElementById('location');
const timezoneNew = document.getElementById('timezone');
const ispNew = document.getElementById('isp');


function mapping(lat, lng) {

    var map = L.map('map').setView([lat, lng], 13);

    L.tileLayer('https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=81ecc8d7a8a74abb89beefa1d3d6ec62', {
        maxZoom: 19,
        attribution: '© ThunderForest'
    }).addTo(map);

    var myIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/128/561/561176.png',
        iconSize: [50, 50],
        iconAnchor: [22, 50],

    });

    var marker = L.marker([lat, lng], { icon: myIcon }).addTo(map);

}


function getGeo() {
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_wMwUAkh4db2c0FkDdg6oYVXTdjMGx`)
        .then((response) => {
            return response.json();
        })
        .then(data => {
            const lat = data.location.lat;
            const lng = data.location.lng;

            ipNew.innerHTML = data.ip;
            locationNew.innerHTML = data.location.city + ', ' + data.location.country;
            timezoneNew.innerHTML = `UTC ${data.location.timezone}`;
            ispNew.innerHTML = data.isp;

            mapping(lat, lng);


        })
        .catch(error => console.log(error));
}

getGeo()




function searchGeoLocation() {
    const form = document.querySelector('.form__container');
    const input = document.querySelector('.input__text');



    form.addEventListener('submit', function(e) {
        e.preventDefault();







        const regexp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

        if (!regexp.test(input.value)) {
            alert('Input a Valid IP Address');
            input.value = '';
            return;
        }

        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_wMwUAkh4db2c0FkDdg6oYVXTdjMGx&ipAddress=${input.value}`)
            .then((response) => {

                return response.json();
            })
            .then(res => {


                ipNew.innerHTML = res.ip;
                locationNew.innerHTML = res.location.city + ', ' + res.location.country;
                timezoneNew.innerHTML = `UTC ${res.location.timezone}`;
                ispNew.innerHTML = res.isp;

                const lat = res.location.lat;
                const lng = res.location.lng;

                var newMapGeo = L.DomUtil.get('map');
                if (newMapGeo != null) {
                    newMapGeo._leaflet_id = null;
                }


                mapping(lat, lng);

            })
            .catch(error => console.log(error));


    });


}

//button.addEventListener('click', getGeoLocation());