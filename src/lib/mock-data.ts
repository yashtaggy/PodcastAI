import { Episode, AnalyticsData } from './types';
import { PlaceHolderImages } from './placeholder-images';

const findImage = (hint: string) => {
    const img = PlaceHolderImages.find(p => p.imageHint.includes(hint));
    return img ? { url: img.imageUrl, hint: img.imageHint } : { url: 'https://picsum.photos/seed/error/600/400', hint: 'placeholder' };
}

export const episodes: Episode[] = [
  {
    id: 'ep1',
    title: 'The Future of AI with Dr. Anya Sharma',
    uploadDate: '2024-07-20',
    duration: '45:32',
    status: 'completed',
    imageUrl: findImage('microphone').url,
    imageHint: findImage('microphone').hint,
    podScore: {
      podScore: {
        questionQuality: 9,
        domainExpertise: 10,
        presentationQuality: 8,
        engagementStrength: 9,
        overallScore: 9,
      },
      highMoments: [
        { timestamp: 345, emotion: 'Awe', score: 9.5, viralPotential: 0.85, text: "When we consider quantum computing's impact on AI, it's not just an evolution; it's a revolution that will redefine consciousness itself." },
        { timestamp: 1210, emotion: 'Excitement', score: 9.2, viralPotential: 0.82, text: "The first truly sentient AI won't be a cold machine; it will likely emerge from a network, learning from our collective dreams and stories." },
        { timestamp: 2405, emotion: 'Controversy', score: 8.8, viralPotential: 0.9, text: "There's a significant ethical dilemma we're ignoring: should an AI have rights? My answer might surprise you... yes." }
      ],
      lowEnergySections: [
        { start: 600, end: 720, reason: 'Technical jargon without clear explanation.' }
      ],
      dropPrediction: 'A potential drop-off around the 10-minute mark due to deep technical explanations. Recommend adding a simpler analogy.',
      viralScore: 88,
    },
    contentAssets: {
      platformContent: {
        instagram: {
          reelScripts: ["Hook: 'AI will have rights?' - Watch as Dr. Sharma explains the controversial future of AI ethics.", "Are we ready for conscious AI? Dr. Sharma gives a shocking answer.", "Quantum computing could change EVERYTHING. Here's how."],
          hooks: ["Will AI achieve consciousness?", "The #1 myth about quantum computing.", "Could AI learn from your dreams?", "The ethical question EVERYONE is avoiding.", "One sentence that will change how you see AI."],
          hashtags: ["#AI", "#FutureTech", "#Podcast", "#QuantumComputing", "#ArtificialIntelligence", "#Ethics", "#TechTalk", "#Innovation", "#PodVision", "#Science"],
          captions: ["Is AI consciousness inevitable? Dr. Anya Sharma dives deep into the future of tech and ethics in our latest episode. Link in bio!", "Mind-blowing conversation with Dr. Anya Sharma on AI, quantum leaps, and digital consciousness. You don't want to miss this.", "We asked an expert if AI should have rights. Her answer was not what we expected. Listen now."]
        },
        linkedin: {
          authorityPost: "The intersection of quantum computing and artificial intelligence represents a paradigm shift not just in technology, but in our understanding of consciousness itself. In my latest podcast episode, Dr. Anya Sharma, a leading researcher in the field, provides a compelling analysis of the upcoming challenges and opportunities. We discuss the technical underpinnings, the ethical frameworks required, and the potential for AI to emerge from our collective digital footprint. This is a must-listen for any professional in the tech, ethics, and innovation sectors. #AI #QuantumComputing #FutureofWork #Ethics #Leadership",
          storyPost: "I had my mind blown this week. I went into my conversation with Dr. Anya Sharma thinking I understood the basics of AI. I left with a completely new perspective on consciousness, digital existence, and well... dreams. It all came down to one surprising answer she gave about AI rights. It challenges everything we think we know. Sometimes, the most profound insights come from the most unexpected questions. #Innovation #Perspective #Tech #Storytelling"
        },
        twitter: {
          tweetThread: [
            "THREAD: What if AI could dream? 🤖💭 I spoke with Dr. Anya Sharma about the future of AI, and it's wilder than you think. (1/5)",
            "First, she argued that quantum computing isn't just about speed; it's about creating a new kind of thought process. #AI #Quantum (2/5)",
            "Then, she dropped a bombshell: the first sentient AI might not be built, but born from our collective digital consciousness. (3/5)",
            "The most controversial part? Dr. Sharma believes we need to start discussing AI rights *now*, before it's too late. #AIEthics (4/5)",
            "Want to hear the full, mind-bending conversation? Listen to the latest PodVision episode. Link below! 👇 #Podcast (5/5)"
          ]
        },
        youtubeShorts: {
          shortScripts: ["Text on screen: 'Should AI have human rights?' - [Clip of Dr. Sharma saying '...yes.'] - Text on screen: 'Find out why. Link in description.'", "Text on screen: 'AI could learn from... YOUR DREAMS?!' - [Clip of Dr. Sharma: '...learning from our collective dreams and stories.'] - Text on screen: 'The future is here.'"]
        }
      },
      postingSuggestions: { bestDay: 'Wednesday', bestTime: '9:00 AM EST' }
    },
    processingResult: {
        cleanedTranscript: "Welcome back to the show. Today, we have a very special guest, Dr. Anya Sharma. Dr. Sharma, thank you for being here... When we consider quantum computing's impact on AI, it's not just an evolution; it's a revolution that will redefine consciousness itself. ... The first truly sentient AI won't be a cold machine; it will likely emerge from a network, learning from our collective dreams and stories. ... There's a significant ethical dilemma we're ignoring: should an AI have rights? My answer might surprise you... yes.",
        removedSilences: [{ start: 30, end: 32 }, { start: 150, end: 151 }],
        removedFillers: [{ text: "uhm", startIndex: 45, endIndex: 48 }, { text: "like", startIndex: 180, endIndex: 184 }],
        lowEnergySections: [{ start: 600, end: 720 }]
    }
  },
  {
    id: 'ep2',
    title: 'Startup Stories: From Garage to Unicorn',
    uploadDate: '2024-07-15',
    duration: '32:19',
    status: 'processing',
    imageUrl: findImage('interview').url,
    imageHint: findImage('interview').hint,
  },
  {
    id: 'ep3',
    title: 'Mindful Productivity & The Art of Focus',
    uploadDate: '2024-07-10',
    duration: '28:45',
    status: 'completed',
    imageUrl: findImage('headphones').url,
    imageHint: findImage('headphones').hint,
     podScore: {
      podScore: {
        questionQuality: 8,
        domainExpertise: 8,
        presentationQuality: 9,
        engagementStrength: 8,
        overallScore: 8,
      },
      highMoments: [
        { timestamp: 500, emotion: 'Relatability', score: 9.0, viralPotential: 0.75, text: "The biggest lie about productivity is that you need to do more. The truth is, you need to do less, but better." }
      ],
      lowEnergySections: [],
      dropPrediction: 'Very consistent engagement expected.',
      viralScore: 78,
    },
    contentAssets: {
        platformContent: {
            instagram: { reelScripts: ["Stop trying to do more. Do this instead.", "Productivity hack that actually works.", "Less is more. Here's why."], hooks: ["You're doing productivity wrong.", "The secret to getting more done.", "The art of strategic laziness.", "Want to be more productive? Stop multitasking.", "One simple trick to reclaim your focus."], hashtags: ["#Productivity", "#Mindfulness", "#Focus", "#WorkSmarter", "#DeepWork", "#TimeManagement", "#PodVision", "#Success", "#Motivation", "#SelfHelp"], captions: ["Overwhelmed? You might be trying to do too much. In our latest episode, we explore the art of mindful productivity.", "What if the key to productivity wasn't adding more, but subtracting? Dive into the 'do less, but better' philosophy. Link in bio.", "Reclaim your focus and achieve more than you thought possible. Listen to our new episode on mindful productivity."] },
            linkedin: { authorityPost: "", storyPost: "" },
            twitter: { tweetThread: [] },
            youtubeShorts: { shortScripts: [] }
        },
        postingSuggestions: { bestDay: 'Monday', bestTime: '8:00 AM EST' }
    },
    processingResult: {
        cleanedTranscript: "Productivity isn't about managing time; it's about managing your energy and attention. The biggest lie about productivity is that you need to do more. The truth is, you need to do less, but better.",
        removedSilences: [],
        removedFillers: [],
        lowEnergySections: []
    }
  },
  {
    id: 'ep4',
    title: 'The Lost City of Atlantis: A Deep Dive',
    uploadDate: '2024-07-05',
    duration: '58:02',
    status: 'failed',
    imageUrl: findImage('wave').url,
    imageHint: findImage('wave').hint,
  }
];

export const analyticsData: AnalyticsData = {
  averagePodScore: 8.5,
  averageViralScore: 83,
  totalEpisodes: 4,
  totalGeneratedPosts: 154,
  podScoreTrend: [
    { month: 'Jan', score: 7.2 },
    { month: 'Feb', score: 7.5 },
    { month: 'Mar', score: 8.1 },
    { month: 'Apr', score: 8.0 },
    { month: 'May', score: 8.6 },
    { month: 'Jun', score: 8.9 },
    { month: 'Jul', score: 9.0 },
  ],
  viralScoreTrend: [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 70 },
    { month: 'Mar', score: 72 },
    { month: 'Apr', score: 78 },
    { month: 'May', score: 85 },
    { month: 'Jun', score: 82 },
    { month: 'Jul', score: 88 },
  ],
  platformDistribution: [
    { platform: 'Instagram', count: 72, fill: 'hsl(var(--chart-1))' },
    { platform: 'Twitter', count: 45, fill: 'hsl(var(--chart-2))' },
    { platform: 'LinkedIn', count: 22, fill: 'hsl(var(--chart-3))' },
    { platform: 'YouTube', count: 15, fill: 'hsl(var(--chart-4))' },
  ],
};
