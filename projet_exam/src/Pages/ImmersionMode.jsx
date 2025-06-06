import React from 'react'
import Header from '../Components/Header'
import Immersion from '../Components/Immersion'

function ImmersionMode() {
    return (
        <div>
            <Header />
            <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
                <Immersion />
            </div>
        </div>
    )
}

export default ImmersionMode