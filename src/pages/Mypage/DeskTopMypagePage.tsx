import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Button, TextField } from '@mui/material';
import { DeskTopNavbar } from '../../components';
import axios from 'axios';
import { response } from 'express';

interface propsType {
    name: string;
    classNum: string;
    isAdmin: boolean;
}

export default function DeskTopUserPage({ name, classNum, isAdmin }: propsType) {
    const [password, setPassword] = useState<string>('')
    const [classNumset, setClassNum] = useState<string>('')
    const [nowClassNum, setNowClassNum] = useState<string>('')

    const result = classNum.slice(2).startsWith("0")
        ? classNum.slice(3)
        : classNum.slice(2);

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

    const changeClassNum = async () => {
        try {
            const response = await axios.post("http://localhost:3030/auth/change", {
                accessToken: localStorage.getItem("accessToken"),
                password,
                nowClassNum,
                ClassNum: classNumset
            });
            console.log(response);
            window.location.reload()
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.error('Axios error:', e.response?.data);  // Check the response from the backend
            } else {
                console.error('Unexpected error:', e);
            }
        }
    };

    return (
        <div>
            <DeskTopNavbar name={name} isAdmin={isAdmin} />
            <Box sx={{ padding: '20px' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
                    마이페이지
                </Typography>
                <Paper elevation={3} sx={{ padding: '20px', borderRadius: '15px', mb: 5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                        사용자 정보
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography>학년: {classNum.substring(0, 1)}학년</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>반: {classNum.substring(2, 1)}반</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>번호: {result}번</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>이름: {name}</Typography>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper elevation={3} sx={{ padding: '20px', borderRadius: '15px' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                        사용자 정보 수정
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="현재 학반번호"
                                variant="outlined"
                                value={nowClassNum}
                                onChange={(e) => {
                                    setNowClassNum(e.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="학반번호 수정"
                                variant="outlined"
                                value={classNumset}
                                onChange={(e) => {
                                    setClassNum(e.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="비밀번호 입력"
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    console.log("Current password value:", e.target.value);  // Log the entered password directly
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ textAlign: 'right', mt: 3 }}>
                        <Button onClick={changeClassNum} variant="contained" color="primary">
                            변경
                        </Button>
                    </Box>
                </Paper>
                <Box sx={{ textAlign: 'right', mt: 3, marginRight: "10px" }}>
                    <Button onClick={handlerLogout} variant="contained" color="primary">
                        로그아웃
                    </Button>
                </Box>
            </Box>
        </div>
    );
}
