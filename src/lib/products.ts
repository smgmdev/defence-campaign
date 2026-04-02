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
    img: "/products/arcana-precision.png",
    url: "https://arcanamace.com/arcana-precision",
    tags: ["AI", "Precision", "Targeting", "Autonomous"]
  },

  // ── STANDARD AMMUNITION ──────────────────────────────────────
  {
    id: 1, name: "CAL 9×19MM", calibre: "9×19mm", category: "Standard Ammunition", type: "Handgun",
    desc: "NATO-standard 9mm Parabellum pistol round. Widely used by military, police, and security forces globally. Available in FMJ, HP, and tracer variants.",
    img: "/products/cal-9x19mm.png",
    tags: ["NATO", "Pistol", "FMJ"]
  },
  {
    id: 2, name: "CAL 5.56×45MM", calibre: "5.56×45mm", category: "Standard Ammunition", type: "Rifle",
    desc: "NATO standard intermediate rifle cartridge. Optimised for assault rifles including M16, M4, and STANAG-compatible platforms. Available in SS109/M855 ball and tracer.",
    img: "/products/cal-5.56x45mm.png",
    tags: ["NATO", "Rifle", "STANAG"]
  },
  {
    id: 3, name: "CAL 7.62×51MM", calibre: "7.62×51mm", category: "Standard Ammunition", type: "Rifle / MG",
    desc: "NATO standard rifle and machine gun cartridge. Used in FN MAG, M60, M240, and precision rifles. High reliability and terminal performance.",
    img: "/products/cal-7.62x51mm.png",
    tags: ["NATO", "Rifle", "MG"]
  },
  {
    id: 4, name: "CAL 7.62×63MM", calibre: "7.62×63mm", category: "Standard Ammunition", type: "Rifle",
    desc: ".30-06 Springfield round with proven combat heritage. Available for M1 Garand, M1919, and legacy platforms requiring this calibre.",
    img: "/products/cal-7.62x63mm.png",
    tags: ["Rifle", "Legacy"]
  },
  {
    id: 5, name: "CAL 7.9×57MM", calibre: "7.9×57mm", category: "Standard Ammunition", type: "Rifle",
    desc: "8mm Mauser — widely fielded in legacy weapon systems across the Middle East and Africa. Available in ball and AP configurations.",
    img: "/products/cal-7.9x57mm.png",
    tags: ["Rifle", "Legacy", "AP"]
  },
  {
    id: 6, name: "CAL 12.7×99MM", calibre: "12.7×99mm", category: "Standard Ammunition", type: "Heavy MG",
    desc: ".50 BMG — NATO heavy machine gun and anti-materiel round for M2HB, M107, and other heavy platforms. Ball, AP, and API variants available.",
    img: "/products/cal-12.7x99mm.png",
    tags: ["NATO", "Heavy MG", "API"]
  },

  // ── NON-STANDARD AMMUNITION ─────────────────────────────────
  {
    id: 7, name: "CAL 7.62×54R", calibre: "7.62×54R", category: "Non-Standard Ammunition", type: "Rifle / MG",
    desc: "Russian rimmed cartridge for PKM, SVD Dragunov, and Mosin-Nagant platforms. Extensive stockpiles available. Ball, PS, and armour-piercing variants.",
    img: "/products/cal-7.62x54r.png",
    tags: ["Russian", "Rifle", "MG"]
  },
  {
    id: 31, name: "CAL 82MM HE M71", calibre: "82mm", category: "Non-Standard Ammunition", type: "HE Mortar",
    desc: "82mm High Explosive mortar bomb M71 listed under non-standard supply. Compatible with Soviet-pattern 82mm mortar systems. Available through non-NATO procurement channels with full compliance documentation.",
    img: "/products/cal-82mm-he-m71-ns.png",
    tags: ["HE", "82mm", "Soviet-pattern", "Non-Standard"]
  },
  {
    id: 8, name: "CAL 12.7×108MM", calibre: "12.7×108mm", category: "Non-Standard Ammunition", type: "Heavy MG",
    desc: "Soviet/Russian heavy machine gun round for DShK, NSV, and Kord platforms. High-penetration API and HEI variants available for anti-materiel use.",
    img: "/products/cal-12.7x108mm.png",
    tags: ["Russian", "Heavy MG", "API"]
  },

  // ── RIFLES ───────────────────────────────────────────────────
  {
    id: 33, name: "AK-47 ASSAULT RIFLE", calibre: "7.62×39mm", category: "Rifles", type: "Assault Rifle",
    desc: "Kalashnikov AK-47 assault rifle, cal. 7.62×39mm. Wooden stock, MD 1963 configuration. Supplied with 2×30 round magazines, cleaning rod, sling, and cleaning kit. One of the most widely fielded infantry rifles globally, known for reliability in extreme conditions.",
    img: "/products/ak47.png",
    tags: ["AK-47", "Kalashnikov", "Assault Rifle", "7.62×39mm"]
  },
  {
    id: 34, name: "PSL MACHINE GUN", calibre: "7.62×54R", category: "Rifles", type: "Designated Marksman Rifle",
    desc: "Romanian PSL (Puşcă Semiautomată cu Luneta) cal. 7.62×54R. Supplied with optical scope, 2×10 round magazines, cleaning rod, sling, and cleaning kit. Semi-automatic designated marksman rifle effective to 800m. Compatible with Soviet 7.62×54R ammunition.",
    img: "/products/psl-dragunov.png",
    tags: ["PSL", "DMR", "7.62×54R", "Scoped"]
  },

  // ── PISTOLS ───────────────────────────────────────────────────
  {
    id: 36, name: "RS9 VAMPIR – BLACK", calibre: "9×19mm PARA", category: "Pistols", type: "Semi-Auto Pistol",
    desc: "RS9 Vampir semi-automatic pistol in black ceramic finish. Full metal construction with chrome-molybdenum steel barrel and aluminium alloy frame. Used by special operations units since 2020. Barrel: 108mm. Weight: 820g. Magazine: 18 rounds. Overall length: 190.5mm. Effective range: 50m. Decocker and firing pin block safety.",
    img: "/products/rs9-vampir-black.png",
    url: "https://rs9vampir.ba",
    tags: ["9mm", "Pistol", "Semi-Auto", "Black", "Special Ops"]
  },
  {
    id: 38, name: "RS9 VAMPIR – DESERT", calibre: "9×19mm PARA", category: "Pistols", type: "Semi-Auto Pistol",
    desc: "RS9 Vampir semi-automatic pistol in desert sand finish. Full metal construction with chrome-molybdenum steel barrel and aluminium alloy frame. Used by special operations units since 2020. Barrel: 108mm. Weight: 820g. Magazine: 18 rounds. Overall length: 190.5mm. Effective range: 50m. Decocker and firing pin block safety.",
    img: "/products/rs9-vampir-sand.png",
    url: "https://rs9vampir.ba",
    tags: ["9mm", "Pistol", "Semi-Auto", "Desert", "Special Ops"]
  },
  {
    id: 39, name: "RS9 VAMPIR – GREEN", calibre: "9×19mm PARA", category: "Pistols", type: "Semi-Auto Pistol",
    desc: "RS9 Vampir semi-automatic pistol in green finish. Full metal construction with chrome-molybdenum steel barrel and aluminium alloy frame. Used by special operations units since 2020. Barrel: 108mm. Weight: 820g. Magazine: 18 rounds. Overall length: 190.5mm. Effective range: 50m. Decocker and firing pin block safety.",
    img: "/products/rs9-vampir-green.png",
    url: "https://rs9vampir.ba",
    tags: ["9mm", "Pistol", "Semi-Auto", "Green", "Special Ops"]
  },
  {
    id: 37, name: "RS9 VAMPIR LUX", calibre: "9×19mm PARA", category: "Pistols", type: "Semi-Auto Pistol",
    desc: "Premium variant of the RS9 Vampir semi-automatic pistol. Features aluminium alloy grips with gold engravings and TRB medallion. Picatinny MIL-STD-1913 rail, ambidextrous magazine release, decocker and firing pin safety. Barrel: 108mm. Weight: 820g (unloaded). Magazine: 18 rounds. Overall length: 190.5mm. Effective range: 50m. Full metal construction.",
    img: "/products/rs9-vampir-lux.png",
    url: "https://rs9vampir.ba",
    tags: ["9mm", "Pistol", "Semi-Auto", "LUX", "Picatinny", "Premium"]
  },

  // ── MORTAR SHELLS ───────────────────────────────────────────
  {
    id: 9, name: "CAL 60MM HE M73", calibre: "60mm", category: "Mortar Shells", type: "HE Mortar",
    desc: "60mm High Explosive mortar bomb M73. Lightweight, man-portable indirect fire support for light infantry. Reliable fuzing and fragmentation performance.",
    img: "/products/cal-60mm-he-m73.png",
    tags: ["HE", "60mm", "Infantry"]
  },
  {
    id: 10, name: "CAL 82MM HE M71", calibre: "82mm", category: "Mortar Shells", type: "HE Mortar",
    desc: "82mm High Explosive mortar bomb M71. Compatible with Soviet-pattern 82mm mortar systems. High fragmentation yield and reliable all-weather fuzing.",
    img: "/products/cal-82mm-he-m71.png",
    tags: ["HE", "82mm", "Soviet-pattern"]
  },
  {
    id: 11, name: "CAL 120MM HE M62 P3", calibre: "120mm", category: "Mortar Shells", type: "HE Mortar",
    desc: "120mm Heavy mortar bomb HE M62 P3. Maximum indirect fire lethality for heavy mortar platforms. Extended range, high-explosive payload with multi-option fuze.",
    img: "/products/cal-120mm-he-m62.png",
    tags: ["HE", "120mm", "Heavy"]
  },

  // ── ARTILLERY AMMUNITION ────────────────────────────────────
  {
    id: 12, name: "CAL 122MM HE TF-462", calibre: "122mm", category: "Artillery Ammunition", type: "HE Artillery",
    desc: "122mm High Explosive artillery round TF-462 for D-30 howitzers and BM-21 MLRS. Widely fielded across the Middle East, Africa, and Eastern Europe. Time fuze variant.",
    img: "/products/cal-122mm-he-tf462.png",
    tags: ["HE", "122mm", "Howitzer"]
  },
  {
    id: 13, name: "CAL 152MM HE M71", calibre: "152mm", category: "Artillery Ammunition", type: "HE Artillery",
    desc: "152mm High Explosive artillery shell M71 for Soviet/Russian D-20 and 2S3 Akatsiya self-propelled howitzers. Heavy fire support with large fragmentation radius.",
    img: "/products/cal-152mm-he-m71.png",
    tags: ["HE", "152mm", "SPH"]
  },
  {
    id: 14, name: "CAL 155MM HE M107", calibre: "155mm", category: "Artillery Ammunition", type: "HE Artillery",
    desc: "155mm NATO-standard High Explosive artillery projectile M107. Compatible with M109 Paladin, M198, M777, and all NATO 155mm artillery systems. Standard NATO stock number.",
    img: "/products/cal-155mm-he-m107.png",
    tags: ["HE", "155mm", "NATO", "M109"]
  },

  // ── AMMO GRENADES ────────────────────────────────────────────
  {
    id: 15, name: "CAL 40×46MM HE M6P", calibre: "40×46mm", category: "Ammo Grenades", type: "Grenade",
    desc: "40×46mm Low-velocity High Explosive grenade round M6P. Designed for single-shot and rotary grenade launchers such as the M79 and M203. Effective area burst fragmentation.",
    img: "/products/cal-40x46mm-he-m6p.png",
    tags: ["HE", "40mm", "Grenade Launcher"]
  },
  {
    id: 16, name: "CAL 40×53MM HE M9", calibre: "40×53mm", category: "Ammo Grenades", type: "Grenade",
    desc: "40×53mm High-velocity High Explosive grenade round M9. For automatic grenade launchers including Mk 19 and HK GMG. High rate of fire capability with consistent performance.",
    img: "/products/cal-40x53mm-he-m9.png",
    tags: ["HE", "40mm", "Auto Grenade Launcher"]
  },

  // ── MORTARS ──────────────────────────────────────────────────
  {
    id: 17, name: "60MM MORTAR M57", calibre: "60mm", category: "Mortars", type: "Mortar System",
    desc: "60mm light infantry mortar M57. Compact, man-portable system ideal for platoon-level fire support. Simple operation with high rate of fire and minimal crew requirement.",
    img: "/products/mortar-60mm-m57.png",
    tags: ["60mm", "Light", "Infantry"]
  },
  {
    id: 18, name: "81MM M69B / 82MM M69A", calibre: "81mm / 82mm", category: "Mortars", type: "Mortar System",
    desc: "Medium mortar system available in NATO 81mm (M69B) and Soviet-pattern 82mm (M69A) variants. Company-level fire support with bipod, baseplate, and sight unit included.",
    img: "/products/mortar-81mm-m69b.png",
    tags: ["81mm", "82mm", "Medium", "NATO / Soviet"]
  },
  {
    id: 19, name: "60MM M70 COMMANDO", calibre: "60mm", category: "Mortars", type: "Mortar System",
    desc: "60mm Commando mortar M70. Ultralight variant for special operations and commando units. Fired from the hand without a baseplate for rapid deployment in confined terrain.",
    img: "/products/mortar-60mm-m70-commando.png",
    tags: ["60mm", "Commando", "Special Operations"]
  },
  {
    id: 20, name: "120MM M74 / M75", calibre: "120mm", category: "Mortars", type: "Mortar System",
    desc: "120mm heavy mortar system M74/M75. Provides battalion-level heavy fire support with long range and large HE payload. Towed or vehicle-mounted configurations available.",
    img: "/products/mortar-120mm-m74.png",
    tags: ["120mm", "Heavy", "Battalion Support"]
  },

  // ── ROCKETS & COMPONENTS ─────────────────────────────────────
  {
    id: 21, name: "122MM ROCKET", calibre: "122mm", category: "Rockets & Components", type: "Rocket",
    desc: "122mm unguided artillery rocket for BM-21 Grad and compatible MLRS platforms. High explosive warhead with extended range for deep fire support missions.",
    img: "/products/rocket-122mm.png",
    tags: ["122mm", "MLRS", "BM-21"]
  },
  {
    id: 22, name: "122MM ROCKET COMPONENTS", calibre: "122mm", category: "Rockets & Components", type: "Components",
    desc: "Sub-components and spare parts for 122mm rocket systems. Includes warheads, propellant charges, fuzes, and tail assemblies. Available individually or as complete assembly kits.",
    img: "/products/rocket-122mm-components.png",
    tags: ["122mm", "Components", "Spare Parts"]
  },

  // ── FUZES & COMPONENTS ───────────────────────────────────────
  {
    id: 23, name: "UTU M78 (AU 29)", calibre: "Multi", category: "Fuzes & Components", type: "Fuze",
    desc: "Point-detonating fuze UTU M78 / AU 29. Instantaneous or delay action. Compatible with a range of artillery and mortar projectiles. High reliability under operational conditions.",
    img: "/products/fuze-utu-m78.png",
    tags: ["Fuze", "Point-Detonating", "Artillery"]
  },
  {
    id: 24, name: "UTU M68 P1", calibre: "Multi", category: "Fuzes & Components", type: "Fuze",
    desc: "Point-detonating fuze UTU M68 P1 with superquick and delay modes. Designed for mortar bombs and artillery shells. Robust construction for all-weather reliability.",
    img: "/products/fuze-utu-m68.png",
    tags: ["Fuze", "Point-Detonating", "Mortar"]
  },
  {
    id: 25, name: "AU 32", calibre: "Multi", category: "Fuzes & Components", type: "Fuze",
    desc: "Time and superquick fuze AU 32. Mechanical time setting for airburst and ground burst modes. Suitable for artillery shells requiring variable detonation timing.",
    img: "/products/fuze-au32.png",
    tags: ["Fuze", "Time Fuze", "Airburst"]
  },
  {
    id: 26, name: "AU-62", calibre: "Multi", category: "Fuzes & Components", type: "Fuze",
    desc: "Point-detonating and delay fuze AU-62. Used with medium and large calibre artillery projectiles. Dual-mode operation for use against hardened and soft targets.",
    img: "/products/fuze-au62.png",
    tags: ["Fuze", "Delay", "Artillery"]
  },
  {
    id: 27, name: "COMPONENTS", calibre: "Multi", category: "Fuzes & Components", type: "Components",
    desc: "Fuze sub-components and assembly parts compatible with a range of artillery and mortar systems. Includes springs, detonators, booster cups, and housing assemblies for maintenance and overhaul.",
    img: "/products/fuze-components.png",
    tags: ["Fuze", "Electronic", "Mortar"]
  },

  // ── AMMO BOXES & TUBES ───────────────────────────────────────
  {
    id: 28, name: "120MM MORTAR SHELL BOX", calibre: "120mm", category: "Ammo Boxes & Tubes", type: "Storage",
    desc: "Ammunition storage and transport box for 120mm mortar shells. Sealed construction for environmental protection during storage and transit. Stackable for efficient logistics.",
    img: "/products/box-120mm-mortar.png",
    tags: ["120mm", "Storage", "Packaging"]
  },
  {
    id: 29, name: "122MM GRAD ROCKET BOX", calibre: "122mm", category: "Ammo Boxes & Tubes", type: "Storage",
    desc: "Ammunition transport crate for 122mm BM-21 Grad rockets. Robust wooden and metal construction. Designed to hold two rockets with protective padding and securing hardware.",
    img: "/products/box-122mm-grad.png",
    tags: ["122mm", "Rocket", "Storage"]
  },
  {
    id: 30, name: "120MM MORTAR SHELL TUBE", calibre: "120mm", category: "Ammo Boxes & Tubes", type: "Storage",
    desc: "Plastic transport tube for individual 120mm mortar shells. Lightweight, weatherproof, and pressure-sealed. Ideal for forward deployment and rapid individual round distribution.",
    img: "/products/tube-120mm-mortar.png",
    tags: ["120mm", "Tube", "Packaging"]
  },

  // ── ARMORED VEHICLES ─────────────────────────────────────────
  // ── DRONE INTERCEPTOR ────────────────────────────────────────
  {
    id: 41, name: "Counter-UAV AI Destroyer", calibre: "AI Autonomous", category: "Drone Interceptor", type: "Counter-UAV System",
    desc: "Autonomous counter-drone interceptor reaching 360+ km/h with a 10km operational radius. AI guidance delivers pixel-level tracking with ≥90% recognition rate. X-band radar detects threats at ≥12km. Dual IR/visible EO sensors with laser ranging. Fully AI autonomous control, operable from -20°C to +60°C.",
    img: "/droneinterceptor.png",
    tags: ["Counter-UAV", "AI", "Autonomous", "C-UAS", "Anti-Drone"]
  },

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
  "Drone Interceptor",
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
