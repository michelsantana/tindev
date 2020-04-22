import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './styles.css';

import api from '../../services/api';

import logo from '../../assets/logo.svg';

export default function Login() {
   const [user, setUser] = useState('');
   const history = useHistory();
   console.log(process.env.API_BASEURL);

   async function handleSubmit(e) {
      e.preventDefault();

      const response = await api.post('devs', {
         username: user,
      });

      const {_id} = response.data;

      history.push(`/dev/${_id}`);
   }

   return (
      <div className="login-container">
         <form onSubmit={handleSubmit}>
            <img src={logo} alt="Tindev" />
            <input
               type="text"
               placeholder="Digite seu usuário do Github"
               value={user}
               onChange={(e) => setUser(e.target.value)}
            />
            <button type="submit">Login</button>
         </form>
      </div>
   );
}
