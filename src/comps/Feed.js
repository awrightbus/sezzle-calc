import React from 'react'
import './Feed.css'


function Feed({results,expression}) {



    
    return (
        <div className='feed'>
            <div className='result-header'>
                <h1>Top 10 Results</h1>
            </div>
            <div className='results'>
                
                
                {results.map((result, i,expression)=> 
                {
                   return( 
                       <div key={i} className='result'>
                        <p>{results}</p>
                       </div>
                   )
                })}
            </div>

        </div>
    )
}

export default Feed
