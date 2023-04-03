import axios from "axios"

async function getCookieFromUrl(URL) {
    const cookie = await axios.get(URL, {
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xmlq=0.9,image/avif,image/webp,image/apng,*/*q=0.8,application/signed-exchangev=b3q=0.7',
            'Accept-Language': 'es-AR,esq=0.9,en-USq=0.8,enq=0.7,ko-KRq=0.6,koq=0.5,es-419q=0.4,zh-CNq=0.3,zhq=0.2,laq=0.1,glq=0.1,frq=0.1',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'DNT': '1',
            'Pragma': 'no-cache',
            'Upgrade-Insecure-Requests': '1'
        }
    })

    return cookie.headers['set-cookie']
}

function parseCookies(cookies) {
    const cookieOptions = {}

    cookies.forEach(cookieStr => {
        const [cookie, ...optionsArr] = cookieStr.split(' ')

        const [name, value] = cookie.split('=')
        cookieOptions[name] = { value }

        optionsArr.forEach(optionStr => {
            const [key, val] = optionStr.split('=')
            cookieOptions[name][key] = val
        })
    })

    return cookieOptions
}

export { getCookieFromUrl, parseCookies }
