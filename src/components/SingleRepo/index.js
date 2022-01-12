import React from 'react'
import './style.css';



export default function SingleRepo({ repo }) {
    const description = repo.description || ''
    return (
        <div className='container'>
            <div className ='card'>
                <h1 role='title'>{repo.name}</h1>
                <p role='description'>{description }</p>
                <a href={repo.html_url}><button role='button'>Click here to see on Git</button></a>
                <p role='stargazers_count'>Stargazers: {repo.stargazers_count}</p>
                <p role='watchers_count'>Watchers: {repo.watchers_count}</p>
            </div>
        </div>
    )
}
