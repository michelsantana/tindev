import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import {Link} from 'react-router-dom';
import './styles.css';

import api from '../../services/api';

import logo from '../../assets/logo.svg';
import like from '../../assets/like.svg';
import dislike from '../../assets/dislike.svg';
import itsamatch from '../../assets/itsamatch.png';

export default function Main({match}) {
   const [devs, setDevs] = useState([]);
   const [matchDev, setMatchDev] = useState(null);

   useEffect(() => {
      async function loadDevs() {
         const response = await api.get('devs', {
            headers: {
               user: match.params.id,
            },
         });
         setDevs(response.data);
      }

      loadDevs();
   }, [match.params.id]);

   useEffect(() => {
      const socket = io(api.defaults.baseURL, {
         query: {user: match.params.id},
      });

      socket.on('match', dev =>{
         setMatchDev(dev);
      });

   }, [match.params.id]);

   async function handleLike(id) {
      await api.post(`devs/${id}/likes`, null, {
         headers: {user: match.params.id},
      });
      setDevs(devs.filter((e) => e._id !== id));
   }

   async function handleDislike(id) {
      await api.post(`devs/${id}/dislikes`, null, {
         headers: {user: match.params.id},
      });
      setDevs(devs.filter((e) => e._id !== id));
   }

   return (
      <div className="main-container">
         <Link to="/">
            <img src={logo} alt="Tidev" />
         </Link>
         {devs.length > 0 ? (
            <ul>
               {devs.map((d) => {
                  return (
                     <li key={d._id}>
                        <img src={d.avatar} alt="" />
                        <footer>
                           <strong>{d.name}</strong>
                           <p>{d.bio}</p>
                        </footer>
                        <div className="buttons">
                           <button
                              type="button"
                              onClick={() => handleDislike(d._id)}>
                              <img src={dislike} alt="" />
                           </button>

                           <button
                              type="button"
                              onClick={() => handleLike(d._id)}>
                              <img src={like} alt="" />
                           </button>
                        </div>
                     </li>
                  );
               })}
            </ul>
         ) : (
            <div className="empty">Cabô :'( </div>
         )}

         {matchDev && (
            <div className="match-container">
               <img src={itsamatch} alt="" />
               <img className="avatar" src={matchDev.avatar} alt="" />
               <strong>{matchDev.name}</strong>
               <p>{matchDev.bio}</p>
               <button type="button" onClick={()=> {setMatchDev(null)}}>FECHAR</button>
            </div>
         )}
      </div>
   );
}
