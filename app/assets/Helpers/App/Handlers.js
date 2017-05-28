import { setListToLocal } from './localStorage'
import { setBucketList } from './AppState'

export const handleDelete = (app, id ) => {
  const newList = app.state.bucketList.filter( dream => {
    return dream.id !== id
  })
  setBucketList(newList, app)
  setListToLocal(newList)
}

export const generateId = () => Date.now()

export const handleComplete = (app, id) => {
  const newList = [...app.state.bucketList]
  const foundItem = newList.forEach( dream => {
    if (dream.id == id) {
      dream.completed = !dream.completed
    }

  setBucketList(newList, app)
  setListToLocal(newList)
  })
}
