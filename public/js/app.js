const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather/?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error
        } else {
            console.log(data)
            messageOne.textContent = data.location
            const weatherdesc = 'It is ' + data.forecast.temperature + ' degrees out. But it feels like ' + data.forecast.feelslike + '.'
            messageTwo.textContent = weatherdesc
        }
    })
})
})