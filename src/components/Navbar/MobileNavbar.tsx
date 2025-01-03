import React, {useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import zIndex from '@mui/material/styles/zIndex';

export default function MobileNavbar() {
    const location = useLocation();
    const [isAdmin, setIsAdmin] = useState(false)
    const [isLogin, setIsLogin] = useState(localStorage.getItem("accessToken")?true:false)

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-around',
                position: 'fixed',
                width: '100%',
                bottom: 0,
                padding: '20px 0',
                borderTop: '1px solid #ddd',
                zIndex: 100,
                background: "hsla(0, 0%, 100%, 0.6)",
                backdropFilter: "saturate(180%) blur(3px)"
            }}
        >
            <Link to="/" style={{ textDecoration: 'none' }}>
                <CalendarTodayIcon
                    style={{
                        fontSize: 35,
                        color: location.pathname === '/' ? '#1976d2' : 'black',
                    }}
                />
            </Link>

            {/* 만족도 투표 */}
            <Link to="/vote" style={{ textDecoration: 'none' }}>
                <ChatBubbleOutlineIcon
                    style={{
                        fontSize: 35,
                        color: location.pathname === '/vote' ? '#1976d2' : 'black',
                    }}
                />
            </Link>
            <Link to="/chart" style={{ textDecoration: 'none' }}>
                <BarChartIcon
                    style={{
                        fontSize: 35,
                        color: location.pathname === '/chart' ? '#1976d2' : 'black',
                    }}
                />
            </Link>
            <Link to={isLogin ? (isAdmin ? "/admin" : "/mypage") : "/login"} style={{ textDecoration: 'none' }}>
                <PersonOutlineIcon
                    style={{
                        fontSize: 35,
                        color: location.pathname === '/admin' && "/mypage" ? '#1976d2' : 'black',
                    }}
                />
            </Link>
        </div>
    );
}
