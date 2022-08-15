import React from 'react'
import { useState } from 'react'
import Loading from './Loading';
function Form() {
    const [link, setlink] = useState("");
    const [loading, setloading] = useState(false);
    
    const changeHandler = (e) => {
        setlink(e.target.value);
    }
    const handleSubmit = async() => {
        //handeling api from RAPID API
        let vedio_id = "";
        for(let i = link.length - 1;i>=0;--i){
            if(link[i] === '/' || link[i] === '=')break;
            vedio_id = link[i] + vedio_id;
        }
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'ce03afadcfmsh3689f792a5e5afbp16ca32jsne2da39ea2fca',
                'X-RapidAPI-Host': 'youtube-mp3-download1.p.rapidapi.com',
                'id':vedio_id
            }
        };
        setloading(true);
        const resp = await fetch(`https://youtube-mp3-download1.p.rapidapi.com/dl?id=${vedio_id}`, options);
        const data = await resp.json();
        setloading(false);
        window.open(data.link, "_self");
        setlink("");
    }
    return (
        <>
            <div>
                <div className="input-group mb-3 my-3">
                    <input value={link} onChange={changeHandler} type="text" className="form-control" placeholder="Enter YouTube Vedio Link" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <br />
                    <button className="btn btn-outline-secondary" onClick={handleSubmit} type="button" id="button-addon2">Submit</button>
                </div>
                <br />
                {
                    loading?<Loading/>:<p></p>
                }
            </div>
        </>
    )
}

export default Form