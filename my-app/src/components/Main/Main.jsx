import React, { useEffect, useState } from 'react';
import './Main.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import XMark from '../../assets/icons/Xmark.png'
import { Tick } from '../../assets/icons/Svgs';
import axios from 'axios';
import { BASE_URL } from '../../constant/constant';

function Main() {
    const [name, setName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [phone, setPhone] = useState('');
    const [course, setCourse] = useState('0');

    const [popUp, setPopUp] = useState(false);
    const [response, setResponse] = useState(false);
    const [error, setError] = useState(undefined);

    const [isLoading, setIsLoading] = useState(true);

    const sendData = () => {
        const data = {
            ism: name,
            familiya: familyName,
            phone: phone,
            kurs: course,
        };
        axios.post(`${BASE_URL}/api/register/`, data)
            .then((res) => {
                setResponse(res.data);
                setError(undefined);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });
        console.log(data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (course !== '0') {
            setPopUp(true);
            setIsLoading(true);
            sendData();
        } else {
            alert('Iltimos kursni tanlang');
        }
    };
    useEffect(() => {
        if (response) {
            setTimeout(() => {
                window.location.href = 'https://t.me/fintechhubuz/';
            }, 2000);
        }
    }, [response]);

    return (
        <main>
            <div className="container__main">
                <form action="" onSubmit={handleSubmit}>
                    <h1>Kurslarga ro'yhatdan o'tish</h1>
                    <input
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        type="text"
                        placeholder="Ismingizni kiriting"
                    />
                    <input
                        name="familyName"
                        value={familyName}
                        onChange={(e) => setFamilyName(e.target.value)}
                        required
                        type="text"
                        placeholder="Familiyangizni kiriting"
                    />
                    <PhoneInput country={'uz'} value={phone} onChange={(phone) => setPhone(phone)} />
                    <select required name="course" value={course} onChange={(e) => setCourse(e.target.value)}>
                        <option value="0">Sizni qiziqtirgan kursni tanlang</option>
                        <option value="frontend">Front-End</option>
                        <option value="backend">Back-End</option>
                        <option value="mobile">Mobile Flutter</option>
                        <option value="robot">Robotexnika</option>
                    </select>
                    <button className="" type="submit">
                        Yuborish
                    </button>

                </form>
                <div className={`${popUp ? 'show-modal' : 'modal-box'}`}>
                    {isLoading && <div className="dotted-loader"></div>}
                    {response && (
                        <div className="">
                            <div className="tick-icon">{Tick}</div>
                            <h1>Ro'yxatdan muvaffaqiyatli o'tdingiz!</h1>
                        </div>
                    )}
                    {error &&
                        <div>
                            <img className='error-icon' src={XMark} alt='Icon' />
                            <h1>Hatolik!</h1>
                        </div>
                    }
                </div>
            </div>
        </main>
    );
}

export default Main;
