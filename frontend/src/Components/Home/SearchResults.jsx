import React from 'react';
import { Link } from 'react-router-dom';

function SearchResults({ results }) {
   // Check if results is an array
   if (!Array.isArray(results)) {
      console.error('SearchResults: `results` is not an array:', results);
      return <p style={{ color: 'red' }}>There was an error displaying the search results.</p>;
   }

   // Display a message if no results were found
   if (results.length === 0) {
      return <p style={{ color: 'gray' }}>No results found.</p>;
   }

   return (
      <div
         style={{
            position: 'absolute', 
            left: '0', 
            right: '0', 
            top: '70px', 
            backgroundColor: '#2D3748', 
            padding: '16px', 
            borderRadius: '8px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
            zIndex: '50', 
            maxHeight: '448px', 
            overflowY: 'auto', 
            width: '320px', 
         }}
      >
         <ul style={{ listStyleType: 'none', padding: '0', margin: '0', gap: '8px', display: 'flex', flexDirection: 'column' }}>
            {results.map((anime) => (
               <li key={anime.id} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Link to={`/anime/${anime.id}`} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                     <img
                        src={anime.imageUrl || 'default-image-url.jpg'} 
                        alt={anime.title || 'Anime Image'} 
                        style={{
                           width: '64px', 
                           height: '64px', 
                           objectFit: 'cover', 
                           borderRadius: '8px',
                        }}
                     />
                     <span style={{ color: 'white' }}>{anime.title}</span> 
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   );
}

export default SearchResults;
