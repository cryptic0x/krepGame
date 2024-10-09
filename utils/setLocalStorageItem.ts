export const setLocalStorageItem = (object: any, key: any, value: any) => {
  if (localStorage.getItem(object) === null) {
    localStorage.setItem(object, JSON.stringify({}))
  } else {
    const localStorageObject = localStorage.getItem(object)

    if (localStorageObject) {
      const parsedLocalStorageObject = JSON.parse(localStorageObject)
      parsedLocalStorageObject[key] = value
      localStorage.setItem(object, JSON.stringify(parsedLocalStorageObject))
    }
  }
}
