"use client";

import { useState, useContext, useEffect, useMemo } from "react";
import { EpisodesContext } from "@/context/episodes-context";

import { Switch } from "@/components/ui/switch";

import {
  CalendarDays,
  Calendar,
  Clock,
  TrendingUp,
  Youtube,
  Instagram,
  Linkedin,
  Twitter,
  Zap,
  Radio,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Globe,
} from "lucide-react";

/* PLATFORM CONFIG */

const PLATFORM_META: Record<
  string,
  { Icon: any; color: string; glow: string; bg: string }
> = {
  YouTube: {
    Icon: Youtube,
    color: "#FF4040",
    glow: "rgba(255,64,64,0.35)",
    bg: "rgba(255,64,64,0.08)",
  },
  Instagram: {
    Icon: Instagram,
    color: "#E040FB",
    glow: "rgba(224,64,251,0.35)",
    bg: "rgba(224,64,251,0.08)",
  },
  LinkedIn: {
    Icon: Linkedin,
    color: "#3EAAFF",
    glow: "rgba(62,170,255,0.35)",
    bg: "rgba(62,170,255,0.08)",
  },
  Twitter: {
    Icon: Twitter,
    color: "#22D3EE",
    glow: "rgba(34,211,238,0.35)",
    bg: "rgba(34,211,238,0.08)",
  },
};

