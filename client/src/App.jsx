import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import CourseForm from "./components/CourseForm";
import VisitorMessage from "./components/VisitorMessage";
import Settings from "./components/Settings";
import StudentForm from "./components/StudentFrom";
import Students from "./components/Students";
import Teachers from "./components/Teachers";
import Slides from "./components/Slides";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/student" element={<StudentForm />} />
      <Route path="/admin" element={<Login />}>
        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="message" element={<VisitorMessage />} />
        <Route path="settings" element={<Settings />} />
        <Route path="slides" element={<Slides />} />
      </Route>
      <Route path="/register" element={<StudentForm />} />
      <Route path="/admin/course/add" element={<CourseForm />} />
    </Routes>
  );
}

export default App;
