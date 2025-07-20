import { NextResponse } from "next/server";

// -------------services-----------------
import { connectDB } from "../../../../../lib/db";
import AppointmentModel from "../../../../../models/appointmentModel";
import { createId } from "@/services/id_generator/id-generator-service";
import { id_codes } from "@/constants/id_code_constants";
import { CheckUserAccess } from "@/services/auth-services/auth-service";
import { access_levels } from "@/constants/access_constants";
import UserModel from "../../../../../models/UserModel";


export async function POST(req: Request) {
  const { userId, customerName } = await req.json();
  //   no token authentication
  // appointment will created by webhook in n8n

  //   --------- connect to database -----------
  await connectDB();
  // ------------ Check if userId is provided -----------
  if (!userId || userId.trim() === "") {
    return NextResponse.json(
      { success: false, message: "User ID is required" },
      { status: 400 },
    );
  }

  //   check userId is already in user model and it is active
  const user = await UserModel.find({ ID: userId });
  if (!user || !user[0].isActive) {
    return NextResponse.json(
      { success: false, message: "User is not active" },
      { status: 400 },
    );
  }

  //   create appointment
  let appointment;
  try {
    const ID = await createId(id_codes.idCode.appointment);
    appointment = new AppointmentModel({
      ID,
      userId,
      customerName,
      userCreated: 'n8n', // Assuming userId is available in the token
    });

    await appointment.save();
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creating appointment", error },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    message: "Appointment created successfully",
    data: appointment,
  });
}
