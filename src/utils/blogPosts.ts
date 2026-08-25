// src/utils/blogPosts.ts
//
// Eleven of these posts were recovered on 2026-08-25 from the live site
// (revitaldentaltempletx.com/blog/*) after their source was lost with a
// terminated build machine. Bodies were transcribed from the rendered pages;
// dates and authors are as displayed on each live article.
//
// Editorial flags carried over from the recovery (content preserved as-live):
//   - 'brighten-smile-holidays', 'root-of-bad-breath' and
//     'understanding-sleep-apnea' are one-to-three-paragraph stubs on the live
//     site; they are reproduced as-is and are candidates for expansion.
//   - 'how-to-choose-good-dentist-temple' originally linked to /reviews as a
//     "5-star reputation" — softened here to a neutral link because no reviews
//     are displayed on that page yet. Revisit when the reviews page is rebuilt.
import { type ImageMetadata } from 'astro';

// Import existing images to use as placeholders for now
import dental1 from '../assets/images/hero/dental-1.jpg';
import dental2 from '../assets/images/hero/dental-2.jpg';
import dental3 from '../assets/images/hero/dental-3.jpg';
import dental4 from '../assets/images/hero/dental-4.jpg';

export interface BlogPost {
  id: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image?: ImageMetadata | string;
  tags?: string[];
}

