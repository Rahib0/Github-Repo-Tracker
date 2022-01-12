import React, { useState, useEffect } from 'react';
import { UserSearchForm, RepoList, SingleRepo } from './components'
import axios from 'axios'
import './styles/app.css';

function App() {

	const [ username, setUsername ] = useState('')
	const [ repoList, setRepoList ] = useState([])
	const [ loading, setLoading ] = useState(false)

	useEffect(() => {
		if (!username) return
		setLoading(true)
		axios.get(`https://api.github.com/users/${username}/repos`).then(res => {
		console.log(res.data)	
		function SelectProps(repo) {
			const { name, html_url, description, forks_count, stargazers_count, watchers_count } = repo
			return { name, html_url, description, forks_count, stargazers_count, watchers_count }
		}
		setLoading(false)
		setRepoList(res.data.map(SelectProps))
		console.log(repoList)
	}) 
	}, [username])

	const getResult = (search) => {
		setUsername(search)
	}

	return (
		<>
			<h1>Github Repo Finder</h1>
			<UserSearchForm getResult={getResult} />
			{loading ? <p className='loading'>loading...</p> : <RepoList list={repoList} />}
		</>
	)
}

export default App;
