import { NextResponse } from "next/server"

export async function POST(req:Request){

const {title,description} = await req.json()

const prompt = `
Create an AI podcast distribution calendar and reach prediction.

Return JSON:

{
"calendar":[
{"day":"Monday","platform":"YouTube","content":"Full Episode","time":"20:15"},
{"day":"Tuesday","platform":"Instagram","content":"Reel","time":"19:30"},
{"day":"Wednesday","platform":"LinkedIn","content":"Thought Post","time":"09:00"},
{"day":"Thursday","platform":"Twitter","content":"Thread","time":"20:45"}
],
"reach":{
"youtube":70,
"instagram":92,
"linkedin":45,
"twitter":60
}
}

Podcast:
${title}

Description:
${description}
`

const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
contents:[{parts:[{text:prompt}]}]
})

})

const data = await response.json()

const text = data.candidates[0].content.parts[0].text

const cleaned = text.replace(/```json|```/g,"").trim()

return NextResponse.json(JSON.parse(cleaned))

}