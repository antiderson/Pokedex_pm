import Logo from '../../assets/Logo.svg'
import './styles.css'

export const Header = () => {
    return (
        <header className='header'>
            <img src={Logo} className='imgLogo' alt="Logo do Pokedex" />
            <section className='section_buttons'>
                <button className='button'>Home</button>
                <button className='button'>Pokédex</button>
                <button className='button'>Legendaries</button>
                <button className='button'>Documentation</button>
            </section>
        </header>
    )
}