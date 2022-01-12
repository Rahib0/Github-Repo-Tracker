import React, { useState } from 'react'
import './style.css';

export default function UserSearchForm({ getResult }) {
    const [ input, setInput ] = useState("") 
    
    function handleChange(e){
        let newInput = e.target.value
        setInput(newInput)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        getResult(input)
        setInput('')
    }
    
    return (
        <form onSubmit={ handleSubmit }>
            <input type="text" placeholder='Enter Github Username' value={input} onChange={handleChange}></input>
            <input type='submit' value='Search' />
        </form>
    )
}
