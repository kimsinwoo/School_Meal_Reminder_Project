import React from 'react'
import { Box, Typography, Paper, Grid } from '@mui/material';
import { MobileNavbar } from '../../components'

export default function MobileAdminPage() {
    return (
        <div>
            <Box sx={{ padding: '20px' }}>
                <Box sx={{ width: '100%'}}>
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '15px',
                            padding: '20px',
                            textAlign: 'center',
                            mb: 3,
                            boxShadow : "1px 4px 6px -1px rgba(128, 128, 128, 0.498)",
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 'bold',
                                background: 'linear-gradient(90deg, #2563EB 0%, #9333EA 60%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontSize: "31px",
                                mb: 1,
                            }}
                        >
                            학생들이 투표한 메뉴 내용
                        </Typography>
                        <Typography
                            component="span"
                            sx={{
                                fontSize: '16px',
                                color: '#6B7280'
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
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 'bold', mb: 2 }}
                                >
                                    {category}
                                </Typography>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {['항목 1', '항목 2', '항목 3'].map((item, idx) => (
                                        <li
                                            key={idx}
                                            style={{
                                                marginBottom: '10px',
                                                fontSize: '16px',
                                                fontWeight: "600"
                                            }}
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <div style={{ height: '70px' }} />
            <MobileNavbar/>
        </div>
    )
}