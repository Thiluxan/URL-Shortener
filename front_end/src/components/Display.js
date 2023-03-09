import React, {useState} from 'react'
import UrlService from '../services/UrlService'

export default function Display() {
    const [longUrl, setLongUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('')

    const getTrimmedUrl = (e) => {
        e.preventDefault()
        UrlService.getTrimmedUrl(longUrl)
        .then(res => {
            console.log(res)
            setShortUrl(res.data.short_url)
        })
        .catch(err => console.log(err))
    }
    return (
        <div>
            Long Url: 
            <input type="text" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} />
            <br/>
            <button onClick={getTrimmedUrl}>Get Short URL</button>
            <br />
            Short Url:
            <input type="text" value={shortUrl} />
        </div>
    )
}
