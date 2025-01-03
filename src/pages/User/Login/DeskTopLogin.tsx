import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { Message } from '../../../components';

const DeskTopLogin = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [isMessage, setIsMessage] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const respones = await axios.post("http://localhost:3030/auth/login", {
                UserId: email,
                Password: password,
            })
            localStorage.setItem("accessToken", respones.data.accessToken)
            setIsMessage(true)
            setIsError(false)
            setMessage("로그인에 성공하였습니다.")
            setTimeout(() => {
                setIsError(false)
                setIsMessage(false)
                window.location.href = "/"
            }, 3000)
        } catch (e) {
            console.log(e)
            if ((e as any).status == 404) {
                setMessage("아이디 또는 비밀번호가 맞지 않습니다.")
            }
            setIsMessage(true)
            setIsError(true)
            setTimeout(() => {
                setIsError(false)
                setIsMessage(false)
                setMessage("")
            }, 3000)
        }
    };

    return (
        <div>
            {isMessage && <Message Message={message} isError={isError} />}
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
                        로그인
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
                    <Button type="submit" variant="contained" color="primary">
                        로그인
                    </Button>
                    <Link style={{ margin: "0 auto", marginTop: "15px", color: "blue" }} to="/register">계정이 없으신가요?</Link>
                </Box>
            </Box>
        </div>
    );
};

export default DeskTopLogin;
