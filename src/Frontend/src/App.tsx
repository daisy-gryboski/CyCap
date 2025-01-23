import React, { useState } from 'react';
import { HomeScreen } from './screens/HomeScreen';
import { CyCapScreen } from './screens/CyCapScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { RobinhoodScreen } from './screens/RobinhoodScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { LoginScreen } from './screens/LoginScreen';
import { SellerRegistrationScreen } from './screens/SellerRegistrationScreen';
import { CommunityRegistrationScreen } from './screens/CommunityRegistrationScreen';
import { SellerDashboardScreen } from './screens/SellerDashboardScreen';
import { MemberDashboardScreen } from './screens/MemberDashboardScreen';
import { CommunitiesPage } from './screens/CommunitiesPage';
import { AuthProvider } from './context/AuthContext';
import { NavigationProvider } from './context/NavigationContext';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  return (
    <AuthProvider>
      <NavigationProvider setCurrentScreen={setCurrentScreen}>
        <div className="min-h-screen bg-black">
          {currentScreen === 'home' ? (
            <HomeScreen onNavigate={setCurrentScreen} />
          ) : currentScreen === 'cycap' ? (
            <CyCapScreen onBack={() => setCurrentScreen('home')} />
          ) : currentScreen === 'dashboard' ? (
            <DashboardScreen 
              onBack={() => setCurrentScreen('home')} 
              onNavigate={setCurrentScreen}
            />
          ) : currentScreen === 'robinhood' ? (
            <RobinhoodScreen onBack={() => setCurrentScreen('dashboard')} />
          ) : currentScreen === 'signup' ? (
            <SignUpScreen 
              onBack={() => setCurrentScreen('home')}
              onNavigate={setCurrentScreen}
            />
          ) : currentScreen === 'login' ? (
            <LoginScreen onBack={() => setCurrentScreen('home')} />
          ) : currentScreen === 'seller-registration' ? (
            <SellerRegistrationScreen onBack={() => setCurrentScreen('home')} />
          ) : currentScreen === 'community-registration' ? (
            <CommunityRegistrationScreen onBack={() => setCurrentScreen('home')} />
          ) : currentScreen === 'seller-dashboard' ? (
            <SellerDashboardScreen onBack={() => setCurrentScreen('home')} />
          ) : currentScreen === 'member-dashboard' ? (
            <MemberDashboardScreen onBack={() => setCurrentScreen('home')} />
          ) : currentScreen === 'communities' ? (
            <CommunitiesPage onBack={() => setCurrentScreen('home')} />
          ) : null}
        </div>
      </NavigationProvider>
    </AuthProvider>
  );
}