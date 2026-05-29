/* =====================================================
   i18n — English (en) & Shona (sn)
   =====================================================
   Lightweight translation map. Each key is a short ID,
   each value is the translated string per language.
   Use:   const { t, lang, setLang } = useLang();
          t("hero_title_1")  →  "Fence" / "Maguruva"
   ===================================================== */

import { useEffect, useState } from "react";

export type Lang = "en" | "sn";

export const translations = {
  /* ─── Header / Nav ───────────────────────────────── */
  nav_about:     { en: "About",     sn: "Nezvedu"   },
  nav_products:  { en: "Products",  sn: "Zvigadzirwa" },
  nav_services:  { en: "Services",  sn: "Mabasa"    },
  nav_why_us:    { en: "Why Us",    sn: "Nei Isu"   },
  nav_contact:   { en: "Contact",   sn: "Tibate"    },

  header_promise:  { en: "Our Promise",                       sn: "Vimbiso Yedu" },
  header_promise_1:{ en: "The Steel That",                    sn: "Simbi Inogara" },
  header_promise_2:{ en: "Lasts a Lifetime",                  sn: "Kweupenyu Hwese" },
  header_free_quote: { en: "Free Quote",                      sn: "Yedza Mahara" },

  /* ─── Hero ───────────────────────────────────────── */
  hero_title_1:  { en: "Fence",    sn: "Maguruva"  },
  hero_title_2:  { en: "Experts",  sn: "Nyanzvi"   },
  hero_sublabel: { en: "Commercial & Residential", sn: "Zvebhizimusi neDzimba" },
  hero_desc: {
    en: "Affordable steel and fencing solutions, manufactured and installed by qualified specialists serving every province in Zimbabwe.",
    sn: "Simbi nemaguruva anodhura zvishoma, akagadzirwa uye anoiswa nenyanzvi dzakadzidza dzinoshandira matunhu ese eZimbabwe.",
  },
  hero_btn_quote:   { en: "Request a Quote", sn: "Kumbira Mutengo" },
  hero_btn_range:   { en: "Our Range",       sn: "Zvatinoita"      },

  /* ─── Marquee strip ──────────────────────────────── */
  m_barbed:      { en: "Barbed Wire",        sn: "Waya Ine Minzwa" },
  m_razor:       { en: "Razor Wire",         sn: "Waya Inocheka" },
  m_plain:       { en: "Plain Wire",         sn: "Waya Yakatwasuka" },
  m_game:        { en: "Game Wire",          sn: "Waya yeMhuka" },
  m_corner:      { en: "Corner Posts",       sn: "Mapango eMakona" },
  m_bolts:       { en: "Bolts & Nuts",       sn: "Mabhauti neMatete" },
  m_steel:       { en: "Steel Products",     sn: "Zvigadzirwa zveSimbi" },
  m_washing:     { en: "Washing Lines",      sn: "Mitambo yeKuanika" },
  m_install:     { en: "Fence Installation", sn: "Kuisa Maguruva" },
  m_selling:     { en: "Fence Selling",      sn: "Kutengesa Maguruva" },
  m_supply:      { en: "Steel Supply",       sn: "Kupa Simbi" },
  m_strong:      { en: "7+ Years Strong",    sn: "Makore 7+ Akasimba" },

  /* ─── Trust stats ────────────────────────────────── */
  stat_1_n:  { en: "7+",     sn: "7+" },
  stat_1_l:  { en: "Years Experience",        sn: "Makore eRuzivo" },
  stat_2_n:  { en: "All",    sn: "Ese" },
  stat_2_l:  { en: "Provinces in Zimbabwe",   sn: "Matunhu eZimbabwe" },
  stat_3_n:  { en: "100%",   sn: "100%" },
  stat_3_l:  { en: "Qualified Specialists",   sn: "Nyanzvi Dzakadzidza" },
  stat_4_n:  { en: "★★★★★",  sn: "★★★★★" },
  stat_4_l:  { en: "Trusted Nationwide",      sn: "Vanovimbwa Nyika Yose" },

  /* ─── About ──────────────────────────────────────── */
  about_eyebrow: { en: "— About Us",            sn: "— Nezvedu" },
  about_h_1:     { en: "Steel & Fence,",        sn: "Simbi neMaguruva," },
  about_h_2:     { en: "Done Right.",           sn: "Zvakaitwa Zvakanaka." },
  about_body_lead: { en: "Batriku Steel Investment", sn: "Batriku Steel Investment" },
  about_body: {
    en: " provides all types of steel and fence products at affordable prices across Zimbabwe. We specialize in",
    sn: " inopa marudzi ese esimbi nezvigadzirwa zvemaguruva pamitengo yakaderera muZimbabwe yose. Tine ruzivo rwakadzama mu",
  },
  about_word_manufacture:   { en: "fence manufacturing", sn: "kugadzira maguruva" },
  about_word_install:       { en: "fence installation",  sn: "kuisa maguruva" },
  about_word_washing:       { en: "washing lines",       sn: "mitambo yekuanika" },
  about_word_steel:         { en: "steel supply",        sn: "kupa simbi" },
  about_chip_1:  { en: "Fence Manufacturing", sn: "Kugadzira Maguruva" },
  about_chip_2:  { en: "Fence Installation",  sn: "Kuisa Maguruva" },
  about_chip_3:  { en: "Washing Lines",       sn: "Mitambo yeKuanika" },
  about_chip_4:  { en: "Steel Supply",        sn: "Kupa Simbi" },

  /* ─── Products section ───────────────────────────── */
  prod_eyebrow:  { en: "— Our Materials",      sn: "— Zvinhu Zvedu" },
  prod_h_1:      { en: "Built From The",       sn: "Zvakavakwa Kubva" },
  prod_h_2:      { en: "Ground Up.",           sn: "Pasi Pose." },
  prod_desc: {
    en: "Every roll, post and panel is sourced from certified mills and installed by hands that have spent a lifetime in the trade.",
    sn: "Roora rega rega, pango uye paneru zvinotorwa kumakambani akabvumirwa uye zvinoiswa nemaoko akashanda upenyu hwese mubasa iri.",
  },
  prod_t_diamond:  { en: "Diamond Mesh",       sn: "Waya yeDhayamani" },
  prod_t_game:     { en: "Game Bonnox",        sn: "Bhonokisi yeMhuka" },
  prod_t_barbed:   { en: "Barbed Wire",        sn: "Waya Ine Minzwa" },
  prod_t_razor:    { en: "Razor Wire",         sn: "Waya Inocheka" },
  prod_t_plain:    { en: "Plain Wire",         sn: "Waya Yakatwasuka" },
  prod_t_gamewire: { en: "Game Wire",          sn: "Waya yeMhuka" },
  prod_t_gates:    { en: "Gates",              sn: "Magedhi" },
  prod_t_corner:   { en: "Corner Posts",       sn: "Mapango eMakona" },
  prod_t_wooden:   { en: "Wooden Poles",       sn: "Mapango eHuni" },
  prod_t_bolts:    { en: "Bolts & Nuts",       sn: "Mabhauti neMatete" },
  prod_t_washing:  { en: "Washing Lines",      sn: "Mitambo yeKuanika" },
  prod_t_install:  { en: "Fence Installation", sn: "Kuisa Maguruva" },
  prod_tag_1: { en: "01 / Fencing",        sn: "01 / Maguruva" },
  prod_tag_2: { en: "02 / Wildlife Grade", sn: "02 / Yemhuka" },
  prod_tag_3: { en: "03 / Galvanized",     sn: "03 / Yakanyikwa" },
  prod_tag_4: { en: "04 / High Security",  sn: "04 / Chengetedzo" },
  prod_tag_5: { en: "05 / Smooth Coil",    sn: "05 / Yakatenderera" },
  prod_tag_6: { en: "06 / Heavy Duty",     sn: "06 / Yakasimba" },
  prod_tag_7: { en: "07 / Security",       sn: "07 / Chengetedzo" },
  prod_tag_8: { en: "08 / Powder Coated",  sn: "08 / Yakapendwa" },
  prod_tag_9: { en: "09 / Timber",         sn: "09 / Huni" },
  prod_tag_10:{ en: "10 / Hardware",       sn: "10 / Hadhiwe" },
  prod_tag_11:{ en: "11 / Residential",    sn: "11 / Dzimba" },
  prod_tag_12:{ en: "12 / On-Site Crew",   sn: "12 / Chikwata" },

  /* ─── Services section ───────────────────────────── */
  serv_eyebrow:  { en: "◆ Services",        sn: "◆ Mabasa" },
  serv_title:    { en: "What We Offer",     sn: "Zvatinopa" },
  serv_desc: {
    en: "A full perimeter solution — from raw poles to finished, secured boundaries. Pick a category, we handle the rest.",
    sn: "Mhinduro yakazara yemiganhu — kubva pamapango asina kugadzirwa kusvika pamiganhu yakapera, yakachengetedzwa. Sarudza chikamu, isu tinoita zvasara.",
  },
  serv_1: { en: "Diamond Mesh Fencing", sn: "Maguruva eDhayamani" },
  serv_2: { en: "Game Bonnox Fencing",  sn: "Maguruva eMhuka (Bonnox)" },
  serv_3: { en: "Gates",                sn: "Magedhi" },
  serv_4: { en: "Razor Wire",           sn: "Waya Inocheka" },
  serv_5: { en: "Washing Lines",        sn: "Mitambo yeKuanika" },
  serv_6: { en: "Barbed Wire Fencing",  sn: "Maguruva eWaya Ine Minzwa" },
  serv_7: { en: "Poles & Corner Posts", sn: "Mapango eMakona" },
  serv_8: { en: "Wooden Poles",         sn: "Mapango eHuni" },
  serv_9: { en: "Plain Wire",           sn: "Waya Yakatwasuka" },
  serv_10:{ en: "Bolts & Nuts",         sn: "Mabhauti neMatete" },

  serv_badge_1: { en: "Free Site Survey",  sn: "Ongororo yeNzvimbo Mahara" },
  serv_badge_2: { en: "Same-Week Install", sn: "Kuiswa Vhiki Imwe Chete" },
  serv_badge_3: { en: "Warranty Backed",   sn: "Ine Waranti" },
  serv_badge_4: { en: "Bulk Pricing",      sn: "Mitengo Yakawanda" },

  /* ─── Mission & Vision ───────────────────────────── */
  mv_eyebrow:    { en: "◆ Our Purpose",      sn: "◆ Chinangwa Chedu" },
  mv_title:      { en: "Mission & Vision",   sn: "Chinangwa neRuoneko" },
  mv_m_label:    { en: "01 — Mission",       sn: "01 — Chinangwa" },
  mv_m_title:    { en: "Our Mission",        sn: "Chinangwa Chedu" },
  mv_m_body_a:   { en: "To provide",         sn: "Kupa" },
  mv_m_body_b:   { en: "affordable steel and fencing solutions", sn: "mhinduro dzesimbi nemaguruva anodhura zvishoma" },
  mv_m_body_c:   { en: " to everyone across Zimbabwe.", sn: " kuvanhu vese muZimbabwe." },
  mv_v_label:    { en: "02 — Vision",        sn: "02 — Ruoneko" },
  mv_v_title:    { en: "Our Vision",         sn: "Ruoneko Rwedu" },
  mv_v_body_a:   { en: "To become one of",   sn: "Kuva mumwe we" },
  mv_v_body_b:   { en: "Zimbabwe's leading steel and fence suppliers", sn: "vatengesi vakuru vesimbi nemaguruva muZimbabwe" },
  mv_v_body_c:   { en: " and expand internationally.", sn: " uye kuwedzera kunze kwenyika." },

  /* ─── Why Us ─────────────────────────────────────── */
  why_eyebrow:   { en: "— Why Batriku",            sn: "— Nei Batriku" },
  why_h_1:       { en: "Strength You Can",         sn: "Simba Iro" },
  why_h_2:       { en: "Walk The Length Of.",      sn: "Raungafamba Nharo Yacho." },
  why_desc: {
    en: "We don't just sell fencing — we deliver a perimeter. From the first pole driven to the final tension on the last roll of mesh, our crews leave the site straight, plumb, and bulletproof.",
    sn: "Hatingotengeswi maguruva chete — tinopa muganhu. Kubva papango rekutanga rinosvika pakukweva kwekupedzisira kwewaya, vashandi vedu vanosiya nzvimbo yakatwasuka, yakamira, uye yakasimba.",
  },
  why_li_1_t:  { en: "Engineer-grade welding",      sn: "Kunamira kweInjiniya" },
  why_li_1_d:  { en: "Every joint is structurally certified.", sn: "Pakabatana pose pakakwanira chivakwa." },
  why_li_2_t:  { en: "Hot-dip galvanizing",         sn: "Kunyikwa muSimbi Inopisa" },
  why_li_2_d:  { en: "Decades of rust resistance, standard.", sn: "Makore akawanda ekudzivirira ngura, akajairika." },
  why_li_3_t:  { en: "Locally sourced timber",      sn: "Huni dzemumusha" },
  why_li_3_d:  { en: "Sustainable poles, treated to last.", sn: "Mapango anogarira, akagadzirirwa kugara." },
  why_btn:     { en: "Start Your Project",          sn: "Tanga Chirongwa Chako" },
  why_card_label:{ en: "Client Note",                sn: "Mashoko eMutengi" },
  why_card_text: {
    en: "“Crew arrived sharp, finished early, and the fence is still laser-straight three winters later.”",
    sn: "“Chikwata chakauya nguva, chakapedza nguva, uye guruva richakatwasuka chando matatu apfuura.”",
  },
  why_card_attr: { en: "— Game Farm, Mash. Central", sn: "— Purazi reMhuka, Mash. Central" },
  why_badge_top: { en: "100%",        sn: "100%" },
  why_badge_bot: { en: "Guarantee",   sn: "Vimbiso" },

  /* ─── Footer ─────────────────────────────────────── */
  ft_find:       { en: "Find Us",     sn: "Tiwane" },
  ft_city:       { en: "Harare",      sn: "Harare" },
  ft_addr_1:     { en: "Corner Crippes Road & Harare Road North,", sn: "Pakona yeCrippes Road neHarare Road North," },
  ft_addr_2_a:   { en: "opposite ",                                sn: "pakatarisana ne " },
  ft_addr_2_b:   { en: "Steel Mate Investments",                   sn: "Steel Mate Investments" },
  ft_addr_2_c:   { en: " Company.",                                sn: " Company." },
  ft_directions: { en: "Get Directions", sn: "Wana Nzira" },

  ft_eyebrow:    { en: "— Connect",          sn: "— Tibatanidze" },
  ft_h:          { en: "Talk To A Real Person.", sn: "Taura neMunhu Chaiye." },
  ft_sub: {
    en: "No bots, no call centres — your message reaches the team directly. Fastest reply is on WhatsApp.",
    sn: "Hapana mabhoti, hapana macall centre — meseji yako inosvika kwechikwata chaicho. Mhinduro inokurumidza iri paWhatsApp.",
  },
  ft_whatsapp:   { en: "WhatsApp", sn: "WhatsApp" },
  ft_call:       { en: "Call",     sn: "Foni" },
  ft_email:      { en: "Email Us: batriku@gmail.com", sn: "Tumira Email: batriku@gmail.com" },

  /* ─── Trust ribbon ───────────────────────────────── */
  trust_full: {
    en: "Trusted Craftmanship! We take pride in our work. A referral is the biggest compliment!",
    sn: "Unyanzvi Hunovimbwa! Tinodada nebasa redu. Kutumirwa nemumwe ndiko kurumbidza kukuru!",
  },
  trust_short: { en: "A referral is the biggest compliment.", sn: "Kutumirwa nemumwe ndiko kurumbidza kukuru." },
  trust_lead:  { en: "Trusted Craftmanship!", sn: "Unyanzvi Hunovimbwa!" },

  /* ─── Modal / Quote form ─────────────────────────── */
  modal_eyebrow: { en: "Free Quote",                  sn: "Yedza Mahara" },
  modal_title:   { en: "Tell Us About Your Project",  sn: "Tiudze Nezve Chirongwa Chako" },
  field_name:    { en: "Your Name *",                 sn: "Zita Rako *" },
  field_phone:   { en: "Phone (optional)",            sn: "Foni (kana uchida)" },
  field_msg:     { en: "What Do You Need? *",         sn: "Chii Chaunoda? *" },
  ph_name:       { en: "e.g. Tendai Moyo",            sn: "semuenzaniso Tendai Moyo" },
  ph_phone:      { en: "+263 ...",                    sn: "+263 ..." },
  ph_msg: {
    en: "e.g. 120m of diamond mesh fencing in Borrowdale. Site visit needed.",
    sn: "semuenzaniso 120m yemaguruva eDhayamani muBorrowdale. Kushanyira nzvimbo kunodiwa.",
  },
  btn_submit:    { en: "Submit",       sn: "Tumira" },
  btn_submitting:{ en: "Submitting...", sn: "Kutumira..." },

  /* ─── Language switcher ──────────────────────────── */
  lang_label:    { en: "Language", sn: "Mutauro" },
  lang_en:       { en: "English",  sn: "English" },
  lang_sn:       { en: "Shona",    sn: "ChiShona" },

  /* ─── WhatsApp message labels ────────────────────── */
  wa_title:        { en: "NEW QUOTE REQUEST",   sn: "CHIKUMBIRO CHITSVA CHEMUTENGO" },
  wa_brand:        { en: "Batriku Steel Investments", sn: "Batriku Steel Investments" },
  wa_customer:     { en: "Customer", sn: "Mutengi" },
  wa_phone:        { en: "Phone",    sn: "Foni" },
  wa_details:      { en: "Project Details", sn: "Zviri muChirongwa" },
  wa_submitted:    { en: "Submitted",       sn: "Yatumirwa" },
  wa_not_provided: { en: "—  not provided", sn: "—  haina kupiwa" },
  wa_footer:       { en: "Sent via batriku.com", sn: "Yatumirwa kuburikidza ne batriku.com" },
} as const;

export type TKey = keyof typeof translations;

/* ─── Hook backed by localStorage ───────────────── */
const STORAGE_KEY = "batriku.lang";

export function useLang() {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    return saved === "sn" || saved === "en" ? saved : "en";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang === "sn" ? "sn" : "en";
    }
  }, [lang]);

  const t = (key: TKey): string => translations[key][lang];

  return { lang, setLang: setLangState, t };
}
