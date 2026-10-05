/**
 * District news. Source: CONTENT.md §9, both posts captured in full from the
 * old Wix blog. Bodies are verbatim.
 */

export type Post = {
  slug: string;
  title: string;
  /** Shorter form for the index, where the old site used one. */
  shortTitle?: string;
  author: string;
  /** ISO dates. */
  date: string;
  updated?: string;
  readMinutes: number;
  image: string;
  imageAlt: string;
  /** Natural aspect of the image, so it is never cropped in the article. */
  imageRatio: string;
  /** One-line standfirst for the index and the page lede. */
  standfirst: string;
  body: string[];
};

export const POSTS: Post[] = [
  {
    slug: 'remembering-shawn-shiek',
    title: 'Remembering Shawn Shiek: a tribute to a visionary and beloved leader in Interact and Rotary',
    shortTitle: 'Tribute to the late PDIR Shawn Shiek',
    author: 'District PR Director',
    date: '2025-07-11',
    updated: '2025-07-22',
    readMinutes: 3,
    image: '/images/blog/blog-shawn-shiek-tribute.jpg',
    imageAlt: 'Memorial card for Shawn Shiek',
    imageRatio: '1024 / 1280',
    standfirst:
      'District Interact Representative in 1994/95, Shawn Shiek launched Interaction as a project chairperson and stayed with the movement as a mentor long after his term.',
    body: [
      'With heavy hearts, we come together to remember Shawn Shiek, a transformative leader and cherished member of the Interact and Rotary communities. His passing leaves a significant void, but the influence he had on those around him will undoubtedly continue to inspire countless individuals.',
      'Shawn’s journey began in the 1992/93 Rotary year when he took on the role of Zonal Representative. Early on, he displayed outstanding leadership skills that laid the foundation for future generations. His enthusiasm for service and youth empowerment became clear as he stepped into the position of Project Chairperson in 1993/94. One of his most notable achievements during this time was the launch of Interaction, now recognized as Sri Lanka’s largest Interact sports celebration, where over 1,000 young participants come together annually to showcase their skills and camaraderie.',
      'As District Interact Representative in 1994/95, Shawn enacted a pivotal initiative that sought to foster cultural exchange between Sri Lanka and India. His efforts led to the successful coordination of a youth exchange program that welcomed more than 2,000 participants. This groundbreaking initiative enhanced the visibility of the Interact movement and garnered extensive media coverage, highlighting the important role Rotary’s youth programs play in community building.',
      'Shawn’s commitment to the Interact movement did not wane after his tenure as a representative. His role as DICC in 2009/10 showcased his deep commitment to mentorship and leadership development. As a member of the Rotary Club of Colombo Regency and a chartering member of Sri Lanka’s first Rotary E-Club of Colombo Infinity, he remained a steadfast advocate for youth engagement, encouraging young leaders to pursue their passions and make a difference.',
      'Shawn’s accomplishments extended beyond Rotary. An MBA graduate and dedicated Thomian, Shawn made significant contributions to the telecommunications sector. Most recently, he served as COO at Frella International. His visionary approach and genuine warmth were evident in everything he undertook, making him a respected figure in his field. Shawn’s ability to forge meaningful connections with people exemplified his character, blending professionalism with empathy.',
      'Shawn’s journey is a powerful reminder of the profound impact one individual can have on the lives of many. The programs and initiatives he initiated sparked a spirit of service among young people, motivating them to become active contributors to their communities. His legacy of service lives on, inspiring future leaders within the Interact and Rotary movements.',
      'While we mourn today due to his untimely passing from cardiac arrest, we must also remember the guiding principles that Shawn embodied. His passion for mentorship and unifying individuals transformed the Rotary family and enriched countless lives. Reflecting on his legacy allows us to celebrate key values: leadership, compassion, and selfless service.',
      'As we say our final goodbyes to Shawn, we can carry forward his spirit. His unwavering dedication to building connections and inspiring youth serves as a model for our future efforts. We honor his memory by remaining committed to service projects, embracing diversity, and promoting intercultural exchanges, just as he did.',
      'The Interact and Rotary communities have lost a dedicated leader, but Shawn’s spirit will undoubtedly remain in the hearts of those who were lucky enough to know him. His teachings and values will continue to inspire and guide us as we carry on his legacy of service and commitment.',
      'As we look ahead, let us uplift each other in Shawn’s honor. The world can feel overwhelming at times, but through collective action and community spirit, we can create meaningful change. Shawn’s life exemplifies the power of working together, reminding us that even in sorrow, we can find strength in serving others.',
      'Rest in peace, Shawn Shiek 🤍',
    ],
  },
  {
    slug: '35th-interact-district-assembly-2025',
    title: '35th Interact District Assembly 2025',
    author: 'District PR Director',
    date: '2025-07-07',
    readMinutes: 1,
    image: '/images/blog/blog-35th-district-assembly.jpg',
    imageAlt: 'The outgoing District Interact Representative collaring his successor on stage at the 35th District Assembly',
    imageRatio: '1280 / 853',
    standfirst:
      'At Wave & Lake on 29 June, Int. PP. Jezon Fernando was collared as District Interact Representative and introduced the new district council.',
    body: [
      'On the 29th of June, the 35th Interact District Assembly of District 3220 (Sri Lanka & Maldives) was held at Wave & Lake under the theme “Sri Lankan Heritage: Wisdom in Culture.” The event marked a significant milestone, bringing together Interactors from across the island to reflect on the achievements of the past year and welcome a new era of leadership and service.',
      'The highlight of the event was the official collaring of the Incoming District Interact Representative, Int. PP. Jezon Fernando, by the Outgoing District Interact Representative, PHF. Int. PP. Damian De Cruz. This symbolic moment represented the transition of responsibility, leadership, and trust. PHF. Int. PP. Damian, having served the movement with dedication, passed on the mantle to Int. PP. Jezon, who now takes on the role of guiding Interact 3220 for the upcoming year.',
      'Following the collaring, Int. PP. Jezon addressed the audience with a message of gratitude, unity, and vision. He emphasized the importance of collaboration and consistency in service, before officially introducing the newly appointed District Council, a team of committed Interactors ready to take the movement forward.',
      'The ceremony concluded on a high note, marking both the end of one successful chapter and the beginning of another.',
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

/** "11 July 2025". Fixed locale and zone so server and client agree. */
export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Colombo' }).format(
    new Date(`${iso}T12:00:00+05:30`),
  );
