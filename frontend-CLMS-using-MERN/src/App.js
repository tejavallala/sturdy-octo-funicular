import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import NewUserForm from "./Components/Users/UserRegistration";
import Nav from "./Components/Dashboard/MainDashboard";
import UserForm from "./Components/Users/UserLogin";
import About from "./Components/Items/About";
import Services from "./Components/Items/Services";
import Dashboard from "./Components/Dashboard/UserDashboard";
import Admin from "./Components/Instructor/Admin";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import CourseAddForm from "./Components/Courses/CourseAddForm";
import CourseList from "./Components/Courses/CourseList";
import ViewCourse from "./Components/Courses/ViewCourse";
import Cart from "./Components/Courses/Cart";
import PaymentPage from "./Components/Payment/Payment";
import PaidCourse from "./Components/Courses/PaidCourse";
import CourseContent from "./Components/Courses/CourseContent";
import SupportForm from "./Components/Support/SupportForm";
import UserProfile from "./Components/Profiles/UserProfile"; 
import InstructorRegistration from "./Components/Instructor/InstructorRegistration"; 
import AdminProfile from "./Components/Profiles/AdminProfile";
import PaymentSuccess from "./Components/Payment/PaymentSuccess";
import UserData from "./Components/Users/UserData";
import CourseContentManager from "./Components/Courses/CourseContentManager";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Nav />} />
          <Route path="/user-login" element={<UserForm />} />
          <Route path="/user-registration" element={<NewUserForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-course" element={<CourseAddForm />} />
          <Route path="/course-list" element={<CourseList />} />
          <Route path="view-courses" element={<ViewCourse />} />
          <Route path="add-to-cart" element={<Cart />} />
          <Route path="/payments" element={<PaymentPage />} />
          <Route path="/my-courses" element={<PaidCourse />} />
          <Route path="/course-content" element={<CourseContent />} />
          <Route path="/support" element={<SupportForm />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route
            path="/instructor-registration"
            element={<InstructorRegistration />}
          />
          <Route path="admin-profile" element={<AdminProfile />} />
          <Route path="/user-data" element={<UserData />} />
          <Route path="/manage-content" element={<CourseContentManager />} />
          <Route path="/course-content/:courseId" element={<CourseContent />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
