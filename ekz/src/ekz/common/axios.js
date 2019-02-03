import axios from 'axios'
import { BOKMA_API_ROOT } from './const'

const axiosConfig = {
  baseURL: BOKMA_API_ROOT,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  responseType: 'json'
}

export default axios.create(axiosConfig)