import React from 'react';
import { useLocation } from 'react-router-dom'; // ✅ import useLocation
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashBoard/Dashboard';
import PrivateRoute from './PrivateRoute';
import CreateProfile from '../profile-forms/Createprofile';
import EditProfile from '../profile-forms/EditProfle';
import AddExperience from '../profile-forms/Addexperience';
import AddEducation from '../profile-forms/Addeducation';
import Profiles from '../profile-forms/profiles';
import Profile from '../profile/profile';
import Posts from '../posts/post';
import Post from '../Post/post';
import NotFound from '../layout/notFound';
import { Route, Routes } from 'react-router-dom';

const RoutesComponent = () => {
    const location = useLocation();

    // ✅ Do not render this component on the landing page
    if (location.pathname === '/') {
        return null;
    }

    return (
        <section className="container">
            <Alert />
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profiles" element={<Profiles />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/create-profile" element={<PrivateRoute><CreateProfile /></PrivateRoute>} />
                <Route path="/edit-profile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
                <Route path="/add-experience" element={<PrivateRoute><AddExperience /></PrivateRoute>} />
                <Route path="/add-education" element={<PrivateRoute><AddEducation /></PrivateRoute>} />
                <Route path="/posts" element={<PrivateRoute><Posts /></PrivateRoute>} />
                <Route path="/posts/:id" element={<PrivateRoute><Post /></PrivateRoute>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </section>
    );
};

export default RoutesComponent;
