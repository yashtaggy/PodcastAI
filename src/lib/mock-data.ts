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
          reelScripts: ["Hook: 'AI will have rights?' - Watch as Dr. Sharma explains the controversial future of AI ethics."],
          hooks: ["Will AI achieve consciousness?", "The #1 myth about quantum computing.", "Could AI learn from your dreams?"],
          hashtags: ["#AI", "#FutureTech", "#Podcast", "#QuantumComputing", "#ArtificialIntelligence", "#Ethics", "#TechTalk", "#Innovation", "#PodVision", "#Science"],
          captions: ["Is AI consciousness inevitable? Dr. Anya Sharma dives deep into the future of tech and ethics in our latest episode. Link in bio!"]
        },
        linkedin: {
          authorityPost: "The intersection of quantum computing and artificial intelligence represents a paradigm shift. In my latest podcast episode, Dr. Anya Sharma, a leading researcher in the field, discusses...",
          storyPost: "I had my mind blown this week. I asked Dr. Anya Sharma about AI consciousness, and her answer wasn't what I expected. It all comes down to one thing: dreams."
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
          shortScripts: ["Text on screen: 'Should AI have human rights?' - [Clip of Dr. Sharma saying '...yes.'] - Text on screen: 'Find out why. Link in description.'"]
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
            instagram: { reelScripts: [], hooks: [], hashtags: [], captions: [] },
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
    { platform: 'Instagram', count: 72, fill: 'var(--color-chart-1)' },
    { platform: 'Twitter', count: 45, fill: 'var(--color-chart-2)' },
    { platform: 'LinkedIn', count: 22, fill: 'var(--color-chart-3)' },
    { platform: 'YouTube', count: 15, fill: 'var(--color-chart-4)' },
  ],
};
