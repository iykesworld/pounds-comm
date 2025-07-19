"use client";
import { useEffect } from 'react';
import { useAppDispatch } from '../redux/store';
import { initializeAuth } from '../redux/slices/authSlice';

export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('AuthInitializer: Initializing auth state from localStorage');
    dispatch(initializeAuth());
  }, [dispatch]);

  return null; // This component doesn't render anything
} 