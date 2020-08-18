import axios from 'axios'
import {
    urlbase,
    getHeader,
    getHeaderFile
} from './../config/config'


export function http() {
    return axios.create({
        baseURL: urlbase,
        headers: getHeader()
    })
}


export function httpFile() {
    return axios.create({
        baseURL: urlbase,
        headers: getHeaderFile()
    })
}