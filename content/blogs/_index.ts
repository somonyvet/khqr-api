const initialImages = Array(5).fill(0).map((_, index) => `/images/blog-${index + 1}.jpg`);

export const blogs = Array(5).fill(5).fill(0).map((_, index) => {
    return {
        _id: `${1001 + index}`,
        title: "My Hidden Battle with Performance Anxiety",
        thumbnail: `/images/blog-${index + 1}.jpg`,
        images: initialImages,
        content: `
      <p>Performance anxiety is something many of us quietly struggle with, yet rarely talk about. For years, I found myself paralyzed before presentations, performances, or even casual social interactions, my mind clouded with “what ifs” and fears of failure.</p>
      <p>At first, I tried to ignore it, thinking it would just go away. But the more I pushed myself to suppress these feelings, the stronger they became. Every missed opportunity and awkward moment seemed to reinforce my fear, and I started questioning my own abilities.</p>
      <p>It wasn’t until I began researching and experimenting with coping techniques that I found a way forward. I learned that preparation, visualization, and breathing exercises weren’t just clichés—they were powerful tools to regain control over my mind and body.</p>
      <p>One technique that helped me immensely was breaking down tasks into small, achievable steps. Instead of focusing on the entire performance, I focused on one part at a time, gradually building confidence with each success. Coupled with mindfulness practices, I started to notice a shift: my anxiety became manageable, rather than paralyzing.</p>
      <p>Opening up to friends and mentors also made a huge difference. Sharing my struggles made me realize I wasn’t alone, and receiving guidance and encouragement gave me the courage to keep pushing forward.</p>
      <p>Today, I still feel the flutter of nerves before big moments—but now, I view it as energy I can channel, not an enemy to fear. Performance anxiety hasn’t disappeared entirely, but by acknowledging it and equipping myself with strategies, I’ve reclaimed control over my own experiences.</p>
      <p>To anyone facing similar challenges, remember: it’s okay to feel anxious. What matters is how you respond. Seek support, practice self-compassion, and take small steps forward. Each step is progress, and every effort is a victory worth celebrating.</p>
    `,
        createdAt: "Thursday, October 23, 2025 3:03:11 PM"
    }
})
