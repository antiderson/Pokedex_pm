import { Link } from 'react-router-dom'
import Banner from '../../assets/Banner.png'
import './styles.css'
import { Footer } from '../Footer'

export const ContHome = () => {
    return (
        <section className='cont'>
            <div className='coluna'>
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
                    <Link to="/Pokedex">
                        <button className='btn'>See Pokemons</button>
                    </Link>
                </div>
                <div>
                    <img src={Banner} className='banner' alt="" />
                </div>
            </div>
            <Footer />
        </section>
    )
}