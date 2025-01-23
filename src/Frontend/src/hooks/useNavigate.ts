import { useContext } from 'react';
import { NavigationContext } from '../context/NavigationContext';

export function useNavigate() {
  const setCurrentScreen = useContext(NavigationContext);
  
  if (!setCurrentScreen) {
    throw new Error('useNavigate must be used within a NavigationProvider');
  }
  
  return setCurrentScreen;
}