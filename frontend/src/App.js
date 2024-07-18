import React from 'react';
import './assets/css/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FooterComponent, HeaderComponent } from './components';
import {
  ChangePasswordPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  SettingsPage,
  SignUpPage,
  UserPage,
  VerifyEmailPage,
  BoardPage,
  TasksPage
} from './pages';
import { NotificationProvider, UserProvider } from './contexts';

function App() {
  return (
    <Router>
      <UserProvider>
        <HeaderComponent />
        <NotificationProvider>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/logout" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verifyEmail/:token" element={<VerifyEmailPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
            <Route path="/changePassword" element={<ChangePasswordPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </NotificationProvider>
        <FooterComponent />
      </UserProvider>
    </Router>
  );
}

export default App;
