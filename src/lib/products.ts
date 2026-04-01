export interface Product {
  id: number
  name: string
  calibre: string
  category: string
  type: string
  desc: string
  img: string
  tags: string[]
  url?: string
}

export const PRODUCTS: Product[] = [
  // ── AI SYSTEMS ───────────────────────────────────────────────
  {
    id: 32, name: "Arcana Precision", calibre: "AI threat detection", category: "AI Systems", type: "AI Software",
    desc: "AI-powered precision targeting and fire control system by Arcana. Delivers advanced autonomous targeting solutions for modern defence platforms.",
    img: "https://arcanamace.com/icon-512.png",
    url: "https://arcanamace.com/arcana-precision",
    tags: ["AI", "Precision", "Targeting", "Autonomous"]
  },

  // ── STANDARD AMMUNITION ──────────────────────────────────────
  {
    id: 1, name: "CAL 9×19MM", calibre: "9×19mm", category: "Standard Ammunition", type: "Handgun",
    desc: "NATO-standard 9mm Parabellum pistol round. Widely used by military, police, and security forces globally. Available in FMJ, HP, and tracer variants.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=194,h=238,fit=crop/mePLErEQM3S6lbg2/caliber-9x19mm-2.pdf-dwxwbyqop6iqdnqv-AMqnZLrPRBSppzn9.png",
    tags: ["NATO", "Pistol", "FMJ"]
  },
  {
    id: 2, name: "CAL 5.56×45MM", calibre: "5.56×45mm", category: "Standard Ammunition", type: "Rifle",
    desc: "NATO standard intermediate rifle cartridge. Optimised for assault rifles including M16, M4, and STANAG-compatible platforms. Available in SS109/M855 ball and tracer.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=278,h=346,fit=crop/mePLErEQM3S6lbg2/beluga---product-catalogue-10-aop6gvkr8os2gbwv-m6LvGW5ONPT4p6W2.png",
    tags: ["NATO", "Rifle", "STANAG"]
  },
  {
    id: 3, name: "CAL 7.62×51MM", calibre: "7.62×51mm", category: "Standard Ammunition", type: "Rifle / MG",
    desc: "NATO standard rifle and machine gun cartridge. Used in FN MAG, M60, M240, and precision rifles. High reliability and terminal performance.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=242,h=297,fit=crop/mePLErEQM3S6lbg2/beluga---product-catalogue-13-a3qpjwb88ktjln0b-A85pGnkyWeuyoBnk.png",
    tags: ["NATO", "Rifle", "MG"]
  },
  {
    id: 4, name: "CAL 7.62×63MM", calibre: "7.62×63mm", category: "Standard Ammunition", type: "Rifle",
    desc: ".30-06 Springfield round with proven combat heritage. Available for M1 Garand, M1919, and legacy platforms requiring this calibre.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=400,h=354,fit=crop/mePLErEQM3S6lbg2/beluga---product-catalogue-11-mep1nvkoklhl4lll-A0xNG7KQEbU7NMbQ.png",
    tags: ["Rifle", "Legacy"]
  },
  {
    id: 5, name: "CAL 7.9×57MM", calibre: "7.9×57mm", category: "Standard Ammunition", type: "Rifle",
    desc: "8mm Mauser — widely fielded in legacy weapon systems across the Middle East and Africa. Available in ball and AP configurations.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=242,h=297,fit=crop/mePLErEQM3S6lbg2/7.9x57mm.pdf-mnl69vvzqwi9x7gq-AE0pGZqNwRfwRp1O.png",
    tags: ["Rifle", "Legacy", "AP"]
  },
  {
    id: 6, name: "CAL 12.7×99MM", calibre: "12.7×99mm", category: "Standard Ammunition", type: "Heavy MG",
    desc: ".50 BMG — NATO heavy machine gun and anti-materiel round for M2HB, M107, and other heavy platforms. Ball, AP, and API variants available.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=327,h=256,fit=crop/mePLErEQM3S6lbg2/beluga---product-catalogue-14-mnl69vwz8mfwpo9n-mePLwp5p7zUlPMvq.png",
    tags: ["NATO", "Heavy MG", "API"]
  },

  // ── NON-STANDARD AMMUNITION ─────────────────────────────────
  {
    id: 7, name: "CAL 7.62×54R", calibre: "7.62×54R", category: "Non-Standard Ammunition", type: "Rifle / MG",
    desc: "Russian rimmed cartridge for PKM, SVD Dragunov, and Mosin-Nagant platforms. Extensive stockpiles available. Ball, PS, and armour-piercing variants.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=308,h=304,fit=crop/mePLErEQM3S6lbg2/7.62x39mm-aop6gvka44u1jrgk-d95pGwJlJGT6eDaX.png",
    tags: ["Russian", "Rifle", "MG"]
  },
  {
    id: 31, name: "CAL 82MM HE M71", calibre: "82mm", category: "Non-Standard Ammunition", type: "HE Mortar",
    desc: "82mm High Explosive mortar bomb M71 listed under non-standard supply. Compatible with Soviet-pattern 82mm mortar systems. Available through non-NATO procurement channels with full compliance documentation.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=400,h=305,fit=crop/mePLErEQM3S6lbg2/beluga---product-catalogue-15-aq26ov5xxgszloxv-ALpJMx48E3tJO5gL.png",
    tags: ["HE", "82mm", "Soviet-pattern", "Non-Standard"]
  },
  {
    id: 8, name: "CAL 12.7×108MM", calibre: "12.7×108mm", category: "Non-Standard Ammunition", type: "Heavy MG",
    desc: "Soviet/Russian heavy machine gun round for DShK, NSV, and Kord platforms. High-penetration API and HEI variants available for anti-materiel use.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=400,h=447,fit=crop/mePLErEQM3S6lbg2/beluga---product-catalogue-16-m5k2bwz2nxcrav3b-YBgpGnNaR8TkVXLG.png",
    tags: ["Russian", "Heavy MG", "API"]
  },

  // ── RIFLES ───────────────────────────────────────────────────
  {
    id: 33, name: "AK-47 ASSAULT RIFLE", calibre: "7.62×39mm", category: "Rifles", type: "Assault Rifle",
    desc: "Kalashnikov AK-47 assault rifle, cal. 7.62×39mm. Wooden stock, MD 1963 configuration. Supplied with 2×30 round magazines, cleaning rod, sling, and cleaning kit. One of the most widely fielded infantry rifles globally, known for reliability in extreme conditions.",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/65/AK-47_type_II_noBG.png",
    tags: ["AK-47", "Kalashnikov", "Assault Rifle", "7.62×39mm"]
  },
  {
    id: 34, name: "PSL MACHINE GUN", calibre: "7.62×54R", category: "Rifles", type: "Designated Marksman Rifle",
    desc: "Romanian PSL (Puşcă Semiautomată cu Luneta) cal. 7.62×54R. Supplied with optical scope, 2×10 round magazines, cleaning rod, sling, and cleaning kit. Semi-automatic designated marksman rifle effective to 800m. Compatible with Soviet 7.62×54R ammunition.",
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e9/SVD_Dragunov-removebg-preview.png",
    tags: ["PSL", "DMR", "7.62×54R", "Scoped"]
  },

  // ── PISTOLS ───────────────────────────────────────────────────
  {
    id: 36, name: "RS9 VAMPIR – BLACK", calibre: "9×19mm PARA", category: "Pistols", type: "Semi-Auto Pistol",
    desc: "RS9 Vampir semi-automatic pistol in black ceramic finish. Full metal construction with chrome-molybdenum steel barrel and aluminium alloy frame. Used by special operations units since 2020. Barrel: 108mm. Weight: 820g. Magazine: 18 rounds. Overall length: 190.5mm. Effective range: 50m. Decocker and firing pin block safety.",
    img: "https://rs9vampir.ba/wp-content/uploads/2021/05/RS9-Vampir-black.png",
    url: "https://rs9vampir.ba",
    tags: ["9mm", "Pistol", "Semi-Auto", "Black", "Special Ops"]
  },
  {
    id: 38, name: "RS9 VAMPIR – DESERT", calibre: "9×19mm PARA", category: "Pistols", type: "Semi-Auto Pistol",
    desc: "RS9 Vampir semi-automatic pistol in desert sand finish. Full metal construction with chrome-molybdenum steel barrel and aluminium alloy frame. Used by special operations units since 2020. Barrel: 108mm. Weight: 820g. Magazine: 18 rounds. Overall length: 190.5mm. Effective range: 50m. Decocker and firing pin block safety.",
    img: "https://rs9vampir.ba/wp-content/uploads/2021/05/RS9-Vampir-sand.png",
    url: "https://rs9vampir.ba",
    tags: ["9mm", "Pistol", "Semi-Auto", "Desert", "Special Ops"]
  },
  {
    id: 39, name: "RS9 VAMPIR – GREEN", calibre: "9×19mm PARA", category: "Pistols", type: "Semi-Auto Pistol",
    desc: "RS9 Vampir semi-automatic pistol in green finish. Full metal construction with chrome-molybdenum steel barrel and aluminium alloy frame. Used by special operations units since 2020. Barrel: 108mm. Weight: 820g. Magazine: 18 rounds. Overall length: 190.5mm. Effective range: 50m. Decocker and firing pin block safety.",
    img: "https://rs9vampir.ba/wp-content/uploads/2021/05/RS9-Vampir-green.png",
    url: "https://rs9vampir.ba",
    tags: ["9mm", "Pistol", "Semi-Auto", "Green", "Special Ops"]
  },
  {
    id: 37, name: "RS9 VAMPIR LUX", calibre: "9×19mm PARA", category: "Pistols", type: "Semi-Auto Pistol",
    desc: "Premium variant of the RS9 Vampir semi-automatic pistol. Features aluminium alloy grips with gold engravings and TRB medallion. Picatinny MIL-STD-1913 rail, ambidextrous magazine release, decocker and firing pin safety. Barrel: 108mm. Weight: 820g (unloaded). Magazine: 18 rounds. Overall length: 190.5mm. Effective range: 50m. Full metal construction.",
    img: "https://rs9vampir.ba/wp-content/uploads/2021/06/rs9-vampir-lux.png",
    url: "https://rs9vampir.ba",
    tags: ["9mm", "Pistol", "Semi-Auto", "LUX", "Picatinny", "Premium"]
  },

  // ── MORTAR SHELLS ───────────────────────────────────────────
  {
    id: 9, name: "CAL 60MM HE M73", calibre: "60mm", category: "Mortar Shells", type: "HE Mortar",
    desc: "60mm High Explosive mortar bomb M73. Lightweight, man-portable indirect fire support for light infantry. Reliable fuzing and fragmentation performance.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=143,h=351,fit=crop/mePLErEQM3S6lbg2/beluga---product-catalogue-17-mp47q2jw87fdmee9-A85pGK0yXpIvNG2w.png",
    tags: ["HE", "60mm", "Infantry"]
  },
  {
    id: 10, name: "CAL 82MM HE M71", calibre: "82mm", category: "Mortar Shells", type: "HE Mortar",
    desc: "82mm High Explosive mortar bomb M71. Compatible with Soviet-pattern 82mm mortar systems. High fragmentation yield and reliable all-weather fuzing.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=278,h=349,fit=crop/mePLErEQM3S6lbg2/10---82-mm-he-mortar-bomb-m71-small-m5k2bmoqdqspjvvk-AzGrPwVELqcDrNBg.png",
    tags: ["HE", "82mm", "Soviet-pattern"]
  },
  {
    id: 11, name: "CAL 120MM HE M62 P3", calibre: "120mm", category: "Mortar Shells", type: "HE Mortar",
    desc: "120mm Heavy mortar bomb HE M62 P3. Maximum indirect fire lethality for heavy mortar platforms. Extended range, high-explosive payload with multi-option fuze.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=400,h=500,fit=crop/mePLErEQM3S6lbg2/6049c5e0-2b58-412e-9c3a-e7c9b1c6c6ed-awvjkdvoxbtlnm87-ALpJMkr0JjUjeZPJ.png",
    tags: ["HE", "120mm", "Heavy"]
  },

  // ── ARTILLERY AMMUNITION ────────────────────────────────────
  {
    id: 12, name: "CAL 122MM HE TF-462", calibre: "122mm", category: "Artillery Ammunition", type: "HE Artillery",
    desc: "122mm High Explosive artillery round TF-462 for D-30 howitzers and BM-21 MLRS. Widely fielded across the Middle East, Africa, and Eastern Europe. Time fuze variant.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=256,h=321,fit=crop/mePLErEQM3S6lbg2/04---122-mm-he-tf-462-small-yrd6nwzq6gc4zwko-AQEJBOQvJKs3NVvV.png",
    tags: ["HE", "122mm", "Howitzer"]
  },
  {
    id: 13, name: "CAL 152MM HE M71", calibre: "152mm", category: "Artillery Ammunition", type: "HE Artillery",
    desc: "152mm High Explosive artillery shell M71 for Soviet/Russian D-20 and 2S3 Akatsiya self-propelled howitzers. Heavy fire support with large fragmentation radius.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=256,h=321,fit=crop/mePLErEQM3S6lbg2/07---152-mm-he-m107-small-3-ykbar315zksewjeb-mP4p1awLO2FnGN8p.png",
    tags: ["HE", "152mm", "SPH"]
  },
  {
    id: 14, name: "CAL 155MM HE M107", calibre: "155mm", category: "Artillery Ammunition", type: "HE Artillery",
    desc: "155mm NATO-standard High Explosive artillery projectile M107. Compatible with M109 Paladin, M198, M777, and all NATO 155mm artillery systems. Standard NATO stock number.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=352,h=440,fit=crop/mePLErEQM3S6lbg2/07---155-mm-he-m107-small-d953g1wwbdfempkz-Aq2Bw31XGecDG78x.png",
    tags: ["HE", "155mm", "NATO", "M109"]
  },

  // ── AMMO GRENADES ────────────────────────────────────────────
  {
    id: 15, name: "CAL 40×46MM HE M6P", calibre: "40×46mm", category: "Ammo Grenades", type: "Grenade",
    desc: "40×46mm Low-velocity High Explosive grenade round M6P. Designed for single-shot and rotary grenade launchers such as the M79 and M203. Effective area burst fragmentation.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=271,h=288,fit=crop,trim=51.73891625615764;344.0416666666667;61.320197044334975;17.25/mePLErEQM3S6lbg2/beluga---product-catalogue-7-aq26oeme1vspdekp-A0xNG5EMWKhe0P1D.png",
    tags: ["HE", "40mm", "Grenade Launcher"]
  },
  {
    id: 16, name: "CAL 40×53MM HE M9", calibre: "40×53mm", category: "Ammo Grenades", type: "Grenade",
    desc: "40×53mm High-velocity High Explosive grenade round M9. For automatic grenade launchers including Mk 19 and HK GMG. High rate of fire capability with consistent performance.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=307,h=359,fit=crop,trim=21.302380952380954;43.497764530551414;35.195238095238096;293.3785394932936/mePLErEQM3S6lbg2/beluga---product-catalogue-7-aq26oeme1vspdekp-A0xNG5EMWKhe0P1D.png",
    tags: ["HE", "40mm", "Auto Grenade Launcher"]
  },

  // ── MORTARS ──────────────────────────────────────────────────
  {
    id: 17, name: "60MM MORTAR M57", calibre: "60mm", category: "Mortars", type: "Mortar System",
    desc: "60mm light infantry mortar M57. Compact, man-portable system ideal for platoon-level fire support. Simple operation with high rate of fire and minimal crew requirement.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=330,h=315,fit=crop/mePLErEQM3S6lbg2/60mm-m7-mp86qrzxxrtpeqle-Aq2BgzbZWDFpnGaX.png",
    tags: ["60mm", "Light", "Infantry"]
  },
  {
    id: 18, name: "81MM M69B / 82MM M69A", calibre: "81mm / 82mm", category: "Mortars", type: "Mortar System",
    desc: "Medium mortar system available in NATO 81mm (M69B) and Soviet-pattern 82mm (M69A) variants. Company-level fire support with bipod, baseplate, and sight unit included.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=317,h=339,fit=crop/mePLErEQM3S6lbg2/81mm-m69b-ynqpp0jxvpuwjl5q-mePLq0EGWwt1OeVX.png",
    tags: ["81mm", "82mm", "Medium", "NATO / Soviet"]
  },
  {
    id: 19, name: "60MM M70 COMMANDO", calibre: "60mm", category: "Mortars", type: "Mortar System",
    desc: "60mm Commando mortar M70. Ultralight variant for special operations and commando units. Fired from the hand without a baseplate for rapid deployment in confined terrain.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=252,h=349,fit=crop/mePLErEQM3S6lbg2/bulkwark-commando-ar07mrr6j3fjyevq-mv0jr9wbLZFVxNkj.png",
    tags: ["60mm", "Commando", "Special Operations"]
  },
  {
    id: 20, name: "120MM M74 / M75", calibre: "120mm", category: "Mortars", type: "Mortar System",
    desc: "120mm heavy mortar system M74/M75. Provides battalion-level heavy fire support with long range and large HE payload. Towed or vehicle-mounted configurations available.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=297,h=372,fit=crop/mePLErEQM3S6lbg2/120mm-m74-m2wlazv7vmhneegd-A85pQkQpzMhLQgxp.png",
    tags: ["120mm", "Heavy", "Battalion Support"]
  },

  // ── ROCKETS & COMPONENTS ─────────────────────────────────────
  {
    id: 21, name: "122MM ROCKET", calibre: "122mm", category: "Rockets & Components", type: "Rocket",
    desc: "122mm unguided artillery rocket for BM-21 Grad and compatible MLRS platforms. High explosive warhead with extended range for deep fire support missions.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=256,h=399,fit=crop/mePLErEQM3S6lbg2/122-mm-rocket-m7vm5o2omjhl7wxn-ALpJyDalZgFeWK4V.png",
    tags: ["122mm", "MLRS", "BM-21"]
  },
  {
    id: 22, name: "122MM ROCKET COMPONENTS", calibre: "122mm", category: "Rockets & Components", type: "Components",
    desc: "Sub-components and spare parts for 122mm rocket systems. Includes warheads, propellant charges, fuzes, and tail assemblies. Available individually or as complete assembly kits.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=107,h=498,fit=crop/mePLErEQM3S6lbg2/beluga---product-catalogue-20-mp472g7gqrfbvwg3-AR0J8nRqeBFNeNMx.png",
    tags: ["122mm", "Components", "Spare Parts"]
  },

  // ── FUZES & COMPONENTS ───────────────────────────────────────
  {
    id: 23, name: "UTU M78 (AU 29)", calibre: "Multi", category: "Fuzes & Components", type: "Fuze",
    desc: "Point-detonating fuze UTU M78 / AU 29. Instantaneous or delay action. Compatible with a range of artillery and mortar projectiles. High reliability under operational conditions.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=259,h=317,fit=crop/mePLErEQM3S6lbg2/utu-m78-yle6qjbpjeizxbep-m6LvQqznnLFov25o.png",
    tags: ["Fuze", "Point-Detonating", "Artillery"]
  },
  {
    id: 24, name: "UTU M68 P1", calibre: "Multi", category: "Fuzes & Components", type: "Fuze",
    desc: "Point-detonating fuze UTU M68 P1 with superquick and delay modes. Designed for mortar bombs and artillery shells. Robust construction for all-weather reliability.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=252,h=314,fit=crop/mePLErEQM3S6lbg2/utm6-81-a3qpoedn1otnrkbp-A85pQqNMqki8aZOB.png",
    tags: ["Fuze", "Point-Detonating", "Mortar"]
  },
  {
    id: 25, name: "AU 32", calibre: "Multi", category: "Fuzes & Components", type: "Fuze",
    desc: "Time and superquick fuze AU 32. Mechanical time setting for airburst and ground burst modes. Suitable for artillery shells requiring variable detonation timing.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=237,h=365,fit=crop/mePLErEQM3S6lbg2/au-32-a3qpoek9dxuzvqvg-YBgp9LqwR6FXPqrL.png",
    tags: ["Fuze", "Time Fuze", "Airburst"]
  },
  {
    id: 26, name: "AU-62", calibre: "Multi", category: "Fuzes & Components", type: "Fuze",
    desc: "Point-detonating and delay fuze AU-62. Used with medium and large calibre artillery projectiles. Dual-mode operation for use against hardened and soft targets.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=273,h=394,fit=crop/mePLErEQM3S6lbg2/au62-1-mp472gew8ntr30xv-mP4plwDRnxsLaOr3.png",
    tags: ["Fuze", "Delay", "Artillery"]
  },
  {
    id: 27, name: "COMPONENTS", calibre: "Multi", category: "Fuzes & Components", type: "Components",
    desc: "Fuze sub-components and assembly parts compatible with a range of artillery and mortar systems. Includes springs, detonators, booster cups, and housing assemblies for maintenance and overhaul.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=328,h=402,fit=crop/mePLErEQM3S6lbg2/bulwark-fuze-ykbae4y6vvizw27l-dJoJQEqg42fR2Zpz.png",
    tags: ["Fuze", "Electronic", "Mortar"]
  },

  // ── AMMO BOXES & TUBES ───────────────────────────────────────
  {
    id: 28, name: "120MM MORTAR SHELL BOX", calibre: "120mm", category: "Ammo Boxes & Tubes", type: "Storage",
    desc: "Ammunition storage and transport box for 120mm mortar shells. Sealed construction for environmental protection during storage and transit. Stackable for efficient logistics.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=400,h=291,fit=crop/mePLErEQM3S6lbg2/beluga---product-catalogue-21-aq26qeyegkulj41o-AwvrgEgZkNIllRqw.png",
    tags: ["120mm", "Storage", "Packaging"]
  },
  {
    id: 29, name: "122MM GRAD ROCKET BOX", calibre: "122mm", category: "Ammo Boxes & Tubes", type: "Storage",
    desc: "Ammunition transport crate for 122mm BM-21 Grad rockets. Robust wooden and metal construction. Designed to hold two rockets with protective padding and securing hardware.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=286,h=300,fit=crop/mePLErEQM3S6lbg2/beluga---product-catalogue-23-mp86q5egpgu4n3gz-mk3Dg2gzo6hq0KeP.png",
    tags: ["122mm", "Rocket", "Storage"]
  },
  {
    id: 30, name: "120MM MORTAR SHELL TUBE", calibre: "120mm", category: "Ammo Boxes & Tubes", type: "Storage",
    desc: "Plastic transport tube for individual 120mm mortar shells. Lightweight, weatherproof, and pressure-sealed. Ideal for forward deployment and rapid individual round distribution.",
    img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=153,h=472,fit=crop/mePLErEQM3S6lbg2/beluga---product-catalogue-24-awvjdnloknikj6lm-AE0pQ5wz7JFXD7Dm.png",
    tags: ["120mm", "Tube", "Packaging"]
  },

  // ── ARMORED VEHICLES ─────────────────────────────────────────
  {
    id: 40, name: "VIHOR", calibre: "Light Tactical", category: "Armored Vehicles", type: "Vehicle 4×4 LTV",
    desc: "VIHOR is a highly mobile 4×4 light armored tactical vehicle with a modular chassis designed for all-terrain manoeuvrability and survivability. Crew: 2+3. Max weight: 8t. Top speed: 120+ km/h. STANAG 4569 Level 2 ballistic protection, blast/mine protection levels 2a/2b, and EN 1522 FB6. 6-speed automatic transmission with two-speed transfer case. Missions: patrol, reconnaissance, special operations, COIN, border control, and rapid response.",
    img: "/vihor.jpg",
    url: "https://trb.ba/en/portfolio/vihor/",
    tags: ["LTV", "4x4", "STANAG", "Armored", "Tactical", "Special Ops"]
  },
  {
    id: 35, name: "DESPOT", calibre: "Multi-Purpose", category: "Armored Vehicles", type: "Vehicle 4×4 APC",
    desc: "DESPOT is a multi-purpose 4×4 armored personnel carrier. Crew of 9, max weight 14t, top speed 120+ km/h. STANAG 4569 Level 2 ballistic protection and Level 2a/2b blast/mine protection (Level 3 optional). 240 kW automatic transmission. Missions: patrol, reconnaissance, command & control, special operations, COIN, anti-terrorism, border control, and MEDEVAC. Supports manned ring-mount or RCWS weapon stations.",
    img: "/despot.png",
    url: "https://trb.ba/en/portfolio/despot/",
    tags: ["APC", "4x4", "STANAG", "Armored", "RCWS", "Special Ops"]
  },
]

export const CATEGORIES = [
  "AI Systems",
  "Standard Ammunition",
  "Non-Standard Ammunition",
  "Mortar Shells",
  "Artillery Ammunition",
  "Ammo Grenades",
  "Mortars",
  "Rockets & Components",
  "Fuzes & Components",
  "Ammo Boxes & Tubes",
  "Rifles",
  "Pistols",
  "Armored Vehicles",
]
