export interface Appointment {
  id?: string;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  appointment_date: Date;
  appointment_time: string;
  notes?: string;
  status: "pending" | "confirmed" | "cancelled";
  created_at?: Date;
}

export interface TimeSlot {
  time: string;
  isAvailable: boolean;
}
