import { useEffect, useState } from 'react';
import { Box, Button, Input, VStack, Heading, HStack } from '@chakra-ui/react';
import api from '../services/api';

type Character = {
    id: number;
    name: string;
    race: string;
    class: string;
    level: number;
};

export default function Character() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [name, setName] = useState('');
    const [race, setRace] = useState('');
    const [charClass, setCharClass] = useState('');
    const [level, setLevel] = useState(1);

    const loadCharacters = async () => {
        const res = await api.get('/characters');
        setCharacters(res.data);
    };

    useEffect(() => {
        loadCharacters();
    }, []);

    const createCharacter = async () => {
        await api.post('/characters', { name, race, class: charClass, level });
        setName('');
        setRace('');
        setCharClass('');
        setLevel(1);
        loadCharacters();
    };

    const deleteCharacter = async (id: number) => {
        await api.delete(`/characters/${id}`);
        loadCharacters();
    };

    return (
        <Box maxW="lg" mx="auto" mt="10">
            <Heading mb="4">Mes Personnages</Heading>
            <VStack spacing="3" mb="6">
                <Input placeholder="Nom" value={name} onChange={e => setName(e.target.value)} />
                <Input placeholder="Race" value={race} onChange={e => setRace(e.target.value)} />
                <Input placeholder="Classe" value={charClass} onChange={e => setCharClass(e.target.value)} />
                <Input 
                    type="number"
                    placeholder="Niveau"
                    value={level}
                    onChange={e => setLevel(Number(e.target.value))}
                />
                <Button colorScheme='teal' onClick={createCharacter}>
                    Créer
                </Button>
            </VStack>
            <VStack spacing="3">
                {characters.map(c => (
                    <HStack key={c.id} w="100%" justify='space-between'>
                        <Box>
                            {c.name} - {c.race} {c.class} (lvl {c.level})
                        </Box>
                        <Button size="sm" colorScheme='red' onClick={() => deleteCharacter(c.id)}>
                            Supprimer
                        </Button>
                    </HStack>
                ))}
            </VStack>
        </Box>
    );
}