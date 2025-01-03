import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import {Link} from 'react-router-dom'
import axios from 'axios';
import { Message } from '../../../components';

const DeskTopLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [name, setName] = useState('');
    const [classNum, setClassNum] = useState('');
    const [isError, setIsError] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [isMessage, setIsMessage] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== rePassword) {
            setMessage("비밀번호 재입력을 확인해주세요.")
            setIsMessage(true)
            setIsError(true)
            setTimeout(() => {
                setIsError(false)
                setIsMessage(false)
                setMessage("")
            }, 3000)
            return
        } else if (email === "" || name === "" || classNum === "" ) {
            setMessage("모든 필드를 채워주세요.")
            setIsMessage(true)
            setIsError(true)
            setTimeout(() => {
                setIsError(false)
                setIsMessage(false)
                setMessage("")
            }, 3000)
            return
        }
        try {
            const respones = await axios.post("http://localhost:3030/auth/register", {
                UserId: email,
                Password: password,
                Name: name,
                ClassNum: classNum
            })
            console.log(respones)
            setIsMessage(true)
            setIsError(false)
            setMessage("회원가입에 성공하였습니다.")
            setTimeout(() => {
                setIsError(false)
                setIsMessage(false)
                window.location.href = "/login"
            }, 3000)
        } catch (e) {
            console.log(e)
            if (password !== rePassword) {
                setMessage("비밀번호 재입력을 확인해주세요.")
            }
            setIsMessage(true)
            setIsError(true)
            setMessage("로그인에 실패하였습니다.")
            setTimeout(() => {
                setIsError(false)
                setIsMessage(false)
                setMessage("")
            }, 3000)
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
            {isMessage && <Message Message={message} isError={isError}/>}
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
                    sx={{ mb: 2 }}
                />
                <TextField
                    type="password"
                    label="비밀번호"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 3 }}
                />
                <TextField
                    type="password"
                    label="비밀번호 재입력"
                    variant="outlined"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    sx={{ mb: 3 }}
                />
                <TextField
                    type="text"
                    label="이름"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 3 }}
                />
                <TextField
                    label="학반번호 예) 2208"
                    variant="outlined"
                    value={classNum}
                    onChange={(e) => setClassNum(e.target.value)}
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
