import React, { useEffect, useState } from 'react';
import { DeskTopNavbar, Loading } from '../../components';
import { Card, CardContent, CardHeader } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import axios from 'axios';
import style from './HomePage.module.css';

interface MenuData {
    mealType: number;
    menuItems: string[];
}

interface DeskTopHomePageProps {
    isLoading: boolean;
    menuData: MenuData[];
    name: string;
    isAdmin: boolean;
    today: string;
}

export default function DeskTopHomePage({ isLoading, menuData, name, isAdmin, today }: DeskTopHomePageProps) {
    const MenuContainer = styled(Box)({
        display: 'flex',
        gap: '20px',
        padding: '10px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        flex: 1,
    });

    const StyledCard = styled(Card)({
        minHeight: 520,
        minWidth: 570,
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        backgroundColor: 'white',
        flex: 1,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
        },
    });

    const MenuItemContainer = styled(Box)({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        height: '100%',
    });

    const MenuItem = styled(Box)({
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 0',
    });

    const MenuNumber = styled(Box)({
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        backgroundColor: '#E8EFFF',
        color: '#4B7BF5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
    });

    const MenuTitle = styled(Box)({
        color: '#333',
        fontSize: '17px',
    });

    const mealTypeToString = (mealType: number) => {
        switch (mealType) {
            case 1:
                return '조식';
            case 2:
                return '중식';
            case 3:
                return '석식';
            default:
                return '기타';
        }
    };

    return (
        <div className={style.container}>
            <DeskTopNavbar name={name} isAdmin={isAdmin} />
            {isLoading ? (
                <Loading />
            ) : menuData.length === 0 ? (
                <div>No menu data available</div>
            ) : (
                <MenuContainer>
                    {menuData.map((data, index) => (
                        <StyledCard key={index}>
                            <CardHeader
                                title={mealTypeToString(data.mealType)}
                                titleTypographyProps={{
                                    sx: {
                                        fontSize: '22px',
                                        fontWeight: 'bold',
                                        color: '#333',
                                    },
                                }}
                            />
                            <CardContent>
                                <MenuItemContainer>
                                    {data.menuItems.map((item, idx) => (
                                        <MenuItem key={idx}>
                                            <MenuNumber>{idx + 1}</MenuNumber>
                                            <MenuTitle>{item}</MenuTitle>
                                        </MenuItem>
                                    ))}
                                </MenuItemContainer>
                            </CardContent>
                        </StyledCard>
                    ))}
                </MenuContainer>
            )}
        </div>
    );
}
