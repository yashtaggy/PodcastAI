import { google } from "googleapis"
import { NextResponse } from "next/server"

export async function POST(req:Request){

const {events} = await req.json()

const auth = new google.auth.GoogleAuth({

credentials:{
client_email:process.env.GOOGLE_CLIENT_EMAIL,
private_key:process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g,"\n")
},

scopes:["https://www.googleapis.com/auth/calendar"]

})

const calendar = google.calendar({version:"v3",auth})

for(const e of events){

await calendar.events.insert({

calendarId:"primary",

requestBody:{
summary:`Podcast Upload - ${e.platform}`,
description:e.content,

start:{
dateTime:new Date().toISOString(),
timeZone:"Asia/Kolkata"
},

end:{
dateTime:new Date().toISOString(),
timeZone:"Asia/Kolkata"
}

}

})

}

return NextResponse.json({success:true})

}