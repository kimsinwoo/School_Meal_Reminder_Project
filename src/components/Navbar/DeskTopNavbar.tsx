import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import style from './Navbar.module.css';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BarChartIcon from '@mui/icons-material/BarChart';

interface props {
    name: string;
    isAdmin: boolean;
}

export default function DeskTopNavbar({isAdmin, name}: props) {
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(localStorage.getItem("accessToken") ? true : false)

    return (
        <div className={style.DeskNavbarContainer}>
            <div>
                <div>
                    <h1 className={style.title}>오늘 급식 어때?</h1>
                    <span className={style.subTitle}>오늘의 급식을 여러분들이 평가를 해보세요!!</span>
                </div>
                
                    {
                        isLogin ? 
                        <h2>
                            <Link style={{ color: "blue" }} to={
                                isAdmin ? "/admin" : "/mypage"
                            }>{name}</Link> 님, 안녕하세요!
                        </h2> :
                        <>
                            <Link className={style.login} to="/login">로그인</Link>
                            <Link className={style.register} to="/register">회원가입</Link>
                        </>
                    }

            </div>
            <div>
                <Link
                    to="/"
                    className={location.pathname === '/' ? style.active : style.menu}
                >
                    <CalendarTodayIcon /> 오늘의 급식
                </Link>
                <Link
                    to="/vote"
                    className={location.pathname === '/vote' ? style.active : style.menu}
                >
                    <FavoriteIcon /> 만족도 투표
                </Link>
                <Link
                    to="/chart"
                    className={location.pathname === '/chart' ? style.active : style.menu}
                >
                    <BarChartIcon /> 통계
                </Link>
            </div>
        </div>
    );
}
