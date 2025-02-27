import { useState } from 'react'
import gitLogo from '../assets/githubLogo.png'
import Input from '../components/Input'
import ItemRepo from '../components/ItemRepo'
import { Container } from './styles'
import Button from '../components/Button'
import { api } from '../services/api'

function App() {
    const [currentRepo, setCurrentRepo] = useState('')
    const [repos, setRepos] = useState([])

    const handleSearchRepo = async () => {
        try {
            const { data } = await api.get(`repos/${currentRepo}`)

            if (data) {
                if (repos.find(repo => repo.id === data.id)) return
                setRepos(prev => [...prev, data])
                setCurrentRepo('')
                return
            }
        } catch (e) {
            alert('Repositório não encontrado')
        }
    }

    const handleRemoveRepo = id => {
        setRepos(repos.filter(repo => repo.id !== id))
    }

    return (
        <Container>
            <img src={gitLogo} width={72} height={72} alt="Github Logo" />
            <Input
                value={currentRepo}
                onChange={e => setCurrentRepo(e.target.value)}
            />
            <Button onClick={handleSearchRepo} />
            {repos.map(repo => (
                <ItemRepo
                    key={repo.id}
                    repo={repo}
                    handleRemove={() => handleRemoveRepo(repo.id)}
                />
            ))}
        </Container>
    )
}

export default App
