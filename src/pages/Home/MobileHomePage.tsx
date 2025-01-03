import React from 'react';
import axios from 'axios';
import { Loading, MobileNavbar } from '../../components';
import { Card, CardContent, CardHeader } from '@mui/material';
import { styled } from '@mui/material/styles';
import style from './HomePage.module.css';
import Box from '@mui/material/Box';

interface MobileHomePageProps {
    isLoading: boolean;
    menuData: { mealType: number; menuItems: string[] }[];
    today: string;
}

const MenuContainer = styled(Box)({
    display: 'flex',
    gap: '20px',
    padding: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    flex: 1,
});

const StyledCard = styled(Card)({
    minWidth: 190,
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    backgroundColor: 'white',
    flex: 1,
});

const MenuItemContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
});

const MenuItem = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 0',
});

const MenuNumber = styled(Box)({
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#E8EFFF',
    color: '#4B7BF5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
});

const MenuTitle = styled(Box)({
    color: '#333',
    fontSize: '14px',
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

export default function MobileHomePage({ isLoading, menuData, today }: MobileHomePageProps) {

    return (
        <div>
            <header className={style.TitleContainer}>
                <h1 className={style.title}>오늘 급식 어때?</h1>
                <p className={style.subTitle}>오늘의 급식을 여러분들이 평가를 해보세요!!</p>
            </header>

            {isLoading ? (
                <Loading />
            ) : (
                <MenuContainer>
                    {menuData.map(({ mealType, menuItems }, index) => (
                        <StyledCard key={index}>
                            <CardHeader
                                title={mealTypeToString(mealType)}
                                titleTypographyProps={{
                                    sx: {
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        color: '#333',
                                    },
                                }}
                            />
                            <CardContent>
                                <MenuItemContainer>
                                    {menuItems.map((item, idx) => (
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

            <div style={{ height: '90px' }} />
            <MobileNavbar />
        </div>
    );
}
