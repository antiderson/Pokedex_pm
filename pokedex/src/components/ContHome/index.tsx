import Banner from '../../assets/Banner.png'
import './styles.css'

export const ContHome = () => {
    return (
        <section className='cont'>
            <div className='column'>
                <div className='info'>
                    <h1 className='title'>
                        <strong>Find</strong> all your<br></br> 
                        favorite<br></br> <strong>Pokemon</strong>
                    </h1>
                    <h2 className='sub'>
                        You can know the type of Pokemon,<br></br>
                        its strengths, disadvantages and<br></br>
                        abilities
                    </h2>
                    <button>
                        See Pokemons
                    </button>
                </div>
                <div>
                    <img src={Banner} className='banner' alt="" />
                </div>
            </div>
            <div>
                <h2>
                    Make with ❤ for the PokéSpartans team Platzi Master
                </h2>
                <h2>
                    Ours Team
                </h2>
            </div>
        </section>
    )
}