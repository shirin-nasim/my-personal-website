import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  format,
  parseISO,
  isToday,
  isAfter,
  isBefore,
  addDays,
} from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  Search,
  Filter,
  RefreshCw,
  Mail,
  Phone,
  Clock,
  Calendar as CalendarCheck,
  CheckCircle,
  XCircle,
  AlertCircle,
  UserCircle,
  FileText,
} from "lucide-react";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);
  const [filterStatus, setFilterStatus] = useState<string | undefined>(
    undefined,
  );
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editNotes, setEditNotes] = useState("");

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    upcoming: 0,
    confirmed: 0,
    pending: 0,
    cancelled: 0,
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (appointments.length > 0) {
      applyFilters();
      calculateStats();
    }
  }, [appointments, searchTerm, filterDate, filterStatus]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .order("appointment_date", { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
      setFilteredAppointments(data || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load appointments. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stats = {
      total: appointments.length,
      today: 0,
      upcoming: 0,
      confirmed: 0,
      pending: 0,
      cancelled: 0,
    };

    appointments.forEach((appointment: any) => {
      const appointmentDate = parseISO(appointment.appointment_date);

      // Count by status
      if (appointment.status === "confirmed") stats.confirmed++;
      if (appointment.status === "pending") stats.pending++;
      if (appointment.status === "cancelled") stats.cancelled++;

      // Count today's appointments
      if (isToday(appointmentDate)) stats.today++;

      // Count upcoming appointments (future dates, not cancelled)
      if (
        isAfter(appointmentDate, today) &&
        appointment.status !== "cancelled"
      ) {
        stats.upcoming++;
      }
    });

    setStats(stats);
  };

  const applyFilters = () => {
    let filtered = [...appointments];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (appointment: any) =>
          appointment.patient_name.toLowerCase().includes(term) ||
          appointment.patient_email.toLowerCase().includes(term) ||
          appointment.patient_phone.toLowerCase().includes(term),
      );
    }

    // Apply date filter
    if (filterDate) {
      const dateString = filterDate.toISOString().split("T")[0];
      filtered = filtered.filter(
        (appointment: any) => appointment.appointment_date === dateString,
      );
    }

    // Apply status filter
    if (filterStatus) {
      filtered = filtered.filter(
        (appointment: any) => appointment.status === filterStatus,
      );
    }

    setFilteredAppointments(filtered);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilterDate(undefined);
    setFilterStatus(undefined);
    setFilteredAppointments(appointments);
  };

  const updateAppointmentStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      // Update local state
      setAppointments(
        appointments.map((appointment: any) =>
          appointment.id === id
            ? { ...appointment, status: newStatus }
            : appointment,
        ),
      );

      toast({
        title: "Status Updated",
        description: `Appointment status changed to ${newStatus}`,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update appointment status",
      });
    }
  };

  const updateAppointmentNotes = async () => {
    if (!selectedAppointment) return;

    try {
      const { error } = await supabase
        .from("appointments")
        .update({ notes: editNotes })
        .eq("id", selectedAppointment.id);

      if (error) throw error;

      // Update local state
      setAppointments(
        appointments.map((appointment: any) =>
          appointment.id === selectedAppointment.id
            ? { ...appointment, notes: editNotes }
            : appointment,
        ),
      );

      setIsEditDialogOpen(false);
      toast({
        title: "Notes Updated",
        description: "Appointment notes have been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating notes:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update appointment notes",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const viewAppointmentDetails = (appointment: any) => {
    setSelectedAppointment(appointment);
    setIsViewDialogOpen(true);
  };

  const openEditNotesDialog = (appointment: any) => {
    setSelectedAppointment(appointment);
    setEditNotes(appointment.notes || "");
    setIsEditDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0A2647] mb-8">
            Appointment Management
          </h1>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.today}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.upcoming}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Confirmed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.confirmed}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Pending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {stats.pending}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Cancelled
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {stats.cancelled}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search by name, email or phone"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-[240px] justify-start text-left font-normal ${!filterDate && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filterDate
                        ? format(filterDate, "PPP")
                        : "Filter by date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filterDate}
                      onSelect={setFilterDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Status</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[180px] justify-start"
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      {filterStatus
                        ? filterStatus.charAt(0).toUpperCase() +
                          filterStatus.slice(1)
                        : "Filter by status"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => setFilterStatus("confirmed")}
                    >
                      <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                      Confirmed
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setFilterStatus("pending")}
                    >
                      <AlertCircle className="mr-2 h-4 w-4 text-yellow-600" />
                      Pending
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setFilterStatus("cancelled")}
                    >
                      <XCircle className="mr-2 h-4 w-4 text-red-600" />
                      Cancelled
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Button
                variant="outline"
                onClick={resetFilters}
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Reset
              </Button>

              <Button
                onClick={fetchAppointments}
                className="gap-2 bg-[#0A2647] hover:bg-[#0A2647]/90"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Appointments</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <AppointmentsTable
                appointments={filteredAppointments}
                updateStatus={updateAppointmentStatus}
                viewDetails={viewAppointmentDetails}
                editNotes={openEditNotesDialog}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
              />
            </TabsContent>

            <TabsContent value="today">
              <AppointmentsTable
                appointments={filteredAppointments.filter((appointment: any) =>
                  isToday(parseISO(appointment.appointment_date)),
                )}
                updateStatus={updateAppointmentStatus}
                viewDetails={viewAppointmentDetails}
                editNotes={openEditNotesDialog}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
              />
            </TabsContent>

            <TabsContent value="upcoming">
              <AppointmentsTable
                appointments={filteredAppointments.filter((appointment: any) =>
                  isAfter(parseISO(appointment.appointment_date), new Date()),
                )}
                updateStatus={updateAppointmentStatus}
                viewDetails={viewAppointmentDetails}
                editNotes={openEditNotesDialog}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
              />
            </TabsContent>

            <TabsContent value="past">
              <AppointmentsTable
                appointments={filteredAppointments.filter(
                  (appointment: any) =>
                    isBefore(
                      parseISO(appointment.appointment_date),
                      new Date(),
                    ) && !isToday(parseISO(appointment.appointment_date)),
                )}
                updateStatus={updateAppointmentStatus}
                viewDetails={viewAppointmentDetails}
                editNotes={openEditNotesDialog}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
              />
            </TabsContent>
          </Tabs>

          {/* View Appointment Dialog */}
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="max-w-md">
              {selectedAppointment && (
                <>
                  <DialogHeader>
                    <DialogTitle>Appointment Details</DialogTitle>
                    <DialogDescription>
                      View complete information about this appointment.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">Status</h3>
                      <Badge
                        className={getStatusColor(selectedAppointment.status)}
                      >
                        <span className="flex items-center gap-1">
                          {getStatusIcon(selectedAppointment.status)}
                          {selectedAppointment.status.charAt(0).toUpperCase() +
                            selectedAppointment.status.slice(1)}
                        </span>
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <UserCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Patient</p>
                          <p>{selectedAppointment.patient_name}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p>{selectedAppointment.patient_email}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p>{selectedAppointment.patient_phone}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <CalendarCheck className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Date</p>
                          <p>
                            {format(
                              parseISO(selectedAppointment.appointment_date),
                              "EEEE, MMMM d, yyyy",
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Time</p>
                          <p>{selectedAppointment.appointment_time}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Notes</p>
                          <p className="text-gray-600">
                            {selectedAppointment.notes || "No notes provided"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <DialogFooter className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      onClick={() => openEditNotesDialog(selectedAppointment)}
                      className="w-full sm:w-auto"
                    >
                      Edit Notes
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="w-full sm:w-auto bg-[#0A2647] hover:bg-[#0A2647]/90">
                          Update Status
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            updateAppointmentStatus(
                              selectedAppointment.id,
                              "confirmed",
                            );
                            setIsViewDialogOpen(false);
                          }}
                        >
                          <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                          Confirm
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            updateAppointmentStatus(
                              selectedAppointment.id,
                              "cancelled",
                            );
                            setIsViewDialogOpen(false);
                          }}
                        >
                          <XCircle className="mr-2 h-4 w-4 text-red-600" />
                          Cancel
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            updateAppointmentStatus(
                              selectedAppointment.id,
                              "pending",
                            );
                            setIsViewDialogOpen(false);
                          }}
                        >
                          <AlertCircle className="mr-2 h-4 w-4 text-yellow-600" />
                          Mark as Pending
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>

          {/* Edit Notes Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Appointment Notes</DialogTitle>
                <DialogDescription>
                  Update notes for this appointment.
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <Textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Enter appointment notes here..."
                  className="min-h-[150px]"
                />
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={updateAppointmentNotes}
                  className="bg-[#0A2647] hover:bg-[#0A2647]/90"
                >
                  Save Notes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

interface AppointmentsTableProps {
  appointments: any[];
  updateStatus: (id: string, status: string) => void;
  viewDetails: (appointment: any) => void;
  editNotes: (appointment: any) => void;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => JSX.Element;
}

const AppointmentsTable = ({
  appointments,
  updateStatus,
  viewDetails,
  editNotes,
  getStatusColor,
  getStatusIcon,
}: AppointmentsTableProps) => {
  if (appointments.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No appointments found</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date & Time</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment: any) => (
            <TableRow key={appointment.id} className="hover:bg-gray-50">
              <TableCell>
                <div className="font-medium">
                  {format(
                    parseISO(appointment.appointment_date),
                    "MMM d, yyyy",
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  {appointment.appointment_time}
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{appointment.patient_name}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  <span className="truncate max-w-[150px]">
                    {appointment.patient_email}
                  </span>
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {appointment.patient_phone}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  className={getStatusColor(appointment.status)}
                  variant="outline"
                >
                  <span className="flex items-center gap-1">
                    {getStatusIcon(appointment.status)}
                    {appointment.status}
                  </span>
                </Badge>
              </TableCell>
              <TableCell className="max-w-[200px] truncate">
                {appointment.notes || "-"}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => viewDetails(appointment)}
                  >
                    View
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => viewDetails(appointment)}
                      >
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => editNotes(appointment)}>
                        Edit Notes
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          updateStatus(appointment.id, "confirmed")
                        }
                      >
                        Confirm
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          updateStatus(appointment.id, "cancelled")
                        }
                      >
                        Cancel
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => updateStatus(appointment.id, "pending")}
                      >
                        Mark as Pending
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppointmentsList;
