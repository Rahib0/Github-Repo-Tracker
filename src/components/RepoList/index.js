import React from 'react'
import { SingleRepo } from '..'
import './style.css';

export default function RepoList({ list }) {
    // const renderRepos = list.map( repo => {<SingleRepo repo={repo} />})
    return (
        <>
           <div>
                <section>
                    {list.map(( repo, n ) => <SingleRepo key={n} repo={repo} />)}
                </section>
           </div>   
        </>
    )
}
