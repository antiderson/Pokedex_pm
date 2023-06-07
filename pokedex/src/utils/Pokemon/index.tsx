export type Pokemon = {
    id: number;
    name: string;
    types: {
        type: {
            name: string;
        };
    }[];
    stats: {
        base_stat: number;
    }[];
    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            };
        };
    };
    abilities: {
        ability: {
            name: string;
        };
    }[];
    base_experience: number;
    
};




export function getPokemon(json: Pokemon) {
    const { id, name, types, stats, sprites, abilities, base_experience } = json;
    const src = sprites.other["official-artwork"].front_default;
    const health = stats[0].base_stat;
    const attack = stats[1].base_stat;
    const defense = stats[2].base_stat;
    const attackSuper = stats[3].base_stat;
    const defenseSuper = stats[4].base_stat;
    const types_ = types.map((type) => type.type.name);
    const abilities_ = abilities.map((abilitie) => abilitie.ability.name.replace("-", " "));
    const color = types_[0];
    const name_ = name.replace(/-\w+/g, "");
    return {
        id,
        name_,
        types_,
        abilities_,
        src,
        health,
        attack,
        defense,
        attackSuper,
        defenseSuper,
        base_experience,
        color,
    };
}




export function orderPokemons(a: Pokemon, b: Pokemon): number {
    if (a.id < b.id) {
        return -1;
    }
    if (a.id > b.id) {
        return 1;
    }
    return 0;
}