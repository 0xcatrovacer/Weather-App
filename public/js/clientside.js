const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const msgOne = document.querySelector('#msg-one')
const msgTwo = document.querySelector('#msg-two')

msgOne.textContent = ''
msgTwo.textContent = ''


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
        const location = search.value
        fetch('/weather?address=' + location).then((res) => {
            res.json().then((data) => {
                if (data.error) {
                    msgOne.textContent = 'Cannot find Location. Please Enter valid Location'
                    msgTwo.textContent = ''
                }
                else {
                    msgOne.innerHTML = data.Location
                    msgTwo.innerHTML = data.Weather
                }
            })
        })
    }
)