export default function DistributionHubPage() {
  const { episodes } = useContext(EpisodesContext);

  const processedEpisodes = useMemo(
    () => episodes.filter((ep: any) => ep.status === "processed"),
    [episodes]
  );

  const [selectedEpisode, setSelectedEpisode] = useState<any>(null);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [reach, setReach] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [autoPosting, setAutoPosting] = useState(false);
  const [synced, setSynced] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  async function generatePlan() {
    if (!selectedEpisode) return;

    setLoading(true);

    const res = await fetch("/api/ai-distribution", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: selectedEpisode.title,
        description: selectedEpisode.description,
      }),
    });

    const data = await res.json();

    setSchedule(data.calendar || []);
    setReach(data.reach || {});

    setLoading(false);
  }

  useEffect(() => {
    if (selectedEpisode) generatePlan();
  }, [selectedEpisode]);

  async function syncCalendar() {
    await fetch("/api/google-calendar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ events: schedule }),
    });

    setSynced(true);

    setTimeout(() => setSynced(false), 3000);
  }

  return (
    <>
      {/* GLOBAL STYLES */}

      <style>{`

      .hub-root{
        width:100%;
        max-width:100%;
        overflow-x:hidden;
        padding:1.5rem;
        background:#0D0F18;
        color:#E2E8F0;
      }

      .hub-inner{
        width:100%;
        max-width:100%;
        margin:auto;
      }

      .layout-cols{
        display:grid;
        grid-template-columns:minmax(260px,320px) 1fr;
        gap:1.5rem;
        width:100%;
      }

      @media(max-width:860px){
        .layout-cols{
          grid-template-columns:1fr;
        }
      }

      .content-grid{
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
        gap:1.5rem;
      }

      .schedule-grid{
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(140px,1fr));
        gap:10px;
      }

      .episode-btn{
        width:100%;
        text-align:left;
        padding:14px;
        border-radius:10px;
        border:1px solid rgba(255,255,255,0.08);
        background:#12151F;
        transition:all .2s;
      }

      .episode-btn:hover{
        transform:translateX(4px);
        background:#181C2A;
      }

      .episode-btn.selected{
        border-color:#6EE7B7;
        background:rgba(110,231,183,0.08);
      }

      .episode-btn-title{
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        max-width:200px;
      }

      .hub-card{
        background:#12151F;
        border:1px solid rgba(255,255,255,0.07);
        border-radius:14px;
      }

      .hub-card-header{
        padding:16px;
        border-bottom:1px solid rgba(255,255,255,0.06);
        font-weight:600;
        display:flex;
        align-items:center;
        gap:8px;
      }

      .hub-card-body{
        padding:16px;
      }

      .reach-track{
        width:100%;
        height:6px;
        background:#181C2A;
        border-radius:999px;
        overflow:hidden;
      }

      .reach-fill{
        height:100%;
        border-radius:999px;
        transition:width 1s;
      }

      `}</style>

      <div className="hub-root">
        <div className="hub-inner">

          {/* HEADER */}

          <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>

            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <CalendarDays size={22}/>
              <h1 style={{fontSize:28,fontWeight:700}}>
                Distribution Hub
              </h1>
            </div>

            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <Zap size={16}/>
              <span style={{fontSize:13}}>Auto Distribution</span>

              <Switch
                checked={autoPosting}
                onCheckedChange={setAutoPosting}
              />
            </div>

          </div>

          {/* MAIN GRID */}

          <div className="layout-cols">

            {/* LEFT SIDE */}

            <div className="hub-card">

              <div className="hub-card-header">
                <Radio size={14}/>
                Episodes
              </div>

              <div className="hub-card-body">

                {processedEpisodes.map((episode:any)=>(
                  <button
                    key={episode.id}
                    onClick={()=>setSelectedEpisode(episode)}
                    className={`episode-btn ${selectedEpisode?.id===episode.id?"selected":""}`}
                  >

                    <div className="episode-btn-title">
                      {episode.title}
                    </div>

                    <div style={{fontSize:11,color:"#64748B"}}>
                      processed
                    </div>

                  </button>
                ))}

              </div>

            </div>


            {/* RIGHT SIDE */}

            <div>

            {selectedEpisode ? (

            <div className="content-grid">

              {/* CALENDAR */}

              <div className="hub-card">

                <div className="hub-card-header">
                  <Calendar size={14}/>
                  Smart Calendar
                </div>

                <div className="hub-card-body">

                {loading ? (
                  <p>AI generating schedule...</p>
                ) : (

                  <div className="schedule-grid">

                    {schedule.map((item:any,i:number)=>{

                      const meta = PLATFORM_META[item.platform]

                      const Icon = meta?.Icon || Globe

                      return(

                      <div
                        key={i}
                        style={{
                          padding:12,
                          borderRadius:10,
                          background:meta?.bg || "#181C2A"
                        }}
                      >

                        <div style={{fontSize:11,color:"#64748B"}}>
                          {item.day}
                        </div>

                        <div style={{display:"flex",alignItems:"center",gap:6}}>

                          <Icon
                            size={14}
                            color={meta?.color}
                          />

                          <b>{item.platform}</b>

                        </div>

                        <div style={{fontSize:12}}>
                          {item.content}
                        </div>

                        <div style={{fontSize:11,color:"#64748B",marginTop:4}}>
                          <Clock size={10}/> {item.time}
                        </div>

                      </div>

                      )

                    })}

                  </div>

                )}

                <div style={{marginTop:16}}>

                  <button
                    onClick={syncCalendar}
                    style={{
                      width:"100%",
                      padding:12,
                      borderRadius:10,
                      background:"rgba(110,231,183,0.1)",
                      border:"1px solid rgba(110,231,183,0.3)",
                      cursor:"pointer"
                    }}
                  >

                    {synced ? "Calendar Synced!" : "Sync with Google Calendar"}

                  </button>

                </div>

                </div>

              </div>


              {/* REACH */}

              <div className="hub-card">

                <div className="hub-card-header">
                  <TrendingUp size={14}/>
                  Predicted Reach
                </div>

                <div className="hub-card-body">

                  {Object.entries(reach).map(([platform,value]:any)=>{

                    const meta = PLATFORM_META[
                      Object.keys(PLATFORM_META).find(
                        k=>k.toLowerCase()===platform.toLowerCase()
                      ) || ""
                    ]

                    const Icon = meta?.Icon || Globe

                    return(

                      <div key={platform} style={{marginBottom:14}}>

                        <div style={{display:"flex",justifyContent:"space-between"}}>

                          <div style={{display:"flex",gap:6,alignItems:"center"}}>
                            <Icon size={12} color={meta?.color}/>
                            {platform}
                          </div>

                          <span>{value}%</span>

                        </div>

                        <div className="reach-track">

                          <div
                            className="reach-fill"
                            style={{
                              width:`${value}%`,
                              background:meta?.color
                            }}
                          />

                        </div>

                      </div>

                    )

                  })}

                </div>

              </div>

            </div>

            ) : (

              <div style={{padding:40,textAlign:"center",opacity:.7}}>
                <Sparkles size={30}/>
                <p>Select an episode to generate AI distribution plan</p>
              </div>

            )}

            </div>

          </div>

        </div>
      </div>
    </>
  );
}