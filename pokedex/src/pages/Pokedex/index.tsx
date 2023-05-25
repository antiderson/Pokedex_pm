import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import './styles1.css';

import { Button, Checkbox, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Progress, SimpleGrid } from '@chakra-ui/react';
import api from '../../api/index';
import { CardPokemon, PokemonTypeProps } from '../../components/card';
import { Element } from '../../utils/Element';

type PokemonType = {
    name: string;
    url: string;
};

// function getTypeClass(types: string[]) {
//     const typeClasses: { [key: string]: string } = {
//         grass: styles.modal_body_container_green,
//         bug: styles.modal_body_container_green,
//         dark: styles.modal_body_container_gray,
//         rock: styles.modal_body_container_gray,
//         ice: styles.modal_body_container_blue,
//         water: styles.modal_body_container_blue,
//         fire: styles.modal_body_container_red,
//         fighting: styles.modal_body_container_red,
//         dragon: styles.modal_body_container_red,
//         normal: styles.modal_body_container_light_blue,
//         ghost: styles.modal_body_container_light_blue,
//         poison: styles.modal_body_container_purple,
//         psychic: styles.modal_body_container_purple,
//         fairy: styles.modal_body_container_purple,
//         ground: styles.modal_body_container_brown,
//     };

//     return types.map(type => typeClasses[type]).join(' ');
// }
const PAGE_SIZE = 9;

