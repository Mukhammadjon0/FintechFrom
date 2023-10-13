import React from 'react'
import './Footer.css'
function Footer() {
    const handleCallButtonClick = () => {
        const phoneNumber = '+998712038800';

        window.location.href = `tel:${phoneNumber}`;
    };
    return (
        <footer>
            <button onClick={handleCallButtonClick}>Biz bilan bog'lanish</button>
        </footer>
    )
}

export default Footer