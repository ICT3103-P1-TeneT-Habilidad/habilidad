import React from 'react'
import Banner from '../assets/banner.png'
import { PopularCourse, TopCategories } from '../components/index'
import { useAppContext } from '../context/appContext'

const Dashboard = () => {

    const {openModal} = useAppContext()

    return (
        <div className={`min-h-screen bg-background ${openModal ? 'opacity-40' : ""}`}>
            <div className="px-4 py-4 flex mx-24 border border-black space-y-2 mr-24">
                <img src={Banner} alt="banner" className="object-fill flex-1"></img>
            </div>
            <PopularCourse />
            <TopCategories />
        </div>
    )
}

export default Dashboard
