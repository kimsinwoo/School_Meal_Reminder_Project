import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeskTopNavbar, Loading } from '../../components';
import { Card, CardContent, CardHeader, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';
import style from './Vote.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface MenuItemData {
    mealType: number;
    menuItems: string[];
}

interface DeskTopVotePageProps {
    isLoading: boolean;
    menuData: MenuItemData[];
    voteMeal: ({ LikeMenus, DisLikeMenus }: { LikeMenus: string[]; DisLikeMenus: string[] }) => Promise<void>;
    todayVoteChecked: boolean;
    name: string;
    isAdmin: boolean;
}

export default function DeskTopVotePage({ isAdmin ,todayVoteChecked ,isLoading, menuData, voteMeal, name }: DeskTopVotePageProps) {
    const navigate = useNavigate();
    const [likeMenus,setLikeMenus] = useState<string[]>([])
    const [disLikeMenus,setDisLikeMenus] = useState<string[]>([])
    const [checkedItems, setCheckedItems] = useState<{ [mealType: number]: boolean[] }>({});
    const [page, setPage] = useState<'like' | 'dislike'>('like');
    const [isLoadingPost,setIsLoadingPost] = useState<boolean>(false)

    useEffect(() => {
        const initialCheckedItems = menuData.reduce((acc, data) => {
            acc[data.mealType] = new Array(data.menuItems.length).fill(false);
            return acc;
        }, {} as { [mealType: number]: boolean[] });

        setCheckedItems(initialCheckedItems);
    }, [menuData]);

    const handleCheckboxChange = (mealType: number, index: number) => {
        if(!localStorage.getItem('accessToken')) {
            alert("로그인을 해주세요.")
            return window.location.href="/login"
        }
        setCheckedItems((prev) => {
            const selectedCount = prev[mealType].filter((checked) => checked).length;
            const isCurrentlyChecked = prev[mealType][index];

            if (selectedCount >= 3 && !isCurrentlyChecked) {
                alert('각 메뉴에서 최대 3개까지 선택할 수 있습니다.');
                return prev;
            }

            return {
                ...prev,
                [mealType]: prev[mealType].map((checked, i) => (i === index ? !checked : checked)),
            };
        });
    };

    const handleButtonClick = async () => {
        if(!localStorage.getItem('accessToken')) {
            alert('로그인 후 이용해주세요.')
            window.location.href = '/login';
        }
        const selectedMenus = Object.entries(checkedItems)
            .flatMap(([mealType, checks]) =>
                checks
                    .map((checked, index) =>
                        checked
                            ? menuData.find((data) => data.mealType === Number(mealType))?.menuItems[index]
                            : null
                    )
            )
            .filter(Boolean) as string[];

        if (page === 'like') {
            // LikeMenus에 추가
            setLikeMenus((prev) => [...prev, ...selectedMenus]);
            setPage('dislike');
        } else {
            // DisLikeMenus에 추가
            setDisLikeMenus((prev) => [...prev, ...selectedMenus]);

            // POST 요청 보내기
            try {
                setIsLoadingPost(true)
                await voteMeal({
                    LikeMenus: [...likeMenus],
                    DisLikeMenus: [...selectedMenus],
                });
                setIsLoadingPost(false)
                alert('선택이 제출되었습니다.');
                setTimeout(() => {
                    navigate('/')
                    window.location.reload()
                }, 500);
            } catch (error) {
                console.error('Error submitting vote:', error);
                alert('투표 제출 중 문제가 발생했습니다. 다시 시도해주세요.');
            } finally {
            }
        }

        // 체크 상태 초기화
        const resetCheckedState = Object.keys(checkedItems).reduce((acc, mealType) => {
            acc[Number(mealType)] = new Array(checkedItems[Number(mealType)].length).fill(false);
            return acc;
        }, {} as { [mealType: number]: boolean[] });

        setCheckedItems(resetCheckedState);
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
            backgroundColor: '#3A6EDC',
        },
    });

    const MenuContainer = styled(Box)({
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '20px',
        padding: '20px',
    });

    const StyledCard = styled(Card)({
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    });

    const MenuItemContainer = styled(Box)({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    });

    const MenuItem = styled(Box)({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        flexGrow: 1,
        color: '#333',
        fontSize: '17px',
        margin: '0 0 0 15px',
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
            {
                todayVoteChecked && 
                <div className={style.succesVote}>
                    <h2>오늘 투표를 완료하였습니다.</h2>
                </div>
            }
            <div className={style.TitleContainer}>
                <h1 className={style.Deskttitle}>
                    {page === 'like' ? '맛있었던 메뉴를 선택하세요!' : '별로였던 메뉴를 선택하세요!'}
                </h1>
                <span className={style.DeskSubTitle}>조식, 중식, 석식에서 각 3개까지 선택 가능합니다.</span>
            </div>
            {isLoading ? (
                <Loading />
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
                                            <Checkbox
                                                checked={checkedItems[data.mealType]?.[idx] || false}
                                                onChange={() => handleCheckboxChange(data.mealType, idx)}
                                            />
                                        </MenuItem>
                                    ))}
                                </MenuItemContainer>
                            </CardContent>
                        </StyledCard>
                    ))}
                </MenuContainer>
            )}
            <Box textAlign="center">
                <StyledButton onClick={handleButtonClick}>
                    {
                        isLoadingPost && isLoading ? <Loading/> :
                        page === 'like' ? '다음으로' : '제출'
                    }
                </StyledButton>
            </Box>
        </div>
    );
}
