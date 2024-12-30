import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form"
import axios from 'axios'

const ArticleFrom = props => {
    const { register, handleSubmit, errors } = useForm()
    const testSubmit = data => {
        const formData = new FormData();
        formData.append('file', data.image[0]); // appending file
        formData.append('id', props.match.params.id); // appending file
        
        for (const [key, value] of Object.entries(data)) {
            key === 'image' ? formData.append(key, value[0].name) : formData.append(key, value)
        }
        console.log(data)
        axios.post(`http://${process.env.REACT_APP_HOST}:5000/articles/upload`, formData)
    }      
    return (
        <form className='admin-form' onSubmit={handleSubmit(testSubmit)}>
            <label htmlFor="fname">Title:</label>
            <input type="text" name="title" ref={register} value={props.item ? props.item.title : ''}></input>

            <label htmlFor="fname">Image:</label>
            <input type="file" name="image" ref={register} value={'test'}></input>

            <label htmlFor="fname">Date:</label>
            <input type='date' name='date' ref={register}></input>

            <label htmlFor="fname">Text:</label>
            <textarea name='text' type="text" rows='5' cols='50' ref={register}></textarea>

            <label htmlFor="fname">Event:</label>
            <input name='event' type="checkbox" checked={props.item ? props.item.event : false} ref={register}></input>

            <label htmlFor="fname">Aid:</label>
            <input name='aid' type="checkbox" checked={props.item ? props.item.aid : false} ref={register}></input>

            <label htmlFor="fname">Guest:</label>
            <input name='guest' type="checkbox" checked={props.item ? props.item.guest : false} ref={register}></input>

            <label htmlFor="fname">Project:</label>
            <input name='project' type="checkbox" checked={props.item ? props.item.project : false} ref={register}></input>

            <label htmlFor="fname">Home:</label>
            <input name='home' type="checkbox" checked={props.item ? props.item.home : false} ref={register}></input>

            <input type="submit" value="Save"></input>
        </form>
    )

}

const AdminItem = props => {


    const [item, setItem] = useState()

    const [article, setArticle] = useState()



    useEffect(() => {
        console.log(props.match.params)
        if (props.match.params.type === 'article')  {
            axios.get(`http://${process.env.REACT_APP_HOST}:5000/articles/id/${props.match.params.id}`)
            .then(response => {
                setItem(response.data)
                console.log(response.data)
            })

        }
    }, [])

          


    return(
        <div>            
            <div className='base__header'>

            </div>
            <div className='base__content'>
                <div className=''>
                       <ArticleFrom item={item}/>
                </div>
            </div>

        </div>
    )
}

export default AdminItem