import styles from './index.module.css';
import { Card, Stack, Heading, CardBody } from '@chakra-ui/react';
import { Element } from '../../utils/Element';
import './styles.css'

interface CardPokemonProps extends PokemonTypeProps {
    onClick: () => void;
}

export type PokemonTypeProps = {
    name: string;
    attack: string;
    defense: string;
    types: string[];
    image: string;
    experience?: number;
    abilities?: string[];
    hp?: number;
    spAttack?: number;
    spDefense?: number;
    generation?: number;
    index?: number;
    onClick?: () => void;

};

export const CardPokemon: React.FC<CardPokemonProps> = ({ name, attack, defense, types, image, onClick }) => {
    let pokemonContainerClass = '';

    if (types.includes('grass') || types.includes('bug')) {
        pokemonContainerClass = styles.pokemon_container_green;
    } else if (types.includes('stile') || types.includes('dark') || types.includes('rock')) {
        pokemonContainerClass = styles.pokemon_container_gray;
    } else if (types.includes('water') || types.includes('ice')) {
        pokemonContainerClass = styles.pokemon_container_blue;
    } else if (types.includes('fire') || types.includes('fighting') || types.includes('dragon')) {
        pokemonContainerClass = styles.pokemon_container_red;
    } else if (types.includes('normal') || types.includes('ghost')) {
        pokemonContainerClass = styles.pokemon_container_light_blue;
    } else if (types.includes('poison') || types.includes('psychic') || types.includes('fairy') || types.includes('ghost')) {
        pokemonContainerClass = styles.pokemon_container_purple;
    } else if (types.includes('ground')) {
        pokemonContainerClass = styles.pokemon_container_brown;
    } else {
        pokemonContainerClass = styles.pokemon_container_yellow;
    }

    return (
        <Card className="card" direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline' onClick={onClick}>
            <Stack>
                <CardBody className="into">
                    <Heading className="name">{name}</Heading>
                    <article className="container">
                        <article className="column">
                            <div className="atributos">
                                <span>{attack}</span>
                            </div>
                            <p>Attack</p>
                        </article>

                        <article className="column">
                            <div className="atributos">
                                <span>{defense}</span>
                            </div>
                            <p>Defense</p>
                        </article>
                    </article>

                    <article className="tipos">
                        {types.map((type, index) => (
                            <Element key={index} type={[type]} />
                        ))}
                    </article>
                </CardBody>
            </Stack>

            <article className={pokemonContainerClass}>
                <img className="img" src={image} alt={name} />
            </article>
        </Card>
    );
};

export default CardPokemon;