export const blogPosts: BlogPost[] = [
  // ------------------------------------------------------------------
  // Recovered from the live site (newest first)
  // ------------------------------------------------------------------
  {
    id: 'cosmetic-dentistry-services-temple',
    title: 'Cosmetic Dentistry Services at Revital Dental',
    seoTitle: 'Cosmetic Dentistry Services at Revital Dental',
    seoDescription: 'Cosmetic dentistry offers more than just a pretty smile – it brings improved self-confidence. Explore our comprehensive guide to smile makeovers in Temple, TX.',
    excerpt: 'Cosmetic dentistry offers more than just a pretty smile – it brings improved self-confidence. Explore our comprehensive guide to smile makeovers in Temple, TX.',
    date: '2025-12-20',
    author: 'Dr. Suman Kondragunta',
    category: 'Cosmetic Dentistry',
    image: dental1,
    tags: ['Cosmetic', 'Smile Makeover', 'Veneers', 'Implants', 'Whitening'],
    content: `<p>We at Revital Dental in Temple, TX have been providing smile transformations for over 4 years, proudly serving <strong>Temple, Belton, and surrounding communities</strong>.</p>
<p>A gallery of our smile designs can be seen on our <a href="/smile-gallery">Smile Gallery page</a>, showcasing exceptional results with real patients. Cosmetic dentistry offers more than just a pretty smile – it brings improved self-confidence which can elevate all areas of a person's life.</p>
<h2>Our Cosmetic Solutions</h2>
<p>Scheduling a consultation with Revital Dental can provide you with a better diagnosis, treatment options, and clear costs related to dental procedures. We can provide cost estimates and <a href="/financing">payment plans</a>.</p>
<h3>1. Dental Implants</h3>
<p><a href="/services/dental-implants">Dental implants</a> are used to replace missing teeth. Titanium posts are inserted into the gums, eventually integrating with the natural jawbone. Once healed, a natural-looking crown will top the post to complete your smile. Implants can be used to replace one or more teeth or as denture support.</p>
<h3>2. Crowns &amp; Bridges</h3>
<p>Crowns are used to cover damaged teeth. Custom-made to fit seamlessly with your natural teeth, crowns help both look and function. Crowns can also be used as part of a dental bridge to fill gaps caused by missing teeth.</p>
<h3>3. Inlays and Onlays</h3>
<p>For teeth not quite damaged enough to require a crown, dental inlays and onlays may be used. Natural-looking material is used to fill and cover damage in a way that improves both strength and appearance.</p>
<h3>4. Dental Bonding</h3>
<p>For minor chips and flaws, dental bonding can make all the difference. We use a tooth-colored resin to remedy chips, cracks, gaps, and more. It is a quick, affordable way to improve a smile.</p>
<h3>5. Porcelain Veneers</h3>
<p><a href="/services/dental-veneers">Veneers</a> help create a flawless look without replacing your natural teeth. Made from thin, translucent porcelain, veneers act as a cover for your teeth, eliminating cracks, chips, discoloration, gaps, and more.</p>
<h3>6. Teeth Whitening</h3>
<p>A simple and immediate smile improvement can be found through <a href="/services/teeth-whitening">professional teeth whitening</a> using <strong>Boost whitening by Ultradent</strong>. Revital Dental offers both in-office whitening and clinical strength at-home whitening kits for convenience.</p>
<h2>Schedule Your Smile Makeover</h2>
<p>We can provide you with a healthy and beautiful smile at affordable costs. Together, we will form a personalized plan to give you the smile makeover of your dreams.</p>
<blockquote><p>"Confidence comes from within, but being happy with what you're presenting on the outside can help tremendously. Everyone deserves to be proud of their smile!"</p></blockquote>
<p>Investing in your smile provides many benefits, from increased confidence to improved oral health. If you're ready to embrace the positive changes that will come from a makeover of your smile, <a href="/contact">schedule a consultation</a> with Revital Dental in Temple, TX today.</p>
<p><strong>Visit us at <a href="/">revitaldentaltempletx.com</a> or call us at (254) 227-5777.</strong></p>`
  },
  {
    id: 'mastering-toothbrushing-technique',
    title: "Mastering the Art of Brushing: A Dentist's Guide",
    seoTitle: "Mastering the Art of Brushing: A Dentist's Guide",
    seoDescription: 'Brushing seems simple, but most adults are doing it wrong. Learn the proper technique to prevent gum disease and keep your smile bright.',
    excerpt: 'Brushing seems simple, but most adults are doing it wrong. Learn the proper technique to prevent gum disease and keep your smile bright.',
    date: '2025-12-15',
    author: 'Dr. Gantayat',
    category: 'Oral Health',
    image: dental2,
    tags: ['Hygiene', 'Tips', 'Preventive'],
    content: `<p>Welcome to our dental blog, where the spotlight is on the basics of dental hygiene. Brushing is the cornerstone of dental well-being, but it is still a difficult task for many people to get exactly right.</p>
<h2>Why Brushing Matters</h2>
<p>Regular and effective toothbrushing removes the sticky film on teeth called <strong>plaque</strong>. If not removed, plaque hardens into <strong>calculus (tartar)</strong>, which cannot be removed by brushing alone and eventually causes gum disease and cavities. That is why professional <a href="/services/teeth-cleaning">Teeth Cleanings</a> are so vital.</p>
<p>Proper brushing prevents this buildup, stops bad breath, and removes surface stains for a brighter smile.</p>
<h2>Choosing Your Tools</h2>
<h3>1. The Brush: Soft vs. Hard</h3>
<p><strong>Always choose soft bristles.</strong> While medium or hard bristles might feel like they are cleaning better, they can actually wear down your tooth enamel and cause your gums to recede. A soft-bristled brush with a small-to-medium head is ideal for reaching those tricky back corners.</p>
<blockquote><p>"Electric toothbrushes are a fantastic investment. They often have built-in timers and pressure sensors to ensure you aren't brushing too hard." – Dr. Gantayat</p></blockquote>
<h3>2. The Toothpaste</h3>
<p>Look for the <strong>ADA Seal of Acceptance</strong>. Most patients benefit from fluoride, which remineralizes enamel and prevents cavities. However, for patients preferring a fluoride-free option, we recommend toothpaste containing <strong>nano-hydroxyapatite</strong>, a mineral that naturally restores enamel.</p>
<h2>The Perfect Technique (Step-by-Step)</h2>
<p>It's not just about <em>doing</em> it; it's about doing it <em>right</em>. Follow this routine twice a day for two minutes:</p>
<ol>
<li><strong>The Angle:</strong> Hold your brush at a <strong>45-degree angle</strong> to your gums. This is crucial for reaching plaque hidden under the gumline.</li>
<li><strong>The Motion:</strong> Use gentle, circular motions. Avoid back-and-forth sawing, which damages gums.</li>
<li><strong>The Inner Surface:</strong> To clean behind your front teeth, tilt the brush vertically and use up-and-down strokes.</li>
<li><strong>The Tongue:</strong> Don't forget to gently brush your tongue from back to front to remove bacteria and freshen breath.</li>
</ol>
<p>Remember to replace your toothbrush every <strong>3 to 4 months</strong>, or sooner if the bristles look frayed. A worn brush cannot clean effectively!</p>`
  },
  {
    id: 'how-to-floss-properly',
    title: 'Flossing 101: The Secret to Gum Health',
    seoTitle: 'Flossing 101: The Secret to Gum Health',
    seoDescription: 'Brushing only does half the job. Learn the proper "C-Shape" flossing technique to stop gum disease in its tracks.',
    excerpt: 'Brushing only does half the job. Learn the proper "C-Shape" flossing technique to stop gum disease in its tracks.',
    date: '2025-12-14',
    author: 'Dr. Gantayat',
    category: 'Oral Health',
    image: dental3,
    tags: ['Hygiene', 'Gum Health', 'Preventive'],
    content: `<p>If you only brush, you are leaving about <strong>40% of your tooth surfaces dirty</strong>. Flossing is the only way to remove plaque from between teeth where a brush simply cannot reach.</p>
<h2>The "C-Shape" Technique</h2>
<p>Many people just pop the floss in and out. To actually clean the tooth, you need to hug it. Here is the proper method:</p>
<h3>1. Preparation</h3>
<p>Cut off about 18 to 24 inches of floss. Wrap the ends around your middle fingers, leaving 1-2 inches of floss to work with. Grip it tightly between your thumbs and index fingers.</p>
<h3>2. Gentle Insertion</h3>
<p>Guide the floss gently between your teeth using a back-and-forth motion. <strong>Do not snap it</strong> into your gums, as this can cause injury.</p>
<h3>3. The "C" Curve (Critical Step)</h3>
<p>Once the floss is between teeth, curve it into a <strong>"C" shape</strong> against the side of one tooth. Slide it beneath the gumline and gently move it up and down. This rubs the plaque off the side of the tooth.</p>
<h3>4. Repeat</h3>
<p>Repeat this for the adjacent tooth, then move to the next space using a clean section of floss. Don't forget the back side of your very last molars!</p>
<h2>Why Do My Gums Bleed?</h2>
<p>If you aren't used to flossing, your gums may bleed at first. This is usually a sign of <strong>gingivitis</strong> (early gum disease), not an injury from the floss.</p>
<blockquote><p><strong>Dr. Gantayat's Advice:</strong> "Don't stop if you see blood! It means you need to floss <em>more</em>, not less. With daily flossing, the bleeding should stop within a week as your gums become healthy and strong."</p></blockquote>
<h2>Alternatives to String Floss</h2>
<p>If you struggle with manual dexterity or have braces, implants, or bridges, a <strong>Water Flosser</strong> is an excellent alternative. It uses a pressurized stream of water to flush out debris and bacteria.</p>
<p>Bottom line: Brushing twice a day and flossing once daily (before bed) is the formula for a healthy smile that lasts a lifetime.</p>`
  },
  {
    id: 'how-to-choose-good-dentist-temple',
    title: '5 Signs You Have Found a Good Dentist in Temple, TX',
    seoTitle: '5 Signs You Have Found a Good Dentist in Temple, TX',
    seoDescription: "Looking for a new dentist in Temple? Don't just pick the closest one. Here are the 5 signs of a high-quality, trustworthy dental practice.",
    excerpt: "Looking for a new dentist in Temple? Don't just pick the closest one. Here are the 5 signs of a high-quality, trustworthy dental practice.",
    date: '2025-12-12',
    author: 'Dr. Gantayat',
    category: 'Patient Guide',
    image: dental4,
    tags: ['Patient Guide', 'Temple TX'],
    content: `<p>With so many dental offices in Temple and Belton, how do you tell if a dentist is actually "good"? It is about more than just a nice waiting room.</p>
<p>At Revital Dental, we believe trust is earned. Here are the 5 specific things you should look for when choosing your dental home.</p>
<h3>1. They Listen More Than They Talk</h3>
<p>A good dentist will never rush you. They should ask about your goals, your fears, and your budget <em>before</em> looking in your mouth. If you feel unheard during your <a href="/services/dental-checkup">initial exam</a>, it's a red flag.</p>
<h3>2. They Use Modern Technology</h3>
<p>Dentistry has changed a lot in 10 years. A quality practice invests in digital X-rays (less radiation) and intraoral cameras so <em>you</em> can see exactly what the doctor sees. We believe in total transparency.</p>
<h3>3. Transparent Pricing &amp; Financing</h3>
<p>You should never be surprised by a bill. A good office will provide a treatment plan with estimated costs before they start working. (Check out our <a href="/financing">Financing Options</a> to see how we handle this).</p>
<h3>4. A Focus on Comfort</h3>
<p>Does the office feel clinical and cold, or warm and inviting? We offer amenities to ensure you feel relaxed, whether you are here for a cleaning or a <a href="/services/root-canal">root canal</a>.</p>
<h3>5. Real Patient Reviews</h3>
<p>The best indicator of a good dentist is what their current patients say. Look for mentions of "gentle," "explained everything," and "honest." You can read what our patients say on our <a href="/reviews">reviews page</a>.</p>`
  },
  {
    id: 'dentist-cost-temple-tx',
    title: 'How Much Does a Dentist Appointment Cost in Temple, TX?',
    seoTitle: 'How Much Does a Dentist Appointment Cost in Temple, TX?',
    seoDescription: 'One of the most common questions we get is: "How much will this cost?" We break down the average prices for dental care in the Temple/Belton area.',
    excerpt: 'One of the most common questions we get is: "How much will this cost?" We break down the average prices for dental care in the Temple/Belton area.',
    date: '2025-12-08',
    author: 'Dr. Gantayat',
    category: 'Patient Guide',
    image: dental1,
    tags: ['Costs', 'Patient Guide', 'Temple TX'],
    content: `<p>"How much does a dentist appointment cost in Texas?" is one of the top searches on Google for a reason. Pricing can be confusing.</p>
<p>At Revital Dental in Temple (76502), we believe in total transparency. While every case is unique, here is a general guide to what you can expect if you do not have dental insurance.</p>
<h2>Average Costs in Temple, TX (2025)</h2>
<ul>
<li><strong>Routine Cleaning &amp; Exam:</strong> $100 - $250. This includes X-rays, a comprehensive exam by Dr. Gantayat, and a professional cleaning.</li>
<li><strong>White Fillings:</strong> $150 - $300 per tooth, depending on the size of the cavity.</li>
<li><strong>Emergency Exam:</strong> $80 - $150. This focuses on a specific problem area to get you out of pain fast.</li>
</ul>
<h2>Ways to Save at Revital Dental</h2>
<p>We know dental care can be an investment. Here is how we make it affordable for our Temple neighbors:</p>
<ol>
<li><strong>Insurance:</strong> We accept most PPO plans (Delta, Cigna, MetLife, etc.) which usually cover 100% of preventive care.</li>
<li><strong>Payment Plans:</strong> We partner with CareCredit and Cherry to let you pay for treatment in small monthly installments.</li>
<li><strong>Membership Options:</strong> Ask about our in-house options for uninsured patients.</li>
</ol>`
  },
  {
    id: 'can-i-just-turn-up',
    title: 'Can I Just Turn Up at a Dentist? Walk-In Policy Explained',
    seoTitle: 'Can I Just Turn Up at a Dentist? Walk-In Policy Explained',
    seoDescription: "Dental emergencies don't run on a schedule. Learn how we handle same-day and walk-in appointments for patients in pain.",
    excerpt: "Dental emergencies don't run on a schedule. Learn how we handle same-day and walk-in appointments for patients in pain.",
    date: '2025-12-07',
    author: 'Dr. Gantayat',
    category: 'Emergency Dentistry',
    image: dental2,
    tags: ['Emergency', 'Same-Day', 'Temple TX'],
    content: `<p>"Can I just walk in?" We see this question a lot.</p>
<p>The short answer is: <strong>Please call us first!</strong> While we absolutely prioritize emergencies at Revital Dental, calling ahead ensures we can prep a room for you immediately.</p>
<h2>Our Same-Day Policy</h2>
<p>If you are in Temple or Belton and experiencing:</p>
<ul>
<li>Severe tooth pain (throbbing/keeping you awake)</li>
<li>A knocked-out tooth</li>
<li>A broken crown</li>
<li>Swelling in the jaw</li>
</ul>
<p><strong>Call (254) 227-5777 immediately.</strong> We reserve spots in our daily schedule specifically for these situations. Even if you don't have an appointment, we will do everything possible to squeeze you in for relief.</p>
<h2>What if it's after hours?</h2>
<p>Leave us a voicemail. For severe swelling that impacts breathing or trauma to the face, please go to the nearest ER in Temple immediately.</p>`
  },
  {
    id: 'root-canal-cost-temple',
    title: 'How Much Does a Root Canal Cost in Temple, TX?',
    seoTitle: 'How Much Does a Root Canal Cost in Temple, TX?',
    seoDescription: 'Many patients fear the cost of a root canal more than the procedure itself. Here is a transparent guide to pricing in the Temple area.',
    excerpt: 'Many patients fear the cost of a root canal more than the procedure itself. Here is a transparent guide to pricing in the Temple area.',
    date: '2025-12-07',
    author: 'Dr. Gantayat',
    category: 'Restorative Care',
    image: dental3,
    tags: ['Root Canal', 'Costs', 'Temple TX'],
    content: `<p>One of the most common questions we hear at Revital Dental is: <strong>"Is a root canal expensive?"</strong></p>
<p>If you are experiencing the throbbing pain of an infected tooth, cost should be the last thing on your mind—but we understand that for families in <strong>Temple (76502)</strong>, budget is a reality.</p>
<h2>The Average Cost in Temple (2025)</h2>
<p>In the Temple/Belton area, the cost varies by tooth complexity:</p>
<ul>
<li><strong>Front Tooth:</strong> Typically ranges from $700 - $1,100</li>
<li><strong>Premolar:</strong> Typically ranges from $800 - $1,300</li>
<li><strong>Molar:</strong> Typically ranges from $1,000 - $1,600</li>
</ul>
<h2>Does Insurance Cover It?</h2>
<p><strong>Yes!</strong> Most dental insurance plans classify root canals as a "Basic" or "Major" procedure, typically covering <strong>50% to 80%</strong> of the cost.</p>
<p>At Revital Dental, we will run a complimentary benefits check <em>before</em> we start, so you know exactly what your out-of-pocket cost will be.</p>
<h2>Payment Options at Revital Dental</h2>
<p>We believe no one should live in pain due to finances. We offer:</p>
<ul>
<li><strong>CareCredit:</strong> 0% interest financing options.</li>
<li><strong>Cherry Payment Plans:</strong> Flexible monthly payments.</li>
</ul>
<p><strong>In pain? Don't wait.</strong> <a href="/contact">Call our Temple office today</a> for an emergency exam.</p>`
  },
  {
    id: 'understanding-sleep-apnea',
    title: 'Understanding Sleep Apnea: Symptoms, Risks, and Solutions',
    seoTitle: 'Understanding Sleep Apnea: Symptoms, Risks, and Solutions',
    seoDescription: 'Snoring keeping you awake? Learn about the symptoms, risks, and effective treatment options for sleep apnea right here in Temple.',
    excerpt: 'Snoring keeping you awake? Learn about the symptoms, risks, and effective treatment options for sleep apnea right here in Temple.',
    date: '2025-12-05',
    author: 'Dr. Gantayat',
    category: 'General & Family Dentistry',
    image: dental4,
    tags: ['Sleep Apnea', 'Treatment'],
    content: `<p>Sleep apnea is a common yet serious sleep disorder. In Temple, we see many patients who don't even realize they have it until a partner complains about their snoring.</p>
<h2>Effective Treatment in Temple</h2>
<p>Many patients hate their CPAP machines. We offer a safe, effective alternative: the <strong>EMA (Elastic Mandibular Advancement) Device</strong>. It is a custom-made mouthpiece that gently repositions your jaw forward to keep your airway open. It is silent, portable, and requires no electricity.</p>`
  },
  {
    id: 'brighten-smile-holidays',
    title: 'Brighten Your Smile for the Holidays',
    seoTitle: 'Brighten Your Smile for the Holidays',
    seoDescription: 'Get ready for holiday photos! Discover our guide to teeth whitening options, including Zoom and custom trays available in Temple.',
    excerpt: 'Get ready for holiday photos! Discover our guide to teeth whitening options, including Zoom and custom trays available in Temple.',
    date: '2025-11-28',
    author: 'Dr. Gantayat',
    category: 'Cosmetic Dentistry',
    image: dental1,
    tags: ['Whitening', 'Cosmetic', 'Seasonal'],
    content: `<p>The holidays are a time for photos and parties. Is your smile ready? Teeth whitening is one of the fastest ways to upgrade your appearance.</p>`
  },
  {
    id: 'invisalign-express',
    title: 'Invisalign Express: The Fast Track to a Perfect Smile',
    seoTitle: 'Invisalign Express: The Fast Track to a Perfect Smile',
    seoDescription: 'Looking for a quick fix before a wedding or event? Learn about Invisalign Express, an accelerated treatment available in Temple, TX.',
    excerpt: 'Looking for a quick fix before a wedding or event? Learn about Invisalign Express, an accelerated treatment available in Temple, TX.',
    date: '2025-11-10',
    author: 'Dr. Gantayat',
    category: 'Invisalign',
    image: dental2,
    tags: ['Invisalign', 'Orthodontics', 'Temple TX'],
    content: `<p>For many adults in Temple, the idea of wearing braces for two years is a dealbreaker. But what if you only need a minor adjustment? Enter <strong>Invisalign Express</strong>.</p>
<p>This service is ideal for those who have an upcoming event, such as a wedding or graduation. The entire process often takes <strong>less than 6 months</strong> from start to finish.</p>
<h2>Cost in Temple</h2>
<p>Because it uses fewer trays, Invisalign Express is <strong>more affordable</strong> than full treatment. We accept most insurance plans and offer financing via Cherry.</p>`
  },
  {
    id: 'root-of-bad-breath',
    title: 'The Root of Bad Breath: Causes and Cures',
    seoTitle: 'The Root of Bad Breath: Causes and Cures',
    seoDescription: "What causes bad breath? Whether it's food, disease, or dental issues, get to the root cause and solve your bad breath problems.",
    excerpt: "What causes bad breath? Whether it's food, disease, or dental issues, get to the root cause and solve your bad breath problems.",
    date: '2025-10-25',
    author: 'Dr. Gantayat',
    category: 'Oral Health',
    image: dental3,
    tags: ['Oral Health', 'Halitosis'],
    content: `<p>Chronic bad breath (halitosis) can be embarrassing. It is often caused by bacteria hiding on the tongue or gum disease. Regular cleanings at our Temple office can help remove the bacteria your toothbrush can't reach.</p>`
  },

  // ------------------------------------------------------------------
  // Pre-existing posts (in this repo since Dec 2025; not on the live
  // site's current blog index — republished intentionally).
  // SEO titles below were corrected from earlier template residue;
  // bylines reassigned from a non-Revital dentist to Dr. Kondragunta.
  // ------------------------------------------------------------------
  {
    id: 'why-get-veneers',
    title: 'Why Do People Get Veneers?',
    seoTitle: 'Dental Veneers Temple TX | Revital Dental Cosmetic Dentistry',
    seoDescription: 'Are dental veneers right for you? Learn how they fix chips, gaps, and stains for a perfect smile.',
    excerpt: 'The dental veneers market is booming. From fixing chips to closing gaps, see how this cosmetic treatment transforms smiles.',
    date: '2025-12-01',
    author: 'Dr. Suman Kondragunta',
    category: 'Dental Veneers',
    image: dental1,
    tags: ['Veneers', 'Cosmetic', 'Smile Makeover'],
    content: `<p>Dental veneers are thin, custom-made shells crafted of tooth-colored materials designed to cover the front surface of teeth...</p>`
  },
  {
    id: 'invisalign-vs-braces',
    title: 'Invisalign vs. Braces: What is Right for You?',
    seoTitle: 'Invisalign vs Braces Temple TX | Revital Dental',
    seoDescription: 'Comparing clear aligners vs traditional metal braces in Temple, TX.',
    excerpt: 'Choosing between clear aligners and traditional metal braces is a big decision. We break down the cost, comfort, and speed.',
    date: '2025-11-27',
    author: 'Dr. Suman Kondragunta',
    category: 'Invisalign',
    image: dental2,
    tags: ['Invisalign', 'Orthodontics'],
    content: `<p>Choosing between <strong>Invisalign</strong> and traditional braces is a significant decision...</p>`
  },
  {
    id: 'tongue-pain-causes',
    title: 'Why Does The Side Of My Tongue Hurt?',
    seoTitle: 'Tongue Pain Causes & Treatments | Temple TX Dentist',
    seoDescription: 'Experiencing tongue pain? Learn common causes from trauma to vitamin deficiency.',
    excerpt: 'It may not seem like a big deal at first, but tongue pain can indicate underlying issues. Here is what to look out for.',
    date: '2025-11-20',
    author: 'Dr. Suman Kondragunta',
    category: 'Preventive',
    image: dental3,
    tags: ['Oral Health', 'Diagnosis'],
    content: `<p>Tongue pain is surprisingly common and often ignored...</p>`
  },
  {
    id: 'replace-toothbrush',
    title: 'How Often Should I Change My Toothbrush?',
    seoTitle: 'When to Change Toothbrush | Dental Hygiene Tips',
    seoDescription: 'Learn why changing your toothbrush every 3 months is crucial for oral health.',
    excerpt: 'How often should I change my toothbrush? According to the ADA, you might be keeping yours for too long.',
    date: '2025-11-10',
    author: 'Dr. Suman Kondragunta',
    category: 'Preventive',
    image: dental4,
    tags: ['Hygiene', 'Tips'],
    content: `<p>A worn-out toothbrush cannot clean your teeth effectively...</p>`
  }
];
