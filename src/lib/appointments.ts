import { supabase } from "./supabase";
import { Appointment, TimeSlot } from "@/types/appointments";
import { Database } from "@/types/supabase";

export const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

export async function createAppointment(
  appointment: Omit<Appointment, "id" | "created_at" | "status">,
): Promise<{ data: any; error: Error | null }> {
  try {
    const appointmentData = {
      patient_name: appointment.patient_name,
      patient_email: appointment.patient_email,
      patient_phone: appointment.patient_phone,
      notes: appointment.notes || "",
      status: "pending" as const,
      appointment_date: appointment.appointment_date
        .toISOString()
        .split("T")[0],
      appointment_time: appointment.appointment_time,
    };

    console.log("Creating appointment with data:", appointmentData);

    const { data, error } = await supabase
      .from("appointments")
      .insert([appointmentData])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      throw error;
    }

    // The email notifications will be handled by the database trigger
    console.log("Appointment created successfully:", data);
    return { data, error: null };
  } catch (error) {
    console.error("Error creating appointment:", error);
    return { data: null, error: error as Error };
  }
}

export async function getAvailableSlots(date: Date): Promise<TimeSlot[]> {
  try {
    const { data: bookedSlots, error } = await supabase
      .from("appointments")
      .select("appointment_time")
      .eq("appointment_date", date.toISOString().split("T")[0])
      .neq("status", "cancelled");

    if (error) throw error;

    const bookedTimes = new Set(
      bookedSlots?.map((slot) => slot.appointment_time) || [],
    );

    return timeSlots.map((time) => ({
      time,
      isAvailable: !bookedTimes.has(time),
    }));
  } catch (error) {
    console.error("Error getting available slots:", error);
    return timeSlots.map((time) => ({ time, isAvailable: true }));
  }
}

export async function getAppointmentsByDate(
  date: Date,
): Promise<Appointment[]> {
  try {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("appointment_date", date.toISOString().split("T")[0])
      .order("appointment_time");

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error getting appointments by date:", error);
    return [];
  }
}
