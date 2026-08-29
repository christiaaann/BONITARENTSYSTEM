import React, {useState, useEffect} from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
const LoginPage = () => {
  const { openGoogleModal } = useAuth();  
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false)

//   ===============================
  const loginWithGoogle = () => {
   setIsLoading(true);

   setTimeout(() => {
     window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  }, 3000);
};
// ==================================

useEffect(() => {
  // Tatakbo ito kapag bumalik ang user sa page (hal. pinindot ang Back button)
  const handlePageShow = (event) => {
    if (event.persisted) {
      setIsLoading(false); // I-reset ang loading kapag galing sa cache o history back
    }
  };

  window.addEventListener('pageshow', handlePageShow);
  
  // Cleanup function para hindi mag-leak ang memory
  return () => {
    window.removeEventListener('pageshow', handlePageShow);
  };
}, []);

  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-center items-center p-6 font-sans antialiased">
      
      {/* Main Container */}
      <div className="w-full max-w-sm flex flex-col items-center space-y-10">
        
        {/* Elegant Minimalist Logo Frame */}
        <div className="relative group">
          {/* Subtle gold ring behind the logo */}
          <div className="absolute inset-0 border border-amber-400/30 rounded-full scale-105 transition-transform duration-500 group-hover:scale-110"></div>
          <img 
            className="w-36 h-36 object-contain rounded-full bg-white p-1" 
            src={logo} 
            alt="BONITA.ph Logo" 
          />
        </div>

        {/* Text Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-serif tracking-wide text-stone-900">
            Welcome back, Gorgeous
          </h1>
          <p className="text-[11px] uppercase tracking-[0.2em] text-amber-600 font-medium">
            Gown & Suit Rental • RTW
          </p>
        </div>

        {/* Action Button */}
        <div className="w-full flex justify-center pt-2">
        <button 
        onClick={loginWithGoogle}
        disabled={isLoading}
        className={`flex cursor-pointer items-center justify-center gap-3   text-amber-100 font-medium transition-all duration-300 active:scale-[0.99] disabled:scale-100 disabled:cursor-not-allowed group ${
        isLoading 
      ? 'w-12 h-12 rounded-full bg-gray-100 p-0' 
      : 'w-full py-3 px-4 rounded-lg shadow-sm bg-[#0D0D0D] hover:bg-stone-800' 
  }`}
        >
        {isLoading ? (
            /* Loading Spinner Circle */
            <svg className="animate-spin h-6 w-6 text-neutral-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        ) : (
            /* Google SVG Icon (Ito yung dati mong icon) */
          <>
            <svg className="w-4 h-4 transition-transform group-hover:scale-105" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
      
        <span className="text-xs uppercase tracking-widest font-light">
           Continue With Google
        </span>
        </>
        )}
        </button>
        </div>

        {/* Minimalist Thin Line Divider */}
        <div className="w-full flex items-center justify-center pt-2">
          <div className="w-12 h-[1px] bg-stone-200"></div>
        </div>

        {/* Footer Note */}
        <p className="text-[10px] text-center text-stone-400 tracking-wide font-light max-w-[250px]">
          By signing in, you agree to our{' '}
          <a href="#" className="underline hover:text-stone-600 transition-colors">Terms</a>{' '}
          &{' '}
          <a href="#" className="underline hover:text-stone-600 transition-colors">Privacy Policy</a>.
        </p>

      </div>
    </div>
  )
}

export default LoginPage