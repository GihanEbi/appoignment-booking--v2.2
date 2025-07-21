import { NextResponse } from "next/server";

// -------------services-----------------
import { connectDB } from "../../../../../lib/db";
import AppointmentModel from "../../../../../models/appointmentModel";
import { getNextAvailableSlotsFromAppointments } from "./getNextAvailableSlots";

export async function GET() {
  // const currentTime = new Date().toISOString();

  // get all appointments
  await connectDB();
  const appointments = await AppointmentModel.find({});
  console.log("Appointments fetched:", appointments);

  const timeSlotList: {
    appointmentStartTime: string;
    appointmentEndTime: string;
  }[] = [];
  appointments.forEach((appointment) => {
    timeSlotList.push({
      appointmentStartTime: appointment.appointmentStartTime,
      appointmentEndTime: appointment.appointmentEndTime,
    });
  });

  // Get 5 next available slots
  const availableSlots = getNextAvailableSlotsFromAppointments(timeSlotList);

  return NextResponse.json(
    {
      success: true,
      data: availableSlots,
    },
    { status: 200 },
  );
}
