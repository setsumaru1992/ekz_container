export function patch(x = {}, y = {}){
  return Object.assign({}, x, y)
}

export function updateObject(existing_obj, key, value) {
  /*
  reduxでstateの変更を検知するにはstate直下のプロパティのメモリ番地を変える必要があるため、
  プロパティ内のオブジェクトの中身を変更する場合は新しいオブジェクトで書き換える必要がある
  https://blog.mitsuruog.info/2018/02/why-is-immutability-required-by-redux
   */
  let newObj = {}
  newObj[key] = value
  return patch(existing_obj, newObj)
}

export function toggleObjValue(existing_obj, key) {
  return updateObject(existing_obj, key, !existing_obj[key])
}