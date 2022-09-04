import React from 'react';

import AvatarComponent from './components/Avatar';
import BackButton from './components/BackButton';
import DashboardButton from './components/DashboardButton';
import LogoButton from './components/LogoButton';
import LogoutButton from './components/LogoutButton';

const DashboardItems = () => {
  const logoButton = <LogoButton />;
  // todo: fix hard code
  const events = <DashboardButton name={'همه کلاس‌ها'} to={'/events/'} />;
  const judgeAnswers = <DashboardButton disabled name={'تصحیح'} to={'/submitted_answer/'} />;
  const allProblems = <DashboardButton name={'مجموعه مسائل'} to={'/problem_set/1/'} />;
  const logoutButton = <LogoutButton />;
  const Avatar = <AvatarComponent />;
  const backButton = <BackButton />;

  return {
    desktopLeftItems: [logoutButton, Avatar],
    desktopRightItems: [events, allProblems],
    mobileLeftItems: [Avatar],
    mobileRightItems: [],
    mobileMenuListItems: [events, allProblems, logoutButton],
  };
};

export default DashboardItems;
