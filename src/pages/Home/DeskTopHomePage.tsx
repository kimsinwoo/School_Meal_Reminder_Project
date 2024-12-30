import React from 'react'
import { DeskTopNavbar } from '../../components'
import { Card, CardContent, CardHeader } from '@mui/material';
import { styled } from '@mui/material/styles';
import style from './HomePage.module.css'
import Box from '@mui/material/Box';

interface MenuData {
    [key: string]: string[];
}

export default function DeskTopHomePage() {
    const menuData: MenuData = {
        조식: ['고구마밥', '무생채', '달걀김말이', '떡갈비스틱', '배추김치', '동태매운탕'],
        중식: ['참치마요덮밥', '유부장국', '자장떡볶이', '만두튀김', '배추김치', '방울토마토'],
        석식: ['흑미밥', '바베큐폭찹', '온두부/양념장', '야채무침', '할매골뱅', '닭개장']
    };

    const MenuContainer = styled(Box)({
        display: 'flex',
        gap: '20px',
        padding: '10px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',  // 상하좌우 모두 auto로 설정
        flex: 1
    });

    const StyledCard = styled(Card)({
        minWidth: 570,
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        backgroundColor: 'white',
        flex: 1
    });

    const MenuItemContainer = styled(Box)({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    });

    const MenuItem = styled(Box)({
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 0'
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
        fontSize: '16px'
    });

    const MenuTitle = styled(Box)({
        color: '#333',
        fontSize: '17px'
    });

    return (
        <div className={style.container}>
            <DeskTopNavbar />
            <MenuContainer>
                {Object.entries(menuData).map(([title, items]) => (
                    <StyledCard key={title}>
                        <CardHeader
                            title={title}
                            titleTypographyProps={{
                                sx: {
                                    fontSize: '22px',
                                    fontWeight: 'bold',
                                    color: '#333',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    '&::before': {
                                        content: '""',
                                        display: 'inline-block',
                                        width: '20px',
                                        height: '20px',
                                        backgroundColor: '#4B7BF5',
                                        maskImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'%3E%3Cpath d=\'M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z\'/%3E%3C/svg%3E")',
                                        maskSize: 'cover',
                                        marginRight: '8px'
                                    }
                                }
                            }}
                        />
                        <CardContent>
                            <MenuItemContainer>
                                {items.map((item, index) => (
                                    <MenuItem key={index}>
                                        <MenuNumber>{index + 1}</MenuNumber>
                                        <MenuTitle>{item}</MenuTitle>
                                    </MenuItem>
                                ))}
                            </MenuItemContainer>
                        </CardContent>
                    </StyledCard>
                ))}
            </MenuContainer>
        </div>
    )
}