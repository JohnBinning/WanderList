export const getListFromLocal = () => {
  let localData = localStorage.getItem('list')
  const setData = localData !== null ? JSON.parse(localData) : ''
  return setData
}

export const setListToLocal = (list=null) => {
  localStorage.setItem('list', JSON.stringify(list))
}
