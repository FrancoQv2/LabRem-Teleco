import axios from "axios"

import { getCookieFromUrl, parseCookies } from "./cookies.js";

const URL_BULLET = process.env.URL_BULLET
const BULLET_USER = process.env.BULLET_USER
const BULLET_PASS = process.env.BULLET_PASS

async function getSessionId() {
    const cookies = await getCookieFromUrl(`${URL_BULLET}/login.cgi`)
    const cookieOptions = parseCookies(cookies)

    return cookieOptions.AIROS_SESSIONID.value.slice(0, -1)
}

async function postLoginBullet(sessionId) {
    const response = await axios.post(
        `${URL_BULLET}/login.cgi`,
        `------WebKitFormBoundaryqYfiq6G7GDG2PDLp\r\nContent-Disposition: form-data; name="uri"\r\n\r\n\r\n------WebKitFormBoundaryqYfiq6G7GDG2PDLp\r\nContent-Disposition: form-data; name="username"\r\n\r\n${BULLET_USER}\r\n------WebKitFormBoundaryqYfiq6G7GDG2PDLp\r\nContent-Disposition: form-data; name="password"\r\n\r\n${BULLET_PASS}\r\n------WebKitFormBoundaryqYfiq6G7GDG2PDLp\r\nContent-Disposition: form-data; name="Submit"\r\n\r\nLogin\r\n------WebKitFormBoundaryqYfiq6G7GDG2PDLp--\r\n`,
        {
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Language': 'es-AR,es;q=0.9,en-US;q=0.8,en;q=0.7,ko-KR;q=0.6,ko;q=0.5,es-419;q=0.4,zh-CN;q=0.3,zh;q=0.2,la;q=0.1,gl;q=0.1,fr;q=0.1',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryqYfiq6G7GDG2PDLp',
                'Cookie': `AIROS_SESSIONID=${sessionId}; ui_language=en_US`,
                'DNT': '1',
                'Pragma': 'no-cache',
                'Upgrade-Insecure-Requests': '1'
            }
        }
    )

    return response
}

async function getStatsBullet() {
    const sessionId = await getSessionId()
    // const resLogin = await postLoginBullet(sessionId)
    await postLoginBullet(sessionId)

    const { data: statsBullet } = await axios.get(`${URL_BULLET}/status.cgi`, {
        headers: {
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate',
            'X-Requested-With': 'XMLHttpRequest',
            'Connection': 'keep-alive',
            'Cookie': `AIROS_SESSIONID=${sessionId}; ui_language=en_US`
        }
    })

    // console.log("--------getStatsBullet()--------");
    // console.log(data);
    // console.log("--------------------------------");

    return statsBullet
}

export { getStatsBullet, getSessionId }
