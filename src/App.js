import React, { useState, useEffect } from 'react';
import { UserSearchForm, RepoList } from './components'
import axios from 'axios'
import './styles/app.css';

function App() {

	const [ username, setUsername ] = useState('')
	const [ repoList, setRepoList ] = useState([])
	const [ loading, setLoading ] = useState(false)
	const [ warning, setWarning ] = useState(false)

	useEffect(() => {
		if (!username) return
		setWarning(false)
		setLoading(true)
		axios.get(`https://api.github.com/users/${username}/repos`).then(res => {
			function SelectProps(repo) {
				const { name, html_url, description, forks_count, stargazers_count, watchers_count } = repo
				return { name, html_url, description, forks_count, stargazers_count, watchers_count }
			}
			setLoading(false)
			setRepoList(res.data.map(SelectProps))})
		.catch(err => {
			setRepoList([])
			setLoading(false)
			setWarning(true)})
	}, [username])

	const getResult = (search) => {
		setUsername(search)
	}

	return (
		<>
			<h1>Github Repo Finder</h1>
			<UserSearchForm getResult={getResult} />
			{loading ? <p className='center'>loading...</p> : <RepoList list={repoList} />}
			{warning && <p className='center'>Error! Username not found :(</p>}
		</>
	)
}

export default App;
