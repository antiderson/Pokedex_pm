import Logo from '../../assets/Logo.svg'
import './styles.css'

import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <header className='header'>
            <Link to="/"><img src={Logo} className='imgLogo' alt="Logo do Pokedex" /></Link>
            <section className='section_buttons'>
                <Link to="/">  <button className='button'>Home</button></Link>
                <Link to="/Pokedex">   <button className='button'>Pokédex</button></Link>
                <Link to="/Legendaries">   <button className='button'>Legendaries</button></Link>
                <Link to="/Documentation">   <button className='button'>Documentation</button></Link>
            </section>
        </header>
    )
}