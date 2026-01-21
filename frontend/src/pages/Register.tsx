import { useState } from 'react';
import { Box, Button, Input, Heading, VStack } from '@chakra-ui/react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const res = await api.post('/register', { email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/characters');
        } catch {
            alert(`Erreur lors de l'inscription`)
        }
    };

    return (
        <Box maxW="md" mx="auto" mt="20">
            <Heading mb="6">Inscription</Heading>
            <VStack spacing="4">
                <Input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input
                    placeholder='Mot de passe'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button colorScheme="teal" onClick={handleSubmit}>
                    S'inscrire
                </Button>
            </VStack>
        </Box>
    );
}