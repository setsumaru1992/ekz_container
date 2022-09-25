const SMART_PHONE_DEVICE = "SMART_PHONE_DEVICE"
const TABLET_DEVICE = "TABLET_DEVICE"
const PC_DEVICE = "PC_DEVICE"

export function isSmartPhone(){
  return device() == SMART_PHONE_DEVICE
}

function device(){
  const ua = navigator.userAgent;
  if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
    return SMART_PHONE_DEVICE
  } else if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0){
    return TABLET_DEVICE
  } else {
    return PC_DEVICE
  }
}