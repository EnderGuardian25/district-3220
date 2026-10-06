/**
 * College of DIRs: every District Interact Representative since 1979.
 *
 * Source: CONTENT.md §6. The historical roster is the base (it is the only
 * complete list); portraits exist for 2010/11 onward, except 2016/17, whose
 * image is blocked on the old Wix CDN.
 *
 * `partner` is the second name the source table pairs with each DIR. The table
 * heads that column "Co-DIR", but for recent years it is plainly the District
 * Secretary (2025/26 pairs Jezon Fernando with Menuli Perera, the Secretary),
 * so the page shows it neutrally as "with" rather than asserting a title.
 *
 * Name spellings differ between source tables in a few places; this file
 * follows the historical roster and HANDOFF.md lists the conflicts.
 */

export type DirTerm = {
  /** Display form, e.g. "2024/25". */
  year: string;
  /** The Rotary district number the term served under. */
  district: '321' | '322' | '3220';
  name: string;
  school?: string;
  partner?: string;
  partnerSchool?: string;
  theme: string;
  image?: string;
};

export const DISTRICT_ERAS = [
  { district: '3220', label: 'Rotary International District 3220', span: '1991 onwards' },
  { district: '322', label: 'Rotary International District 322', span: '1984–1991' },
  { district: '321', label: 'Rotary International District 321', span: '1979–1984' },
] as const;

const p = (file: string) => `/images/dirs/dir-${file}`;

