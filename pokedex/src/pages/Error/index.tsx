import { Link, useRouteError } from "react-router-dom";
import './styles.css'
import Team from '../../assets/Team.png'
export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <main className="infor">
            {/* <img className="att" src={Error} alt="" /> */}
            <div className="img">
                <img className="team" src={Team} alt="" />
            </div>
            <div className="resto">
                <h1>
                    <span className="colorido">The rocket team </span>
                    <span className="destaque">has won this time.</span>
                </h1>
                <Link to="/">   <button className='buttonR'>Retornar</button></Link>
            </div>
        </main>
    );
}



// The rocket team has won this time.