import React, { useState, useEffect } from 'react';
import { UserSearchForm, RepoList, NavigationButtons } from './components'
import axios from 'axios'
import './styles/app.css';

function App() {
	const [ username, setUsername ] = useState('')
	const [ repoList, setRepoList ] = useState([])
	const [ loading, setLoading ] = useState(false)
	const [ warning, setWarning ] = useState(false)
	const [ currentPage, setCurrentPage ] = useState(1)
	const [ nextPage, setNextPage ] = useState(false)
	const [ name, setName ] = useState('')

	useEffect(() => {
		if (!username) return
		if (username !== name) {setCurrentPage(1)}
		setName('')
		setWarning(false)
		setNextPage(false)
		setLoading(true)
		axios.get(`https://api.github.com/users/${username}/repos?page=${currentPage}`)
		.then(res => {
			console.log(res.data)
			function SelectProps(repo) {
				const { name, html_url, description, forks_count, stargazers_count, watchers_count } = repo
				return { name, html_url, description, forks_count, stargazers_count, watchers_count }
			}
			setName(res.data[0].owner.login)
			setRepoList(res.data.map(SelectProps))
			
			axios.get(`https://api.github.com/users/${username}/repos?page=${currentPage+1}`)
			.then(res => {
				console.log(res.data.length)
				if (res.data.length > 0) {setNextPage(true)}
			}).catch(err => {
				setNextPage(false)})
			setLoading(false)})
		.catch(err => {
			setRepoList([])
			setLoading(false)
			setWarning(true)})
		}, [username, currentPage])



	const getResult = (search) => {
		setUsername(search.toLowerCase())
	}

	return (
		<>
			{console.log(loading, warning, currentPage, nextPage, name, username, repoList)}
			<h1>Github Repo Finder</h1>
			<UserSearchForm getResult={getResult} />
			
			{loading? <></> : 
			repoList.length > 0 && <p>Current Page: {currentPage}</p>}
			{loading ? <></> :
			repoList.length > 0 && <NavigationButtons currentPage={currentPage} nextPage={nextPage} setCurrentPage={setCurrentPage} />}
			
			{!loading && <h2>{name}</h2>}
			{loading ? <p className='center'>loading...</p> : <RepoList list={repoList} />}
			{warning && <p className='center'>Error! :(</p>}
			
			{loading ? <></> :
			repoList.length > 0 && <NavigationButtons currentPage={currentPage} nextPage={nextPage} setCurrentPage={setCurrentPage} />}
			{loading? <></> : 
			repoList.length > 0 && <p>Current Page: {currentPage}</p>}
		</>
	)
}

export default App;