/** Newest first. */
export const DIRS: DirTerm[] = [
  { year: '2025/26', district: '3220', name: 'Jezon Fernando', school: 'St. Joseph’s College, Colombo 10', partner: 'Menuli Perera', partnerSchool: 'Wycherley International School, Gampaha', theme: 'Unite For Good', image: p('2025-26-jezon-fernando.jpg') },
  { year: '2024/25', district: '3220', name: 'Damian De Cruz', school: 'St. Joseph’s College, Colombo 10', partner: 'Ashalee Pathirana', partnerSchool: 'Bishop’s College', theme: 'The Magic of Rotary', image: p('2024-25-damian-de-cruz.jpg') },
  { year: '2023/24', district: '3220', name: 'Aamir Akram', school: 'Trinity College, Kandy', partner: 'Uleena Udabage', partnerSchool: 'Sujatha Vidyalaya', theme: 'Create Hope in the World', image: p('2023-24-aamir-akram.jpg') },
  { year: '2022/23', district: '3220', name: 'Julian Fernandopulle', school: 'St. Joseph’s College, Colombo 10', partner: 'Onellie Jayawardena', partnerSchool: 'St. Bridget’s Convent', theme: 'Imagine Rotary', image: p('2022-23-julian-fernandopulle.jpg') },
  { year: '2021/22', district: '3220', name: 'Murthaaz Barry', school: 'Wesley College', partner: 'Sheneli Fernando', partnerSchool: 'St. Bridget’s Convent', theme: 'Serve to Change Lives', image: p('2021-22-murthaaz-barry.jpg') },
  { year: '2020/21', district: '3220', name: 'Rahul Fernandez', school: 'St. Peter’s College', partner: 'Heshalee Pathirana', partnerSchool: 'Bishop’s College', theme: 'Rotary Opens Opportunities', image: p('2020-21-rahul-fernandez.jpg') },
  { year: '2019/20', district: '3220', name: 'Wiranya Divitotawela', school: 'St. Bridget’s Convent', partner: 'Shalem Sumanthiran', partnerSchool: 'Royal College', theme: 'Rotary Connects the World', image: p('2019-20-wiranya-divitotawela.jpg') },
  { year: '2018/19', district: '3220', name: 'Asel Karannagoda', school: 'Ananda College', partner: 'Sashini De Silva', partnerSchool: 'Bishop’s College', theme: 'Be the Inspiration', image: p('2018-19-asel-karannagoda.jpg') },
  { year: '2017/18', district: '3220', name: 'Mohammed Awoon', school: 'Burhani Serendib School', partner: 'Amaya Fernando', partnerSchool: 'Visakha Vidyalaya', theme: 'Rotary: Making a Difference', image: p('2017-18-mohommed-awoon.jpg') },
  // Portrait blocked (HTTP 403) on the old Wix CDN; needs a fresh copy from the district.
  { year: '2016/17', district: '3220', name: 'Chathula Fernando', school: 'Ananda College', partner: 'Sioban Manupillei', partnerSchool: 'St. Bridget’s Convent', theme: 'Rotary Serving Humanity' },
  { year: '2015/16', district: '3220', name: 'Fabian D K Schokman', school: 'St. Peter’s College', partner: 'Nilushi Dewapura', partnerSchool: 'Visakha Vidyalaya', theme: 'Be a Gift to the World', image: p('2015-16-fabian-schokman.jpg') },
  { year: '2014/15', district: '3220', name: 'Sulaiman Rameez', school: 'D S Senanayake College', partner: 'Danushka Kadawathaarachchi', partnerSchool: 'Bishop’s College', theme: 'Light Up Rotary', image: p('2014-15-sulaiman-rameez.png') },
  { year: '2013/14', district: '3220', name: 'Sandupama Basnayake', school: 'Ananda College', partner: 'Nipun Ambanpola', partnerSchool: 'Royal College', theme: 'Engage Rotary, Change Lives', image: p('2013-14-sandupama-basnayake.jpg') },
  { year: '2012/13', district: '3220', name: 'Ruvindu Bandara', school: 'President’s College', partner: 'Tharindu Basnayake', partnerSchool: 'Ananda College', theme: 'Peace Through Service', image: p('2012-13-ruvindu-bandara.jpg') },
  { year: '2011/12', district: '3220', name: 'Dinuka Sumithraarachchi', school: 'Ananda College', partner: 'Ruchira Wickramasinghe', partnerSchool: 'Stafford International School', theme: 'Reach Within to Embrace Humanity', image: p('2011-12-dinuka-sumithraarachchi.jpg') },
  { year: '2010/11', district: '3220', name: 'Harinda Senaratne', school: 'Ananda College', partner: 'Athraja De Silva', partnerSchool: 'St. Bridget’s Convent', theme: 'Building Communities – Bridging Continents', image: p('2010-11-harinda-senaratne.jpg') },
  { year: '2009/10', district: '3220', name: 'Mafaz Mohideen', school: 'D S Senanayake College', partner: 'Anjana Jayakody', partnerSchool: 'Ananda College', theme: 'The Future of Rotary Is in Your Hands' },
  { year: '2008/09', district: '3220', name: 'Mevan Banagala', partner: 'Ashan Godigamuwa', partnerSchool: 'Ananda College', theme: 'Make Dreams Real' },
  { year: '2007/08', district: '3220', name: 'Zarah Carder', school: 'Asian International School', partner: 'Kareem Noordeen', partnerSchool: 'D S Senanayake College', theme: 'Rotary Shares' },
  { year: '2006/07', district: '3220', name: 'Thesula Rambadagalla', school: 'Visakha Vidyalaya', theme: 'Lead the Way' },
  { year: '2005/06', district: '3220', name: 'Shammi Weerasinghe', school: 'Ananda College', theme: 'Service Above Self' },
  { year: '2004/05', district: '3220', name: 'Shahike De Silva', school: 'Ananda College', partner: 'Udara Withana', partnerSchool: 'Nalanda College', theme: 'Celebrate Rotary' },
  { year: '2003/04', district: '3220', name: 'Dilhan Jayatilleke', school: 'Asoka College', partner: 'Shahike De Silva', partnerSchool: 'Ananda College', theme: 'Lend a Hand' },
  { year: '2002/03', district: '3220', name: 'Eranda De Silva', school: 'Nalanda College', partner: 'Kamilka Malwatta', partnerSchool: 'Visakha Vidyalaya', theme: 'Sow the Seeds of Love' },
  { year: '2001/02', district: '3220', name: 'Sanjika Perera', school: 'Nalanda College', partner: 'Deshani Ratnayake', partnerSchool: 'College of World Education', theme: 'Mankind Is Our Business' },
  { year: '2000/01', district: '3220', name: 'Birendra Katugampola', school: 'Ananda College', partner: 'Anushi Senarathne', partnerSchool: 'Visakha Vidyalaya', theme: 'Create Awareness — Take Action' },
  { year: '1999/2000', district: '3220', name: 'Saif Ramzi', school: 'Wesley College', partner: 'Ian Van Hoff', partnerSchool: 'St. Peter’s College', theme: 'Rotary 2000: Act with Consistency, Credibility, Continuity' },
  { year: '1998/99', district: '3220', name: 'Nishantha De Silva', school: 'Ananda College', partner: 'Layangi Perera', partnerSchool: 'Visakha Vidyalaya', theme: 'Follow Your Rotary Dream' },
  { year: '1997/98', district: '3220', name: 'Chamath Atulathmudali', school: 'Ananda College', partner: 'Neelakshi Dissanayake', partnerSchool: 'Anula College', theme: 'Show Rotary Cares' },
  { year: '1996/97', district: '3220', name: 'Iflikar Mohammed', school: 'Thurstan College', partner: 'Chadwick Kandappa', partnerSchool: 'Carey College', theme: 'Build the Future with Action and Vision' },
  { year: '1995/96', district: '3220', name: 'Fayaz Hudah', school: 'Carey College', partner: 'Kaveenga Wijesekara', partnerSchool: 'Ananda College', theme: 'Act with Integrity, Serve with Love, Work for Peace' },
  { year: '1994/95', district: '3220', name: 'Shawn Shiek', school: 'S. Thomas’ College', partner: 'Fayaz Hudah', partnerSchool: 'Carey College', theme: 'Be a Friend' },
  { year: '1993/94', district: '3220', name: 'Duminda De Silva', school: 'Ananda College', partner: 'Jithari Abeysekara', partnerSchool: 'Visakha Vidyalaya', theme: 'Believe in What You Do — Do What You Believe in' },
  { year: '1992/93', district: '3220', name: 'Kumudu Warnakulasooriya', school: 'S. Thomas’ College', partner: 'Duminda De Silva', partnerSchool: 'Ananda College', theme: 'Real Happiness Is Helping Others' },
  { year: '1991/92', district: '3220', name: 'Sanjeewa Wickramasinghe', school: 'Ananda College', partner: 'Ishi Wickramage', partnerSchool: 'Bishop’s College', theme: 'Look Beyond Yourself' },
  { year: '1990/91', district: '322', name: 'Viraj Premasinghe', school: 'Nalanda College', partner: 'Indrajith Lankeshwara', partnerSchool: 'D S Senanayake College', theme: 'Honor Rotary with Faith and Enthusiasm' },
  { year: '1988/89/90', district: '322', name: 'Shehan Gunawardena', school: 'Ananda College', partner: 'Harsha Wanigatunge', partnerSchool: 'D S Senanayake College', theme: 'Put Life into Rotary — Your Life / Enjoy Rotary' },
  { year: '1987/88', district: '322', name: 'Dushani Boteju', school: 'Musaeus College', partner: 'Sohan Perera', partnerSchool: 'St. Joseph’s College', theme: 'Rotarians — United in Service — Dedicated to Peace' },
  { year: '1986/87', district: '322', name: 'Gushara Depachitra', school: 'Visakha Vidyalaya', partner: 'Rukshan Wijerathne', partnerSchool: 'Ananda College', theme: 'Rotary Brings Hope' },
  { year: '1985/86', district: '322', name: 'Priya Gunawardena', school: 'Nalanda College', partner: 'Samantha Rajapakse', partnerSchool: 'Ananda College', theme: 'You Are the Key' },
  { year: '1984/85', district: '322', name: 'Arjuna Gunawardena', school: 'Ananda College', partner: 'Riquaza Zavahir', partnerSchool: 'Bishop’s College', theme: 'Discover a New World of Service' },
  { year: '1983/84', district: '321', name: 'Sanjeewa Jayawardena', school: 'Royal College', partner: 'Arjuna Gunawardena', partnerSchool: 'Ananda College', theme: 'Share Rotary, Serve People' },
  { year: '1982/83', district: '321', name: 'Dimuthu Samarasinghe', school: 'Dharmarajah College', partner: 'Dhananjaya Chandrasekara', partnerSchool: 'Trinity College', theme: 'Mankind Is One — Build Bridges of Friendship throughout the World' },
  { year: '1981/82', district: '321', name: 'Ravi Rathnapala', school: 'Royal College', partner: 'Fareeda Davooodbhoy', partnerSchool: 'Bishop’s College', theme: 'World Understanding and Peace through Rotary' },
  { year: '1980/81', district: '321', name: 'Marwan Macan Markar', school: 'Royal College', partner: 'A. Sukurnaran', partnerSchool: 'Royal College', theme: 'Take Time to Serve' },
  // The source lists two 1979 terms.
  { year: '1979', district: '321', name: 'Satyajith De S. Senevirathne', school: 'Royal College', partner: 'Marwan Macan Markar', partnerSchool: 'Royal College', theme: 'Reach Out' },
  { year: '1979', district: '321', name: 'Ranil De Silva', school: 'Royal College', partner: 'Ranjan David', partnerSchool: 'Trinity College', theme: 'Reach Out' },
];

/** Look up a DIR by the archive's URL year, e.g. "2023-24". */
export const dirForYear = (slugYear: string) =>
  DIRS.find((d) => d.year.replace('/', '-') === slugYear);
