import React from 'react'
import './Feed.css'


function Feed({results}) {



    
    return (
        <div className='feed'>
            <div className='result-header'>
                <h1>Recent Calculations</h1>
            </div>
            <div className='results'>
                
                
                {results.map((result, i)=> 
                {
                   return( 
                       <div key={i} className='result'>
                        <p>{result.exp}</p>
                       </div>
                   )
                })}
            </div>

        </div>
    )
}

export default Feed
