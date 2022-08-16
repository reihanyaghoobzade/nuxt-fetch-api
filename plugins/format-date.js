import Vue from 'vue'
import toPersianNumber from './to-persian-number.js'

const date = (value) => {
    return formatDate(value)
}

function formatDate(value) {
    const createdTime = {
        now: new Date(),
        created: new Date(value),
    }
    const createdAt = (createdTime.now - createdTime.created) / 1000
    if (createdAt < 60) return 'چند ثانیه'
    else if (createdAt >= 60 && createdAt < 3600)
        return `${toPersianNumber(Math.floor(createdAt / 60))} دقیقه`
    else if (createdAt >= 3600 && createdAt < 86400)
        return `${toPersianNumber(Math.floor(createdAt / 3600))} ساعت`
    else return `${toPersianNumber(Math.floor(createdAt / 86400))} روز`
}

Vue.filter('date', date)
