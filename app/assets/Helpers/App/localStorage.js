export const getListFromLocal = () => {
  let localData = localStorage.getItem('list')
  const setData = localData !== null ? JSON.parse(localData) : ''
  return setData
}

export const setListToLocal = (list=null) => {
  console.log('local');
  localStorage.setItem('list', JSON.stringify(list))
}
