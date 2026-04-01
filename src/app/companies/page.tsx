'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'

type Lead = { id: number; name: string; category: string; size: string; contact: string; location: string; region: string }

const LEADS: Lead[] = [
  {id:1,  name:"Chase Tactical",           category:"Protective Equipment", size:"Small",    contact:"info@chasetactical.com",           location:"USA",                region:"North America"},
  {id:2,  name:"Hard Head Veterans",        category:"Protective Equipment", size:"Small",    contact:"support@hardheadveterans.com",     location:"Sweetwater, TX",     region:"North America"},
  {id:3,  name:"Hardwire LLC",              category:"Protective Equipment", size:"SME",      contact:"info@hardwirellc.com",             location:"Pocomoke City, MD",  region:"North America"},
  {id:4,  name:"Sarkar Tactical",           category:"Protective Equipment", size:"SME",      contact:"contact@sarkartactical.com",       location:"El Paso, TX",        region:"North America"},
  {id:5,  name:"RMA Armament",              category:"Protective Equipment", size:"Small",    contact:"info@rmadefense.com",              location:"Centerville, IA",    region:"North America"},
  {id:6,  name:"Armor Express",             category:"Protective Equipment", size:"SME",      contact:"info@armorexpress.com",            location:"Eden, NC",           region:"North America"},
  {id:7,  name:"Team Wendy",                category:"Protective Equipment", size:"SME",      contact:"info@teamwendy.com",               location:"Cleveland, OH",      region:"North America"},
  {id:8,  name:"Gentex Corporation",        category:"Protective Equipment", size:"Mid-size", contact:"defense@gentexcorp.com",           location:"Carbondale, PA",     region:"North America"},
  {id:9,  name:"Point Blank Enterprises",   category:"Protective Equipment", size:"Mid-size", contact:"info@pointblankenterprises.com",   location:"Pompano Beach, FL",  region:"North America"},
  {id:10, name:"Revision Military",         category:"Protective Equipment", size:"SME",      contact:"info@revisionmilitary.com",        location:"Essex Junction, VT", region:"North America"},
  {id:11, name:"United Shield Intl.",       category:"Protective Equipment", size:"SME",      contact:"info@unitedshield.com",            location:"Whitman, MA",        region:"North America"},
  {id:12, name:"Eagle Industries",          category:"Protective Equipment", size:"SME",      contact:"sales@eagleindustries.com",        location:"Fenton, MO",         region:"North America"},
  {id:13, name:"Atomic Defense",            category:"Protective Equipment", size:"Small",    contact:"support@atomicdefense.com",        location:"USA",                region:"North America"},
  {id:14, name:"Premier Body Armor",        category:"Protective Equipment", size:"Small",    contact:"info@premierbodyarmor.com",        location:"USA",                region:"North America"},
  {id:15, name:"Avon Protection",           category:"Protective Equipment", size:"Mid-size", contact:"defense@avon-protection.com",      location:"Cadillac, MI",       region:"North America"},
  {id:16, name:"Crye Precision",            category:"Military Uniforms",    size:"Small",    contact:"info@cryeprecision.com",           location:"Brooklyn, NY",       region:"North America"},
  {id:17, name:"Bluewater Defense",         category:"Military Uniforms",    size:"Small",    contact:"info@bluewaterdefense.com",        location:"USA",                region:"North America"},
  {id:18, name:"Condor Outdoor Products",   category:"Military Uniforms",    size:"SME",      contact:"info@condoroutdoor.com",           location:"Irwindale, CA",      region:"North America"},
  {id:19, name:"Massif",                    category:"Military Uniforms",    size:"Small",    contact:"sales@massif.com",                 location:"Ashland, OR",        region:"North America"},
  {id:20, name:"Propper International",     category:"Military Uniforms",    size:"Mid-size", contact:"government@propper.com",           location:"St. Charles, MO",    region:"North America"},
  {id:21, name:"Brookwood Companies",       category:"Military Uniforms",    size:"Mid-size", contact:"military@brookwoodcompanies.com",  location:"New York, NY",       region:"North America"},
  {id:22, name:"Rothco",                    category:"Military Uniforms",    size:"SME",      contact:"sales@rothco.com",                 location:"Ronkonkoma, NY",     region:"North America"},
  {id:23, name:"SNC Technical Services",    category:"Military Uniforms",    size:"Mid-size", contact:"info@snc.org",                     location:"Puerto Rico, USA",   region:"North America"},
  {id:24, name:"Milliken & Company",        category:"Military Uniforms",    size:"Large",    contact:"government@milliken.com",          location:"Spartanburg, SC",    region:"North America"},
  {id:25, name:"5.11 Tactical",             category:"Military Uniforms",    size:"Mid-size", contact:"customerservice@511tactical.com",  location:"Modesto, CA",        region:"North America"},
  {id:26, name:"Tru-Spec",                  category:"Military Uniforms",    size:"SME",      contact:"sales@tru-spec.com",               location:"Atlanta, GA",        region:"North America"},
  {id:27, name:"Beyond Clothing",           category:"Military Uniforms",    size:"Small",    contact:"info@beyondclothing.com",          location:"Seattle, WA",        region:"North America"},
  {id:28, name:"Viasat Inc.",               category:"Communications Gear",  size:"Mid-size", contact:"defense@viasat.com",               location:"Carlsbad, CA",       region:"North America"},
  {id:29, name:"Silvus Technologies",       category:"Communications Gear",  size:"SME",      contact:"info@silvustechnologies.com",      location:"Los Angeles, CA",    region:"North America"},
  {id:30, name:"Kratos Defense",            category:"Communications Gear",  size:"Mid-size", contact:"info@kratosdefense.com",           location:"San Diego, CA",      region:"North America"},
  {id:31, name:"Curtiss-Wright Defense",    category:"Communications Gear",  size:"Mid-size", contact:"defense@curtisswright.com",        location:"Davidson, NC",       region:"North America"},
  {id:32, name:"Thales Defense & Security", category:"Communications Gear",  size:"Mid-size", contact:"info@thalesdsi.com",               location:"Clarksburg, MD",     region:"North America"},
  {id:33, name:"Pacific Defense Solutions", category:"Communications Gear",  size:"SME",      contact:"info@pacificdefense.com",          location:"Honolulu, HI",       region:"North America"},
  {id:34, name:"Persistent Systems LLC",    category:"Communications Gear",  size:"SME",      contact:"info@persistentsystems.com",       location:"New York, NY",       region:"North America"},
  {id:35, name:"Leonardo DRS",              category:"Communications Gear",  size:"Mid-size", contact:"info@leonardodrs.com",             location:"Arlington, VA",      region:"North America"},
  {id:36, name:"Triad RF Systems",          category:"Communications Gear",  size:"Small",    contact:"sales@triadrfsystems.com",         location:"Woodbury, NJ",       region:"North America"},
  {id:37, name:"Barrett Communications",    category:"Communications Gear",  size:"SME",      contact:"sales@barrettcommunications.com",  location:"San Diego, CA",      region:"North America"},
  {id:38, name:"ADS Inc.",                  category:"Logistics & Supply",   size:"Mid-size", contact:"info@adsinc.com",                  location:"Virginia Beach, VA", region:"North America"},
  {id:39, name:"Darley Defense",            category:"Logistics & Supply",   size:"Mid-size", contact:"defense@darley.com",               location:"Itasca, IL",         region:"North America"},
  {id:40, name:"SupplyCore Inc.",           category:"Logistics & Supply",   size:"SME",      contact:"info@supplycore.com",              location:"Rockford, IL",       region:"North America"},
  {id:41, name:"Incredible Supply (ISL)",   category:"Logistics & Supply",   size:"SME",      contact:"info@incrediblesupply.com",        location:"USA",                region:"North America"},
  {id:42, name:"Greenwood Aerospace",       category:"Logistics & Supply",   size:"SME",      contact:"info@governmentprocurement.com",   location:"Ponca City, OK",     region:"North America"},
  {id:43, name:"Crane Worldwide Logistics", category:"Logistics & Supply",   size:"Mid-size", contact:"government@craneww.com",           location:"Houston, TX",        region:"North America"},
  {id:44, name:"KLX Defense Services",      category:"Logistics & Supply",   size:"Mid-size", contact:"defense@klxaerospace.com",         location:"Miami, FL",          region:"North America"},
  {id:45, name:"Federal Defense Inds",      category:"Logistics & Supply",   size:"SME",      contact:"info@fdi.us.com",                  location:"USA",                region:"North America"},
  {id:46, name:"M1 Support Services",       category:"Logistics & Supply",   size:"Mid-size", contact:"info@m1support.com",               location:"Denton, TX",         region:"North America"},
  {id:47, name:"Analytic Services Inc.",    category:"Logistics & Supply",   size:"Mid-size", contact:"info@anser.org",                   location:"Falls Church, VA",   region:"North America"},
  {id:48, name:"Atlantic Diving Supply",    category:"Logistics & Supply",   size:"Mid-size", contact:"info@adsinc.com",                  location:"Virginia Beach, VA", region:"North America"},
  {id:49, name:"Parsons Corporation",       category:"Logistics & Supply",   size:"Mid-size", contact:"defense@parsons.com",              location:"Centreville, VA",    region:"North America"},
  {id:50, name:"McKesson Corporation",      category:"Medical Supplies",     size:"Large",    contact:"government@mckesson.com",          location:"Irving, TX",         region:"North America"},
  {id:51, name:"Leidos Health",             category:"Medical Supplies",     size:"Large",    contact:"health@leidos.com",                location:"Reston, VA",         region:"North America"},
  {id:52, name:"Medline Industries",        category:"Medical Supplies",     size:"Large",    contact:"government@medline.com",           location:"Northfield, IL",     region:"North America"},
  {id:53, name:"Cardinal Health",           category:"Medical Supplies",     size:"Large",    contact:"government@cardinalhealth.com",    location:"Dublin, OH",         region:"North America"},
  {id:54, name:"North American Rescue",     category:"Medical Supplies",     size:"SME",      contact:"info@narescue.com",                location:"Greer, SC",          region:"North America"},
  {id:55, name:"Chinook Medical Gear",      category:"Medical Supplies",     size:"Small",    contact:"info@chinookmed.com",              location:"Durango, CO",        region:"North America"},
  {id:56, name:"Bound Tree Medical",        category:"Medical Supplies",     size:"SME",      contact:"info@boundtree.com",               location:"Dublin, OH",         region:"North America"},
  {id:57, name:"Oshkosh Defense",           category:"Military Vehicles",    size:"Large",    contact:"defense@oshkoshdefense.com",       location:"Oshkosh, WI",        region:"North America"},
  {id:58, name:"AM General",                category:"Military Vehicles",    size:"Mid-size", contact:"info@amgeneral.com",               location:"South Bend, IN",     region:"North America"},
  {id:59, name:"Flyer Defense LLC",         category:"Military Vehicles",    size:"SME",      contact:"info@flyerdefense.com",            location:"USA",                region:"North America"},
  {id:60, name:"American Rheinmetall",      category:"Military Vehicles",    size:"Mid-size", contact:"info@american.rheinmetall.com",    location:"Biddeford, ME",      region:"North America"},
  {id:61, name:"Navistar Defense",          category:"Military Vehicles",    size:"Mid-size", contact:"defense@navistar.com",             location:"Lisle, IL",          region:"North America"},
  {id:62, name:"HDT Global",                category:"Military Vehicles",    size:"SME",      contact:"info@hdtglobal.com",               location:"Solon, OH",          region:"North America"},
  {id:63, name:"Force Protection Inc.",     category:"Military Vehicles",    size:"SME",      contact:"info@forceprotection.net",         location:"Ladson, SC",         region:"North America"},
  {id:64, name:"Polaris Defense",           category:"Military Vehicles",    size:"Mid-size", contact:"defense@polaris.com",              location:"Medina, MN",         region:"North America"},
  {id:65, name:"Caterpillar Defense",       category:"Military Vehicles",    size:"Large",    contact:"government@cat.com",               location:"Deerfield, IL",      region:"North America"},
  {id:66, name:"ND Defense LLC",            category:"Military Vehicles",    size:"SME",      contact:"info@nddefense.com",               location:"USA",                region:"North America"},
  {id:67, name:"Indigen Armor",             category:"Military Vehicles",    size:"Small",    contact:"info@indigenarmor.com",            location:"USA",                region:"North America"},
  {id:68, name:"MARS Armor",                category:"Protective Equipment", size:"SME",      contact:"info@marsarmor.com",               location:"Czech Republic",     region:"Europe"},
  {id:69, name:"Protective Products Intl.", category:"Protective Equipment", size:"SME",      contact:"info@protectiveproducts.co.uk",    location:"UK",                 region:"Europe"},
  {id:70, name:"Safariland Europe",         category:"Protective Equipment", size:"Mid-size", contact:"europe@safariland.com",            location:"Germany",            region:"Europe"},
  {id:71, name:"Survitec Group",            category:"Protective Equipment", size:"Mid-size", contact:"defence@survitecgroup.com",        location:"UK",                 region:"Europe"},
  {id:72, name:"TenCate Protective Fabrics",category:"Protective Equipment", size:"Mid-size", contact:"info@tencateprotective.com",       location:"Netherlands",        region:"Europe"},
  {id:73, name:"Mehler Vario System",       category:"Protective Equipment", size:"SME",      contact:"info@mehler-vario-system.com",     location:"Germany",            region:"Europe"},
  {id:74, name:"Ballistic Body Armor",      category:"Protective Equipment", size:"Small",    contact:"sales@ballisticbodyarmor.eu",      location:"Poland",             region:"Europe"},
  {id:75, name:"SY Technology",             category:"Protective Equipment", size:"Small",    contact:"info@sytechnology.co.uk",          location:"UK",                 region:"Europe"},
  {id:76, name:"Progarm",                   category:"Protective Equipment", size:"SME",      contact:"sales@progarm.com",                location:"UK",                 region:"Europe"},
  {id:77, name:"Protective Helmets BV",     category:"Protective Equipment", size:"Small",    contact:"info@protectivehelmets.nl",        location:"Netherlands",        region:"Europe"},
  {id:78, name:"Lindberg & Sons",           category:"Military Uniforms",    size:"SME",      contact:"info@lindbergandsons.se",          location:"Sweden",             region:"Europe"},
  {id:79, name:"Carrington Textiles",       category:"Military Uniforms",    size:"Mid-size", contact:"defence@carrington.co.uk",         location:"UK",                 region:"Europe"},
  {id:80, name:"Helly Hansen Workwear",     category:"Military Uniforms",    size:"Mid-size", contact:"professional@hellyhansen.com",     location:"Norway",             region:"Europe"},
  {id:81, name:"Leo Köhler",                category:"Military Uniforms",    size:"SME",      contact:"info@leo-koehler.de",              location:"Germany",            region:"Europe"},
  {id:82, name:"Mil-Tec GmbH",              category:"Military Uniforms",    size:"SME",      contact:"info@mil-tec.com",                 location:"Germany",            region:"Europe"},
  {id:83, name:"Helikon-Tex",               category:"Military Uniforms",    size:"SME",      contact:"b2b@helikon-tex.com",              location:"Poland",             region:"Europe"},
  {id:84, name:"Uf Pro",                    category:"Military Uniforms",    size:"SME",      contact:"info@ufpro.com",                   location:"Slovenia",           region:"Europe"},
  {id:85, name:"Defcon 5",                  category:"Military Uniforms",    size:"SME",      contact:"info@defcon5.it",                  location:"Italy",              region:"Europe"},
  {id:86, name:"Niton GL",                  category:"Military Uniforms",    size:"Small",    contact:"sales@nitongl.com",                location:"UK",                 region:"Europe"},
  {id:87, name:"Texport",                   category:"Military Uniforms",    size:"SME",      contact:"office@texport.at",                location:"Austria",            region:"Europe"},
  {id:88, name:"Arktis",                    category:"Military Uniforms",    size:"Small",    contact:"sales@arktis.co.uk",               location:"UK",                 region:"Europe"},
  {id:89, name:"Combat Systems",            category:"Military Uniforms",    size:"SME",      contact:"info@combatsystems.pl",            location:"Poland",             region:"Europe"},
  {id:90, name:"Rohde & Schwarz",           category:"Communications Gear",  size:"Large",    contact:"defense@rohde-schwarz.com",        location:"Germany",            region:"Europe"},
  {id:91, name:"Frequentis",                category:"Communications Gear",  size:"Mid-size", contact:"defence@frequentis.com",           location:"Austria",            region:"Europe"},
  {id:92, name:"Cobham Advanced Electronics",category:"Communications Gear", size:"Mid-size", contact:"defence@cobham.com",               location:"UK",                 region:"Europe"},
  {id:93, name:"Elbit Systems Europe",      category:"Communications Gear",  size:"Mid-size", contact:"info@elbitsystems.co.uk",          location:"UK",                 region:"Europe"},
  {id:94, name:"ECA Group",                 category:"Communications Gear",  size:"Mid-size", contact:"defence@ecagroup.com",             location:"France",             region:"Europe"},
  {id:95, name:"Sepura",                    category:"Communications Gear",  size:"SME",      contact:"sales@sepura.com",                 location:"UK",                 region:"Europe"},
  {id:96, name:"Hytera Europe",             category:"Communications Gear",  size:"Mid-size", contact:"emea@hytera.com",                  location:"Germany",            region:"Europe"},
  {id:97, name:"Zodiac Data Systems",       category:"Communications Gear",  size:"SME",      contact:"info@zodiac-data-systems.com",     location:"France",             region:"Europe"},
  {id:98, name:"Saab AB (Comms Division)",  category:"Communications Gear",  size:"Large",    contact:"defence.comms@saabgroup.com",      location:"Sweden",             region:"Europe"},
  {id:99, name:"Aeroflex",                  category:"Communications Gear",  size:"Mid-size", contact:"defence@aeroflex.com",             location:"UK",                 region:"Europe"},
  {id:100,name:"Babcock International",     category:"Logistics & Supply",   size:"Large",    contact:"defence@babcockinternational.com", location:"UK",                 region:"Europe"},
  {id:101,name:"Chemring Group",            category:"Logistics & Supply",   size:"Mid-size", contact:"info@chemring.co.uk",              location:"UK",                 region:"Europe"},
  {id:102,name:"Diehl Defence",             category:"Logistics & Supply",   size:"Mid-size", contact:"info@diehl-defence.com",           location:"Germany",            region:"Europe"},
  {id:103,name:"Hensoldt",                  category:"Logistics & Supply",   size:"Large",    contact:"info@hensoldt.net",                location:"Germany",            region:"Europe"},
  {id:104,name:"ST Engineering Europe",     category:"Logistics & Supply",   size:"Mid-size", contact:"europe@stengg.com",                location:"France",             region:"Europe"},
  {id:105,name:"Nordic Defence Industries", category:"Logistics & Supply",   size:"SME",      contact:"info@ndi.no",                      location:"Norway",             region:"Europe"},
  {id:106,name:"FN Herstal",                category:"Logistics & Supply",   size:"Large",    contact:"export@fnherstal.com",             location:"Belgium",            region:"Europe"},
  {id:107,name:"Milrem Robotics",           category:"Logistics & Supply",   size:"SME",      contact:"info@milremrobotics.com",          location:"Estonia",            region:"Europe"},
  {id:108,name:"Airbus Defence & Space",    category:"Logistics & Supply",   size:"Large",    contact:"defence@airbus.com",               location:"France",             region:"Europe"},
  {id:109,name:"Defence Supply Group",      category:"Logistics & Supply",   size:"SME",      contact:"info@defencesupplygroup.com",      location:"UK",                 region:"Europe"},
  {id:110,name:"Hartmann Group",            category:"Medical Supplies",     size:"Large",    contact:"defence@hartmann.info",            location:"Germany",            region:"Europe"},
  {id:111,name:"B. Braun Melsungen",        category:"Medical Supplies",     size:"Large",    contact:"military@bbraun.com",              location:"Germany",            region:"Europe"},
  {id:112,name:"Lohmann & Rauscher",        category:"Medical Supplies",     size:"Mid-size", contact:"defence@lohmann-rauscher.com",     location:"Germany",            region:"Europe"},
  {id:113,name:"Combat Medical Systems EU", category:"Medical Supplies",     size:"SME",      contact:"info@combatmedical.eu",            location:"Belgium",            region:"Europe"},
  {id:114,name:"H&H Medical",               category:"Medical Supplies",     size:"SME",      contact:"info@hhmedical.eu",                location:"France",             region:"Europe"},
  {id:115,name:"Trauma Care Consortium",    category:"Medical Supplies",     size:"Small",    contact:"info@traumacare.co.uk",            location:"UK",                 region:"Europe"},
  {id:116,name:"Medi-Tech International",   category:"Medical Supplies",     size:"SME",      contact:"sales@medi-techintl.co.uk",        location:"UK",                 region:"Europe"},
  {id:117,name:"Defibrillator Ltd",         category:"Medical Supplies",     size:"Small",    contact:"defence@defibrillator.co.uk",      location:"UK",                 region:"Europe"},
  {id:118,name:"Patria",                    category:"Military Vehicles",    size:"Large",    contact:"info@patria.fi",                   location:"Finland",            region:"Europe"},
  {id:119,name:"KNDS",                      category:"Military Vehicles",    size:"Large",    contact:"info@knds.com",                    location:"France/Germany",     region:"Europe"},
  {id:120,name:"Arquus",                    category:"Military Vehicles",    size:"Large",    contact:"contact@arquus-defense.com",       location:"France",             region:"Europe"},
  {id:121,name:"TATRA Defence Vehicle",     category:"Military Vehicles",    size:"Mid-size", contact:"defence@tatra.cz",                 location:"Czech Republic",     region:"Europe"},
  {id:122,name:"Jankel Group",              category:"Military Vehicles",    size:"SME",      contact:"defence@jankelgroup.com",          location:"UK",                 region:"Europe"},
  {id:123,name:"Supacat",                   category:"Military Vehicles",    size:"SME",      contact:"info@supacat.com",                 location:"UK",                 region:"Europe"},
  {id:124,name:"Achleitner",                category:"Military Vehicles",    size:"SME",      contact:"office@achleitner.com",            location:"Austria",            region:"Europe"},
  {id:125,name:"Renault Trucks Defense",    category:"Military Vehicles",    size:"Large",    contact:"defense@renault-trucks.com",       location:"France",             region:"Europe"},
  {id:126,name:"Steyr Motors",              category:"Military Vehicles",    size:"Mid-size", contact:"defense@steyr-motors.com",         location:"Austria",            region:"Europe"},
  {id:127,name:"Mercedes-Benz Special Veh.",category:"Military Vehicles",    size:"Large",    contact:"special.vehicles@mercedes-benz.com",location:"Germany",          region:"Europe"},
  {id:128,name:"MBDA",                      category:"Defence Systems",      size:"Large",    contact:"info@mbda-systems.com",            location:"France/UK/Germany",  region:"Europe"},
  {id:129,name:"Nammo",                     category:"Defence Systems",      size:"Mid-size", contact:"info@nammo.com",                   location:"Norway",             region:"Europe"},
  {id:130,name:"Meggitt Defence",           category:"Defence Systems",      size:"Mid-size", contact:"defence@meggitt.com",              location:"UK",                 region:"Europe"},
  {id:131,name:"QinetiQ",                   category:"Defence Systems",      size:"Large",    contact:"defence@qinetiq.com",              location:"UK",                 region:"Europe"},
  {id:132,name:"Ultra Electronics",         category:"Defence Systems",      size:"Mid-size", contact:"defence@ultra-electronics.com",    location:"UK",                 region:"Europe"},
  {id:133,name:"PGZ Polish Arms Group",     category:"Defence Systems",      size:"Large",    contact:"export@pgzsa.pl",                  location:"Poland",             region:"Europe"},
  {id:134,name:"DEA Defence Equipment",     category:"Defence Systems",      size:"SME",      contact:"sales@dea-defence.co.uk",          location:"UK",                 region:"Europe"},
  {id:135,name:"Elbit Systems UK",          category:"Defence Systems",      size:"Mid-size", contact:"info@elbitsystemsuk.com",          location:"UK",                 region:"Europe"},
]

