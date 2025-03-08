import { Button } from "@/components/ui/button";
import { config } from "@/config";
import { useState } from "react";

interface Props {
  amount: number;
  onSuccess: (e: React.FormEvent) => void;
  onError: (error: Error) => void;
  patientData?: {
    name: string;
    email: string;
    phone: string;
    date: Date;
    time: string;
    notes?: string;
  };
}

export const PaymentForm = ({
  amount,
  onSuccess,
  onError,
  patientData,
}: Props) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Call parent's submit handler
      onSuccess(e);
    } catch (error) {
      onError(error as Error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Payment Summary</h3>
        <div className="flex justify-between">
          <span>Consultation Fee</span>
          <span>${amount}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm mb-3">
            This is a demo payment form. In a real application, you would enter
            your payment details here.
          </p>
          <p className="text-sm text-gray-600">
            For this demo, clicking the button below will simulate a successful
            payment.
          </p>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#0A2647] hover:bg-[#0A2647]/90"
        disabled={isProcessing}
      >
        {isProcessing ? (
          <div className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing Payment...
          </div>
        ) : (
          `Pay $${amount}`
        )}
      </Button>
    </form>
  );
};
