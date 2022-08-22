export default async function fetchData(axios, query) {
    let result = '&' + new URLSearchParams(query).toString()

    result.includes('&q') && (result = result.replace('&q', '&search_phrase'))
    result.includes('&rams') && (result = result.replace('&rams', '&ram_values'))
    result.includes('-') && (result = result.replace('-', '_'))

    try {
        const response = await axios.$get('?limit=12&page=1' + result)
        return { response, result }
    } catch (error) {
        console.error(error)
    }
}