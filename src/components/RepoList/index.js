import React from 'react'
import { SingleRepo } from '..'
import './style.css';

export default function RepoList({ list }) {
    // console.log(list)
    return (
        <>
           <div className='flex-container'>
                <section>
                    {list.map(( repo, n ) => <SingleRepo key={n} repo={repo} />)}
                </section>
           </div>   
        </>
    )
}
