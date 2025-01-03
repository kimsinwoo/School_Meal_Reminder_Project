import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import {
  DeskTopAdmin,
  DeskTopChart,
  DeskTopHome,
  DeskTopLogin,
  DeskTopMypage,
  DeskTopSignUp,
  DeskTopVote,
  MobileAdmin,
  MobileChart,
  MobileHome,
  MobileLogin,
  MobileMypage,
  MobileSignUp,
  MobileVote
} from './pages';

interface MenuData {
  mealType: number;
  menuItems: string[];
  menuCount: number;
}

interface voteMeal {
  LikeMenus: string[];
  DisLikeMenus: string[];
}

const App: React.FC = () => {
  const [menuData, setMenuData] = useState<MenuData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"))
  const [todayVoteCheck, setTodayVoteCheck] = useState<boolean>()
  const [name, setName] = useState<string>('')
  const [classNum, setClassNum] = useState<string>('')
  const [likeCount, setLikeCount] = useState<number>(0)
  const [disLikeCount, setDisLikeCount] = useState<number>(0)
  const [mondayTotal, setMondayTotal] = useState<number>(0)
  const [tuesdayTotal, setTuesdayTotal] = useState<number>(0)
  const [wednesdayTotal, setWednesdayTotal] = useState<number>(0)
  const [thursdayTotal, setThursdayTotal] = useState<number>(0)
  const [FridayTotal, setFridayTotal] = useState<number>(0)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [date, setDate] = useState<string>('')

  const checkVoteFun = async () => {
    try {
      const respones = await axios.post("http://localhost:3030/meal/checkVote", {
        accessToken
      })
      if (respones.data.data !== null) {
        setTodayVoteCheck(true)
      } else {
        setTodayVoteCheck(false)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handlerUserInfo = async () => {
    try {
      const respones = await axios.post("http://localhost:3030/auth/name", {
        accessToken
      })
      console.log(respones.data.data[0])
      setName(respones.data.data[0].Name)
      setClassNum(respones.data.data[0].ClassNum)
      setIsAdmin(respones.data.data[0].isAdmin)
    } catch (e) {
      console.log(e)
    }
  }

  const getMealList = async () => {
    try {
      const response = await axios.get("http://localhost:3030/meal/mealList");
      console.log(response.data);
      const transformedData = response.data.data.map((meal: any) => {
        const menuItems = [
          meal.menu1,
          meal.menu2,
          meal.menu3,
          meal.menu4,
          meal.menu5,
          meal.menu6,
          meal.menu7,
          meal.menu8,
        ].filter(Boolean);

        return {
          mealType: meal.mealType,
          menuItems,
          menuCount: menuItems.length,
        };
      });

      console.log("Transformed Data:", transformedData);
      setMenuData(transformedData);
    } catch (error) {
      console.error("Error fetching meal list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlerChart = async () => {
    try {
      const respones = await axios.get("http://localhost:3030/meal/statistics")
      setLikeCount(respones.data.Like._sum.count)
      setDisLikeCount(respones.data.DisLike._sum.count)
    } catch (e) {
      console.log(e)
    }
  }

  const handlerChartAweek = async () => {
    try {
      const respones = await axios.get("http://localhost:3030/meal/statisticsaweek")
      setDate(respones.data.week)
      setMondayTotal(respones.data.values[0].value)
      setTuesdayTotal(respones.data.values[1].value)
      setWednesdayTotal(respones.data.values[2].value)
      setThursdayTotal(respones.data.values[3].value)
      setFridayTotal(respones.data.values[4].value)
      console.log(respones)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getMealList();
    checkVoteFun();
    handlerUserInfo()
    handlerChart()
    handlerChartAweek()
  }, []);

  const voteMeal = async ({ LikeMenus, DisLikeMenus }: voteMeal): Promise<void> => {
    try {
      const response = await axios.post("http://localhost:3030/meal/mealVote", {
        accessToken,
        LikedMenus: LikeMenus,
        DislikedMenus: DisLikeMenus,
      });

      console.log("Vote submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  }

  function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const today = getFormattedDate();

  return (
    <Routes>
      {
        isMobile ?
          <>
            <Route index element={<MobileHome today={today} isLoading={isLoading} menuData={menuData} />} />
            <Route path="/vote" element={<MobileVote todayVoteChecked={todayVoteCheck ?? false} voteMeal={voteMeal} isLoading={isLoading} menuData={menuData} />} />
            <Route path="/chart" element={<MobileChart today={today} date={date} likeCount={likeCount} disLikeCount={disLikeCount} mondayTotal={mondayTotal}
              tuesdayTotal={tuesdayTotal}
              wednesdayTotal={wednesdayTotal}
              thursdayTotal={thursdayTotal}
              fridayTotal={FridayTotal} />} />
            <Route path="/admin" element={<MobileAdmin />} />
            <Route path="/mypage" element={<MobileMypage name={name} classNum={classNum} />} />
            <Route path="/login" element={<MobileLogin />} />
            <Route path="/register" element={<MobileSignUp />} />
          </> :
          <>
            <Route index element={<DeskTopHome today={today} isAdmin={isAdmin} name={name} isLoading={isLoading} menuData={menuData} />} />
            <Route path="/vote" element={<DeskTopVote isAdmin={isAdmin} name={name} todayVoteChecked={todayVoteCheck ?? false} voteMeal={voteMeal} isLoading={isLoading} menuData={menuData} />} />
            <Route path="/chart" element={<DeskTopChart today={today} date={date} isAdmin={isAdmin} likeCount={likeCount} disLikeCount={disLikeCount} name={name} mondayTotal={mondayTotal} tuesdayTotal={tuesdayTotal} wednesdayTotal={wednesdayTotal} thursdayTotal={thursdayTotal} fridayTotal={FridayTotal} />} />
            <Route path="/admin" element={<DeskTopAdmin name={name} isAdmin={isAdmin} />} />
            <Route path="/mypage" element={<DeskTopMypage name={name} classNum={classNum} isAdmin={isAdmin} />} />
            <Route path="/login" element={<DeskTopLogin />} />
            <Route path="/register" element={<DeskTopSignUp />} />
          </>
      }
    </Routes>
  );
}

export default App;
