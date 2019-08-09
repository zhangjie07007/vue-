import axios from 'axios'

let getcitylist = () =>axios({
    url:'/api/cityList',
    methods:'get'
})

let getplaying = () =>axios({
    url:'/api/movieOnInfoList?cityId=10',
    method:'get'
})

let getdail = (url) =>axios({
    url,
    method:'get'
})

let getcomesoon = () =>axios({
    url:'/api/movieComingList?cityId=10',
    method:'get'
})

let search = (kw) =>axios({
    url:`/api/searchList?cityId=10&kw=${kw}`,
    methods:'get'
})
export {
    getcitylist,
    getplaying,
    getdail,
    getcomesoon,
    search
}