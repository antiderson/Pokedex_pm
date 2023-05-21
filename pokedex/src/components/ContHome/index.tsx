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
                    <button className='btn'>
                        See pokemons
                    </button>
                </div>
                <div>
                    <img src={Banner} className='banner' alt="" />
                </div>
            </div>
            <div className='footer'>
                <h3>
                    Make with &#128147; for the PokéSpartans team Platzi Master
                </h3>
                <h3>
                    Ours Team
                </h3>
            </div>
        </section>
    )
}