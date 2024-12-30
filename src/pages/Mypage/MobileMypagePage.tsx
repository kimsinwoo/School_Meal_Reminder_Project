import React from 'react'
import { MobileNavbar } from '../../components'
import { Box, Typography, Paper, Grid, Button, TextField } from '@mui/material';

export default function MobileAdminPage() {
    return (
        <div>
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
                            <Typography>학년: 2학년</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>반: 3반</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>번호: 12번</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>이름: 홍길동</Typography>
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
                                label="학반번호 수정"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="비밀번호 입력"
                                type="password"
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ textAlign: 'right', mt: 3 }}>
                        <Button variant="contained" color="primary">
                            변경
                        </Button>
                    </Box>
                </Paper>
            </Box>
            <MobileNavbar />
        </div>
    )
}