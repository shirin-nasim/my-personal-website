import { Suspense, useEffect, useState } from "react";
import { useRoutes, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/home";
import Profile from "./components/Profile";
import BookingPage from "./components/booking/BookingPage";
import AppointmentsList from "./components/admin/AppointmentsList";
import ServicesPage from "./components/ServicesPage";
import routes from "tempo-routes";
import { testConnection } from "./lib/supabase";
import { toast } from "./components/ui/use-toast";
import { Toaster } from "./components/ui/toaster";

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-4">
        <h2 className="text-2xl font-semibold mb-4 text-red-600">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <div className="space-x-4">
          <button
            onClick={() => {
              resetErrorBoundary();
              navigate("/");
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const connected = await testConnection();
        setIsConnected(connected);
        if (!connected) {
          toast({
            variant: "destructive",
            title: "Connection Error",
            description:
              "Failed to connect to the database. Please try again later.",
          });
        }
      } catch (error) {
        console.error("Connection error:", error);
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkConnection();
  }, []);

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-4">
          <h2 className="text-2xl font-semibold mb-4 text-red-600">
            Connection Error
          </h2>
          <p className="text-gray-600 mb-6">
            Unable to connect to the server. Please check your internet
            connection and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Suspense fallback={<LoadingFallback />}>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/admin/appointments" element={<AppointmentsList />} />
        </Routes>
      </Suspense>
      <Toaster />
    </div>
  );
}

export default App;
