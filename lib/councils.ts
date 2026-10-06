import type { PeopleGroup } from './people';

/**
 * District councils.
 *
 * Sources: CONTENT.md §5 (2025/26) and ARCHIVES.md "Past Councils" (2024/25,
 * 2022/23). Bios are verbatim from the old site, by decision (DECISIONS.md §8).
 *
 * 2022/23 caveat: the crawl recorded most of that year's bios as summaries
 * rather than quotations (only the quoted fragments are the original wording).
 * They are shown as captured; HANDOFF.md lists this for the district.
 *
 * 2023/24 and 2021/22 never had council pages; those years live in the
 * archive as "records being compiled" (lib/archives.ts).
 */

export type Council = {
  /** URL segment, e.g. "2025-26". */
  year: string;
  /** Display form, e.g. "2025/26". */
  label: string;
  theme: string;
  dir: string;
  groups: PeopleGroup[];
};

const c25 = (file: string) => `/images/council/council-${file}`;
const c24 = (file: string) => `/images/council-2024-25/council-2024-25-${file}`;
const c22 = (file: string) => `/images/council-2022-23/council-2022-23-${file}`;

/**
 * 2024/25 portraits are landscape frames (6720x4480) with the subject standing
 * centre, so the 4:5 crop wants to sit a little lower than the default.
 */
const LANDSCAPE_FOCUS = '50% 30%';

/**
 * The incoming council. The roster is announced at the District Assembly and
 * has not reached the repo yet, so every slot is a marked placeholder. Filling
 * it in is a change to this object only: replace `tba` entries with people.
 */
export const COUNCIL_2026_27: Council = {
  year: '2026-27',
  label: '2026/27',
  theme: 'Create Lasting Impact',
  dir: '',
  groups: [
    {
      title: 'Core Leadership',
      people: [
        { name: 'To be announced', position: 'District Interact Representative', tba: true },
        { name: 'To be announced', position: 'District Interact Secretary', tba: true },
        { name: 'To be announced', position: 'District Interact Treasurer', tba: true },
        { name: 'To be announced', position: 'Assistant District Interact Representative', tba: true },
      ],
    },
    {
      title: 'Officers',
      people: [
        { name: 'To be announced', position: 'District Interact Editor', tba: true },
        { name: 'To be announced', position: 'Sergeant At Arms', tba: true },
        { name: 'To be announced', position: 'Assistant District Interact Secretary', tba: true },
        { name: 'To be announced', position: 'Assistant District Interact Treasurer', tba: true },
      ],
    },
    {
      title: 'Directors',
      people: [
        { name: 'To be announced', position: 'Director of Club Service', tba: true },
        { name: 'To be announced', position: 'Director of Community Service', tba: true },
        { name: 'To be announced', position: 'Director of International Understanding', tba: true },
        { name: 'To be announced', position: 'Director of Green Life', tba: true },
        { name: 'To be announced', position: 'Director of Finance', tba: true },
        { name: 'To be announced', position: 'Director of Public Relations', tba: true },
      ],
    },
  ],
};

