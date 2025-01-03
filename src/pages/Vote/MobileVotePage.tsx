import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeskTopNavbar, Loading, MobileNavbar } from '../../components';
import { Card, CardContent, CardHeader, Checkbox, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import style from './Vote.module.css';

interface MenuItem {
    mealType: number;
    menuItems: string[];
}

interface DeskTopVotePageProps {
    isLoading: boolean;
    menuData: MenuItem[];
    voteMeal: ({ LikeMenus, DisLikeMenus }: { LikeMenus: string[]; DisLikeMenus: string[] }) => Promise<void>;
    todayVoteChecked: boolean
}

export default function DeskTopVotePage({ todayVoteChecked ,isLoading, menuData, voteMeal }: DeskTopVotePageProps) {
    const navigate = useNavigate();
    const [likeMenus,setLikeMenus] = useState<string[]>([])
    const [disLikeMenus,setDisLikeMenus] = useState<string[]>([])
    const [checkedItems, setCheckedItems] = useState<{ [mealType: number]: boolean[] }>({});
    const [page, setPage] = useState<'like' | 'dislike'>('like');
    const [isLoadingPost,setIsLoadingPost] = useState<boolean>(false)

    useEffect(() => {
        const initialCheckedItems = menuData.reduce((acc, item) => {
            acc[item.mealType] = new Array(item.menuItems.length).fill(false);
            return acc;
        }, {} as { [mealType: number]: boolean[] });
        setCheckedItems(initialCheckedItems);
    }, [menuData]);

    const handleCheckboxChange = (mealType: number, index: number) => {
        if(!localStorage.getItem('accessToken')) {
            return alert("로그인을 해주세요.")
        }
        setCheckedItems((prev) => {
            const currentChecks = prev[mealType] || [];
            const selectedCount = currentChecks.filter(Boolean).length;

            if (selectedCount >= 3 && !currentChecks[index]) {
                alert('각 메뉴에서 최대 3개까지 선택할 수 있습니다.');
                return prev;
            }

            return {
                ...prev,
                [mealType]: currentChecks.map((checked, i) => (i === index ? !checked : checked))
            };
        });
    };

    const handleButtonClick = async () => {
        if(!localStorage.getItem('accessToken')) {
            alert('로그인 후 이용해주세요.')
            window.location.href = '/login';
        }
        const selectedMenus = Object.entries(checkedItems).flatMap(([mealType, checks]) =>
            checks.map((checked, index) =>
                checked ? menuData.find((data) => data.mealType === Number(mealType))?.menuItems[index] : null
            )
        ).filter(Boolean) as string[];

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
            } catch (error) {
                console.error('Error submitting vote:', error);
                alert('투표 제출 중 문제가 발생했습니다. 다시 시도해주세요.');
            } finally {
                setIsLoadingPost(false)
                alert('선택이 제출되었습니다.');
                setTimeout(() => navigate('/'), 500);
            }
        }

        setCheckedItems((prev) =>
            Object.keys(prev).reduce((acc, mealType) => {
                acc[Number(mealType)] = new Array(prev[Number(mealType)].length).fill(false);
                return acc;
            }, {} as { [mealType: number]: boolean[] })
        );
    };

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
        <div>
            {
                todayVoteChecked == true ? 
                <div className={style.succesVote}>
                    <h2>오늘 투표를 완료하였습니다.</h2>
                </div> : ""
            }
            {isLoading ? <Loading /> :
                <>
                    <div className={style.TitleContainer}>
                        <h1 className={style.title}>
                            {page === 'like'
                                ? '오늘의 급식 중 맛있었던 메뉴를 선택해주세요!'
                                : '오늘의 급식 중 별로였던 메뉴를 선택해주세요!'}
                        </h1>
                        <span className={style.subTitle}>
                            각 조식, 중식, 석식 메뉴에서 최대 3개까지 선택 가능합니다!
                        </span>
                    </div>
                    <MenuContainer>
                        {menuData.map(({ mealType, menuItems }) => (
                            <StyledCard key={mealType}>
                                <CardHeader
                                    title={mealTypeToString(mealType)}
                                    titleTypographyProps={{ sx: { fontSize: '18px', fontWeight: 'bold' } }}
                                />
                                <CardContent>
                                    <MenuItemContainer>
                                        {menuItems.map((item, index) => (
                                            <MenuItem key={index}>
                                                <MenuNumber>{index + 1}</MenuNumber>
                                                <MenuTitle>{item}</MenuTitle>
                                                <Checkbox
                                                    checked={checkedItems[mealType]?.[index] || false}
                                                    onChange={() => handleCheckboxChange(mealType, index)}
                                                />
                                            </MenuItem>
                                        ))}
                                    </MenuItemContainer>
                                </CardContent>
                            </StyledCard>
                        ))}
                    </MenuContainer>
                    <StyledButton onClick={handleButtonClick}>
                {page === 'like' ? '다음' : '제출'}
            </StyledButton>
                </>
            }
            <div style={{ height: '90px' }} />
            <MobileNavbar />
        </div>
    );
}

const StyledButton = styled(Button)({
    backgroundColor: '#4B7BF5',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    borderRadius: '12px',
    padding: '10px 30px',
    position: 'relative',
    left: '73%',
    '&:hover': {
        backgroundColor: '#3A6EDC'
    }
});

const MenuContainer = styled(Box)({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    padding: '20px'
});

const StyledCard = styled(Card)({
    minWidth: 370,
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
});

const MenuItemContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
});

const MenuItem = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
});

const MenuNumber = styled(Box)({
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#E8EFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    color: '#4B7BF5'
});

const MenuTitle = styled(Box)({
    flex: 1,
    fontSize: '14px',
    color: '#333'
});
