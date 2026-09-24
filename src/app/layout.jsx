import './globals.css';
import { PlanProvider } from '../context/PlanContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'FitLog — Workout Library & Gym Companion',
  description: 'Train with intent. Log every set. Pick your lifts and track your workout plan.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0e0f12] text-zinc-100 min-h-screen flex flex-col selection:bg-[#ccff00] selection:text-slate-950">
        <PlanProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}
