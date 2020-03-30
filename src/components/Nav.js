import React from 'react'
import { Link } from 'react-router-dom'

function Nav(){
    return (
        <nav> 
            <ul className="navList">
                <Link to={'gallery'} className ="link"> <li>Gallery</li> </Link>              
                <Link to={'draw'} className ="link"><li>Erase!</li></Link>
            </ul>
        </nav>
    )
}
export default Nav