const PER_PAGE = 25

export default function CompaniesPage() {
  const [filterRegion, setFilterRegion] = useState('')
  const [filterCat, setFilterCat] = useState('')
  const [filterSize, setFilterSize] = useState('')
  const [searchQ, setSearchQ] = useState('')
  const [sortCol, setSortCol] = useState<keyof Lead>('name')
  const [sortDir, setSortDir] = useState(1)
  const [page, setPage] = useState(1)
  const [dataView, setDataView] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  const filtered = useMemo(() => {
    const region = dataView || filterRegion
    return LEADS.filter(l => {
      if (region && l.region !== region) return false
      if (filterCat && l.category !== filterCat) return false
      if (filterSize && l.size !== filterSize) return false
      if (searchQ && !l.name.toLowerCase().includes(searchQ.toLowerCase()) && !l.location.toLowerCase().includes(searchQ.toLowerCase())) return false
      return true
    }).sort((a, b) => {
      const av = (a[sortCol] || '').toString().toLowerCase()
      const bv = (b[sortCol] || '').toString().toLowerCase()
      return av < bv ? -sortDir : av > bv ? sortDir : 0
    })
  }, [filterRegion, filterCat, filterSize, searchQ, sortCol, sortDir, dataView])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const pageData = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  function handleSort(col: keyof Lead) {
    if (sortCol === col) setSortDir(d => d * -1)
    else { setSortCol(col); setSortDir(1) }
    setPage(1)
  }

  function handleFilterChange() {
    setPage(1)
  }

  function resetAll() {
    setFilterRegion(''); setFilterCat(''); setFilterSize(''); setSearchQ(''); setDataView(''); setSortCol('name'); setSortDir(1); setPage(1)
  }

  function exportCSV() {
    const rows = [['#','Company Name','Category','Size','Region','Location']]
    filtered.forEach(l => rows.push([String(l.id), l.name, l.category, l.size, l.region, l.location]))
    const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n')
    const a = document.createElement('a'); a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv); a.download = 'defence-companies.csv'; a.click()
  }

  function showSubToast(msg: string) {
    setToastMsg(msg); setToastVisible(true); setTimeout(() => setToastVisible(false), 4000)
  }

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = e.currentTarget
    const email = (f.querySelector('input[type=email]') as HTMLInputElement)?.value.trim()
    const company = (f.querySelector('.sub-field input[type=text]') as HTMLInputElement)?.value.trim()
    const btn = f.querySelector('.sub-btn') as HTMLButtonElement
    const orig = btn.textContent
    btn.disabled = true; btn.textContent = 'Submitting…'
    try {
      const res = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, company }) })
      const d = await res.json()
      if (d.ok) { f.reset(); btn.disabled = false; btn.textContent = orig; showSubToast("You have subscribed to Defence Trading's Insights.") }
      else { btn.disabled = false; btn.textContent = orig; showSubToast('Could not subscribe — please try again.') }
    } catch { btn.disabled = false; btn.textContent = orig }
  }

  const regionLabel = filterRegion || 'All regions'
  const catLabel = filterCat || 'All categories'
  const sizeLabel = filterSize || 'All sizes'

  function SortIcon({ col }: { col: string }) {
    if (sortCol !== col) return <span className="sort-icon">↕</span>
    return <span className="sort-icon" style={{color:'#E31837'}}>{sortDir === 1 ? '↑' : '↓'}</span>
  }

  return (
    <>
      <style>{`
        .hero-yellow { background: #F5C400; padding: 32px 0 0; }
        .hero-yellow h1 { font-size: clamp(32px, 8vw, 52px); font-weight: 900; color: #000; line-height: 1; letter-spacing: -1px; margin-bottom: 10px; }
        .hero-yellow .sub { font-size: clamp(15px, 3vw, 20px); font-weight: 700; color: #000; margin-bottom: 20px; }
        .disclaimer-box {
          background: rgba(255,255,255,0.45); border: 1px solid rgba(0,0,0,0.1);
          padding: 14px 18px; font-size: 12px; color: #333; line-height: 1.6; margin-bottom: 0; max-width: 960px;
        }
        .filter-area { background: #F5C400; padding: 20px 0 28px; border-bottom: 1px solid rgba(0,0,0,0.12); }
        .filter-area > .pg-wrap { display: flex; align-items: flex-end; gap: 24px; flex-wrap: wrap; width: 100%; }
        .filter-group { display: flex; flex-direction: column; gap: 8px; }
        .filter-group-label { font-size: 11px; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; color: #000; }
        .filter-buttons { display: flex; gap: 8px; flex-wrap: wrap; }
        .filter-btn {
          display: flex; align-items: center; gap: 8px;
          border: 1.5px solid #000; background: #fff;
          padding: 11px 16px; font-size: 13px; font-weight: 600;
          cursor: pointer; font-family: inherit; color: #000;
          transition: all 0.15s; position: relative; white-space: nowrap;
        }
        .filter-btn.active-btn { background: #000; color: #fff; }
        .filter-btn .btn-val { font-size: 13px; font-weight: 600; }
        .filter-btn .chevron { color: #E31837; font-size: 10px; margin-left: 2px; }
        .filter-btn.active-btn .chevron { color: #F5C400; }
        .filter-btn select { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; }
        .search-group { display: flex; flex-direction: column; gap: 10px; flex: 1; max-width: 440px; }
        .search-label { font-size: 11px; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; color: #000; }
        .search-wrap { display: flex; }
        .search-input {
          flex: 1; border: 2px solid #000; padding: 11px 16px;
          font-size: 13px; font-family: inherit; outline: none;
          background: #fff; color: #000;
        }
        .search-input::placeholder { color: #999; }
        .search-btn {
          background: #000; border: none; width: 50px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .search-btn svg { width: 18px; height: 18px; fill: #fff; }
        .toolbar { background: #fff; border-bottom: 2px solid #000; padding: 0; display: flex; align-items: center; gap: 0; min-height: 52px; flex-wrap: wrap; }
        .toolbar > .pg-wrap { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; min-height: 52px; width: 100%; }
        .data-view-btn {
          background: #000; color: #fff; border: none; padding: 0 16px;
          display: flex; flex-direction: column; justify-content: center;
          cursor: pointer; font-family: inherit; min-width: 140px;
          height: 36px; position: relative;
        }
        .data-view-btn .dv-label { font-size: 9px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #aaa; line-height: 1; }
        .data-view-btn .dv-val { font-size: 13px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 6px; line-height: 1; margin-top: 3px; }
        .data-view-btn .dv-val .chevron { color: #F5C400; font-size: 10px; }
        .data-view-btn select { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; }
        .dl-btn {
          border: 1.5px solid #000; background: #fff; padding: 0 16px; font-size: 12px; font-weight: 700;
          cursor: pointer; font-family: inherit; display: flex; align-items: center; gap: 6px;
          transition: background 0.15s; white-space: nowrap; height: 36px;
        }
        .dl-btn:hover { background: #f0f0f0; }
        .reset-btn {
          background: none; border: none; cursor: pointer; font-family: inherit;
          font-size: 13px; font-weight: 600; color: #000; display: flex; align-items: center; gap: 6px;
          padding: 8px 4px; transition: opacity 0.15s; white-space: nowrap;
        }
        .reset-btn:hover { opacity: 0.7; }
        .showing-count { margin-left: auto; font-size: 13px; color: #555; white-space: nowrap; }
        .showing-count strong { color: #000; }
        .table-wrap { padding: 0 0 60px; overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; min-width: 600px; }
        thead tr { border-top: 2px solid #000; border-bottom: 2px solid #000; }
        th { padding: 12px 10px; text-align: left; font-size: 12px; font-weight: 700; color: #000; white-space: nowrap; cursor: pointer; user-select: none; background: #fff; }
        th:hover { color: #E31837; }
        th.sorted { color: #E31837; }
        th .sort-icon { font-size: 9px; margin-left: 3px; opacity: 0.5; }
        th.sorted .sort-icon { opacity: 1; color: #E31837; }
        td { padding: 16px 10px; border-bottom: 1px solid #e0e0e0; font-size: 13px; vertical-align: top; }
        tr:hover td { background: #fafafa; }
        .company-name { font-weight: 700; color: #000; font-size: 14px; line-height: 1.3; }
        .email-link { color: #0066cc; font-size: 12px; text-decoration: none; }
        .email-link:hover { text-decoration: underline; color: #E31837; }
        .cat-tag { display: inline-block; font-size: 11px; font-weight: 600; padding: 2px 8px; border: 1px solid #000; white-space: nowrap; background: #000; color: #fff; }
        .size-pill { display: inline-block; font-size: 11px; font-weight: 700; padding: 2px 8px; background: #f0f0f0; color: #1a1a1a; }
        .pagination { display: flex; align-items: center; justify-content: center; gap: 2px; padding: 24px 32px; border-top: 1px solid #e0e0e0; }
        .pg-btn { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border: 1.5px solid #e0e0e0; background: #fff; font-size: 13px; cursor: pointer; font-family: inherit; font-weight: 500; transition: all 0.15s; color: #1a1a1a; }
        .pg-btn:hover { border-color: #000; }
        .pg-btn.active { background: #000; border-color: #000; color: #fff; font-weight: 700; }
        .pg-btn:disabled { opacity: 0.3; cursor: default; }
        .pg-info { font-size: 12px; color: #555; margin: 0 12px; }
        .empty { text-align: center; padding: 60px 20px; color: #555; }
        .empty h3 { font-size: 18px; font-weight: 700; color: #000; margin-bottom: 8px; }
        @media (max-width: 767px) {
          .util-bar { padding: 0 16px; }
          .main-nav { padding: 0 16px; height: 52px; }
          .pg-wrap { padding: 0 20px; }
          .hero-yellow { padding: 24px 0 0; }
          .filter-area { padding: 16px 0 24px; }
          .filter-area > .pg-wrap { gap: 16px; flex-direction: column; align-items: stretch; }
          .filter-buttons { flex-direction: column; }
          .filter-btn { min-width: unset; width: 100%; }
          .search-group { max-width: 100%; }
          .toolbar > .pg-wrap { padding: 10px 20px; gap: 8px; min-height: unset; }
          .data-view-btn { min-width: unset; flex: 1; }
          .showing-count { width: 100%; margin-left: 0; font-size: 12px; padding: 4px 0; }
          .table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
        }
      `}</style>

      {/* HERO */}
      <div className="hero-yellow">
        <div className="pg-wrap">
          <h1>Companies</h1>
          <div className="sub">Verified B2B defence companies across North America and Europe</div>
          <div className="disclaimer-box">
            All contact information is sourced from publicly available company data and is intended for authorised B2B outreach only.
            Contacts represent companies operating in defence, military supply, protective equipment, communications, logistics, medical, and vehicle sectors.
            All outreach must comply with applicable regulations including GDPR for European contacts.
          </div>
        </div>

        {/* FILTERS */}
        <div className="filter-area">
          <div className="pg-wrap">
            <div className="filter-group">
              <div className="filter-group-label">Filters</div>
              <div className="filter-buttons">
                <button className={`filter-btn${filterRegion ? ' active-btn' : ''}`} id="btn-region">
                  <div><span className="btn-val">{regionLabel}</span></div>
                  <span className="chevron">▼</span>
                  <select value={filterRegion} onChange={e => { setFilterRegion(e.target.value); handleFilterChange() }}>
                    <option value="">All regions</option>
                    <option value="North America">North America</option>
                    <option value="Europe">Europe</option>
                  </select>
                </button>
                <button className={`filter-btn${filterCat ? ' active-btn' : ''}`} id="btn-cat">
                  <div><span className="btn-val">{catLabel}</span></div>
                  <span className="chevron" style={{color: filterCat ? '#F5C400' : '#E31837'}}>▼</span>
                  <select value={filterCat} onChange={e => { setFilterCat(e.target.value); handleFilterChange() }}>
                    <option value="">All categories</option>
                    <option>Protective Equipment</option>
                    <option>Military Uniforms</option>
                    <option>Communications Gear</option>
                    <option>Logistics &amp; Supply</option>
                    <option>Medical Supplies</option>
                    <option>Military Vehicles</option>
                    <option>Defence Systems</option>
                  </select>
                </button>
                <button className={`filter-btn${filterSize ? ' active-btn' : ''}`} id="btn-size">
                  <div><span className="btn-val">{sizeLabel}</span></div>
                  <span className="chevron" style={{color: filterSize ? '#F5C400' : '#E31837'}}>▼</span>
                  <select value={filterSize} onChange={e => { setFilterSize(e.target.value); handleFilterChange() }}>
                    <option value="">All sizes</option>
                    <option>Small</option>
                    <option>SME</option>
                    <option>Mid-size</option>
                    <option>Large</option>
                  </select>
                </button>
              </div>
            </div>
            <div className="search-group">
              <div className="search-label">Find companies by <span style={{fontSize:'12px',fontWeight:400,letterSpacing:0}}>ⓘ</span></div>
              <div className="search-wrap">
                <input className="search-input" type="text" placeholder="Enter company name or location..." value={searchQ} onChange={e => { setSearchQ(e.target.value); handleFilterChange() }} />
                <button className="search-btn">
                  <svg viewBox="0 0 24 24"><path d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.15 6.15a7.5 7.5 0 0 0 10.5 10.5z" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="toolbar">
        <div className="pg-wrap">
          <button className="data-view-btn">
            <div className="dv-label">Data View</div>
            <div className="dv-val"><span>{dataView || 'All Companies'}</span> <span className="chevron">▼</span></div>
            <select value={dataView} onChange={e => { setDataView(e.target.value); setPage(1) }}>
              <option value="">All Companies</option>
              <option value="North America">North America</option>
              <option value="Europe">Europe</option>
            </select>
          </button>
          <button className="dl-btn" onClick={exportCSV}>⬇ Download</button>
          <button className="reset-btn" onClick={resetAll}>↺ Reset all</button>
          <div className="showing-count">Showing all companies (<strong>{filtered.length}</strong>)</div>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-wrap">
        <div className="pg-wrap">
          {filtered.length === 0 ? (
            <div className="empty">
              <h3>No results found</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th style={{width:'48px',color:'#aaa',fontWeight:500}}>#</th>
                  <th style={{minWidth:'220px'}} className={sortCol==='name'?'sorted':''} onClick={() => handleSort('name')}>Company Name <SortIcon col="name" /></th>
                  <th className={sortCol==='category'?'sorted':''} onClick={() => handleSort('category')}>Category <SortIcon col="category" /></th>
                  <th className={sortCol==='size'?'sorted':''} onClick={() => handleSort('size')}>Size <SortIcon col="size" /></th>
                  <th className={sortCol==='region'?'sorted':''} onClick={() => handleSort('region')}>Region <SortIcon col="region" /></th>
                  <th className={sortCol==='location'?'sorted':''} onClick={() => handleSort('location')}>Location <SortIcon col="location" /></th>
                </tr>
              </thead>
              <tbody>
                {pageData.map((l, i) => (
                  <tr key={l.id}>
                    <td style={{color:'#aaa',fontSize:'12px'}}>{(page-1)*PER_PAGE + i + 1}</td>
                    <td>
                      <div className="company-name">{l.name}</div>
                    </td>
                    <td><span className="cat-tag">{l.category}</span></td>
                    <td><span className="size-pill">{l.size}</span></td>
                    <td>{l.region}</td>
                    <td>{l.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="pagination">
          <button className="pg-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
          {Array.from({length: totalPages}, (_, i) => i + 1).map(p => (
            <button key={p} className={`pg-btn${page === p ? ' active' : ''}`} onClick={() => setPage(p)}>{p}</button>
          ))}
          <button className="pg-btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>›</button>
          <span className="pg-info">Page {page} of {totalPages}</span>
        </div>
      )}

      {/* SUBSCRIBE STRIP */}
      <div className="subscribe-strip">
        <div className="pg-wrap">
          <h2>Subscribe to Defence Trading&apos;s Insights</h2>
          <p className="sub-intro">To receive the latest procurement intelligence, product updates, and market analysis — sign up below.</p>
          <form onSubmit={handleSubscribe}>
            <div className="sub-fields">
              <div className="sub-field">
                <label>Email <span>*</span></label>
                <input type="email" placeholder="Work email address" required />
              </div>
              <div className="sub-field">
                <label>Location <span>*</span></label>
                <select required defaultValue="">
                  <option value="" disabled></option>
                  <option>United Arab Emirates</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>Poland</option>
                  <option>Saudi Arabia</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="sub-field">
                <label>Company <span>*</span></label>
                <input type="text" placeholder="Your organisation" required />
              </div>
            </div>
            <div className="sub-check">
              <input type="checkbox" id="sub-consent-companies" required />
              <label htmlFor="sub-consent-companies">Please click here to opt-in to receiving procurement insights and marketing communications from Defence Trading. Data collected will be processed in accordance with our privacy notice. You may unsubscribe at any time.</label>
            </div>
            <div className="sub-footer-row">
              <div className="sub-required">*Required information &nbsp;|&nbsp; Read our <Link href="/privacy">Privacy notice</Link></div>
              <button type="submit" className="sub-btn">Subscribe to Defence Trading</button>
            </div>
            <div className="sub-ok">&#10003; Thank you — you&apos;re now subscribed. We&apos;ll be in touch.</div>
          </form>
        </div>
      </div>

      <div className={`sub-toast${toastVisible ? ' show' : ''}`}>{toastMsg}</div>
    </>
  )
}
