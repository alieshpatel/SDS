import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import { Toaster, toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import api from './api/axios';
// Globally seamlessly convert all system alerts into elegant UI toasts
window.alert = (message) => {
  const str = message ? message.toString().toLowerCase() : '';
  if (str.includes('error') || str.includes('failed') || str.includes('please select') || str.includes('not found')) {
    toast.error(message, { duration: 4000, position: 'top-right' });
  } else {
    toast.success(message, { duration: 4000, position: 'top-right' });
  }
};

// Layout
import DashboardLayout from './components/DashboardLayout';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import Houses from './pages/admin/Houses';
import MaintenanceAdmin from './pages/admin/MaintenanceAdmin';
import ComplaintsAdmin from './pages/admin/ComplaintsAdmin';
import Reports from './pages/admin/Reports';
import ReligiousFunds from './pages/admin/ReligiousFunds';
import NoticesAdmin from './pages/admin/NoticesAdmin';

// Owner Pages
import OwnerDashboard from './pages/owner/OwnerDashboard';
import MyMaintenance from './pages/owner/MyMaintenance';
import MyComplaints from './pages/owner/MyComplaints';
import MyProfile from './pages/owner/MyProfile';
import NoticeBoard from './pages/owner/NoticeBoard';
import MyReligiousFunds from './pages/owner/MyReligiousFunds';

// Welcome Screen
import Welcome from './pages/Welcome';

function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setProgress(p => {
           if (p >= 99) return 99; // hold at 99% until actual load finishes
           return p + 1;
        });
      }, 40); // speed up loader mapping close to backend wake time (~4s to reach 99)
    }
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ping the backend to wake it up
        await api.get('/api/houses');
      } catch (err) {
        console.log("Retrying...");
      } finally {
        setProgress(100);
        setTimeout(() => setLoading(false), 500); // 500ms delay to show 100% gracefully
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center w-full max-w-sm px-8 relative animate-in fade-in zoom-in duration-700">
           {/* Stylized SDS Logo */}
           <div className="flex items-center justify-center mb-12">
             <div className="relative flex items-center justify-center space-x-[2px]">
               <span className="text-slate-900 font-extrabold tracking-tighter" style={{ fontSize: '6rem', lineHeight: '1' }}>S</span>
               <span className="text-slate-900 font-extrabold tracking-tighter relative" style={{ fontSize: '6rem', lineHeight: '1' }}>
                 D
               </span>
               <span className="text-orange-600 font-extrabold tracking-tighter" style={{ fontSize: '6rem', lineHeight: '1' }}>S</span>
             </div>
           </div>

           {/* Precision Progress Bar */}
           <div className="w-full bg-slate-200 rounded-full h-1.5 mb-4 overflow-hidden shadow-inner flex-shrink-0">
             <div className="bg-orange-500 h-1.5 transition-all duration-300 shadow-[0_0_10px_rgba(249,115,22,0.5)]" style={{ width: `${progress}%` }}></div>
           </div>
           
           <div className="flex justify-between w-full text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
             <span className="animate-pulse">Loading App</span>
             <span className="text-orange-600">{progress}%</span>
           </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Toaster />
      <SignedOut>
        <Welcome />
      </SignedOut>
      
      <SignedIn>
        <RoleRouter />
      </SignedIn>
    </Router>
  );
}

function RoleRouter() {
  const { user } = useUser();
  // Role logic: check public metadata, or default to owner.
  // For demo: if email contains 'admin', treat as admin. You can configure this in Clerk Dashboard.
  const isAdmin = user?.publicMetadata?.role === 'admin' || user?.primaryEmailAddress?.emailAddress?.includes('admin');

  return (
    <DashboardLayout isAdmin={isAdmin}>
      {isAdmin ? (
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/houses" element={<Houses />} />
          <Route path="/maintenance" element={<MaintenanceAdmin />} />
          <Route path="/complaints" element={<ComplaintsAdmin />} />
          <Route path="/religious-funds" element={<ReligiousFunds />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notices" element={<NoticesAdmin />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<OwnerDashboard />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-maintenance" element={<MyMaintenance />} />
          <Route path="/my-complaints" element={<MyComplaints />} />
          <Route path="/notices" element={<NoticeBoard />} />
          <Route path="/religious-funds" element={<MyReligiousFunds />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </DashboardLayout>
  );
}

export default App;
