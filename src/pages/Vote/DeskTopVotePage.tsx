import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeskTopNavbar } from '../../components';
import { Card, CardContent, CardHeader, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';
import style from './Vote.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface MenuData {
    [key: string]: string[];
}

export default function DeskTopVotePage() {
    const navigate = useNavigate();

    const menuData: MenuData = {
        조식: ['고구마밥', '무생채', '달걀김말이', '떡갈비스틱', '배추김치', '동태매운탕'],
        중식: ['참치마요덮밥', '유부장국', '자장떡볶이', '만두튀김', '배추김치', '방울토마토'],
        석식: ['흑미밥', '바베큐폭찹', '온두부/양념장', '야채무침', '할매골뱅', '닭개장']
    };

    const StyledButton = styled(Button)({
        backgroundColor: '#4B7BF5',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '16px',
        borderRadius: '12px',
        padding: '12px 40px',
        marginTop: '20px',
        '&:hover': {
            backgroundColor: '#3A6EDC'
        }
    });

    const MenuContainer = styled(Box)({
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '20px',
        padding: '20px',
        justifyContent: 'center',
        alignItems: 'center',
    });

    const StyledCard = styled(Card)({
        minWidth: 400,
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
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
        flex: 1,
    });

    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean[] }>(
        Object.keys(menuData).reduce((acc, key) => {
            acc[key] = menuData[key].map(() => false);
            return acc;
        }, {} as { [key: string]: boolean[] })
    );

    const [page, setPage] = useState<'like' | 'dislike'>('like');
    const [likedMenus, setLikedMenus] = useState<string[]>([]);
    const [dislikedMenus, setDislikedMenus] = useState<string[]>([]);

    const handleCheckboxChange = (mealType: string, index: number) => {
        setCheckedItems((prev) => {
            const selectedCount = prev[mealType].filter((checked) => checked).length;
            const isCurrentlyChecked = prev[mealType][index];

            if (selectedCount >= 3 && !isCurrentlyChecked) {
                alert('각 메뉴에서 최대 3개까지 선택할 수 있습니다.');
                return prev;
            }

            return {
                ...prev,
                [mealType]: prev[mealType].map((checked, i) => (i === index ? !checked : checked))
            };
        });
    };

    const handleButtonClick = () => {
        if (page === 'like') {
            const selectedMenus = Object.entries(checkedItems)
                .flatMap(([mealType, checks]) =>
                    checks.map((checked, index) => (checked ? menuData[mealType][index] : null))
                )
                .filter((menu) => menu);
            setLikedMenus(selectedMenus as string[]);
            setCheckedItems(
                Object.keys(menuData).reduce((acc, key) => {
                    acc[key] = menuData[key].map(() => false);
                    return acc;
                }, {} as { [key: string]: boolean[] })
            );
            setPage('dislike');
        } else {
            const selectedMenus = Object.entries(checkedItems)
                .flatMap(([mealType, checks]) =>
                    checks.map((checked, index) => (checked ? menuData[mealType][index] : null))
                )
                .filter((menu) => menu);
            setDislikedMenus(selectedMenus as string[]);

            alert('선택이 제출되었습니다.');

            setTimeout(() => {
                navigate('/');  
            }, 2000);
        }
    };

    useEffect(() => {
        if (page === 'dislike') {
            console.log('Liked Menus:', likedMenus);
        }
    }, [likedMenus]);

    useEffect(() => {
        if (page === 'dislike') {
            console.log('Disliked Menus:', dislikedMenus);
        }
    }, [dislikedMenus]);


    return (
        <div className={style.container}>
            <DeskTopNavbar />
            <div className={style.TitleContainer}>
                <h1 className={style.Deskttitle}>
                    {page === 'like' ? '맛있었던 메뉴를 선택하세요!' : '별로였던 메뉴를 선택하세요!'}
                </h1>
                <span className={style.DeskSubTitle}>조식, 중식, 석식에서 각 3개까지 선택 가능합니다.</span>
            </div>
            <MenuContainer>
                {Object.entries(menuData).map(([title, items]) => (
                    <StyledCard key={title}>
                        <CardHeader
                            title={title}
                            titleTypographyProps={{
                                sx: {
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: '#333',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                }
                            }}
                        />
                        <CardContent>
                            <MenuItemContainer>
                                {items.map((item, index) => (
                                    <MenuItem key={index}>
                                        <MenuNumber>{index + 1}</MenuNumber>
                                        <MenuTitle>{item}</MenuTitle>
                                        <Checkbox
                                            checked={checkedItems[title][index]}
                                            onChange={() => handleCheckboxChange(title, index)}
                                        />
                                    </MenuItem>
                                ))}
                            </MenuItemContainer>
                        </CardContent>
                    </StyledCard>
                ))}
            </MenuContainer>
            <Box textAlign="center">
                <StyledButton onClick={handleButtonClick}>
                    {page === 'like' ? '다음으로' : '제출'}
                </StyledButton>
            </Box>
        </div>
    );
}
