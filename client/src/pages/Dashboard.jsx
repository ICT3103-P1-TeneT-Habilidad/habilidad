import React from 'react'
import Banner from '../assets/temp_banner.jpeg'
import { PopularCourse } from '../components/index'

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-background">
            <div className="px-4 py-4 flex mx-24 border border-black space-y-2 mr-24">
                <img src={Banner} alt="banner" className="object-fill flex-1"></img>
            </div>
            <PopularCourse />
        </div>
    )
}

export default Dashboard
