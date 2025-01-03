import React from 'react'
import { MobileNavbar } from '../../components'
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardHeader,
    Divider,
} from "@mui/material";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

interface props {
    likeCount: number;
    disLikeCount: number;
    mondayTotal: number;
    tuesdayTotal: number;
    wednesdayTotal: number;
    thursdayTotal: number;
    fridayTotal: number;
    date: string;
    today: string;
}

export default function MobileChartPage({ date, likeCount, disLikeCount, mondayTotal, tuesdayTotal, wednesdayTotal, thursdayTotal, fridayTotal, today }: props) {

    const barData = [
        { name: "월", value: mondayTotal },
        { name: "화", value: tuesdayTotal },
        { name: "수", value: wednesdayTotal },
        { name: "목", value: thursdayTotal },
        { name: "금", value: fridayTotal },
    ];

    const pieData = [
        { name: "좋아요", value: likeCount },
        { name: "별로", value: disLikeCount },
    ];

    const COLORS = ["#4caf50", "#f44336"];

    return (
        <div>
            <div>
                <Box
                    sx={{
                        minHeight: "70vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        py: 4,
                    }}
                >
                    <Grid container spacing={5} sx={{ maxWidth: 2000, px: 3 }}>
                        <Grid item xs={12} md={6}>
                            <Card elevation={3}>
                                <CardHeader
                                    title="주간 만족도 통계"
                                    titleTypographyProps={{
                                        variant: "h6",
                                        align: "center",
                                        sx: { color: "#5e35b1" },
                                    }}
                                    sx={{ background: "#ede7f6", py: 1 }}
                                />
                                <Divider />
                                <Typography sx={{textAlign: "center", fontSize: "18px", fontWeight: 700}}>{date}</Typography>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={barData}>
                                            <XAxis dataKey="name" stroke="#555" />
                                            <YAxis stroke="#555" />
                                            <Tooltip />
                                            <Bar dataKey="value" fill="#82ca9d" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* 두 번째 카드: 오늘의 급식 전체적 평가 */}
                        <Grid item xs={12} md={6}>
                            <Card elevation={3}>
                                <CardHeader
                                    title="오늘의 급식 전체적 평가"
                                    titleTypographyProps={{
                                        variant: "h6",
                                        align: "center",
                                        sx: { color: "#d81b60" },
                                    }}
                                    sx={{ background: "#fce4ec", py: 1 }}
                                />
                                <Divider />
                                <Typography sx={{textAlign: "center", fontSize: "18px", fontWeight: 700}} >{today}</Typography>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={100}
                                                fill="#8884d8"
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={COLORS[index % COLORS.length]}
                                                    />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </div>
            <div style={{ height: '70px' }} />
            <MobileNavbar />
        </div>
    )
}
