// pages/api/events.js

import { NextResponse } from "next/server";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../../../serviceAccountKey.json";

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

async function getEventDocs() {
  try {
    const eventsCollection = db.collection("Events");
    const snapshot = await eventsCollection.get();
    const events = [];
    snapshot.forEach((doc) => {
      events.push({ "Event ID": doc.id, ...doc.data() });
    });
    return events;
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error;
  }
}

async function addEvent(eventData) {
  try {
    const { 
      Company, 
      Contact, 
      Deadline, 
      EventName, 
      LongDescription, 
      ShortDescription, 
      PrizeList, 
      RequiredSkills
    } = eventData;
    if (
      !Company || 
      !Contact || 
      !Deadline || 
      !EventName || 
      !LongDescription || 
      !ShortDescription || 
      !PrizeList || 
      !RequiredSkills
    ) {
      throw new Error("Missing required fields");
    }

    if (!Array.isArray(PrizeList)) {
      throw new Error("PrizeList must be an array");
    }

    const eventDoc = {
      Company,
      Contact,
      Deadline,
      "Event Name": EventName,
      "Long Description": LongDescription,
      "Short Description": ShortDescription,
      "Prize List": PrizeList,
      "Required Skills": RequiredSkills,
    };

    const eventsCollection = db.collection("Events");
    const newEventRef = await eventsCollection.add(eventDoc);

    return { success: true, eventId: newEventRef.id };
  } catch (error) {
    console.error("Error adding event:", error);
    throw error;
  }
}

export async function GET() {
  try {
    const events = await getEventDocs();
    const response = NextResponse.json(events, { status: 200 });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const eventData = await request.json();
    const newEvent = await addEvent(eventData);
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add event" },
      { status: 500 }
    );
  }
}

export const revalidate = 0;
