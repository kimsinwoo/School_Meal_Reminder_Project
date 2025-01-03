import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import {Link} from 'react-router-dom'
import axios from 'axios';

const DeskTopLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [name, setName] = useState('');
    const [classNum, setClassNum] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        try {
            const respones = await axios.post("http://localhost:3030/auth/register", {
                UserId: email,
                Password: password,
                Name: name,
                ClassNum: classNum
            })
            console.log(respones)
            window.location.href = "/login"
        } catch (e) {
            console.log(e)
        } finally {

        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 300,
                    p: 3,
                    border: '1px solid #ddd',
                    borderRadius: 2,
                    backgroundColor: 'white',
                    boxShadow: 3,
                }}
            >
                <Typography variant="h5" sx={{ textAlign: 'center', mb: 3 }}>
                    회원가입
                </Typography>
                <TextField
                    type="id"
                    label="아이디"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    type="password"
                    label="비밀번호"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    sx={{ mb: 3 }}
                />
                <TextField
                    type="password"
                    label="비밀번호 재입력"
                    variant="outlined"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    required
                    sx={{ mb: 3 }}
                />
                <TextField
                    type="text"
                    label="이름"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    sx={{ mb: 3 }}
                />
                <TextField
                    type="text"
                    label="학반번호 예) 2208"
                    variant="outlined"
                    value={classNum}
                    onChange={(e) => setClassNum(e.target.value)}
                    required
                    sx={{ mb: 3 }}
                />
                <Button type="submit" variant="contained" color="primary">
                    회원가입
                </Button>
                <Link style={{margin: "0 auto", marginTop: "15px", color: "blue"}} to="/login">계정이 있으신가요?</Link>
            </Box>
        </Box>
    );
};

export default DeskTopLogin;
