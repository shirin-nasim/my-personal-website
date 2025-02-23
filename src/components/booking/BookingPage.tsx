import React, { useState, useEffect } from "react";
import {
  createAppointment,
  getAvailableSlots,
  timeSlots,
} from "@/lib/appointments";
import { TimeSlot } from "@/types/appointments";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addDays, format, setHours, setMinutes } from "date-fns";

const CONSULTATION_FEE = 50;

const BookingPage = () => {
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [date, setDate] = useState<Date>();
  const [selectedSlot, setSelectedSlot] = useState<string>();
  const [step, setStep] = useState(1);

  // Disable past dates and weekends
  const disabledDays = {
    before: new Date(),
    after: addDays(new Date(), 30),
    weekends: true,
  };

  const handleDateSelect = async (newDate: Date | undefined) => {
    setDate(newDate);
    setSelectedSlot(undefined);
    if (newDate) {
      setStep(2);
      setIsLoading(true);
      try {
        const slots = await getAvailableSlots(newDate);
        setAvailableSlots(slots);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch available slots. Please try again.",
        });
      }
      setIsLoading(false);
    }
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
    setStep(3);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !selectedSlot) return;

    setIsLoading(true);
    try {
      const { data, error } = await createAppointment({
        patient_name: formData.name,
        patient_email: formData.email,
        patient_phone: formData.phone,
        notes: formData.notes,
        appointment_date: date,
        appointment_time: selectedSlot,
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description:
          "Your appointment has been booked. Check your email for confirmation.",
      });

      // Reset form
      setDate(undefined);
      setSelectedSlot(undefined);
      setStep(1);
      setFormData({ name: "", email: "", phone: "", notes: "" });
    } catch (error: any) {
      console.error("Booking error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.message || "Failed to book appointment. Please try again.",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-[#0A2647] mb-8 text-center">
            Book an Appointment
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1: Date Selection */}
            <Card className={`p-4 ${step === 1 ? "ring-2 ring-blue-500" : ""}`}>
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">1. Select Date</h2>
                <p className="text-sm text-gray-600">
                  Choose your preferred date
                </p>
              </div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                disabled={disabledDays}
                className="rounded-md border"
              />
            </Card>

            {/* Step 2: Time Slot Selection */}
            <Card className={`p-4 ${step === 2 ? "ring-2 ring-blue-500" : ""}`}>
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">2. Select Time</h2>
                <p className="text-sm text-gray-600">Available time slots</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {availableSlots.map(({ time, isAvailable }) => (
                  <Button
                    key={time}
                    variant={selectedSlot === time ? "default" : "outline"}
                    className={`w-full ${(!date || !isAvailable) && "opacity-50 cursor-not-allowed"}`}
                    disabled={!date || !isAvailable || isLoading}
                    onClick={() => handleSlotSelect(time)}
                  >
                    {time}
                    {!isAvailable && " (Booked)"}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Step 3: Patient Details & Payment */}
            <Card className={`p-4 ${step === 3 ? "ring-2 ring-blue-500" : ""}`}>
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">
                  3. Complete Booking
                </h2>
                <p className="text-sm text-gray-600">Fill in your details</p>
              </div>
              <form onSubmit={handlePayment} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    required
                    disabled={step !== 3 || isLoading}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    required
                    disabled={step !== 3 || isLoading}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    required
                    disabled={step !== 3 || isLoading}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    disabled={step !== 3 || isLoading}
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between mb-4">
                    <span>Consultation Fee</span>
                    <span className="font-semibold">${CONSULTATION_FEE}</span>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#0A2647] hover:bg-[#0A2647]/90"
                    disabled={!selectedSlot || step !== 3 || isLoading}
                  >
                    {isLoading ? "Processing..." : "Pay & Book Appointment"}
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Selected Date & Time Summary */}
          {date && selectedSlot && (
            <div className="mt-8 text-center text-gray-600">
              Selected: {format(date, "MMMM d, yyyy")} at {selectedSlot}
            </div>
          )}
        </motion.div>
      </div>
      <Toaster />
    </div>
  );
};

export default BookingPage;
