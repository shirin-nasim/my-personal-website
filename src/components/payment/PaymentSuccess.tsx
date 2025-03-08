import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { config } from "@/config";
import {
  Check,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Download,
} from "lucide-react";

interface PaymentSuccessProps {
  appointmentDetails: {
    name: string;
    email: string;
    phone: string;
    date: Date;
    time: string;
    notes?: string;
  };
  transactionId?: string;
}

const PaymentSuccess = ({
  appointmentDetails,
  transactionId = `TXN-${Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0")}`,
}: PaymentSuccessProps) => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    if (showConfetti) {
      // Create a simple confetti effect with CSS
      const createConfetti = () => {
        const container = document.createElement("div");
        container.style.position = "fixed";
        container.style.top = "0";
        container.style.left = "0";
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.pointerEvents = "none";
        container.style.zIndex = "1000";
        document.body.appendChild(container);

        const colors = [
          "#1E88E5",
          "#43A047",
          "#E53935",
          "#FDD835",
          "#8E24AA",
          "#00ACC1",
        ];

        for (let i = 0; i < 150; i++) {
          const confetti = document.createElement("div");
          const size = Math.random() * 10 + 5;

          confetti.style.position = "absolute";
          confetti.style.width = `${size}px`;
          confetti.style.height = `${size}px`;
          confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];
          confetti.style.borderRadius = "50%";
          confetti.style.opacity = "0";
          confetti.style.top = "0";
          confetti.style.left = `${Math.random() * 100}%`;
          confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
          confetti.style.animationDelay = `${Math.random() * 2}s`;

          container.appendChild(confetti);

          setTimeout(() => {
            if (container.parentNode) {
              document.body.removeChild(container);
            }
          }, 5000);
        }

        // Add the animation to the document
        const style = document.createElement("style");
        style.innerHTML = `
          @keyframes fall {
            0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0.2; }
          }
        `;
        document.head.appendChild(style);
      };

      createConfetti();

      return () => {
        setShowConfetti(false);
      };
    }
  }, [showConfetti]);

  const handleDownloadReceipt = () => {
    // Create a simple receipt
    const receiptContent = `
      APPOINTMENT RECEIPT
      ------------------
      Transaction ID: ${transactionId}
      Date: ${new Date().toLocaleString()}
      
      Patient: ${appointmentDetails.name}
      Email: ${appointmentDetails.email}
      Phone: ${appointmentDetails.phone}
      
      Appointment Details:
      Date: ${format(appointmentDetails.date, "MMMM d, yyyy")}
      Time: ${appointmentDetails.time}
      
      Amount Paid: $${config.appointments.consultationFee}
      Payment Status: Completed
      
      Thank you for choosing ${config.doctor.name}'s clinic!
      For any questions, please contact us at ${config.contact.phone}
    `;

    // Create a blob and download it
    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 overflow-hidden"
      >
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white text-center">
          <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
            <Check className="h-10 w-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
          <p>Your appointment has been successfully scheduled</p>
        </div>

        {/* Appointment Details */}
        <div className="p-6">
          <div className="mb-6 text-center">
            <p className="text-gray-500 mb-1">Transaction ID</p>
            <p className="font-mono font-medium">{transactionId}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Appointment Details
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-gray-600">
                    {format(appointmentDetails.date, "EEEE, MMMM d, yyyy")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-gray-600">{appointmentDetails.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-gray-600">{config.contact.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Patient Information
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">👤</span>
                </div>
                <div>
                  <p className="font-medium">Name</p>
                  <p className="text-gray-600">{appointmentDetails.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">{appointmentDetails.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">{appointmentDetails.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={handleDownloadReceipt}
            >
              <Download className="h-4 w-4" />
              Download Receipt
            </Button>

            <Button
              className="flex-1 bg-[#0A2647] hover:bg-[#0A2647]/90"
              onClick={() => navigate("/")}
            >
              Return to Home
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              A confirmation email has been sent to {appointmentDetails.email}
            </p>
            <p className="mt-2">
              If you need to reschedule, please call us at{" "}
              {config.contact.phone}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
