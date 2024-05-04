import React from 'react'

import {FaRegCalendarTimes, FaRegCalendarCheck , FaAngleDoubleDown, FaEllipsisH , FaSpotify , FaCalendarDay , FaTimes , FaBars , FaOptinMonster , FaSearch , FaClock , FaMapMarkerAlt , FaPenAlt , FaTrashAlt , FaAngleLeft , FaAngleRight  } from "react-icons/fa";

function IconCom({ icon, size }) {

    function iconName() {
        switch (icon) {
            case 'monster':
                return <FaOptinMonster size={size} />;
            case 'search':
                return <FaSearch size={size} />;
            case 'clock':
                return <FaClock size={size} />;
            case 'marker':
                return <FaMapMarkerAlt size={size} />;
            case 'edit':
                return <FaPenAlt size={size} />;
            case 'trash':
                return <FaTrashAlt size={size} />;
            case 'left':
                return <FaAngleLeft size={size} />;
            case 'right':
                return <FaAngleRight size={size} />;
            case 'x':
                return <FaTimes size={size} />;
            case 'bars':
                return <FaBars size={size} />;
            case 'days':
                return <FaCalendarDay size={size} />
            case 'spotify':
                return <FaSpotify size={size} />
            case 'point':
                return <FaEllipsisH size={size} />
            case 'doubledown':
                return <FaAngleDoubleDown size={size} />
            case 'calendarcorrect':
                return <FaRegCalendarCheck size={size} />
            case 'calendarx':
                return <FaRegCalendarTimes size={size} />
            default:
                return null;
        }
    };


    return (
        <>
            {iconName()}
        </>
    )

  
}

export default IconCom