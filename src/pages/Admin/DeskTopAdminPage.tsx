import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Button } from '@mui/material';
import { DeskTopNavbar } from '../../components';
import axios from 'axios';

interface props {
    name: string;
    isAdmin: boolean;
}

interface MenuItem {
    menu: string;
}

export default function DeskTopAdminPage({ name, isAdmin }: props) {
    const [LikeMenus, setLikeMenus] = useState<MenuItem[]>([]);
    const [DisLikeMenus, setDisLikeMenus] = useState<MenuItem[]>([]);
    const [NewMenus, setNewMenus] = useState<string>()

    const handlerLogout = async () => {
        try {
            const respones = await axios.post("http://localhost:3030/auth/logout", {
                accessToken: localStorage.getItem("accessToken")
            })
            localStorage.removeItem("accessToken")
            window.location.href = "/"
        } catch (e) {
            console.log(e)
        }
    }

    const handlerAdmin = async () => {
        try {
            const respones = await axios.get("http://localhost:3030/meal/adminpage")
            console.log(respones)
            const { Like, DisLike, SuggestedMenu } = respones.data;
            setLikeMenus(Like);
            setDisLikeMenus(DisLike);
            setNewMenus(SuggestedMenu);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        handlerAdmin()
    }, [])
    return (
        <div>
            <DeskTopNavbar name={name} isAdmin={isAdmin} />
            <Box sx={{ padding: '20px' }}>
                <Box sx={{ width: '40%', mt: 2, margin: "20px 0" }}>
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '15px',
                            padding: '20px',
                            textAlign: 'center',
                            mb: 3,
                            boxShadow: "1px 4px 6px -1px rgba(128, 128, 128, 0.498)",
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 'bold',
                                background: 'linear-gradient(90deg, #2563EB 0%, #9333EA 60%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontSize: "40px",
                                mb: 1,
                            }}
                        >
                            학생들이 투표한 메뉴 내용
                        </Typography>
                        <Typography
                            component="span"
                            sx={{
                                fontSize: '18px',
                                color: '#6B7280',
                            }}
                        >
                            AI가 이 내용을 토대로 새로운 메뉴를 추천해줘요
                        </Typography>
                    </Box>
                </Box>
                <Grid container spacing={3}>
                    {['좋아하지 않음', '좋아함', '영양이의 추천 메뉴'].map((category, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                            <Paper
                                elevation={3}
                                sx={{
                                    padding: '20px',
                                    borderRadius: '15px',
                                    textAlign: 'center',
                                    height: 300,
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 'bold', mb: 2 }}
                                >
                                    {category}
                                </Typography>
                                <ul style={{ listStyle: 'none', padding: 0, textAlign: 'center' }}>
                                    {index === 0 && DisLikeMenus.map((item, idx) => (
                                        <li
                                            key={idx}
                                            style={{
                                                marginBottom: '10px',
                                                fontSize: '16px',
                                                fontWeight: '400',
                                            }}
                                        >
                                            {item.menu}
                                        </li>
                                    ))}
                                    {index === 1 && LikeMenus.map((item, idx) => (
                                        <li
                                            key={idx}
                                            style={{
                                                marginBottom: '10px',
                                                fontSize: '16px',
                                                fontWeight: '400',
                                            }}
                                        >
                                            {item.menu}
                                        </li>
                                    ))}
                                    {index === 2 && (
                                        <li
                                            style={{
                                                marginBottom: '10px',
                                                fontSize: '16px',
                                                fontWeight: '400',
                                            }}
                                        >
                                            {NewMenus}
                                        </li>
                                    )}
                                </ul>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ textAlign: 'right', mt: 3, marginRight: "10px" }}>
                    <Button onClick={handlerLogout} variant="contained" color="primary">
                        로그아웃
                    </Button>
                </Box>
            </Box>
        </div>
    );
}
