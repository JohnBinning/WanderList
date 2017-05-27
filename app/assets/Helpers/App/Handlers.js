export const handleDelete = (app, setBucketList, setListToLocal, id ) => {
  const newList = app.state.bucketList.filter( dream => {
    return dream.id !== id
  })
  setBucketList(newList, app)
  setListToLocal(newList)
}
