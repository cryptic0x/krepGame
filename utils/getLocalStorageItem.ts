export const getLocalStorageItem = (object: any, key: any) => {
  const localStorageObject = localStorage.getItem(object)

  if (localStorageObject) {
    const json = JSON.parse(localStorageObject)

    return json[key] as string
  }

  return 'no data'
}
