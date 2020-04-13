export function exist(value){
  if(value === null) return false
  if(value === undefined) return false
  if(value === "") return false
  return true
}