export const Pokedex = () => {
    const [pokemonCount, setPokemonCount] = useState<number>(0);
    const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([]);
    const [pokemonList, setPokemonList] = useState<PokemonTypeProps[]>([]);
    const [pokemonSearchList, setPokemonSearchList] = useState<PokemonTypeProps[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonTypeProps | null>(null);
    const [searchValue] = useState('')

    useEffect(() => {
        const fetchPokemonList = async () => {
            if (searchValue.trim() === '') {
                setPokemonSearchList([])
                return;
            }

            setLoading(true);

            try {
                const response = await api.get(`/pokemon/${searchValue}`);
                const data = response.data;
                const pokemon: PokemonTypeProps = {
                    name: data.name,
                    attack: data.stats[1].base_stat,
                    defense: data.stats[2].base_stat,
                    types: data.types.map((type: { type: { name: string } } & PokemonType) => type.type.name),
                    image: data.sprites.other['official-artwork'].front_default,
                    onClick: () => handlePokemonClick(pokemon),
                    hp: data.stats[0].base_stat,
                    spAttack: data.stats[3].base_stat,
                    spDefense: data.stats[4].base_stat,
                    experience: data.base_experience,
                    generation: data.game_indices[0].version.url.split('/').slice(-2, -1)[0],
                    index: data.id,
                    abilities: data.abilities.map((ability: { ability: { name: string } }) => ability.ability.name),

                };

                setPokemonSearchList([pokemon]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Pokemon:', error);
                setLoading(false);
            }
        };

        fetchPokemonList();
    }, [searchValue]);

    useEffect(() => {
        const fetchPokemonTypes = async () => {
            try {
                const response = await api.get('/type');
                setPokemonTypes(response.data.results);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPokemonTypes();
    }, []);

    useEffect(() => {
        const fetchPokemonList = async () => {
            setLoading(true);

            try {
                const response = await api.get(`/pokemon?limit=${PAGE_SIZE}&offset=${offset}`);
                setPokemonCount(response.data.count);

                const results: PokemonType[] = response.data.results;
                const formattedPokemonList: PokemonTypeProps[] = await Promise.all(
                    results.map(async (pokemon: PokemonType) => {
                        const response = await api.get(`/pokemon/${pokemon.name}`);
                        const data = response.data;
                        const formattedPokemon: PokemonTypeProps = {
                            name: data.name,
                            attack: data.stats[1].base_stat,
                            defense: data.stats[2].base_stat,
                            types: data.types.map((type: { type: { name: string } } & PokemonType) => type.type.name),
                            image: data.sprites.other['official-artwork'].front_default,
                            onClick: () => handlePokemonClick(formattedPokemon),
                            hp: data.stats[0].base_stat,
                            spAttack: data.stats[3].base_stat,
                            spDefense: data.stats[4].base_stat,
                            experience: data.base_experience,
                            generation: data.game_indices[0].version.url.split('/').slice(-2, -1)[0],
                            index: data.id,
                            abilities: data.abilities.map((ability: { ability: { name: string } }) => ability.ability.name),

                        };
                        return formattedPokemon;
                    })
                );

                if (offset === 0) {
                    setPokemonList(formattedPokemonList);
                } else {
                    setPokemonList((prevList) => [...prevList, ...formattedPokemonList]);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error de busca na lista:', error);
            }
        };

        fetchPokemonList();
    }, [offset]);

    const handleLoadMore = () => {
        setOffset((prevOffset) => prevOffset + PAGE_SIZE);
    };

    const handlePokemonClick = (pokemon: PokemonTypeProps) => {
        setSelectedPokemon(pokemon);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {

        setIsModalOpen(false);
    };

    return (
        <>
            <Header />
            <section className='cards'>
                <main className='content'>
                    <h1 >
                        800 <strong>Pokemons</strong> for you to choose your favorite
                    </h1>
                    <input className='input' placeholder="Encontre o seu pokemon" />
                    <div style={{ height: '80%' }}>
                        <div className='tipo'>
                            <Menu closeOnSelect={false}>
                                <MenuButton as={Button} >
                                    Tipo
                                </MenuButton>
                                <MenuList maxHeight="15rem" overflowY="scroll">
                                    {pokemonTypes.map((type) => (
                                        <MenuItem key={type.name}>
                                            <Checkbox>
                                                {type.name}
                                            </Checkbox>
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>
                        </div>

                        <SimpleGrid columns={[1, null, 2, 3]} spacing={[0, null, '34px']}>
                            {searchValue.length >= 0
                                ? pokemonList.map((pokemon: PokemonTypeProps, index: number) => (
                                    <CardPokemon key={index} {...pokemon} onClick={() => handlePokemonClick(pokemon)} />
                                ))
                                : pokemonSearchList.map((pokemon: PokemonTypeProps, index: number) => (
                                    <CardPokemon key={index} {...pokemon} onClick={() => handlePokemonClick(pokemon)} />
                                ))}
                        </SimpleGrid>

                        {searchValue !== '' ? (<></>) : !loading && pokemonList.length < pokemonCount && (
                            <Button className='more' onClick={handleLoadMore} my="4" >
                                Carregar mais
                            </Button>
                        )}
                    </div>

                </main>
            </section>

            //modal aqui /////////

            <Modal size={'xl'} isCentered isOpen={isModalOpen} onClose={handleCloseModal}>
                <ModalOverlay />
                <ModalContent className="modal">
                    <ModalCloseButton className="modalX" />

                    {selectedPokemon && (
                        <>
                            <ModalBody py={0} px={0}>
                                <section >
                                    <article>
                                        <img src={selectedPokemon.image} alt={selectedPokemon.name} />
                                        <article >
                                            {selectedPokemon.types.map((type, index) => (
                                                <Element key={index} type={[type]} />
                                            ))}
                                        </article>
                                    </article>

                                    <article>
                                        <article>
                                            <h2 >{selectedPokemon.name}</h2>
                                            <article>
                                                <span >Generation {selectedPokemon.generation}</span>
                                                <div>
                                                    <span>{selectedPokemon.index}</span>
                                                </div>
                                            </article>
                                        </article>

                                        <article className="abilidades">
                                            <span >Abilities</span>
                                            <span>{selectedPokemon.abilities && selectedPokemon.abilities.join(" - ")}</span>
                                        </article>

                                        <article>
                                            <article>
                                                <span>Hp</span>
                                                <span><strong>{selectedPokemon.hp}</strong></span>
                                                <Progress colorScheme='green' value={selectedPokemon.hp} />
                                            </article>
                                            <article>
                                                <span>Experience</span>
                                                <span><strong>{selectedPokemon.experience}</strong></span>
                                                <Progress colorScheme='yellow' value={selectedPokemon.experience} />
                                            </article>
                                        </article>

                                        <div >
                                            <article>
                                                <div>
                                                    <span>{selectedPokemon.defense}</span>
                                                </div>
                                                <p>Defense</p>
                                            </article>
                                            <article>
                                                <div>
                                                    <span>{selectedPokemon.attack}</span>
                                                </div>
                                                <p>Attack</p>
                                            </article>
                                            <article>
                                                <div>
                                                    <span>{selectedPokemon.spDefense}</span>
                                                </div>
                                                <p>SpDefense</p>
                                            </article>
                                            <article>
                                                <div>
                                                    <span>{selectedPokemon.spAttack}</span>
                                                </div>
                                                <p>spAttack</p>
                                            </article>
                                        </div>
                                    </article>
                                </section>
                            </ModalBody>
                        </>
                    )}

                </ModalContent>
            </Modal>
        </>
    );
};