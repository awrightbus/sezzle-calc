import React from 'react'
import './Feed.css'

function Feed(props) {




    
    return (
        <div className='feed'>
            <div className='result-header'>
                <h1>Top 10 Results</h1>
            </div>
            <div className='results'>
                
                
                {props.results.map((result, i)=> 
                {
                   return( 
                       <div key={i} className='result'>
                        <p>{result}</p>
                       </div>
                   )
                })}
            </div>

        </div>
    )
}

export default Feed
