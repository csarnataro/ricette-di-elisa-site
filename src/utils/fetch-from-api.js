const checkStatus = response => {
  if (response.status < 200 || response.status > 299) {
    throw Error(response.statusText)
  }
  return response
}

const getJson = response => response.json()

const identity = a => a

const fetchFromApi = (url, fieldSelector, callback) => {
  return fetch(url)
    .then(checkStatus)
    .then(getJson)
    .then(fieldSelector || identity)
    .then(callback)
    .catch(error => {
      throw error
    })
}

export default fetchFromApi