export const PAST_COUNCILS: Council[] = [
  {
    year: '2025-26',
    label: '2025/26',
    theme: 'Unite For Good',
    dir: 'Jezon Fernando',
    groups: [
      {
        title: 'Core Leadership',
        people: [
          { position: 'District Interact Representative', name: 'Int. PP. Jezon Fernando', bio: 'This individual is hardworking, punctual and a perfectionist.', image: c25('jezon-fernando-dir.jpg') },
          { position: 'District Interact Secretary', name: 'Int. PP. Menuli Perera', bio: 'A person who has given more than her 100% to the movement.', image: c25('menuli-perera-secretary.jpg') },
          { position: 'District Interact Treasurer', name: 'Int. PP. Haroon Shamil', bio: 'This man effortlessly keeping everything under control.', image: c25('haroon-shamil-treasurer.jpg') },
          { position: 'Assistant District Interact Representative', name: 'Int. PP. Yazid Niyas', bio: 'Always moving, always helping, and never backing down.', image: c25('yazid-niyas-adir.jpg') },
          { position: 'Assistant District Interact Representative', name: 'Int. PP. Jenuka De Silva', bio: 'Steadfast and dependable, he adds loyalty to every challenge.', image: c25('jenuka-de-silva-adir.jpg') },
        ],
      },
      {
        title: 'Editors',
        people: [
          { position: 'District Interact Editor', name: 'Int. Joshua Fernando', bio: 'Quiet in presence yet loud in his impact.', image: c25('joshua-fernando-editor.jpg') },
          { position: 'District Interact Editor', name: 'Int. Lakshin Fernando', bio: 'A guy who works hard to the point where his body shuts down.', image: c25('lakshin-fernando-editor.jpg') },
        ],
      },
      {
        title: 'Sergeants At Arms',
        people: [
          { position: 'Co-Sergeant At Arms', name: 'Int. Yesith Gallage', bio: 'He leads with discipline, backed by musical rhythm.', image: c25('yesith-gallage-saa.jpg') },
          { position: 'Co-Sergeant At Arms', name: 'Int. PP. Menoli Yatigammana', bio: 'She’s sweet but doesn’t let anyone break the rules.', image: c25('menoli-yatigammana-saa.jpg') },
        ],
      },
      {
        title: 'Assistant Secretaries',
        people: [
          { position: 'Co-Assistant District Interact Secretary', name: 'Int. Kaveeka Kulatunga', bio: 'A silent interactor who returned with fresh energy.', image: c25('kaveeka-kulatunga-asst-sec.jpg') },
          { position: 'Co-Assistant District Interact Secretary', name: 'Int. Seniya Rajugamuwa', bio: 'Full of quick wit and sharper comebacks.', image: c25('seniya-rajugamuwa-asst-sec.jpg') },
        ],
      },
      {
        title: 'Assistant Treasurers',
        people: [
          { position: 'Co-Assistant District Interact Treasurer', name: 'Int. Abishek Maheshwaran', bio: 'The word clueless in human form. Friendly and cheerful.', image: c25('abishek-maheshwaran-asst-treas.jpg') },
          { position: 'Co-Assistant District Interact Treasurer', name: 'Int. PP. Piyathma De Zoysa', bio: 'She’s sweet, gentle, and always ready to go the extra mile.', image: c25('piyathma-de-zoysa-asst-treas.jpg') },
        ],
      },
      {
        title: 'Zonal Leadership',
        people: [
          { position: 'Zonal Coordinator & Head of Club Revival and Outreach', name: 'Int. Chanuth Amarasinghe', bio: 'He evolved from playful banter into one of most committed.', image: c25('chanuth-amarasinghe-zc.png') },
          { position: 'Zonal Co-ordinator & Representative of the Maldives Region', name: 'Int. PP. Shavini Weerasinghe', bio: 'While she may seem reserved at first, she’s full of wit.', image: c25('shavini-weerasinghe-zc-maldives.png') },
          { position: 'Zonal Representative of Colombo', name: 'Int. Ethan Vishara', bio: 'With a spark of mischief and an unforgettable presence.', image: c25('ethan-vishara-zr-colombo.jpg') },
          { position: 'Zonal Representative of Negombo', name: 'Int. PP. Gihansa Ratnamalala', bio: 'Always willing to lend a hand, no matter who’s asking.', image: c25('gihansa-ratnamalala-zr-negombo.png') },
          { position: 'Zonal Representative of Hill Country & Tea Country', name: 'Int. PP. Vinuki Jayasena', bio: 'This individual’s work ethic is second to none.', image: c25('vinuki-jayasena-zr-hill-tea.jpg') },
          { position: 'Zonal Representative of Kurunegala', name: 'Int. Dhinil Rathnathilake', bio: 'Towering with his presence both in Interact and courts.', image: c25('dhinil-rathnathilake-zr-kurunegala.png') },
          { position: 'Zonal Representative of Down South', name: 'Int. Veenu Ovinya', bio: 'She has a special talent for giving people mini heart attacks.', image: c25('veenu-ovinya-zr-down-south.jpg') },
          { position: 'Zonal Representative of the Northern Peninsula', name: 'Int. PP. Guruparan Paheerathan', bio: 'A visionary Interactor from Jaffna, driven by ambition.', image: c25('guruparan-paheerathan-zr-northern.png') },
          { position: 'Zonal Representative of Rajarata & East / Chairperson of Interaction – Hill Country', name: 'Int. Charith Ekanayake', bio: 'A controversial choice who I trust with positions.', image: c25('charith-ekanayake-zr-rajarata.jpg') },
          { position: 'Zonal Representative of Gem City', name: 'Int. Rushty Abdeen', bio: 'Always smiling and always helpful, he brings heart.', image: c25('rushty-abdeen-zr-gem-city.jpg') },
        ],
      },
      {
        title: 'Directors',
        people: [
          { position: 'Director of Club Service', name: 'Int. PP. Umair Akram', bio: 'Flexible, quick to learn, and deeply service-oriented.', image: c25('umair-akram-dir-club-service.jpg') },
          { position: 'Director of Community Service', name: 'Int. PP. Pabasara Warnajith', bio: 'The Tom to Shenal’s Jerry—always together.', image: c25('pabasara-warnajith-dir-community.jpg') },
          { position: 'Co-Director of International Understanding', name: 'Int. Aneeqa Shafeel', bio: 'The youngest, yet arguably the council’s favorite.', image: c25('aneeqa-shafeel-dir-iu.jpg') },
          { position: 'Co-Director of International Understanding', name: 'Int. Husni Habeeb', bio: 'An Interactor who has ideas beyond borders.', image: c25('husni-habeeb-dir-iu.jpg') },
          { position: 'Director of Rotary – Rotaract Relations', name: 'Int. PP. Luvya Seelanatha', bio: 'This Interactor is a true charm—an expert in balancing.', image: c25('luvya-seelanatha-dir-rr.jpg') },
          { position: 'Director of Green Life', name: 'Int. PP. Shihaad Silmy', bio: 'An interactor who would take unconventional paths.', image: c25('shihaad-silmy-dir-green-life.jpg') },
          { position: 'Director of Finance', name: 'Int. Ginura Kariyawasam', bio: 'A dramatist by day, a hustler by night.', image: c25('ginura-kariyawasam-dir-finance.jpg') },
          { position: 'Director of Public Relations', name: 'Int. Chenura Pathirana', bio: 'A creative eye and the punching bag of council.', image: c25('chenura-pathirana-dir-pr.jpg') },
          { position: 'Director of the Interact District Media Crew', name: 'Int. Mahith Wijesekara', bio: 'If there’s DJ playing or logistics running, chances are.', image: c25('mahith-wijesekara-dir-media.jpg') },
        ],
      },
      {
        title: 'Chairpersons',
        people: [
          { position: 'Chairperson of Interact District Conference', name: 'Int. Amitesha Sentitcumaran', bio: 'A well-experienced Interactor with unique humor.', image: c25('amitesha-sentitcumaran-chair-conf.png') },
          { position: 'Chairperson of Interaction – Colombo', name: 'Int. Shenal Theshan', bio: 'An Interactor who remains actively involved in projects.', image: c25('shenal-theshan-chair-interaction-colombo.jpg') },
          { position: 'Chairperson of Interact Leadership Training – Colombo', name: 'Int. Thenuwara Rupasinghe', bio: 'This individual is set to incorporate GPA system.', image: c25('thenuwara-rupasinghe-chair-ilt-colombo.png') },
          { position: 'Chairperson of Interact Leadership Training – Hill Country', name: 'Int. Wenuri Amarasinghe', bio: 'After fumbles, she became final addition to council.', image: c25('wenuri-amarasinghe-chair-ilt-hill.png') },
          { position: 'Chairperson of BizConnect', name: 'Int. Aaron Gunasekara', bio: 'Whether leading initiatives or pumping petrol, always smiling.', image: c25('aaron-gunasekara-chair-bizconnect.jpg') },
          { position: 'Chairperson of Cycle of Hope', name: 'Int. Zeyna Nuzrath Ahamed', bio: 'An Interactor who has been part movement long before.', image: c25('zeyna-nuzrath-chair-cycle-of-hope.jpg') },
        ],
      },
    ],
  },
  {
    year: '2024-25',
    label: '2024/25',
    theme: 'The Magic of Rotary',
    dir: 'Damian De Cruz',
    groups: [
      {
        title: 'Core Leadership',
        people: [
          { position: 'District Interact Representative', name: 'PHF Int. Damian De Cruz', bio: 'A passionate individual who adores the movement and lives by the phrase ‘If it’s meant to be, it will be.’', image: c24('damian-de-cruz-dir.jpg'), focus: LANDSCAPE_FOCUS },
          { position: 'District Interact Secretary', name: 'Int. Ashalee Pathirana', bio: 'A dependable and strategic interactor with a keen sense of organization.', image: c24('ashalee-pathirana-secretary.jpg'), focus: LANDSCAPE_FOCUS },
          { position: 'District Interact Treasurer', name: 'PHF Int. Haarene Arasaratnam', bio: 'A young interactor who stands strong through every challenge.', image: c24('haarene-arasaratnam-treasurer.jpg'), focus: LANDSCAPE_FOCUS },
          { position: 'Assistant District Interact Representative', name: 'PHF Int. Danindu Fernando', bio: 'The Deputy from Kandy with an infectious energy at every function.', image: c24('danindu-fernando-adir.jpg'), focus: LANDSCAPE_FOCUS },
        ],
      },
      {
        title: 'Officers',
        people: [
          { position: 'District Interact Editor', name: 'Int. PP. Jezon Fernando', bio: 'A reliable leader and an indispensable presence in the executive team.', image: c24('jezon-fernando-editor.jpg'), focus: LANDSCAPE_FOCUS },
          { position: 'Co-Sergeant At Arms', name: 'PHF Int. Lamha Rizwan', bio: 'A firm yet compassionate leader who excels in maintaining discipline.', image: c24('lamha-rizwan-saa.jpg'), focus: LANDSCAPE_FOCUS },
          { position: 'Co-Sergeant At Arms', name: 'PHF Int. Yumeth Rathnayake', bio: 'A dedicated individual with a deep passion for treasury and aquatic adventures.', image: c24('yumeth-rathnayake-saa.jpg'), focus: LANDSCAPE_FOCUS },
          { position: 'Co-Assistant District Interact Secretary', name: 'Int. PP. Minali Bamunusinghe Arachchi', bio: 'A diligent and adaptable leader, always ready to take on responsibilities.', image: c24('minali-bamunusinghe-asst-sec.jpg'), focus: LANDSCAPE_FOCUS },
          { position: 'Co-Assistant District Interact Secretary', name: 'PHF Int. Sameeha Nizamdeen', bio: 'From an unknown club, this interactor demonstrates strong commitment to International Understanding.', image: c24('sameeha-nizamdeen-asst-sec.jpg'), focus: LANDSCAPE_FOCUS },
          { position: 'Assistant District Interact Treasurer', name: 'PHF Int. Aaishah Shafraz', bio: 'Despite being the youngest council member, her maturity and work ethic set her apart.', image: c24('aaishah-shafraz-asst-treas.jpg'), focus: LANDSCAPE_FOCUS },
          { position: 'Co-Assistant District Interact Editor', name: 'Int. Joshua Fernando', bio: 'A dedicated interactor known for his exceptional editing skills and unwavering commitment.', image: c24('joshua-fernando-asst-editor.jpg'), focus: LANDSCAPE_FOCUS },
          { position: 'Co-Assistant District Interact Editor', name: 'Int. PP. Yazid Niyas', bio: 'An active member of the Malabe circle, balancing camaraderie with his responsibilities.', image: c24('yazid-niyas-asst-editor.jpg'), focus: LANDSCAPE_FOCUS },
        ],
      },
    ],
  },
  {
    year: '2022-23',
    label: '2022/23',
    theme: 'Imagine Rotary',
    dir: 'Julian Fernandopulle',
    groups: [
      {
        title: 'Core Leadership',
        people: [
          { position: 'District Interact Representative', name: 'Int. PP. Julian Fernandopulle', bio: '“A passionate individual who adores the movement”; embodies “humility and valour”.', image: c22('julian-fernandopulle-dir.jpg') },
          { position: 'District Interact Secretary', name: 'Int. PP. Onellie Jayawardena', bio: 'Silent, dependable Interactor with unique experience in the movement.', image: c22('onellie-jayawardena-secretary.jpg') },
          { position: 'District Interact Treasurer', name: 'Int. Rezon David', bio: 'Trustworthy; known for a “presence that intimidates” due to distinctive eyewear.', image: c22('rezon-david-treasurer.jpg') },
          { position: 'Assistant District Interact Representative', name: 'Int. PP. Thareen Jayadewa', bio: '“Humble man with a down-to-earth smile” who goes above and beyond.', image: c22('thareen-jayadewa-adir.png') },
        ],
      },
      {
        title: 'Officers',
        people: [
          { position: 'Co-Sergeant At Arms', name: 'Int. Janindu Ratnayake', bio: '“One of the most disciplined individuals” with a unique sense of humour.', image: c22('janindu-ratnayake-saa.jpg') },
          { position: 'Co-Sergeant At Arms', name: 'Int. Janudi Yatagampitiya', bio: 'Focused on maintaining district standards and professional expectations.', image: c22('janudi-yatagampitiya-saa.jpg') },
          { position: 'Co-Assistant District Interact Secretary', name: 'Int. PP. Senandi Jayawardena', bio: 'Dedicated worker; awarded “Best President” for 2021/22.', image: c22('senandi-jayawardena-asst-sec.jpg') },
          { position: 'Co-Assistant District Interact Secretary', name: 'Int. PP. Chenuli Wijayanama', bio: '“Soft-spoken person who can keep calm in stressful situations.”', image: c22('chenuli-wijayanama-asst-sec.jpg') },
          { position: 'Assistant District Interact Treasurer', name: 'Int. PP. Uleena Udabage', bio: '“Seasoned campaigner” and hardworking contributor.', image: c22('uleena-udabage-asst-treas.jpg') },
        ],
      },
      {
        title: 'Zonal Leadership',
        people: [
          { position: 'Zonal Coordinator, Head of Club Revival & Outreach', name: 'Int. PP. Mihin Senath', bio: 'Humble Interactor committed to spreading the movement.', image: c22('mihin-senath-zc.jpg') },
          { position: 'Zonal Co-ordinator & Head of Maldives Region', name: 'Int. PP. Samiru Aponso', bio: '“Hardcore Interactor” with focused determination.', image: c22('samiru-aponso-zc-maldives.jpg') },
          { position: 'Head of Colombo & Negombo Zones', name: 'Int. PP. Amaan Zahid', bio: 'Notable Interactor focused on making “Impact”.', image: c22('amaan-zahid-colombo-negombo.jpg') },
          { position: 'Head of Kandy Zone', name: 'Int. PP. Omethra Abeykoon', bio: 'Experienced with a strong work ethic.', image: c22('omethra-abeykoon-kandy.jpg') },
          { position: 'Head of Kurunegala & Kegalle Zones', name: 'Int. PP. Yuvani Thudugala', bio: '“One of the nicest people” who backs words with actions.', image: c22('yuvani-thudugala-kurunegala.jpg') },
          { position: 'Head of Galle & Matara Zones', name: 'Int. PP. Ashrath Rumie', bio: 'Dedicated workaholic from the southern region.', image: c22('ashrath-rumie-galle.jpg') },
          { position: 'Head of Rajarata Zone', name: 'Int. PP. Thisuri Nanayakkara', bio: 'Relatively new member showing significant capability.', image: c22('thisuri-nanayakkara-rajarata.jpg') },
          { position: 'Head of Jaffna & Mannar Zones', name: 'Int. Raveendran Panojan', bio: 'Passionate about improving northern club standards.', image: c22('raveendran-panojan-jaffna.jpg') },
          { position: 'Head of Ampara & Tea Country Zones', name: 'Int. PP. Nuwangi Chandrakirthi', bio: 'Experienced contributor expressing passion through dedication.', image: c22('nuwangi-chandrakirthi-tea-country.jpg') },
          { position: 'Head of Gem City Zone', name: 'Int. Ishini Jayawardhana', bio: '“Works hard in silence”; talented and determined.', image: c22('ishini-jayawardhana-gem-city.jpg') },
        ],
      },
      {
        title: 'Directors',
        people: [
          { position: 'Director of Club Service', name: 'Int. Shakeel Hassimdeen', bio: 'Fitness enthusiast and obsessive Interactor.', image: c22('shakeel-hassimdeen-dir-club.jpg') },
          { position: 'Director of Community Service', name: 'Int. Naasith Nauf', bio: '“Most innocent looking” council member with strong commitment.', image: c22('naasith-nauf-dir-community.jpg') },
          { position: 'Director of International Understanding', name: 'Int. PP. Tashiya Jayman', bio: 'Consistently positive with an engaging personality.', image: c22('tashiya-jayman-dir-iu.jpg') },
          { position: 'Director of Rotary–Rotaract Relations', name: 'Int. PP. Nabeel Barry', bio: 'Quiet but hardworking; visionary for the movement.', image: c22('nabeel-barry-dir-rr.jpg') },
          { position: 'Director of Green Life', name: 'Int. Abdullah Rumi Reyal', bio: 'Environmental activist with passionate commitment.', image: c22('abdullah-rumi-reyal-dir-green.jpg') },
          { position: 'Director of Finance & Chairperson of Interact District Assembly', name: 'Int. PP. Usmaan Mowlana', bio: 'Goes “beyond capacity” to complete tasks.', image: c22('usmaan-mowlana-dir-finance.jpg') },
          { position: 'Co-District Interact Editor & Director of Public Relations', name: 'Int. Fadhil Fazil', bio: 'Deliberate communicator devoted to the movement.', image: c22('fadhil-fazil-dir-pr.jpg') },
          { position: 'Co-District Interact Editor & Director of Interact District Media Crew', name: 'Int. Ashfaq Fazlin', bio: 'Creative, talented, fun-loving.', image: c22('ashfaq-fazlin-dir-media.jpg') },
        ],
      },
      {
        title: 'Chairpersons',
        people: [
          { position: 'Chairperson of Interact District Conference', name: 'Int. Abdullah Siddeek', bio: 'Dedicated, talented member.', image: c22('abdullah-siddeek-chair-conf.jpg') },
          { position: 'Chairperson of Interaction – Colombo', name: 'Int. Joshua Almeida', bio: 'Determined; ensures project perfection.', image: c22('joshua-almeida-chair-interaction-colombo.jpg') },
          { position: 'Chairperson of Interaction – Kandy', name: 'Int. Ramel Bandaranayake', bio: '“One of the most humble people” with a sporting passion.', image: c22('ramel-bandaranayake-chair-interaction-kandy.jpg') },
          { position: 'Chairperson of Interact Leadership Training', name: 'Int. PP. Nishok Ranasinghe', bio: 'Capable leader-developer and accomplished performer.', image: c22('nishok-ranasinghe-chair-ilt.jpg') },
        ],
      },
    ],
  },
];

export const getPastCouncil = (year: string) => PAST_COUNCILS.find((c) => c.year === year);
