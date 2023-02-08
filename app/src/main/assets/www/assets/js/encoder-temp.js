"use strict";

//#region extended jQuery functions
jQuery.fn.extend({
    readOnly: function () {
        $(this).attr("readonly", "readonly");
    }
});

jQuery.fn.extend({
    required: function () {
        $(this).attr("required", "required");
    }
});

jQuery.fn.extend({
    notRequired: function () {
        $(this).attr("required", false);
    }
});
//#endregion
//#region variables
var requiredFieldsCount;
var phsize, numofw, nnucfam, numpreg, numunipar, numpwd, ndeath, nalp, ncrop, naquaequip, naquani;
var hh_head, ofws, fams, pregnants, unipars, pwds;
var hpq_mem_len, hpq_death_len, hpq_alp_len, hpq_crop_len, hpq_aquaequip_len, hpq_aquani_len;
var hpq_mem_TEMP_len, hpq_death_TEMP_len, hpq_prog_TEMP_len;
var nucfamchoices;
var hpqEditMode = 1;
var memEditMode = false, deceasedEditMode = false, progEditMode = false;
var alpEditMode = false, cropEditMode = false, aquaequipEditMode = false, aquaniEditMode = false;
var memEdited, deceasedEdited, progEdited, alpEdited, cropEdited, aquaequipEdited, aquaniEdited;
var dateToday = new Date();
var file_name = "";
var instancelist = {}, userDetails = {}, hpq_main = {}, hpq_data = {};
var hpq_mem = [], hpq_death = [], hpq_alp = [], hpq_crop = [], hpq_aquaequip = [], hpq_aquani = [], hpq_prog = [], hh_fams = [];
var userID;
var username = "";
var accessLevel = 0;
var instanceID = "";
var instancesToUpload = {};
var map;
var osmTiles;
var MBTiles;
var brgyBounds;
var latitude = 0, longitude = 0, accuracy = 1;
var locationCircle;
var totalEncoded, encodedToday, validEncoded, invalidEncoded;
var getL;
var getC;
var thisFile = "";
var exitMode;
var hhHeadDisabled = false, hhSpouseDisabled = false;
var xfHeadDisabled = false, xfSpouseDisabled = false;
var memIsOFW = false, memIsUnipar = false, memIsPWD, memIsPregnant = false;
var pageNavLi;
var autoSaveInterval;
var wagcshm_tot = 0;
var wagkndm_tot = 0;

const _brgy = {
    "001": "Agnas (San Miguel Island)",
    "002": "Bacolod",
    "003": "Bangkilingan",
    "004": "Bantayan",
    "005": "Baranghawon",
    "006": "Basagan",
    "007": "Basud (Pob.)",
    "008": "Bogñabong",
    "009": "Bombon (Pob.)",
    "010": "Bonot",
    "012": "Buang",
    "013": "Buhian",
    "014": "Cabagñan",
    "015": "Cobo",
    "016": "Comon ",
    "017": "Cormidal",
    "018": "Divino Rostro (Pob.)",
    "019": "Fatima",
    "020": "Guinobat",
    "021": "Hacienda (San Miguel Island)",
    "022": "Magapo",
    "023": "Mariroc",
    "024": "Matagbac",
    "025": "Oras",
    "026": "Oson",
    "027": "Panal",
    "029": "Pawa",
    "030": "Pinagbobong",
    "031": "Quinale Cabasan (Pob.)",
    "032": "Quinastillojan",
    "033": "Rawis (San Miguel Island)",
    "034": "Sagurong (San Miguel Island)",
    "035": "Salvacion",
    "036": "San Antonio",
    "037": "San Carlos",
    "011": "San Isidro (Boring)",
    "038": "San Juan (Pob.)",
    "039": "San Lorenzo",
    "040": "San Ramon",
    "041": "San Roque",
    "042": "San Vicente",
    "044": "Santo Cristo (Pob.)",
    "045": "Sua-Igot",
    "046": "Tabiguian",
    "048": "Tagas",
    "049": "Tayhi (Pob.)",
    "050": "Visita (San Miguel Island)"
}
const _prog = {
    1: "1 - Sustainable Livelihood Program (DSWD)",
    2: "2 - Food for School",
    3: "3 - Food for Work/Cash for Work",
    4: "4 - Social Pension for Indigent Senior Citizen",
    5: "5 - Pantawid Pamilyan Pilipino Program (4Ps)/KALAHI-CIDDSS/Listahan",
    6: "6 - Agrarian Reform Community Development Program (ARCDP)",
    7: "7 - Training for Work Scholarship Program (TWSP)",
    8: "8 - Community-Based Employment Program (CBEP)",
    9: "9 - Health care Insurance (Maxicare/Medicare/Intellicare/etc.)",
    10: "10 - Gender and Development Programs",
    11: "11 - Health Care Assistance Program",
    12: "12 - Supplemental Feeding Program",
    13: "13 - Educational Assistance/Scholarship Program",
    14: "14 - Skills or Livelihood Training Program",
    15: "15 - Credit/Lending Program",
    16: "16 - Housing Program",
    17: "17 - LGU Gift Giving / Pamaskong Handog",
    18: "18 - Longevity Cash Gift for Indigent Seinor Citizen",
    19: "19 - Other type of program"
}
const _cod = {
    1: "Heart disease",
    2: "Disease of the Vascular System",
    3: "Pneumonia",
    4: "Tuberculosis",
    5: "Cancer",
    6: "Diarrhea",
    7: "Complication during pregnancy of childbirth",
    8: "Vehicular accident",
    9: "Diabetes",
    10: "Disease of the Lungs",
    11: "Disease of the Kidney",
    12: "Murdered",
    13: "Others"
}
const _sex = {
    1: "Male",
    2: "Female"
}
const _civstat = {
    1: "Single",
    2: "Married",
    3: "Widow",
    4: "Separated",
    5: "Common Law/Live-In",
    6: "Don't know"
}
const _reln = {
    1: "Head",
    2: "Spouse",
    3: "Son/Daughter",
    4: "Son-in-Law/Daughter-in-Law",
    5: "Grandchildren",
    6: "Parents",
    7: "Father-in-Law/Mother-in-Law",
    8: "Brother/Sister",
    9: "Uncle/Aunt",
    10: "Grandparents",
    11: "Nephew/Niece",
    12: "Housemaid/Houseboy",
    13: "Others"
}
const _alp_tenur = {
    1: "Fully-owned",
    2: "Owner-like possession",
    3: "Tenanted",
    4: "Leased/rented",
    5: "Rent-free",
    6: "Held under certificate of Land Transfer (CLT) or Certificate of Land Ownership Award (CLOA)",
    7: "Held under Certificate of Ancestral Domain Title/ Certificate of Ancestral Land Title (CADT/CALT)",
    8: "Held under Rent Free Forest Management Agreement (CBFMA)/ Stewardship",
    9: "Others"
}
const _croptype = {
    1: "Palay",
    2: "Corn",
    3: "Coconut",
    4: "Others"
}
const _aquaequiptype = {
    1: "Fish net",
    2: "Electricity",
    3: "Bagnets",
    4: "Gillnets",
    5: "Traps",
    6: "Hooks and line",
    7: "Sift net",
    8: "Others"
}
const _aquanitype = {
    1: "Tilapia",
    2: "Milkfish",
    3: "Catfish",
    4: "Mudfish",
    5: "Carp",
    6: "Other"
}
const _hpq_stat = {
    0: "Incomplete",
    1: "Not validated",
    2: "Validated",
    3: "Uploaded"
}
var psoc4 = [
    { label: "Able seaman", idx: 8340 },
    { label: "Abrasives maker", idx: 8139 },
    { label: "Accountant (General)", idx: 2411 },
    { label: "Accupressure technician", idx: 3229 },
    { label: "Acidizer (oil and gas wells)", idx: 3117 },
    { label: "Acrobat", idx: 3474 },
    { label: "Actor", idx: 2455 },
    { label: "Actuarial assistant", idx: 3434 },
    { label: "Actuarial systems program analyst", idx: 2132 },
    { label: "Actuary", idx: 2121 },
    { label: "Acupuncturist", idx: 2229 },
    { label: "Adjudicator", idx: 2421 },
    { label: "Administrative clerk", idx: 4190 },
    { label: "Administrator", idx: 1110 },
    { label: "Admission clerk", idx: 4222 },
    { label: "Advertising account executive", idx: 2419 },
    { label: "Advertising copywriter", idx: 2451 },
    { label: "Advocate", idx: 2421 },
    { label: "Aerial photo analyst", idx: 3131 },
    { label: "Aerialist", idx: 3474 },
    { label: "Aerobic instructor", idx: 3475 },
    { label: "Aeromechanic", idx: 7232 },
    { label: "Agar-agar cultivators", idx: 6414 },
    { label: "Agenda minutes officer", idx: 3439 },
    { label: "Agent, employment", idx: 3423 },
    { label: "Agent, employment placement", idx: 3423 },
    { label: "Agent, literary", idx: 3429 },
    { label: "Agent, musical performance", idx: 3429 },
    { label: "Agent, railway goods ", idx: 4133 },
    { label: "Agent, sports", idx: 3429 },
    { label: "Agent, theater", idx: 3429 },
    { label: "Agricultural breeding technician", idx: 3219 },
    { label: "Agricultural production technician", idx: 3219 },
    { label: "Agricultural products inspector", idx: 3219 },
    { label: "Agriculturist", idx: 2213 },
    { label: "Agronomist", idx: 2213 },
    { label: "Aid, nursing, home", idx: 5133 },
    { label: "Air navigation services supervisor", idx: 1422 },
    { label: "Air navigation system specialist", idx: 3143 },
    { label: "Air terminal supervisor", idx: 1422 },
    { label: "Air traffic control specialist, station", idx: 3144 },
    { label: "Air traffic control specialist, tower", idx: 3144 },
    { label: "Air traffic controller", idx: 3144 },
    { label: "Air traffic controller", idx: 3144 },
    { label: "Air traffic coordinator", idx: 3144 },
    { label: "Air traffic safety technician", idx: 3145 },
    { label: "Air transport pilot", idx: 3143 },
    { label: "Air Transport Service Supervisors", idx: 1422 },
    { label: "Air-compressor operator", idx: 8163 },
    { label: "Aircraft accident fire-fighter", idx: 5161 },
    { label: "Aircraft avionics maintenance", idx: 3145 },
    { label: "Aircraft cabin attendant", idx: 5111 },
    { label: "Aircraft loader", idx: 9333 },
    { label: "Aircraft maintenance officer", idx: 3143 },
    { label: "Aircraft mechanic technician", idx: 3144 },
    { label: "Aircraft mechanic technician", idx: 3145 },
    { label: "Aircraft pilot (except transport)", idx: 3143 },
    { label: "Aircraft production/maintenance", idx: 3145 },
    { label: "Airduct worker", idx: 7213 },
    { label: "Airfield power technician ", idx: 3145 },
    { label: "Airfield Services Officer", idx: 3144 },
    { label: "Airframe fitter", idx: 7232 },
    { label: "Airlines steward and hostess", idx: 5111 },
    { label: "Airmotive & equipment mechanic", idx: 7232 },
    { label: "Airport control operator", idx: 3144 },
    { label: "Airport Engineer", idx: 2151 },
    { label: "Airways communications services supervisor", idx: 1429 },
    { label: "Airways communicator", idx: 3144 },
    { label: "Ambassador", idx: 1110 },
    { label: "Anaesthesiologist", idx: 2221 },
    { label: "Anaesthetist", idx: 2221 },
    { label: "Analytical chemist", idx: 2113 },
    { label: "Anatomist", idx: 2212 },
    { label: "Anesthesiologist", idx: 2229 },
    { label: "Animal industry development technician", idx: 3219 },
    { label: "Animal keeper", idx: 6590 },
    { label: "Animal quarintine inspector", idx: 3219 },
    { label: "Animal scientist", idx: 2212 },
    { label: "Animal vaccinator", idx: 3223 },
    { label: "Annealer", idx: 8123 },
    { label: "Announcer, radio ", idx: 3472 },
    { label: "Announcer, television", idx: 3472 },
    { label: "Anthropologist", idx: 2442 },
    { label: "Apiarist", idx: 6290 },
    { label: "Apiary worker", idx: 9211 },
    { label: "Applier, veneer", idx: 7422 },
    { label: "Appraiser", idx: 3417 },
    { label: "Aquaculture supervisor", idx: 1430 },
    { label: "Aquaculturist", idx: 2213 },
    { label: "Archaeologist", idx: 2442 },
    { label: "Architect", idx: 2141 },
    { label: "Architect, building", idx: 2141 },
    { label: "Architect, landscape", idx: 2141 },
    { label: "Archivist", idx: 2430 },
    { label: "Art gallery and museum curator", idx: 2430 },
    { label: "Artesian well driller", idx: 8113 },
    { label: "Artificial breeding technician", idx: 3219 },
    { label: "Artificial limb and brace maker", idx: 3229 },
    { label: "Artist, commercial", idx: 3471 },
    { label: "Artist, concert", idx: 2453 },
    { label: "Artist, display ", idx: 3471 },
    { label: "Artist, forensic", idx: 2452 },
    { label: "Artist, lithographic", idx: 3118 },
    { label: "Artist, recording", idx: 2453 },
    { label: "Asbestos cement product maker", idx: 8212 },
    { label: "Assembler, aircraft", idx: 8271 },
    { label: "Assembler, composite products", idx: 8290 },
    { label: "Assembler, electrical equipment", idx: 8272 },
    { label: "Assembler, electronic equipment", idx: 8273 },
    { label: "Assembler, leather products", idx: 8276 },
    { label: "Assembler, mechanical machine", idx: 8271 },
    { label: "Assembler, paperboard products", idx: 8276 },
    { label: "Assembler, precision-instrument", idx: 7311 },
    { label: "Assembler, textile products", idx: 8276 },
    { label: "Assembler, vehicle", idx: 8271 },
    { label: "Assembler, watch and clock", idx: 7311 },
    { label: "Assembler, wood products", idx: 8275 },
    { label: "Assembling laborer", idx: 9321 },
    { label: "Assembly-line worker, agricultural machinery", idx: 8271 },
    { label: "Assembly-line worker, aircraft engine", idx: 8271 },
    { label: "Assembly-line worker, doll and stuffed toy", idx: 8276 },
    { label: "Assembly-line worker, heavy machinery", idx: 8271 },
    { label: "Assessment examiner", idx: 3417 },
    { label: "Assessor, claims/insurance", idx: 3417 },
    { label: "Assestment clerk", idx: 4121 },
    { label: "Assistant Bureau Director", idx: 1110 },
    { label: "Assistant culture center worker", idx: 3460 },
    { label: "Assistant Executive Director", idx: 1110 },
    { label: "Assistant land registration examiner", idx: 3439 },
    { label: "Assistant psychiatric social worker", idx: 3460 },
    { label: "Assistant Secretary, Office of the President", idx: 1110 },
    { label: "Assistant social worker", idx: 3460 },
    { label: "Assistant, administrative", idx: 3431 },
    { label: "Assistant, computer maintenance", idx: 3121 },
    { label: "Assistant, computer/programming", idx: 3121 },
    { label: "Assistant, computer/systems analysis", idx: 3121 },
    { label: "Assistant, Data Base", idx: 3121 },
    { label: "Assistant, EDP operators", idx: 3121 },
    { label: "Associate Dean, university", idx: 1229 },
    { label: "Associate Judge", idx: 2422 },
    { label: "Associate Solicitor General", idx: 1110 },
    { label: "Astrologer", idx: 5141 },
    { label: "Astronomer", idx: 2111 },
    { label: "Astronomical scientist", idx: 2111 },
    { label: "Athlete", idx: 3475 },
    { label: "Attache", idx: 1110 },
    { label: "Attendant midwife", idx: 3232 },
    { label: "Attendant, gasoline ", idx: 5220 },
    { label: "Attendant, nursery school ", idx: 5131 },
    { label: "Attendant, Sauna Bath/Body massage/Foot spa/Body scrab", idx: 5151 },
    { label: "Attorney", idx: 2421 },
    { label: "Auctioneer", idx: 3418 },
    { label: "Audio visual aids technician  ,", idx: 3131 },
    { label: "Audio visual operator       ", idx: 3131 },
    { label: "Audio visual systems technician", idx: 3114 },
    { label: "Audiometry nurse", idx: 2231 },
    { label: "Audio-visual and other teaching aid specialist", idx: 2391 },
    { label: "Auditor", idx: 2411 },
    { label: "Author", idx: 2451 },
    { label: "Auto body repairman", idx: 7213 },
    { label: "Auto Fuel dispatcher", idx: 4133 },
    { label: "Autocad designer", idx: 2131 },
    { label: "Autocad operator", idx: 3122 },
    { label: "Autolight mechanic", idx: 7231 },
    { label: "Automated assembly-line operator", idx: 8171 },
    { label: "Automotive body builder", idx: 7213 },
    { label: "Autopsy attendant", idx: 5153 },
    { label: "Auxiliary midwife", idx: 3232 },
    { label: "Auxiliary nurse", idx: 3231 },
    { label: "Aviation Group Commander", idx: 3143 },
    { label: "Aviation safety regulation officer", idx: 3143 },
    { label: "Baby sitter", idx: 5131 },
    { label: "Background digital artist", idx: 2131 },
    { label: "Background digital artist", idx: 3131 },
    { label: "Bacteriologist ", idx: 2212 },
    { label: "Baggage handler", idx: 9151 },
    { label: "Baggage porter", idx: 9151 },
    { label: "Bailiff", idx: 5169 },
    { label: "Baked goods machine operator", idx: 8264 },
    { label: "Baker, general", idx: 7412 },
    { label: "Ballet dancer", idx: 2454 },
    { label: "Ballistician", idx: 2113 },
    { label: "Ballroom dancer        ", idx: 3473 },
    { label: "Band conductor ", idx: 3473 },
    { label: "Band leader", idx: 3473 },
    { label: "Band Manager", idx: 1319 },
    { label: "Band-saw operator", idx: 8141 },
    { label: "Bank collector", idx: 4215 },
    { label: "Bantay Dagat", idx: 9213 },
    { label: "Bar keeper", idx: 5123 },
    { label: "Barangay affairs worker", idx: 3460 },
    { label: "Barangay Chairman/Captain", idx: 1130 },
    { label: "Barangay health aide", idx: 5132 },
    { label: "Barber", idx: 5151 },
    { label: "Barber-hairdresser", idx: 5151 },
    { label: "Barker", idx: 9152 },
    { label: "Bartender", idx: 5123 },
    { label: "Bartender helper", idx: 5123 },
    { label: "Basketry weaver", idx: 7425 },
    { label: "Batch still operator, chemical processes, except petroleum", idx: 8154 },
    { label: "Beam warper", idx: 8252 },
    { label: "Beater operator", idx: 8142 },
    { label: "Beautician", idx: 5151 },
    { label: "Beauty care equipment operator", idx: 5151 },
    { label: "Beauty consultant", idx: 5151 },
    { label: "Beef cattle farm worker", idx: 9211 },
    { label: "Bell boy", idx: 9151 },
    { label: "Belly dancer", idx: 3473 },
    { label: "Bender, glass tube", idx: 7322 },
    { label: "Bessemer furnaceman, steel converting", idx: 8121 },
    { label: "Bet bookmaker", idx: 4213 },
    { label: "Beverage machine operator", idx: 8268 },
    { label: "Bill courier", idx: 4215 },
    { label: "Billing clerk", idx: 4215 },
    { label: "Biochemist", idx: 2212 },
    { label: "Biologist (General)", idx: 2211 },
    { label: "Biologist, aquatic", idx: 2211 },
    { label: "Biometrician", idx: 2122 },
    { label: "Biophysicist", idx: 2212 },
    { label: "Black & White Scanner", idx: 3131 },
    { label: "Black and white developer", idx: 7344 },
    { label: "Blacksmith, general", idx: 7221 },
    { label: "Blast furnaceman, ore smelting", idx: 8121 },
    { label: "Blaster", idx: 7112 },
    { label: "Bleacher operator", idx: 8142 },
    { label: "Bleaching machine operator", idx: 8254 },
    { label: "Blender, petroleum refining", idx: 8155 },
    { label: "Blender, tobacco", idx: 7416 },
    { label: "Block layer and setter", idx: 7122 },
    { label: "Blower, glass", idx: 7322 },
    { label: "Blower, glass, scientific", idx: 7322 },
    { label: "Board Directors and Members, organization/enterprise", idx: 1210 },
    { label: "Board Member, organization/enterprise", idx: 1210 },
    { label: "Board secretary", idx: 3431 },
    { label: "Boat loader", idx: 9333 },
    { label: "Boatman", idx: 8340 },
    { label: "Boatswain", idx: 8340 },
    { label: "Body welder", idx: 7212 },
    { label: "Bodyguard", idx: 5169 },
    { label: "Boiler fireman", idx: 8162 },
    { label: "Boiler operator", idx: 8162 },
    { label: "Boilersmith", idx: 7213 },
    { label: "Boiling pan tender", idx: 8266 },
    { label: "Book editor", idx: 2451 },
    { label: "Book embosser, hand and machine", idx: 7345 },
    { label: "Bookbinder, hand and machine", idx: 7345 },
    { label: "Bookkeeper", idx: 3433 },
    { label: "Boring-machine operator, metal", idx: 8211 },
    { label: "Boring-machine setter-operator", idx: 7223 },
    { label: "Botanist", idx: 2211 },
    { label: "Bottle sorter", idx: 9321 },
    { label: "Bottler /canner", idx: 7414 },
    { label: "Bottling supervisor", idx: 1430 },
    { label: "Bouncer", idx: 5169 },
    { label: "Boxer", idx: 3475 },
    { label: "Braid maker, hand", idx: 7432 },
    { label: "Braid maker, machine", idx: 8259 },
    { label: "Bread baker", idx: 7412 },
    { label: "Breeder, pet dog", idx: 6290 },
    { label: "Brewer", idx: 8268 },
    { label: "Brewmaster", idx: 7415 },
    { label: "Bricklayer, chimney building", idx: 7122 },
    { label: "Bricklayer, construction", idx: 7122 },
    { label: "Bridge or gantry crane operator", idx: 8333 },
    { label: "Bridge station supervisor", idx: 1421 },
    { label: "Bridge/Drainage engineer", idx: 2151 },
    { label: "Broadcast operations technician  ,", idx: 3114 },
    { label: "Broadcast program traffic officer", idx: 3472 },
    { label: "Broker, insurance", idx: 3412 },
    { label: "Broom maker, hand", idx: 7425 },
    { label: "Brush maker, hand", idx: 7425 },
    { label: "Brush-painter", idx: 7324 },
    { label: "Bucker", idx: 6320 },
    { label: "Budgeting aide", idx: 4121 },
    { label: "Budgeting clerk", idx: 4121 },
    { label: "Buffing machine operator", idx: 7224 },
    { label: "Builder, coach body", idx: 7422 },
    { label: "Builder, nipa house", idx: 7121 },
    { label: "Builder, organ", idx: 7312 },
    { label: "Builder, traditional material", idx: 7121 },
    { label: "Builder, wooden boat", idx: 7123 },
    { label: "Building grounds maintenance supervisor", idx: 149 },
    { label: "Building inspector", idx: 3151 },
    { label: "Building maintenance man", idx: 7129 },
    { label: "Bulldozer operator", idx: 8332 },
    { label: "Bureau Director", idx: 1110 },
    { label: "Bus driver", idx: 8323 },
    { label: "Bus inspector/supervisor", idx: 1429 },
    { label: "Business conservation analyst", idx: 2419 },
    { label: "Business development/marketing specialist", idx: 2419 },
    { label: "Butcher, abbatoir", idx: 7411 },
    { label: "Butcher, general", idx: 7411 },
    { label: "Butter maker", idx: 7413 },
    { label: "Buyer", idx: 3416 },
    { label: "C T Scan technologist", idx: 3133 },
    { label: "Cabinet maker", idx: 7422 },
    { label: "Cable and line installer", idx: 7246 },
    { label: "Cable driller, gas well", idx: 8113 },
    { label: "Cable driller, oil well", idx: 8113 },
    { label: "Cable pulling", idx: 7246 },
    { label: "Cable splicer", idx: 7215 },
    { label: "CAD/CAM engineer", idx: 2153 },
    { label: "CAD/CAM operator", idx: 3131 },
    { label: "Calculating machine operator", idx: 4114 },
    { label: "Call center assistant/representative", idx: 4222 },
    { label: "Camber mechanic", idx: 7231 },
    { label: "Cameraman", idx: 3131 },
    { label: "Cameraman, photogravure", idx: 7343 },
    { label: "Candle maker", idx: 8229 },
    { label: "Candle making", idx: 7333 },
    { label: "Candy hand packer", idx: 9322 },
    { label: "Canvasser", idx: 5220 },
    { label: "Captain", idx: 3142 },
    { label: "Car driver", idx: 8322 },
    { label: "Car washer", idx: 9120 },
    { label: "Car window cleaner", idx: 9120 },
    { label: "Carageenan cultivators", idx: 6414 },
    { label: "Carbonation man, sugar refining", idx: 8266 },
    { label: "Card- and tape-punching machine operator", idx: 4113 },
    { label: "Card dealer", idx: 4213 },
    { label: "Cardboard lining machine operator", idx: 8143 },
    { label: "Cardiologist", idx: 2221 },
    { label: "Care giver", idx: 5133 },
    { label: "Career Executive Service Officer", idx: 1110 },
    { label: "Career relation payphone & access services", idx: 4223 },
    { label: "Caretaker, building", idx: 9141 },
    { label: "Cargo checker", idx: 4133 },
    { label: "Carpenter, bench", idx: 7123 },
    { label: "Carpenter, construction", idx: 7123 },
    { label: "Carpenter, finish", idx: 7123 },
    { label: "Carpenter, general", idx: 7123 },
    { label: "Carpenter, rough", idx: 7123 },
    { label: "Carpenter, ship's", idx: 7123 },
    { label: "Carpenter, stage", idx: 7123 },
    { label: "Carpenter, studio", idx: 7123 },
    { label: "Carpet weaver, hand", idx: 7432 },
    { label: "Carpet weaver, machine", idx: 8252 },
    { label: "Cart pusher", idx: 9331 },
    { label: "Cartographer", idx: 2157 },
    { label: "Cartographer", idx: 2157 },
    { label: "Cartographer, police & detective", idx: 3450 },
    { label: "Cartoonist", idx: 2452 },
    { label: "Cartwright", idx: 7422 },
    { label: "Carver, hand, stone", idx: 7113 },
    { label: "Carver, wood", idx: 7422 },
    { label: "Carver-setter, monument", idx: 7113 },
    { label: "Case worker", idx: 3460 },
    { label: "Case-hardener", idx: 8123 },
    { label: "Cash clerk", idx: 4211 },
    { label: "Cash registrar clerk", idx: 4211 },
    { label: "Cashier", idx: 4211 },
    { label: "Cashier aide", idx: 4211 },
    { label: "Cashier Aide", idx: 4211 },
    { label: "Cashier, bank", idx: 4211 },
    { label: "Cashier, cash desk ", idx: 4211 },
    { label: "Cast concrete product maker", idx: 8212 },
    { label: "Cast stone maker", idx: 8212 },
    { label: "Caster, hand, pottery and porcelain", idx: 7321 },
    { label: "Casting finisher", idx: 8223 },
    { label: "Cataloguer", idx: 2430 },
    { label: "Catcher, fish, for aquarium", idx: 6490 },
    { label: "Catechist", idx: 3480 },
    { label: "Cattle herder", idx: 6211 },
    { label: "CCTV operator", idx: 3132 },
    { label: "CCTV/ Evidence Custodian", idx: 2153 },
    { label: "Cell phone technician", idx: 3139 },
    { label: "Cellophane bag maker, machine", idx: 8143 },
    { label: "Cement finisher", idx: 7122 },
    { label: "Cementer, gas well", idx: 7122 },
    { label: "Cementer, oil well", idx: 7122 },
    { label: "Centrifugal separator operator", idx: 8153 },
    { label: "Ceramics kiln operator", idx: 8131 },
    { label: "Ceramics plant operator", idx: 8139 },
    { label: "Cereal machine operator", idx: 8264 },
    { label: "Chairman", idx: 1110 },
    { label: "Chairman, Commission on Human Rights", idx: 1144 },
    { label: "Chamber maid", idx: 5121 },
    { label: "Chancellor", idx: 1110 },
    { label: "Chaperon", idx: 5152 },
    { label: "Chaplain", idx: 2460 },
    { label: "Charcoal maker", idx: 6330 },
    { label: "Cheese maker", idx: 7413 },
    { label: "Chef", idx: 5122 },
    { label: "Chemical bleacher operator", idx: 8159 },
    { label: "Chemical filtering equipment operator", idx: 8153 },
    { label: "Chemical heat-treating plant operator", idx: 8152 },
    { label: "Chemical Laboratory technician", idx: 3116 },
    { label: "Chemical mixing machinery operator", idx: 8151 },
    { label: "Chemical processer, radioactive materials", idx: 8159 },
    { label: "Chemical processing plant operator, n.e.c.", idx: 8159 },
    { label: "Chemical separating equipment operator", idx: 8153 },
    { label: "Chemical still and reactor operator", idx: 8154 },
    { label: "Chemist (General)", idx: 2113 },
    { label: "Chemotherapy nurse", idx: 2231 },
    { label: "Chief  Education Supervisor", idx: 1411 },
    { label: "Chief Executive Officer", idx: 1210 },
    { label: "Chief executive, corporation", idx: 1210 },
    { label: "Chief inspector", idx: 3450 },
    { label: "Chief justice", idx: 2423 },
    { label: "Chief of police", idx: 3450 },
    { label: "Chief of Staff", idx: 1110 },
    { label: "Chief of staff (jail)", idx: 3450 },
    { label: "Chief Operation Officer", idx: 1210 },
    { label: "Chief penal institution program officer", idx: 3450 },
    { label: "Chief prosecutor", idx: 1110 },
    { label: "Chief steward, ship", idx: 1490 },
    { label: "Chief, village, traditional", idx: 1130 },
    { label: "Chieftain, tribe", idx: 1130 },
    { label: "Child-care worker", idx: 5131 },
    { label: "Chipperman", idx: 8142 },
    { label: "Chiropodist", idx: 5151 },
    { label: "Chiropractor", idx: 2229 },
    { label: "Chocolate maker", idx: 7412 },
    { label: "Chocolate products machine operator", idx: 8264 },
    { label: "Choral group singer", idx: 2453 },
    { label: "Choreographer", idx: 2454 },
    { label: "Cigar maker", idx: 7416 },
    { label: "Cigar production machine operator", idx: 8269 },
    { label: "Cigarette maker", idx: 7416 },
    { label: "Cigarette maker, machine", idx: 8269 },
    { label: "Cigarette production machine operator", idx: 8269 },
    { label: "Cinema projectionist", idx: 3132 },
    { label: "Cinematographer", idx: 3131 },
    { label: "Circuit equipment operator", idx: 3139 },
    { label: "Circus performer", idx: 3474 },
    { label: "City community affairs officer", idx: 3460 },
    { label: "Civil Registrar", idx: 1110 },
    { label: "Civil secretary", idx: 3431 },
    { label: "Civil security officer", idx: 3450 },
    { label: "Clay mixer", idx: 8139 },
    { label: "Clay slip maker", idx: 8139 },
    { label: "Cleaner, aircraft", idx: 9132 },
    { label: "Cleaner, building exterior", idx: 7133 },
    { label: "Cleaner, hotel", idx: 9132 },
    { label: "Cleaner, office", idx: 9132 },
    { label: "Cleaner, trains & buses", idx: 9132 },
    { label: "Cleaner, vehicle", idx: 9142 },
    { label: "Cleaner, window", idx: 9142 },
    { label: "Cleaning crew, restaurants & food chains", idx: 9132 },
    { label: "Cleaning machine operator", idx: 8254 },
    { label: "Clearing agent", idx: 3422 },
    { label: "Clerk ,data enumerator", idx: 4113 },
    { label: "Clerk of works", idx: 3112 },
    { label: "Clerk,  dispatcher", idx: 4131 },
    { label: "Clerk, accounting ", idx: 4121 },
    { label: "Clerk, accounting machine ", idx: 4114 },
    { label: "Clerk, adding machine", idx: 4114 },
    { label: "Clerk, admission ", idx: 4222 },
    { label: "Clerk, appointments ", idx: 4222 },
    { label: "Clerk, billing", idx: 4215 },
    { label: "Clerk, bookkeeping ", idx: 4121 },
    { label: "Clerk, bookkeeping machine ", idx: 4114 },
    { label: "Clerk, calculating machine ", idx: 4114 },
    { label: "Clerk, cargo", idx: 4131 },
    { label: "Clerk, coding ", idx: 4143 },
    { label: "Clerk, compilation/directory", idx: 4190 },
    { label: "Clerk, computing machine ", idx: 4114 },
    { label: "Clerk, correspondence", idx: 3431 },
    { label: "Clerk, cost computing ", idx: 4121 },
    { label: "Clerk, counter", idx: 4212 },
    { label: "Clerk, court", idx: 3432 },
    { label: "Clerk, data entry/computer", idx: 4113 },
    { label: "Clerk, data entry/converter (card to tape)", idx: 4113 },
    { label: "Clerk, data entry/electronic mail", idx: 4113 },
    { label: "Clerk, data entry/punching machine (card and tape)", idx: 4113 },
    { label: "Clerk, data processor", idx: 4113 },
    { label: "Clerk, Data tabulator", idx: 4113 },
    { label: "Clerk, Data transcriber", idx: 4113 },
    { label: "Clerk, disbursing ", idx: 4211 },
    { label: "Clerk, dispatching and receiving", idx: 4131 },
    { label: "Clerk, enumerator", idx: 4190 },
    { label: "Clerk, filing ", idx: 4141 },
    { label: "Clerk, finance ", idx: 4122 },
    { label: "Clerk, fiscal", idx: 4190 },
    { label: "Clerk, information ", idx: 4222 },
    { label: "Clerk, inquiries", idx: 4222 },
    { label: "Clerk, insurance", idx: 4122 },
    { label: "Clerk, inventory ", idx: 4131 },
    { label: "Clerk, judge", idx: 3432 },
    { label: "Clerk, law", idx: 3432 },
    { label: "Clerk, library ", idx: 4141 },
    { label: "Clerk, list/addresses", idx: 4190 },
    { label: "Clerk, loan", idx: 4214 },
    { label: "Clerk, mail sorting ", idx: 4142 },
    { label: "Clerk, material planning", idx: 4132 },
    { label: "Clerk, mortgage", idx: 4122 },
    { label: "Clerk, payroll ", idx: 4121 },
    { label: "Clerk, personnel ", idx: 4121 },
    { label: "Clerk, post office counter ", idx: 4212 },
    { label: "Clerk, posting/verifier", idx: 4142 },
    { label: "Clerk, processing & control", idx: 4132 },
    { label: "Clerk, production planning ", idx: 4132 },
    { label: "Clerk, proof-reading", idx: 4143 },
    { label: "Clerk, records/personnel", idx: 4190 },
    { label: "Clerk, securities", idx: 4122 },
    { label: "Clerk, statistical ", idx: 4122 },
    { label: "Clerk, stock", idx: 4131 },
    { label: "Clerk, stock control ", idx: 4131 },
    { label: "Clerk, stock controller", idx: 4131 },
    { label: "Clerk, stock records", idx: 4131 },
    { label: "Clerk, stockchecker", idx: 4131 },
    { label: "Clerk, storekeeper", idx: 4131 },
    { label: "Clerk, storeroom ", idx: 4131 },
    { label: "Clerk, supply canvasser", idx: 4131 },
    { label: "Clerk, supply checker", idx: 4131 },
    { label: "Clerk, telefax", idx: 4112 },
    { label: "Clerk, telegraphic transfer service ", idx: 4212 },
    { label: "Clerk, teleprinter", idx: 4112 },
    { label: "Clerk, telex", idx: 4112 },
    { label: "Clerk, ticket ", idx: 4211 },
    { label: "Clerk, ticket issuing/except travel", idx: 4211 },
    { label: "Clerk, timekeeper", idx: 4190 },
    { label: "Clerk, transport ", idx: 4133 },
    { label: "Clerk, travel agency", idx: 4221 },
    { label: "Clerk, treasury", idx: 4122 },
    { label: "Clerk, wages ", idx: 4121 },
    { label: "Clerk, warehouse ", idx: 4131 },
    { label: "Clerk, weighing ", idx: 4131 },
    { label: "Clerk, word processing", idx: 4112 },
    { label: "Clicker cutter, machine", idx: 7442 },
    { label: "Climatologist", idx: 2112 },
    { label: "Clinical associate", idx: 3221 },
    { label: "Cloth weaver, machine", idx: 8252 },
    { label: "Clown", idx: 3474 },
    { label: "Coal-gas maker", idx: 8159 },
    { label: "Coating machine operator", idx: 8143 },
    { label: "Cocoa bean roaster", idx: 8267 },
    { label: "Cocoa processing machine operator", idx: 8267 },
    { label: "Coffee blender", idx: 8267 },
    { label: "Coffee processing machine operator", idx: 8267 },
    { label: "Coffee roaster", idx: 8267 },
    { label: "Coffee taster", idx: 7415 },
    { label: "Coil winder, hand", idx: 8272 },
    { label: "Coil winder, machine", idx: 8272 },
    { label: "Coke burner", idx: 8159 },
    { label: "Cold roller, steel", idx: 8122 },
    { label: "Collection clerk", idx: 4215 },
    { label: "Collector, bill", idx: 4215 },
    { label: "Collector, cash ", idx: 4215 },
    { label: "Collector, charity", idx: 4215 },
    { label: "Collector, debt", idx: 4215 },
    { label: "Collector, money, vending machine ", idx: 4215 },
    { label: "College Administrator", idx: 1412 },
    { label: "Color developer", idx: 7344 },
    { label: "Color seperation technician", idx: 3131 },
    { label: "Columnist", idx: 2451 },
    { label: "Combat soldier (AFP)", idx: 121 },
    { label: "Commanding officer (AFP)", idx: 111 },
    { label: "Commentator, extempore", idx: 2451 },
    { label: "Commercial artist", idx: 2459 },
    { label: "Commercial traveller", idx: 3415 },
    { label: "Commissioned police officer", idx: 3450 },
    { label: "Commissioner", idx: 1110 },
    { label: "Commissioner, constitutional body", idx: 1110 },
    { label: "Commodity broker", idx: 3421 },
    { label: "Communication development engineer", idx: 2153 },
    { label: "Communication rigger", idx: 7245 },
    { label: "Communication telephone operator", idx: 4223 },
    { label: "Community development worker", idx: 2449 },
    { label: "Community relation officer", idx: 1130 },
    { label: "Community worker", idx: 3460 },
    { label: "Companion", idx: 5152 },
    { label: "Compere (emcee/show host)", idx: 3472 },
    { label: "Composer, music", idx: 2453 },
    { label: "Compositor, cold type", idx: 7341 },
    { label: "Compositor, hot metal", idx: 7341 },
    { label: "Comptroller", idx: 1231 },
    { label: "Computer application engineer", idx: 2157 },
    { label: "Computer applications engineer", idx: 2131 },
    { label: "Computer engineer", idx: 2157 },
    { label: "Computer file librarian", idx: 2139 },
    { label: "Computer formatter", idx: 2132 },
    { label: "Computer graphic layout operator", idx: 3122 },
    { label: "Computer keyer", idx: 4113 },
    { label: "Computer librarian", idx: 2430 },
    { label: "Computer maintenance specialist", idx: 2139 },
    { label: "Computer programmer", idx: 2132 },
    { label: "Computer services chief", idx: 2139 },
    { label: "Computer systems engineer", idx: 2157 },
    { label: "Computer technicians", idx: 3122 },
    { label: "Computer telephony integration engineer", idx: 2157 },
    { label: "Concert pianist", idx: 2453 },
    { label: "Concert singer", idx: 2453 },
    { label: "Concertmaster", idx: 2453 },
    { label: "Concessionaire", idx: 6320 },
    { label: "Concierge, building", idx: 9141 },
    { label: "Conciliator", idx: 2421 },
    { label: "Concrete finisher", idx: 7122 },
    { label: "Concrete finisher, general", idx: 7122 },
    { label: "Concrete shutterer", idx: 7122 },
    { label: "Concrete-mixer operator", idx: 8212 },
    { label: "Concrete-mixing-plant operator", idx: 8212 },
    { label: "Conductor, bus", idx: 5112 },
    { label: "Conductor, orchestra", idx: 2453 },
    { label: "Conductor, passenger car ", idx: 5112 },
    { label: "Conductor, road freight ", idx: 5112 },
    { label: "Cone operator, mine", idx: 8112 },
    { label: "Confectioner", idx: 7412 },
    { label: "Confectionery maker", idx: 7412 },
    { label: "Confidential agent", idx: 5169 },
    { label: "Congressman", idx: 1120 },
    { label: "Constable", idx: 5162 },
    { label: "Construction digger", idx: 9311 },
    { label: "Constructional steel erector", idx: 7214 },
    { label: "Consul General", idx: 1110 },
    { label: "Consuls", idx: 1110 },
    { label: "Consultant, dietetic/food processing", idx: 2225 },
    { label: "Consultant, nutrition", idx: 2225 },
    { label: "Continuity and script editor", idx: 2451 },
    { label: "Continuous mill roller, steel", idx: 8122 },
    { label: "Continuous mining machine operator", idx: 8111 },
    { label: "Continuous still operator, chemical processes, except petroleum", idx: 8154 },
    { label: "Continuous sugar refining machine operator", idx: 8266 },
    { label: "Contractor, construction", idx: 1313 },
    { label: "Controller, medical equipment", idx: 3133 },
    { label: "Controller, robot, industrial", idx: 3123 },
    { label: "Controlman, petroleum refining", idx: 8155 },
    { label: "Cook", idx: 5122 },
    { label: "Cook, private service", idx: 5122 },
    { label: "Cooker, chemical and related processes", idx: 8152 },
    { label: "Cooper", idx: 7422 },
    { label: "Coppersmith", idx: 7213 },
    { label: "Copy reader", idx: 2451 },
    { label: "Copy Writer", idx: 2451 },
    { label: "Core driller", idx: 8113 },
    { label: "Coremaker, hand", idx: 7211 },
    { label: "Coremaker, machine", idx: 7211 },
    { label: "Corn farmer", idx: 6112 },
    { label: "Coroner", idx: 2429 },
    { label: "Corporate compliance manager", idx: 1239 },
    { label: "Corporate legal officer", idx: 3432 },
    { label: "Corporate quality assurance manager", idx: 1239 },
    { label: "Corporate secretary", idx: 3431 },
    { label: "Correspondent", idx: 2451 },
    { label: "Cosmetologist", idx: 5151 },
    { label: "Cosmetologist (stage & studio)", idx: 5151 },
    { label: "Cost accountant", idx: 2411 },
    { label: "Cost analyst", idx: 2411 },
    { label: "Cost controller", idx: 2411 },
    { label: "Cottage caretaker", idx: 9141 },
    { label: "Cottage industry worker", idx: 7331 },
    { label: "Cotton production technician", idx: 3219 },
    { label: "Councilor", idx: 1120 },
    { label: "Counter checker", idx: 5220 },
    { label: "Counter clerk", idx: 4222 },
    { label: "Courier", idx: 4142 },
    { label: "Court administrator", idx: 2423 },
    { label: "Court clerk", idx: 3432 },
    { label: "Court interpreter", idx: 2423 },
    { label: "Court legal service chief", idx: 3432 },
    { label: "Coxswain", idx: 8340 },
    { label: "Crawler crane operator", idx: 8333 },
    { label: "Creative and performing artists", idx: 2459 },
    { label: "Creative arts specialist", idx: 2452 },
    { label: "Credit and collection clerk", idx: 4211 },
    { label: "Cremator", idx: 5153 },
    { label: "Critic", idx: 2451 },
    { label: "Crocheter, hand", idx: 7432 },
    { label: "Crocheter, machine", idx: 8259 },
    { label: "Crop protection technician", idx: 3219 },
    { label: "Croupier", idx: 4213 },
    { label: "Crude oil treater, oilfield", idx: 8153 },
    { label: "Crusher operator", idx: 8151 },
    { label: "Crushing machinery operator", idx: 8151 },
    { label: "Crystallizer operator, sugar refining", idx: 8266 },
    { label: "Cultivator, bangus farm", idx: 6411 },
    { label: "Cultivator, fish farm", idx: 6411 },
    { label: "Cultivator, mussel farm", idx: 6413 },
    { label: "Cultivator, oyster farm", idx: 6413 },
    { label: "Cultivator, prawn farm ", idx: 6412 },
    { label: "Cultivator, seaweed", idx: 6414 },
    { label: "Cultivator, tilapia farm", idx: 6411 },
    { label: "Cultural dancer", idx: 2454 },
    { label: "Cupola furnaceman", idx: 8122 },
    { label: "Curing machine operator", idx: 8254 },
    { label: "Curricula developer", idx: 2391 },
    { label: "Currier, leather", idx: 7441 },
    { label: "Custom service officer", idx: 3441 },
    { label: "Customer  service supervisor", idx: 149 },
    { label: "Customer service assistant", idx: 4222 },
    { label: "Customs inspector", idx: 3441 },
    { label: "Cutter, crystal glass", idx: 7323 },
    { label: "Cutter, garment", idx: 7434 },
    { label: "Cutter, glass", idx: 7322 },
    { label: "Cutter, glass, optical", idx: 7322 },
    { label: "Cutter, hand, stone letter", idx: 7113 },
    { label: "Cutter, leather", idx: 7434 },
    { label: "Cutter, mosaic", idx: 7122 },
    { label: "Cutter, silk-screen stencil", idx: 7346 },
    { label: "Cutter, stone", idx: 7113 },
    { label: "Cutter, textile", idx: 7434 },
    { label: "Cutting machine operator, mine", idx: 8111 },
    { label: "Cylinder pressman", idx: 7347 },
    { label: "Cytologist", idx: 2211 },
    { label: "Dairy farm laborer", idx: 9211 },
    { label: "Dairy farm worker", idx: 9211 },
    { label: "Dairy product maker", idx: 7413 },
    { label: "Dairy product pasteurizing machine operator", idx: 8262 },
    { label: "Dairy product processing machine operator", idx: 8262 },
    { label: "Dairy products machine operator", idx: 8262 },
    { label: "Dairy technician", idx: 3219 },
    { label: "Dancer, ballet", idx: 2454 },
    { label: "Dancer, beerhouse", idx: 3473 },
    { label: "Dancer, cultural", idx: 2454 },
    { label: "Dancer, nightclub", idx: 3473 },
    { label: "Dancing partner", idx: 5159 },
    { label: "Dangerous drug relations officer", idx: 2229 },
    { label: "Data analyst", idx: 2139 },
    { label: "Data communications engineer", idx: 2157 },
    { label: "Data encoder", idx: 2139 },
    { label: "Data entry machine operator", idx: 3122 },
    { label: "Data entry operator", idx: 4113 },
    { label: "Data management chief", idx: 2139 },
    { label: "Day care worker", idx: 3460 },
    { label: "Dean", idx: 1412 },
    { label: "Dean, university", idx: 1229 },
    { label: "Debt collector", idx: 4215 },
    { label: "Decorator, ceramics", idx: 7324 },
    { label: "Decorators and commercial designers", idx: 3471 },
    { label: "Decorators, lazers", idx: 7321 },
    { label: "Deeds registry inspector", idx: 3439 },
    { label: "Defense research officer", idx: 3450 },
    { label: "Dehairer, hide", idx: 7441 },
    { label: "Delivery boy, newspaper", idx: 9151 },
    { label: "Delivery man", idx: 9151 },
    { label: "Deliveryman/crew", idx: 9151 },
    { label: "Demographer", idx: 2122 },
    { label: "Demolition worker", idx: 7129 },
    { label: "Dental aide", idx: 5132 },
    { label: "Dental assistant", idx: 3222 },
    { label: "Dental associate", idx: 3222 },
    { label: "Dental hygienist", idx: 2222 },
    { label: "Dental technicians", idx: 3222 },
    { label: "Dentist (General)", idx: 2222 },
    { label: "Dentist, public health", idx: 2222 },
    { label: "Department Secretary", idx: 1110 },
    { label: "Deputy Administrator", idx: 1110 },
    { label: "Deputy administrator, organization/enterprise", idx: 1210 },
    { label: "Deputy Commissioner", idx: 1110 },
    { label: "Deputy Director General", idx: 1110 },
    { label: "Deputy Governor of Central Bank", idx: 1110 },
    { label: "Dermatologist", idx: 2221 },
    { label: "Derrickman, gas well", idx: 8113 },
    { label: "Derrickman, oil well", idx: 8113 },
    { label: "Designer, industrial and commercial products ", idx: 3471 },
    { label: "Designer, interior decoration", idx: 3471 },
    { label: "Designing electrical engineer", idx: 2152 },
    { label: "Desk clerk", idx: 4222 },
    { label: "Desulphurization treater, petroleum refining", idx: 8155 },
    { label: "Detective, police", idx: 3450 },
    { label: "Developer, black and white", idx: 7344 },
    { label: "Developer, color", idx: 7344 },
    { label: "Developer, film color", idx: 7344 },
    { label: "Dialysis technician", idx: 3133 },
    { label: "Die maker", idx: 7222 },
    { label: "Die-caster", idx: 8122 },
    { label: "Die-caster furnace operators", idx: 8122 },
    { label: "Die-presser, pottery and porcelain", idx: 7321 },
    { label: "Dietician (general)", idx: 2225 },
    { label: "Dietician, administrative", idx: 2225 },
    { label: "Dietician, teaching", idx: 2225 },
    { label: "Dietician, therapeutic/clinic", idx: 2225 },
    { label: "Diffuser operator, beet sugar", idx: 8266 },
    { label: "Digester operator", idx: 8142 },
    { label: "Digital systems computer operator", idx: 3122 },
    { label: "Dipper, ceramics", idx: 7324 },
    { label: "Direct lithographic pressman", idx: 7347 },
    { label: "Director", idx: 1110 },
    { label: "Director of photography (motion picture)", idx: 3131 },
    { label: "Director of the Board", idx: 1210 },
    { label: "Director, corporation", idx: 1210 },
    { label: "Director, finance", idx: 1231 },
    { label: "Director, government agency", idx: 1110 },
    { label: "Director, motion picture", idx: 2455 },
    { label: "Director, radio or television", idx: 2455 },
    { label: "Director-General", idx: 1110 },
    { label: "Disbursing clerk", idx: 4211 },
    { label: "Dishwasher", idx: 9131 },
    { label: "Disk jockey", idx: 3472 },
    { label: "Dispatch rider", idx: 8321 },
    { label: "Dispatcher, aircraft ", idx: 4133 },
    { label: "Dispatcher, road transport ", idx: 4133 },
    { label: "Dispatcher, train ", idx: 4133 },
    { label: "Distribution manager", idx: 1235 },
    { label: "Diver, oyster", idx: 6490 },
    { label: "Diver, pearl", idx: 6490 },
    { label: "Dock master, dry-dock", idx: 3115 },
    { label: "Docker", idx: 9333 },
    { label: "Dockman-diver", idx: 8340 },
    { label: "Dockman-rigger", idx: 8340 },
    { label: "Doctor, medical", idx: 2221 },
    { label: "Doctor's receptionist", idx: 4222 },
    { label: "Documentation Engineer Computer Graphic artist", idx: 2131 },
    { label: "Domestic cleaner", idx: 9131 },
    { label: "Domestic helper", idx: 9131 },
    { label: "Doorkeeper", idx: 9152 },
    { label: "Dorm caretaker", idx: 9141 },
    { label: "Dormitory manager", idx: 3439 },
    { label: "Doubler", idx: 8251 },
    { label: "Draftmans researcher", idx: 3118 },
    { label: "Draftmans technician", idx: 3118 },
    { label: "Draftsman, architectural", idx: 3118 },
    { label: "Draftsman, cartographical", idx: 3118 },
    { label: "Draftsman, civil engineering", idx: 3118 },
    { label: "Draftsman, electrical", idx: 3118 },
    { label: "Draftsman, general", idx: 3118 },
    { label: "Draftsman, mechanical", idx: 3118 },
    { label: "Dredge operator", idx: 8332 },
    { label: "Dredgeman", idx: 8113 },
    { label: "Dressmaker", idx: 7433 },
    { label: "Drier operator, chemical and related processes", idx: 8152 },
    { label: "Drilling machine operator, mine and quarry", idx: 8111 },
    { label: "Drilling machine setter-operator", idx: 7223 },
    { label: "Drilling-machine operator", idx: 8211 },
    { label: "Driver, ambulance", idx: 8322 },
    { label: "Driver, animal drawn vehicle, road", idx: 9332 },
    { label: "Driver, animal train", idx: 9332 },
    { label: "Driver, bus", idx: 8323 },
    { label: "Driver, courier", idx: 8322 },
    { label: "Driver, dump-truck", idx: 8324 },
    { label: "Driver, engine, mine", idx: 8311 },
    { label: "Driver, firetruck", idx: 8324 },
    { label: "Driver, locomotive", idx: 8311 },
    { label: "Driver, school bus", idx: 8323 },
    { label: "Driver, trailer", idx: 8324 },
    { label: "Driver, train", idx: 8311 },
    { label: "Driver, tricycle", idx: 8321 },
    { label: "Drop-hammer worker", idx: 7221 },
    { label: "Drug regulation officer", idx: 3449 },
    { label: "Dry cleaner (hand)", idx: 9133 },
    { label: "Dry-cleaning machine operator", idx: 8254 },
    { label: "Dump truck driver", idx: 8324 },
    { label: "Dumper, garbage", idx: 9161 },
    { label: "Dustman", idx: 9161 },
    { label: "Dustwoman", idx: 9161 },
    { label: "Dyeing machine operator", idx: 8254 },
    { label: "Dyer, leather", idx: 7441 },
    { label: "Echocardiography technician", idx: 3133 },
    { label: "Ecologist", idx: 2211 },
    { label: "E-commerce administrator", idx: 2131 },
    { label: "Econometrician", idx: 2441 },
    { label: "Economic enterprise manager", idx: 1233 },
    { label: "Economist (General)", idx: 2441 },
    { label: "Economist (Specialized)", idx: 2441 },
    { label: "Edge sawyer", idx: 8141 },
    { label: "Edible oils, press operator", idx: 8265 },
    { label: "EDP data controller", idx: 2132 },
    { label: "EDP Input machine operator", idx: 3122 },
    { label: "Education methods adviser", idx: 2391 },
    { label: "EENT (ear,eyes,nose,throat) technician", idx: 3133 },
    { label: "Election field officer", idx: 3439 },
    { label: "Electric arc furnaceman, steel refining", idx: 8121 },
    { label: "Electric power generation engineer", idx: 2152 },
    { label: "Electrical control operator", idx: 3139 },
    { label: "Electrical engineer (general)", idx: 2152 },
    { label: "Electrical fitter", idx: 7242 },
    { label: "Electrician, aircraft", idx: 7241 },
    { label: "Electrician, building", idx: 7241 },
    { label: "Electrician, general", idx: 7241 },
    { label: "Electrician, maintenance", idx: 7241 },
    { label: "Electrician, ship's", idx: 7241 },
    { label: "Electrician, stage and studio", idx: 7241 },
    { label: "Electrician, vehicle", idx: 7241 },
    { label: "Electricity and magnetism physicist", idx: 2111 },
    { label: "Electro-cardiograph technician", idx: 3133 },
    { label: "Electromechanical equipment engineer", idx: 2152 },
    { label: "Electronic equipment assembler", idx: 8273 },
    { label: "Electronics engineer (general)", idx: 2153 },
    { label: "Electronics physicist", idx: 2111 },
    { label: "Electroplater", idx: 8223 },
    { label: "Electrotyper", idx: 7342 },
    { label: "Elevated train driver", idx: 8311 },
    { label: "Embalmer", idx: 5153 },
    { label: "Embroiderer", idx: 7435 },
    { label: "Embroiderer, multi-head machine", idx: 7435 },
    { label: "Embroidering machine operator", idx: 8253 },
    { label: "Enameller, glass", idx: 7324 },
    { label: "Enforcement & intelligence officer", idx: 3450 },
    { label: "Engine driver, mine and quarry", idx: 8311 },
    { label: "Engineer, aerodrome construction", idx: 2151 },
    { label: "Engineer, aeronautical", idx: 2154 },
    { label: "Engineer, agricultural", idx: 2154 },
    { label: "Engineer, automotive", idx: 2154 },
    { label: "Engineer, bridge construction", idx: 2151 },
    { label: "Engineer, building construction", idx: 2151 },
    { label: "Engineer, cartographic", idx: 2157 },
    { label: "Engineer, chemical", idx: 2155 },
    { label: "Engineer, chemical (general)", idx: 2155 },
    { label: "Engineer, chemical process", idx: 2155 },
    { label: "Engineer, civil (General)", idx: 2151 },
    { label: "Engineer, computer", idx: 2153 },
    { label: "Engineer, electrical", idx: 2152 },
    { label: "Engineer, electromechanical equipment", idx: 2152 },
    { label: "Engineer, electronics", idx: 2153 },
    { label: "Engineer, geodetic", idx: 2157 },
    { label: "Engineer, heating, ventilation and refrigeration", idx: 2154 },
    { label: "Engineer, highway construction", idx: 2151 },
    { label: "Engineer, hydraulics", idx: 2151 },
    { label: "Engineer, industrial", idx: 2158 },
    { label: "Engineer, industrial efficiency", idx: 2158 },
    { label: "Engineer, industrial machinery and tools", idx: 2154 },
    { label: "Engineer, marine", idx: 2154 },
    { label: "Engineer, mechanical", idx: 2154 },
    { label: "Engineer, mechanical (general)", idx: 2154 },
    { label: "Engineer, methods", idx: 2158 },
    { label: "Engineer, mining (general)", idx: 2156 },
    { label: "Engineer, mining, coal", idx: 2156 },
    { label: "Engineer, mining, metal", idx: 2156 },
    { label: "Engineer, nuclear power", idx: 2154 },
    { label: "Engineer, outside plant", idx: 2153 },
    { label: "Engineer, petroleum and natural gas, chemical", idx: 2155 },
    { label: "Engineer, petroleum and natural gas, mining", idx: 2156 },
    { label: "Engineer, production", idx: 2158 },
    { label: "Engineer, public health", idx: 2151 },
    { label: "Engineer, radio transmission", idx: 2153 },
    { label: "Engineer, railway construction", idx: 2151 },
    { label: "Engineer, robotics", idx: 8172 },
    { label: "Engineer, sanitary engineer", idx: 2151 },
    { label: "Engineer, ship", idx: 3141 },
    { label: "Engineer, ship construction", idx: 2154 },
    { label: "Engineer, ship's, chief", idx: 3141 },
    { label: "Engineer, soil mechanics", idx: 2151 },
    { label: "Engineer, street construction", idx: 2151 },
    { label: "Engineer, structural", idx: 2151 },
    { label: "Engineer, telecommunications", idx: 2153 },
    { label: "Engineer, time and motion study", idx: 2158 },
    { label: "Engineering geologist", idx: 2114 },
    { label: "Engineering/electronics technologist", idx: 2153 },
    { label: "Engineering/telecommunications engineer", idx: 2153 },
    { label: "Engraver and etcher (Artistics)", idx: 2452 },
    { label: "Engraver, jewelry", idx: 7313 },
    { label: "Engraver, linoleum block, hand", idx: 7343 },
    { label: "Engraver, lithographic stone", idx: 7343 },
    { label: "Engraver, metal printing die, hand", idx: 7343 },
    { label: "Engraver, metal printing plate, hand", idx: 7343 },
    { label: "Engraver, metal printing roller, hand", idx: 7343 },
    { label: "Engraver, metal printing roller, machine", idx: 7343 },
    { label: "Engraver, printing", idx: 7343 },
    { label: "Engraver, rubber, hand", idx: 7343 },
    { label: "Engraver, wood, hand", idx: 7343 },
    { label: "Engravers, glass", idx: 7323 },
    { label: "Enlarger, photograph", idx: 7344 },
    { label: "Enlisted personnel not elsewhere classified (AFP)", idx: 129 },
    { label: "Entomologist", idx: 2211 },
    { label: "Entry & Exit Vessels  Processing technician", idx: 3141 },
    { label: "Environmental sanitation inspector", idx: 3152 },
    { label: "Environmentalist", idx: 2449 },
    { label: "Epidemiologist, veterinary", idx: 2223 },
    { label: "Erector, radioaerial", idx: 7244 },
    { label: "Erector, structural metal", idx: 7214 },
    { label: "Escort", idx: 5159 },
    { label: "Estate agents", idx: 3413 },
    { label: "Estate management officer", idx: 3413 },
    { label: "Etcher, glass", idx: 7323 },
    { label: "Etcher, metal engraving", idx: 7343 },
    { label: "Etcher, photogravure", idx: 7343 },
    { label: "Etcher, printing", idx: 7343 },
    { label: "Ethnologist", idx: 2442 },
    { label: "Evaporator operator", idx: 8154 },
    { label: "Examiner", idx: 2411 },
    { label: "Excavating machine operator", idx: 8332 },
    { label: "Executive Assistant, organization/enterprise", idx: 1210 },
    { label: "Executive Director", idx: 1110 },
    { label: "Executive sales agent", idx: 3415 },
    { label: "Executive Secretary", idx: 3431 },
    { label: "Executive Secretary, Office of the President", idx: 1110 },
    { label: "Executive Vice-Pres., organization/enterprise", idx: 1210 },
    { label: "Expeller, oil", idx: 7414 },
    { label: "Experienced worker seeking reemployment", idx: 920 },
    { label: "Extractor operator", idx: 6330 },
    { label: "Extruder operator, metal", idx: 8124 },
    { label: "Fabric dyer", idx: 8254 },
    { label: "Fabric examiner", idx: 7432 },
    { label: "Fabric repairer", idx: 7432 },
    { label: "Faith healer", idx: 3242 },
    { label: "Faller", idx: 6320 },
    { label: "Family caseworker", idx: 2446 },
    { label: "Farm demo technician", idx: 3212 },
    { label: "Farm demonstrator", idx: 3212 },
    { label: "Farm extension service officer", idx: 3212 },
    { label: "Farm foreman", idx: 1430 },
    { label: "Farm machinery mechanic", idx: 7234 },
    { label: "Farm management technician", idx: 3212 },
    { label: "Farm technician", idx: 3212 },
    { label: "Farmer, abaca ", idx: 6115 },
    { label: "Farmer, African oil palm", idx: 6123 },
    { label: "Farmer, agave ", idx: 6115 },
    { label: "Farmer, alligator ", idx: 6290 },
    { label: "Farmer, banana ", idx: 6122 },
    { label: "Farmer, bean", idx: 6114 },
    { label: "Farmer, black pepper", idx: 6119 },
    { label: "Farmer, cabbage", idx: 6114 },
    { label: "Farmer, cacao", idx: 6124 },
    { label: "Farmer, carabao ", idx: 6219 },
    { label: "Farmer, cashew nut", idx: 6123 },
    { label: "Farmer, cassava", idx: 6116 },
    { label: "Farmer, cattle", idx: 6211 },
    { label: "Farmer, chicken ", idx: 6221 },
    { label: "Farmer, citrus ", idx: 6122 },
    { label: "Farmer, coconut", idx: 6121 },
    { label: "Farmer, coffee", idx: 6124 },
    { label: "Farmer, cotton ", idx: 6115 },
    { label: "Farmer, crocodile ", idx: 6290 },
    { label: "Farmer, dairy", idx: 6211 },
    { label: "Farmer, deer", idx: 6219 },
    { label: "Farmer, eggplant", idx: 6114 },
    { label: "Farmer, gabi", idx: 6116 },
    { label: "Farmer, game cock ", idx: 6290 },
    { label: "Farmer, garlic", idx: 6119 },
    { label: "Farmer, geese ", idx: 6229 },
    { label: "Farmer, ginger", idx: 6119 },
    { label: "Farmer, goat ", idx: 6219 },
    { label: "Farmer, grapevine", idx: 6129 },
    { label: "Farmer, hog raising", idx: 6212 },
    { label: "Farmer, jute ", idx: 6115 },
    { label: "Farmer, kapok", idx: 6115 },
    { label: "Farmer, kenaf ", idx: 6115 },
    { label: "Farmer, maguey ", idx: 6115 },
    { label: "Farmer, mango", idx: 6122 },
    { label: "Farmer, mongo beans", idx: 6117 },
    { label: "Farmer, papaya", idx: 6122 },
    { label: "Farmer, passion fruit", idx: 6129 },
    { label: "Farmer, peanuts", idx: 6117 },
    { label: "Farmer, pechay", idx: 6114 },
    { label: "Farmer, pili nut", idx: 6123 },
    { label: "Farmer, pineapple", idx: 6119 },
    { label: "Farmer, quail ", idx: 6229 },
    { label: "Farmer, ramie ", idx: 6115 },
    { label: "Farmer, root and tuber crop ", idx: 6114 },
    { label: "Farmer, root and tuberous vegetable ", idx: 6114 },
    { label: "Farmer, rubber tree", idx: 6129 },
    { label: "Farmer, salago", idx: 6115 },
    { label: "Farmer, sisal ", idx: 6115 },
    { label: "Farmer, soy bean", idx: 6117 },
    { label: "Farmer, spices and condiments ", idx: 6114 },
    { label: "Farmer, sweet potato", idx: 6116 },
    { label: "Farmer, tea", idx: 6129 },
    { label: "Farmer, tobacco", idx: 6119 },
    { label: "Farmer, tomato", idx: 6114 },
    { label: "Farmer, tree nut", idx: 6123 },
    { label: "Farmer, turkey ", idx: 6229 },
    { label: "Farmer, turtle ", idx: 6290 },
    { label: "Farmer, vineyard", idx: 6122 },
    { label: "Farmer, white potato (Irish potato)", idx: 6116 },
    { label: "Farmer,beans and peas, except soybean", idx: 6114 },
    { label: "Farmer,ube", idx: 6116 },
    { label: "Farmhand", idx: 9211 },
    { label: "Farming adviser", idx: 2213 },
    { label: "Fashion designer", idx: 3471 },
    { label: "Feature Writer", idx: 2451 },
    { label: "Felt hood former", idx: 8259 },
    { label: "Fengshui ", idx: 5142 },
    { label: "Fermenting room man", idx: 8268 },
    { label: "Fiber aide", idx: 7431 },
    { label: "Fiber blender", idx: 7431 },
    { label: "Fiber carder", idx: 7431 },
    { label: "Fiber classer", idx: 7431 },
    { label: "Fiber comber, textile", idx: 7431 },
    { label: "Fiber development officer", idx: 2214 },
    { label: "Fiber drawer, textile", idx: 7431 },
    { label: "Fiber grader", idx: 7431 },
    { label: "Fiber lapper", idx: 7431 },
    { label: "Fiber mixer", idx: 7431 },
    { label: "Fiber picker", idx: 7431 },
    { label: "Fiber preparer", idx: 7431 },
    { label: "Fiber preparing machine operator", idx: 8251 },
    { label: "Fiber rover, textile", idx: 7431 },
    { label: "Fiber technician", idx: 7431 },
    { label: "Fiberglass maker", idx: 8139 },
    { label: "Field clerk", idx: 4190 },
    { label: "Field reporter", idx: 3472 },
    { label: "Fighter Pilot", idx: 3143 },
    { label: "Fighter Pilot Escape & Evasion Training Instructor", idx: 2320 },
    { label: "Filater press operator, chemical and related materials", idx: 8153 },
    { label: "Film custodian", idx: 3131 },
    { label: "Film editor", idx: 3131 },
    { label: "Film preview assistant", idx: 3131 },
    { label: "Final audit process engineer", idx: 2411 },
    { label: "Finance associate professional, n.e.c.", idx: 3419 },
    { label: "Financial Planner/analyst", idx: 2411 },
    { label: "Finisher, glass", idx: 7322 },
    { label: "Finisher, wooden furniture", idx: 7422 },
    { label: "Finishing machine operator", idx: 8254 },
    { label: "Fire aide", idx: 5161 },
    { label: "Fire captain", idx: 3151 },
    { label: "Fire control officer", idx: 3151 },
    { label: "Fire inspector", idx: 3151 },
    { label: "Fire marshall", idx: 3151 },
    { label: "Fire protection specialist", idx: 3151 },
    { label: "Firebrick layer", idx: 7122 },
    { label: "Fire-brigade/marshall", idx: 5161 },
    { label: "Fire-fighter (General)", idx: 5161 },
    { label: "Firefighter specialist", idx: 3151 },
    { label: "Fire-fighting operative", idx: 5161 },
    { label: "Fireman", idx: 5161 },
    { label: "Fire-prevention specialist", idx: 3151 },
    { label: "Fire-salvaged specialist", idx: 5161 },
    { label: "First mate", idx: 3142 },
    { label: "Fiscal", idx: 2421 },
    { label: "Fiscal examiner", idx: 3432 },
    { label: "Fish processing machine operator", idx: 8261 },
    { label: "Fishermen, coastal waters ", idx: 6420 },
    { label: "Fishermen, deep-sea ", idx: 6430 },
    { label: "Fishermen, inland waters ", idx: 6420 },
    { label: "Fishery caretaker", idx: 9213 },
    { label: "Fishery enforcer", idx: 3219 },
    { label: "Fishery enumerator", idx: 3219 },
    { label: "Fishery helper", idx: 9213 },
    { label: "Fishery laborer", idx: 9213 },
    { label: "Fishery product inspector", idx: 3219 },
    { label: "Fishery technician", idx: 3219 },
    { label: "Fishmonger", idx: 7411 },
    { label: "Fitter, agricultural machinery", idx: 7234 },
    { label: "Fitter, aircraft engine", idx: 7232 },
    { label: "Fitter, aircraft, pipe and tube", idx: 7136 },
    { label: "Fitter, earth-moving equipment", idx: 7234 },
    { label: "Fitter, electrical", idx: 7242 },
    { label: "Fitter, electrical elevator", idx: 7242 },
    { label: "Fitter, electrical generator", idx: 7242 },
    { label: "Fitter, electrical instrument", idx: 7242 },
    { label: "Fitter, electrical motor", idx: 7242 },
    { label: "Fitter, electrical switchgear and control apparatus", idx: 7242 },
    { label: "Fitter, electrical transformer", idx: 7242 },
    { label: "Fitter, electrical, general", idx: 7242 },
    { label: "Fitter, electronic computer", idx: 7243 },
    { label: "Fitter, electronic signalling systems", idx: 7243 },
    { label: "Fitter, electronics, general", idx: 7243 },
    { label: "Fitter, engine marine", idx: 7233 },
    { label: "Fitter, industrial equipment", idx: 7243 },
    { label: "Fitter, medical equipment", idx: 7243 },
    { label: "Fitter, metalworking machine tool", idx: 7234 },
    { label: "Fitter, mining machinery", idx: 7234 },
    { label: "Fitter, office machinery", idx: 7234 },
    { label: "Fitter, printing machinery", idx: 7234 },
    { label: "Fitter, radar equipment", idx: 7243 },
    { label: "Fitter, radio", idx: 7243 },
    { label: "Fitter, television", idx: 7243 },
    { label: "Fitter, textile machinery", idx: 7234 },
    { label: "Fitter, turbine (except aircraft and marine)", idx: 7234 },
    { label: "Fitter, woodworking machinery", idx: 7234 },
    { label: "Fitter-assembler, internal combustion engine, except ac and marine", idx: 8271 },
    { label: "Flesher, hide", idx: 7441 },
    { label: "Flight engineer", idx: 3143 },
    { label: "Flight instructor", idx: 2320 },
    { label: "Flight navigator", idx: 3143 },
    { label: "Flight radio operator", idx: 3132 },
    { label: "Flight stewardess", idx: 5111 },
    { label: "Floatation worker, mineral", idx: 8112 },
    { label: "Float-glass bath operator", idx: 8131 },
    { label: "Flutist", idx: 2453 },
    { label: "Food attendant", idx: 5123 },
    { label: "Food chemist", idx: 2113 },
    { label: "Food grader", idx: 7415 },
    { label: "Food packer", idx: 9322 },
    { label: "Food preparer", idx: 7411 },
    { label: "Food preserver", idx: 7414 },
    { label: "Food production coordinator", idx: 1222 },
    { label: "Food production supervisor", idx: 1430 },
    { label: "Food repacker", idx: 9322 },
    { label: "Food server", idx: 5123 },
    { label: "Food taster", idx: 7415 },
    { label: "Food-drug regulation officer", idx: 2229 },
    { label: "Foodstuffs dehydrator", idx: 8265 },
    { label: "Foreman, general", idx: 1430 },
    { label: "Forensic chemist", idx: 2113 },
    { label: "Forest concession guard", idx: 3449 },
    { label: "Forest Ranger", idx: 2214 },
    { label: "Forest ranger", idx: 6310 },
    { label: "Forest technician", idx: 6310 },
    { label: "Forester", idx: 2214 },
    { label: "Forestry laborer", idx: 9212 },
    { label: "Forestry technician", idx: 3219 },
    { label: "Forging press worker", idx: 7221 },
    { label: "Fork lift operator", idx: 8334 },
    { label: "Fortune teller", idx: 5142 },
    { label: "Forwarding agent", idx: 3422 },
    { label: "Foundry worker", idx: 7222 },
    { label: "Franchise area manager", idx: 1317 },
    { label: "Franchise relation officer", idx: 3415 },
    { label: "Freezer, meat and fish", idx: 8261 },
    { label: "Freight & shipping specialist", idx: 3142 },
    { label: "Freight handler", idx: 9333 },
    { label: "Fruit and vegetable processing machine operator", idx: 8265 },
    { label: "Fruit press operator", idx: 8265 },
    { label: "Fuel tender", idx: 8159 },
    { label: "Fumigation supervisor", idx: 2229 },
    { label: "Fumigator", idx: 3219 },
    { label: "Funeral undertaker", idx: 5153 },
    { label: "Fur bearing animal farm worker", idx: 9211 },
    { label: "Fur fiber mixer, machine", idx: 8259 },
    { label: "Furnace operator, converting, non-ferrous metal", idx: 8121 },
    { label: "Furnace operator, hardening, metal", idx: 8123 },
    { label: "Furnace operator, heat-treating, metal", idx: 8123 },
    { label: "Furnace operator, melting, metal", idx: 8122 },
    { label: "Furnace operator, refining, steel, openhearth furnace", idx: 8121 },
    { label: "Furnace operator, smelting, metal, blast furnace", idx: 8121 },
    { label: "Furnaceman, metal melting, except cupola", idx: 8122 },
    { label: "Furnaceman, metal reheating", idx: 8122 },
    { label: "Furnaceman, non-ferrous metal converting and refining", idx: 8121 },
    { label: "Furnace-operator, glass production", idx: 8131 },
    { label: "Geographer", idx: 2442 },
    { label: "Geological scientist", idx: 2114 },
    { label: "Geologist", idx: 2114 },
    { label: "Geophysical scientist", idx: 2114 },
    { label: "Geophysicist", idx: 2114 },
    { label: "Germination worker, malting", idx: 8268 },
    { label: "Glass former", idx: 8139 },
    { label: "Glass kiln operator", idx: 8131 },
    { label: "Glass mixer", idx: 8139 },
    { label: "Glass plant operator", idx: 8139 },
    { label: "Glass temperer", idx: 8131 },
    { label: "Glass tube maker", idx: 8131 },
    { label: "Glass-annealing furnaceman", idx: 8131 },
    { label: "Glass-drawing machine operator", idx: 8131 },
    { label: "Glass-making furnaceman", idx: 8131 },
    { label: "Glass-pressing machine operator", idx: 8131 },
    { label: "Glaze maker", idx: 8139 },
    { label: "Glazier", idx: 7135 },
    { label: "Glazier, building", idx: 7135 },
    { label: "Glazier, construction", idx: 7135 },
    { label: "Glazier, leaded-glass", idx: 7135 },
    { label: "Glazier, patent roofing", idx: 7135 },
    { label: "Glazier, plate-glass", idx: 7135 },
    { label: "Glazier, roofing", idx: 7135 },
    { label: "Glazier, vehicle", idx: 7135 },
    { label: "Glove cutter", idx: 7434 },
    { label: "Glove, cutter, leather", idx: 7434 },
    { label: "Gold panner", idx: 9311 },
    { label: "Goldsmith", idx: 7313 },
    { label: "Golf caddie", idx: 9152 },
    { label: "Government Administrator", idx: 1110 },
    { label: "Government licensing official", idx: 3444 },
    { label: "Government social benefits official", idx: 3443 },
    { label: "Government tax and excise official", idx: 3442 },
    { label: "Governor  ", idx: 1120 },
    { label: "Governor of the Central Bank", idx: 1110 },
    { label: "Grader, hide and skin", idx: 7441 },
    { label: "Grader, stone", idx: 7113 },
    { label: "Grader, tobacco", idx: 7416 },
    { label: "Graft investigation officer", idx: 2423 },
    { label: "Grain milling machine operator", idx: 8263 },
    { label: "Grave digger", idx: 5153 },
    { label: "Greaser", idx: 7233 },
    { label: "Greenkeeper", idx: 9131 },
    { label: "Grinder, card", idx: 7224 },
    { label: "Grinder, glass edge", idx: 7322 },
    { label: "Grinder, textile card", idx: 7224 },
    { label: "Grinding equipment operator", idx: 8151 },
    { label: "Grinding machinery operator", idx: 8151 },
    { label: "Ground signalling technician", idx: 3145 },
    { label: "Groundskeeper", idx: 9141 },
    { label: "Groundsman", idx: 9211 },
    { label: "Grower, insecticidal plant", idx: 6139 },
    { label: "Grower, medicinal plant", idx: 6139 },
    { label: "Grower, nursery", idx: 6131 },
    { label: "Grower, orchid plant", idx: 6131 },
    { label: "Grower, ornamental plant", idx: 6131 },
    { label: "Grower, perfumery plant", idx: 6139 },
    { label: "Grower, rose", idx: 6131 },
    { label: "Grower, seaweed", idx: 6414 },
    { label: "Grower, shellfish ", idx: 6419 },
    { label: "Guard patrol", idx: 5169 },
    { label: "Guide, sightseeing ", idx: 5113 },
    { label: "Guide, travel ", idx: 5113 },
    { label: "Gunsmith", idx: 7222 },
    { label: "Gynecologist", idx: 2221 },
    { label: "Hairdresser", idx: 5151 },
    { label: "Hammersmith", idx: 7221 },
    { label: "Hand compositor", idx: 7341 },
    { label: "Hand embroiderer", idx: 7435 },
    { label: "Hand launderers and pressers", idx: 9133 },
    { label: "Hand packer", idx: 9322 },
    { label: "Hand riveter", idx: 7214 },
    { label: "Hand sewer", idx: 7435 },
    { label: "Hand sewer, fur", idx: 7435 },
    { label: "Hand sewer, leather", idx: 7435 },
    { label: "Hand-dipper", idx: 7324 },
    { label: "Handicraft designer", idx: 7331 },
    { label: "Handicraft laborer (unskilled)", idx: 9321 },
    { label: "Handicraft model maker", idx: 7331 },
    { label: "Handicraft worker, carpet", idx: 7332 },
    { label: "Handicraft worker, leather", idx: 7332 },
    { label: "Handicraft worker, paper", idx: 7331 },
    { label: "Handicraft worker, stone articles", idx: 7331 },
    { label: "Handicraft worker, textile", idx: 7332 },
    { label: "Handicraft worker, wooden articles", idx: 7331 },
    { label: "Harbor master", idx: 3142 },
    { label: "Harbor patrol", idx: 5169 },
    { label: "Hardener", idx: 8123 },
    { label: "Harvester operator", idx: 8331 },
    { label: "Hat blocking machine operator", idx: 8259 },
    { label: "Hatter", idx: 7433 },
    { label: "Head cook", idx: 5122 },
    { label: "Head waiter", idx: 5123 },
    { label: "Head, village/tribe", idx: 1130 },
    { label: "Healer, drugless treatment", idx: 3241 },
    { label: "Healer, herbal", idx: 3241 },
    { label: "Health physics technician", idx: 3119 },
    { label: "Health program research assistant", idx: 3221 },
    { label: "Health program researcher", idx: 3221 },
    { label: "Healthcare analyst", idx: 3229 },
    { label: "Heat physicist", idx: 2111 },
    { label: "Heating equipment operator", idx: 8163 },
    { label: "Heavy equipment operator", idx: 8332 },
    { label: "Heavy truck driver", idx: 8324 },
    { label: "Historian", idx: 2443 },
    { label: "Hoist operator, construction", idx: 8333 },
    { label: "Hoist operator, mine", idx: 8333 },
    { label: "Home economist", idx: 2419 },
    { label: "Home-based personal care worker", idx: 5133 },
    { label: "Homeopath", idx: 3229 },
    { label: "Honing-machine setter operator", idx: 7223 },
    { label: "Horticulture analyst", idx: 3212 },
    { label: "Horticulturist", idx: 2213 },
    { label: "Hospital aide", idx: 5132 },
    { label: "Hospital attendant", idx: 5132 },
    { label: "Hospitality girl", idx: 5159 },
    { label: "Hostess", idx: 5159 },
    { label: "Hot roller, steel", idx: 8122 },
    { label: "Hot-dip plater", idx: 8223 },
    { label: "Hotel concierge", idx: 5139 },
    { label: "Hotel receptionist", idx: 4222 },
    { label: "House detective ( Hotel)", idx: 5169 },
    { label: "House painter", idx: 7141 },
    { label: "House steward", idx: 5121 },
    { label: "Houseboy", idx: 9131 },
    { label: "Housebuilder (except traditional materials)", idx: 7123 },
    { label: "Housekeeper (institutional)", idx: 5121 },
    { label: "Housekeeper (private service)", idx: 5121 },
    { label: "Housemaid", idx: 9131 },
    { label: "Houseparent", idx: 5133 },
    { label: "Housing & Home site regulation officer", idx: 3413 },
    { label: "Human resource development specialist", idx: 2412 },
    { label: "Hunter", idx: 6510 },
    { label: "Hunting laborer", idx: 9214 },
    { label: "Hydraulic, back hoe, excavator operator", idx: 8332 },
    { label: "Hydroelectric station operator", idx: 8161 },
    { label: "Hydrogenation operator, oils and fats", idx: 8265 },
    { label: "Hydro-geologist", idx: 2114 },
    { label: "Ice cream machine operator", idx: 8262 },
    { label: "Illustrator", idx: 2452 },
    { label: "Illustrator, technical", idx: 3118 },
    { label: "Imam", idx: 2460 },
    { label: "Immigrant services officer", idx: 3441 },
    { label: "Immigration officer", idx: 3441 },
    { label: "Impersonator", idx: 8163 },
    { label: "Imposer", idx: 2158 },
    { label: "Impresario", idx: 2412 },
    { label: "Industrial robot operator", idx: 8172 },
    { label: "Industrial security inspector", idx: 3450 },
    { label: "Info communication service officer", idx: 1429 },
    { label: "Information clerk", idx: 4222 },
    { label: "Information editor", idx: 2451 },
    { label: "Information technologist", idx: 2139 },
    { label: "Information technology officer", idx: 2131 },
    { label: "In-house counsel", idx: 2423 },
    { label: "Inlayer, marquetry", idx: 7422 },
    { label: "In-line reviser", idx: 3119 },
    { label: "Inmate guidance officer", idx: 5163 },
    { label: "Inorganic chemist", idx: 2113 },
    { label: "Inspector, claims", idx: 3417 },
    { label: "Inspector, electrical products", idx: 7242 },
    { label: "Inspector, electronic products", idx: 7243 },
    { label: "Inspector, government health", idx: 3152 },
    { label: "Inspector, mechanical products", idx: 7233 },
    { label: "Inspector, postal", idx: 1425 },
    { label: "Inspector, quality", idx: 3152 },
    { label: "Inspector, safety", idx: 3152 },
    { label: "Inspector, sales", idx: 1449 },
    { label: "Inspector, transport service, railway", idx: 1429 },
    { label: "Inspector, vehicles/pollution", idx: 3152 },
    { label: "Inspector, zoning", idx: 3152 },
    { label: "Installer, airconditioning plant", idx: 7233 },
    { label: "Installer, central office equipment", idx: 7245 },
    { label: "Installer, radio equipment", idx: 7245 },
    { label: "Installer, refrigeration plant", idx: 7233 },
    { label: "Installer, telecommunication equipment", idx: 7245 },
    { label: "Installer, telegraph", idx: 7245 },
    { label: "Installer, telephone", idx: 7245 },
    { label: "Institutional worker", idx: 5121 },
    { label: "Institution-based personal care worker", idx: 5132 },
    { label: "Instruction supervisor", idx: 1412 },
    { label: "Instrument technician", idx: 3119 },
    { label: "Instrumentalist", idx: 2453 },
    { label: "Insulation worker", idx: 7134 },
    { label: "Insulation worker, acoustical", idx: 7134 },
    { label: "Insulator, air-conditioning equipment", idx: 7134 },
    { label: "Insulator, boiler", idx: 7134 },
    { label: "Insulator, building, general", idx: 7134 },
    { label: "Insulator, building, machine", idx: 7134 },
    { label: "Insulator, pipe", idx: 7134 },
    { label: "Insulator, refrigeration equipment", idx: 7134 },
    { label: "Insurance adjuster", idx: 3412 },
    { label: "Insurance assistant", idx: 3432 },
    { label: "Insurance examiner", idx: 3412 },
    { label: "Insurance representatives", idx: 3412 },
    { label: "Insurance risk analyst", idx: 3443 },
    { label: "Insurance salesman", idx: 3412 },
    { label: "Integrated social forestry technician", idx: 3219 },
    { label: "Intelligence agent", idx: 3450 },
    { label: "Interior decorator", idx: 3471 },
    { label: "Internal combustion engine fitter-assembler", idx: 7231 },
    { label: "Interpreter", idx: 2444 },
    { label: "Interviewer, media", idx: 3472 },
    { label: "Investigation agent", idx: 3450 },
    { label: "Investigator, police", idx: 3450 },
    { label: "Investment development analyst", idx: 2419 },
    { label: "IPC & staff inventory supervisor", idx: 2139 },
    { label: "Iron works fabricator", idx: 7214 },
    { label: "Irrigator", idx: 9211 },
    { label: "ISP supervisor", idx: 1429 },
    { label: "IT and LAN technician", idx: 3122 },
    { label: "Jacquard card cutter", idx: 8252 },
    { label: "Jacquard design copyist", idx: 8252 },
    { label: "Jacquard weaver", idx: 8252 },
    { label: "Jail guard", idx: 5163 },
    { label: "Janitor", idx: 9132 },
    { label: "Jeweller, general", idx: 7313 },
    { label: "Jewelry caster, hand", idx: 7313 },
    { label: "Jewelry caster, machine", idx: 7313 },
    { label: "Jewelry finisher", idx: 7313 },
    { label: "Jewelry polisher", idx: 7313 },
    { label: "Jig maker", idx: 7222 },
    { label: "Jig tender", idx: 8112 },
    { label: "Jiggerman, pottery and porcelain", idx: 7321 },
    { label: "Job placement officer", idx: 3423 },
    { label: "Joiner", idx: 7123 },
    { label: "Joiner, aircraft", idx: 7123 },
    { label: "Joiner, construction", idx: 7123 },
    { label: "Jointer, electric cable", idx: 7246 },
    { label: "Journalist", idx: 2451 },
    { label: "Judge", idx: 2422 },
    { label: "Judicial Officer", idx: 2421 },
    { label: "Judicial staff officer", idx: 2423 },
    { label: "Justice", idx: 2423 },
    { label: "Kaingeros", idx: 9212 },
    { label: "Kapok, farmer", idx: 6115 },
    { label: "Key-punch operator", idx: 4113 },
    { label: "Kilnman, brick and tile", idx: 8131 },
    { label: "Kilnman, malting", idx: 8268 },
    { label: "Kilnman, porcelain", idx: 8131 },
    { label: "Kilnman, pottery", idx: 8131 },
    { label: "Kiln-operator, brick and tile", idx: 8131 },
    { label: "Kiln-operator, chemical and related processes", idx: 8152 },
    { label: "Kiln-operator, porcelain", idx: 8131 },
    { label: "Kiln-operator, pottery ", idx: 8131 },
    { label: "Kitchen helper", idx: 9131 },
    { label: "Knitter", idx: 7432 },
    { label: "Knitter, hand-operated machine", idx: 7432 },
    { label: "Knitting machine operator, garment", idx: 8252 },
    { label: "Knitting machine operator, hosiery", idx: 8252 },
    { label: "Knitting machine setter", idx: 8252 },
    { label: "Kutsero", idx: 9332 },
    { label: "Labor & General foreman", idx: 1430 },
    { label: "Labor contractor", idx: 3423 },
    { label: "Laboratory clerk", idx: 4190 },
    { label: "Laboratory technician", idx: 3119 },
    { label: "Laborer, construction", idx: 9312 },
    { label: "Laborer, construction building", idx: 9313 },
    { label: "Laborer, demolition", idx: 9313 },
    { label: "Laborer, maintenance", idx: 9312 },
    { label: "Laborer, manufacturing", idx: 9322 },
    { label: "Laborer, mining", idx: 9311 },
    { label: "Lace weaver, machine", idx: 8252 },
    { label: "Laminator, plastic", idx: 7345 },
    { label: "Land management officer", idx: 3449 },
    { label: "Language researcher", idx: 2444 },
    { label: "Laser private operator", idx: 3133 },
    { label: "Laster", idx: 7442 },
    { label: "Lathe operator, capstan, metalworking", idx: 8211 },
    { label: "Lathe setter-operator", idx: 7223 },
    { label: "Launch master", idx: 3142 },
    { label: "Launch patron", idx: 3142 },
    { label: "Launch service supervisor", idx: 3142 },
    { label: "Launderer, general", idx: 8254 },
    { label: "Launderer, hand", idx: 9133 },
    { label: "Laundering machine operator", idx: 8254 },
    { label: "Laundry machine operator", idx: 8254 },
    { label: "Laundry pressing machine operator", idx: 8254 },
    { label: "Lawyer", idx: 2421 },
    { label: "Lay evangelist", idx: 3480 },
    { label: "Lay minister", idx: 3480 },
    { label: "Lay preacher", idx: 3480 },
    { label: "Layer, floor", idx: 7132 },
    { label: "Layer, tile, composition", idx: 7132 },
    { label: "Layout man, stonework", idx: 7113 },
    { label: "Leader, political party", idx: 1141 },
    { label: "Leather cutter", idx: 7442 },
    { label: "Leather goods maker, general", idx: 7442 },
    { label: "Leather products assembler", idx: 8276 },
    { label: "Leather sewer, hand", idx: 7442 },
    { label: "Leather sewer, machine", idx: 7442 },
    { label: "Leather-preparing machine operator", idx: 8255 },
    { label: "Lecturer", idx: 2399 },
    { label: "Lecturer, college and university", idx: 2310 },
    { label: "Legal  Councel", idx: 2421 },
    { label: "Legal adviser", idx: 2429 },
    { label: "Legal analyst", idx: 2421 },
    { label: "Legal and related business associate professionals", idx: 3432 },
    { label: "Legal assistant", idx: 3432 },
    { label: "Legal clerk", idx: 3432 },
    { label: "Legal consultant", idx: 2423 },
    { label: "Legal counsellor", idx: 2429 },
    { label: "Legal liason", idx: 2423 },
    { label: "Legal researcher", idx: 2423 },
    { label: "Legislative Official", idx: 1120 },
    { label: "Legislative staff officer", idx: 3432 },
    { label: "Letter carrier", idx: 9151 },
    { label: "Lexicographer", idx: 2444 },
    { label: "Librarian", idx: 2430 },
    { label: "Librarian aide", idx: 4141 },
    { label: "Library assistant", idx: 4141 },
    { label: "License examiner", idx: 3444 },
    { label: "License inspector", idx: 3444 },
    { label: "Licenser", idx: 3444 },
    { label: "Licensing officer", idx: 3444 },
    { label: "Life guard", idx: 5169 },
    { label: "Lifting truck operator", idx: 8334 },
    { label: "Light and optics physicist", idx: 2111 },
    { label: "Light rail transit (LRT) driver", idx: 8311 },
    { label: "Light van driver", idx: 8322 },
    { label: "Lighthouse keeper", idx: 9141 },
    { label: "Lighthouse man", idx: 9152 },
    { label: "Line installer", idx: 7246 },
    { label: "Line technician", idx: 3114 },
    { label: "Lineman", idx: 7246 },
    { label: "Lineman, cable television", idx: 7246 },
    { label: "Lineman, electric power", idx: 7246 },
    { label: "Lineman, electric traction", idx: 7246 },
    { label: "Lineman, telegraph", idx: 7246 },
    { label: "Lineman, telephone", idx: 7246 },
    { label: "Linguistic specialist", idx: 2444 },
    { label: "Linoleum maker", idx: 8229 },
    { label: "Liquor taster", idx: 7415 },
    { label: "Livestock & poultry technican", idx: 3219 },
    { label: "Livestock worker", idx: 9211 },
    { label: "Load dispatcher, electric power", idx: 8161 },
    { label: "Loan processor", idx: 4214 },
    { label: "Local legislative staff officer", idx: 3432 },
    { label: "Lock operator, canal or port", idx: 8163 },
    { label: "Locksmith", idx: 7222 },
    { label: "Locomotive engine driver", idx: 8311 },
    { label: "Log grader", idx: 6320 },
    { label: "Log marker", idx: 6320 },
    { label: "Log scaler", idx: 6320 },
    { label: "Log sorter", idx: 6320 },
    { label: "Logger", idx: 6320 },
    { label: "Logistics clerk", idx: 4122 },
    { label: "Logistics manager", idx: 1235 },
    { label: "Loom threader, machine", idx: 8252 },
    { label: "Loomfixers", idx: 7234 },
    { label: "Lorry driver", idx: 8324 },
    { label: "Lubrication man", idx: 7233 },
    { label: "Luggage porter", idx: 9151 },
    { label: "Lumber grader", idx: 6320 },
    { label: "Lyricist", idx: 2453 },
    { label: "Macaroni maker", idx: 7412 },
    { label: "Machine embroiderer", idx: 8253 },
    { label: "Machine operator, braid production", idx: 8259 },
    { label: "Machine operator, bread production", idx: 8264 },
    { label: "Machine operator, candle production", idx: 8229 },
    { label: "Machine operator, carving, wood", idx: 8240 },
    { label: "Machine operator, chocolate production", idx: 8264 },
    { label: "Machine operator, coating, metal", idx: 8223 },
    { label: "Machine operator, coffee bean processing", idx: 8267 },
    { label: "Machine operator, confectionery production", idx: 8264 },
    { label: "Machine operator, crushing, chemical and related processes", idx: 8151 },
    { label: "Machine operator, drawing, wire", idx: 8124 },
    { label: "Machine operator, extruding, metal", idx: 8124 },
    { label: "Machine operator, extruding, rubber", idx: 8231 },
    { label: "Machine operator, fiber-preparing", idx: 8251 },
    { label: "Machine operator, finishing, metal", idx: 8223 },
    { label: "Machine operator, footwear production", idx: 8256 },
    { label: "Machine operator, furniture production", idx: 8240 },
    { label: "Machine operator, halogen gas production", idx: 8229 },
    { label: "Machine operator, hat-making", idx: 8259 },
    { label: "Machine operator, labelling", idx: 8290 },
    { label: "Machine operator, linoleum production", idx: 8229 },
    { label: "Machine operator, malting, spirits", idx: 8268 },
    { label: "Machine operator, meat processing", idx: 8261 },
    { label: "Machine operator, milling, rubber", idx: 8231 },
    { label: "Machine operator, packing", idx: 8290 },
    { label: "Machine operator, pastry production", idx: 8264 },
    { label: "Machine operator, pattern making, textiles", idx: 8259 },
    { label: "Machine operator, plating, metal", idx: 8223 },
    { label: "Machine operator, soft drinks production", idx: 8268 },
    { label: "Machine operator, staining, leather", idx: 8255 },
    { label: "Machine operator, sugar production", idx: 8266 },
    { label: "Machine operator, tanning", idx: 8255 },
    { label: "Machine operator, tea leaf", idx: 8267 },
    { label: "Machine operator, tire production", idx: 8231 },
    { label: "Machine operator, twisting, thread and yarn", idx: 8251 },
    { label: "Machine operator, weaving", idx: 8252 },
    { label: "Machine operator, winding, thread and yarn", idx: 8251 },
    { label: "Machine operator, wood products", idx: 8240 },
    { label: "Machine operator, woodworking", idx: 8240 },
    { label: "Machine riveter", idx: 7214 },
    { label: "Machine sewer", idx: 7435 },
    { label: "Machine tool operator", idx: 8211 },
    { label: "Machine-operator, ammunition products", idx: 8222 },
    { label: "Machine-operator, blowing, glass", idx: 8131 },
    { label: "Machine-operator, bottling", idx: 8290 },
    { label: "Machine-operator, canning/freezing fruits & vegetables", idx: 8265 },
    { label: "Machine-operator, cast stone products", idx: 8212 },
    { label: "Machine-operator, cast-concrete products", idx: 8212 },
    { label: "Machine-operator, casting, metal", idx: 8122 },
    { label: "Machine-operator, detergent production", idx: 8221 },
    { label: "Machine-operator, developing/photography", idx: 8224 },
    { label: "Machine-operator, enlarging/photography", idx: 8224 },
    { label: "Machine-operator, explosives production", idx: 8222 },
    { label: "Machine-operator, grinding, wood", idx: 8142 },
    { label: "Machine-operator, grinding/chemical and related process", idx: 8151 },
    { label: "Machine-operator, ice cream cones & wafers", idx: 8264 },
    { label: "Machine-operator, leather production", idx: 8256 },
    { label: "Machine-operator, match production", idx: 8222 },
    { label: "Machine-operator, milling/flour", idx: 8263 },
    { label: "Machine-operator, mixer", idx: 8268 },
    { label: "Machine-operator, mixing, chemical and related processes", idx: 8151 },
    { label: "Machine-operator, pharmaceutical products", idx: 8221 },
    { label: "Machine-operator, photographic/film production", idx: 8224 },
    { label: "Machine-operator, printing/photography (black and white)", idx: 8224 },
    { label: "Machine-operator, printing/photography (colour)", idx: 8224 },
    { label: "Machine-operator, snack products such as corn curls", idx: 8264 },
    { label: "Machine-operator, sugarcane crushing", idx: 8266 },
    { label: "Machine-operator, toiletries production", idx: 8221 },
    { label: "Machinery erector and installer", idx: 7233 },
    { label: "Machinery fitter, aircraft engine", idx: 7232 },
    { label: "Machinery fitter, general", idx: 7231 },
    { label: "Machinery fitter-assembler, general", idx: 7231 },
    { label: "Machinery mechanic, general", idx: 7233 },
    { label: "Machine-tool setter", idx: 7223 },
    { label: "Magician", idx: 3474 },
    { label: "Magistrate", idx: 2422 },
    { label: "Magnetic recorder operator", idx: 3114 },
    { label: "Mail carrier", idx: 4142 },
    { label: "Mail messenger", idx: 4142 },
    { label: "Maintenance clerk", idx: 4190 },
    { label: "Maintenance electrician", idx: 7241 },
    { label: "Maintenance storekeeper", idx: 5220 },
    { label: "Maintenance technician", idx: 3115 },
    { label: "Maker, accordion", idx: 7312 },
    { label: "Maker, brass instrument", idx: 7312 },
    { label: "Maker, dental prosthesis ", idx: 7311 },
    { label: "Maker, ice cream", idx: 7413 },
    { label: "Maker, instrument, meteorological", idx: 7311 },
    { label: "Maker, instrument, surgical", idx: 7311 },
    { label: "Maker, jewelry", idx: 7313 },
    { label: "Maker, metal wind instrument", idx: 7312 },
    { label: "Maker, optical instrument", idx: 7311 },
    { label: "Maker, orthopedic appliance", idx: 7311 },
    { label: "Maker, paper box, hand", idx: 7331 },
    { label: "Maker, photographic film", idx: 7344 },
    { label: "Maker, photographic paper", idx: 7344 },
    { label: "Maker, piano", idx: 7312 },
    { label: "Maker, pottery and porcelain", idx: 7321 },
    { label: "Maker, precious metal leaf", idx: 7313 },
    { label: "Maker, precision instrument", idx: 7311 },
    { label: "Maker, stringed musical instrument", idx: 7312 },
    { label: "Maker, umbrella", idx: 7435 },
    { label: "Maker, wooden model", idx: 7422 },
    { label: "Maker, woodwind instrument", idx: 7312 },
    { label: "Maker-up, printing", idx: 7341 },
    { label: "Make-up artist", idx: 5151 },
    { label: "Make-up man (stage & studio)", idx: 5151 },
    { label: "Malt cooker", idx: 8268 },
    { label: "Management information analyst", idx: 2139 },
    { label: "Management information system designer", idx: 2131 },
    { label: "Manager, accounting", idx: 1231 },
    { label: "Manager, administration", idx: 1231 },
    { label: "Manager, advertising department", idx: 1234 },
    { label: "Manager, airport", idx: 1226 },
    { label: "Manager, automotive services", idx: 1226 },
    { label: "Manager, aviation", idx: 1226 },
    { label: "Manager, benefits", idx: 1231 },
    { label: "Manager, broadcast stations", idx: 1234 },
    { label: "Manager, brokerage office", idx: 1226 },
    { label: "Manager, budgeting", idx: 1231 },
    { label: "Manager, cargo and ramp service", idx: 1226 },
    { label: "Manager, circulation", idx: 1232 },
    { label: "Manager, cleaning services", idx: 1228 },
    { label: "Manager, communications station", idx: 1226 },
    { label: "Manager, compensation", idx: 1231 },
    { label: "Manager, computing services", idx: 1236 },
    { label: "Manager, credit and collection", idx: 1233 },
    { label: "Manager, credit card operations", idx: 1233 },
    { label: "Manager, customer credit", idx: 1233 },
    { label: "Manager, customer service", idx: 1232 },
    { label: "Manager, dance studio", idx: 1239 },
    { label: "Manager, department, mutual benefits", idx: 1232 },
    { label: "Manager, distribution", idx: 1235 },
    { label: "Manager, EDP", idx: 1236 },
    { label: "Manager, equipment", idx: 1239 },
    { label: "Manager, external audit", idx: 1231 },
    { label: "Manager, finance", idx: 1231 },
    { label: "Manager, flight control", idx: 1226 },
    { label: "Manager, flight operation", idx: 1226 },
    { label: "Manager, flight reservation", idx: 1226 },
    { label: "Manager, front office", idx: 1233 },
    { label: "Manager, handicraft shop", idx: 1239 },
    { label: "Manager, harbor department", idx: 1226 },
    { label: "Manager, industrial relations", idx: 1232 },
    { label: "Manager, industrial zone", idx: 1232 },
    { label: "Manager, internal audit", idx: 1231 },
    { label: "Manager, machinery rental ", idx: 1233 },
    { label: "Manager, marketing", idx: 1233 },
    { label: "Manager, messengerial services", idx: 1226 },
    { label: "Manager, personal care services", idx: 1228 },
    { label: "Manager, personnel", idx: 1232 },
    { label: "Manager, planning", idx: 1233 },
    { label: "Manager, port traffic", idx: 1226 },
    { label: "Manager, production and operations, business services", idx: 1227 },
    { label: "Manager, production and operations, communications", idx: 1226 },
    { label: "Manager, production and operations, construction", idx: 1223 },
    { label: "Manager, production and operations, hotels", idx: 1225 },
    { label: "Manager, production and operations, manufacturing", idx: 1222 },
    { label: "Manager, production and operations, restaurants", idx: 1225 },
    { label: "Manager, production and operations, retail trade", idx: 1224 },
    { label: "Manager, production and operations, storage", idx: 1226 },
    { label: "Manager, production and operations, transport", idx: 1226 },
    { label: "Manager, production and operations, wholesale trade", idx: 1224 },
    { label: "Manager, production and operations/agriculture", idx: 1221 },
    { label: "Manager, production and operations/fishing", idx: 1221 },
    { label: "Manager, production and operations/forestry", idx: 1221 },
    { label: "Manager, production and operations/hunting", idx: 1221 },
    { label: "Manager, project development", idx: 1237 },
    { label: "Manager, promotions department", idx: 1234 },
    { label: "Manager, public relations", idx: 1234 },
    { label: "Manager, purchasing", idx: 1235 },
    { label: "Manager, railway", idx: 1226 },
    { label: "Manager, research and development", idx: 1237 },
    { label: "Manager, sales", idx: 1233 },
    { label: "Manager, scientific publication", idx: 1239 },
    { label: "Manager, specialized", idx: 1239 },
    { label: "Manager, statement clerks", idx: 1231 },
    { label: "Manager, stockroom", idx: 1233 },
    { label: "Manager, storage", idx: 1316 },
    { label: "Manager, storeroom", idx: 1233 },
    { label: "Manager, student placement service", idx: 1239 },
    { label: "Manager, supply", idx: 1235 },
    { label: "Manager, technical publication", idx: 1239 },
    { label: "Manager, telecommunications services", idx: 1226 },
    { label: "Manager, telegraph office", idx: 1226 },
    { label: "Manager, telephone services", idx: 1226 },
    { label: "Manager, traffic", idx: 1226 },
    { label: "Manager, transport", idx: 1316 },
    { label: "Manager, transport area", idx: 1226 },
    { label: "Manager, transport station", idx: 1226 },
    { label: "Manager, transportation", idx: 1226 },
    { label: "Manager, travel agency", idx: 1227 },
    { label: "Manager, TV stations", idx: 1234 },
    { label: "Manager, warehouse", idx: 1226 },
    { label: "Manager, welfare", idx: 1231 },
    { label: "Manager/proprietor, catering services", idx: 1315 },
    { label: "Manager/Proprietor, construction", idx: 1313 },
    { label: "Manager/proprietor, guest House", idx: 1315 },
    { label: "Managing proprietor, communications", idx: 1316 },
    { label: "Managing proprietor, storage", idx: 1316 },
    { label: "Managing proprietor, transport", idx: 1316 },
    { label: "Managing-Proprietor, business services", idx: 1317 },
    { label: "Managing-Proprietor, cleaning services", idx: 1318 },
    { label: "Managing-proprietor, construction", idx: 1313 },
    { label: "Managing-Proprietor, personal care services", idx: 1318 },
    { label: "Manicurist/Pedicurist", idx: 5151 },
    { label: "Manipulator, rolling mill", idx: 8122 },
    { label: "Manufacturers' agent", idx: 3415 },
    { label: "Marine craft mechanic", idx: 7233 },
    { label: "Marine engineer", idx: 3141 },
    { label: "Marine engineer officer", idx: 3141 },
    { label: "Marine engineman", idx: 3141 },
    { label: "Marine machinery mechanic", idx: 7233 },
    { label: "Marine superintendent (deck)", idx: 3142 },
    { label: "Marine superintendent (technical)", idx: 3141 },
    { label: "Marine surveyor", idx: 3142 },
    { label: "Maritime industry development specialist", idx: 3141 },
    { label: "Maritime Industry Specialist", idx: 3141 },
    { label: "Maritime Transport Service Supervisors", idx: 1423 },
    { label: "Marker tender", idx: 5220 },
    { label: "Marker, garment", idx: 7434 },
    { label: "Market  Supervisor, retail trade", idx: 1442 },
    { label: "Market  supervisor, wholesale trade", idx: 1441 },
    { label: "Market aide", idx: 9131 },
    { label: "Market analyst", idx: 2419 },
    { label: "Market garden worker", idx: 9211 },
    { label: "Market inspector", idx: 3152 },
    { label: "Market research analyst", idx: 2419 },
    { label: "Marketing and Career Adviser", idx: 2419 },
    { label: "Marketing Director, organization/enterprise", idx: 1210 },
    { label: "Marketing executive", idx: 1210 },
    { label: "Mascot", idx: 3474 },
    { label: "Mason (general)", idx: 7122 },
    { label: "Mason, monument", idx: 7113 },
    { label: "Masseur", idx: 3229 },
    { label: "Master electrician", idx: 2152 },
    { label: "Master fisherman", idx: 6430 },
    { label: "Master, railway station", idx: 1424 },
    { label: "Material planning/procurement officer", idx: 3416 },
    { label: "Mathematical assistant", idx: 3434 },
    { label: "Mathematical associate professional", idx: 3434 },
    { label: "Mathematical statistician", idx: 2122 },
    { label: "Mathematician (Applied Math.)", idx: 2121 },
    { label: "Mathematician (Pure Math.)", idx: 2121 },
    { label: "Mathematician aide", idx: 3434 },
    { label: "Mattress maker", idx: 7436 },
    { label: "Mayor", idx: 1120 },
    { label: "Meat cutter", idx: 7411 },
    { label: "Meat processing machine operator", idx: 8261 },
    { label: "Mechanic motorcycle", idx: 7231 },
    { label: "Mechanic, agricultural machinery", idx: 7234 },
    { label: "Mechanic, airconditioning plant", idx: 7233 },
    { label: "Mechanic, aircraft engine", idx: 7232 },
    { label: "Mechanic, aircraft engine service", idx: 7232 },
    { label: "Mechanic, automobile", idx: 7231 },
    { label: "Mechanic, automotive, light duty", idx: 7231 },
    { label: "Mechanic, diesel engine", idx: 7231 },
    { label: "Mechanic, diesel engine (except motor vehicle)", idx: 7233 },
    { label: "Mechanic, electrical", idx: 7242 },
    { label: "Mechanic, metalworking machine-tool", idx: 7233 },
    { label: "Mechanic, mining machinery", idx: 7234 },
    { label: "Mechanic, motor truck", idx: 7231 },
    { label: "Mechanic, motor vehicle", idx: 7231 },
    { label: "Mechanic, office machines", idx: 7235 },
    { label: "Mechanic, plant maintenance", idx: 7233 },
    { label: "Mechanic, printing machinery", idx: 7234 },
    { label: "Mechanic, radio", idx: 7244 },
    { label: "Mechanic, reciprocating steam-engine", idx: 7233 },
    { label: "Mechanic, refrigeration plant", idx: 7233 },
    { label: "Mechanic, small engine", idx: 7231 },
    { label: "Mechanic, telephone", idx: 7245 },
    { label: "Mechanic, television", idx: 7244 },
    { label: "Mechanic, turbine (except aircraft and marine)", idx: 7233 },
    { label: "Mechanic, woodworking machinery", idx: 7234 },
    { label: "Mechanical plant operator", idx: 8161 },
    { label: "Mechanics physicist", idx: 2111 },
    { label: "Media production specialist", idx: 2419 },
    { label: "Mediator-arbiter", idx: 2421 },
    { label: "Medical Aide", idx: 5132 },
    { label: "Medical assistant", idx: 3221 },
    { label: "Medical associate", idx: 3221 },
    { label: "Medical claims processor", idx: 3443 },
    { label: "Medical radiation technician", idx: 3133 },
    { label: "Medical service aide", idx: 3221 },
    { label: "Medical social welfare officers", idx: 3221 },
    { label: "Medical technologist", idx: 2227 },
    { label: "Medical technologist, nuclear", idx: 2227 },
    { label: "Medical volunteer", idx: 3221 },
    { label: "Medicine ward officer", idx: 3221 },
    { label: "Medico-legal nurse", idx: 2231 },
    { label: "Member of the Barangay Council (Sangguniang Pambarangay)", idx: 1120 },
    { label: "Member of the City Council (Sangguniang Pambayan)", idx: 1120 },
    { label: "Member of the Municipal Council (Sangguniang Pambayan)", idx: 1120 },
    { label: "Member of the Provincial Board (Sangguniang Panlalawigan)", idx: 1120 },
    { label: "Member, Judicial and Bar Council", idx: 2423 },
    { label: "Message handling operator", idx: 4223 },
    { label: "Message writer", idx: 2451 },
    { label: "Messenger", idx: 9151 },
    { label: "Metal bluer", idx: 8223 },
    { label: "Metal caster", idx: 8122 },
    { label: "Metal cleaner", idx: 8223 },
    { label: "Metal coating machine operator", idx: 8223 },
    { label: "Metal drawer", idx: 8124 },
    { label: "Metal extruder", idx: 8124 },
    { label: "Metal finisher", idx: 7224 },
    { label: "Metal finishing machine operator", idx: 8223 },
    { label: "Metal former, hand", idx: 7221 },
    { label: "Metal marker", idx: 7222 },
    { label: "Metal melter", idx: 8122 },
    { label: "Metal pattern maker", idx: 7222 },
    { label: "Metal plating machine operator", idx: 8223 },
    { label: "Metal pourer", idx: 8122 },
    { label: "Metal products assembler", idx: 8274 },
    { label: "Metal shipwright", idx: 7214 },
    { label: "Metal sprayer", idx: 8223 },
    { label: "Metal-bending machine operator", idx: 8211 },
    { label: "Metallurgical technician", idx: 3117 },
    { label: "Metallurgist", idx: 2156 },
    { label: "Metallurgist, extractive", idx: 2156 },
    { label: "Metallurgist, physical", idx: 2156 },
    { label: "Metal-press operator", idx: 8211 },
    { label: "Metal-wheel grinder", idx: 7224 },
    { label: "Metalworking-machine setter, general", idx: 7223 },
    { label: "Metalworking-machine setter-operator, general", idx: 7223 },
    { label: "Meteorological scientist", idx: 2112 },
    { label: "Meteorologists", idx: 2112 },
    { label: "Meter reader", idx: 4215 },
    { label: "Metro aide", idx: 9162 },
    { label: "Micro Biologist", idx: 2212 },
    { label: "Micro computer operator", idx: 3122 },
    { label: "Micro editor operator", idx: 3122 },
    { label: "Microbiologist", idx: 2212 },
    { label: "Microfilming machine operator", idx: 3122 },
    { label: "Midwife, auxiliary", idx: 3232 },
    { label: "Midwife, professional", idx: 2232 },
    { label: "Midwife, supervising", idx: 2232 },
    { label: "Midwifery associate professionals", idx: 3232 },
    { label: "Milk collector", idx: 7413 },
    { label: "Milker", idx: 7413 },
    { label: "Miller-grinder", idx: 8151 },
    { label: "Milliner", idx: 7433 },
    { label: "Milling-machine operator", idx: 8211 },
    { label: "Milling-machine setter-operator", idx: 7223 },
    { label: "Millwright", idx: 7422 },
    { label: "Mine and quarry brakeman", idx: 8312 },
    { label: "Mine cageman", idx: 8333 },
    { label: "Mine manager", idx: 1239 },
    { label: "Miner (general)", idx: 7111 },
    { label: "Mineral analyst", idx: 2114 },
    { label: "Mineralogist", idx: 2114 },
    { label: "Mining claims examiner", idx: 2114 },
    { label: "Mining geologist", idx: 2114 },
    { label: "Mining plant operator", idx: 8111 },
    { label: "Minutes agenda officer", idx: 3431 },
    { label: "Missionary", idx: 2460 },
    { label: "Mixer operator", idx: 8212 },
    { label: "Mixing- and blending-machine operator", idx: 8151 },
    { label: "Mobile crane operator", idx: 8333 },
    { label: "Model, advertising", idx: 5210 },
    { label: "Model, artist", idx: 5210 },
    { label: "Model, fashion", idx: 5210 },
    { label: "Model, mannequin", idx: 5210 },
    { label: "Modeller, pottery and porcelain", idx: 7321 },
    { label: "Molder, abrasive wheel", idx: 7321 },
    { label: "Molder, bench, metal", idx: 7211 },
    { label: "Molder, brick and tile", idx: 7321 },
    { label: "Molder, floor and pit", idx: 7211 },
    { label: "Molder, glass lens", idx: 7322 },
    { label: "Molder, machine", idx: 7211 },
    { label: "Molder, metal castings", idx: 7211 },
    { label: "Money changer", idx: 4212 },
    { label: "Moneylender", idx: 4214 },
    { label: "Monks", idx: 2460 },
    { label: "Mortuary beautician", idx: 5151 },
    { label: "Motion picture camera operator", idx: 3131 },
    { label: "Motor grader operator", idx: 8332 },
    { label: "Motorcycle driver", idx: 8321 },
    { label: "Motorcycle escort", idx: 5169 },
    { label: "Motorcyclist", idx: 8321 },
    { label: "Motorized farm plant operator", idx: 8331 },
    { label: "Motorized forestry plant operator", idx: 8331 },
    { label: "Motorpool supervisor", idx: 1421 },
    { label: "Mountaineering guide", idx: 5113 },
    { label: "Multimedia artist", idx: 3131 },
    { label: "Museum guide", idx: 5113 },
    { label: "Museum researcher", idx: 2430 },
    { label: "Musical arranger", idx: 2453 },
    { label: "Musical director", idx: 2453 },
    { label: "Musical director", idx: 2453 },
    { label: "Musician", idx: 2453 },
    { label: "Mycologist", idx: 2211 },
    { label: "National intelligence specialist", idx: 3450 },
    { label: "National security specialist", idx: 3450 },
    { label: "Native cakes/kakanin makers", idx: 7412 },
    { label: "Natural gas refining plant operator", idx: 8155 },
    { label: "Naturopath", idx: 3241 },
    { label: "Nautical writer", idx: 2451 },
    { label: "Naval architect", idx: 2141 },
    { label: "Neonetal nurse", idx: 2231 },
    { label: "Net and system administrator", idx: 1236 },
    { label: "Net and systems operation administrator", idx: 2131 },
    { label: "Net maker, hand", idx: 7432 },
    { label: "Net maker, machine", idx: 8252 },
    { label: "Netwok development officer", idx: 2131 },
    { label: "Neurosurgeon", idx: 2221 },
    { label: "New accounts clerk", idx: 4122 },
    { label: "New worker seeking employment", idx: 910 },
    { label: "News analyst", idx: 3472 },
    { label: "News commentator (broadcasting)", idx: 2451 },
    { label: "News correspondent/reporter", idx: 3472 },
    { label: "Newscaster/broadcaster, radio & tv", idx: 3472 },
    { label: "Newspaper and periodical editor", idx: 2451 },
    { label: "Newspaper and periodical sub-editor", idx: 2451 },
    { label: "Nightclub dancer", idx: 3473 },
    { label: "Nightclub singer", idx: 3473 },
    { label: "Non-ordained religious associate professional", idx: 3480 },
    { label: "Noodle makers", idx: 7412 },
    { label: "Notary public", idx: 2429 },
    { label: "Nuclear physicist", idx: 2111 },
    { label: "Numerical control machine setter-operator", idx: 7223 },
    { label: "Numerologist", idx: 5142 },
    { label: "Nun", idx: 3480 },
    { label: "Nurse, auxiliary", idx: 3231 },
    { label: "Nurse, consultant", idx: 2231 },
    { label: "Nurse, occupational health", idx: 2231 },
    { label: "Nurse, practitioner, independent", idx: 2231 },
    { label: "Nurse, private", idx: 2231 },
    { label: "Nurse, professional (general)", idx: 2231 },
    { label: "Nurse, public health", idx: 2231 },
    { label: "Nurse, school", idx: 2231 },
    { label: "Nurse, specialized", idx: 2231 },
    { label: "Nursemaid", idx: 5131 },
    { label: "Nursery aide", idx: 5132 },
    { label: "Nursery aide", idx: 5131 },
    { label: "Nursery laborer ", idx: 9211 },
    { label: "Nursery worker", idx: 9211 },
    { label: "Nursing assistant", idx: 3231 },
    { label: "Nursing associate professionals", idx: 3231 },
    { label: "Nursing attendant", idx: 5132 },
    { label: "Nutrition program coordinator", idx: 2225 },
    { label: "Nutritionist", idx: 2225 },
    { label: "Nutritionist, community/public health", idx: 2225 },
    { label: "Nutritionist, dietary", idx: 2225 },
    { label: "Nutritionist, public health", idx: 2225 },
    { label: "Nutritionist-dietician", idx: 2225 },
    { label: "Nutritionist-dietician, research", idx: 2225 },
    { label: "Ob- Gyenologist", idx: 2221 },
    { label: "Obstetrician", idx: 2221 },
    { label: "Occupational analyst", idx: 2412 },
    { label: "Occupational theraphy technician", idx: 3229 },
    { label: "Odd-job person", idx: 9162 },
    { label: "Office cashier", idx: 4211 },
    { label: "Office equipment clerk", idx: 4190 },
    { label: "Office machine operator, reproduction processes", idx: 7347 },
    { label: "Officer, excise", idx: 3442 },
    { label: "Officer, flight operation", idx: 4133 },
    { label: "Officer, passport checking", idx: 3441 },
    { label: "Officer, pension", idx: 3443 },
    { label: "Officer, social benefits", idx: 3443 },
    { label: "Officer, social security claims", idx: 3443 },
    { label: "Officer, tax", idx: 3442 },
    { label: "Official, consular", idx: 3439 },
    { label: "Offset Camera technician", idx: 3131 },
    { label: "Offset pressman", idx: 7347 },
    { label: "Offset pressman, sheet fed", idx: 7347 },
    { label: "Offset pressman, web fed", idx: 7347 },
    { label: "Oil pressman, edible oil", idx: 8265 },
    { label: "Oiler", idx: 7233 },
    { label: "Ombudsman", idx: 1110 },
    { label: "Open hearth furnaceman, steel", idx: 8121 },
    { label: "Opening bridge operator", idx: 8333 },
    { label: "Operations  manager", idx: 1421 },
    { label: "Operations research analyst", idx: 2121 },
    { label: "Operator, assembly-line, automated", idx: 8171 },
    { label: "Operator, blender, petroleum and natural gas refining", idx: 8155 },
    { label: "Operator, boiler, ship", idx: 8162 },
    { label: "Operator, boring equipment, well", idx: 8113 },
    { label: "Operator, cement production plant", idx: 8152 },
    { label: "Operator, centrifugal casting machine", idx: 8122 },
    { label: "Operator, chipper, paper pulp", idx: 8142 },
    { label: "Operator, clay extruding-press", idx: 7321 },
    { label: "Operator, coke production plant", idx: 8159 },
    { label: "Operator, computer equipment", idx: 3122 },
    { label: "Operator, computer peripheral equipment", idx: 3122 },
    { label: "Operator, continuous rod-casting machine", idx: 8122 },
    { label: "Operator, converter, chemical processes, except petroleum and gas", idx: 8154 },
    { label: "Operator, derrick, gas well", idx: 8113 },
    { label: "Operator, derrick, oil well", idx: 8113 },
    { label: "Operator, desk top publishing", idx: 7347 },
    { label: "Operator, die casting machine", idx: 8122 },
    { label: "Operator, drilling equipment, well", idx: 8113 },
    { label: "Operator, EDP", idx: 3122 },
    { label: "Operator, electric power plant", idx: 8161 },
    { label: "Operator, electronic computer", idx: 3122 },
    { label: "Operator, electronic equipment, n.e.c.", idx: 3139 },
    { label: "Operator, engraving pantograph", idx: 7343 },
    { label: "Operator, fertilizer plant", idx: 8159 },
    { label: "Operator, fish hatchery", idx: 6419 },
    { label: "Operator, hydroelectric power plant", idx: 8161 },
    { label: "Operator, incinerator, refuse disposal", idx: 8163 },
    { label: "Operator, lathe, stone", idx: 7113 },
    { label: "Operator, lens grinding-machine", idx: 7322 },
    { label: "Operator, lens polishing machine", idx: 7322 },
    { label: "Operator, linotype", idx: 7341 },
    { label: "Operator, loader", idx: 8331 },
    { label: "Operator, metal furnace", idx: 8121 },
    { label: "Operator, mill, chemical and related processes", idx: 8151 },
    { label: "Operator, mineral crushing machine", idx: 8112 },
    { label: "Operator, mineral milling machine", idx: 8112 },
    { label: "Operator, mineral ore processing plant", idx: 8112 },
    { label: "Operator, mobile plant", idx: 8162 },
    { label: "Operator, monotype keyboard", idx: 7341 },
    { label: "Operator, nuclear power plant", idx: 8161 },
    { label: "Operator, nursery farm", idx: 6419 },
    { label: "Operator, optical equipment, n.e.c.", idx: 3139 },
    { label: "Operator, ore furnace", idx: 8121 },
    { label: "Operator, ornamental fish farm ", idx: 6419 },
    { label: "Operator, paper pulp plant", idx: 8142 },
    { label: "Operator, paper-making plant", idx: 8143 },
    { label: "Operator, paraffin plant", idx: 8155 },
    { label: "Operator, photo-type-setting machine", idx: 7341 },
    { label: "Operator, plywood core-laying", idx: 8141 },
    { label: "Operator, power plant", idx: 8161 },
    { label: "Operator, pumping-station, water", idx: 8163 },
    { label: "Operator, punched-card machine", idx: 3122 },
    { label: "Operator, reactor, chemical processes, except petroleum and gas", idx: 8154 },
    { label: "Operator, roasting equipment, chemical and related processes", idx: 8152 },
    { label: "Operator, robot, industrial", idx: 8172 },
    { label: "Operator, rolling mill, non-ferrous metal", idx: 8122 },
    { label: "Operator, sand pro", idx: 8332 },
    { label: "Operator, sawmill", idx: 8141 },
    { label: "Operator, separator, chemical and related materials", idx: 8153 },
    { label: "Operator, solar power plant", idx: 8161 },
    { label: "Operator, steam engine", idx: 8162 },
    { label: "Operator, steam power plant", idx: 8161 },
    { label: "Operator, still, petroleum and natural gas refining", idx: 8155 },
    { label: "Operator, still, turpentine", idx: 8154 },
    { label: "Operator, stone processing machine", idx: 8112 },
    { label: "Operator, stone processing plant", idx: 8112 },
    { label: "Operator, synthetic fiber production plant", idx: 8159 },
    { label: "Operator, telephone switchboard", idx: 4223 },
    { label: "Operator, teleprinter", idx: 4112 },
    { label: "Operator, tobacco conditioner", idx: 7416 },
    { label: "Operator, tobacco cutting machine", idx: 7416 },
    { label: "Operator, treating equipment, crude oil", idx: 8153 },
    { label: "Operator, type-casting machine", idx: 7341 },
    { label: "Operator, typewriter, telegraphic", idx: 4112 },
    { label: "Operator, water purification plant", idx: 8163 },
    { label: "Operator, wood processing plant", idx: 8141 },
    { label: "Opthalmologist", idx: 2221 },
    { label: "Optician", idx: 2226 },
    { label: "Optician, dispensing", idx: 2226 },
    { label: "Optician, ophthalmic", idx: 2226 },
    { label: "Optometrist", idx: 2226 },
    { label: "Orchard worker", idx: 9211 },
    { label: "Orchestra director", idx: 2453 },
    { label: "Orchestrator", idx: 2453 },
    { label: "Ordinary seaman", idx: 8340 },
    { label: "Organic chemist", idx: 2113 },
    { label: "Orthodontist", idx: 2222 },
    { label: "Orthopedic footwear maker", idx: 7442 },
    { label: "Orthopedic technician", idx: 3229 },
    { label: "Osteopath", idx: 2229 },
    { label: "Other barangay officials", idx: 1130 },
    { label: "Outreach project worker", idx: 3460 },
    { label: "Oven/fryer man", idx: 7412 },
    { label: "Overseas operations officer", idx: 3423 },
    { label: "Overseas worker welfare officer", idx: 3423 },
    { label: "Oxygen furnaceman, steel converting", idx: 8121 },
    { label: "Package counterman", idx: 5230 },
    { label: "Pain clinic & ancology nurse", idx: 2231 },
    { label: "Paint sprayer, varnishers", idx: 7142 },
    { label: "Painter", idx: 7141 },
    { label: "Painter, artistic", idx: 2452 },
    { label: "Painter, automotive", idx: 7142 },
    { label: "Painter, building", idx: 7141 },
    { label: "Painter, ceramics", idx: 7324 },
    { label: "Painter, construction", idx: 7141 },
    { label: "Painter, decorative", idx: 7324 },
    { label: "Painter, glass", idx: 7324 },
    { label: "Painter, manufactured articles", idx: 7142 },
    { label: "Painter, portrait", idx: 2452 },
    { label: "Painter, ship", idx: 7141 },
    { label: "Painter, structural steel", idx: 7141 },
    { label: "Painter, upholstery", idx: 7142 },
    { label: "Painting restorer", idx: 2452 },
    { label: "Paleontologist", idx: 2114 },
    { label: "Palmist", idx: 5142 },
    { label: "Pan handler", idx: 9311 },
    { label: "Paper bag and envelope maker, machine", idx: 8143 },
    { label: "Paper box cutting- and creasing-press operator", idx: 8143 },
    { label: "Paper box maker, machine", idx: 8143 },
    { label: "Paper cutting machine operator", idx: 7347 },
    { label: "Paper maker, hand", idx: 8143 },
    { label: "Paperboard products assembler", idx: 8276 },
    { label: "Paperhanger, wall", idx: 7141 },
    { label: "Papermaking machine operator, back end", idx: 8143 },
    { label: "Papermaking machine operator, wet end", idx: 8143 },
    { label: "Paper-making plant operator", idx: 8143 },
    { label: "Paraffin plant operator", idx: 8155 },
    { label: "Paralegal officer", idx: 3432 },
    { label: "Paramedic nurse", idx: 2231 },
    { label: "Parasitologist", idx: 2211 },
    { label: "Park administrator", idx: 3439 },
    { label: "Park maintenance laborer", idx: 9162 },
    { label: "Park sweeper", idx: 9162 },
    { label: "Parking attendant", idx: 9152 },
    { label: "Parks & games warden", idx: 5169 },
    { label: "Parquetry worker", idx: 7132 },
    { label: "Passport issuing officer", idx: 3444 },
    { label: "Pastor", idx: 2460 },
    { label: "Pastry maker", idx: 7412 },
    { label: "Pastrycook", idx: 7412 },
    { label: "Pasture in-charge", idx: 6211 },
    { label: "Patent agent", idx: 2419 },
    { label: "Pathologist", idx: 2212 },
    { label: "Pathologist, forensic", idx: 2212 },
    { label: "Pathologist, medical", idx: 2212 },
    { label: "Pathologist, veterinary", idx: 2212 },
    { label: "Patrolman, police", idx: 5162 },
    { label: "Patrolwoman, police", idx: 5162 },
    { label: "Patternmaker", idx: 7433 },
    { label: "Patternmaker, garment", idx: 7434 },
    { label: "Patternmaker, hat and cap", idx: 7434 },
    { label: "Patternmaker, leather", idx: 7434 },
    { label: "Patternmaker, textile", idx: 7434 },
    { label: "Patternmaker, wooden", idx: 7422 },
    { label: "Paviour", idx: 7122 },
    { label: "Pawnbroker", idx: 4214 },
    { label: "Pay loader", idx: 8332 },
    { label: "Paymaster", idx: 4211 },
    { label: "Pea farmer", idx: 6114 },
    { label: "Peanut (ground nut) farmer", idx: 6114 },
    { label: "Pedal vehicle driver", idx: 9331 },
    { label: "Peddler", idx: 9112 },
    { label: "Pediatrician", idx: 2221 },
    { label: "Pedicab driver", idx: 9331 },
    { label: "Pedodontist", idx: 2222 },
    { label: "Penal institution program officer", idx: 3450 },
    { label: "Peon(unskilled laborer)", idx: 9311 },
    { label: "Periodontist", idx: 2222 },
    { label: "Permit & licensing officer", idx: 3444 },
    { label: "Personal maid", idx: 5152 },
    { label: "Personnel specialist", idx: 2412 },
    { label: "Pest control technician", idx: 3219 },
    { label: "Petroleum refining plant operator", idx: 8155 },
    { label: "Petrologist", idx: 2114 },
    { label: "Pharmaceutical assistant", idx: 3224 },
    { label: "Pharmacist (general)", idx: 2224 },
    { label: "Pharmacist, industrial", idx: 2224 },
    { label: "Pharmacologist", idx: 2224 },
    { label: "Pharmacy Aide", idx: 3224 },
    { label: "Philatelic artist", idx: 2430 },
    { label: "Philologist", idx: 2444 },
    { label: "Philosopher", idx: 2443 },
    { label: "Photo editor", idx: 3131 },
    { label: "Photo lithographic technician", idx: 3131 },
    { label: "Photo-engraver", idx: 7343 },
    { label: "Photogrammetrist", idx: 2157 },
    { label: "Photogrammetry Laboratory technician", idx: 3131 },
    { label: "Photograph enlarger", idx: 7344 },
    { label: "Photograph printer", idx: 7344 },
    { label: "Photographer, commercial illustrator", idx: 3131 },
    { label: "Photographer, general", idx: 3131 },
    { label: "Photographer, news", idx: 3131 },
    { label: "Photographic color processor", idx: 3131 },
    { label: "Photographic equipment repairer", idx: 7344 },
    { label: "Photographic film and paper maker", idx: 7344 },
    { label: "Photolithographic lay-out man", idx: 3131 },
    { label: "Photostat machine operator", idx: 3131 },
    { label: "Phychometrician", idx: 2445 },
    { label: "Physical chemist", idx: 2113 },
    { label: "Physical therapist", idx: 2228 },
    { label: "Physical trainer", idx: 3475 },
    { label: "Physician", idx: 2221 },
    { label: "Physician, public health", idx: 2221 },
    { label: "Physician/practitioner, general", idx: 2221 },
    { label: "Physicist (General)", idx: 2111 },
    { label: "Physiologist", idx: 2212 },
    { label: "Physiotherapist", idx: 2228 },
    { label: "Pickler, food", idx: 7414 },
    { label: "Pig farm worker", idx: 9211 },
    { label: "Pile-driver operator", idx: 8332 },
    { label: "Pin boy", idx: 9152 },
    { label: "Pipe fitter", idx: 7136 },
    { label: "Pipe fitter, gas", idx: 7136 },
    { label: "Pipe fitter, marine", idx: 7136 },
    { label: "Pipe layer", idx: 7136 },
    { label: "Piping charge hand", idx: 7136 },
    { label: "Piping inspector", idx: 7136 },
    { label: "Planing-machine operator", idx: 8211 },
    { label: "Planing-machine setter-operator", idx: 7223 },
    { label: "Planner, city", idx: 2142 },
    { label: "Planner, town", idx: 2142 },
    { label: "Planner, traffic", idx: 2142 },
    { label: "Planner, urban", idx: 2142 },
    { label: "Plant entomologist", idx: 2214 },
    { label: "Plant quarintine inspector", idx: 3219 },
    { label: "Planter, forest tree", idx: 6310 },
    { label: "Plasterer, fibrous", idx: 7122 },
    { label: "Plasterer, general", idx: 7122 },
    { label: "Plasterer, ornamental", idx: 7122 },
    { label: "Plasterer, stucco", idx: 7122 },
    { label: "Plastic molding engineer", idx: 2155 },
    { label: "Plastic pattern maker", idx: 7222 },
    { label: "Plastic products assembler", idx: 8274 },
    { label: "Plastics extruding machine operator", idx: 8232 },
    { label: "Plastics injection-molding machine operator", idx: 8232 },
    { label: "Plastics laminator", idx: 8232 },
    { label: "Plastics products fabricator", idx: 8232 },
    { label: "Plate metal worker", idx: 7213 },
    { label: "Plate-glass polisher", idx: 8131 },
    { label: "Plate-glass rollerman", idx: 8131 },
    { label: "Platen press operator", idx: 7341 },
    { label: "Platen pressman", idx: 7347 },
    { label: "Plumber", idx: 7136 },
    { label: "Plywood press operator", idx: 8141 },
    { label: "Pneumatic riveter", idx: 7214 },
    { label: "Podiatrist", idx: 2228 },
    { label: "Police inspector", idx: 3450 },
    { label: "Policeman", idx: 5162 },
    { label: "Policewoman", idx: 5162 },
    { label: "Polisher, metal", idx: 7224 },
    { label: "Polishing machine operator", idx: 7224 },
    { label: "Political affairs officer ", idx: 3439 },
    { label: "Political scientist", idx: 2443 },
    { label: "Pollution control aide", idx: 3152 },
    { label: "Polygraph examiner", idx: 3450 },
    { label: "Pond Aide", idx: 9213 },
    { label: "Population program worker", idx: 3439 },
    { label: "Porcelain kilnman", idx: 8131 },
    { label: "Portrait photographer", idx: 3131 },
    { label: "Post runner", idx: 9151 },
    { label: "Postal clerk", idx: 4142 },
    { label: "Postal Service Supervisors", idx: 1425 },
    { label: "Posting clerk", idx: 4142 },
    { label: "Postman", idx: 4142 },
    { label: "Postmaster", idx: 1425 },
    { label: "Postmaster General", idx: 1110 },
    { label: "Potter", idx: 8139 },
    { label: "Potter, general", idx: 7321 },
    { label: "Pottery kilnman", idx: 8131 },
    { label: "Poultry farm laborer", idx: 9211 },
    { label: "Poultry hatchery worker", idx: 9211 },
    { label: "Power distribution and transmission engineer", idx: 2152 },
    { label: "Power plant mechanic", idx: 7234 },
    { label: "Power plant operator, steam", idx: 8161 },
    { label: "Power production plant operator", idx: 8161 },
    { label: "Power reactor operator", idx: 8161 },
    { label: "Power switchboard operator", idx: 8161 },
    { label: "Power-shear operator", idx: 8211 },
    { label: "Practicum coordinator", idx: 2412 },
    { label: "Precipitator", idx: 8112 },
    { label: "Precision-grinding-machine operator", idx: 8211 },
    { label: "Precision-grinding-machine setter-operator", idx: 7223 },
    { label: "Preparer, tobacco", idx: 7416 },
    { label: "Preserver, food", idx: 7414 },
    { label: "Preserver, fruit", idx: 7414 },
    { label: "Preserver, vegetables", idx: 7414 },
    { label: "Preserving cook, general", idx: 8261 },
    { label: "President", idx: 1110 },
    { label: "President of the Republic of the Philippines", idx: 1110 },
    { label: "President of the Senate", idx: 1120 },
    { label: "President, college", idx: 1229 },
    { label: "President, employers' organization", idx: 1142 },
    { label: "President, organization/enterprise", idx: 1210 },
    { label: "President, political party", idx: 1141 },
    { label: "President, trade union", idx: 1143 },
    { label: "President, university", idx: 1229 },
    { label: "Presidential legislative adviser", idx: 1120 },
    { label: "Presidential staff officer", idx: 3431 },
    { label: "Press operator, printing, cylinder", idx: 7347 },
    { label: "Press operator, printing, offset", idx: 7347 },
    { label: "Press operator, printing, rotary", idx: 7347 },
    { label: "Press roller maker", idx: 7347 },
    { label: "Press secretary", idx: 1110 },
    { label: "Presser, hand", idx: 9133 },
    { label: "Presser, hand, pottery and porcelain", idx: 7321 },
    { label: "Pressman", idx: 2451 },
    { label: "Pressman, letterpress", idx: 7347 },
    { label: "Press-proof revisor", idx: 2451 },
    { label: "Priest", idx: 2460 },
    { label: "Prime miner operator", idx: 8111 },
    { label: "Principal", idx: 1412 },
    { label: "Principal, assistant", idx: 1412 },
    { label: "Printer, block", idx: 7346 },
    { label: "Printer, general", idx: 7341 },
    { label: "Printer, photograph", idx: 7344 },
    { label: "Printer, silk-screen", idx: 7346 },
    { label: "Printer, textile", idx: 7346 },
    { label: "Printing machine operator", idx: 7347 },
    { label: "Printing quality inspector", idx: 7347 },
    { label: "Printing scheduler", idx: 7347 },
    { label: "Prison guard", idx: 5163 },
    { label: "Private detective", idx: 5169 },
    { label: "Private inquiry agent", idx: 5169 },
    { label: "Private investigators/criminology", idx: 5169 },
    { label: "Private police guard", idx: 5162 },
    { label: "Private secretary", idx: 3431 },
    { label: "Procurement officer", idx: 3439 },
    { label: "Producer, chicken egg", idx: 6221 },
    { label: "Producer, chicken meat ", idx: 6221 },
    { label: "Producer, duck egg", idx: 6222 },
    { label: "Producer, duck meat ", idx: 6222 },
    { label: "Producer, motion picture", idx: 1227 },
    { label: "Producer, radio program", idx: 1226 },
    { label: "Producer, television program", idx: 1226 },
    { label: "Producer, theatrical", idx: 1227 },
    { label: "Product demonstrator", idx: 5220 },
    { label: "Product manager", idx: 1233 },
    { label: "Production clerk", idx: 4132 },
    { label: "Production inspector", idx: 3152 },
    { label: "Production process operator", idx: 8212 },
    { label: "Production supervisor", idx: 1430 },
    { label: "Professional monk", idx: 2460 },
    { label: "Professional nun", idx: 2460 },
    { label: "Professional regulation officer", idx: 3444 },
    { label: "Professional tutor", idx: 2399 },
    { label: "Professional, technical and related worker (AFP)", idx: 113 },
    { label: "Professor, college and university", idx: 2310 },
    { label: "Programmer analyst", idx: 2132 },
    { label: "Programmer application", idx: 2132 },
    { label: "Project consultant manager", idx: 1237 },
    { label: "Project manager/contractor", idx: 1223 },
    { label: "Promo girl", idx: 5220 },
    { label: "Promo merchandiser", idx: 5220 },
    { label: "Proof-reader", idx: 4143 },
    { label: "Propagator, foliage", idx: 6131 },
    { label: "Property custodian", idx: 3413 },
    { label: "Property officer", idx: 3439 },
    { label: "Property/maintenance supervisor", idx: 149 },
    { label: "Prosecutor", idx: 2421 },
    { label: "Prosthodontist", idx: 2222 },
    { label: "Psychiatrist", idx: 2221 },
    { label: "Psychic healer", idx: 3242 },
    { label: "Psychologists", idx: 2445 },
    { label: "Public address equipment operator", idx: 3132 },
    { label: "Public relations officer", idx: 2419 },
    { label: "Public service supervisor", idx: 149 },
    { label: "Publication circulation officer", idx: 3429 },
    { label: "Publicity writer", idx: 2451 },
    { label: "Pulmonary therapist", idx: 2229 },
    { label: "Pump operator", idx: 8111 },
    { label: "Pumpboat operator", idx: 8340 },
    { label: "Pumping station operator", idx: 8163 },
    { label: "Pumpman, petroleum refining", idx: 8155 },
    { label: "Purchasing agent", idx: 3416 },
    { label: "Quality assurance/control inspector", idx: 3152 },
    { label: "Quality control chemist", idx: 2113 },
    { label: "Quality control supervisor/foreman", idx: 1430 },
    { label: "Quality control technician", idx: 3119 },
    { label: "Quality management representative", idx: 2419 },
    { label: "Quarry digger (manual)", idx: 9311 },
    { label: "Quarryman (general)", idx: 7111 },
    { label: "Rabbi", idx: 2460 },
    { label: "Radio and television journalist", idx: 2451 },
    { label: "Radio and television transmitting equipment operator", idx: 3132 },
    { label: "Radio announcer", idx: 3472 },
    { label: "Radio communication operator", idx: 3132 },
    { label: "Radio communication technician", idx: 3132 },
    { label: "Radio controller", idx: 3132 },
    { label: "Radio dispatcher", idx: 3132 },
    { label: "Radio engineer", idx: 2153 },
    { label: "Radio frequency coordinator", idx: 3132 },
    { label: "Radio frequency engineer", idx: 2153 },
    { label: "Radio laboratory technician", idx: 3132 },
    { label: "Radio monitoring operator", idx: 3132 },
    { label: "Radio phone operator", idx: 3132 },
    { label: "Radio photo equipment operator", idx: 3132 },
    { label: "Radio station manager", idx: 1226 },
    { label: "Radio, tv commentator", idx: 3472 },
    { label: "Radio-telephone operator (land-based)", idx: 3132 },
    { label: "Radiotherapeutic nurse", idx: 2231 },
    { label: "Rafter", idx: 6320 },
    { label: "Railway & road vehicle loader", idx: 9333 },
    { label: "Railway brakeman, freight train", idx: 8312 },
    { label: "Railway braker", idx: 8312 },
    { label: "Railway engine driver", idx: 8311 },
    { label: "Railway passenger train guard", idx: 5112 },
    { label: "Railway shunter", idx: 8312 },
    { label: "Railway signalman", idx: 8312 },
    { label: "Railway steam-engine fireman", idx: 8162 },
    { label: "Railway transport service supervisor", idx: 1429 },
    { label: "Railway vehicle loader", idx: 9333 },
    { label: "Railways Transport Service Supervisors", idx: 1424 },
    { label: "Raiser, duck ", idx: 6222 },
    { label: "Raiser, frog ", idx: 6419 },
    { label: "Raiser, hog", idx: 6212 },
    { label: "Raiser, pearl culture ", idx: 6419 },
    { label: "Rattan binder", idx: 7331 },
    { label: "Reader, electric meter ", idx: 4215 },
    { label: "Reader, gas meter ", idx: 4215 },
    { label: "Reader, water meter ", idx: 4215 },
    { label: "Reading and writing teacher", idx: 2331 },
    { label: "Real estate broker", idx: 3413 },
    { label: "Real property appraiser", idx: 3413 },
    { label: "Realtor", idx: 3413 },
    { label: "Receiving clerk", idx: 4222 },
    { label: "Receptionist (General)", idx: 4222 },
    { label: "Receptionist, medical ", idx: 4222 },
    { label: "Recital coordinator", idx: 2453 },
    { label: "Reconcilement specialist", idx: 3431 },
    { label: "Recording artist", idx: 2453 },
    { label: "Records management analyst", idx: 3431 },
    { label: "Records officer", idx: 3431 },
    { label: "Recreation facilities attendant/aide", idx: 9152 },
    { label: "Recreational attendant", idx: 5113 },
    { label: "Referee", idx: 3475 },
    { label: "Refining machine operator, oils and fats", idx: 8265 },
    { label: "Reflexologist", idx: 2229 },
    { label: "Refrigeration system operator", idx: 8163 },
    { label: "Regional Director", idx: 1110 },
    { label: "Regional Postmaster", idx: 1110 },
    { label: "Registration officer", idx: 3439 },
    { label: "Reinforced concreter, general", idx: 7122 },
    { label: "Reinforcing iron worker", idx: 7122 },
    { label: "Relief and rehabilitation worker", idx: 3460 },
    { label: "Relief telegraphic operator", idx: 3132 },
    { label: "Religion minister", idx: 2460 },
    { label: "Religious professionals", idx: 2460 },
    { label: "Religious workers", idx: 3480 },
    { label: "Remote sensing technologist", idx: 2112 },
    { label: "Repairer, dental prosthesis", idx: 7311 },
    { label: "Repairer, jewelry", idx: 7313 },
    { label: "Repairer, optical instrument", idx: 7311 },
    { label: "Repairer, orthopedic appliance", idx: 7311 },
    { label: "Repairer, photographic equipment", idx: 7344 },
    { label: "Repairer, precision instrument", idx: 7311 },
    { label: "Repairer, saw", idx: 7224 },
    { label: "Repairer, telecommunication equipment", idx: 7245 },
    { label: "Repairer, watch and clock", idx: 7311 },
    { label: "Repairman", idx: 7231 },
    { label: "Repairman, electric meter", idx: 7242 },
    { label: "Repairman, electrical", idx: 7241 },
    { label: "Repairman, instrumentation", idx: 7242 },
    { label: "Repairman, telegraph", idx: 7245 },
    { label: "Repairman, telephone", idx: 7245 },
    { label: "Repairman, transformer", idx: 7242 },
    { label: "Repairman, video electronics", idx: 7244 },
    { label: "Reporter", idx: 2451 },
    { label: "Reporter, verbatim", idx: 3431 },
    { label: "Repro-cameraman", idx: 7344 },
    { label: "Reservation clerk", idx: 4222 },
    { label: "Resettlement and development officer", idx: 3413 },
    { label: "Respiratory therapist", idx: 2229 },
    { label: "Retoucher, photogravure", idx: 7343 },
    { label: "Retoucher, printing plate", idx: 7343 },
    { label: "Revenue collector", idx: 4215 },
    { label: "Revenue officer", idx: 2419 },
    { label: "Rewinder, electric machine", idx: 7242 },
    { label: "Rice farmer, irrigated", idx: 6111 },
    { label: "Rice farmer, lowland", idx: 6111 },
    { label: "Rice farmer, rainfed", idx: 6111 },
    { label: "Rice farmer, upland", idx: 6111 },
    { label: "Rice milling machine operator", idx: 8263 },
    { label: "Rickshaw driver", idx: 9331 },
    { label: "Rigger", idx: 7215 },
    { label: "Rigger, aircraft", idx: 7215 },
    { label: "Rigger, gas-drilling", idx: 7215 },
    { label: "Rigger, hoisting equipment, construction", idx: 7215 },
    { label: "Rigger, hoisting equipment, general", idx: 7215 },
    { label: "Rigger, oil-drilling", idx: 7215 },
    { label: "Rigger, ship", idx: 7215 },
    { label: "Ring spinner", idx: 8251 },
    { label: "Risk management analyst", idx: 2412 },
    { label: "Riveter", idx: 7214 },
    { label: "Road grader and scraper operator", idx: 8332 },
    { label: "Road roller operator", idx: 8332 },
    { label: "Road service worker", idx: 9312 },
    { label: "Road Transport Service Supervisors", idx: 1421 },
    { label: "Road vehicle loader", idx: 9333 },
    { label: "Road-roller operator", idx: 8332 },
    { label: "Roaster, chemical and related processes", idx: 8152 },
    { label: "Roller, non-ferrous metal", idx: 8122 },
    { label: "Roller, precious metal", idx: 7313 },
    { label: "Roller, seamless pipe and tube", idx: 8122 },
    { label: "Rolling mill operator", idx: 8122 },
    { label: "Roofer", idx: 7131 },
    { label: "Roofer, asphalt", idx: 7131 },
    { label: "Roofer, composition", idx: 7131 },
    { label: "Roofer, metal", idx: 7131 },
    { label: "Roofer, slate", idx: 7131 },
    { label: "Roofer, thatcher", idx: 7131 },
    { label: "Roofer, tile", idx: 7131 },
    { label: "Rotary driller, gas well", idx: 8113 },
    { label: "Rotary driller, oil well", idx: 8113 },
    { label: "Rotary pressman", idx: 7347 },
    { label: "Rotary-drum filterer", idx: 8153 },
    { label: "Rotogravure pressman", idx: 7347 },
    { label: "Rough terrain crane operator", idx: 8333 },
    { label: "Rubber calender operator", idx: 8231 },
    { label: "Rubber extruding-machine operator", idx: 8231 },
    { label: "Rubber goods assembler", idx: 8274 },
    { label: "Rubber millman", idx: 8231 },
    { label: "Rubber molding-press operator", idx: 8231 },
    { label: "Rubber plantation worker", idx: 9211 },
    { label: "Rubber products machine operator", idx: 8231 },
    { label: "Saddler and harness maker", idx: 7442 },
    { label: "Sailor", idx: 8340 },
    { label: "Sakada", idx: 9211 },
    { label: "Sales & collection supervisor, retail trade", idx: 1442 },
    { label: "Sales & collection supervisor, wholesale trade", idx: 1441 },
    { label: "Sales analyst", idx: 3415 },
    { label: "Sales associate professional, n.e.c.", idx: 3419 },
    { label: "Sales consultant", idx: 3415 },
    { label: "Sales helper/baggers", idx: 5220 },
    { label: "Sales supervisor", idx: 3415 },
    { label: "Sales supervisor, retail trade", idx: 1442 },
    { label: "Sales supervisor, wholesale trade", idx: 1441 },
    { label: "Salesman, advertising", idx: 3429 },
    { label: "Salesman, business services/advertising", idx: 3429 },
    { label: "Salesman, insurance", idx: 3412 },
    { label: "Salesman, real estate ", idx: 3413 },
    { label: "Salesman, retail trade ", idx: 5220 },
    { label: "Salesman, technical", idx: 3415 },
    { label: "Salesman, wholesale trade ", idx: 5220 },
    { label: "Salesman/saleslady", idx: 5220 },
    { label: "Salesperson, door-to-door ", idx: 9113 },
    { label: "Salesperson, market", idx: 5230 },
    { label: "Salesperson, promo", idx: 9113 },
    { label: "Salesperson, property", idx: 3413 },
    { label: "Salesperson, special offer ", idx: 9113 },
    { label: "Salesperson, stall", idx: 5230 },
    { label: "Salesperson, street stall", idx: 5230 },
    { label: "Salesperson, telephone", idx: 9113 },
    { label: "Salted egg maker", idx: 7414 },
    { label: "Salvationist", idx: 2460 },
    { label: "Sampler, mine", idx: 7111 },
    { label: "Sandblaster", idx: 7133 },
    { label: "Sandblaster, building exterior", idx: 7133 },
    { label: "Sandblaster, glass", idx: 7323 },
    { label: "Sauna bath attendant", idx: 5151 },
    { label: "Sausage maker", idx: 7414 },
    { label: "Sawmill sawyer, general", idx: 8141 },
    { label: "Sawyer, precision woodworking", idx: 7423 },
    { label: "Scaffolder", idx: 7129 },
    { label: "School dental assistant", idx: 3222 },
    { label: "School President", idx: 1412 },
    { label: "School Principals", idx: 1412 },
    { label: "School Supervisors", idx: 1411 },
    { label: "Science research technician", idx: 3211 },
    { label: "Scientist, animal", idx: 2213 },
    { label: "Scientist, bacteriological", idx: 2212 },
    { label: "Scientist, forestry", idx: 2214 },
    { label: "Scientist, soils", idx: 2213 },
    { label: "Scrap buyer", idx: 9113 },
    { label: "Scribe", idx: 4144 },
    { label: "Scriptwriter", idx: 2451 },
    { label: "Sculptor", idx: 2452 },
    { label: "Sea patrol supervisor", idx: 1423 },
    { label: "Seaman", idx: 8340 },
    { label: "Seamless pipe and tube drawer", idx: 8124 },
    { label: "Seamstress", idx: 7433 },
    { label: "Seaperson", idx: 8340 },
    { label: "Secretary", idx: 4115 },
    { label: "Secretary general", idx: 1110 },
    { label: "Secretary, administrative", idx: 3431 },
    { label: "Secretary, community organizer", idx: 4115 },
    { label: "Secretary, confidential", idx: 3431 },
    { label: "Secretary, executive, committee", idx: 3439 },
    { label: "Secretary, executive, government administration", idx: 3439 },
    { label: "Secretary, legal ", idx: 4115 },
    { label: "Secretary, marketing", idx: 4115 },
    { label: "Secretary, medical", idx: 4115 },
    { label: "Secretary, office", idx: 4115 },
    { label: "Secretary, parish", idx: 4115 },
    { label: "Secretary, sales", idx: 4115 },
    { label: "Secretary, stenographic", idx: 3431 },
    { label: "Secretary-General, employers' organization", idx: 1142 },
    { label: "Secretary-General, trade union", idx: 1143 },
    { label: "Securities & Finance dealers", idx: 3411 },
    { label: "Securities and Exchange analyst", idx: 3411 },
    { label: "Securities and finance dealers and brokers", idx: 3411 },
    { label: "Securities custodian", idx: 3411 },
    { label: "Securities salesman", idx: 3411 },
    { label: "Security agent", idx: 5169 },
    { label: "Security guard", idx: 5169 },
    { label: "Seismologist", idx: 2114 },
    { label: "Senator", idx: 1120 },
    { label: "Senior Deputy Governor of Central Bank", idx: 1110 },
    { label: "Senior network administrator", idx: 1234 },
    { label: "Senior official, economic-interest organization", idx: 1142 },
    { label: "Senior official, employers' organization", idx: 1142 },
    { label: "Senior official, humanitarian organization", idx: 1144 },
    { label: "Senior official, labor organization", idx: 1143 },
    { label: "Senior official, labor union", idx: 1143 },
    { label: "Senior official, political party", idx: 1141 },
    { label: "Senior official, special-interest organization", idx: 1144 },
    { label: "Senior official, trade union", idx: 1143 },
    { label: "Senior Vice-President, organization/enterprise", idx: 1210 },
    { label: "Sepulturero", idx: 5153 },
    { label: "Sericulture worker", idx: 9211 },
    { label: "Sericulturist", idx: 6290 },
    { label: "Service and related worker (AFP)", idx: 123 },
    { label: "Service crew", idx: 5123 },
    { label: "Servicer, audio electronics", idx: 7244 },
    { label: "Setter, marble", idx: 7132 },
    { label: "Setter, mosaic", idx: 7132 },
    { label: "Setter, tile", idx: 7132 },
    { label: "Setter, woodworking machine", idx: 7423 },
    { label: "Setter-operator", idx: 7223 },
    { label: "Setter-operator, wood lathe", idx: 7423 },
    { label: "Setter-operator, wood routing machine", idx: 7423 },
    { label: "Setter-operator, wood-planing machine", idx: 7423 },
    { label: "Setter-operator, wood-shaping machine", idx: 7423 },
    { label: "Setter-operator, wood-spindle-carving machine", idx: 7423 },
    { label: "Setter-operator, woodworking machine", idx: 7423 },
    { label: "Sewer", idx: 7435 },
    { label: "Sewer, garment", idx: 7435 },
    { label: "Sewing machine operator, industrial", idx: 8253 },
    { label: "Sexton", idx: 9141 },
    { label: "Sharpener, cutting instrument", idx: 7224 },
    { label: "Sharpener, saw", idx: 7224 },
    { label: "Sharpener, tool", idx: 7224 },
    { label: "Sheep farm worker", idx: 9211 },
    { label: "Sheet-metal marker", idx: 7213 },
    { label: "Sheet-metal worker, aircraft", idx: 7213 },
    { label: "Sheet-metal worker, general", idx: 7213 },
    { label: "Sheet-metal worker, ornamental", idx: 7213 },
    { label: "Sheet-metal worker, vehicle", idx: 7213 },
    { label: "Ship boarding inspector", idx: 4133 },
    { label: "Ship fitter", idx: 7233 },
    { label: "Ship pilot", idx: 3142 },
    { label: "Ship plater", idx: 7214 },
    { label: "Ship radio operator", idx: 3132 },
    { label: "Ship sterward", idx: 3142 },
    { label: "Ship wright appraiser", idx: 3142 },
    { label: "Shipping agent", idx: 3422 },
    { label: "Shipping broker", idx: 3421 },
    { label: "Shipping operations inspector", idx: 3141 },
    { label: "Shipping operations officer", idx: 3142 },
    { label: "Shipping supervisor", idx: 1423 },
    { label: "Ship's cook", idx: 5122 },
    { label: "Ship's deck crew", idx: 8340 },
    { label: "Ship's fireman", idx: 8162 },
    { label: "Ship's master (inland waterways)", idx: 3142 },
    { label: "Ship's master (sea)", idx: 3142 },
    { label: "Ship's navigating officer", idx: 3142 },
    { label: "Ship's oiler and greaser", idx: 8162 },
    { label: "Ship's purser", idx: 5111 },
    { label: "Ship's radio officer", idx: 3132 },
    { label: "Ship's steward", idx: 5111 },
    { label: "Shipwright, wood", idx: 7123 },
    { label: "Shoe cleaner", idx: 9120 },
    { label: "Shoe cutter, hand", idx: 7442 },
    { label: "Shoe finisher", idx: 7442 },
    { label: "Shoe patternmaker", idx: 7442 },
    { label: "Shoe polisher", idx: 9120 },
    { label: "Shoe repairer", idx: 7442 },
    { label: "Shoe repairman", idx: 9120 },
    { label: "Shoe sewer, machine", idx: 7442 },
    { label: "Shoemaker", idx: 7442 },
    { label: "Shoemaking machine operator", idx: 8256 },
    { label: "Shop assistant", idx: 5220 },
    { label: "Shop superintendent, retail trade", idx: 1442 },
    { label: "Shop superintendent, wholesale trade", idx: 1441 },
    { label: "Shotfirer, mine", idx: 7112 },
    { label: "Shotfirer, quarry", idx: 7112 },
    { label: "Shunter, railway", idx: 8312 },
    { label: "Shuttle-car operator, mine", idx: 8324 },
    { label: "Signaller, railway", idx: 8312 },
    { label: "Sign-maker", idx: 7324 },
    { label: "Sign-painter", idx: 7324 },
    { label: "Silk degummer", idx: 8254 },
    { label: "Silk weighter", idx: 8254 },
    { label: "Silverer, mirror", idx: 7324 },
    { label: "Silversmith", idx: 7313 },
    { label: "Silviculturist ", idx: 2214 },
    { label: "Singer, nightclub", idx: 3473 },
    { label: "Singer, opera", idx: 2453 },
    { label: "Singer, professional", idx: 2453 },
    { label: "Singer, pub", idx: 3473 },
    { label: "Site Manager", idx: 1313 },
    { label: "Slaughterer", idx: 7411 },
    { label: "Slaughterhouse master", idx: 3223 },
    { label: "Sleeping or pullman-car attendant", idx: 5112 },
    { label: "Smoker, fish", idx: 7414 },
    { label: "Smoker, meat", idx: 7414 },
    { label: "Smoking-pipe maker", idx: 7422 },
    { label: "Snuff maker", idx: 7416 },
    { label: "Soap making", idx: 7333 },
    { label: "Social  science teacher, secondary education", idx: 2332 },
    { label: "Social security examiner", idx: 3443 },
    { label: "Social welfare officer", idx: 2446 },
    { label: "Social work associate professional", idx: 3460 },
    { label: "Social worker, general", idx: 2446 },
    { label: "Sociologist", idx: 2442 },
    { label: "Software designer", idx: 2131 },
    { label: "Software developer", idx: 2131 },
    { label: "Software engineer", idx: 2157 },
    { label: "Soil technologist", idx: 3211 },
    { label: "Sole fitter", idx: 7442 },
    { label: "Sole pressman", idx: 7442 },
    { label: "Solicitor", idx: 2421 },
    { label: "Solicitor general", idx: 1110 },
    { label: "Song Group Manager", idx: 1319 },
    { label: "Sorter, newspaper  & other paper products", idx: 9321 },
    { label: "Sound physicist", idx: 2111 },
    { label: "Speaker of the House of Representatives", idx: 1120 },
    { label: "Special assistant supervisor, organization/enterprise", idx: 1210 },
    { label: "Specialist, education methods", idx: 2391 },
    { label: "Speech therapist", idx: 2229 },
    { label: "Speech transcriber", idx: 2451 },
    { label: "Speech writer", idx: 2451 },
    { label: "Spice milling machine operator", idx: 8263 },
    { label: "Spinner, thread and yarn", idx: 8251 },
    { label: "Spinning machine operator", idx: 8251 },
    { label: "Splicer, rope and cable, general", idx: 7215 },
    { label: "Splitter, hide", idx: 7441 },
    { label: "Splitter, stone", idx: 7113 },
    { label: "Sports &  Games Regulation Officer", idx: 3475 },
    { label: "Sports & Entertainment Manager   ", idx: 1319 },
    { label: "Sports coach", idx: 3475 },
    { label: "Sports official", idx: 3475 },
    { label: "Sports Trainor", idx: 3475 },
    { label: "Sportsman", idx: 3475 },
    { label: "Spotter (dry cleaner)", idx: 9133 },
    { label: "Sprayman", idx: 7141 },
    { label: "Spray-painter, ceramics", idx: 7324 },
    { label: "Spray-painter, except construction", idx: 7142 },
    { label: "Staff officer (AFP)", idx: 112 },
    { label: "Stage director", idx: 2455 },
    { label: "Stainer, leather", idx: 7441 },
    { label: "State College  Vice President", idx: 1110 },
    { label: "State College President", idx: 1110 },
    { label: "State Counsel", idx: 2421 },
    { label: "State University & Colleges President", idx: 1412 },
    { label: "State University Chancellor", idx: 1110 },
    { label: "State University President", idx: 1110 },
    { label: "Stationary engine operator, general", idx: 8163 },
    { label: "Stationary jib crane operator", idx: 8333 },
    { label: "Statistical aide", idx: 3434 },
    { label: "Statistical aide", idx: 3434 },
    { label: "Statistical assistant", idx: 3434 },
    { label: "Statistical associate professional", idx: 3434 },
    { label: "Statistical processor", idx: 3434 },
    { label: "Statistical researcher", idx: 3434 },
    { label: "Statistician (Applied Stat.)", idx: 2122 },
    { label: "Statistician (General)", idx: 2122 },
    { label: "Statistics billing assistant", idx: 3434 },
    { label: "Steam engine operator", idx: 8162 },
    { label: "Steelman", idx: 7214 },
    { label: "Steeplejack", idx: 7129 },
    { label: "Stenographer and typist", idx: 4111 },
    { label: "Stenographer, clerk", idx: 4111 },
    { label: "Stenographer, legal", idx: 4111 },
    { label: "Stenographer-typist (General)", idx: 4111 },
    { label: "Stenographic reporter", idx: 4111 },
    { label: "Stenorecorder", idx: 4111 },
    { label: "Stereotyper", idx: 7342 },
    { label: "Sterilizing machine operator", idx: 8261 },
    { label: "Stevedore ", idx: 9333 },
    { label: "Stillman, petroleum refining", idx: 8155 },
    { label: "Stock broker", idx: 3411 },
    { label: "Stone carver", idx: 7113 },
    { label: "Stone cutter", idx: 7113 },
    { label: "Stone splitter", idx: 7113 },
    { label: "Stone treater", idx: 8112 },
    { label: "Stonemason, construction", idx: 7122 },
    { label: "Store assistant", idx: 5230 },
    { label: "Store manager", idx: 1317 },
    { label: "Storekeeper", idx: 4131 },
    { label: "Story teller, radio or television         ", idx: 2455 },
    { label: "Street car washer", idx: 9120 },
    { label: "Street dancer", idx: 3473 },
    { label: "Street singer", idx: 3473 },
    { label: "Street sweeper", idx: 9162 },
    { label: "Stripper, black and white", idx: 7344 },
    { label: "Stripper, colored", idx: 7344 },
    { label: "Stripper, tobacco, hand", idx: 7416 },
    { label: "Stripper, tobacco, machine", idx: 7416 },
    { label: "Structural metal maker", idx: 7214 },
    { label: "Structural steel worker, workshop", idx: 7214 },
    { label: "Sub-Contractor, construction", idx: 1313 },
    { label: "Sugar cane grinder", idx: 8266 },
    { label: "Sugar production machine operator", idx: 8266 },
    { label: "Sugarcane farmer", idx: 6113 },
    { label: "Supercalender operator", idx: 8143 },
    { label: "Superintendent, school, city", idx: 1411 },
    { label: "Superintendent, school, division", idx: 1411 },
    { label: "Supervising governor, organization/enterprise", idx: 1210 },
    { label: "Supervising maritime industry development", idx: 1423 },
    { label: "Supervisor, communications service", idx: 1429 },
    { label: "Supervisor, district", idx: 1411 },
    { label: "Supervisor, postal service", idx: 1425 },
    { label: "Supervisor, production", idx: 1430 },
    { label: "Supervisor, railway service", idx: 1424 },
    { label: "Supervisor, sales workers", idx: 1449 },
    { label: "Supervisor, sales, retail trade", idx: 1442 },
    { label: "Supervisor, sales, wholesale trade", idx: 1441 },
    { label: "Supervisor, telecommunications service", idx: 1429 },
    { label: "Supervisor, transport service", idx: 1429 },
    { label: "Supervisor, transport service, air", idx: 1422 },
    { label: "Supervisor, transport service, railway", idx: 1424 },
    { label: "Supervisor, transport service, road", idx: 1421 },
    { label: "Supervisor, transport service, water", idx: 1423 },
    { label: "Supervisor/adviser, dietetic management", idx: 2225 },
    { label: "Surgeon, general", idx: 2221 },
    { label: "Surgeon, oral", idx: 2222 },
    { label: "Surgery attendant", idx: 5132 },
    { label: "Survelliance officer", idx: 5169 },
    { label: "Survey statistician", idx: 2122 },
    { label: "Surveyor (general)", idx: 2157 },
    { label: "Surveyor, aerial", idx: 2157 },
    { label: "Surveyor, cadastral", idx: 2157 },
    { label: "Surveyor, geodetic", idx: 2157 },
    { label: "Surveyor, hydrographic", idx: 2157 },
    { label: "Surveyor, land", idx: 2157 },
    { label: "Surveyor, marine", idx: 3115 },
    { label: "Surveyor, mine", idx: 2157 },
    { label: "Surveyor, quantity", idx: 2159 },
    { label: "Suspension bridge cable worker", idx: 7215 },
    { label: "Sweeper, market", idx: 9162 },
    { label: "Switchman (central office equipment technician)", idx: 7245 },
    { label: "Synthetic fiber maker", idx: 8159 },
    { label: "Syrup man", idx: 7414 },
    { label: "Systems analyst", idx: 2131 },
    { label: "Systems designer", idx: 2131 },
    { label: "Systems researcher", idx: 2131 },
    { label: "Tailor", idx: 7433 },
    { label: "Tanner", idx: 7441 },
    { label: "Tapestry maker, hand", idx: 7432 },
    { label: "Tar spreading machine operator", idx: 8332 },
    { label: "Tariff analyst", idx: 3442 },
    { label: "Taster, coffee", idx: 7415 },
    { label: "Taster, food", idx: 7415 },
    { label: "Taster, liquor", idx: 7415 },
    { label: "Taster, tea", idx: 7415 },
    { label: "Taster, wine", idx: 7415 },
    { label: "Tatooist", idx: 3471 },
    { label: "Tax collector", idx: 4215 },
    { label: "Tax consultant", idx: 3442 },
    { label: "Tax enforcer", idx: 3442 },
    { label: "Tax mapper", idx: 2142 },
    { label: "Tax researcher", idx: 3442 },
    { label: "Taxi driver", idx: 8322 },
    { label: "Taxidermist", idx: 3211 },
    { label: "Taxonomist, plants and animals", idx: 2211 },
    { label: "Tea blender", idx: 8267 },
    { label: "Tea plantation worker", idx: 9211 },
    { label: "Tea processing machine operator", idx: 8267 },
    { label: "Tea taster", idx: 7415 },
    { label: "Teacher aide", idx: 3300 },
    { label: "Teacher for adult literacy", idx: 2352 },
    { label: "Teacher for the abnormal children", idx: 2353 },
    { label: "Teacher for the blind", idx: 2353 },
    { label: "Teacher for the deaf", idx: 2353 },
    { label: "Teacher for the exceptionally intelligent", idx: 2399 },
    { label: "Teacher for the mentally handicapped", idx: 2353 },
    { label: "Teacher for the physically handicapped", idx: 2353 },
    { label: "Teacher in advanced nursing", idx: 2310 },
    { label: "Teacher in agricultural science, tertiary education", idx: 2310 },
    { label: "Teacher in economics and commerce, tertiary education", idx: 2310 },
    { label: "Teacher in education, tertiary education", idx: 2310 },
    { label: "Teacher in engineering and architecture, tertiary education", idx: 2310 },
    { label: "Teacher in history, philosophy, and sociology", idx: 2310 },
    { label: "Teacher in home industries", idx: 2320 },
    { label: "Teacher in industrial arts ", idx: 2320 },
    { label: "Teacher in languages and literature, tertiary education", idx: 2310 },
    { label: "Teacher in law, tertiary education", idx: 2310 },
    { label: "Teacher in life and medical sciences, tertiary education", idx: 2310 },
    { label: "Teacher in Mathematics, tertiary education", idx: 2310 },
    { label: "Teacher in medical therapy", idx: 2310 },
    { label: "Teacher in physical sciences, tertiary education", idx: 2310 },
    { label: "Teacher in social sciences", idx: 2310 },
    { label: "Teacher in trades", idx: 2320 },
    { label: "Teacher, agricultural science, secondary education", idx: 2333 },
    { label: "Teacher, commercial and secretarial, secondary education", idx: 2333 },
    { label: "Teacher, domestic science, secondary educatin", idx: 2333 },
    { label: "Teacher, elementary mathematics", idx: 2342 },
    { label: "Teacher, elementary school", idx: 2341 },
    { label: "Teacher, elementary science", idx: 2342 },
    { label: "Teacher, fine arts, secondary education", idx: 2333 },
    { label: "Teacher, general nursing, secondary education", idx: 2333 },
    { label: "Teacher, head", idx: 1412 },
    { label: "Teacher, kindergarten", idx: 2351 },
    { label: "Teacher, language, primary educatin", idx: 2341 },
    { label: "Teacher, language, secondary education", idx: 2331 },
    { label: "Teacher, literature, secondary education", idx: 2331 },
    { label: "Teacher, mathematics, secondary education", idx: 2332 },
    { label: "Teacher, natural science, secondary education", idx: 2332 },
    { label: "Teacher, non-formal education", idx: 2352 },
    { label: "Teacher, nursery school", idx: 2351 },
    { label: "Teacher, preparatory school", idx: 2351 },
    { label: "Teacher, primary education", idx: 2341 },
    { label: "Teacher, professional, primary education", idx: 2341 },
    { label: "Teacher, reading and writing, primary education", idx: 2341 },
    { label: "Teacher, reading and writing, secondary education", idx: 2331 },
    { label: "Teacher, social studies, primary education", idx: 2341 },
    { label: "Teacher, social studies, secondary education", idx: 2331 },
    { label: "Teacher, technical education, secondary education", idx: 2333 },
    { label: "Teacher, vocational education, secondary", idx: 2333 },
    { label: "Teaching aids specialist", idx: 2391 },
    { label: "Teaching assistant", idx: 3300 },
    { label: "Teaching associate professionals", idx: 3300 },
    { label: "Teaching fellow", idx: 3300 },
    { label: "Teaching technology specialist", idx: 2391 },
    { label: "Technical and commercial sales representatives", idx: 3415 },
    { label: "Technical and vocational instructors/trainors", idx: 2320 },
    { label: "Technical sales representative", idx: 3415 },
    { label: "Technical service adviser", idx: 3415 },
    { label: "Technical specialist manager", idx: 1239 },
    { label: "Technical writer", idx: 2451 },
    { label: "Technician, adding machine", idx: 7235 },
    { label: "Technician, aeronautical engineering", idx: 3115 },
    { label: "Technician, agricultural", idx: 3219 },
    { label: "Technician, agronomy", idx: 3212 },
    { label: "Technician, animal husbandry", idx: 3219 },
    { label: "Technician, automotive engineering", idx: 3115 },
    { label: "Technician, biological", idx: 3211 },
    { label: "Technician, chemical engineering (general)", idx: 3116 },
    { label: "Technician, chemical engineering (petroleum)", idx: 3116 },
    { label: "Technician, chemistry", idx: 3111 },
    { label: "Technician, civil engineering (general)", idx: 3112 },
    { label: "Technician, cobalt machine", idx: 3133 },
    { label: "Technician, electric typewriter", idx: 7235 },
    { label: "Technician, electrical engineering (general)", idx: 3113 },
    { label: "Technician, electrical engineering (high voltage)", idx: 3113 },
    { label: "Technician, electronics business machines", idx: 7244 },
    { label: "Technician, electronics engineering", idx: 3114 },
    { label: "Technician, engineering, electronics", idx: 8172 },
    { label: "Technician, engineering/aeronautics", idx: 3115 },
    { label: "Technician, engineering/chemical", idx: 3116 },
    { label: "Technician, engineering/industrial-efficiency", idx: 3119 },
    { label: "Technician, extractive metallurgy", idx: 3117 },
    { label: "Technician, forestry", idx: 3219 },
    { label: "Technician, geology", idx: 3111 },
    { label: "Technician, heating, ventilation and refrigeration", idx: 3115 },
    { label: "Technician, industrial machinery and tools", idx: 3115 },
    { label: "Technician, mechanical engineering (general)", idx: 3115 },
    { label: "Technician, mechanical engineering (motors and engines)", idx: 3115 },
    { label: "Technician, medical scanner", idx: 3133 },
    { label: "Technician, medical science", idx: 3211 },
    { label: "Technician, medical X-ray", idx: 3133 },
    { label: "Technician, metallurgical engineering", idx: 3117 },
    { label: "Technician, mining (general)", idx: 3117 },
    { label: "Technician, mining engineering", idx: 3117 },
    { label: "Technician, PABX", idx: 7245 },
    { label: "Technician, petroleum and natural gas extraction", idx: 3117 },
    { label: "Technician, physical metallurgy", idx: 3117 },
    { label: "Technician, production engineering", idx: 3119 },
    { label: "Technician, quantity surveying", idx: 3119 },
    { label: "Technician, reprographic equipment", idx: 7235 },
    { label: "Technician, skilled, semi-skilled worker (AFP)", idx: 122 },
    { label: "Technician, standard manual typewriter", idx: 7235 },
    { label: "Technician, surveyor's", idx: 3112 },
    { label: "Technician, telecommunications engineering", idx: 3114 },
    { label: "Technician, time and motion study", idx: 3119 },
    { label: "Technician, ultrasound machine", idx: 3133 },
    { label: "Technologist, blood-bank", idx: 2227 },
    { label: "Technologist, ceramics and glass", idx: 2159 },
    { label: "Technologist, food and drink", idx: 2155 },
    { label: "Technologist, fuel", idx: 2155 },
    { label: "Technologist, microbiology ", idx: 2227 },
    { label: "Technologist, process", idx: 2155 },
    { label: "Technologist, radiologic", idx: 2227 },
    { label: "Technologist, textile", idx: 2159 },
    { label: "Technologist, wood", idx: 2159 },
    { label: "Telecommunication service supervisor", idx: 1429 },
    { label: "Telecommunications engineer", idx: 2153 },
    { label: "Telegram carrier", idx: 4142 },
    { label: "Telegraph carrier", idx: 4142 },
    { label: "Telegraph operator - communications", idx: 3139 },
    { label: "Telegrapher", idx: 3132 },
    { label: "Telegraphic trasfer service supervisor", idx: 1429 },
    { label: "Telegraphic typewriter operator", idx: 4112 },
    { label: "Telephone switchboard operator", idx: 4223 },
    { label: "Telephone system supervisor", idx: 1429 },
    { label: "Telephone technicians", idx: 3132 },
    { label: "Teleprinter operator", idx: 4112 },
    { label: "Teletypist", idx: 4112 },
    { label: "Television announcer", idx: 3472 },
    { label: "Television camera operator", idx: 3131 },
    { label: "Television station manager", idx: 1226 },
    { label: "Teller", idx: 4212 },
    { label: "Teller, bank ", idx: 4212 },
    { label: "Temperer", idx: 8123 },
    { label: "Tender, boiler", idx: 8162 },
    { label: "Terminal operations specialist", idx: 3441 },
    { label: "Terrazo worker", idx: 7122 },
    { label: "Test technician", idx: 3119 },
    { label: "Tester, electrical products", idx: 7242 },
    { label: "Tester, electronic products", idx: 7243 },
    { label: "Tester, mechanical products", idx: 7233 },
    { label: "Textile bleacher", idx: 8254 },
    { label: "Textile calender operator", idx: 8254 },
    { label: "Textile fuller", idx: 8254 },
    { label: "Textile products assembler", idx: 8276 },
    { label: "Textile shrinker", idx: 8254 },
    { label: "Textile washer", idx: 8254 },
    { label: "Theater Manager", idx: 1319 },
    { label: "Therapist, occupational", idx: 2229 },
    { label: "Therapist, physical", idx: 2229 },
    { label: "Threader, loom, hand", idx: 7432 },
    { label: "Thrower, pottery and porcelain", idx: 7321 },
    { label: "Ticket checker", idx: 4211 },
    { label: "Ticket collector", idx: 9152 },
    { label: "Ticket custodian", idx: 4211 },
    { label: "Ticket issuer", idx: 4211 },
    { label: "Ticket sorter/encoder", idx: 4211 },
    { label: "Tile setter, general", idx: 7132 },
    { label: "Timber carrier driver", idx: 8331 },
    { label: "Timber inspector", idx: 6320 },
    { label: "Timberman, underground", idx: 7111 },
    { label: "Timekeeper", idx: 4132 },
    { label: "Tinsmith", idx: 7213 },
    { label: "Tire builder", idx: 8231 },
    { label: "Tire molder", idx: 8231 },
    { label: "Tire rebuilder", idx: 8231 },
    { label: "Tobacco blender", idx: 7416 },
    { label: "Tobacco grader", idx: 7416 },
    { label: "Tobacco preparer", idx: 7416 },
    { label: "Tobacco processing machine operator", idx: 8269 },
    { label: "Tobacco production machine operator", idx: 8269 },
    { label: "Toll fee collector/teller", idx: 4211 },
    { label: "Tool grinder, machine tool", idx: 7224 },
    { label: "Tool maker", idx: 7222 },
    { label: "Toolmaker foreman", idx: 7222 },
    { label: "Tour coordinator", idx: 3414 },
    { label: "Tour guide", idx: 3414 },
    { label: "Tower crane operator", idx: 8334 },
    { label: "Toxicologist", idx: 2113 },
    { label: "Toymaker, doll", idx: 7435 },
    { label: "Toymaker, stuffed", idx: 7435 },
    { label: "Tractor driver", idx: 8331 },
    { label: "Trade broker", idx: 3421 },
    { label: "Traditional medicine practitioners", idx: 3241 },
    { label: "Traffic  Aide", idx: 5162 },
    { label: "Traffic enforcer", idx: 5162 },
    { label: "Traffic operations officer", idx: 3439 },
    { label: "Train driver", idx: 8311 },
    { label: "Trainor, vocational/technical", idx: 2333 },
    { label: "Traning Center Manager", idx: 1319 },
    { label: "Transferer, direct lithographic", idx: 7343 },
    { label: "Transferer, photo-mechanical", idx: 7343 },
    { label: "Translator", idx: 2444 },
    { label: "Transmission engineer", idx: 2153 },
    { label: "Transport conductor", idx: 5112 },
    { label: "Transport service operation manager", idx: 1421 },
    { label: "Transport tax processor", idx: 3442 },
    { label: "Trapper", idx: 6510 },
    { label: "Trapping laborer", idx: 9214 },
    { label: "Travel agency clerk", idx: 4221 },
    { label: "Travel assistant", idx: 3414 },
    { label: "Travel attendant", idx: 5111 },
    { label: "Travel consultant", idx: 3414 },
    { label: "Travel organizer", idx: 3414 },
    { label: "Travel steward", idx: 5111 },
    { label: "Travel tax officer", idx: 3441 },
    { label: "Treasurer of the Philippines", idx: 1110 },
    { label: "Tree bucker", idx: 6320 },
    { label: "Tree feller", idx: 6320 },
    { label: "Tree marker", idx: 6320 },
    { label: "Tree tapper", idx: 9211 },
    { label: "Trench-digging machine operator", idx: 8332 },
    { label: "Trimmer", idx: 7433 },
    { label: "Trolley pusher", idx: 9331 },
    { label: "Truck mounted crane operator", idx: 8333 },
    { label: "Tuner, musical instrument", idx: 7312 },
    { label: "Turbine operator, power station", idx: 8161 },
    { label: "Tutor (own account)", idx: 3300 },
    { label: "TV Microscopist technician", idx: 3133 },
    { label: "TV-AUDIO operator", idx: 3132 },
    { label: "Twister", idx: 8251 },
    { label: "Typesetter", idx: 7341 },
    { label: "Typist", idx: 4111 },
    { label: "Typist, clerk", idx: 4111 },
    { label: "Umbrella repairman", idx: 9120 },
    { label: "Underground train driver", idx: 8311 },
    { label: "Undersecretary", idx: 1110 },
    { label: "Undertaker", idx: 5153 },
    { label: "Underwriter", idx: 3412 },
    { label: "Upholsterer", idx: 7436 },
    { label: "Upholsterer, automotive", idx: 7436 },
    { label: "Upholsterer, furniture", idx: 7436 },
    { label: "Upholsterer, vehicle", idx: 7436 },
    { label: "Uppers preparer", idx: 7442 },
    { label: "Usher", idx: 5159 },
    { label: "Valet", idx: 5152 },
    { label: "Valuer", idx: 3417 },
    { label: "Van driver", idx: 8322 },
    { label: "Varnisher", idx: 7142 },
    { label: "Varnisher, manufactured articles", idx: 7142 },
    { label: "Vegetable farmer", idx: 6114 },
    { label: "Vehicle cleaner", idx: 9142 },
    { label: "Vendor, candy", idx: 9112 },
    { label: "Vendor, cigarette stand", idx: 9111 },
    { label: "Vendor, cigarette, ambulant", idx: 9112 },
    { label: "Vendor, dry goods market ", idx: 9111 },
    { label: "Vendor, flower", idx: 9111 },
    { label: "Vendor, newspaper stand ", idx: 9111 },
    { label: "Vendor, newspaper, ambulant", idx: 9112 },
    { label: "Vendor, sidewalk stall", idx: 9111 },
    { label: "Vendor, street ambulant ", idx: 9112 },
    { label: "Vendor, street food ", idx: 9112 },
    { label: "Vendor, wet market ", idx: 9111 },
    { label: "Veneer cutter", idx: 8141 },
    { label: "Ventilation equipment operator", idx: 8163 },
    { label: "Vermiculturist", idx: 6290 },
    { label: "Veterans assistance officer", idx: 3460 },
    { label: "Veterinarian (general)", idx: 2223 },
    { label: "Veterinarian quarantine aide", idx: 3223 },
    { label: "Veterinarian, public health", idx: 2223 },
    { label: "Veterinary assistant", idx: 3223 },
    { label: "Veterinary laboratory technician", idx: 3223 },
    { label: "Vice Governor", idx: 1120 },
    { label: "Vice mayor ", idx: 1120 },
    { label: "Vice president", idx: 1110 },
    { label: "Vice-Governor", idx: 1120 },
    { label: "Vice-President, college", idx: 1229 },
    { label: "Vice-President, organization/enterprise", idx: 1210 },
    { label: "Vice-President, university", idx: 1229 },
    { label: "Videographer", idx: 3131 },
    { label: "Vinegar maker", idx: 8268 },
    { label: "Vineyard worker", idx: 9211 },
    { label: "Violinist", idx: 2453 },
    { label: "Virologist", idx: 2212 },
    { label: "Visual merchandiser", idx: 3131 },
    { label: "Vocal group conductor", idx: 2453 },
    { label: "Vocational education teaching professionals", idx: 2333 },
    { label: "Vocational School Administrator", idx: 1412 },
    { label: "Vocational/guidance counsellor", idx: 2412 },
    { label: "Volcanologist", idx: 2114 },
    { label: "Volunteer midwife", idx: 3232 },
    { label: "Volunteer service officer", idx: 3460 },
    { label: "Waiter, formal service", idx: 5123 },
    { label: "Waiter, general", idx: 5123 },
    { label: "Waitress", idx: 5123 },
    { label: "Wallpaper printer", idx: 7347 },
    { label: "Warden", idx: 5163 },
    { label: "Wardrobe mistress, stage", idx: 7433 },
    { label: "Wardrobe mistress, studio", idx: 7433 },
    { label: "Warehouse aide", idx: 9141 },
    { label: "Warehouse inspector ", idx: 3441 },
    { label: "Warehouse porter", idx: 9333 },
    { label: "Warehouse shipping officer", idx: 3441 },
    { label: "Warehousing manager", idx: 1239 },
    { label: "Watcher, farm", idx: 9152 },
    { label: "Watcher, fishpond", idx: 9152 },
    { label: "Watchman", idx: 5169 },
    { label: "Watch-your-car boy", idx: 9152 },
    { label: "Water treatment plant operator, waterworks", idx: 8163 },
    { label: "Watershed forester", idx: 6310 },
    { label: "Water-treatment plant operator", idx: 8163 },
    { label: "Weather facilities specialist", idx: 2112 },
    { label: "Weather observer", idx: 2112 },
    { label: "Weather services chief", idx: 2112 },
    { label: "Weather specialist", idx: 2112 },
    { label: "Weaver", idx: 7432 },
    { label: "Weaver, cloth, hand", idx: 7432 },
    { label: "Weaver, cloth, Jacquard loom", idx: 7432 },
    { label: "Web administrator", idx: 2131 },
    { label: "Web designer/developer/master", idx: 2131 },
    { label: "Web offset operator", idx: 3122 },
    { label: "Web programmer", idx: 2132 },
    { label: "Welder", idx: 7212 },
    { label: "Welder, electric", idx: 7212 },
    { label: "Welder, electric arc, general", idx: 7212 },
    { label: "Welder, electric arc, machine", idx: 7212 },
    { label: "Welder, gas", idx: 7212 },
    { label: "Welder, gas tungsten arc", idx: 7212 },
    { label: "Welder, resistance", idx: 7212 },
    { label: "Welder, shielded metal arc", idx: 7212 },
    { label: "Welder, thermite", idx: 7212 },
    { label: "Well borer", idx: 8113 },
    { label: "Well digger", idx: 7129 },
    { label: "Well driller", idx: 8113 },
    { label: "Well driller, cable tools", idx: 8113 },
    { label: "Well puller, gas well", idx: 8113 },
    { label: "Well puller, oil well", idx: 8113 },
    { label: "Well testing crew", idx: 8113 },
    { label: "Wheel loader operator", idx: 8332 },
    { label: "Wheelwright", idx: 7422 },
    { label: "Winch operator", idx: 8333 },
    { label: "Winder", idx: 8251 },
    { label: "Winding machine operator", idx: 8251 },
    { label: "Window cleaner", idx: 9142 },
    { label: "Wine steward/stewardess", idx: 5123 },
    { label: "Wine taster", idx: 7415 },
    { label: "Wine waiter", idx: 5123 },
    { label: "Wine worker", idx: 8268 },
    { label: "Wine-making machine operator", idx: 8268 },
    { label: "Wiper", idx: 9142 },
    { label: "Wire drawer, hand", idx: 7221 },
    { label: "Wire drawer, machine", idx: 8124 },
    { label: "Wire-coating machine operator", idx: 8223 },
    { label: "Women's hairdresser", idx: 5151 },
    { label: "Wood and sash maker", idx: 7123 },
    { label: "Wood carver", idx: 7331 },
    { label: "Wood finisher, furniture", idx: 7142 },
    { label: "Wood grader", idx: 8141 },
    { label: "Wood grinder", idx: 8142 },
    { label: "Wood pattern maker", idx: 7222 },
    { label: "Wood products assembler", idx: 8275 },
    { label: "Wood products machine operator", idx: 8240 },
    { label: "Wood seasoning worker", idx: 7421 },
    { label: "Wood treater", idx: 7421 },
    { label: "Wood treating worker", idx: 7421 },
    { label: "Wood turner", idx: 7423 },
    { label: "Woodworking machine operator, general", idx: 8240 },
    { label: "Wool carbonizer", idx: 8254 },
    { label: "Wool scourer", idx: 7431 },
    { label: "Worker not reporting any occupation", idx: 940 },
    { label: "Worker reporting occupation unidentifiable", idx: 930 },
    { label: "Worker welfare assistant", idx: 3423 },
    { label: "Working proprietor, cafe", idx: 1315 },
    { label: "Working proprietor, catering", idx: 1315 },
    { label: "Working proprietor, guest house", idx: 1315 },
    { label: "Working proprietor, hotel", idx: 1315 },
    { label: "Working proprietor, lodging", idx: 1315 },
    { label: "Working proprietor, restaurant", idx: 1315 },
    { label: "Working proprietor, retail trade", idx: 1314 },
    { label: "Working proprietor, wholesale trade", idx: 1314 },
    { label: "Wrestler", idx: 3475 },
    { label: "Yarn dyer", idx: 8254 },
    { label: "Yeast maker", idx: 8268 },
    { label: "Youth development officer", idx: 3460 },
    { label: "Zoning officer", idx: 2142 },
    { label: "Zoologist (General)", idx: 2211 }
];
var psic4 = [
    { label: "Growing of cereals (except rice and corn), leguminous crops and oil seeds", idx: 111 },
    { label: "Growing of paddy rice", idx: 112 },
    { label: "Growing of corn, expcept young corn (vegetable)", idx: 113 },
    { label: "Growing of sugarcane including muscovado sugar-making in the farm", idx: 114 },
    { label: "Growing of tobacco", idx: 115 },
    { label: "Growing of fiber crops", idx: 116 },
    { label: "Growing of leafy and fruit bearing vegetables", idx: 117 },
    { label: "Growing of other vegetables, melons, roots and tubers ", idx: 118 },
    { label: "Growing of other non-perennial crops", idx: 119 },
    { label: "Growing of banana", idx: 121 },
    { label: "Growing of pineapple", idx: 122 },
    { label: "Growing of citrus fruits", idx: 123 },
    { label: "Growing of mango", idx: 124 },
    { label: "Growing of papaya", idx: 125 },
    { label: "Growing of coconut, including copra-making, tuba gathering and coco-shell charcoal making in the farm", idx: 126 },
    { label: "Growing of beverage crops", idx: 127 },
    { label: "Growing of spices, aromatic, drugs and pharmaceutical crops", idx: 128 },
    { label: "Growing of other fruits and perennial crops", idx: 129 },
    { label: "Plant propagation", idx: 130 },
    { label: "Raising of cattle and buffaloes", idx: 141 },
    { label: "Raising of horses and other equines", idx: 142 },
    { label: "Dairy farming", idx: 143 },
    { label: "Raising of sheeps and goats", idx: 144 },
    { label: "Hog farming", idx: 145 },
    { label: "Chicken production (including operation chicken hatcheries)", idx: 146 },
    { label: "Raising of poultry (except chicken)", idx: 147 },
    { label: "Egg production", idx: 148 },
    { label: "Raising of other animals", idx: 149 },
    { label: "Operation of irrigation systems through cooperatives and non-cooperatives", idx: 151 },
    { label: "Planting, transplanting and other related activities", idx: 152 },
    { label: "Services to establish crops, promote their growth and protect them from pests and diseases", idx: 153 },
    { label: "Harvesting, threshing, grading, bailing and related services", idx: 154 },
    { label: "Rental of farm machinery with drivers and crew", idx: 155 },
    { label: "Support activities for animal production", idx: 156 },
    { label: "Post-harvest crop activities", idx: 157 },
    { label: "Seed processing for propagation", idx: 158 },
    { label: "Hunting, trapping and related service activities", idx: 170 },
    { label: "Growing of timber forest species (e.g. Gemelina, Eucalyptus, etc.), planting, replanting, transplanting, thinning and conserving of forest and timber tracts", idx: 211 },
    { label: "Operation of forest tree nurseries", idx: 212 },
    { label: "Logging", idx: 220 },
    { label: "Gathering of non-wood forest products", idx: 230 },
    { label: "Support services to forestry", idx: 240 },
    { label: "Marine fishing", idx: 311 },
    { label: "Freshwater fishing", idx: 312 },
    { label: "Operation of  freshwater fish pond, fish pens, cage and hatcheries ", idx: 321 },
    { label: "Operation of marine or sea water fish tanks, pens, cage and hatcheries ", idx: 322 },
    { label: "Operation of marine sport fishing preserves", idx: 323 },
    { label: "Prawn culture in brackish water", idx: 324 },
    { label: "Culture of mollusks, bivalves and other crustaceans (except prawn culture)", idx: 325 },
    { label: "Pearl culture and pearl shell gathering", idx: 326 },
    { label: "Gathering of laver and other edible seaweeds", idx: 327 },
    { label: "Support service activities incidental to aquaculture", idx: 328 },
    { label: "Other aquaculture activities", idx: 329 },
    { label: "Mining of hard coal", idx: 510 },
    { label: "Mining of lignite", idx: 520 },
    { label: "Extraction of crude petroleum", idx: 610 },
    { label: "Extraction of natural gas", idx: 620 },
    { label: "Mining of iron ores", idx: 710 },
    { label: "Mining of uranium and thorium ores", idx: 721 },
    { label: "Mining of precious metals", idx: 722 },
    { label: "Mining of other non-ferrous metal ores", idx: 729 },
    { label: "Quarrying of stone, sand and clay", idx: 810 },
    { label: "Mining of chemical and fertilizer minerals", idx: 891 },
    { label: "Extraction of peat", idx: 892 },
    { label: "Extraction of salt", idx: 893 },
    { label: "Other mining and quarrying, n.e.c.", idx: 899 },
    { label: "Support activities for petroleum and gas extraction", idx: 910 },
    { label: "Support activities for other mining and quarrying", idx: 990 },
    { label: "Slaughtering and meat packing", idx: 1011 },
    { label: "Production processing and preserving of meat and meat products", idx: 1012 },
    { label: "Processing and preserving of fish, crustaceans and mollusks", idx: 1020 },
    { label: "Processing and preserving of fruits and vegetables", idx: 1030 },
    { label: "Manufacture of virgin coconut oil", idx: 1041 },
    { label: "Manufacture of dessicated coconut ", idx: 1042 },
    { label: "Manufacture of nata de coco", idx: 1043 },
    { label: "Production of crude vegetable oil, cake and meals, other than virgin coconut oil (see class 1041)", idx: 1044 },
    { label: "Manufacture of refined coconut and other vegetable oil (including corn oil) and margarine", idx: 1045 },
    { label: "Manufacture of fish oil and other marine animal oils", idx: 1046 },
    { label: "Manufacture of unprepared animal feeds from vegetable, animal oils and fats", idx: 1047 },
    { label: "Manufacture of vegetable and animal oil and fats, n.e.c.", idx: 1049 },
    { label: "Processing of fresh milk and cream", idx: 1051 },
    { label: "Manufacture of powdered milk (except for infants) and condensed or evaporated milk (filled, combined or reconstituted)", idx: 1052 },
    { label: "Manufacture of infants' powdered milk", idx: 1053 },
    { label: "Manufacture of butter, cheese and curd", idx: 1054 },
    { label: "Manufacture of ice cream and sherbet, ice drop, ice candy and other flavored ices", idx: 1055 },
    { label: "Manufacture of milk-based infants' and dietetic foods", idx: 1056 },
    { label: "Manufacture of yoghurt", idx: 1057 },
    { label: "Manufacture of whey", idx: 1058 },
    { label: "Manufacture of dairy products, n.e.c.", idx: 1059 },
    { label: "Rice/corn milling", idx: 1061 },
    { label: "Manufacture of grain and vegetable mill products except rice and corn", idx: 1062 },
    { label: "Manufacture of starches and starch products", idx: 1063 },
    { label: "Manufacture of bakery products", idx: 1071 },
    { label: "Manufacture of sugar", idx: 1072 },
    { label: "Manufacture of cocoa, chocolate and sugar confectionery", idx: 1073 },
    { label: "Manufacture of macaroni, noodles, couscous and similar farinaceous products", idx: 1074 },
    { label: "Manufactured of prepared meals and dishes", idx: 1075 },
    { label: "Manufacture of food supplements from herbs and other plants", idx: 1076 },
    { label: "Coffee roasting and processing", idx: 1077 },
    { label: "Manufacture of other food products, n.e.c.", idx: 1079 },
    { label: "Manufacture of prepared animal feeds", idx: 1080 },
    { label: "Distilling, rectifying and blending of spirits", idx: 1101 },
    { label: "Manufacture of wines", idx: 1102 },
    { label: "Manufacture of malt liquors and malt", idx: 1103 },
    { label: "Manufacture of softdrinks", idx: 1104 },
    { label: "Manufacture of drinking water and mineral water", idx: 1105 },
    { label: "Manufacture of sports and energy drink", idx: 1106 },
    { label: "Manufacture of other beverages, n.e.c.", idx: 1109 },
    { label: "Manufacture of cigarettes", idx: 1201 },
    { label: "Manufacture of cigars", idx: 1202 },
    { label: "Manufacture of chewing and smoking tobacco, snuff", idx: 1203 },
    { label: "Curing and redrying tobacco leaves", idx: 1204 },
    { label: "Tobacco manufacturing, n.e.c.", idx: 1209 },
    { label: "Preparation and spinning of textile fibers", idx: 1311 },
    { label: "Weaving of textiles", idx: 1312 },
    { label: "Finishing of textiles", idx: 1313 },
    { label: "Preparation and finishing of textiles (integrated)", idx: 1314 },
    { label: "Manufacture of knitted and crocheted fabrics", idx: 1391 },
    { label: "Manufacture of made-up textile articles, except wearing apparel", idx: 1392 },
    { label: "Manufacture of carpet and rugs", idx: 1393 },
    { label: "Manufacture of cordage, rope, twine and netting", idx: 1394 },
    { label: "Manufacture of embroidered fabrics", idx: 1395 },
    { label: "Manufacture of other textiles, n.e.c.", idx: 1399 },
    { label: "Men's and boys' garment manufacturing", idx: 1411 },
    { label: "Women's and girls' and babies' garment manufacturing", idx: 1412 },
    { label: "Ready-made embroidered garments manufacturing", idx: 1413 },
    { label: "Manufacture of wearing apparel, n.e.c", idx: 1419 },
    { label: "Custom tailoring ", idx: 1421 },
    { label: "Custom dressmaking", idx: 1422 },
    { label: "Manufacture of knitted and crocheted apparel", idx: 1430 },
    { label: "Manufacture of articles of fur", idx: 1440 },
    { label: "Tanning and dressing of leather", idx: 1511 },
    { label: "Manufacture of products of leather and imitation leather", idx: 1512 },
    { label: "Manufacture of leather shoes", idx: 1521 },
    { label: "Manufacture of rubber shoes", idx: 1522 },
    { label: "Manufacture of plastic shoes", idx: 1523 },
    { label: "Manufacture of shoes made of textile materials with applied soles", idx: 1524 },
    { label: "Manufacture of wooden footwear and accessories", idx: 1525 },
    { label: "Manufacture of footwear, n.e.c.", idx: 1529 },
    { label: "Sawmilling and planing of wood", idx: 1610 },
    { label: "Manufacture of veneer sheets; manufacture of plywood, laminboard, particle board and other panels and board", idx: 1621 },
    { label: "Manufacture of wooden window and door screens, shades and venetian blinds", idx: 1622 },
    { label: "Manufacture of other builders' carpentry and joinery; millworking", idx: 1623 },
    { label: "Manufacture of wooden containers ", idx: 1624 },
    { label: "Manufacture of wood carvings", idx: 1625 },
    { label: "Manufacture of charcoal outside the forest", idx: 1626 },
    { label: "Manufacture of wooden wares ", idx: 1627 },
    { label: "Manufacture of products of bamboo, cane, rattan and the like, and plaiting materials except furniture", idx: 1628 },
    { label: "Manufacture of other products of wood; manufacture of articles of cork and plaiting materials, except furniture, n.e.c.", idx: 1629 },
    { label: "Manufacture of pulp, paper and paperboard ", idx: 1701 },
    { label: "Manufacture of corrugated paper and paperboard and of containers of paper and paperboard", idx: 1702 },
    { label: "Manufacture of other articles of paper and paperboard", idx: 1709 },
    { label: "Printing", idx: 1811 },
    { label: "Service activities related to printing", idx: 1812 },
    { label: "Reproduction of recorded media", idx: 1820 },
    { label: "Manufacture of coke oven products", idx: 1910 },
    { label: "Manufacture of refined petroleum products", idx: 1920 },
    { label: "Manufacture of other fuel products", idx: 1990 },
    { label: "Manufacture of basic chemicals", idx: 2011 },
    { label: "Manufacture of fertilizers and nitrogen compounds", idx: 2012 },
    { label: "Manufacture of plastics and synthetic rubber in primary forms", idx: 2013 },
    { label: "Manufacture of pesticides and other agro-chemical products", idx: 2021 },
    { label: "Manufacture of paints, varnishes and similar coatings, printing ink and mastics", idx: 2022 },
    { label: "Manufacture of soap and detergents, cleaning and polishing preparations, perfumes and toilet preparations", idx: 2023 },
    { label: "Manufacture of other chemical products, n.e.c.", idx: 2029 },
    { label: "Manufacture of man-made fibers", idx: 2030 },
    { label: "Manufacture of pharmaceuticals, medicinal chemical and botanical products", idx: 2100 },
    { label: "Manufacture of rubber tires and tubes; retreading and rebuilding of rubber tires", idx: 2211 },
    { label: "Manufacture of other rubber products", idx: 2219 },
    { label: "Manufacture of plastics products", idx: 2220 },
    { label: "Manufacture of glass and glass products", idx: 2310 },
    { label: "Manufacture of refractory products", idx: 2391 },
    { label: "Manufacture of clay building materials", idx: 2392 },
    { label: "Manufacture of other porcelain and ceramic products", idx: 2393 },
    { label: "Manufacture of cement", idx: 2394 },
    { label: "Manufacture of lime and plaster", idx: 2395 },
    { label: "Manufacture of articles of concrete, cement and plaster", idx: 2396 },
    { label: "Cutting, shaping and finishing of stone", idx: 2397 },
    { label: "Manufacture of other non-metallic mineral products, n.e.c.", idx: 2399 },
    { label: "Operation of blast furnaces and steel making furnaces", idx: 2411 },
    { label: "Operation of steel works and rolling mills", idx: 2412 },
    { label: "Gold and other precious metal refining", idx: 2421 },
    { label: "Non-ferrous smelting and refining , except precious metals", idx: 2422 },
    { label: "Non-ferrous rolling, drawing and extrusion mills", idx: 2423 },
    { label: "Manufacture of pipe fittings of non-ferrous metals", idx: 2424 },
    { label: "Manufacture of basic precious and other non-ferrous metals, n.e.c.", idx: 2429 },
    { label: "Casting of iron and steel", idx: 2431 },
    { label: "Casting of non-ferrous metals", idx: 2432 },
    { label: "Manufacture of structural metal products", idx: 2511 },
    { label: "Manufacture of tanks, reservoirs and containers of metal", idx: 2512 },
    { label: "Manufacture of steam generators, except central heating hot water boilers", idx: 2513 },
    { label: "Manufacture of weapons and ammunition", idx: 2520 },
    { label: "Forging, pressing, stamping and roll-forming of metal; powder metallurgy", idx: 2591 },
    { label: "Treatment and coating of metals; machining", idx: 2592 },
    { label: "Manufacture of cutlery, hand tools and general hardware", idx: 2593 },
    { label: "Manufacture of other fabricated metal products, n.e.c.", idx: 2599 },
    { label: "Manufacture of electronic valves and tubes", idx: 2611 },
    { label: "Manufacture of semi-conductor devices and other electronic components", idx: 2612 },
    { label: "Manufacture of computers and peripheral equipment and accessories", idx: 2620 },
    { label: "Manufacture of communication equipment", idx: 2630 },
    { label: "Manufacture of consumer electronics", idx: 2640 },
    { label: "Manufacture of measuring, testing, navigating and control equipment", idx: 2651 },
    { label: "Manufacture of watches and clocks", idx: 2652 },
    { label: "Manufacture of irradiation, electromedical and electrotherapeutic equipment", idx: 2660 },
    { label: "Manufacture of optical instruments and photographic equipment", idx: 2670 },
    { label: "Manufacture of magnetic and optical media ", idx: 2680 },
    { label: "Manufacture of electric motors, generators, transformers and electric generating sets", idx: 2711 },
    { label: "Manufacture of electricity distribution and control apparatus", idx: 2712 },
    { label: "Manufacture of batteries and accumulators", idx: 2720 },
    { label: "Manufacture of fiber optic cables", idx: 2731 },
    { label: "Manufacture of other electronic and electric wires and cables", idx: 2732 },
    { label: "Manufacture of wiring devices", idx: 2733 },
    { label: "Manufacture of electric lighting equipment", idx: 2740 },
    { label: "Manufacture of domestic appliances", idx: 2750 },
    { label: "Manufacture of other electrical equipment", idx: 2790 },
    { label: "Manufacture of engines and turbines, except aircraft, vehicle and cycle engines", idx: 2811 },
    { label: "Manufacture of fluid power equipment", idx: 2812 },
    { label: "Manufacture of other pumps, compressors, taps and valves", idx: 2813 },
    { label: "Manufacture of bearings, gears and driving elements", idx: 2814 },
    { label: "Manufacture of ovens, furnaces and furnace burners", idx: 2815 },
    { label: "Manufacture of lifting and handling equipment", idx: 2816 },
    { label: "Manufacture of office machinery and equipment (except computers and peripheral equipment)", idx: 2817 },
    { label: "Manufacture of power-driven hand tools", idx: 2818 },
    { label: "Manufacture of other general-purpose machinery", idx: 2819 },
    { label: "Manufacture of agricultural and forestry machinery", idx: 2821 },
    { label: "Manufacture of metal-forming machinery and machine tools", idx: 2822 },
    { label: "Manufacture of machinery for metallurgy", idx: 2823 },
    { label: "Manufacture of machinery for mining, quarrying and construction", idx: 2824 },
    { label: "Manufacture of machinery for food beverage and tobacco processing", idx: 2825 },
    { label: "Manufacture of machinery for textile, apparel and leather production", idx: 2826 },
    { label: "Manufacture of other special-purpose machinery", idx: 2829 },
    { label: "Manufacture of motor vehicles", idx: 2910 },
    { label: "Manufacture of bodies (coachwork) for motor vehicles; manufacture of trailers and semi-trailers", idx: 2920 },
    { label: "Manufacture of parts and accessories for motor vehicles ", idx: 2930 },
    { label: "Building of ships and floating structures", idx: 3011 },
    { label: "Building of pleasure and sporting boats", idx: 3012 },
    { label: "Manufacture of railway locomotive and rolling stock", idx: 3020 },
    { label: "Manufacture of air and spacecraft and related machinery", idx: 3030 },
    { label: "Manufacture of military fighting vehicles ", idx: 3040 },
    { label: "Manufacture of motorcyles", idx: 3091 },
    { label: "Manufacture of bicycles and invalid carriages", idx: 3092 },
    { label: "Manufacture of other transport equipment, n.e.c", idx: 3099 },
    { label: "Manufacture of wood furniture", idx: 3101 },
    { label: "Manufacture of rattan furniture (reed, wicker, and cane)", idx: 3102 },
    { label: "Manufacture of box beds and mattresses", idx: 3103 },
    { label: "Manufacture of partitions, shelves, lockers and office and store fixtures", idx: 3104 },
    { label: "Manufacture of plastic furniture", idx: 3105 },
    { label: "Manufacture of furniture and fixtures of metal", idx: 3106 },
    { label: "Manufacture of other furniture and fixtures, n.e.c.", idx: 3109 },
    { label: "Manufacture of jewelry and related articles", idx: 3211 },
    { label: "Manufacture of imitation of jewelry and related articles", idx: 3212 },
    { label: "Manufacture of musical instruments", idx: 3220 },
    { label: "Manufacture of sports goods", idx: 3230 },
    { label: "Manufacture of games and toys", idx: 3240 },
    { label: "Manufacture of medical and dental instruments and supplies", idx: 3250 },
    { label: "Manufacture of pens and pencils of all kinds", idx: 3291 },
    { label: "Manufacture of umbrellas, walking sticks, canes, whips and riding crops", idx: 3292 },
    { label: "Manufacture of articles for personal use, e.g. smoking pipes, combs, slides and similar articles ", idx: 3293 },
    { label: "Manufacture of candles", idx: 3294 },
    { label: "Manufacture of artificial flowers, fruits and foliage", idx: 3295 },
    { label: "Manufacture of burial coffin", idx: 3296 },
    { label: "Manufacture of other miscellaneous articles, n.e.c.", idx: 3299 },
    { label: "Repair of fabricated metal products", idx: 3311 },
    { label: "Repair of machinery", idx: 3312 },
    { label: "Repair of electronic and optical equipment ", idx: 3313 },
    { label: "Repair of electrical equipment", idx: 3314 },
    { label: "Repair of transport equipment, except motor vehicles", idx: 3315 },
    { label: "Repair of other equipment", idx: 3319 },
    { label: "Installation of industrial machinery and equipment", idx: 3320 },
    { label: "Electric power generation, transmission and distribution", idx: 3510 },
    { label: "Manufacture of gas; distribution of gaseous fuels through mains", idx: 3520 },
    { label: "Steam, air conditioning supply and production of ice", idx: 3530 },
    { label: "Water collection, treatment and supply", idx: 3600 },
    { label: "Sewerage", idx: 3700 },
    { label: "Collection of non-hazardous waste", idx: 3811 },
    { label: "Collection of hazardous waste", idx: 3812 },
    { label: "Treatment and disposal of non-hazardous waste", idx: 3821 },
    { label: "Treatment and disposal of hazardous waste", idx: 3822 },
    { label: "Materials recovery", idx: 3830 },
    { label: "Remediation activities and other waste management services", idx: 3900 },
    { label: "Construction of buildings", idx: 4100 },
    { label: "Construction of roads and railways", idx: 4210 },
    { label: "Construction of utility projects", idx: 4220 },
    { label: "Construction of other civil engineering projects", idx: 4290 },
    { label: "Demolition", idx: 4311 },
    { label: "Site preparation", idx: 4312 },
    { label: "Electrical installation", idx: 4321 },
    { label: "Plumbing, heat and air-conditioning installation", idx: 4322 },
    { label: "Other construction installation", idx: 4329 },
    { label: "Building completion and finishing", idx: 4330 },
    { label: "Other specialized construction activities", idx: 4390 },
    { label: "Sale of motor vehicles", idx: 4510 },
    { label: "Maintenance and repair of motor vehicles", idx: 4520 },
    { label: "Sale of motor vehicle parts and accessories", idx: 4530 },
    { label: "Sale, maintenance and repair of motorcycles and related parts and accessories", idx: 4540 },
    { label: "Wholesale on a fee or contract basis", idx: 4610 },
    { label: "Wholesale of agricultural raw materials and live animals", idx: 4620 },
    { label: "Wholesale of food, beverages and tobacco", idx: 4630 },
    { label: "Wholesale of textiles, clothing and footwear", idx: 4641 },
    { label: "Wholesale of miscellaneous consumer goods", idx: 4642 },
    { label: "Wholesale of other household goods", idx: 4649 },
    { label: "Wholesale of computers, computer peripheral equipment and software", idx: 4651 },
    { label: "Wholesale of electronic and telecommunications equipment and parts", idx: 4652 },
    { label: "Wholesale of agricultural machinery, equipment and supplies", idx: 4653 },
    { label: "Wholesale of other machinery and equipment", idx: 4659 },
    { label: "Wholesale of solid, liquid and gaseous fuels and related products", idx: 4661 },
    { label: "Wholesale of metals and metal ores", idx: 4662 },
    { label: "Wholesale of construction materials, hardware, plumbing and heating equipment and supplies", idx: 4663 },
    { label: "Wholesale of waste and scrap and other products, n.e.c.", idx: 4669 },
    { label: "Non-specialized wholesale trade", idx: 4690 },
    { label: "Retail sale in non-specialized stores with food, beverages or tobacco predominating", idx: 4711 },
    { label: "Other retail sale in non-specialized stores", idx: 4719 },
    { label: "Retail sale of food in specialized stores", idx: 4721 },
    { label: "Retail sale of beverages in specialized stores", idx: 4722 },
    { label: "Retail sale of tobacco products in specialized stores", idx: 4723 },
    { label: "Retail sale of automotive fuel in specialized stores", idx: 4730 },
    { label: "Retail sale of computers, peripheral units, software and telecommunications equipment in specialized stores", idx: 4741 },
    { label: "Retail sale of audio and video equipment in specialized stores", idx: 4742 },
    { label: "Retail sale of textiles in specialized stores", idx: 4751 },
    { label: "Retail sale of hardware, paints and glass in specialized stores", idx: 4752 },
    { label: "Retail sale of carpets, rugs, wall and floor coverings in specialized stores", idx: 4753 },
    { label: "Retail sale of electrical household appliances, furniture, lighting equipment and other household articles in specialized stores", idx: 4759 },
    { label: "Retail sale of books, newspapers and stationery in specialized stores", idx: 4761 },
    { label: "Retail sale of music and video recordings in specialized stores", idx: 4762 },
    { label: "Retail sale of sporting equipment in specialized stores", idx: 4763 },
    { label: "Retail sale of games and toys in specialized stores", idx: 4764 },
    { label: "Retail sale of clothing, footwear and leather articles in specialized stores", idx: 4771 },
    { label: "Retail sale of pharmaceutical and medical goods, cosmetic and toilet articles in specialized stores", idx: 4772 },
    { label: "Other retail sale of new goods in specialized stores", idx: 4773 },
    { label: "Retail sale of second-hand goods", idx: 4774 },
    { label: "Retail sale of liquefied petroleum gas and other fuel products", idx: 4775 },
    { label: "Retail sale via stalls and markets of food, beverages and tobacco products", idx: 4781 },
    { label: "Retail sale via stalls and markets of textiles, clothing and footwear", idx: 4782 },
    { label: "Retail sale via stalls and markets of other goods", idx: 4789 },
    { label: "Retail sale via mail/telephone order houses or via internet", idx: 4791 },
    { label: "Other retail sale not in stores, stalls or markets", idx: 4799 },
    { label: "Passenger rail transport, inter-urban", idx: 4911 },
    { label: "Freight rail transport", idx: 4912 },
    { label: "Transport via buses", idx: 4920 },
    { label: "Urban or suburban passenger land transport, except by bus", idx: 4931 },
    { label: "Other passenger land transport", idx: 4932 },
    { label: "Freight transport by road", idx: 4933 },
    { label: "Transport via pipeline", idx: 4940 },
    { label: "Sea and coastal passenger water transport", idx: 5011 },
    { label: "Sea and coastal freight water transport", idx: 5012 },
    { label: "Inland passenger water transport", idx: 5021 },
    { label: "Inland freight water transport", idx: 5022 },
    { label: "Passenger air transport", idx: 5110 },
    { label: "Freight air transport", idx: 5120 },
    { label: "Warehousing and storage", idx: 5210 },
    { label: "Service activities incidental to land transportation", idx: 5221 },
    { label: "Service activities incidental to water transportation", idx: 5222 },
    { label: "Service activities incidental to air transportation", idx: 5223 },
    { label: "Cargo handling", idx: 5224 },
    { label: "Other transportation support activities", idx: 5229 },
    { label: "Postal activities", idx: 5310 },
    { label: "Courier activities", idx: 5320 },
    { label: "Short term acommodation activities", idx: 5510 },
    { label: "Other accommodation", idx: 5590 },
    { label: "Restaurants and mobile food service activities", idx: 5610 },
    { label: "Event catering", idx: 5621 },
    { label: "Other food service activities", idx: 5629 },
    { label: "Beverage serving activities", idx: 5630 },
    { label: "Book Publishing", idx: 5811 },
    { label: "Publishing of directories and mailing lists", idx: 5812 },
    { label: "Publishing of newspapers, journals and periodicals", idx: 5813 },
    { label: "Other publishing activities", idx: 5819 },
    { label: "Software publishing", idx: 5820 },
    { label: "Motion picture, video and television programme activities", idx: 5911 },
    { label: "Motion picture, video and television programme post-production activities", idx: 5912 },
    { label: "Motion picture, video and television programme distribution activities", idx: 5913 },
    { label: "Motion picture projection activities", idx: 5914 },
    { label: "Sound recording and music publishing activities", idx: 5920 },
    { label: "Radio broadcasting", idx: 6010 },
    { label: "Television programming and broadcasting activities", idx: 6020 },
    { label: "Wired telecommunications activities", idx: 6110 },
    { label: "Wireless telecommunications activities", idx: 6120 },
    { label: "Satellite telecommunications activities", idx: 6130 },
    { label: "Other telecommunications activities", idx: 6190 },
    { label: "Computer programming activities", idx: 6201 },
    { label: "Computer consultancy and computer facilities management activities", idx: 6202 },
    { label: "Other information technology and computer service activities", idx: 6209 },
    { label: "Data processing, hosting and related activities", idx: 6311 },
    { label: "Web portals", idx: 6312 },
    { label: "News agency activities", idx: 6391 },
    { label: "Other information service activities, n.e.c.", idx: 6399 },
    { label: "Central banking", idx: 6411 },
    { label: "Other monetary intermediation", idx: 6419 },
    { label: "Activities of holding companies", idx: 6420 },
    { label: "Trusts, funds and other financial vehicles", idx: 6430 },
    { label: "Financial leasing ", idx: 6491 },
    { label: "Other credit granting", idx: 6492 },
    { label: "Pawnshop operations", idx: 6493 },
    { label: "Other financial service activities, except insurance and pension funding activities, n.e.c.", idx: 6499 },
    { label: "Life insurance", idx: 6511 },
    { label: "Non-life insurance", idx: 6512 },
    { label: "Reinsurance", idx: 6520 },
    { label: "Pension funding ", idx: 6530 },
    { label: "Administration of financial markets", idx: 6611 },
    { label: "Security and commodity contracts brokerage", idx: 6612 },
    { label: "Foreign exchange dealing", idx: 6613 },
    { label: "Other activities auxiliary to financial service activities", idx: 6619 },
    { label: "Risk and damage evaluation", idx: 6621 },
    { label: "Activities of insurance agents and brokers", idx: 6622 },
    { label: "Pre-need plan acitivities", idx: 6623 },
    { label: "Other activities auxilary to insurance and pension funding", idx: 6629 },
    { label: "Fund management activities", idx: 6630 },
    { label: "Real estate buying, selling, renting, leasing and operating of self-owned/leased apartment buildings, non-residential and dwellings", idx: 6811 },
    { label: "Real estate buying, developing, subdividing and selling", idx: 6812 },
    { label: "Cemetery and columbarium development, selling, renting, leasing and operating of self-owned cemetery/columbarium (including burial crypt) ", idx: 6813 },
    { label: "Renting or leasing services of residential properties", idx: 6814 },
    { label: "Other real estate activities with own or leased property", idx: 6819 },
    { label: "Real estate activities on a fee or contract basis", idx: 6820 },
    { label: "Legal activities", idx: 6910 },
    { label: "Accounting, bookkeeping and auditing activities; tax consultancy", idx: 6920 },
    { label: "Activities of head offices", idx: 7010 },
    { label: "Management consultancy activities", idx: 7020 },
    { label: "Architectural and engineering activities and related technical consultancy", idx: 7110 },
    { label: "Technical testing and analysis", idx: 7120 },
    { label: "Research and experimental development on natural sciences and engineering", idx: 7210 },
    { label: "Research and experimental development on social sciences and humanities", idx: 7220 },
    { label: "Research and experimental development in information technology", idx: 7230 },
    { label: "Advertising", idx: 7310 },
    { label: "Market research and public opinion polling", idx: 7320 },
    { label: "Specialized design activities", idx: 7410 },
    { label: "Photographic activities", idx: 7420 },
    { label: "Other professional, scientific and technical activities, n.e.c.", idx: 7490 },
    { label: "Veterinary activities", idx: 7500 },
    { label: "Renting and leasing of motor vehicles", idx: 7710 },
    { label: "Renting and leasing of recreational and sports goods", idx: 7721 },
    { label: "Renting of video tapes and disks", idx: 7722 },
    { label: "Renting and leasing of other personal and household goods", idx: 7729 },
    { label: "Renting and leasing of other machinery, equipment and tangible goods, n.e.c.", idx: 7730 },
    { label: "Leasing of intellectual property and similar products, except copyrighted works", idx: 7740 },
    { label: "Activities of employment placement agencies", idx: 7810 },
    { label: "Temporary employment agency activities", idx: 7820 },
    { label: "Other human resources provision", idx: 7830 },
    { label: "Travel agency activities", idx: 7911 },
    { label: "Tour operator activities", idx: 7912 },
    { label: "Other reservation service and related activities", idx: 7990 },
    { label: "Private security activites", idx: 8010 },
    { label: "Security systems service activities", idx: 8020 },
    { label: "Investigation activities", idx: 8030 },
    { label: "Combined facilities support activities", idx: 8110 },
    { label: "General cleaning of buildings", idx: 8121 },
    { label: "Other building and industrial cleaning activities", idx: 8129 },
    { label: "Landscape care and maintenance service activities", idx: 8130 },
    { label: "Combined office administrative service activities", idx: 8211 },
    { label: "Photocopying, document preparation and other specialized office support activities", idx: 8219 },
    { label: "Call centers activities (Voice)", idx: 8221 },
    { label: "Back-office operations activities (Non-voice)", idx: 8222 },
    { label: "Other non-voice related activities", idx: 8229 },
    { label: "Organization of conventions and trade shows ", idx: 8230 },
    { label: "Activities of collection agencies and credit bureaus", idx: 8291 },
    { label: "Packaging activities", idx: 8292 },
    { label: "Other business support service activities, n.e.c.", idx: 8299 },
    { label: "General public administration activities", idx: 8411 },
    { label: "Regulation of the activities of providing health care, education, cultural services and other social services, excluding social security", idx: 8412 },
    { label: "Regulation of and contribution to more efficient operation of businesses", idx: 8413 },
    { label: "Foreign affairs", idx: 8421 },
    { label: "Defense activities", idx: 8422 },
    { label: "Public order and safety activities", idx: 8423 },
    { label: "Compulsory social security activities", idx: 8430 },
    { label: "Pre-primary/pre-school education (for children without special needs)", idx: 8511 },
    { label: "Pre-primary education for children with special needs", idx: 8512 },
    { label: "Primary/elementary education (for children without special needs)", idx: 8521 },
    { label: "Primary/elementary education for children with special needs", idx: 8522 },
    { label: "General secondary education for children without special needs", idx: 8531 },
    { label: "General secondary education for children with special needs", idx: 8532 },
    { label: "Technical and vocational secondary education for children without special needs", idx: 8533 },
    { label: "Technical and vocational secondary education for children with special needs", idx: 8534 },
    { label: "Higher education", idx: 8540 },
    { label: "Sports and recreation education", idx: 8551 },
    { label: "Cultural education", idx: 8552 },
    { label: "Other education n.e.c.", idx: 8559 },
    { label: "Educational support services", idx: 8560 },
    { label: "Public hospitals, sanitaria and other similar activities", idx: 8611 },
    { label: "Private hospitals, sanitaria and other similar activities", idx: 8612 },
    { label: "Public medical, dental and other health activities", idx: 8621 },
    { label: "Private medical, dental and other health activities", idx: 8622 },
    { label: "Other human health activities", idx: 8690 },
    { label: "Residential nursing care facilities", idx: 8710 },
    { label: "Residential care activities for mental retardation, mental health and substance abuse", idx: 8720 },
    { label: "Residential care activities for the elderly and disabled", idx: 8730 },
    { label: "Other residential care activities, n.e.c.", idx: 8790 },
    { label: "Social work activities without accommodation for the elderly and disabled", idx: 8810 },
    { label: "Other social work activities without accommodation, n.e.c.", idx: 8890 },
    { label: "Creative, arts and entertainment activities", idx: 9000 },
    { label: "Library and archives activities", idx: 9101 },
    { label: "Museums activities and operation of historical sites and buildings", idx: 9102 },
    { label: "Botanical and zoological gardens and nature reserves activities", idx: 9103 },
    { label: "Gambling and betting activities", idx: 9200 },
    { label: "Operation of sports facilities", idx: 9311 },
    { label: "Activities of sports clubs", idx: 9312 },
    { label: "Other sports activities", idx: 9319 },
    { label: "Activities of amusement parks and theme parks", idx: 9321 },
    { label: "Other amusement and recreation activities, n.e.c.", idx: 9329 },
    { label: "Activities of business and employers membership organizations", idx: 9411 },
    { label: "Activities of professional membership organizations", idx: 9412 },
    { label: "Activities of trade unions", idx: 9420 },
    { label: "Activities of religious organizations", idx: 9491 },
    { label: "Activities of political organizations", idx: 9492 },
    { label: "Activities of other membership organizations, n.e.c.", idx: 9499 },
    { label: "Repair of computers and peripheral equipment", idx: 9511 },
    { label: "Repair of communications equipment", idx: 9512 },
    { label: "Repair of consumer electronics", idx: 9521 },
    { label: "Repair of household appliances and home and garden equipment", idx: 9522 },
    { label: "Repair of footwear and leather goods", idx: 9523 },
    { label: "Repair of furniture and home furnishings", idx: 9524 },
    { label: "Repair of personal and household goods, n.e.c.", idx: 9529 },
    { label: "Personal services for wellness, except sports activities", idx: 9610 },
    { label: "Washing and dry cleaning of textile and fur products", idx: 9621 },
    { label: "Funeral and related activities", idx: 9630 },
    { label: "Domestic services", idx: 9640 },
    { label: "Other personal service activities, n.e.c.", idx: 9690 },
    { label: "Activities of households as employers of domestic personnel", idx: 9700 },
    { label: "Undifferentiated goods-producing activities of private households for own use", idx: 9810 },
    { label: "Undifferentiated services-producing activities of private households for own use", idx: 9820 },
    { label: "Activities of extra-territorial organizations and bodies", idx: 9901 },
    { label: "Activities of other international organizations", idx: 9909 }
];
var psced7 = [
    { label: "Associate in Arts/Liberal Arts", idx: 4010001 },
    { label: "Associate in Science", idx: 4010002 },
    { label: "Pre-Dental", idx: 4010003 },
    { label: "Pre-Optometry", idx: 4010004 },
    { label: "Adult Literacy Program", idx: 4081101 },
    { label: "Functional Literacy Training", idx: 4082101 },
    { label: "Course in Career Development ", idx: 4090101 },
    { label: "Course in Personality Development ", idx: 4090102 },
    { label: "Course in Professional Modelling ", idx: 4090103 },
    { label: "Associate in Education", idx: 4140101 },
    { label: "Associate in Teaching Elementary Education", idx: 4140102 },
    { label: "Associate in Teaching Secondary Education", idx: 4140103 },
    { label: "Associate in Christian/Religious Education", idx: 4140401 },
    { label: "Associate in Mathematics Education", idx: 4140402 },
    { label: "Associate in Physical Education", idx: 4140403 },
    { label: "Associate in Proficiency in Teaching General Science", idx: 4140404 },
    { label: "Associate in Teaching General Science", idx: 4140405 },
    { label: "Associate in Teaching Language", idx: 4140406 },
    { label: "Associate in Teaching Music  ", idx: 4140407 },
    { label: "Associate in Teaching Physics", idx: 4140408 },
    { label: "Associate in Industrial Education", idx: 4140801 },
    { label: "Associate in Technical/Trade Education", idx: 4140802 },
    { label: "Associate in Pre-School Education", idx: 4141201 },
    { label: "Teacher Certificate Program in Special Education", idx: 4142201 },
    { label: "Programs in Education Science in Support of Teaching", idx: 4147200 },
    { label: "Other Programs in Teacher Training and Education Science ", idx: 4149900 },
    { label: "Associate in Digital Arts", idx: 4210101 },
    { label: "Associate in Fine Arts", idx: 4210102 },
    { label: "Certificate in Multi-Media Arts", idx: 4210103 },
    { label: "Course in Special Fine Arts - Painting", idx: 4210401 },
    { label: "Associate in Graphic Arts/Printing Technology", idx: 4210601 },
    { label: "Course for Compositor ", idx: 4210602 },
    { label: "Course for Lay Out Artist", idx: 4210603 },
    { label: "Course for Letterpress Pressman ", idx: 4210604 },
    { label: "Course for Repro-Cameraman ", idx: 4210605 },
    { label: "Course in Binding ", idx: 4210606 },
    { label: "Course in Binding Machine Operation", idx: 4210607 },
    { label: "Course in Commercial Photography", idx: 4210608 },
    { label: "Course in Cylindrical Press Operation", idx: 4210609 },
    { label: "Course in Graphic Arts", idx: 4210610 },
    { label: "Course in Linotype Operation", idx: 4210611 },
    { label: "Course in Offset Press Operation", idx: 4210612 },
    { label: "Course in Offset Printing", idx: 4210613 },
    { label: "Course in Platemaking", idx: 4210614 },
    { label: "Course in Platen Press Operation", idx: 4210615 },
    { label: "Course in Printing", idx: 4210616 },
    { label: "Programs in Sculpturing", idx: 4210800 },
    { label: "Course in Silk Screen Designing", idx: 4211001 },
    { label: "Course in Silk Screen Printing", idx: 4211002 },
    { label: "Course in Bamboo Craft", idx: 4211201 },
    { label: "Course in Buri/Nito/Rattan Craft", idx: 4211202 },
    { label: "Course in Ceramics/Pottery Technology", idx: 4211203 },
    { label: "Course in Coco Craft", idx: 4211204 },
    { label: "Course in Crocheting", idx: 4211205 },
    { label: "Course in Fiber Craft", idx: 4211206 },
    { label: "Course in Flower and Toy/Stuffed Toy Making", idx: 4211207 },
    { label: "Course in Glass Blowing", idx: 4211208 },
    { label: "Course in Hand/Machine Embroidery", idx: 4211209 },
    { label: "Course in Hand/Machine Knitting", idx: 4211210 },
    { label: "Course in Jewelry Craft", idx: 4211211 },
    { label: "Course in Leather Craft", idx: 4211212 },
    { label: "Course in Metal Craft", idx: 4211213 },
    { label: "Course in Paper Craft", idx: 4211214 },
    { label: "Course in Plastic Craft", idx: 4211215 },
    { label: "Course in Rubber Production Technology", idx: 4211216 },
    { label: "Course in Shell Craft", idx: 4211217 },
    { label: "Course in Wood Craft", idx: 4211218 },
    { label: "Associate in Music", idx: 4212201 },
    { label: "Associate in Performing Arts", idx: 4212202 },
    { label: "Certificate in Performing Arts (Dance) NC II", idx: 4212203 },
    { label: "Certificate in Performing Arts (Song) NC II", idx: 4212204 },
    { label: "Artist's Diploma in Music", idx: 4212205 },
    { label: "Artist's Diploma in Piano", idx: 4212206 },
    { label: "Artist's Diploma in Violin", idx: 4212207 },
    { label: "Artist's Diploma in Voice", idx: 4212208 },
    { label: "Associate in Cultural Arts, including Development/Community Theater", idx: 4213201 },
    { label: "Associate in Theater Arts", idx: 4213202 },
    { label: "Course in Photography", idx: 4214201 },
    { label: "Course in Interior Design", idx: 4215201 },
    { label: "Course in Furniture Design", idx: 4215202 },
    { label: "Associate in Product Design and Development Technology", idx: 4219901 },
    { label: "General Programs in Humanities", idx: 4220100 },
    { label: "Programs for Interpreters and Translators", idx: 4220200 },
    { label: "Course in a Foreign Language", idx: 4220801 },
    { label: "Associate in Creative Writing", idx: 4221101 },
    { label: "Associate Title in Filipino", idx: 4221102 },
    { label: "Programs in Other Living Languages and Their Literature", idx: 4221500 },
    { label: "Programs in \"Dead\" Languages and Their Literature", idx: 4222100 },
    { label: "Programs in Linguistics", idx: 4223100 },
    { label: "Programs in Comparative Literature", idx: 4224100 },
    { label: "Programs in History ", idx: 4225100 },
    { label: "Programs in Archeology ", idx: 4226100 },
    { label: "Associate in Philosophy", idx: 4227101 },
    { label: "Associate in Arts (Classical)", idx: 4228101 },
    { label: "Associate in Bible Translation", idx: 4228102 },
    { label: "Associate in Marriage and Family Ministry", idx: 4228103 },
    { label: "Associate in Mission", idx: 4228104 },
    { label: "Associate in Religion Education", idx: 4228105 },
    { label: "Associate in Youth Ministry", idx: 4228106 },
    { label: "Other Programs in Humanities ", idx: 4229900 },
    { label: "General Programs in Social and Behavioral Science", idx: 4310100 },
    { label: "Associate in Econometrics", idx: 4311201 },
    { label: "Associate in Economics/Business Economics", idx: 4311202 },
    { label: "Associate in Socio-Economic Research", idx: 4311203 },
    { label: "Associate in Political Science", idx: 4312201 },
    { label: "Associate in Community Traditions and Customs", idx: 4313201 },
    { label: "Programs in Demography ", idx: 4313300 },
    { label: "Programs in Anthropology ", idx: 4314200 },
    { label: "Associate in Applied Psychology", idx: 4315201 },
    { label: "Associate in Industrial/Organizational Psychology", idx: 4315202 },
    { label: "Programs in Geography ", idx: 4316200 },
    { label: "Programs in Studies of Regional Cultures ", idx: 4317200 },
    { label: "Other Programs in Social and Behavioral Science ", idx: 4319900 },
    { label: "General Programs in Communication Arts", idx: 4320100 },
    { label: "Programs in Journalism ", idx: 4320200 },
    { label: "Associate in Broadcast Communication", idx: 4320401 },
    { label: "Associate in Advertising Arts", idx: 4320701 },
    { label: "Associate in Library and Information Studies", idx: 4322201 },
    { label: "Associate in Library Science/Technology/Information Studies ", idx: 4322202 },
    { label: "Associate in Mass Communication", idx: 4328901 },
    { label: "Associate in Commerce", idx: 4340101 },
    { label: "Associate in Entrepreneurship", idx: 4340102 },
    { label: "Associate in Management", idx: 4340103 },
    { label: "Course in General Clerical ", idx: 4340104 },
    { label: "Associate in Business and Office Management", idx: 4340401 },
    { label: "Associate in Computer Office Administration", idx: 4340402 },
    { label: "Associate in Junior Secretarial", idx: 4340403 },
    { label: "Associate in Office Administration", idx: 4340404 },
    { label: "Course in Automated Office Systems Management", idx: 4340405 },
    { label: "Course in Medical Secretarial", idx: 4340406 },
    { label: "Course in Secretarial", idx: 4340407 },
    { label: "Course in Stenography (Court)/", idx: 4340408 },
    { label: "Course in Bookkeeping", idx: 4340801 },
    { label: "Course for Calculator and Adding Machine Service Technician ", idx: 4342201 },
    { label: "Course for Repographic Equipment Service Technician ", idx: 4342202 },
    { label: "Course for Typewriter Service Technician", idx: 4342203 },
    { label: "Course in Calculating, Copying and Similar Office Machine Operation", idx: 4342204 },
    { label: "Course in Duplicating and Mimeographing Machine Operation", idx: 4342205 },
    { label: "Certificate in Computer-based Accountancy", idx: 4343201 },
    { label: "Certificate in Computer-based Bookkeeping", idx: 4343202 },
    { label: "Certificate in Government Accounting and Auditing", idx: 4343203 },
    { label: "Associate in Advertising", idx: 4343401 },
    { label: "Associate in Business Administration/Management", idx: 4343402 },
    { label: "Associate in Marketing/Trade Management", idx: 4343403 },
    { label: "Associate in Banking and Finance", idx: 4343601 },
    { label: "Course in Financial Analysis/Management", idx: 4343602 },
    { label: "Programs in Labor Studies, including Personnel Administration", idx: 4343800 },
    { label: "Associate in Agri-Business", idx: 4343901 },
    { label: "Associate in Local Government Administration", idx: 4345201 },
    { label: "Associate in Public/Government Administration/Management", idx: 4345202 },
    { label: "Associate in Airline Management/Administration", idx: 4346201 },
    { label: "Associate in Cooperative Management", idx: 4346202 },
    { label: "Course in Hospital Administration", idx: 4346203 },
    { label: "Course in Marine Catering Management", idx: 4346204 },
    { label: "Course in Personnel Administration", idx: 4346205 },
    { label: "Course in Recreation, Events and Entertainment Management", idx: 4346206 },
    { label: "Other Programs in Office Administration ", idx: 4349900 },
    { label: "Programs in Biological Science ", idx: 4420200 },
    { label: "Other Programs in Life Sciences ", idx: 4429900 },
    { label: "Programs in Chemistry", idx: 4441200 },
    { label: "Programs in Geological Science ", idx: 4442200 },
    { label: "Programs in Physics ", idx: 4443200 },
    { label: "Associate in Business Software Development", idx: 4484101 },
    { label: "Associate in Computer System and Network Technology", idx: 4484102 },
    { label: "Associate in Computer Technology", idx: 4484103 },
    { label: "Associate in Information and Computer Science", idx: 4484104 },
    { label: "Associate in  Web-based/Cyber Programming ", idx: 4484105 },
    { label: "Certificate in Animation NC II", idx: 4484106 },
    { label: "Certificate in 2D Animation NC III", idx: 4484107 },
    { label: "Certificate in 3D Animation NC III", idx: 4484108 },
    { label: "Certificate in Basic Computer Programming", idx: 4484109 },
    { label: "Certificate in Contact Center Services NC II", idx: 4484110 },
    { label: "Certificate in Desktop Publication Operation", idx: 4484111 },
    { label: "Certificate in Legal Transcription NC II", idx: 4484112 },
    { label: "Certificate in Medical Transcription NC II", idx: 4484113 },
    { label: "Certificate in Programming NC IV", idx: 4484114 },
    { label: "Certificate in Systems Analysis", idx: 4484115 },
    { label: "Associate in Computer Data Processing and Information Management", idx: 4484401 },
    { label: "Associate in Computer Operations and Data Processing", idx: 4484402 },
    { label: "Certificate in PC Operations NC II", idx: 4484403 },
    { label: "Course in Electronic Data Processing", idx: 4484404 },
    { label: "Certificate in Civil Engineering Technology", idx: 4520001 },
    { label: "Certificate in Drafting", idx: 4520002 },
    { label: "Certificate in Illustration", idx: 4520003 },
    { label: "Associate in Mapping/Marine Surveying", idx: 4520201 },
    { label: "Associate in Aeronautical Technology", idx: 4520401 },
    { label: "Associate in Aircraft Maintenance", idx: 4520402 },
    { label: "Associate in Aircraft Maintenance Technology", idx: 4520403 },
    { label: "Associate in Aircraft Technology", idx: 4520404 },
    { label: "Associate in Aviation/Avionics Technology", idx: 4520405 },
    { label: "Course for Avionics/Aviation Technician ", idx: 4520406 },
    { label: "Associate in Drafting Technology ", idx: 4520601 },
    { label: "Associate in Chemical Technology", idx: 4521201 },
    { label: "Certificate in Pyrotechnics NC II", idx: 4521202 },
    { label: "Associate in Civil Engineering Technology", idx: 4521601 },
    { label: "Associate in Civil Technology", idx: 4521602 },
    { label: "Programs in Geodetic Engineering Techniques ", idx: 4521800 },
    { label: "Associate in Electronics Communication Technology", idx: 4522201 },
    { label: "Associate in Instrumentation and Control Technology", idx: 4522202 },
    { label: "Certificate in Computer Hardware Servicing NC II", idx: 4522203 },
    { label: "Certificate in Consumer Electronics NC II", idx: 4522401 },
    { label: "Certificate in Consumer Electronics NC III", idx: 4522402 },
    { label: "Certificate in Consumer Electronics NC IV", idx: 4522403 },
    { label: "Certificate in Electrical Technology", idx: 4522404 },
    { label: "Certificate in Electronics Technology", idx: 4522405 },
    { label: "Certificate in Instrumentation and Control Servicing NC II", idx: 4522406 },
    { label: "Certificate in Instrumentation and Control Servicing NC III", idx: 4522407 },
    { label: "Certificate in Instrumentation and Control Servicing NC IV", idx: 4522408 },
    { label: "Certificate in Mechatronics Servicing NC II", idx: 4522409 },
    { label: "Certificate in Mechatronics Servicing NC III", idx: 4522410 },
    { label: "Certificate in Mechatronics Servicing NC IV", idx: 4522411 },
    { label: "Course for Consumer Electronics Service Technician ", idx: 4522412 },
    { label: "Course for Integrated Circuit (IC) Operator/Technician ", idx: 4522413 },
    { label: "Certificate in Air Duct Servicing NC II", idx: 4522501 },
    { label: "Certificate in Ice Plant Refrigeration Servicing NC III", idx: 4522502 },
    { label: "Certificate in Refrigeration and Air Conditioning (RAC) - PACU/CRE Servicing NC II", idx: 4522503 },
    { label: "Certificate in Refrigeration and Air Conditioning (RAC) Technology", idx: 4522504 },
    { label: "Certificate in Refrigeration and Air Conditioning (RAC) Window-type AC/Domestic Refrigeration NC I", idx: 4522505 },
    { label: "Certificate in Transport Refrigeration and Air Conditionong (RAC) Servicing NC II", idx: 4522506 },
    { label: "Course for Auto/Bus Air Conditioning Mechanic ", idx: 4522507 },
    { label: "Course for Domestic Refrigeration and Air Conditioning Mechanic ", idx: 4522508 },
    { label: "Course for Domestic Refrigeration and Air Conditioning Technician ", idx: 4522509 },
    { label: "Course for Packaged Air Conditioning Technician ", idx: 4522510 },
    { label: "Course for Refrigeration Mechanic ", idx: 4522511 },
    { label: "Associate in Industrial Design", idx: 4522601 },
    { label: "Associate in Industrial Facilities Technology", idx: 4522602 },
    { label: "Associate in Industrial Technology", idx: 4522603 },
    { label: "Certificate in Heavy Equipment Operation NC II", idx: 4522801 },
    { label: "Certificate in Heavy Equipment Operation (Bulldozer) NC II", idx: 4522802 },
    { label: "Certificate in Heavy Equipment Operation (Crawler Crane) NC II", idx: 4522803 },
    { label: "Certificate in Heavy Equipment Operation (Forklift) NC II", idx: 4522804 },
    { label: "Certificate in Heavy Equipment Operation (Hydraulic Excavator) NC II", idx: 4522805 },
    { label: "Certificate in Heavy Equipment Operation (Motor Grader) NC II", idx: 4522806 },
    { label: "Certificate in Heavy Equipment Operation (Rough Terrain Crane) NC II", idx: 4522807 },
    { label: "Certificate in Heavy Equipment Operation (Truck-Mounted Crane) NC II", idx: 4522808 },
    { label: "Certificate in Heavy Equipment Operation (Wheel Loader) NC II", idx: 4522809 },
    { label: "Certificate in Heavy Equipment Servicing (Mechanical) NC II", idx: 4522810 },
    { label: "Course for Asphalt Paver Machine Operator ", idx: 4522811 },
    { label: "Course for Back Hoes Excavator Operator ", idx: 4522812 },
    { label: "Course for Bulldozer Operator ", idx: 4522813 },
    { label: "Course for Crane Machine Operator ", idx: 4522814 },
    { label: "Course for Crawler Excavator Operator ", idx: 4522815 },
    { label: "Course for Dump Truck Operator/Driver ", idx: 4522816 },
    { label: "Course for Excavator Machine Operator ", idx: 4522817 },
    { label: "Course for Forklift Operator ", idx: 4522818 },
    { label: "Course for Grader Operator ", idx: 4522819 },
    { label: "Course for Loader Operator ", idx: 4522820 },
    { label: "Course for Mobile/Crawler Crane Operator ", idx: 4522821 },
    { label: "Course for Motor Grade Operator ", idx: 4522822 },
    { label: "Course for Motorized Farm Equipment Operator ", idx: 4522823 },
    { label: "Course for Road Grader/Scraper Operator ", idx: 4522824 },
    { label: "Course for Road Roller Operator ", idx: 4522825 },
    { label: "Course for Roller Compact Operator ", idx: 4522826 },
    { label: "Course for Transit Mixer Operator ", idx: 4522827 },
    { label: "Course for Truck/Trailer Operator ", idx: 4522828 },
    { label: "Associate in Foundry Engineering Technology", idx: 4523201 },
    { label: "Associate in Welding and Fabrication Engineering Technology", idx: 4523202 },
    { label: "Associate in General Metal Technology", idx: 4523401 },
    { label: "Certificate in Flux Cored Arc Welding (FCAW) NC I", idx: 4523402 },
    { label: "Certificate in Flux Cored Arc Welding (FCAW) NC II", idx: 4523403 },
    { label: "Certificate in Flux Cored Arc Welding (FCAW) NC III", idx: 4523404 },
    { label: "Certificate in Gas Metal Arc Welding (GMAW) NC I", idx: 4523405 },
    { label: "Certificate in Gas Metal Arc Welding (GMAW) NC II", idx: 4523406 },
    { label: "Certificate in Gas Metal Arc Welding (GMAW) NC III", idx: 4523407 },
    { label: "Certificate in Gas Tungsten Arc Welding (GTAW) NC II", idx: 4523408 },
    { label: "Certificate in Gas Tungsten Arc Welding (GTAW) NC IV", idx: 4523409 },
    { label: "Certificate in Gas Welding NC I", idx: 4523410 },
    { label: "Certificate in Gas Welding NC II", idx: 4523411 },
    { label: "Certificate in Machining NC I", idx: 4523412 },
    { label: "Certificate in Machining NC II", idx: 4523413 },
    { label: "Certificate in Machining NC III", idx: 4523414 },
    { label: "Certificate in Shielded Metal Arc Welding (SMAW) NC I", idx: 4523415 },
    { label: "Certificate in Shielded Metal Arc Welding (SMAW) NC II", idx: 4523416 },
    { label: "Certificate in Shielded Metal Arc Welding (SMAW) NC III", idx: 4523417 },
    { label: "Certificate in Shielded Metal Arc Welding (SMAW) NC IV", idx: 4523418 },
    { label: "Certificate in Submerged Arc Welding (SAW) NC I", idx: 4523419 },
    { label: "Certificate in Submerged Arc Welding (SAW) NC II", idx: 4523420 },
    { label: "Programs in Mining Engineering Techniques", idx: 4523600 },
    { label: "Programs in Mechanical Engineering Techniques", idx: 4524200 },
    { label: "Certificate in Auto Body Painting/Finishing NC I", idx: 4524401 },
    { label: "Certificate in Auto Body Painting/Finishing NC II", idx: 4524402 },
    { label: "Certificate in Auto Body Painting/Finishing NC III", idx: 4524403 },
    { label: "Certificate in Auto Body Repairing NC II", idx: 4524404 },
    { label: "Certificate in Auto Diesel Technology", idx: 4524405 },
    { label: "Certificate in Auto Engine Rebuilding NC II", idx: 4524406 },
    { label: "Certificate in Auto Servicing NC I", idx: 4524407 },
    { label: "Certificate in Auto Servicing NC II", idx: 4524408 },
    { label: "Certificate in Auto Servicing NC III", idx: 4524409 },
    { label: "Certificate in Auto Servicing NC IV", idx: 4524410 },
    { label: "Certificate in Automotive/Mechanical Technology", idx: 4524411 },
    { label: "Certificate in Diesel Technology", idx: 4524412 },
    { label: "Certificate in Motorcycle/Small Engine Servicing NC II", idx: 4524413 },
    { label: "Programs in Sanitary Engineering Techniques ", idx: 4525000 },
    { label: "Programs in Agricultural Engineering Techniques ", idx: 4525300 },
    { label: "Programs in Forestry Engineering Techniques ", idx: 4526300 },
    { label: "Certificate in Marine Engineering", idx: 4528101 },
    { label: "Associate in Technology", idx: 4529901 },
    { label: "Associate in Food Processing ", idx: 4541201 },
    { label: "Certificate in Fish Products Packaging NC II", idx: 4541202 },
    { label: "Certificate in Food Processing NC II", idx: 4541203 },
    { label: "Course in Baking", idx: 4541204 },
    { label: "Course in Candy/Confectionery Making", idx: 4541205 },
    { label: "Course in Vinegar/Wine Making", idx: 4541206 },
    { label: "Associate in Food Preparation/Preservation Technology", idx: 4542201 },
    { label: "Associate in Food Technology", idx: 4542202 },
    { label: "Associate in Nutrition and Food Technology", idx: 4542203 },
    { label: "Associate in Sugar Technology", idx: 4542204 },
    { label: "Certificate in Footwear Making NC II", idx: 4547201 },
    { label: "Course in Footwear Technology ", idx: 4547202 },
    { label: "Course in Leathergoods Making", idx: 4547203 },
    { label: "Course in Dyeing Techniques", idx: 4547401 },
    { label: "Course in Loom Weaving ", idx: 4547402 },
    { label: "Course in Weaving", idx: 4547403 },
    { label: "Associate in Apparel/Garments Technology", idx: 4547601 },
    { label: "Certificate in Dressmaking NC II", idx: 4547602 },
    { label: "Certificate in Tailoring NC II", idx: 4547603 },
    { label: "Course for Industrial Garments Cutter ", idx: 4547604 },
    { label: "Course in Basic Sewing", idx: 4547605 },
    { label: "Course in Embroidery Machine Operation", idx: 4547606 },
    { label: "Course in Industrial Embroidery Machine Operation", idx: 4547607 },
    { label: "Course in Industrial Sewing Machine Operation", idx: 4547608 },
    { label: "Course in Patternmaking and Grading", idx: 4547609 },
    { label: "Course in Special Machine Operation", idx: 4547610 },
    { label: "Course in Upholstery (Furniture and Automotive)", idx: 4547611 },
    { label: "Course in Charcoal Making", idx: 4547801 },
    { label: "Course in Rattan Furniture Sample Making", idx: 4547802 },
    { label: "Course in Wood Carving (Furniture)", idx: 4547803 },
    { label: "Course in Wood Finishing", idx: 4547804 },
    { label: "Course in Wood Furniture Sample Making", idx: 4547805 },
    { label: "Course in Wood Tuner Course", idx: 4547806 },
    { label: "Course in Wooden Boat Builder", idx: 4547807 },
    { label: "Course in Wooden Sash Making", idx: 4547808 },
    { label: "Course in Woodworking Technology ", idx: 4547809 },
    { label: "Associate in Architectural Drafting ", idx: 4580101 },
    { label: "Associate in Architectural Interiors", idx: 4580201 },
    { label: "Associate in Structural Drafting ", idx: 4580202 },
    { label: "Programs in Architecture", idx: 4581000 },
    { label: "Associate in Landscaping ", idx: 4581201 },
    { label: "Associate in Building Construction Technology  ", idx: 4581601 },
    { label: "Certificate in Building Wiring Installation NC II", idx: 4581602 },
    { label: "Certificate in Carpentry NC II", idx: 4581603 },
    { label: "Certificate in Carpentry NC III", idx: 4581604 },
    { label: "Certificate in Construction Painting NC I", idx: 4581605 },
    { label: "Certificate in Construction Painting NC II", idx: 4581606 },
    { label: "Certificate in Construction Painting NC III", idx: 4581607 },
    { label: "Certificate in Masonry NC II", idx: 4581608 },
    { label: "Certificate in Masonry NC III", idx: 4581609 },
    { label: "Certificate in Plumbing NC I", idx: 4581610 },
    { label: "Certificate in Plumbing NC II", idx: 4581611 },
    { label: "Certificate in Plumbing NC III", idx: 4581612 },
    { label: "Certificate in Reinforced Steel Bar (RSB) Installation NC II", idx: 4581613 },
    { label: "Certificate in Scaffold Erection NC II", idx: 4581614 },
    { label: "Certificate in Tile Setting NC II", idx: 4581615 },
    { label: "Course for Building Maintenance Worker ", idx: 4581616 },
    { label: "Course for Insulator ", idx: 4581617 },
    { label: "Course for Shulterer ", idx: 4581618 },
    { label: "Course in Glazier (General) ", idx: 4581619 },
    { label: "Course in House/Building Carpentry", idx: 4581620 },
    { label: "Course in House/Building Painting", idx: 4581621 },
    { label: "Course in Main Pipe Laying", idx: 4581622 },
    { label: "Course in Masonry (General) ", idx: 4581623 },
    { label: "Course in Parquetry", idx: 4581624 },
    { label: "Course in Pipe Fitting", idx: 4581625 },
    { label: "Course in Plumbing", idx: 4581626 },
    { label: "Course in Roofing", idx: 4581627 },
    { label: "Course in Service Pipe Laying", idx: 4581628 },
    { label: "Course in Water Well Drilling and Pump Installation", idx: 4581629 },
    { label: "Programs in Town or Community Planning", idx: 4582200 },
    { label: "Associate in Agricultural Technology ", idx: 4620101 },
    { label: "Associate in Agriculture", idx: 4620102 },
    { label: "Certificate in Agricultural Technology ", idx: 4620103 },
    { label: "Course in Agri-Farm Technology", idx: 4620201 },
    { label: "Associate in Animal Husbandry/Technology", idx: 4620301 },
    { label: "Certificate in Animal Health Care and Management NC III", idx: 4620302 },
    { label: "Certificate in Animal Production NC II", idx: 4620303 },
    { label: "Certificate in Slaughtering Operations NC II", idx: 4620304 },
    { label: "Certificate in Horticulture NC II", idx: 4620601 },
    { label: "Certificate in Horticulture NC III", idx: 4620602 },
    { label: "Associate in Crop Production", idx: 4620801 },
    { label: "Certificate in Agricultural Crops Production I", idx: 4620802 },
    { label: "Certificate in Agricultural Crops Production III", idx: 4620803 },
    { label: "Certificate in Pest Management (Vegetables) NC II", idx: 4620804 },
    { label: "Programs in Agricultural Economics ", idx: 4621200 },
    { label: "Programs in Soil and Water Technology", idx: 4622600 },
    { label: "Course in Industrial Tree Plantation Technology", idx: 4624901 },
    { label: "Associate in Forestry", idx: 4626201 },
    { label: "Certificate in Forestry", idx: 4626202 },
    { label: "Course for Forest Ranger ", idx: 4626203 },
    { label: "Associate in Fisheries", idx: 4627201 },
    { label: "Associate in Fisheries Technology", idx: 4627202 },
    { label: "Certificate in Aquaculture NC II", idx: 4627203 },
    { label: "Certificate in Fish Capture NC I", idx: 4627204 },
    { label: "Certificate in Fish Capture NC II", idx: 4627205 },
    { label: "Certificate in Fisheries  ", idx: 4627206 },
    { label: "Certificate in Fisheries Technology specializing in:", idx: 4627207 },
    { label: "Certificate in Fishing Gear Repair and Maintenance NC III", idx: 4627208 },
    { label: "Course in Fish Farm Technology", idx: 4627209 },
    { label: "Course in Fishing Technology", idx: 4627210 },
    { label: "Course for Veterinary Technician ", idx: 4643201 },
    { label: "Pre-Doctor of Veterinary Medicine", idx: 4643202 },
    { label: "Associate in Barangay/Community Health Work", idx: 4720201 },
    { label: "Associate in Elderly Health Care", idx: 4720202 },
    { label: "Associate in Sanitary Science", idx: 4720203 },
    { label: "Certificate in Barangay Health Services NC II", idx: 4720204 },
    { label: "Certificate in Emergency Medical Services NC II", idx: 4720205 },
    { label: "Certificate in Health Care Services NC II", idx: 4720206 },
    { label: "Course for Health Aide", idx: 4720207 },
    { label: "Course in Environmental Health", idx: 4720208 },
    { label: "Course in Medico Legal ", idx: 4720209 },
    { label: "Associate in Physio-Therapy", idx: 4720801 },
    { label: "Associate in Pulmonary Therapy", idx: 4720802 },
    { label: "Associate in Respiratory Therapy", idx: 4720803 },
    { label: "Certificate in Massage Therapy NC II", idx: 4720804 },
    { label: "Course in Acupuncture", idx: 4720805 },
    { label: "Course in Chirotherapy", idx: 4720806 },
    { label: "Course in Reflexology", idx: 4720807 },
    { label: "Course in Shiatsu/Swedish Massage", idx: 4720808 },
    { label: "Course in Therapeutic Massage", idx: 4720809 },
    { label: "Certificate in Caregiving NC II", idx: 4721201 },
    { label: "Course for Nursing Aide/Nursing Assistant", idx: 4721202 },
    { label: "Course in Practical/Vocational Nursing", idx: 4721203 },
    { label: "Graduate in Midwifery ", idx: 4721501 },
    { label: "Associate in Radiological Technology", idx: 4721701 },
    { label: "Course for Bio-Medical Equipment Technician ", idx: 4721702 },
    { label: "Associate in Dental Technology", idx: 4724201 },
    { label: "Course for Dental Aide ", idx: 4724202 },
    { label: "Course in Dental Hygiene", idx: 4724203 },
    { label: "Course in Dental Prosthesis Making", idx: 4724204 },
    { label: "Course for Pharmacy Technician", idx: 4725201 },
    { label: "Course for Optician", idx: 4726201 },
    { label: "Course for Optometry Laboratory Technician ", idx: 4726401 },
    { label: "Course in Optical Lens Making", idx: 4726402 },
    { label: "Course for Dietetics Aide ", idx: 4727201 },
    { label: "Course for Dietetics Technician ", idx: 4727202 },
    { label: "Course for Chemical Laboratory Technician ", idx: 4728201 },
    { label: "Course for Dental Laboratory Technician  ", idx: 4728202 },
    { label: "Course for Glaze Solution Mixer ", idx: 4728203 },
    { label: "Course for Instrumentation Technician ", idx: 4728204 },
    { label: "Associate in Health Science Education", idx: 4729901 },
    { label: "Certificate in Bio-Medical Equipment Servicing NC II", idx: 4729902 },
    { label: "Course in Paramedics ", idx: 4729903 },
    { label: "Health Science Education Partnership Program", idx: 4729904 },
    { label: "Innovative Health Sciences Education Program ", idx: 4729905 },
    { label: "Course for Community Worker ", idx: 4763201 },
    { label: "Associate in Bible Christian Counselling", idx: 4764201 },
    { label: "Associate in Home Economics/HomeTechnology", idx: 4810101 },
    { label: "Certificate in Household Services NC II", idx: 4810102 },
    { label: "Programs in Home Economics with Emphasis on Child Care", idx: 4812200 },
    { label: "Programs in Home Economics with Emphasis on Household Arts", idx: 4813200 },
    { label: "Other Programs in Home Economics ", idx: 4813400 },
    { label: "Course for Make-Up Artist ", idx: 4813601 },
    { label: "Course in Beauty Culture", idx: 4813602 },
    { label: "Course in Cosmetology", idx: 4813603 },
    { label: "Course in Hair Dressing/Styling", idx: 4813604 },
    { label: "Course in Hair Science", idx: 4813605 },
    { label: "Certificate in Commercial Cooking NC II", idx: 4814201 },
    { label: "Certificate in Commercial Cooking NC III", idx: 4814202 },
    { label: "Certificate in Commercial Cooking NC IV", idx: 4814203 },
    { label: "Certificate in Food and Beverage Preparation and Service", idx: 4814204 },
    { label: "Course for Kitchen Supervisor ", idx: 4814205 },
    { label: "Course in Culinary Arts", idx: 4814206 },
    { label: "Course in Dry Cleaning", idx: 4815201 },
    { label: "Programs in Retailing ", idx: 4816200 },
    { label: "Associate in Sports Officiating and Coaching", idx: 4816401 },
    { label: "Certificate in Sports/Sports Studies", idx: 4816402 },
    { label: "Associate in Hotel and Restaurant Management", idx: 4817201 },
    { label: "Associate in Hotel and Restaurant Services Technology", idx: 4817202 },
    { label: "Certificate in Baking/Pastry Production NC II", idx: 4817203 },
    { label: "Certificate in Bartending NC II", idx: 4817204 },
    { label: "Certificate in Food and Beverage Services NC II", idx: 4817205 },
    { label: "Certificate in Food and Beverage Services NC III", idx: 4817206 },
    { label: "Certificate in Food and Beverage Services NC IV", idx: 4817207 },
    { label: "Certificate in Food Management", idx: 4817208 },
    { label: "Certificate in Front Office Services NC II", idx: 4817209 },
    { label: "Certificate in Housekeeping NC II", idx: 4817210 },
    { label: "Course in Butchering", idx: 4817211 },
    { label: "Associate in Tourism", idx: 4818201 },
    { label: "Associate in Tourism and Travel Management", idx: 4818202 },
    { label: "Certificate in Tour Guiding Services NC II", idx: 4818203 },
    { label: "Certificate in Travel Services NC II", idx: 4818204 },
    { label: "Course for Tourist/Travel Guide", idx: 4818205 },
    { label: "Associate in Air Transportation", idx: 4840201 },
    { label: "Course in Airflight and Ground ", idx: 4840202 },
    { label: "Course in Airways Operator Technology", idx: 4840203 },
    { label: "Course in Transportation Stewardship ", idx: 4840204 },
    { label: "Certificate in Deck Seafaring NC I ", idx: 4840601 },
    { label: "Certificate in Deck Seafaring NC II", idx: 4840602 },
    { label: "Certificate in Deck Seafaring NC III", idx: 4840603 },
    { label: "Certificate in Engine Seafaring NC I ", idx: 4840604 },
    { label: "Certificate in Engine Seafaring NC II ", idx: 4840605 },
    { label: "Certificate in Engine Seafaring NC III", idx: 4840606 },
    { label: "Course in First Aid at Sea", idx: 4840607 },
    { label: "Certificate in Driving NC II", idx: 4840801 },
    { label: "Certificate in Driving NC III", idx: 4840802 },
    { label: "Programs in Environmental Studies", idx: 4855200 },
    { label: "Certificate in Civil Security", idx: 4861201 },
    { label: "Certificate in Criminology", idx: 4861202 },
    { label: "Certificate in Police Administration", idx: 4861203 },
    { label: "Certificate in Security Services NC II", idx: 4861204 },
    { label: "Pre-Licensing and In-Service Training for Security Personnel ", idx: 4861205 },
    { label: "Supervisory Course for Security Personnel ", idx: 4861206 },
    { label: "Course in Firefighting and Fire Prevention", idx: 4861501 },
    { label: "Course in Ballistics ", idx: 4861701 },
    { label: "Other Programs in Civil Security", idx: 4861900 },
    { label: "Course in Communication Technology", idx: 4890201 },
    { label: "Course in Data Communication Technology", idx: 4890202 },
    { label: "Associate in Training Management", idx: 4899901 },
    { label: "Bachelor  ", idx: 5010001 },
    { label: "Bachelor of Arts", idx: 5010002 },
    { label: "Bachelor of Science", idx: 5010003 },
    { label: "Bachelor of Elementary Education", idx: 5140101 },
    { label: "Bachelor of Secondary Education", idx: 5140102 },
    { label: "Bachelor of Science in Elementary and Secondary Education", idx: 5140103 },
    { label: "Bachelor of Science in Pedagogy", idx: 5140104 },
    { label: "Bachelor of Home Economics and Livelihood Education for Teachers", idx: 5140401 },
    { label: "Bachelor of Physical Education ", idx: 5140402 },
    { label: "Bachelor of Sports Science", idx: 5140403 },
    { label: "Bachelor of Technology and Home Economics for Teachers", idx: 5140404 },
    { label: "Bachelor of Arts in Language Education for Teachers", idx: 5140405 },
    { label: "Bachelor of Science in Chemistry for Teachers", idx: 5140406 },
    { label: "Bachelor of Science in English Education as Secondary Language", idx: 5140407 },
    { label: "Bachelor of Science in Language Education for Teachers", idx: 5140408 },
    { label: "Bachelor of Science in Mathematics for Teachers", idx: 5140409 },
    { label: "Bachelor of Science in Music Education", idx: 5140410 },
    { label: "Bachelor of Science in Physical Education", idx: 5140411 },
    { label: "Bachelor of Science in Physics for Teachers", idx: 5140412 },
    { label: "Bachelor of Science in Religious Education", idx: 5140413 },
    { label: "Bachelor of Science in Industrial Education", idx: 5140801 },
    { label: "Bachelor of Science in Technician Teacher Education", idx: 5140802 },
    { label: "Bachelor of Science in Early Childhood Education", idx: 5141201 },
    { label: "Bachelor of Science in Kindergarten/Pre-School Education", idx: 5141202 },
    { label: "Programs in Teacher Training for Teachers in Adult Education", idx: 5141600 },
    { label: "Bachelor of Special Education", idx: 5142201 },
    { label: "Bachelor of Science in Guidance and Counseling", idx: 5147201 },
    { label: "Bachelor of Science in Agricultural Education", idx: 5149901 },
    { label: "Bachelor of Science in Business/Commercial Education ", idx: 5149902 },
    { label: "Bachelor of Science in Extension Education", idx: 5149903 },
    { label: "Bachelor of Science in Fishery Education", idx: 5149904 },
    { label: "Bachelor of Science in Nursing Education", idx: 5149905 },
    { label: "Bachelor of Science in Nutrition and Dietetics for Teachers", idx: 5149906 },
    { label: "Bachelor of Science in Secretarial Education", idx: 5149907 },
    { label: "Bachelor of Digital Arts", idx: 5210101 },
    { label: "Bachelor of Science in Fine Arts/Bachelor of Fine Arts", idx: 5210102 },
    { label: "Programs in Drawing and Painting", idx: 5210400 },
    { label: "Programs in Sculpturing", idx: 5210800 },
    { label: "Bachelor of Music Liturgy", idx: 5212201 },
    { label: "Bachelor of Science in Music/Bachelor of Music", idx: 5212202 },
    { label: "Bachelor of Performing Arts", idx: 5213201 },
    { label: "Bachelor of Arts in Speech and Drama", idx: 5213202 },
    { label: "Bachelor of Arts in Speech and Theater Arts", idx: 5213203 },
    { label: "Bachelor of Arts in Theater Arts", idx: 5213204 },
    { label: "Bachelor of Science in Speech and Drama", idx: 5213205 },
    { label: "Bachelor of Science in Interior Design", idx: 5215201 },
    { label: "Bachelor of Arts in Film and Audio-Visual Communication", idx: 5219901 },
    { label: "Bachelor of Arts in Humanities", idx: 5220101 },
    { label: "Bachelor of Arts in English ", idx: 5221101 },
    { label: "Bachelor of Arts in English Literature  ", idx: 5221102 },
    { label: "Bachelor of Arts in Filipino", idx: 5221103 },
    { label: "Bachelor of Arts in Philippine Literature", idx: 5221104 },
    { label: "Bachelor of Arts in European Languages", idx: 5221501 },
    { label: "Programs in \"Dead\" Languages and Their Literature", idx: 5222100 },
    { label: "Bachelor of Arts in Linguistics", idx: 5223101 },
    { label: "Bachelor of Arts in Comparative Literature", idx: 5224101 },
    { label: "Bachelor of Arts in Literature", idx: 5224102 },
    { label: "Bachelor of Arts in Development Studies", idx: 5225101 },
    { label: "Bachelor of Arts in History", idx: 5225102 },
    { label: "Programs in Archeology ", idx: 5226100 },
    { label: "Bachelor of Arts in Classical/Philosophy/Bachelor of Classical/Philosophy", idx: 5227101 },
    { label: "Bachelor of Arts in Philosophy/Bachelor of Philosophy", idx: 5227102 },
    { label: "Bachelor of Evangelical Ministry", idx: 5228101 },
    { label: "Bachelor of Arts in Religion", idx: 5228102 },
    { label: "Bachelor of Arts in Religious Studies", idx: 5228103 },
    { label: "Bachelor of Arts in Divinity/Bachelor of Divinity", idx: 5228104 },
    { label: "Bachelor of Arts in Theology/Bachelor of Theology", idx: 5228105 },
    { label: "Other Programs in Humanities", idx: 5229900 },
    { label: "Bachelor of Arts in Behavioral Science", idx: 5310101 },
    { label: "Bachelor of Arts in Social Science", idx: 5310102 },
    { label: "Bachelor of Arts in Human Behavior Technology/Bachelor of Human Behavior Technology", idx: 5310103 },
    { label: "Bachelor of Science in Behavioral Science", idx: 5310104 },
    { label: "Bachelor of Science in Human Behavior Technology", idx: 5310105 },
    { label: "Bachelor of Arts in Economics", idx: 5311201 },
    { label: "Bachelor of Arts in Applied Economics/Bachelor of Applied Economics", idx: 5311202 },
    { label: "Bachelor of Science in Applied Economics", idx: 5311203 },
    { label: "Bachelor of Science in Business Economics", idx: 5311204 },
    { label: "Bachelor of Science in Economics", idx: 5311205 },
    { label: "Bachelor of Arts in Political Science/Bachelor in Political Science", idx: 5312201 },
    { label: "Bachelor of Science in Foreign Service", idx: 5312202 },
    { label: "Bachelor of Science in International Relations", idx: 5312203 },
    { label: "Bachelor of Science in Political Economy", idx: 5312204 },
    { label: "Bachelor of Arts in Applied Sociology", idx: 5313201 },
    { label: "Bachelor of Arts in Sociology", idx: 5313202 },
    { label: "Bachelor of Science in Sociology", idx: 5313203 },
    { label: "Bachelor of Science in Demography", idx: 5313301 },
    { label: "Bachelor of Arts in Anthropology", idx: 5314201 },
    { label: "Bachelor of Arts in Applied Psychology", idx: 5315201 },
    { label: "Bachelor of Science in Clinical Psychology", idx: 5315202 },
    { label: "Bachelor of Science in Industrial and Organizational Psychology", idx: 5315203 },
    { label: "Bachelor of Science in Psychology", idx: 5315204 },
    { label: "Bachelor of Science in Geography", idx: 5316201 },
    { label: "Bachelor of Arts in Arabic/Islamic Studies", idx: 5317201 },
    { label: "Bachelor of Arts in International Studies", idx: 5317202 },
    { label: "Bachelor of Arts in Philippine Arts", idx: 5317203 },
    { label: "Bachelor of Arts in Philippine Studies", idx: 5317204 },
    { label: "Other Programs in Social and Behavioral Science ", idx: 5319900 },
    { label: "Bachelor of Arts in Communication", idx: 5320101 },
    { label: "Bachelor of Arts in Media Studies", idx: 5320102 },
    { label: "Bachelor of Arts in Business Journalism/Bachelor in Business Journalism", idx: 5320201 },
    { label: "Bachelor of Arts in Journalism/Bachelor in Journalism", idx: 5320202 },
    { label: "Bachelor of Science in Business Journalism", idx: 5320203 },
    { label: "Bachelor of Science in Journalism", idx: 5320204 },
    { label: "Bachelor of Arts in Broadcast Communication", idx: 5320401 },
    { label: "Bachelor of Science in Broadcast Communication", idx: 5320402 },
    { label: "Bachelor of Arts in Public Relations", idx: 5320701 },
    { label: "Bachelor of Arts in Library and Information Science/Bachelor of Library and Information Science", idx: 5322201 },
    { label: "Bachelor of Arts in Library Science/Bachelor of Library Science", idx: 5322202 },
    { label: "Bachelor of Arts in Communication Arts/Mass Communication ", idx: 5322901 },
    { label: "Bachelor of Arts in Communication Research", idx: 5322902 },
    { label: "Bachelor of Arts in Organizational Communication", idx: 5322903 },
    { label: "Bachelor of Science in Mass Communication", idx: 5322904 },
    { label: "Bachelor of Arts in Business Administration/Bachelor in Business Administration", idx: 5340101 },
    { label: "Bachelor of Arts in Entrepreneurial Management/Bachelor in Entrepreneurial Management", idx: 5340102 },
    { label: "Bachelor of Arts in Business Management/Bachelor of Business Management", idx: 5340103 },
    { label: "Bachelor of Arts in Management and Social Work /Bachelor of Management and Social Work", idx: 5340104 },
    { label: "Bachelor of Science in Administration", idx: 5340105 },
    { label: "Bachelor of Science in Business Administration", idx: 5340106 },
    { label: "Bachelor of Science in Business Management", idx: 5340107 },
    { label: "Bachelor of Science in Commerce", idx: 5340108 },
    { label: "Bachelor of Science in Management", idx: 5340109 },
    { label: "Bachelor of Science in Airline Secretarial/Administration  ", idx: 5340401 },
    { label: "Bachelor of Science in Computer Secretarial ", idx: 5340402 },
    { label: "Bachelor of Science in Office Administration/Technology", idx: 5340403 },
    { label: "Bachelor of Science in Secretarial Administration", idx: 5340404 },
    { label: "Bachelor of Science in Accountancy", idx: 5343201 },
    { label: "Bachelor of Science in Business Administration and Accountancy", idx: 5343202 },
    { label: "Bachelor of Science in Computer Accounting and Management", idx: 5343203 },
    { label: "Bachelor of Science in Management and Accountancy", idx: 5343204 },
    { label: "Bachelor of Arts in Advertising/Bachelor of Advertising", idx: 5343401 },
    { label: "Bachelor of Arts in Advertising and Public Relations/Bachelor of Advertising and Public Relations", idx: 5343402 },
    { label: "Bachelor of Science in Marketing", idx: 5343403 },
    { label: "Bachelor of Science in Finance", idx: 5343601 },
    { label: "Bachelor of Science in Real Estate", idx: 5343602 },
    { label: "Bachelor of Science in Banking and Finance/Bachelor in Banking and Finance", idx: 5343603 },
    { label: "Bachelor of Arts in Legal Management", idx: 5343901 },
    { label: "Bachelor of Arts in Business Engineering/Bachelor in Business Engineering", idx: 5343902 },
    { label: "Bachelor of Arts in Agricultural Entrepreneurship/Bachelor of Agricultural Enterpreneurship", idx: 5343903 },
    { label: "Bachelor of Arts in Business Distributive Arts/Bachelor of Business Distributive Arts", idx: 5343904 },
    { label: "Bachelor of Arts in Computer Management/Bachelor of Computer Management", idx: 5343905 },
    { label: "Bachelor of Arts in Industrial Management/Bachelor of Industrial Management", idx: 5343906 },
    { label: "Bachelor of Arts in Transportation Management/Bachelor of Transportation Management", idx: 5343907 },
    { label: "Bachelor of Science in Agri-Business Management", idx: 5343908 },
    { label: "Bachelor of Science in Business Enterpreneurship", idx: 5343909 },
    { label: "Bachelor of Science in Business Technology", idx: 5343910 },
    { label: "Bachelor of Science in Economics and Cooperatives", idx: 5343911 },
    { label: "Bachelor of Science in Fishery Business Management ", idx: 5343912 },
    { label: "Bachelor of Science in Home Arts and Enterpreneurship", idx: 5343913 },
    { label: "Bachelor of Science in Industrial Management", idx: 5343914 },
    { label: "Bachelor of Arts in Public Administration/Bachelor of Public Administration", idx: 5345201 },
    { label: "Bachelor of Science in Public Administration", idx: 5345202 },
    { label: "Bachelor of Arts in Port Administration/Bachelor of Port Administration", idx: 5346201 },
    { label: "Bachelor of Science in Airline Business Administration/Management", idx: 5346202 },
    { label: "Bachelor of Science in Airline Management", idx: 5346203 },
    { label: "Bachelor of Science in Airline Management and Accountancy", idx: 5346204 },
    { label: "Bachelor of Science in Customs Administration", idx: 5346205 },
    { label: "Bachelor of Science in Food Service Administration", idx: 5346206 },
    { label: "Bachelor of Science in Hospital Administration", idx: 5346207 },
    { label: "Bachelor of Science in Postal Management", idx: 5346208 },
    { label: "Bachelor of Science in Shipping Management ", idx: 5346209 },
    { label: "Bachelor of Arts in Legal and Indigenous Studies", idx: 5349901 },
    { label: "Bachelor of Arts in Cooperatives/Bachelor of Cooperatives", idx: 5349902 },
    { label: "Bachelor of Science in Cooperative Management", idx: 5349903 },
    { label: "Bachelor of Science in Maritime Management", idx: 5349904 },
    { label: "Bachelor of Science in Recreation Management", idx: 5349905 },
    { label: "Bachelor of Science in Supply Management", idx: 5349906 },
    { label: "Bachelor of Laws (LL.B.)/Juris Doctor (J.D.) ", idx: 5380101 },
    { label: "Bachelor of Science in Jurisprudence", idx: 5380102 },
    { label: "Bachelor of Science in Applied Biology  ", idx: 5420201 },
    { label: "Bachelor of Science in Bio-Chemistry", idx: 5420202 },
    { label: "Bachelor of Science in Biological Science", idx: 5420203 },
    { label: "Bachelor of Science in Biology", idx: 5420204 },
    { label: "Bachelor of Science in Botany", idx: 5420205 },
    { label: "Bachelor of Science in Entomology", idx: 5420206 },
    { label: "Bachelor of Science in Human Biology", idx: 5420207 },
    { label: "Bachelor of Science in Marine Biology", idx: 5420208 },
    { label: "Bachelor of Science in Micro-Biology", idx: 5420209 },
    { label: "Bachelor of Science in Molecular Biology and Bio-Technology", idx: 5420210 },
    { label: "Bachelor of Science in Pharmacology", idx: 5420211 },
    { label: "Bachelor of Science in Physiology", idx: 5420212 },
    { label: "Bachelor of Science in Plant Science", idx: 5420213 },
    { label: "Bachelor of Science in Zoology", idx: 5420214 },
    { label: "Bachelor of Arts in Applied Science/Bachelor of Applied Science", idx: 5420901 },
    { label: "Bachelor of Science in General Science", idx: 5420902 },
    { label: "Bachelor of Science in Natural Science", idx: 5420903 },
    { label: "Bachelor of Science in Chemical Research", idx: 5441201 },
    { label: "Bachelor of Science in Chemical Technology", idx: 5441202 },
    { label: "Bachelor of Science in Chemistry", idx: 5441203 },
    { label: "Bachelor of Science in Industrial Chemistry", idx: 5441204 },
    { label: "Bachelor of Science in Geology", idx: 5442201 },
    { label: "Bachelor of Science in Volcanology", idx: 5442202 },
    { label: "Bachelor of Science in Applied Physics", idx: 5443201 },
    { label: "Bachelor of Science in Metallurgy", idx: 5443202 },
    { label: "Bachelor of Science in Physics", idx: 5443203 },
    { label: "Bachelor of Science in Physics-Mathematics", idx: 5443204 },
    { label: "Bachelor of Science in Astronomy", idx: 5444201 },
    { label: "Bachelor of Science in Meteorology", idx: 5445201 },
    { label: "Bachelor of Science in Marine Science", idx: 5446201 },
    { label: "Bachelor of Science in Oceanography", idx: 5446202 },
    { label: "Bachelor of Science in Mathematics", idx: 5460101 },
    { label: "Bachelor of Science in Applied Statistics", idx: 5461101 },
    { label: "Bachelor of Science in Experimental Statistics", idx: 5461102 },
    { label: "Bachelor of Science in Statistics", idx: 5461103 },
    { label: "Bachelor of Science in Actuarial Science", idx: 5462101 },
    { label: "Bachelor of Science in Applied Mathematics", idx: 5469901 },
    { label: "Bachelor of Arts in Information Technology/Bachelor in Information Technology", idx: 5484101 },
    { label: "Bachelor of Science in Business Computer Applications", idx: 5484102 },
    { label: "Bachelor of Science in Computer Applications", idx: 5484103 },
    { label: "Bachelor of Science in Computer Data Processing Management", idx: 5484104 },
    { label: "Bachelor of Science in Computer Science", idx: 5484105 },
    { label: "Bachelor of Science in Computer Studies", idx: 5484106 },
    { label: "Bachelor of Science in Information and Computer Science", idx: 5484107 },
    { label: "Bachelor of Science in Information System/Management", idx: 5484108 },
    { label: "Bachelor of Science in Information Technology", idx: 5484109 },
    { label: "Bachelor of Science in Management Information System", idx: 5484110 },
    { label: "Bachelor of Science in Software Technology", idx: 5484111 },
    { label: "Bachelor of Science in Computer Data Processing and Information Management", idx: 5484401 },
    { label: "Bachelor of Science in Data Processing", idx: 5484402 },
    { label: "Bachelor of Science in Aeronautical Engineering", idx: 5520401 },
    { label: "Bachelor of Science in Aerospace Engineering", idx: 5520402 },
    { label: "Bachelor of Science in Air Transportation", idx: 5520403 },
    { label: "Bachelor of Science in Aircraft Maintenance Engineering", idx: 5520404 },
    { label: "Bachelor of Science in Aircraft Maintenance Technology", idx: 5520405 },
    { label: "Bachelor of Science in Aircraft Technology", idx: 5520406 },
    { label: "Bachelor of Science in Aviation ", idx: 5520407 },
    { label: "Bachelor of Science in Aviation Electronics Engineering", idx: 5520408 },
    { label: "Bachelor of Science in Avionics Engineering", idx: 5520409 },
    { label: "Bachelor of Science in Avionics Technology", idx: 5520410 },
    { label: "Bachelor of Science in Electrical Engineering Avionics", idx: 5520411 },
    { label: "Bachelor of Science in Flying Technology", idx: 5520412 },
    { label: "Bachelor of Science in Ceramics Engineering", idx: 5521201 },
    { label: "Bachelor of Science in Chemical Engineering", idx: 5521202 },
    { label: "Bachelor of Science in Chemical Engineering Technology", idx: 5521203 },
    { label: "Bachelor of Science in Textile Engineering", idx: 5521204 },
    { label: "Bachelor of Science in Civil Engineering", idx: 5521601 },
    { label: "Bachelor of Science in Construction Technology", idx: 5521602 },
    { label: "Bachelor of Science in Geodetic Engineering", idx: 5521801 },
    { label: "Bachelor of Science in Communications Engineering", idx: 5522201 },
    { label: "Bachelor of Science in Computer Engineering", idx: 5522202 },
    { label: "Bachelor of Science in Computer Technology", idx: 5522203 },
    { label: "Bachelor of Science in Electrical Engineering", idx: 5522204 },
    { label: "Bachelor of Science in Electrical Engineering Technology", idx: 5522205 },
    { label: "Bachelor of Science in Electrical Technology", idx: 5522206 },
    { label: "Bachelor of Science in Electronics and Communications Engineering", idx: 5522207 },
    { label: "Bachelor of Science in Electronics Engineering", idx: 5522208 },
    { label: "Bachelor of Science in Electronics Technology  ", idx: 5522209 },
    { label: "Bachelor of Science in Instrumentation and Control Engineering", idx: 5522210 },
    { label: "Bachelor of Science in Industrial and Management Engineering", idx: 5522601 },
    { label: "Bachelor of Science in Industrial Design", idx: 5522602 },
    { label: "Bachelor of Science in Industrial Engineering", idx: 5522603 },
    { label: "Bachelor of Science in Industrial Technology", idx: 5522604 },
    { label: "Bachelor of Science in Management Engineering", idx: 5522605 },
    { label: "Bachelor of Science in Manufacturing Engineering", idx: 5522606 },
    { label: "Bachelor of Science in Metallurgical Engineering", idx: 5523201 },
    { label: "Bachelor of Science in Mining Engineering", idx: 5523601 },
    { label: "Bachelor of Science in Automotive Technology", idx: 5524201 },
    { label: "Bachelor of Science in Geothermal Engineering", idx: 5524202 },
    { label: "Bachelor of Science in Mechanical Engineering", idx: 5524203 },
    { label: "Bachelor of Science in Mechanical Technology", idx: 5524204 },
    { label: "Bachelor of Science in Environmental and Sanitary Engineering", idx: 5525001 },
    { label: "Bachelor of Science in Environmental Engineering", idx: 5525002 },
    { label: "Bachelor of Science in Sanitary Engineering", idx: 5525003 },
    { label: "Bachelor of Science in Agricultural Engineering", idx: 5525301 },
    { label: "Bachelor of Science in Aquatic Resource Engineering", idx: 5525302 },
    { label: "Bachelor of Science in Forest Products Engineering", idx: 5526301 },
    { label: "Bachelor of Science in Marine Engineering", idx: 5528101 },
    { label: "Bachelor of Science in Naval Architecture and Marine Engineering", idx: 5528102 },
    { label: "Bachelor of Arts in Technology/Bachelor of Technology", idx: 5529901 },
    { label: "Bachelor of Science in Electronics and Computer Technology", idx: 5529902 },
    { label: "Bachelor of Science in Food Engineering ", idx: 5529903 },
    { label: "Bachelor of Science in Petroleum Engineering ", idx: 5529904 },
    { label: "Bachelor of Science in Clothing Technology", idx: 5547601 },
    { label: "Bachelor of Science in Garment/Textile Technology", idx: 5547602 },
    { label: "Bachelor of Science in Architecture", idx: 5580101 },
    { label: "Bachelor of Science in Landscape Architecture", idx: 5581201 },
    { label: "Bachelor of Science in Town and Country Planning", idx: 5582201 },
    { label: "Bachelor of Arts in Agricultural Technology/Bachelor of Agricultural Technology", idx: 5620101 },
    { label: "Bachelor of Science in Agriculture ", idx: 5620102 },
    { label: "Bachelor of Science in Animal Husbandry", idx: 5620301 },
    { label: "Bachelor of Science in Animal Science", idx: 5620302 },
    { label: "Bachelor of Science in Animal Technology", idx: 5620303 },
    { label: "Bachelor of Arts in Horticulture Management/Bachelor of Technology in Horticulture Management", idx: 5620601 },
    { label: "Bachelor of Science in Horticulture", idx: 5620602 },
    { label: "Bachelor of Science in Agronomy", idx: 5620801 },
    { label: "Bachelor of Science in Agricultural Economics", idx: 5621201 },
    { label: "Bachelor of Science in Food Technology", idx: 5622201 },
    { label: "Programs in Soil and Water Sciences", idx: 5622600 },
    { label: "Bachelor of Science in Agricultural Administration", idx: 5624901 },
    { label: "Bachelor of Science in Agricultural Chemistry", idx: 5624902 },
    { label: "Bachelor of Science in Agricultural Development", idx: 5624903 },
    { label: "Bachelor of Science in Agricultural Management", idx: 5624904 },
    { label: "Bachelor of Science in Rice Technology", idx: 5624905 },
    { label: "Bachelor of Science in Sugar Technology", idx: 5624906 },
    { label: "Bachelor of Arts in Agro-Forestry Technology/Bachelor in Agro-Forestry Technology", idx: 5626201 },
    { label: "Bachelor of Science in Agro-Forestry", idx: 5626202 },
    { label: "Bachelor of Science in Forestry", idx: 5626203 },
    { label: "Bachelor of Science in Aquaculture", idx: 5627201 },
    { label: "Bachelor of Science in Aquatic Resource Management and Technology", idx: 5627202 },
    { label: "Bachelor of Science in Fisheries", idx: 5627203 },
    { label: "Bachelor of Science in Fishing Technology", idx: 5627204 },
    { label: "Bachelor of Science in Inland Fisheries", idx: 5627205 },
    { label: "Bachelor of Science in Veterinary Technology", idx: 5643201 },
    { label: "Bachelor of Science in Community/Public Health", idx: 5720201 },
    { label: "Bachelor of Science in Sanitary Science", idx: 5720202 },
    { label: "Bachelor of Arts in Basic Medical Sciences", idx: 5720601 },
    { label: "Doctor of Medicine", idx: 5720602 },
    { label: "Bachelor of Science in Occupational Therapy", idx: 5720801 },
    { label: "Bachelor of Science in Physical Therapy", idx: 5720802 },
    { label: "Bachelor of Science in Respiratory Therapy", idx: 5720803 },
    { label: "Bachelor of Science in Speech Pathology", idx: 5720804 },
    { label: "Bachelor of Science in Nursing", idx: 5721201 },
    { label: "Bachelor of Science in Radiologic Technology", idx: 5721701 },
    { label: "Bachelor of Science in Medical Technology", idx: 5723001 },
    { label: "Doctor of Dental Medicine", idx: 5724201 },
    { label: "Bachelor of Science in Industrial Pharmacy", idx: 5725201 },
    { label: "Bachelor of Science in Pharmaceutical Chemistry", idx: 5725202 },
    { label: "Bachelor of Science in Pharmacy", idx: 5725203 },
    { label: "Doctor of Optometry", idx: 5726201 },
    { label: "Bachelor of Science in Nutrition and Dietetics", idx: 5727201 },
    { label: "Bachelor of Science in Paramedics", idx: 5729901 },
    { label: "Bachelor of Science in Rural Medicine", idx: 5729902 },
    { label: "Bachelor of Arts in Social Services/Social Work", idx: 5763201 },
    { label: "Bachelor of Science in Social Services/Social Work", idx: 5763202 },
    { label: "Bachelor of Science in Community Development", idx: 5765201 },
    { label: "Bachelor of Science in Development of Multi-Cultural Communities", idx: 5765202 },
    { label: "Bachelor of Science in Rural Development Management", idx: 5765203 },
    { label: "Bachelor of Science in Family and Child Development", idx: 5810101 },
    { label: "Bachelor of Science in Home Economics", idx: 5810102 },
    { label: "Bachelor of Science in Human Ecology", idx: 5810103 },
    { label: "Programs in Home Economics with Emphasis on Household Arts", idx: 5813200 },
    { label: "Bachelor of Science in Home Technology", idx: 5813401 },
    { label: "Bachelor of Science in Hotel and Restaurant Management", idx: 5817201 },
    { label: "Bachelor of Arts in Tourism  ", idx: 5818201 },
    { label: "Bachelor of Science in Tourism", idx: 5818202 },
    { label: "Bachelor of Science in Tourism and Hotel and Restaurant Management", idx: 5818203 },
    { label: "Bachelor of Science in Tourism and Travel Management", idx: 5818204 },
    { label: "Bachelor of Science in Marine Transportation", idx: 5840401 },
    { label: "Bachelor of Science in Nautical Science", idx: 5840402 },
    { label: "Bachelor of Arts in Technology in Environmental Management/Bachelor of Technology in Environmental Management", idx: 5855201 },
    { label: "Bachelor of Science in Coastal Resource Management", idx: 5855202 },
    { label: "Bachelor of Science in Ecology", idx: 5855203 },
    { label: "Bachelor of Science in Environmental Development/Environmental Hygiene/Environmental Science", idx: 5855204 },
    { label: "Bachelor of Science in Environmental Management", idx: 5855205 },
    { label: "Bachelor of Science in Environmental Planning", idx: 5855206 },
    { label: "Bachelor of Science in Criminal Justice/Criminology", idx: 5861301 },
    { label: "Bachelor of Science in Forensic Science", idx: 5861302 },
    { label: "Bachelor of Science in Industrial Security Management", idx: 5861303 },
    { label: "Bachelor of Science in Police/Law Enforcement Administration", idx: 5861304 },
    { label: "Programs in Military ", idx: 5861700 },
    { label: "Bachelor of Arts in Peace and Security Studies", idx: 5861901 },
    { label: "Bachelor of Science in Peace and Security Studies", idx: 5861902 },
    { label: "Programs in Human Resource Development", idx: 5890100 },
    { label: "Bachelor of Secondary Education Major in Economics and Bachelor of Arts in History", idx: 5899901 },
    { label: "Bachelor of Secondary Education Major in Economics and Bachelor of Arts in Philosophy", idx: 5899902 },
    { label: "Bachelor of Secondary Education Major in Economics and Bachelor of Arts in Psychology", idx: 5899903 },
    { label: "Bachelor of Secondary Education Major in English and Bachelor of Arts Major in Literature", idx: 5899904 },
    { label: "Bachelor of Secondary Education Major in Guidance and Counselling and Bachelor of Arts Major in Psychology ", idx: 5899905 },
    { label: "Bachelor of Secondary Education Major in History and Bachelor of Arts Major in Behavioral Science", idx: 5899906 },
    { label: "Bachelor of Secondary Education Major in History and Bachelor of Arts Major in Economics", idx: 5899907 },
    { label: "Bachelor of Secondary Education Major in Literature and Bachelor of Arts Major in Psychology", idx: 5899908 },
    { label: "Bachelor of Secondary Education Major in Literature and Bachelor of Arts Major in Translation Studies", idx: 5899909 },
    { label: "Bachelor of Secondary Education Major in Religious Education and Bachelor of Arts Major in Literature", idx: 5899910 },
    { label: "Bachelor of Secondary Education Major in Religious Education and Bachelor of Arts Major in Philosophy", idx: 5899911 },
    { label: "Bachelor of Secondary Education Major in Religious Education and Bachelor of Arts Major in Psychology", idx: 5899912 },
    { label: "Bachelor of Secondary Education Major in Translation Studies and Bachelor of Arts Major in Literature", idx: 5899913 },
    { label: "Bachelor of Secondary Education Major in Translation Studies and Bachelor of Arts Major in Psychology", idx: 5899914 },
    { label: "Bachelor of Secondary Education Major in History and Bachelor of Arts in Behavioral Science Major in Social Planning and Development ", idx: 5899915 },
    { label: "Bachelor of Secondary Education Major in Computer Applications and Bachelor of Science in Mathematics", idx: 5899916 },
    { label: "Bachelor of Secondary Education Major in General Science and Bachelor of Science in Biology", idx: 5899917 },
    { label: "Bachelor of Secondary Education Major in Mathematics and Physics and Bachelor of Science in Chemistry", idx: 5899918 },
    { label: "Bachelor of Secondary Education Major in Statistics and Bachelor of Science in Mathematics", idx: 5899919 },
    { label: "Bachelor of Secondary Education Major in Mathematics and Bachelor of Science Major in Computer Applications", idx: 5899920 },
    { label: "Bachelor of Secondary Education Major in Mathematics and Bachelor of Science Major in Computer Electronics", idx: 5899921 },
    { label: "Bachelor of Secondary Education Major in Economics and Bachelor of Science in Commerce Major in Business Management", idx: 5899922 },
    { label: "Bachelor of Secondary Education Major in Economics and Bachelor of Science in Commerce Major in Management and Financial Institutions ", idx: 5899923 },
    { label: "Bachelor of Secondary Education Major in Education Technology and Bachelor of Science in Mathematics Major in Computer Applications", idx: 5899924 },
    { label: "Bachelor of Arts in International Studies Major in American Studies and Bachelor of Science in Accountancy", idx: 5899925 },
    { label: "Bachelor of Arts in International Studies Major in European Studies and Bachelor of Science in Accountancy", idx: 5899926 },
    { label: "Bachelor of Arts in International Studies Major in Japanese Studies and Bachelor of Science in Accountancy", idx: 5899927 },
    { label: "Bachelor of Arts Major in Behavioral Science and Bachelor of Science in Accountancy", idx: 5899928 },
    { label: "Bachelor of Arts Major in Organizational Communication and Bachelor of Science in Accountancy", idx: 5899929 },
    { label: "Bachelor of Arts Major in Philosophy and Bachelor of Science in Accountancy", idx: 5899930 },
    { label: "Bachelor of Arts Major in Political Science and Bachelor of Science in Accountancy", idx: 5899931 },
    { label: "Bachelor of Arts Major in Psychology and Bachelor of Science in Accountancy", idx: 5899932 },
    { label: "Bachelor of Arts - Bachelor of Secondary Education Major in Biology - Center for Industrial Technology and Enterprise (CITE) Project ", idx: 5899933 },
    { label: "Bachelor of Arts - Bachelor of Secondary Education Major in Chemistry - Center for Industrial Technology and Enterprise (CITE) Project ", idx: 5899934 },
    { label: "Bachelor of Arts - Bachelor of Secondary Education Major in English - Center for Industrial Technology and Enterprise (CITE) Project ", idx: 5899935 },
    { label: "Bachelor of Arts - Bachelor of Secondary Education Major in Mathematics - Center for Industrial Technology and Enterprise (CITE) Project ", idx: 5899936 },
    { label: "Bachelor of Arts - Bachelor of Secondary Education Major in Physics - Center for Industrial Technology and Enterprise (CITE) Project ", idx: 5899937 },
    { label: "Bachelor of Science - Bachelor of Secondary Education Major in Biology - Center for Industrial Technology and Enterprise (CITE) Project ", idx: 5899938 },
    { label: "Bachelor of Science - Bachelor of Secondary Education Major in Chemistry - Center for Industrial Technology and Enterprise (CITE) Project ", idx: 5899939 },
    { label: "Bachelor of Science - Bachelor of Secondary Education Major in English - Center for Industrial Technology and Enterprise (CITE) Project ", idx: 5899940 },
    { label: "Bachelor of Science - Bachelor of Secondary Education Major in Mathematics - Center for Industrial Technology and Enterprise (CITE) Project ", idx: 5899941 },
    { label: "Bachelor of Science - Bachelor of Secondary Education Major in Physics - Center for Industrial Technology and Enterprise (CITE) Project ", idx: 5899942 },
    { label: "Professional Diploma", idx: 6010001 },
    { label: "Master of Professional Studies", idx: 6010002 },
    { label: "Master of Arts", idx: 6010003 },
    { label: "Master of Science", idx: 6010004 },
    { label: "Doctor of Letters", idx: 6010005 },
    { label: "Doctor of Arts", idx: 6010006 },
    { label: "Doctor of Science", idx: 6010007 },
    { label: "Diploma in Educational Curriculum and Supervision", idx: 6140101 },
    { label: "Diploma in Educational Planning and Administration", idx: 6140102 },
    { label: "Diploma in Elementary Teaching", idx: 6140103 },
    { label: "Diploma in Teaching", idx: 6140104 },
    { label: "Master of Arts in Educational Management", idx: 6140105 },
    { label: "Master of Arts in Elementary Education", idx: 6140106 },
    { label: "Master of Arts in Secondary Education", idx: 6140107 },
    { label: "Master of Arts in Teaching", idx: 6140108 },
    { label: "Master of Arts in Education/Master of Education", idx: 6140109 },
    { label: "Master of Science in Education", idx: 6140110 },
    { label: "Master of Science in Educational Management", idx: 6140111 },
    { label: "Master of Science in Teaching", idx: 6140112 },
    { label: "Doctor of Education", idx: 6140113 },
    { label: "Doctor of Philosophy in Education", idx: 6140114 },
    { label: "Diploma in Language Studies Education", idx: 6140401 },
    { label: "Diploma in Language Teaching", idx: 6140402 },
    { label: "Diploma in Mathematics Teaching ", idx: 6140403 },
    { label: "Diploma in Physical Education", idx: 6140404 },
    { label: "Diploma in Science Teaching", idx: 6140405 },
    { label: "Diploma in Social Studies Education", idx: 6140406 },
    { label: "Teacher's Post-Graduate Diploma in Music", idx: 6140407 },
    { label: "Teacher's Post-Graduate Diploma in Spanish", idx: 6140408 },
    { label: "Master of Arts in Health Education/Studies", idx: 6140409 },
    { label: "Master of Arts in Language Teaching", idx: 6140410 },
    { label: "Master of Arts in Music Education", idx: 6140411 },
    { label: "Master of Arts in Reading", idx: 6140412 },
    { label: "Master of Arts in Religious Education", idx: 6140413 },
    { label: "Master of Arts in Science Education", idx: 6140414 },
    { label: "Master of Arts in Values Development", idx: 6140415 },
    { label: "Master of Arts in Values Education", idx: 6140416 },
    { label: "Master of Arts in Physical Education/Master of Physical Education", idx: 6140417 },
    { label: "Master of Science in Chemistry Education", idx: 6140418 },
    { label: "Master of Science in Home Economics Education", idx: 6140419 },
    { label: "Master of Science in Physical Education/Administration", idx: 6140420 },
    { label: "Doctor of Mathematics Education", idx: 6140421 },
    { label: "Doctor of Arts in Language Teaching", idx: 6140422 },
    { label: "Doctor of Philosophy in Language Teaching", idx: 6140423 },
    { label: "Doctor of Philosophy in Science Education", idx: 6140424 },
    { label: "Diploma in Teaching Vocational Education", idx: 6140801 },
    { label: "Master in Technician Teacher Education", idx: 6140802 },
    { label: "Master of Arts in Industrial Education", idx: 6140803 },
    { label: "Master of Arts in Non-Formal Education", idx: 6140804 },
    { label: "Master of Arts in Vocational Education", idx: 6140805 },
    { label: "Master of Science in Industrial/Practical Arts", idx: 6140806 },
    { label: "Doctor of Technology Education", idx: 6140807 },
    { label: "Doctor of Philosophy in Technology Education", idx: 6140808 },
    { label: "Master of Arts in Childhood Education", idx: 6141201 },
    { label: "Programs with Specialization in Adult Education", idx: 6141600 },
    { label: "Master of Arts in Special Education", idx: 6142201 },
    { label: "Diploma in Educational Management", idx: 6145001 },
    { label: "Master of Arts in Educational Management/Administration", idx: 6145002 },
    { label: "Master of Arts in Educational Programs Management", idx: 6145003 },
    { label: "Master of Science in Educational Management/Administration", idx: 6145004 },
    { label: "Doctor of Educational Management/Administration", idx: 6145005 },
    { label: "Doctor of Philosophy in Educational Management/Administration", idx: 6145006 },
    { label: "Master of Arts in Educational Psychology", idx: 6147201 },
    { label: "Master of Arts in Guidance and Counseling", idx: 6147202 },
    { label: "Master of Science in Guidance and Counseling", idx: 6147203 },
    { label: "Doctor of Guidance and Counseling", idx: 6147204 },
    { label: "Master in Health Professions Education", idx: 6149901 },
    { label: "Master of Business Education", idx: 6149902 },
    { label: "Master of Arts in Agricultural Education", idx: 6149903 },
    { label: "Master of Arts in Development Education", idx: 6149904 },
    { label: "Master of Arts in Environmental Education", idx: 6149905 },
    { label: "Master of Arts in Environmental Studies", idx: 6149906 },
    { label: "Master of Arts in Nursing Education", idx: 6149907 },
    { label: "Master of Science in Agricultural Education", idx: 6149908 },
    { label: "Master of Science in Business Education", idx: 6149909 },
    { label: "Master of Science in Development Education", idx: 6149910 },
    { label: "Doctor of Agricultural Education", idx: 6149911 },
    { label: "Doctor of Occupational Education", idx: 6149912 },
    { label: "Doctor of Philosophy in Agricultural Education", idx: 6149913 },
    { label: "Doctor of Philosophy in Development Education", idx: 6149914 },
    { label: "Master in Fine Arts/Master of Fine Arts", idx: 6210101 },
    { label: "Master of Arts in Fine Arts", idx: 6210102 },
    { label: "Master of Arts in Art History", idx: 6210201 },
    { label: "Programs in Drawing and Painting", idx: 6210400 },
    { label: "Programs in Sculpturing", idx: 6210800 },
    { label: "Post-Graduate Diploma in Ethnomusicology", idx: 6212201 },
    { label: "Artist's Post-Graduate Diploma in Music", idx: 6212202 },
    { label: "Master of Arts in Music/Master in Music", idx: 6212203 },
    { label: "Master of Arts in Speech and Drama/Master of Speech and Drama", idx: 6213201 },
    { label: "Programs in Interior Design ", idx: 6215200 },
    { label: "Other Programs in Arts", idx: 6219900 },
    { label: "Master of Arts in Humanities", idx: 6220101 },
    { label: "Master of Arts in English", idx: 6221101 },
    { label: "Master of Arts in English Literature  ", idx: 6221102 },
    { label: "Master of Arts in Filipino", idx: 6221103 },
    { label: "Master of Arts in Philippine Literature  ", idx: 6221104 },
    { label: "Doctor of Philosophy in English", idx: 6221105 },
    { label: "Doctor of Philosophy in English Literature", idx: 6221106 },
    { label: "Doctor of Philosophy in Filipino", idx: 6221107 },
    { label: "Doctor of Philosophy in Philippine Literature", idx: 6221108 },
    { label: "Master of Arts in Language and Literature", idx: 6221501 },
    { label: "Master of Arts in Spanish", idx: 6221502 },
    { label: "Doctor of Arts in Language and Literature", idx: 6221503 },
    { label: "Doctor of Philosophy in Spanish", idx: 6221504 },
    { label: "Programs in \"Dead\" Languages and Their Literature", idx: 6222100 },
    { label: "Master of Arts in Linguistics", idx: 6223101 },
    { label: "Doctor of Philosophy in Linguistics", idx: 6223102 },
    { label: "Master of Arts in Comparative Literature", idx: 6224101 },
    { label: "Doctor of Philosophy in Comparative Literature", idx: 6224102 },
    { label: "Master of Arts in Development Studies", idx: 6225101 },
    { label: "Master of Arts in History", idx: 6225102 },
    { label: "Doctor of Philosophy in Development Studies", idx: 6225103 },
    { label: "Doctor of Philosophy in History", idx: 6225104 },
    { label: "Doctor of Philosophy in Peace and Development Studies", idx: 6225105 },
    { label: "Diploma in Archeology", idx: 6226101 },
    { label: "Master of Arts in Archeology", idx: 6226102 },
    { label: "Master of Arts in Philosophy", idx: 6227101 },
    { label: "Doctor of Philosophy in Philosophy", idx: 6227102 },
    { label: "Diploma in Ministry", idx: 6228101 },
    { label: "Diploma in Pastoral Theology/Religion", idx: 6228102 },
    { label: "Master of Divinity", idx: 6228103 },
    { label: "Master of Educational Ministries", idx: 6228104 },
    { label: "Master of Ministry", idx: 6228105 },
    { label: "Master of Spiritual Life", idx: 6228106 },
    { label: "Master of Arts in Biblical Studies", idx: 6228107 },
    { label: "Master of Arts in Christian Leadership", idx: 6228108 },
    { label: "Master of Arts in Pastoral Ministry", idx: 6228109 },
    { label: "Master of Arts in Pastoral Theology/Religion", idx: 6228110 },
    { label: "Master of Arts in Systematic Theology/Religion", idx: 6228111 },
    { label: "Master of Arts in Theological/Religious Studies", idx: 6228112 },
    { label: "Master of Science in Pastoral Theology/Religion", idx: 6228113 },
    { label: "Doctor of Divinity", idx: 6228114 },
    { label: "Doctor of Ministry", idx: 6228115 },
    { label: "Doctor of Pastoral Theology/Religion", idx: 6228116 },
    { label: "Doctor of Philosophy in Theology/Religion", idx: 6228117 },
    { label: "Diploma in Social Studies", idx: 6310101 },
    { label: "Master of Arts in Behavioral Science", idx: 6310102 },
    { label: "Master of Arts in Social Research", idx: 6310103 },
    { label: "Master of Arts in Social Science", idx: 6310104 },
    { label: "Master of Arts in Social Studies", idx: 6310105 },
    { label: "Master of Science in Social Science", idx: 6310106 },
    { label: "Doctor of Philosophy in Social Science", idx: 6310107 },
    { label: "Doctor of Philosophy in Social Studies", idx: 6310108 },
    { label: "Diploma in Development Economics", idx: 6311201 },
    { label: "Master of Business Economics", idx: 6311202 },
    { label: "Master of Development Economics", idx: 6311203 },
    { label: "Master of Arts in Applied Economics", idx: 6311204 },
    { label: "Master of Arts in Economic Research", idx: 6311205 },
    { label: "Master of Arts in Economics", idx: 6311206 },
    { label: "Master of Science in Economics", idx: 6311207 },
    { label: "Master of Science in Industrial Economics", idx: 6311208 },
    { label: "Doctor of Philosophy in Economics", idx: 6311209 },
    { label: "Master of Arts in Political Science", idx: 6312201 },
    { label: "Master of Science in Political Science", idx: 6312202 },
    { label: "Doctor of Philosophy in Political Science", idx: 6312203 },
    { label: "Master of General and Pastoral Sociology", idx: 6313201 },
    { label: "Master of Arts in Rural Sociology", idx: 6313202 },
    { label: "Master of Arts in Sociology", idx: 6313203 },
    { label: "Master of Science in Applied Sociology and Anthropology", idx: 6313204 },
    { label: "Master of Science in Pastoral Sociology", idx: 6313205 },
    { label: "Master of Science in Rural Sociology", idx: 6313206 },
    { label: "Master of Science in Sociology", idx: 6313207 },
    { label: "Doctor of Philosophy in Sociology", idx: 6313208 },
    { label: "Diploma in Population Communication", idx: 6313301 },
    { label: "Master of Population Studies", idx: 6313302 },
    { label: "Master of Arts in Demography", idx: 6313303 },
    { label: "Master of Science in Demography", idx: 6313304 },
    { label: "Diploma in Applied Cosmetic Anthropology", idx: 6314201 },
    { label: "Master of Arts in Anthropology", idx: 6314202 },
    { label: "Master of Science in Anthropology", idx: 6314203 },
    { label: "Doctor of Philosophy in Anthropology", idx: 6314204 },
    { label: "Diploma in Industrial Psychology", idx: 6315201 },
    { label: "Master of Arts in Clinical Psychology", idx: 6315202 },
    { label: "Master of Arts in Industrial Psychology", idx: 6315203 },
    { label: "Master of Arts in Psychology", idx: 6315204 },
    { label: "Master of Science in Psychology", idx: 6315205 },
    { label: "Doctor of Philosophy in Counselling Psychology", idx: 6315206 },
    { label: "Doctor of Philosophy in Psychology", idx: 6315207 },
    { label: "Master of Arts in Geography", idx: 6316201 },
    { label: "Master of Science in Geography", idx: 6316202 },
    { label: "Diploma in Southeast Asian Studies", idx: 6317201 },
    { label: "Master of International Studies", idx: 6317202 },
    { label: "Master of Arts in Asian Studies", idx: 6317203 },
    { label: "Master of Arts in Islamic Studies", idx: 6317204 },
    { label: "Master of Arts in Philippine Muslim Personal Laws", idx: 6317205 },
    { label: "Master of Arts in Philippine Studies/Master of Philippine Studies", idx: 6317206 },
    { label: "Master of Science in Oriental Religion and Culture", idx: 6317207 },
    { label: "Doctor of Philosophy in Philippine Studies", idx: 6317208 },
    { label: "Other Programs in Social and Behavioral Science ", idx: 6319900 },
    { label: "Master of Arts in Communication", idx: 6320101 },
    { label: "Master of Arts in Media Studies", idx: 6320102 },
    { label: "Doctor of Philosophy in Communication", idx: 6320103 },
    { label: "Diploma in Business Journalism", idx: 6320201 },
    { label: "Diploma in Journalism", idx: 6320202 },
    { label: "Master of Arts in Journalism", idx: 6320203 },
    { label: "Diploma in Broadcast Communication", idx: 6320401 },
    { label: "Master of Arts in Broadcast Communication/Master in Broadcast Communication", idx: 6320402 },
    { label: "Programs in Public Relations ", idx: 6320700 },
    { label: "Diploma in Librarianship", idx: 6322201 },
    { label: "Master of Arts in Library Science/Master in Library Science", idx: 6322202 },
    { label: "Master of Science in Library Science", idx: 6322203 },
    { label: "Master of Arts in Christian Communication", idx: 6322901 },
    { label: "Master of Arts in Mass Communication/Master in Mass Communication", idx: 6322902 },
    { label: "Diploma in Management", idx: 6340101 },
    { label: "Master of Arts in Business Administration (Commerce)", idx: 6340102 },
    { label: "Master of Arts in Business Administration/Management/Master in Business Administration/Management", idx: 6340103 },
    { label: "Master of Arts in Management/Master in Management", idx: 6340104 },
    { label: "Master of Science in Business Administration (Commerce)", idx: 6340105 },
    { label: "Master of Science in Business Management/Administration", idx: 6340106 },
    { label: "Master of Science in Management", idx: 6340107 },
    { label: "Doctor in Management", idx: 6340108 },
    { label: "Doctor of Business Administration/Management", idx: 6340109 },
    { label: "Doctor of Philosophy in Business Management", idx: 6340110 },
    { label: "Doctor of Philosophy in Management", idx: 6340111 },
    { label: "Diploma in Management and Accounting for Executives", idx: 6343201 },
    { label: "Master in Accountancy", idx: 6343202 },
    { label: "Master of Science in Accountancy", idx: 6343203 },
    { label: "Programs in Business Administration with Specialization in Marketing", idx: 6343400 },
    { label: "Master of Science in Banking and Finance", idx: 6343601 },
    { label: "Master of Science in Computational Finance", idx: 6343602 },
    { label: "Master of Science in Financial Management", idx: 6343603 },
    { label: "Diploma in Agri-Business Management", idx: 6343901 },
    { label: "Diploma in Industrial Relations", idx: 6343902 },
    { label: "Diploma in Technology Management", idx: 6343903 },
    { label: "Master in Agri-Business Management", idx: 6343904 },
    { label: "Master in Business Economics", idx: 6343905 },
    { label: "Master in Communication Management", idx: 6343906 },
    { label: "Master in Construction Management", idx: 6343907 },
    { label: "Master in Industrial Relations", idx: 6343908 },
    { label: "Master of Science in Agri-Business Management", idx: 6343909 },
    { label: "Master of Science in Commerce and Taxation", idx: 6343910 },
    { label: "Doctor of Business Technology", idx: 6343911 },
    { label: "Doctor of Philosophy in Agri-Business Management", idx: 6343912 },
    { label: "Doctor of Philosophy in Technology Management", idx: 6343913 },
    { label: "Diploma in Governmental Management", idx: 6345201 },
    { label: "Diploma in Public Management", idx: 6345202 },
    { label: "Master in Governmental Management", idx: 6345203 },
    { label: "Master in Local Government", idx: 6345204 },
    { label: "Master of Business and Government Administration", idx: 6345205 },
    { label: "Master of Arts in Fiscal Studies", idx: 6345206 },
    { label: "Master of Arts in Public Administration/Management/Master in Public Administration/Management", idx: 6345207 },
    { label: "Master of Science in Public and Business Administration", idx: 6345208 },
    { label: "Doctor of Fiscal Studies", idx: 6345209 },
    { label: "Doctor of Public Administration", idx: 6345210 },
    { label: "Doctor of Philosophy in Fiscal Studies", idx: 6345211 },
    { label: "Doctor of Philosophy in Public Management/Administration", idx: 6345212 },
    { label: "Diploma in Educational Administration ", idx: 6346201 },
    { label: "Master in Customs Administration", idx: 6346202 },
    { label: "Master in Hospital Administration", idx: 6346203 },
    { label: "Master in Management of Small Industry", idx: 6346204 },
    { label: "Master in Media Management", idx: 6346205 },
    { label: "Master in Police Management/Administration", idx: 6346206 },
    { label: "Master in Shipping Business Management", idx: 6346207 },
    { label: "Master of Church Administration", idx: 6346208 },
    { label: "Master of Arts in School Administration", idx: 6346209 },
    { label: "Master of Arts in Vocational School Management", idx: 6346210 },
    { label: "Master of Science in Elementary School Management", idx: 6346211 },
    { label: "Master of Science in Food Service Administration", idx: 6346212 },
    { label: "Doctor of Philosophy in Food Service Administration", idx: 6346213 },
    { label: "Doctor of Philosophy in Institutional Development Management", idx: 6346214 },
    { label: "Diploma in Cooperatives", idx: 6349901 },
    { label: "Diploma in Development Administration", idx: 6349902 },
    { label: "Diploma in Research and Development Management", idx: 6349903 },
    { label: "Master in Resource Systems Management", idx: 6349904 },
    { label: "Master of Arts in Development Management/Administration//Master in Development Management/Administration", idx: 6349905 },
    { label: "Master of Arts in Organizational Development and Planning  ", idx: 6349906 },
    { label: "Master of Science in Cooperative Management", idx: 6349907 },
    { label: "Doctor of Philosophy in Development Administration", idx: 6349908 },
    { label: "Doctor of Philosophy in Organizational Development and Planning  ", idx: 6349909 },
    { label: "Master of Laws", idx: 6380101 },
    { label: "Doctor of Civil Laws", idx: 6380102 },
    { label: "Programs in International Law", idx: 6380400 },
    { label: "Programs in Labor Law", idx: 6380600 },
    { label: "Programs in Maritime Law", idx: 6380800 },
    { label: "Master of Laws in Taxation", idx: 6389901 },
    { label: "Master of Science in Criminal Justice", idx: 6389902 },
    { label: "Diploma in Bio-Chemistry ", idx: 6420201 },
    { label: "Diploma in Micro-Biology", idx: 6420202 },
    { label: "Diploma in Physiology", idx: 6420203 },
    { label: "Diploma Program in Biology", idx: 6420204 },
    { label: "Master of Science in Applied Zoology", idx: 6420205 },
    { label: "Master of Science in Bio-Chemistry", idx: 6420206 },
    { label: "Master of Science in Biological Science", idx: 6420207 },
    { label: "Master of Science in Biology", idx: 6420208 },
    { label: "Master of Science in Botany", idx: 6420209 },
    { label: "Master of Science in Entomology", idx: 6420210 },
    { label: "Master of Science in Genetics", idx: 6420211 },
    { label: "Master of Science in Marine Biology", idx: 6420212 },
    { label: "Master of Science in Micro-Biology", idx: 6420213 },
    { label: "Master of Science in Molecular Biology and Bio-Technology", idx: 6420214 },
    { label: "Master of Science in Pharmacology", idx: 6420215 },
    { label: "Master of Science in Physiology", idx: 6420216 },
    { label: "Master of Science in Zoology", idx: 6420217 },
    { label: "Doctor of Philosophy in Bio-Chemistry", idx: 6420218 },
    { label: "Doctor of Philosophy in Biological Science", idx: 6420219 },
    { label: "Doctor of Philosophy in Biology", idx: 6420220 },
    { label: "Doctor of Philosophy in Botany", idx: 6420221 },
    { label: "Doctor of Philosophy in Entomology", idx: 6420222 },
    { label: "Doctor of Philosophy in Genetics", idx: 6420223 },
    { label: "Doctor of Philosophy in Micro-Biology", idx: 6420224 },
    { label: "Doctor of Philosophy in Molecular Biology and Bio-Technology", idx: 6420225 },
    { label: "Doctor of Philosophy in Physiology", idx: 6420226 },
    { label: "Doctor of Philosophy in Zoology", idx: 6420227 },
    { label: "Diploma Program in Chemistry", idx: 6441201 },
    { label: "Master of Science in Chemistry", idx: 6441202 },
    { label: "Doctor of Philosophy in Chemistry", idx: 6441203 },
    { label: "Master of Science in Geology", idx: 6442201 },
    { label: "Master of Science in Marine Geology", idx: 6442202 },
    { label: "Doctor of Philosophy in Geology", idx: 6442203 },
    { label: "Diploma in Physics", idx: 6443201 },
    { label: "Master of Science in Applied Physics", idx: 6443202 },
    { label: "Master of Science in Physics", idx: 6443203 },
    { label: "Doctor of Philosophy in Physics", idx: 6443204 },
    { label: "Programs in Astronomy ", idx: 6444200 },
    { label: "Diploma in Meteorology", idx: 6445201 },
    { label: "Master of Science in Meteorology", idx: 6445202 },
    { label: "Doctor of Philosophy in Meteorology", idx: 6445203 },
    { label: "Master of Science in Marine Bio-Diversity", idx: 6446201 },
    { label: "Master of Science in Marine Science", idx: 6446202 },
    { label: "Master of Science in Oceanography", idx: 6446203 },
    { label: "Doctor of Philosophy in Marine Science", idx: 6446204 },
    { label: "Other Programs in Physical Sciences ", idx: 6449900 },
    { label: "Diploma in Mathematics", idx: 6460101 },
    { label: "Master of Arts in Mathematics", idx: 6460102 },
    { label: "Master of Science in Applied Mathematics", idx: 6460103 },
    { label: "Master of Science in Mathematics", idx: 6460104 },
    { label: "Doctor of Philosophy in Mathematical Science", idx: 6460105 },
    { label: "Doctor of Philosophy in Mathematics", idx: 6460106 },
    { label: "Diploma in Statistics", idx: 6461101 },
    { label: "Master in Applied Statistics", idx: 6461102 },
    { label: "Master of Arts in Statistics/Master of Statistics", idx: 6461103 },
    { label: "Master of Science in Statistics", idx: 6461104 },
    { label: "Doctor of Philosophy in Statistics", idx: 6461105 },
    { label: "Doctor of Philosophy in Actuarial Science", idx: 6462101 },
    { label: "Other Programs in Mathematics", idx: 6469900 },
    { label: "Diploma in Computer Science", idx: 6484101 },
    { label: "Diploma in Computer Technology", idx: 6484102 },
    { label: "Master in Computer Science", idx: 6484103 },
    { label: "Master of Computer Applications", idx: 6484104 },
    { label: "Master of Science in Computer Science", idx: 6484105 },
    { label: "Master of Science in Information Management/Science", idx: 6484106 },
    { label: "Master of Science in Information Technology", idx: 6484107 },
    { label: "Doctor of Philosophy in Computer Science", idx: 6484108 },
    { label: "Master of Engineering in Chemical Engineering", idx: 6521201 },
    { label: "Master of Science in Chemical Engineering", idx: 6521202 },
    { label: "Doctor of Philosophy in Chemical Engineering", idx: 6521203 },
    { label: "Master of Engineering in Civil Engineering", idx: 6521601 },
    { label: "Master of Science in Civil Engineering", idx: 6521602 },
    { label: "Master of Science in Structural Engineering", idx: 6521603 },
    { label: "Diploma in Remote Sensing", idx: 6522201 },
    { label: "Master in Electrical Technology", idx: 6522202 },
    { label: "Master of Engineering in Computer Engineering", idx: 6522203 },
    { label: "Master of Engineering in Electrical Engineering", idx: 6522204 },
    { label: "Master of Science in Computer Engineering", idx: 6522205 },
    { label: "Master of Science in Electrical Engineering", idx: 6522206 },
    { label: "Master of Science in Electronics and Communications Engineering", idx: 6522207 },
    { label: "Master of Science in Remote Sensing", idx: 6522208 },
    { label: "Doctor of Philosophy in Electronics and Communications Engineering", idx: 6522209 },
    { label: "Diploma in Industrial Engineering", idx: 6522601 },
    { label: "Master in Industrial and Management Engineering ", idx: 6522602 },
    { label: "Master of Engineering in Industrial Engineering", idx: 6522603 },
    { label: "Master of Management Engineering ", idx: 6522604 },
    { label: "Master of Arts in Industrial Development and Technology", idx: 6522605 },
    { label: "Master of Arts in Industrial Engineering", idx: 6522606 },
    { label: "Master of Arts in Industrial Technology", idx: 6522607 },
    { label: "Master of Science in Industrial and Management Engineering ", idx: 6522608 },
    { label: "Master of Science in Industrial Engineering", idx: 6522609 },
    { label: "Master of Science in Management Engineering ", idx: 6522610 },
    { label: "Master of Science in Manufacturing Engineering", idx: 6522611 },
    { label: "Doctor of Philosophy in Industrial Engineering", idx: 6522612 },
    { label: "Master of Engineering in Metallurgical Engineering", idx: 6523201 },
    { label: "Master of Science in Metallurgical Engineering", idx: 6523202 },
    { label: "Programs in Mining Engineering ", idx: 6523600 },
    { label: "Master of Engineering in Mechanical Engineering", idx: 6524201 },
    { label: "Master of Science in Mechanical Engineering", idx: 6524202 },
    { label: "Doctor of Philosophy in Mechanical Engineering", idx: 6524203 },
    { label: "Master of Public Health Engineering", idx: 6525001 },
    { label: "Master of Science in Environmental Engineering", idx: 6525002 },
    { label: "Master of Science in Sanitary Engineering", idx: 6525003 },
    { label: "Master of Science in Agricultural Engineering", idx: 6525301 },
    { label: "Doctor of Agricultural Engineering", idx: 6525302 },
    { label: "Doctor of Philosophy in Agricultural Engineering", idx: 6525303 },
    { label: "Programs in Forestry Engineering ", idx: 6526300 },
    { label: "Diploma in Engineering (Water Resources)", idx: 6529901 },
    { label: "Master in Engineering Design", idx: 6529902 },
    { label: "Master in Engineering Science", idx: 6529903 },
    { label: "Master in Land and Water Resources Engineering", idx: 6529904 },
    { label: "Master in Technology", idx: 6529905 },
    { label: "Master of Engineering in Engineering Design", idx: 6529906 },
    { label: "Master of Engineering in Environmental Engineering", idx: 6529907 },
    { label: "Master in Engineering/Master of Engineering", idx: 6529908 },
    { label: "Master of Science in Energy Engineering", idx: 6529909 },
    { label: "Master of Science in Engineering", idx: 6529910 },
    { label: "Master of Science in Materials Science Engineering", idx: 6529911 },
    { label: "Master of Science in Meteorological Engineering", idx: 6529912 },
    { label: "Master of Science in Water and Waste Water Engineering", idx: 6529913 },
    { label: "Doctor of Technology", idx: 6529914 },
    { label: "Doctor of Philosophy in Energy Engineering", idx: 6529915 },
    { label: "Doctor of Philosophy in Materials Science Engineering", idx: 6529916 },
    { label: "Master of Science in Architecture", idx: 6580101 },
    { label: "Master of Architecture in Architectural Design", idx: 6580201 },
    { label: "Master in Tropical Landscape Architecture", idx: 6581201 },
    { label: "Diploma in Land Use Planning", idx: 6582201 },
    { label: "Diploma in Urban and Regional Planning", idx: 6582202 },
    { label: "Master of Arts in Urban and Regional Planning /Master in Urban and Regional Planning", idx: 6582203 },
    { label: "Doctor of Philosophy in Urban and Regional Planning", idx: 6582204 },
    { label: "Diploma in Agriculture", idx: 6620101 },
    { label: "Master in Agriculture", idx: 6620102 },
    { label: "Master of Science in Agriculture", idx: 6620103 },
    { label: "Doctor of Philosophy in Agriculture", idx: 6620104 },
    { label: "Doctor of Philosophy in Agricultural Science", idx: 6620105 },
    { label: "Master of Science in Animal Husbandry", idx: 6620301 },
    { label: "Master of Science in Animal Science", idx: 6620302 },
    { label: "Doctor of Philosophy in Animal Science", idx: 6620303 },
    { label: "Master of Science in Horticulture", idx: 6620601 },
    { label: "Master of Science in Plant Pathology", idx: 6620602 },
    { label: "Master of Science in Plant Science", idx: 6620603 },
    { label: "Doctor of Philosophy in Horticulture", idx: 6620604 },
    { label: "Doctor of Philosophy in Plant Pathology", idx: 6620605 },
    { label: "Master of Science in Agronomy", idx: 6620801 },
    { label: "Master of Science in Crop Protection", idx: 6620802 },
    { label: "Master of Science in Crop Science", idx: 6620803 },
    { label: "Master of Science in Grain Science", idx: 6620804 },
    { label: "Master of Science in Plant Breeding", idx: 6620805 },
    { label: "Master of Science in Seed Science", idx: 6620806 },
    { label: "Master of Science in Weed Science", idx: 6620807 },
    { label: "Doctor of Philosophy in Agronomy", idx: 6620808 },
    { label: "Doctor of Philosophy in Crop Science", idx: 6620809 },
    { label: "Doctor of Philosophy in Plant Breeding", idx: 6620810 },
    { label: "Diploma in Agricultural Economics", idx: 6621201 },
    { label: "Master of Science in Agricultural Economics", idx: 6621202 },
    { label: "Doctor of Philosophy in Agricultural Economics", idx: 6621203 },
    { label: "Master of Science in Food Science/Technology", idx: 6622201 },
    { label: "Doctor of Philosophy in Food Science/Technology", idx: 6622202 },
    { label: "Master in Soil and Water Development", idx: 6622601 },
    { label: "Master of Soil Science (Soil Conservation and Management)", idx: 6622602 },
    { label: "Master of Science in Soil Science (Soil Conservation and Management)", idx: 6622603 },
    { label: "Doctor of Philosophy in Soil Science", idx: 6622604 },
    { label: "Master in Agricultural Development ", idx: 6624901 },
    { label: "Master of Arts in Agrarian Reform", idx: 6624902 },
    { label: "Master of Arts in Agrarian Studies/Master of Agrarian Studies", idx: 6624903 },
    { label: "Master of Science in Agricultural Chemistry", idx: 6624904 },
    { label: "Master of Science in Agricultural Development", idx: 6624905 },
    { label: "Master of Science in Agro-Industrial Technology ", idx: 6624906 },
    { label: "Master of Science in Agro-Meteorology", idx: 6624907 },
    { label: "Master of Science in Development Communication", idx: 6624908 },
    { label: "Master of Science in Farming System", idx: 6624909 },
    { label: "Master of Science in Sericulture", idx: 6624910 },
    { label: "Doctor of Agricultural Chemistry", idx: 6624911 },
    { label: "Doctor of Philosophy in Agricultural Chemistry", idx: 6624912 },
    { label: "Doctor of Philosophy in Development Communication", idx: 6624913 },
    { label: "Doctor of Philosophy in Farming System", idx: 6624914 },
    { label: "Diploma in Agro-Forestry", idx: 6626201 },
    { label: "Master of Forestry", idx: 6626202 },
    { label: "Master of Science in Agro-Forestry", idx: 6626203 },
    { label: "Master of Science in Forest Biological Science", idx: 6626204 },
    { label: "Master of Science in Forest Entomology", idx: 6626205 },
    { label: "Master of Science in Forest Resources Management", idx: 6626206 },
    { label: "Master of Science in Forestry", idx: 6626207 },
    { label: "Master of Science in Wildlife Studies", idx: 6626208 },
    { label: "Master of Science in Wood Science and Technology", idx: 6626209 },
    { label: "Doctor of Philosophy in Forestry", idx: 6626210 },
    { label: "Doctor of Philosophy in Wood Science and Technology", idx: 6626211 },
    { label: "Master in Fisheries Technology", idx: 6627201 },
    { label: "Master of Science in Aquaculture", idx: 6627202 },
    { label: "Master of Science in Fisheries", idx: 6627203 },
    { label: "Doctor of Science in Fisheries", idx: 6627204 },
    { label: "Doctor of Philosophy in Fisheries", idx: 6627205 },
    { label: "Master of Science in Veterinary Medicine", idx: 6643201 },
    { label: "Master of Science in Veterinary Parasitology", idx: 6643202 },
    { label: "Master of Science in Veterinary Pathology", idx: 6643203 },
    { label: "Doctor of Philosophy in Veterinary Medicine", idx: 6643204 },
    { label: "Diploma in Public Health", idx: 6720201 },
    { label: "Master in Community Health", idx: 6720202 },
    { label: "Master in Medical Health", idx: 6720203 },
    { label: "Master in Public Health/Master of Public Health", idx: 6720204 },
    { label: "Master of Arts in Health Science", idx: 6720205 },
    { label: "Master of Arts in Public Health ", idx: 6720206 },
    { label: "Master of Science in Public Health", idx: 6720207 },
    { label: "Doctor of Public Health", idx: 6720208 },
    { label: "Diploma in Anesthesiology", idx: 6720601 },
    { label: "Master of Science in Clinical Medicine (Epidemiology)", idx: 6720602 },
    { label: "Master of Science in Clinical Medicine (Surgery)", idx: 6720603 },
    { label: "Master of Science in Internal Medicine", idx: 6720604 },
    { label: "Master in Occupational Health", idx: 6720801 },
    { label: "Master in Rehabilitation Science", idx: 6720802 },
    { label: "Master of Science in Occupational Health", idx: 6720803 },
    { label: "Master of Arts in Nursing/Master in Nursing", idx: 6721201 },
    { label: "Master of Science in Nursing", idx: 6721202 },
    { label: "Doctor of Philosophy in Nursing", idx: 6721203 },
    { label: "Master of Science in Medical Technology", idx: 6723001 },
    { label: "Diploma in Dental Public Health", idx: 6724201 },
    { label: "Diploma in Orthodontics", idx: 6724202 },
    { label: "Master of Dental Science", idx: 6724203 },
    { label: "Master of Science in Dentistry", idx: 6724204 },
    { label: "Doctor of Dental Medicine", idx: 6724205 },
    { label: "Master of Science in Hospital Pharmacy", idx: 6725201 },
    { label: "Master of Science in Industrial Pharmacy", idx: 6725202 },
    { label: "Master of Science in Pharmaceutical Chemistry", idx: 6725203 },
    { label: "Master of Science in Pharmacy", idx: 6725204 },
    { label: "Doctor of Pharmacy", idx: 6725205 },
    { label: "Doctor of Philosophy in Pharmaceutical Chemistry", idx: 6725206 },
    { label: "Doctor of Philosophy in Pharmacy", idx: 6725207 },
    { label: "Master in Clinical Audiology", idx: 6726201 },
    { label: "Master of Science in Optometry", idx: 6726202 },
    { label: "Doctor of Optometry", idx: 6726203 },
    { label: "Master of Science in Applied Nutrition", idx: 6727201 },
    { label: "Master of Science in Food and Nutrition", idx: 6727202 },
    { label: "Master of Science in Nutrition and Dietetics", idx: 6727203 },
    { label: "Master of Science in Nutrition and Food Planning", idx: 6727204 },
    { label: "Doctor of Philosophy in Food and Nutrition", idx: 6727205 },
    { label: "Other Programs in Health ", idx: 6729900 },
    { label: "Diploma in Social Work", idx: 6763201 },
    { label: "Master of Social Work", idx: 6763202 },
    { label: "Master of Science in Social Development", idx: 6763203 },
    { label: "Master of Science in Social Work", idx: 6763204 },
    { label: "Doctor of Social Development", idx: 6763205 },
    { label: "Diploma in Community Development", idx: 6765201 },
    { label: "Diploma in Community Organizing", idx: 6765202 },
    { label: "Master in Participatory Development", idx: 6765203 },
    { label: "Master of Rural/Community Development", idx: 6765204 },
    { label: "Master of Arts in Community Development/Master in Community Development", idx: 6765205 },
    { label: "Master of Science in Community Development", idx: 6765206 },
    { label: "Master of Science in Extension Service and Management", idx: 6765207 },
    { label: "Master of Science in Rural/Community Development", idx: 6765208 },
    { label: "Doctor of Philosophy in Community Development", idx: 6765209 },
    { label: "Doctor of Philosophy in Rural Development", idx: 6765210 },
    { label: "Diploma in Early Childhood Development", idx: 6810101 },
    { label: "Diploma in Family Life and Child Development", idx: 6810102 },
    { label: "Master in Family Life and Child Development", idx: 6810103 },
    { label: "Master of Arts in Child Development", idx: 6810104 },
    { label: "Master of Arts in Family Life/Family Education", idx: 6810105 },
    { label: "Master of Arts in Home Economics/Master of Home Economics", idx: 6810106 },
    { label: "Master of Science in Family Resource Management", idx: 6810107 },
    { label: "Master of Science in Home Economics", idx: 6810108 },
    { label: "Doctor of Philosophy in Home Economics", idx: 6810109 },
    { label: "Programs in Household Arts", idx: 6813200 },
    { label: "Diploma in Home Technology  ", idx: 6813401 },
    { label: "Master of Science in Home Technology", idx: 6813402 },
    { label: "Master of Science in Hotel and Restaurant Management", idx: 6817201 },
    { label: "Diploma in Tourism", idx: 6818201 },
    { label: "Diploma in Environmental Science", idx: 6855201 },
    { label: "Master of Environmental Planning", idx: 6855202 },
    { label: "Master of Science in Environmental Management", idx: 6855203 },
    { label: "Master of Science in Environmental Science/Studies", idx: 6855204 },
    { label: "Doctor of Philosophy in Environmental Science", idx: 6855205 },
    { label: "Master of Criminology", idx: 6861301 },
    { label: "Master of Science in Criminology", idx: 6861302 },
    { label: "Doctor of Philosophy in Criminology", idx: 6861303 },
    { label: "Programs in Military", idx: 6861700 },
    { label: "Master of Arts in Peace and Security", idx: 6861901 },
    { label: "Master of Arts in Human Resource Development and Planning", idx: 6890101 },
    { label: "Master of Science in Personnel and Human Resource Management", idx: 6890102 },
    { label: "Doctor of Philosophy in Personnel and Human Resource Management", idx: 6890103 },
    { label: "Diploma in Women and Development", idx: 6899901 },
    { label: "Master of Arts in Women and Development", idx: 6899902 },
    { label: "Other Course (NEC)", idx: 9999999 }
];
const options = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 0
};
//#endregion

$(document).ready(function (e) {

    var isLoggedIn = Android.checkLoggedIn();

    if (isLoggedIn != "true") {
        window.location.href = "login.html";
    }

    $("#msg-modal").modal("show").find("#msg-message").html("Loading raster database.<br>Please wait...");

    MBTiles = L.tileLayer.mbTiles('https://appassets.androidplatform.net/raster/raster.mbtiles', {
        minZoom: 1,
        maxZoom: 19
    });

    MBTiles.on('databaseloaded', function (ev) {
        setTimeout(() => {
            $("#msg-modal").modal("hide");
        }, 500);
        console.info('MBTiles DB loaded', ev.error);
    });

    MBTiles.on('databaseerror', function (ev) {
        setTimeout(() => {
            $("#msg-modal").modal("hide");
            $("#msg-modal").modal("show").find("#msg-message").html("Raster file not found.<br>Please download the raster file and restart the app.");
        }, 250);
        console.info('MBTiles DB error', ev.error);
    });

    osmTiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        zoomControl: false,
        minZoom: 1,
        maxZoom: 19,
        attribution: 'CBMS Tabaco'
    })
    brgyBounds = L.geoJSON(brgy_bounds, {
        style: {
            weight: 2,
            opacity: 1,
            color: 'red',
            dashArray: '3',
            fillOpacity: 0,
            fillColor: 'white'
        }
    }).bindPopup(function (layer) {
        return layer.feature.properties.B_NM;
    });

    loaded();

});

function loaded() {

    userDetails = JSON.parse(Android.getLoggedInUser());
    userID = userDetails["user_id"];
    accessLevel = userDetails["accessLevel"] * 1;
    Android.clearTemp();
    fetchInstancelist(loadList);
    username = userDetails["username"];
    $(".username").html(username);

}

//#region map modal
function geolocationCoordinates() {

    function success(pos) {
        const crd = pos.coords;

        $("#latitude").val(crd.latitude);
        $("#longitude").val(crd.longitude);

        latitude = $("#latitude").val();
        longitude = $("#longitude").val();
        accuracy = (crd.accuracy / 2);

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser");
    } else {
        console.log("Locating…");
        navigator.geolocation.getCurrentPosition(success, error, options);
    }

}
function showMap() {

    $("#getLocModal").modal("show");

    latitude = $("#latitude").val();
    longitude = $("#longitude").val();

}
$("#getLocModal").on("shown.bs.modal", function (e) {

    map = L.map('map', {
        zoom: 19,
        center: [latitude, longitude]
    });

    osmTiles.addTo(map);

    MBTiles.addTo(map);

    brgyBounds.addTo(map);

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    locationCircle = L.circle([latitude, longitude], accuracy)
        .addTo(map)
        .bindPopup(`You are within ${accuracy} meters from this point.`).openPopup();
    //map.locate({ setView: true, maxZoom: 19 });

});
function onLocationFound(e) {
    var radius = e.accuracy / 2;

    locationCircle.remove();
    //var locationMarker = L.circleMarker(e.latlng).addTo(map);

    locationCircle = L.circle(e.latlng, radius)
        .addTo(map)
        .bindPopup(`You are within ${radius} meters from this point.`).openPopup();
}
function onLocationError(e) {
    alert(e.message);
}
function getLocation() {

    map.locate({
        setView: true,
        animate: true,
        zoom: 19,
        enableHighAccuracy: true,
        timeout: 20000
    });

}
function getCoordinates() {

    var latlng = {};

    latlng = map.getCenter();

    $("#latitude").val(latlng.lat);
    $("#longitude").val(latlng.lng);

    $("#getLocModal").modal("hide");

}
$("#getLocModal").on("hidden.bs.modal", function (e) {

    map.remove();

});
//#endregion map modal
function home() {

    clearInterval(autoSaveInterval);

    $("#header").html(topbar_index);
    $("#page").html(main_index);
    $("#sidebar").attr("hidden", true);
    $(".required-field").hide();
    $("#next").off();
    $("#prev").off();
    $("#pages_nav li").off();
    $("#fname").off();
    Android.clearTemp();
    fetchInstancelist(loadList);

}
function exit() {
    if (hpqEditMode == 1) {
        Swal.fire({
            title: 'Do you want to exit without saving?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {

                saveData('exit');
            } else if (result.isDenied) {

                home();
            }
        })
    } else {

        home();
    }
}
function logOut() {

    instancelist = null;
    instancelist = undefined;
    Swal.fire({
        title: 'Ready to leave?',
        text: 'Click "Logout" below if you are ready to end your current session.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout'
    }).then((result) => {
        if (result.isConfirmed) {
            Android.logout();
            window.location.href = "login.html";
        }
    })

}
function fetchInstancelist(callback) {
    instancelist = JSON.parse(Android.getInstancelist());

    callback();
}
function loadList() {

    let c = [];
    totalEncoded = 0;
    encodedToday = 0;
    validEncoded = 0;
    invalidEncoded = 0;

    for (let key in instancelist["data"]) {
        thisFile = instancelist["data"][key]["fileName"];
        instanceID = instancelist["data"][key]["instanceID"];

        if (accessLevel == 2) {

            if (instancelist["data"][key]["encoder"] == userID) {

                totalEncoded++;

                if (new Date().toLocaleDateString() == new Date(instancelist["data"][key]["int_date"]).toLocaleDateString()) encodedToday++;

                if (instancelist["data"][key]["hpq_stat"] == 0 || instancelist["data"][key]["hpq_stat"] == 1) invalidEncoded++;
                if (instancelist["data"][key]["hpq_stat"] == 2 || instancelist["data"][key]["hpq_stat"] == 3) validEncoded++;

                c.push(`<tr>
                                                    <td>
                                                        <div class="form-check">`);
                if (instancelist["data"][key]["hpq_stat"] == 2) {
                    c.push(`        <input class="form-check-input" name="instances[]" type="checkbox" value="${instanceID}" id="'${instanceID}">`);
                } else {
                    c.push(`        <input class="form-check-input" name="instances[]" type="checkbox" value="${instanceID}" id="${instanceID}" disabled>`);
                }
                c.push(`            <label class="form-check-label ml-1" for="${instanceID}">
                                                                ${_brgy[instancelist["data"][key]["formDetail"]["brgy"]]}
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>${instancelist["data"][key]["formDetail"]["hcn"]}</td>
                                                    <td>${instancelist["data"][key]["formDetail"]["respondent"]}</td>
                                                    <td>${new Date(instancelist["data"][key]["int_date"]).toLocaleDateString()}</td>
                                                    <td>${_hpq_stat[instancelist["data"][key]["hpq_stat"]]}</td>`);
                if (instancelist["data"][key]["hpq_stat"] != 3) {
                    c.push(`<td align="center">
                                                        <div class="dropdown">
                                                            <a class="btn btn-outline-info dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                Option
                                                            </a>
                                                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                                                <a class="dropdown-item" onclick="view_hpq('${instancelist["data"][key]["fileName"]}');">
                                                                    <i class="bi bi-eye text-info mr-1"></i>
                                                                    View
                                                                </a>
                                                                <div class="dropdown-divider"></div>
                                                                <a class="dropdown-item" onclick="edit_hpq('${instancelist["data"][key]["fileName"]}');">
                                                                    <i class="bi bi-pencil text-success mr-1"></i>
                                                                    Edit
                                                                </a>
                                                                <div class="dropdown-divider"></div>
                                                                <a class="dropdown-item" onclick="delete_hpq('${instancelist["data"][key]["fileName"]}');">
                                                                    <i class="bi bi-trash text-danger mr-1"></i>
                                                                    Delete
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>`);
                } else {
                    c.push(`<td align="center">
                                                        <div class="dropdown">
                                                            <button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                Action
                                                            </button>
                                                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                                                <a class="dropdown-item" onclick="view_hpq('${instancelist["data"][key]["fileName"]}');">
                                                                    <i class="bi bi-eye text-success mr-1"></i> 
                                                                    View
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>`);
                }
            }
        } else if (accessLevel == 1) {

            totalEncoded++;

            if (new Date().toLocaleDateString() == new Date(instancelist["data"][key]["int_date"]).toLocaleDateString()) encodedToday++;
            if (instancelist["data"][key]["hpq_stat"] == 0 || instancelist["data"][key]["hpq_stat"] == 1) invalidEncoded++;
            if (instancelist["data"][key]["hpq_stat"] == 2 || instancelist["data"][key]["hpq_stat"] == 3) validEncoded++;

            c.push(`<tr>
                                                <td>
                                                    <div class="form-check">`);
            if (instancelist["data"][key]["hpq_stat"] == 2) {
                c.push(`        <input class="form-check-input" name="instances[]" type="checkbox" value="${instanceID}" id="'${instanceID}">`);
            } else {
                c.push(`        <input class="form-check-input" name="instances[]" type="checkbox" value="${instanceID}" id="${instanceID}" disabled>`);
            }
            c.push(`            <label class="form-check-label ml-1" for="${instanceID}">
                                                            ${_brgy[instancelist["data"][key]["formDetail"]["brgy"]]}
                                                        </label>
                                                    </div>
                                                </td>
                                                <td>${instancelist["data"][key]["formDetail"]["hcn"]}</td>
                                                <td>${instancelist["data"][key]["formDetail"]["respondent"]}</td>
                                                <td>${new Date(instancelist["data"][key]["int_date"]).toLocaleDateString()}</td>
                                                <td>${_hpq_stat[instancelist["data"][key]["hpq_stat"]]}</td>`);
            if (instancelist["data"][key]["hpq_stat"] != 3) {
                c.push(`<td align="center">
                                                    <div class="dropdown">
                                                        <a class="btn btn-outline-secondary dropdown-toggle " type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Option
                                                        </a>
                                                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                                            <a class="dropdown-item" onclick="view_hpq('${instancelist["data"][key]["fileName"]}');">
                                                                <i class="bi bi-eye text-info mr-1"></i> 
                                                                View
                                                            </a>
                                                            <div class="dropdown-divider"></div>
                                                            <a class="dropdown-item" onclick="edit_hpq('${instancelist["data"][key]["fileName"]}');">
                                                                <i class="bi bi-pencil text-success mr-1"></i> 
                                                                Edit
                                                            </a>
                                                            <div class="dropdown-divider"></div>
                                                            <a class="dropdown-item" onclick="delete_hpq('${instancelist["data"][key]["fileName"]}');">
                                                                <i class="bi bi-trash text-danger mr-1"></i> 
                                                                Delete
                                                            </a>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>`);
            } else {
                c.push(`<td align="center">
                                                    <div class="dropdown">
                                                        <button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Action
                                                        </button>
                                                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                                            <a class="dropdown-item" onclick="view_hpq('${instancelist["data"][key]["fileName"]}');">
                                                                <i class="bi bi-eye text-success mr-1"></i> 
                                                                View
                                                            </a>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>`);
            }
        }
    }

    $("#dashdataTable").DataTable().destroy();
    $("#dashboardTable").html(c.join(""));

    setTimeout(() => {
        $("#total_encoded").html(totalEncoded);
        $("#encoded_today").html(encodedToday);
        $("#validated_hpq").html(validEncoded);
        $("#incomplete_hpq").html(invalidEncoded);
        $("#dashdataTable").DataTable();
    }, 250);
}
function recoverInstancelist() {

    if (Android.recoverInstancelist()) {
        fetchInstancelist(loadList);
    } else {
        Swal.fire({
            title: 'Oops!!! Something went wrong :(',
            html: 'Recovery failed.<br><br>Please check your storage permission.',
            icon: 'error',
        })
    }

}
//#region form validation
function validate_main_form() { // ok

    computeIncome();

    requiredFieldsCount = 0;
    var thisElement;
    var nArray = [];

    $("#reqFields").html("");

    hh_head = 0;
    ofws = 0;
    unipars = 0;
    pwds = 0;
    pregnants = 0;
    wagcshm_tot = 0;
    wagkndm_tot = 0;

    nnucfam = $("#nnucfam").val();
    numofw = $("#numofw").val();
    numpreg = $("#numpreg").val();
    numunipar = $("#numunipar").val();
    numpwd = $("#numpwd").val();
    phsize = $("#phsize").val();
    ndeath = $("#ndeath").val();
    nalp = $("#nalp").val();
    ncrop = $("#ncrop").val();
    naquaequip = $("#naquaequip").val();
    naquani = $("#naquani").val();

    $.each(hpq_mem, function (i, item) {

        nArray.push(item.nucfam);

        if (item.ofwind == 1) ofws++;

        if (item.uniparind == 1) unipars++;

        if (item.pwdind == 1) pwds++

        if (item.pregind == 1) pregnants++;

        wagcshm_tot += +item.wagcshm;
        wagkndm_tot += +item.wagkndm;

    });

    fams = Math.max.apply(Math, nArray);

    let addNewForm = document.getElementById("addnew_form").elements;

    try {
        hpq_mem_len = hpq_mem.length;
    } catch (error) {
        hpq_mem_len = 0;
    }
    try {
        hpq_death_len = hpq_death.length;
    } catch (error) {
        hpq_death_len = 0;
    }

    try {
        hpq_alp_len = hpq_alp.length;
    } catch (error) {
        hpq_alp_len = 0;
    }
    try {
        hpq_crop_len = hpq_crop.length;
    } catch (error) {
        hpq_crop_len = 0;
    }
    try {
        hpq_aquaequip_len = hpq_aquaequip.length;
    } catch (error) {
        hpq_aquaequip_len = 0;
    }
    try {
        hpq_aquani_len = hpq_aquani.length;
    } catch (error) {
        hpq_aquani_len = 0;
    }

    //#region bunch of ifs
    //#region water/sanitation/housing/elec
    if ($("#house_type").val() == 5) {
        $(".house_type_o").show();
        $("#house_type_o").required();
    } else {
        $(".house_type_o").hide();
        $("#house_type_o").val("").notRequired();
    }
    if ($("#nnucfam").val() == "" || $("#nnucfam").val() == 0) {
        $(".nnucfam_msg_null").show();
        $("#next").hide();
    } else {
        $(".nnucfam_msg_null").hide();
        $("#next").show();
    }
    if ($("#nnucfam").val() > 10) {
        $(".nnucfam_msg_high").show();
    } else {
        $(".nnucfam_msg_high").hide();
    }
    if (phsize > 0 && hpq_mem_len < phsize) {
        $("#add_hpq_mem_btn").show();
    } else if (phsize == "" || hpq_mem_len == phsize) {
        $("#add_hpq_mem_btn").hide();
    }
    if ($("#water").val() == 12) {
        $(".water_o").show();
        $("#water_o").required();
    } else {
        $(".water_o").hide();
        $("#water_o").val("").notRequired();
    }
    if ($("#toil").val() == 7) {
        $(".toil_o").show();
        $("#toil_o").required();
    } else {
        $(".toil_o").hide();
        $("#toil_o").val("").notRequired();
    }
    if ($("#tenur").val() == 10) {
        $(".tenur_o").show();
        $("#tenur_o").required();
    } else {
        $(".tenur_o").hide();
        $("#tenur_o").val("").notRequired();
    }
    if ($("#tenur").val() == 1 || ($("#tenur").val() > 3 && $("#tenur").val() < 8) || $("#tenur").val() == 9) {
        $(".imprnt").show();
        $("#imprnt").required();
    } else {
        $(".imprnt").hide();
        $("#imprnt").val("").notRequired();
    }
    if ($("#welec").val() == 1) {
        $("#SectionElecDetails").show();
        $(".SectionElecDetails").required();
    } else {
        $("#SectionElecDetails").hide();
        $(".SectionElecDetails").val("").notRequired();
    }
    if ($("#elec_source_o").val() == 1) {
        $(".elec_source_o_lb").show();
        $("#elec_source_o_lb").required();
    } else {
        $(".elec_source_o_lb").hide();
        $("#elec_source_o_lb").notRequired();
    }
    if ($("#reloc_ind").val() == 1) {
        $("#SectionRelocDetails").show();
        $(".SectionRelocDetails").required();
    } else {
        $("#SectionRelocDetails").hide();
        $(".SectionRelocDetails").val("").notRequired();
    }
    //#endregion
    //#region wastemanagement
    if ($("#garb_collect").val() == 1) {
        $("#SectionGarbCollect").show();
        $(".SectionGarbCollect").required();
    } else {
        $("#SectionGarbCollect").hide();
        $(".SectionGarbCollect").val("").notRequired();
    }
    if ($("#garb_collector").val() == 4) {
        $(".garb_collector_o").show();
        $("#garb_collector_o").required();
    } else {
        $(".garb_collector_o").hide();
        $("#garb_collector_o").val("").notRequired();
    }
    if ($("#freq_garb_coll").val() == 5) {
        $(".freq_garb_coll_o").show();
        $("#freq_garb_coll_o").required();
    } else {
        $(".freq_garb_coll_o").hide();
        $("#freq_garb_coll_o").val("").notRequired();
    }
    if ($("#garb_mgt_o").val() == 1) {
        $(".garb_mgt_o_lb").show();
        $("#garb_mgt_o_lb").required();
    } else {
        $(".garb_mgt_o_lb").hide();
        $("#garb_mgt_o_lb").val("").notRequired();
    }
    //#endregion

    //#region cropind
    if ($("#cropind").val() == 1) {
        $("#Sectioncropind, #SectionAgriPage").show();
        $(".Sectioncropind, .SectionAgriPage").required();
        if ((Number($("#cropincsh").val()) + Number($("#cropinknd").val())) < 300) {
            $(".crop_income_msg").show();
        } else {
            $(".crop_income_msg").hide();
        }
    } else {
        $("#Sectioncropind, #SectionAgriPage").hide();
        $(".Sectioncropind, .SectionAgriPage").val("").notRequired();
    }
    if ($("#agriequip1").val() == 1) {
        $(".agriequip1_nown").show();
        $("#agriequip1_nown").required();
    } else {
        $(".agriequip1_nown").hide();
        $("#agriequip1_nown").val("").notRequired();
    }
    if ($("#agriequip2").val() == 1) {
        $(".agriequip2_nown").show();
        $("#agriequip2_nown").required();
    } else {
        $(".agriequip2_nown").hide();
        $("#agriequip2_nown").val("").notRequired();
    }
    if ($("#agriequip3").val() == 1) {
        $(".agriequip3_nown").show();
        $("#agriequip3_nown").required();
    } else {
        $(".agriequip3_nown").hide();
        $("#agriequip3_nown").val("").notRequired();
    }
    if ($("#agriequip4").val() == 1) {
        $(".agriequip4_nown").show();
        $("#agriequip4_nown").required();
    } else {
        $(".agriequip4_nown").hide();
        $("#agriequip4_nown").val("").notRequired();
    }
    if ($("#agriequip5").val() == 1) {
        $(".agriequip5_nown").show();
        $("#agriequip5_nown").required();
    } else {
        $(".agriequip5_nown").hide();
        $("#agriequip5_nown").val("").notRequired();
    }
    if ($("#agriequip6").val() == 1) {
        $(".agriequip6_nown").show();
        $("#agriequip6_nown").required();
    } else {
        $(".agriequip6_nown").hide();
        $("#agriequip6_nown").val("").notRequired();
    }
    if ($("#agriequip7").val() == 1) {
        $(".agriequip7_nown").show();
        $("#agriequip7_nown").required();
    } else {
        $(".agriequip7_nown").hide();
        $("#agriequip7_nown").val("").notRequired();
    }
    if ($("#agriequip8").val() == 1) {
        $(".agriequip8_nown").show();
        $("#agriequip8_nown").required();
    } else {
        $(".agriequip8_nown").hide();
        $("#agriequip8_nown").val("").notRequired();
    }
    if ($("#agriequip9").val() == 1) {
        $(".agriequip9_nown").show();
        $("#agriequip9_nown").required();
    } else {
        $(".agriequip9_nown").hide();
        $("#agriequip9_nown").val("").notRequired();
    }
    if ($("#agriequip10").val() == 1) {
        $(".agriequip10_nown").show();
        $("#agriequip10_nown").required();
    } else {
        $(".agriequip10_nown").hide();
        $("#agriequip10_nown").val("").notRequired();
    }
    if ($("#agriequip11").val() == 1) {
        $(".agriequip11_nown").show();
        $("#agriequip11_nown").required();
    } else {
        $(".agriequip11_nown").hide();
        $("#agriequip11_nown").val("").notRequired();
    }
    if ($("#agriequip12").val() == 1) {
        $(".agriequip12_nown").show();
        $("#agriequip12_nown").required();
    } else {
        $(".agriequip12_nown").hide();
        $("#agriequip12_nown").val("").notRequired();
    }
    if ($("#agriequip13").val() == 1) {
        $(".agriequip13_nown").show();
        $("#agriequip13_nown").required();
    } else {
        $(".agriequip13_nown").hide();
        $("#agriequip13_nown").val("").notRequired();
    }
    if ($("#agriequip14").val() == 1) {
        $(".agriequip14_nown").show();
        $("#agriequip14_nown").required();
    } else {
        $(".agriequip14_nown").hide();
        $("#agriequip14_nown").val("").notRequired();
    }
    if ($("#agriequip15").val() == 1) {
        $(".agriequip15_nown").show();
        $("#agriequip15_nown").required();
    } else {
        $(".agriequip15_nown").hide();
        $("#agriequip15_nown").val("").notRequired();
    }
    if ($("#agriequip16").val() == 1) {
        $(".agriequip16_nown").show();
        $("#agriequip16_nown").required();
    } else {
        $(".agriequip16_nown").hide();
        $("#agriequip16_nown").val("").notRequired();
    }
    if ($("#agriequip17").val() == 1) {
        $(".agriequip17_nown").show();
        $("#agriequip17_nown").required();
    } else {
        $(".agriequip17_nown").hide();
        $("#agriequip17_nown").val("").notRequired();
    }
    if ($("#agriequip18").val() == 1) {
        $(".agriequip18_o").show();
        $("#agriequip18_o, #agriequip18_nown").required();
    } else {
        $(".agriequip18_o").hide();
        $("#agriequip18_o, #agriequip18_nown").val("").notRequired();
    }
    if ($("#nalp").val() > 0) {
        $("#SectionAlp").show();
        $("#add_hpq_alp_btn").show();
    } else {
        $("#SectionAlp").hide();
        $("#add_hpq_alp_btn").hide();
    }
    if ($("#ncrop").val() > 0) {
        $("#SectionCrop").show();
        $("#add_hpq_crop_btn").show();
    } else {
        $("#SectionCrop").hide();
        $("#add_hpq_crop_btn").hide();
    }

    //#endregion

    //#region poultry
    if ($("#poultind").val() == 1) {
        $("#Sectionpoultind, #LivestockPage").show();
        $(".Sectionpoultind, .LivestockPage").required();
        if ((Number($("#pouincsh").val()) + Number($("#pouinknd").val())) < 300) {
            $(".poul_income_msg").show();
        } else {
            $(".poul_income_msg").hide();
        }
    } else {
        $("#Sectionpoultind, #LivestockPage").hide();
        $(".Sectionpoultind, .LivestockPage").val("").notRequired();
    }
    if ($("#live_a_hog").val() == 1) {
        $(".live_a_hog_vol").show();
        $("#live_a_hog_vol").required();
    } else {
        $(".live_a_hog_vol").hide();
        $("#live_a_hog_vol").val("").notRequired();
    }
    if ($("#live_a_goat").val() == 1) {
        $(".live_a_goat_vol").show();
        $("#live_a_goat_vol").required();
    } else {
        $(".live_a_goat_vol").hide();
        $("#live_a_goat_vol").val("").notRequired();
    }
    if ($("#live_a_carabao").val() == 1) {
        $(".live_a_carabao_vol").show();
        $("#live_a_carabao_vol").required();
    } else {
        $(".live_a_carabao_vol").hide();
        $("#live_a_carabao_vol").val("").notRequired();
    }
    if ($("#live_a_cow").val() == 1) {
        $(".live_a_cow_vol").show();
        $("#live_a_cow_vol").required();
    } else {
        $(".live_a_cow_vol").hide();
        $("#live_a_cow_vol").val("").notRequired();
    }
    if ($("#live_a_chicken").val() == 1) {
        $(".live_a_chicken_vol").show();
        $("#live_a_chicken_vol").required();
    } else {
        $(".live_a_chicken_vol").hide();
        $("#live_a_chicken_vol").val("").notRequired();
    }
    if ($("#live_a_duck").val() == 1) {
        $(".live_a_duck_vol").show();
        $("#live_a_duck_vol").required();
    } else {
        $(".live_a_duck_vol").hide();
        $("#live_a_duck_vol").val("").notRequired();
    }
    if ($("#live_a_others").val() == 1) {
        $(".live_a_others_o").show();
        $("#live_a_others_o, #live_a_others_vol").required();
    } else {
        $(".live_a_others_o").hide();
        $("#live_a_others_o, #live_a_others_vol").val("").notRequired();
    }
    if ($("#meat_hog").val() == 1) {
        $(".meat_hog_vol").show();
        $("#meat_hog_vol").required();
    } else {
        $(".meat_hog_vol").hide();
        $("#meat_hog_vol").val("").notRequired();
    }
    if ($("#meat_goat").val() == 1) {
        $(".meat_goat_vol").show();
        $("#meat_goat_vol").required();
    } else {
        $(".meat_goat_vol").hide();
        $("#meat_goat_vol").val("").notRequired();
    }
    if ($("#meat_carabao").val() == 1) {
        $(".meat_carabao_vol").show();
        $("#meat_carabao_vol").required();
    } else {
        $(".meat_carabao_vol").hide();
        $("#meat_carabao_vol").val("").notRequired();
    }
    if ($("#meat_cow").val() == 1) {
        $(".meat_cow_vol").show();
        $("#meat_cow_vol").required();
    } else {
        $(".meat_cow_vol").hide();
        $("#meat_cow_vol").val("").notRequired();
    }
    if ($("#meat_chicken").val() == 1) {
        $(".meat_chicken_vol").show();
        $("#meat_chicken_vol").required();
    } else {
        $(".meat_chicken_vol").hide();
        $("#meat_chicken_vol").val("").notRequired();
    }
    if ($("#meat_duck").val() == 1) {
        $(".meat_duck_vol").show();
        $("#meat_duck_vol").required();
    } else {
        $(".meat_duck_vol").hide();
        $("#meat_duck_vol").val("").notRequired();
    }
    if ($("#meat_others").val() == 1) {
        $(".meat_others_o").show();
        $("#meat_others_o, #meat_others_vol").required();
    } else {
        $(".meat_others_o").hide();
        $("#meat_others_o, #meat_others_vol").val("").notRequired();
    }
    if ($("#milk_goat").val() == 1) {
        $(".milk_goat_vol").show();
        $("#milk_goat_vol").required();
    } else {
        $(".milk_goat_vol").hide();
        $("#milk_goat_vol").val("").notRequired();
    }
    if ($("#milk_carabao").val() == 1) {
        $(".milk_carabao_vol").show();
        $("#milk_carabao_vol").required();
    } else {
        $(".milk_carabao_vol").hide();
        $("#milk_carabao_vol").val("").notRequired();
    }
    if ($("#milk_cow").val() == 1) {
        $(".milk_cow_vol").show();
        $("#milk_cow_vol").required();
    } else {
        $(".milk_cow_vol").hide();
        $("#milk_cow_vol").val("").notRequired();
    }
    if ($("#milk_others").val() == 1) {
        $(".milk_others_o").show();
        $("#milk_others_o, #milk_others_o_vol").required();
    } else {
        $(".milk_others_o").hide();
        $("#milk_others_o, #milk_others_o_vol").val("").notRequired();
    }
    if ($("#egg_chicken").val() == 1) {
        $(".egg_chicken_vol").show();
        $("#egg_chicken_vol").required();
    } else {
        $(".egg_chicken_vol").hide();
        $("#egg_chicken_vol").val("").notRequired();
    }
    if ($("#egg_duck").val() == 1) {
        $(".egg_duck_vol").show();
        $("#egg_duck_vol").required();
    } else {
        $(".egg_duck_vol").hide();
        $("#egg_duck_vol").val("").notRequired();
    }
    if ($("#egg_others").val() == 1) {
        $(".egg_others_o").show();
        $("#egg_others_o, #egg_others_vol").required();
    } else {
        $(".egg_others_o").hide();
        $("#egg_others_o, #egg_others_vol").val("").notRequired();
    }
    if ($("#oani_ind").val() == 1) {
        $(".oani_txt, #hpq_oani").show();
        $("#oani_txt, .hpq_oani_inputs").required();
    } else {
        $(".oani_txt, #hpq_oani").hide();
        $("#oani_txt, .hpq_oani_inputs").val("").notRequired();
    }
    if ($("#oani_hog").val() == 1) {
        $(".oani_hog_vol").show();
        $("#oani_hog_vol").required();
    } else {
        $(".oani_hog_vol").hide();
        $("#oani_hog_vol").val("").notRequired();
    }
    if ($("#oani_carabao").val() == 1) {
        $(".oani_carabao_vol").show();
        $("#oani_carabao_vol").required();
    } else {
        $(".oani_carabao_vol").hide();
        $("#oani_carabao_vol").val("").notRequired();
    }
    if ($("#oani_cow").val() == 1) {
        $(".oani_cow_vol").show();
        $("#oani_cow_vol").required();
    } else {
        $(".oani_cow_vol").hide();
        $("#oani_cow_vol").val("").notRequired();
    }
    if ($("#oani_chicken").val() == 1) {
        $(".oani_chicken_vol").show();
        $("#oani_chicken_vol").required();
    } else {
        $(".oani_chicken_vol").hide();
        $("#oani_chicken_vol").val("").notRequired();
    }
    if ($("#oani_duck").val() == 1) {
        $(".oani_duck_vol").show();
        $("#oani_duck_vol").required();
    } else {
        $(".oani_duck_vol").hide();
        $("#oani_duck_vol").val("").notRequired();
    }
    if ($("#oani_others").val() == 1) {
        $(".oani_others_o").show();
        $("#oani_others_o, #oani_others_vol").required();
    } else {
        $(".oani_others_o").hide();
        $("#oani_others_o, #oani_others_vol").val("").notRequired();
    }

    //#endregion

    //#region fishing
    if ($("#fishind").val() == 1) {
        $("#Sectionfishind, #FishPage").show();
        $(".Sectionfishind, .FishPage").required();
        if ((Number($("#fishincsh").val()) + Number($("#fishinknd").val())) < 300) {
            $(".fish_income_msg").show();
        } else {
            $(".fish_income_msg").hide();
        }
    } else {
        $("#Sectionfishind, #FishPage").hide();
        $(".Sectionfishind, .FishPage").val("").notRequired();
    }
    if ($("#catch_fish").val() == 1) {
        $(".catch_fish_loc").show();
        $("#catch_fish_loc").required();
    } else {
        $(".catch_fish_loc").hide();
        $("#catch_fish_loc").val("").notRequired();
    }

    if ($("#boat1").val() == 1) {
        $(".boat1_own").show();
        $("#boat1_own").required();
    } else {
        $(".boat1_own").hide();
        $("#boat1_own").val("").notRequired();
    }
    if ($("#boat2").val() == 1) {
        $(".boat2_own").show();
        $("#boat2_own").required();
    } else {
        $(".boat2_own").hide();
        $("#boat2_own").val("").notRequired();
    }
    if ($("#boat3").val() == 1) {
        $(".boat3_own").show();
        $("#boat3_own").required();
    } else {
        $(".boat3_own").hide();
        $("#boat3_own").val("").notRequired();
    }
    if ($("#boat4").val() == 1) {
        $(".boat4_own").show();
        $("#boat4_own").required();
    } else {
        $(".boat4_own").hide();
        $("#boat4_own").val("").notRequired();
    }
    if ($("#boat5").val() == 1) {
        $(".boat5_own").show();
        $("#boat5_own").required();
    } else {
        $(".boat5_own").hide();
        $("#boat5_own").val("").notRequired();
    }
    if ($("#naquaequip").val() > 0) {
        $("#aquaequip, #add_hpq_aquaequip_btn").show();
    } else {
        $("#aquaequip, #add_hpq_aquaequip_btn").hide();
    }
    if ($("#aquafarm_o").val() == 1) {
        $(".aquafarm_o_txt").show();
        $("#aquafarm_o_txt").required();
    } else {
        $(".aquafarm_o_txt").hide();
        $("#aquafarm_o_txt").val("").notRequired();
    }
    if ($("#naquani").val() > 0) {
        $("#add_hpq_aquani_btn, #SectionAquani").show();
    } else {
        $("#add_hpq_aquani_btn, #SectionAquani").hide();
    }

    //#endregion
    //#region sourceofincome
    if ($("#forind").val() == 1) {
        $("#Sectionforind").show();
        $(".Sectionforind").required();
        if ((Number($("#forincsh").val()) + Number($("#forinknd").val())) < 300) {
            $(".for_income_msg").show();
        } else {
            $(".for_income_msg").hide();
        }
    } else {
        $("#Sectionforind").hide();
        $(".Sectionforind").val("").notRequired();
    }

    if ($("#salind").val() == 1) {
        $("#Sectionsalind").show();
        $(".Sectionsalind").required();
        if ((Number($("#salincsh").val()) + Number($("#salinknd").val())) < 300) {
            $(".fish_income_msg").show();
        } else {
            $(".sal_income_msg").hide();
        }
    } else {
        $("#Sectionsalind").hide();
        $(".Sectionsalind").val("").notRequired();
    }

    if ($("#manind").val() == 1) {
        $("#Sectionmanind").show();
        $(".Sectionmanind").required();
        if ((Number($("#manincsh").val()) + Number($("#maninknd").val())) < 300) {
            $(".fish_income_msg").show();
        } else {
            $(".man_income_msg").hide();
        }
    } else {
        $("#Sectionmanind").hide();
        $(".Sectionmanind").val("").notRequired();
    }

    if ($("#servind").val() == 1) {
        $("#Sectionservind").show();
        $(".Sectionservind").required();
        if ((Number($("#servincsh").val()) + Number($("#servinknd").val())) < 300) {
            $(".serv_income_msg").show();
        } else {
            $(".serv_income_msg").hide();
        }
    } else {
        $("#Sectionservind").hide();
        $(".Sectionservind").val("").notRequired();
    }

    if ($("#trnind").val() == 1) {
        $("#Sectiontrnind").show();
        $(".Sectiontrnind").required();
        if ((Number($("#trnincsh").val()) + Number($("#trninknd").val())) < 300) {
            $(".trn_income_msg").show();
        } else {
            $(".trn_income_msg").hide();
        }
    } else {
        $("#Sectiontrnind").hide();
        $(".Sectiontrnind").val("").notRequired();
    }

    if ($("#minind").val() == 1) {
        $("#Sectionminind").show();
        $(".Sectionminind").required();
        if ($("#mintind").val() == 1 && (Number($("#minincsh").val()) + Number($("#mininknd").val())) < 300) {
            $(".min_income_msg").show();
        } else {
            $(".min_income_msg").hide();
        }
    } else {
        $("#Sectionminind").hide();
        $(".Sectionminind").val("").notRequired();
    }

    if ($("#cnsind").val() == 1) {
        $("#Sectioncnsind").show();
        $(".Sectioncnsind").required();
        if ((Number($("#cnsincsh").val()) + Number($("#cnsinknd").val())) < 300) {
            $(".cns_income_msg").show();
        } else {
            $(".cns_income_msg").hide();
        }
    } else {
        $("#Sectioncnsind").hide();
        $(".Sectioncnsind").val("").notRequired();
    }

    if ($("#eothind").val() == 1) {
        $("#Sectioneothind").show();
        $(".Sectioneothind").required();
        if ((Number($("#eoincsh").val()) + Number($("#eoinknd").val())) < 300) {
            $(".eoth_income_msg").show();
        } else {
            $(".eoth_income_msg").hide();
        }
    } else {
        $("#Sectioneothind").hide();
        $(".Sectioneothind").val("").notRequired();
    }

    //#endregion
    //#region calamity
    if ($("#calam1").val() == 1) {
        $(".calam1_aid").show();
        $("#calam1_aid").required();
    } else {
        $(".calam1_aid, .calam1_hus_aid, .calam1_hus_aid_o").hide();
        $("#calam1_aid, #calam1_hus_aid, #calam1_hus_aid_o").val("").notRequired();
    }
    if ($("#calam1_aid").val() == 1) {
        $(".calam1_hus_aid").show();
        $("#calam1_hus_aid").required();
    } else {
        $(".calam1_hus_aid").hide();
        $("#calam1_hus_aid, #calam1_hus_aid_o").val("").notRequired();
    }
    if ($("#calam1_hus_aid").val() == 4) {
        $(".calam1_hus_aid_o").show();
        $("#calam1_hus_aid_o").required();
    } else {
        $(".calam1_hus_aid_o").hide();
        $("#calam1_hus_aid_o").val("").notRequired();
    }

    if ($("#calam2").val() == 1) {
        $(".calam2_aid").show();
        $("#calam2_aid").required();
    } else {
        $(".calam2_aid, .calam2_hus_aid, .calam2_hus_aid_o").hide();
        $("#calam2_aid, #calam2_hus_aid, #calam2_hus_aid_o").val("").notRequired();
    }
    if ($("#calam2_aid").val() == 1) {
        $(".calam2_hus_aid").show();
        $("#calam2_hus_aid").required();
    } else {
        $(".calam2_hus_aid").hide();
        $("#calam2_hus_aid, #calam2_hus_aid_o").val("").notRequired();
    }
    if ($("#calam2_hus_aid").val() == 4) {
        $(".calam2_hus_aid_o").show();
        $("#calam2_hus_aid_o").required();
    } else {
        $(".calam2_hus_aid_o").hide();
        $("#calam2_hus_aid_o").val("").notRequired();
    }

    if ($("#calam3").val() == 1) {
        $(".calam3_aid").show();
        $("#calam3_aid").required();
    } else {
        $(".calam3_aid, .calam3_hus_aid, .calam3_hus_aid_o").hide();
        $("#calam3_aid, #calam3_hus_aid, #calam3_hus_aid_o").val("").notRequired();
    }
    if ($("#calam3_aid").val() == 1) {
        $(".calam3_hus_aid").show();
        $("#calam3_hus_aid").required();
    } else {
        $(".calam3_hus_aid").hide();
        $("#calam3_hus_aid, #calam3_hus_aid_o").val("").notRequired();
    }
    if ($("#calam3_hus_aid").val() == 4) {
        $(".calam3_hus_aid_o").show();
        $("#calam3_hus_aid_o").required();
    } else {
        $(".calam3_hus_aid_o").hide();
        $("#calam3_hus_aid_o").val("").notRequired();
    }

    if ($("#calam4").val() == 1) {
        $(".calam4_aid").show();
        $("#calam4_aid").required();
    } else {
        $(".calam4_aid, .calam4_hus_aid, .calam4_hus_aid_o").hide();
        $("#calam4_aid, #calam4_hus_aid, #calam4_hus_aid_o").val("").notRequired();
    }
    if ($("#calam4_aid").val() == 1) {
        $(".calam4_hus_aid").show();
        $("#calam4_hus_aid").required();
    } else {
        $(".calam4_hus_aid").hide();
        $("#calam4_hus_aid, #calam4_hus_aid_o").val("").notRequired();
    }
    if ($("#calam4_hus_aid").val() == 4) {
        $(".calam4_hus_aid_o").show();
        $("#calam4_hus_aid_o").required();
    } else {
        $(".calam4_hus_aid_o").hide();
        $("#calam4_hus_aid_o").val("").notRequired();
    }

    if ($("#calam5").val() == 1) {
        $(".calam5_aid").show();
        $("#calam5_aid").required();
    } else {
        $(".calam5_aid, .calam5_hus_aid, .calam5_hus_aid_o").hide();
        $("#calam5_aid, #calam5_hus_aid, #calam5_hus_aid_o").val("").notRequired();
    }
    if ($("#calam5_aid").val() == 1) {
        $(".calam5_hus_aid").show();
        $("#calam5_hus_aid").required();
    } else {
        $(".calam5_hus_aid").hide();
        $("#calam5_hus_aid, #calam5_hus_aid_o").val("").notRequired();
    }
    if ($("#calam5_hus_aid").val() == 4) {
        $(".calam5_hus_aid_o").show();
        $("#calam5_hus_aid_o").required();
    } else {
        $(".calam5_hus_aid_o").hide();
        $("#calam5_hus_aid_o").val("").notRequired();
    }

    if ($("#calam6").val() == 1) {
        $(".calam6_aid").show();
        $("#calam6_aid").required();
    } else {
        $(".calam6_aid, .calam6_hus_aid, .calam6_hus_aid_o").hide();
        $("#calam6_aid, #calam6_hus_aid, #calam6_hus_aid_o").val("").notRequired();
    }
    if ($("#calam6_aid").val() == 1) {
        $(".calam6_hus_aid").show();
        $("#calam6_hus_aid").required();
    } else {
        $(".calam6_hus_aid").hide();
        $("#calam6_hus_aid, #calam6_hus_aid_o").val("").notRequired();
    }
    if ($("#calam6_hus_aid").val() == 4) {
        $(".calam6_hus_aid_o").show();
        $("#calam6_hus_aid_o").required();
    } else {
        $(".calam6_hus_aid_o").hide();
        $("#calam6_hus_aid_o").val("").notRequired();
    }

    if ($("#calam7").val() == 1) {
        $(".calam7_aid").show();
        $("#calam7_aid").required();
    } else {
        $(".calam7_aid, .calam7_hus_aid, .calam7_hus_aid_o").hide();
        $("#calam7_aid, #calam7_hus_aid, #calam7_hus_aid_o").val("").notRequired();
    }
    if ($("#calam7_aid").val() == 1) {
        $(".calam7_hus_aid").show();
        $("#calam7_hus_aid").required();
    } else {
        $(".calam7_hus_aid").hide();
        $("#calam7_hus_aid, #calam7_hus_aid_o").val("").notRequired();
    }
    if ($("#calam7_hus_aid").val() == 4) {
        $(".calam7_hus_aid_o").show();
        $("#calam7_hus_aid_o").required();
    } else {
        $(".calam7_hus_aid_o").hide();
        $("#calam7_hus_aid_o").val("").notRequired();
    }

    if ($("#calam8").val() == 1) {
        $(".calam8_aid").show();
        $("#calam8_aid").required();
    } else {
        $(".calam8_aid, .calam8_hus_aid, .calam8_hus_aid_o").hide();
        $("#calam8_aid, #calam8_hus_aid, #calam8_hus_aid_o").val("").notRequired();
    }
    if ($("#calam8_aid").val() == 1) {
        $(".calam8_hus_aid").show();
        $("#calam8_hus_aid").required();
    } else {
        $(".calam8_hus_aid").hide();
        $("#calam8_hus_aid, #calam8_hus_aid_o").val("").notRequired();
    }
    if ($("#calam8_hus_aid").val() == 4) {
        $(".calam8_hus_aid_o").show();
        $("#calam8_hus_aid_o").required();
    } else {
        $(".calam8_hus_aid_o").hide();
        $("#calam8_hus_aid_o").val("").notRequired();
    }

    if ($("#calam9").val() == 1) {
        $(".calam9_aid").show();
        $("#calam9_aid").required();
    } else {
        $(".calam9_aid, .calam9_hus_aid, .calam9_hus_aid_o").hide();
        $("#calam9_aid, #calam9_hus_aid, #calam9_hus_aid_o").val("").notRequired();
    }
    if ($("#calam9_aid").val() == 1) {
        $(".calam9_hus_aid").show();
        $("#calam9_hus_aid").required();
    } else {
        $(".calam9_hus_aid").hide();
        $("#calam9_hus_aid, #calam9_hus_aid_o").val("").notRequired();
    }
    if ($("#calam9_hus_aid").val() == 4) {
        $(".calam9_hus_aid_o").show();
        $("#calam9_hus_aid_o").required();
    } else {
        $(".calam9_hus_aid_o").hide();
        $("#calam9_hus_aid_o").val("").notRequired();
    }

    if ($("#calam10").val() == 1) {
        $(".calam10_aid").show();
        $("#calam10_aid").required();
    } else {
        $(".calam10_aid, .calam10_hus_aid, .calam10_hus_aid_o").hide();
        $("#calam10_aid, #calam10_hus_aid, #calam10_hus_aid_o").val("").notRequired();
    }
    if ($("#calam10_aid").val() == 1) {
        $(".calam10_hus_aid").show();
        $("#calam10_hus_aid").required();
    } else {
        $(".calam10_hus_aid").hide();
        $("#calam10_hus_aid, #calam10_hus_aid_o").val("").notRequired();
    }
    if ($("#calam10_hus_aid").val() == 4) {
        $(".calam10_hus_aid_o").show();
        $("#calam10_hus_aid_o").required();
    } else {
        $(".calam10_hus_aid_o").hide();
        $("#calam10_hus_aid_o").val("").notRequired();
    }
    if ($("#calam11").val() == 1) {
        $(".calam11_aid").show();
        $("#calam11_aid").required();
    } else {
        $(".calam11_aid, .calam11_hus_aid, .calam11_hus_aid_o").hide();
        $("#calam11_aid, #calam11_hus_aid, #calam11_hus_aid_o").val("").notRequired();
    }
    if ($("#calam11_aid").val() == 1) {
        $(".calam11_hus_aid").show();
        $("#calam11_hus_aid").required();
    } else {
        $(".calam11_hus_aid").hide();
        $("#calam11_hus_aid, #calam11_hus_aid_o").val("").notRequired();
    }
    if ($("#calam11_hus_aid").val() == 4) {
        $(".calam11_hus_aid_o").show();
        $("#calam11_hus_aid_o").required();
    } else {
        $(".calam11_hus_aid_o").hide();
        $("#calam11_hus_aid_o").val("").notRequired();
    }

    //#endregion
    //#region dpkit
    if ($("#disas_prep").val() == 1) {
        $("#hpq_dpkit").show();
        $(".hpq_dpkit").required();
    } else {
        $("#hpq_dpkit").hide();
        $(".hpq_dpkit").val("").notRequired();
    }
    if ($("#dp_kit1").val() == 1) {
        $(".dp_kit1_xpiry").show();
        $("#dp_kit1_xpiry").required();
    } else {
        $(".dp_kit1_xpiry").hide();
        $("#dp_kit1_xpiry").val("").notRequired();
    }
    if ($("#dp_kit2").val() == 1) {
        $(".dp_kit2_xpiry").show();
        $("#dp_kit2_xpiry").required();
    } else {
        $(".dp_kit2_xpiry").hide();
        $("#dp_kit2_xpiry").val("").notRequired();
    }
    if ($("#dp_kit13").val() == 1) {
        $(".dp_kit13_o").show();
        $("#dp_kit13_o, #dp_kit13_xpiry").required();
    } else {
        $(".dp_kit13_o").hide();
        $("#dp_kit1_xpiry, #dp_kit13_xpiry").val("").notRequired();
    }
    //#endregion
    //#region prevmind
    if ($("#prevmind").val() == 1) {
        $(".prevmind").show();
        $("#ndeath").required();
    } else {
        $(".prevmind").hide();
        $("#ndeath").val("").notRequired();
        // delete hpq_death object
    }

    if (ndeath > 0 && hpq_death_len < ndeath) {
        $("#add_hpq_death_btn").show();
    } else if (ndeath == "" || hpq_death_len == ndeath) {
        $("#add_hpq_death_btn").hide();
    }

    if (nalp > 0 && hpq_alp_len < nalp) {
        $("#add_hpq_alp_btn").show();
    } else if (nalp == "" || hpq_alp_len == nalp) {
        $("#add_hpq_alp_btn").hide();
    }
    if (ncrop > 0 && hpq_crop_len < ncrop) {
        $("#add_hpq_crop_btn").show();
    } else if (ncrop == "" || hpq_crop_len == ncrop) {
        $("#add_hpq_crop_btn").hide();
    }
    if (naquaequip > 0 && hpq_aquaequip_len < naquaequip) {
        $("#add_hpq_aquaequip_btn").show();
    } else if (naquaequip == "" || hpq_aquaequip_len == naquaequip) {
        $("#add_hpq_aquaequip_btn").hide();
    }
    if (naquani > 0 && hpq_aquani_len < naquani) {
        $("#add_hpq_naquani_btn").show();
    } else if (naquani == "" || hpq_aquani_len == naquani) {
        $("#add_hpq_aquani_btn").hide();
    }
    //#endregion

    //#endregion

    // Loop through form input elements to check if there are required field without values
    for (let i = 0; i < addNewForm.length; i++) {
        thisElement = addNewForm[i];
        if (thisElement.value == "" && thisElement.getAttribute('required') == 'required') {
            requiredFieldsCount++;
            req(thisElement.id);
            if (!$("#" + thisElement.id).hasClass("border-danger")) {
                $("#" + thisElement.id).toggleClass("border-danger");
            }
        } else if (thisElement.value != "" && thisElement.getAttribute('required') == 'required') {
            if ($("#" + thisElement.id).hasClass("border-danger")) {
                $("#" + thisElement.id).toggleClass("border-danger");
                $("#" + thisElement.id).toggleClass("border-success");
            } else if (!$("#" + thisElement.id).hasClass("border-success")) {
                $("#" + thisElement.id).toggleClass("border-success");
            }
        } else if (thisElement.getAttribute('disabled')) {
            if ($("#" + thisElement.id).hasClass("border-danger")) {
                $("#" + thisElement.id).toggleClass("border-danger");
            }
        }
    }
    //#region another bunch of ifs
    if (nnucfam < 1) {
        req('nnucfam');
        requiredFieldsCount++;
        if (!$("#nnucfam").hasClass("border-danger")) {
            $("#nnucfam").toggleClass("border-danger");
        }
    } else {
        if (nnucfam != fams) {
            req('nnucfam');
            requiredFieldsCount++;
            if (!$("#nnucfam").hasClass("border-danger")) {
                $("#nnucfam").toggleClass("border-danger");
            }
        } else {
            if ($("#nnucfam").hasClass("border-danger")) {
                $("#nnucfam").toggleClass("border-danger");
            }
        }
    }
    if (numofw != ofws || $("#numofw").val() == "") {
        req('numofw');
        requiredFieldsCount++;
        if (!$("#numofw").hasClass("border-danger")) {
            $("#numofw").toggleClass("border-danger");
        }
    } else {
        if ($("#numofw").hasClass("border-danger")) {
            $("#numofw").toggleClass("border-danger");
        }
    }
    if (numpreg != pregnants || $("#numpreg").val() == "") {
        req('numpreg');
        requiredFieldsCount++;
        if (!$("#numpreg").hasClass("border-danger")) {
            $("#numpreg").toggleClass("border-danger");
        }
    } else {
        if ($("#numpreg").hasClass("border-danger")) {
            $("#numpreg").toggleClass("border-danger");
        }
    }
    if (numunipar != unipars || $("#numunipar").val() == "") {
        req('numunipar');
        requiredFieldsCount++;
        if (!$("#numunipar").hasClass("border-danger")) {
            $("#numunipar").toggleClass("border-danger");
        }
    } else {
        if ($("#numunipar").hasClass("border-danger")) {
            $("#numunipar").toggleClass("border-danger");
        }
    }
    if (numpwd != pwds || $("#numpwd").val() == "") {
        req('numpwd');
        requiredFieldsCount++;
        if (!$("#numpwd").hasClass("border-danger")) {
            $("#numpwd").toggleClass("border-danger");
        }
    } else {
        if ($("#numpwd").hasClass("border-danger")) {
            $("#numpwd").toggleClass("border-danger");
        }
    }

    if ($("#phsize").val() == "" || $("#phsize").val() == 0) {
        if (!$("#phsize").hasClass("border-danger")) {
            $("#phsize").toggleClass("border-danger");
        }
        $("#addmem_btn").hide();
    } else if (phsize > hpq_mem_len) {
        if (!$("#phsize").hasClass("border-danger")) {
            $("#phsize").toggleClass("border-danger");
        }
        $("#addmem_btn").show();
    } else {
        if ($("#phsize").hasClass("border-danger")) {
            $("#phsize").toggleClass("border-danger");
        }
        $("#addmem_btn").hide();
    }

    if (ndeath != hpq_death_len) {
        req('mdead');
        requiredFieldsCount++;
        if (!$("#mdead").hasClass("border-danger")) {
            $("#mdead").toggleClass("border-danger");
        }
        $("#adddeceased_btn").show();
    } else {
        if ($("#mdead").hasClass("border-danger")) {
            $("#mdead").toggleClass("border-danger");
        }
        $("#adddeceased_btn").hide();
    }
    if (!updateFields()) {
        req('hcn');
        requiredFieldsCount++;
        if (!$("#hcn").hasClass("border-danger")) {
            $("#hcn").toggleClass("border-danger");
        }
    } else {
        if ($("#hcn").hasClass("border-danger")) {
            $("#hcn").toggleClass("border-danger");
        }
    }
    //#endregion
    if (requiredFieldsCount > 0) {

        $("#hpq_stat").val("0");

        $(".required-field").show();
        $("#requiredField").text(requiredFieldsCount);

    } else if (requiredFieldsCount < 1) {

        if (accessLevel != 1) {
            $("#hpq_stat").val("1");
        }

        $(".required-field").hide();

    }

}
function computeIncome() { // ok

    var cropincsh = 0;
    var cropinknd = 0;
    var pouincsh = 0;
    var pouinknd = 0;
    var fishincsh = 0;
    var fishinknd = 0;
    var forincsh = 0;
    var forinknd = 0;
    var salincsh = 0;
    var salinknd = 0;
    var manincsh = 0;
    var maninknd = 0;
    var servincsh = 0;
    var servinknd = 0;
    var trnincsh = 0;
    var trninknd = 0;
    var minincsh = 0;
    var mininknd = 0;
    var cnsincsh = 0;
    var cnsinknd = 0;
    var eoincsh = 0;
    var eoinknd = 0;
    var etotcsh = 0;
    var etotknd = 0;

    cropincsh = +$("#cropincsh").val();
    cropinknd = +$("#cropinknd").val();
    pouincsh = +$("#pouincsh").val();
    pouinknd = +$("#pouinknd").val();
    fishincsh = +$("#fishincsh").val();
    fishinknd = +$("#fishinknd").val();
    forincsh = +$("#forincsh").val();
    forinknd = +$("#forinknd").val();
    salincsh = +$("#salincsh").val();
    salinknd = +$("#salinknd").val();
    manincsh = +$("#manincsh").val();
    maninknd = +$("#maninknd").val();
    servincsh = +$("#servincsh").val();
    servinknd = +$("#servinknd").val();
    trnincsh = +$("#trnincsh").val();
    trninknd = +$("#trninknd").val();
    minincsh = +$("#minincsh").val();
    mininknd = +$("#mininknd").val();
    cnsincsh = +$("#cnsincsh").val();
    cnsinknd = +$("#cnsinknd").val();
    eoincsh = +$("#eoincsh").val();
    eoinknd = +$("#eoinknd").val();

    var etotcsh = 0;
    var etotknd = 0;

    etotcsh = cropincsh + pouincsh + fishincsh + forincsh + salincsh + manincsh + servincsh + trnincsh + minincsh + cnsincsh + eoincsh;
    etotknd = cropinknd + pouinknd + fishinknd + forinknd + salinknd + maninknd + servinknd + trninknd + mininknd + cnsinknd + eoinknd;

    $("#etotcsh").val(etotcsh);
    $("#etotknd").val(etotknd);

    var wagcsh = wagcshm_tot;
    var wagknd = wagkndm_tot;

    $("#wagcsh").val(wagcshm_tot);
    $("#wagknd").val(wagkndm_tot);

    var agscsh = 0;
    var agsknd = 0;
    var ofwcsh = 0;
    var ofwknd = 0;
    var supfcsh = 0;
    var supfknd = 0;
    var suprcsh = 0;
    var suprknd = 0;
    var rentvcsh = 0;
    var rentvknd = 0;
    var intrcsh = 0;
    var intrknd = 0;
    var pencsh = 0;
    var penknd = 0;
    var divcsh = 0;
    var divknd = 0;
    var othscsh = 0;
    var othsknd = 0;

    agscsh = +$("#agscsh").val();
    agsknd = +$("#agsknd").val();
    ofwcsh = +$("#ofwcsh").val();
    ofwknd = +$("#ofwknd").val();
    supfcsh = +$("#supfcsh").val();
    supfknd = +$("#supfknd").val();
    suprcsh = +$("#suprcsh").val();
    suprknd = +$("#suprknd").val();
    rentvcsh = +$("#rentvcsh").val();
    rentvknd = +$("#rentvknd").val();
    intrcsh = +$("#intrcsh").val();
    intrknd = +$("#intrknd").val();
    pencsh = +$("#pencsh").val();
    penknd = +$("#penknd").val();
    divcsh = +$("#divcsh").val();
    divknd = +$("#divknd").val();
    othscsh = +$("#othscsh").val();
    othsknd = +$("#othsknd").val();

    var othstotcsh = 0;
    var othstotknd = 0;

    othstotcsh = agscsh + ofwcsh + supfcsh + suprcsh + rentvcsh + intrcsh + pencsh + divcsh + othscsh;
    othstotknd = agsknd + ofwknd + supfknd + suprknd + rentvknd + intrknd + penknd + divknd + othsknd;

    $("#othstotcsh").val(othstotcsh);
    $("#othstotknd").val(othstotknd);

    var imprnt = 0;
    var imprnttot = 0;
    var totincsh = 0;
    var totinknd = 0;
    var totin = 0;

    imprnt = +$("#imprnt").val()
    imprnttot = (imprnt * 12);
    $("#imprnttot").val(imprnttot);

    totincsh = etotcsh + wagcsh + othstotcsh;
    $("#totincsh").val(totincsh)

    totinknd = etotknd + wagknd + othstotknd;
    $("#totinknd").val(totinknd);

    totin = imprnttot + totincsh + totinknd;
    $("#totin").val(totin);

}
function checkforduplicate(brgy, hcn, fn) {

    for (let key in instancelist["data"]) {

        var ibrgy = instancelist["data"][key]["formDetail"]["brgy"];
        var ihcn = instancelist["data"][key]["formDetail"]["hcn"];
        var ifn = instancelist["data"][key]["instanceID"];

        if (ibrgy == brgy && ihcn == hcn && ifn == fn) {
            return true;
        } else if (ibrgy == brgy && ihcn == hcn && ifn != fn) {
            return false;
        }

    }
    return true;
}
function updateFields() {

    var regn = $("#regn").val();
    var prov = $("#prov").val();
    var mun = $("#mun").val();
    var brgy = $("#brgy").val();
    var hcn = $("#hcn").val();
    file_name = $("#filename").val();

    $("#hpq_id").val(regn + prov + mun + brgy + hcn);

    if (accessLevel != "1") {
        $("#encoder").val(userID);
    }

    if (checkforduplicate(brgy, hcn, file_name)) {
        if ($("#hcn").hasClass("is-invalid")) {
            $("#hcn").toggleClass("is-invalid");
        }
        return true;
    } else {
        Swal.fire({
            title: 'Oops!!!',
            text: 'Household Control Number already in use.',
            icon: 'error',
            timer: 5000
        }).then(() => {
            $("#hcn").val(null);
        })
        return false;
    }

}
function req(id) {
    $("#reqFields").append('<li><a class="dropdown-item my-0 py-0 reqFields" onclick="getme(this.rel);" rel="' + id + '" href="#' + id + '">' + id + '</a></li>');
}
function getme(me) {
    const pages_nav_li = document.getElementById("pages_nav").children;
    const tab_pane_id = $(`#${me}`).closest(".tab-pane").attr("id")
    var el;

    for (let i = 0; i < pages_nav_li.length; i++) {
        if (pages_nav_li[i].children[0].rel == tab_pane_id) {
            el = pages_nav_li[i].children[0];
            el.click();
        }
    }
}
//#endregion
//#region managing HPQs
function add_hpq() {


    $("#header").html(topbar_hpq);
    $("#page").html(main_hpq);
    $("#sidebar").html(sidebar_hpq);
    $("#sidebar").attr("hidden", false);

    $('#toggle-sidebar-btn').on('click', '.toggle-sidebar-btn', function () {
        $('body').toggleClass('toggle-sidebar')
    })

    pageNavLi = document.getElementById("pages_nav").children;

    $("#next").click(function () {
        for (let i = 0; i < pageNavLi.length; i++) {
            if (pageNavLi[i].children[0].classList.contains("active")) {
                pageNavLi[i].nextElementSibling.children[0].click();
                if (i == (pageNavLi.length - 2)) {
                    $("#next").attr("disabled", "disabled");
                }
                $("#prev").removeAttr("disabled");
                break;
            }
        }
    })
    $("#prev").click(function () {
        for (let i = 0; i < pageNavLi.length; i++) {
            if (pageNavLi[i].children[0].classList.contains("active")) {
                pageNavLi[i].previousElementSibling.children[0].click();
                if (i == 1) {
                    $("#prev").attr("disabled", "disabled");
                }
                $("#next").removeAttr("disabled");
                break;
            }
        }
    })
    $("#pages_nav li").on("click", function () {
        let li_index = $(this).index();
        if (li_index == 0) {
            $("#prev").attr("disabled", "disabled");
        } else {
            $("#prev").removeAttr("disabled");
        }
        if (li_index == 8) {
            $("#next").attr("disabled", "disabled");
        } else {
            $("#next").removeAttr("disabled");
        }
    })
    $("#fname").on("change", function () {
        var st = $(this).val();
        $(".dfname").html(st);
    });

    $("#sidebar").removeAttr("hidden");

    hpq_main = {};
    hpq_mem = [];
    hpq_alp = [];
    hpq_crop = [];
    hpq_aquaequip = [];
    hpq_aquani = [];
    hpq_death = [];
    hpq_prog = [];

    setTimeout(() => {

        document.getElementById('int_date').valueAsDate = dateToday;
        $('#start_time').val(dateToday.getHours() + ":" + dateToday.getMinutes())

        $("#built_when").val(dateToday.getFullYear());
        $("#filename").val(-dateToday.getTime());
        $("#encoder").val(userID);
        $("#brgy").val(userDetails["brgy"]);

        if (accessLevel == "1") $(".forAdmin").show();
        else $(".forAdmin").hide();

        $(":input").on("change", function () {
            validate_main_form();
        });
        $(".modal").on("hidden.bs.modal", function () {
            validate_main_form();
        })
        /*autoSaveInterval = setInterval(() => {
            autoSave();
        }, 60000);*/

        validate_main_form();
        geolocationCoordinates();

    }, 250);
}
function saveData(mode) { // ok

    var brgy = $("#brgy").val();
    var hcn = $("#hcn").val();
    exitMode = mode;

    if (requiredFieldsCount < 5) {
        if ($('#end_time').val() == "") {
            $('#end_time').val(dateToday.getHours() + ":" + dateToday.getMinutes())
            document.getElementById('end_date').valueAsDate = dateToday;
        }
    }

    hpq_main = $("#addnew_form").serializeJSON();

    hpq_main["hpq_mem"] = JSON.parse(Android.getTemp("hpq_mem"));
    hpq_main["hpq_death"] = JSON.parse(Android.getTemp("hpq_death"));
    hpq_main["hpq_alp"] = JSON.parse(Android.getTemp("hpq_alp"));
    hpq_main["hpq_crop"] = JSON.parse(Android.getTemp("hpq_crop"));
    hpq_main["hpq_aquaequip"] = JSON.parse(Android.getTemp("hpq_aquaequip"));
    hpq_main["hpq_aquani"] = JSON.parse(Android.getTemp("hpq_aquani"));
    hpq_main["hpq_prog"] = JSON.parse(Android.getTemp("hpq_prog"));

    if (hpqEditMode == 1) {
        if (brgy != "" && hcn != "") {
            Android.saveHPQ(JSON.stringify(hpq_main))
        } else {
            Swal.fire({
                title: 'Required fields empty!',
                html: 'Please select <b>Barangay</b> and <b>HCN</b> before pre-saving.',
                icon: 'error',
                timer: 3000
            })
        }

    }

}
function saveResponse(code) {

    if (exitMode == "save" || exitMode == "exit") {
        switch (code) {
            case 0:
                Swal.fire({
                    title: 'Saved!',
                    html: `File ${hpq_main["filename"]} successfuly saved.`,
                    icon: 'success',
                    timer: 3000,
                    showConfirmButton: false
                }).then(function () {
                    hpq_main = null;
                    hpq_mem = null;
                    hpq_death = null;
                    hpq_prog = null;
                    if (exitMode == "exit") {
                        home();
                    }
                })
                break;
            case 1:
                Swal.fire({
                    title: 'Oops!!! Something went wrong :(',
                    html: 'File could not be saved!<br><br>Please check your storage permission.',
                    icon: 'error',
                })
                break;
            case 2:
                Swal.fire({
                    title: 'Auto save failed!',
                    html: 'Please check your storage permission.',
                    icon: 'error',
                })
                break;
        }
    }
}
function edit_hpq(file_name) {

    hpq_data = JSON.parse(Android.openHPQ(file_name));

    if (hpq_data == "file_not_found") {
        Swal.fire({
            title: 'Oops!!! Something went wrong :(',
            html: 'File not found!',
            icon: 'error'
        })
    } else {

        $("#header").html(topbar_hpq);
        $("#page").html(main_hpq);
        $("#sidebar").html(sidebar_hpq);

        $('#toggle-sidebar-btn').on('click', '.toggle-sidebar-btn', function () {
            $('body').toggleClass('toggle-sidebar')
        })

        pageNavLi = document.getElementById("pages_nav").children;

        $("#next").click(function () {
            for (let i = 0; i < pageNavLi.length; i++) {
                if (pageNavLi[i].children[0].classList.contains("active")) {
                    pageNavLi[i].nextElementSibling.children[0].click();
                    if (i == (pageNavLi.length - 2)) {
                        $("#next").attr("disabled", "disabled");
                    }
                    $("#prev").removeAttr("disabled");
                    break;
                }
            }
        })
        $("#prev").click(function () {
            for (let i = 0; i < pageNavLi.length; i++) {
                if (pageNavLi[i].children[0].classList.contains("active")) {
                    pageNavLi[i].previousElementSibling.children[0].click();
                    if (i == 1) {
                        $("#prev").attr("disabled", "disabled");
                    }
                    $("#next").removeAttr("disabled");
                    break;
                }
            }
        })
        $("#pages_nav li").on("click", function () {
            let li_index = $(this).index();
            if (li_index == 0) {
                $("#prev").attr("disabled", "disabled");
            } else {
                $("#prev").removeAttr("disabled");
            }
            if (li_index == 8) {
                $("#next").attr("disabled", "disabled");
            } else {
                $("#next").removeAttr("disabled");
            }
        })
        $("#fname").on("change", function () {
            var st = $(this).val();
            $(".dfname").html(st);
        });

        $("#sidebar").removeAttr("hidden");

        hpqEditMode = 1;

        try {
            Android.setTemp("hpq_mem", JSON.stringify(hpq_data["hpq_mem"]));
            Android.setTemp("hpq_death", JSON.stringify(hpq_data["hpq_death"]));
            Android.setTemp("hpq_alp", JSON.stringify(hpq_data["hpq_alp"]));
            Android.setTemp("hpq_crop", JSON.stringify(hpq_data["hpq_crop"]));
            Android.setTemp("hpq_aquaequip", JSON.stringify(hpq_data["hpq_aquaequip"]));
            Android.setTemp("hpq_aquani", JSON.stringify(hpq_data["hpq_aquani"]));
            Android.setTemp("hpq_prog", JSON.stringify(hpq_data["hpq_prog"]));

            hpq_mem = JSON.parse(Android.getTemp("hpq_mem"));
            hpq_death = JSON.parse(Android.getTemp("hpq_death"));
            hpq_alp = JSON.parse(Android.getTemp("hpq_alp"));
            hpq_crop = JSON.parse(Android.getTemp("hpq_crop"));
            hpq_aquaequip = JSON.parse(Android.getTemp("hpq_aquaequip"));
            hpq_aquani = JSON.parse(Android.getTemp("hpq_aquani"));
            hpq_prog = JSON.parse(Android.getTemp("hpq_prog"));
        } catch (error) {
            Swal.fire({
                title: 'Something went wrong!',
                html: 'There was a problem while reading the form.',
                icon: 'info',
                timer: 3000
            })
            hpq_alp = [];
            hpq_crop = [];
            hpq_aquaequip = [];
            hpq_aquani = [];

            Android.setTemp("hpq_alp", JSON.stringify(hpq_alp));
            Android.setTemp("hpq_crop", JSON.stringify(hpq_crop));
            Android.setTemp("hpq_aquaequip", JSON.stringify(hpq_aquaequip));
            Android.setTemp("hpq_aquani", JSON.stringify(hpq_aquani));

            hpq_mem = JSON.parse(Android.getTemp("hpq_mem"));
            hpq_death = JSON.parse(Android.getTemp("hpq_death"));
            hpq_alp = JSON.parse(Android.getTemp("hpq_alp"));
            hpq_crop = JSON.parse(Android.getTemp("hpq_crop"));
            hpq_aquaequip = JSON.parse(Android.getTemp("hpq_aquaequip"));
            hpq_aquani = JSON.parse(Android.getTemp("hpq_aquani"));
            hpq_prog = JSON.parse(Android.getTemp("hpq_prog"));
        }

        setTimeout(() => {

            for (let prop in hpq_data) {
                $("#" + prop).val(hpq_data[prop]);
            }

            if (accessLevel == "1") {
                $(".forAdmin").show();
            } else {
                $(".forAdmin").hide();
            }

            get_members(hpq_mem);
            get_deceased(hpq_death);
            get_prog(hpq_prog);
            get_alp(hpq_alp);
            get_crop(hpq_crop);
            get_aquaequip(hpq_aquaequip);
            get_aquani(hpq_aquani);

            setTimeout(() => {
                $(":input").on("change", function () {
                    validate_main_form();
                }).on("focusout", function () {
                    validate_main_form();
                });
                /* autoSaveInterval = setInterval(() => {
                    autoSave();
                }, 60000); */
                validate_main_form();
                hpq_data = null;
            }, 500);
        }, 500);
    }

}
function view_hpq(file_name) {

    hpq_data = JSON.parse(Android.openHPQ(file_name));

    if (Android.openHPQ(file_name) == "file_not_found") {
        Swal.fire({
            title: 'Oops!!! Something went wrong :(',
            html: 'File not found.',
            icon: 'error',
            timer: 3000
        })
    } else {

        $("#header").html(topbar_hpq);
        $("#page").html(main_hpq);
        $("#sidebar").html(sidebar_hpq);

        $('#toggle-sidebar-btn').on('click', '.toggle-sidebar-btn', function () {
            $('body').toggleClass('toggle-sidebar')
        })

        pageNavLi = document.getElementById("pages_nav").children;

        $("#next").click(function () {
            for (let i = 0; i < pageNavLi.length; i++) {
                if (pageNavLi[i].children[0].classList.contains("active")) {
                    pageNavLi[i].nextElementSibling.children[0].click();
                    if (i == (pageNavLi.length - 2)) {
                        $("#next").attr("disabled", "disabled");
                    }
                    $("#prev").removeAttr("disabled");
                    break;
                }
            }
        })
        $("#prev").click(function () {
            for (let i = 0; i < pageNavLi.length; i++) {
                if (pageNavLi[i].children[0].classList.contains("active")) {
                    pageNavLi[i].previousElementSibling.children[0].click();
                    if (i == 1) {
                        $("#prev").attr("disabled", "disabled");
                    }
                    $("#next").removeAttr("disabled");
                    break;
                }
            }
        })
        $("#pages_nav li").on("click", function () {
            let li_index = $(this).index();
            if (li_index == 0) {
                $("#prev").attr("disabled", "disabled");
            } else {
                $("#prev").removeAttr("disabled");
            }
            if (li_index == 8) {
                $("#next").attr("disabled", "disabled");
            } else {
                $("#next").removeAttr("disabled");
            }
        })
        $("#fname").on("change", function () {
            var st = $(this).val();
            $(".dfname").html(st);
        });

        $("#sidebar").removeAttr("hidden");

        hpqEditMode = 2;

        if (hpqEditMode == 2) {
            $(".add_edit_hpq").hide();
        } else {
            $(".add_edit_hpq").show();
        }

        hpq_mem = hpq_data["hpq_mem"];
        hpq_death = hpq_data["hpq_death"];
        hpq_prog = hpq_data["hpq_prog"];
        hpq_prog = hpq_data["hpq_alp"];
        hpq_prog = hpq_data["hpq_crop"];
        hpq_prog = hpq_data["hpq_aquaequip"];
        hpq_prog = hpq_data["hpq_aquani"];

        Android.setTemp("hpq_mem", JSON.stringify(hpq_data["hpq_mem"]));
        Android.setTemp("hpq_death", JSON.stringify(hpq_data["hpq_death"]));
        Android.setTemp("hpq_alp", JSON.stringify(hpq_data["hpq_alp"]));
        Android.setTemp("hpq_crop", JSON.stringify(hpq_data["hpq_crop"]));
        Android.setTemp("hpq_aquaequip", JSON.stringify(hpq_data["hpq_aquaequip"]));
        Android.setTemp("hpq_aquani", JSON.stringify(hpq_data["hpq_aquani"]));
        Android.setTemp("hpq_prog", JSON.stringify(hpq_data["hpq_prog"]));

        setTimeout(() => {

            for (let prop in hpq_data) {
                $("#addnew_form").find("#" + prop).val(hpq_data[prop]);
            }

            if (accessLevel == "1") {
                $(".forAdmin").show();
            } else {
                $(".forAdmin").hide();
            }

            get_members(hpq_mem);
            get_deceased(hpq_death);
            get_prog(hpq_prog);
            get_alp(hpq_alp);
            get_crop(hpq_crop);
            get_aquaequip(hpq_aquaequip);
            get_aquani(hpq_aquani);

            setTimeout(() => {
                hpq_data = null;
            }, 500);
        }, 500);
    }

}
function delete_hpq(file_name) {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
    }).then((result) => {
        if (result.isConfirmed) {
            if (Android.deleteHPQ(file_name)) {
                Swal.fire({
                    title: 'Deleted',
                    html: 'File has been deleted.',
                    icon: 'success',
                })
                recoverInstancelist();
            } else {
                Swal.fire({
                    title: 'Oops!!! Something went wrong :(',
                    html: 'File could not be deleted.<br><br>Please check your storage permission.',
                    icon: 'error',
                })
            }
        }
    })

}
function upload_hpq() {

    var len = 0;
    try {
        instancesToUpload = $("#instancelist_form").serializeJSON();
        len = instancesToUpload["instances"].length;
        if (len > 0) {
            $("#upload-modal").modal("show");
            $("#upload-modal").find("#upload-title").html("<b>Connecting</b>");
            $("#upload-modal").find("#upload-message").html("Establishing connection to server...");
            Android.openConnection();
        }
    } catch (error) {
        Swal.fire({
            title: 'No file selected',
            html: 'Please select atleast one <b>Validated</b> HPQ to upload.',
            icon: 'info',
        })
    }

}
function serverResponse(response) {

    let resData = JSON.parse(response);

    switch (resData["data"]) {
        case "server_online":
            $("#upload-modal").find("#upload-title").html("<b>Uploading</b>");
            $("#upload-modal").find("#upload-message").html("Uploading HPQ(s)...");
            Android.uploadHPQ(JSON.stringify(instancesToUpload));
            break;
        default:
            Swal.fire({
                title: 'Server unreachable.',
                html: 'Please check your internet connection.',
                icon: 'error',
            })
            $("#upload-modal").modal("hide");
            document.getElementById("instancelist_form").reset();
            break;
    }

    //"﻿{"error":false,"data":"server_online"}"
    //﻿{"error":false,"data":"server_online"}"

}
function uploadResponse(response) {

    let resData = JSON.parse(response);

    if (resData["data"] == "all_files_uploaded") {
        setTimeout(() => {
            document.getElementById("instancelist_form").reset();
        }, 2000);
    } else {
        if (resData["error"]) {
            $("#upload-modal").find("#upload-message").append(resData["data"]);
        } else {
            $("#upload-modal").find("#upload-message").append(`<br>Uploaded: ${resData["data"]}`);
        }
    }

}
//#endregion manage HPQs
//#region add household members section
function validated_add_mem_form() { // ok

    let age;

    let today = new Date();
    let bday = new Date($("#birthdate").val());
    age = today.getFullYear() - bday.getFullYear();
    let m = today.getMonth() - bday.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < bday.getDate())) {
        age--;
    }

    $("#age_yr").val(age);

    if ($("#nucfam").val() != 1) {
        $("#reln option[value='1']").prop("hidden", true);
        $("#reln option[value='2']").prop("hidden", true);
    } else {
        if (hhHeadDisabled) {
            $("#reln option[value='1']").prop("hidden", true);
        } else {
            $("#reln option[value='1']").prop("hidden", false);
        }
        if (hhSpouseDisabled) {
            $("#reln option[value='2']").prop("hidden", true);
        } else {
            $("#reln option[value='2']").prop("hidden", false);
        }
    }
    if (xfHeadDisabled) {
        $("#reln2 option[value='1']").prop("hidden", true);
    } else {
        $("#reln2 option[value='1']").prop("hidden", false);
    }
    if (xfSpouseDisabled) {
        $("#reln2 option[value='2']").prop("hidden", true);
    } else {
        $("#reln2 option[value='2']").prop("hidden", false);
    }

    if ($("#nucfam").val() > 1) {
        $(".reln2").show();
        $("#reln2").required();
    } else {
        $(".reln2").hide();
        $("#reln2").notRequired();
    }

    if ($("#reln").val() == 13) {
        $(".reln_o").show();
        $("#reln_o").required();
    } else {
        $(".reln_o").hide();
        $("#reln_o").notRequired();
    }

    if ($("#reln2").val() == 13) {
        $(".reln2_o").show();
        $("#reln2_o").required();
    } else {
        $(".reln2_o").hide();
        $("#reln2_o").notRequired();
    }

    if ($("#age_yr").val() == "") {
        $("#SectionEduc").hide();
        $("#SectionLiteracy").hide();
        $("#SectionComPart").hide();
        $("#SectionEmpl").hide();
        $("#SectionHealth").hide();
        $("#SectionUnipar").hide();
        $("#SectionPWD").hide();
        $("#SectionSenior").hide();
        $("#SectionFamPlan").hide();
        $("#SectionPreg").hide();
        $("#SectionSDG").hide();
        $("#SectionCrimeMem").hide();
    } else {
        $("#SectionEmpl").show();
        $("#SectionHealth").show();
        $("#SectionCrimeMem").show();

    }

    //#region age 3+
    if (age >= 3) {
        $(".mlenres, #SectionEduc").show();
        $("#mlenres, .SectionEduc").required();
    } else {
        $(".mlenres, #SectionEduc").hide();
        $("#mlenres, .SectionEduc").notRequired();
    }
    if ($("#mlenres").val() == 2) {
        $(".mlenres_o").show();
    } else {
        $(".mlenres_o").hide();
    }
    if ($("#educind").val() == 1) {
        $("#SectionSchooling").show();
        $(".SectionSchooling").required()
        $("#SectionNotSchooling").hide();
        $(".SectionNotSchooling").val("").notRequired()
    } else if ($("#educind").val() == 2) {
        $("#SectionSchooling").hide();
        $(".SectionSchooling").val("").notRequired()

        if (age >= 3 && age <= 24) {
            $("#SectionNotSchooling").show();
            $(".SectionNotSchooling").required()
        } else {
            $("#SectionNotSchooling").hide();
            $(".SectionNotSchooling").val("").notRequired()
        }
    } else {

        $("#SectionSchooling").hide();
        $(".SectionSchooling").val("").notRequired()
        $("#SectionNotSchooling").hide();
        $(".SectionNotSchooling").val("").notRequired()
    }

    if ($("#ynotsch").val() == 15) {
        $(".ynotsch_o").show();
        $("#ynotsch_o").required()
    } else {
        $(".ynotsch_o").hide();
        $("#ynotsch_o").val("").notRequired()
    }

    if ($("#educal").val() >= 21 && $("#educal").val() <= 22) {
        $(".track_sh").show();
        $("#track_sh").required()
        $(".psced7_txt").hide();
        $("#psced7_txt").val("").notRequired();
    } else if (($("#educal").val() >= 23 && $("#educal").val() <= 41) || ($("#educal").val() >= 210 && $("#educal").val() <= 400)) {
        $(".track_sh").hide();
        $("#track_sh").val("").notRequired()
        $(".psced7_txt").show();
        $("#psced7_txt").required()
    } else {
        $(".track_sh").hide();
        $("#track_sh").val("").notRequired()
        $(".psced7_txt").hide();
        $("#psced7_txt").val("").notRequired();
    }
    //#endregion

    //#region age 5+
    if (age >= 5) {
        $("#SectionLiteracy, #SectionWag").show();
        $(".SectionLiteracy, .SectionWag").required();
    } else {
        $("#SectionLiteracy, #SectionWag").hide();
        $(".SectionLiteracy, .SectionWag").notRequired();
    }
    if ($("#literind").val() == 1) {
        $(".lang").show();
        $("#lang").required();
    } else {
        $(".lang").hide();
        $("#lang").notRequired();
    }
    if ($("#lang").val() == 8) {
        $(".lang_o").show();
        $("#lang_o").required();
    } else {
        $(".lang_o").hide();
        $("#lang_o").notRequired();
    }
    //#endregion

    //#region age 10+
    if (age >= 10) {
        $(".civstat").show();
        $("#civstat").required();

        if ((numofw > 0 && ofws < numofw) || (numofw > 0 && memIsOFW)) {
            $(".ofwind").show();
            $("#ofwind").required();

            if ($("#ofwind").val() == 1) {
                $(".mlenres, .mlenres_o").hide();
                $("#mlenres, #mlenres_o").val("").notRequired();
                $("#SectionOFW").show();
                $(".SectionOFW").required();
            } else {
                $(".mlenres").show();
                $("#mlenres").required();
                $("#SectionOFW").hide();
                $(".SectionOFW").val("").notRequired();
            }
        } else {
            $(".ofwind").hide();
            $("#ofwind").val("").notRequired();
        }
        if ((numunipar > 0 && unipars < numunipar) || (numunipar > 0 && memIsUnipar)) {
            $("#SectionUnipar").show();
            $("#uniparind").required();
        } else {
            $("#SectionUnipar").hide();
            $(".SectionUnipar").val("").notRequired();
        }
    } else {
        $(".civstat").hide();
        $("#civstat").notRequired();
        $(".ofwind").hide();
        $("#ofwind").val("").notRequired();
        $("#SectionUnipar").hide();
        $(".SectionUnipar").val("").notRequired();
        $("#SectionOFW").hide();
        $(".SectionOFW").val("").notRequired();
    }


    if ($("#uniparind").val() == 1) {
        $("#SubUnipar").show();
        $("#unipar_reason").required();
    } else {
        $("#SubUnipar").hide();
        $(".SubUnipar").val("").notRequired();
    }
    if ($("#unipar_reason").val() == 10) {
        $(".unipar_reason_o").show();
        $("#unipar_reason_o").required();
    } else {
        $(".unipar_reason_o").hide();
        $("#unipar_reason_o").val("").notRequired();
    }
    //#endregion

    //#region 15+
    if (age >= 15) {
        $("#SectionComPart, .genderind").show();
        $(".SectionComPart, #genderind").required();

        if ($("#sex").val() == 2) {
            $("#SectionSDG").show();
            $("#preg5years").required();
        } else {
            $("#SectionSDG").hide();
            $("#preg5years, .SubSDG").val("").notRequired();
        }
        if ((numpreg > 0 && $("#sex").val() == 2) || (numpreg > 0 && memIsPregnant)) {
            $("#SectionPreg").show();
            $("#pregind").required();
        } else {
            $("#SectionPreg").hide();
            $("#pregind").val("").notRequired();
        }
    } else {
        $("#SectionComPart, .genderind").hide();
        $(".SectionComPart, #genderind").notRequired();
        $("#SectionSDG").hide();
        $("#preg5years, .SubSDG").val("").notRequired();
        $("#SectionPreg").hide();
        $("#pregind").val("").notRequired();
    }
    if ($("#regvotind").val() == 1) {
        $(".voted_last_election").show()
        $("#voted_last_election").required();
    } else {
        $(".voted_last_election").hide()
        $("#voted_last_election").notRequired();
    }
    if ($("#genderind").val() == 1) {
        $(".gender").show()
        $("#gender").required();
    } else {
        $(".gender").hide()
        $("#gender").notRequired();
    }

    //#endregion

    if (age < 18 && ($("#reln").val() == 1 || $("#reln2").val() == 1)) {
        $(".reln_msg").show();
    } else {
        $(".reln_msg").hide();
    }

    if ($("#civstat").val() == 2 || $("#civstat").val() == 5) {
        if (age <= 18) {
            $(".civstat_msg").show();
        } else {
            $(".civstat_msg").hide();
        }
        $("#SectionFamPlan").show();
        $(".fam_plan").required();
    } else {
        $("#SectionFamPlan").hide();
        $(".civstat_msg").hide();
    }

    if ($("#relgn").val() == 10) {
        $(".relgn_o").show();
        $("#relgn_o").required();
    } else {
        $(".relgn_o").hide();
        $("#relgn_o").val("").notRequired();
    }

    if ($("#ethgrp").val() == 181) {
        $(".ethgrp_o").show();
        $("#ethgrp_o").required();
    } else {
        $(".ethgrp_o").show();
        $("#ethgrp_o").val("").notRequired();
    }
    //#region OFWs
    if ($("#ofw_reason_leave").val() == 7) {
        $(".ofw_reason_leave_o").show();
        $("#ofw_reason_leave_o").required()
    } else {
        $(".ofw_reason_leave_o").hide();
        $("#ofw_reason_leave_o").val("").notRequired()
    }
    if ($("#ofw_reason_return").val() == 4) {
        $(".ofw_reason_return_o").show();
        $("#ofw_reason_return_o").required()
    } else {
        $(".ofw_reason_return_o").hide();
        $("#ofw_reason_return_o").val("").notRequired()
    }
    if ($("#ofw_plans_return").val() == 5) {
        $(".ofw_plans_return_o").show();
        $("#ofw_plans_return_o").required()
    } else {
        $(".ofw_plans_return_o").hide();
        $("#ofw_plans_return_o").val("").notRequired()
    }
    if ($("#ofw_remit_spent").val() == 4) {
        $(".ofw_remit_spent_o").show();
        $("#ofw_remit_spent_o").required();
    } else {
        $(".ofw_remit_spent_o").hide();
        $("#ofw_remit_spent_o").val("").notRequired()
    }
    if ($("#ofw_services").val() == 5) {
        $(".ofw_services_o").show();
        $("#ofw_services_o").required();
    } else {
        $(".ofw_services_o").hide();
        $("#ofw_services_o").val("").notRequired();
    }
    //#endregion

    if ($("#jobind").val() == 1) {
        $("#SectionEmpl1").show();
        $(".SectionEmpl1").required();

        if ($("#ofwind").val() == 1) {
            $(".non_ofw").hide();
            $("#work_ddhrs, #work_wkhrs, #fadd_work_hrs, #fxtra_wrk, #workcl").val("").notRequired();

        } else if ($("#ofwind").val() == 2) {
            $(".non_ofw").show();
            $("#work_ddhrs, #work_wkhrs").required();

            if (age >= 15) {
                $(".fadd_work_hrs, .fxtra_wrk, .workcl").show();
                $("#fadd_work_hrs, #fxtra_wrk, #workcl").required();

            } else {
                $(".fadd_work_hrs, .fxtra_wrk, #workcl").hide();
                $("#fadd_work_hrs, #fxtra_wrk, #workcl").val("").notRequired();

            }
        }

        $("#SectionEmpl2").hide();
        $(".SectionEmpl2").val("").notRequired();

    } else if ($("#jobind").val() == 2) {
        $("#SectionEmpl1").hide();
        $(".SectionEmpl1").val("").notRequired()
        $("#work_ddhrs, #work_wkhrs, #fadd_work_hrs, #fxtra_wrk, #workcl").val("").notRequired();

        if (age >= 15) {
            $("#SectionEmpl2").show();

            $(".fjob, .joppind, .wtwind").show();
            $("#fjob, #joppind, #wtwind").required()
        } else {
            $("#SectionEmpl2").hide();
            $(".SectionEmpl2").val("").notRequired()
        }

    } else if ($("#jobind").val() == "") {

        $(".non_ofw").hide();
        $("#work_ddhrs, #work_wkhrs, #fadd_work_hrs, #fxtra_wrk, #workcl").val("").notRequired();
        $(".fadd_work_hrs, .fxtra_wrk, #workcl").hide();
        $("#fadd_work_hrs, #fxtra_wrk, #workcl").val("").notRequired();
        $("#SectionEmpl1").hide();
        $(".SectionEmpl1").val("").notRequired()
        $("#work_ddhrs, #work_wkhrs, #fadd_work_hrs, #fxtra_wrk, #workcl").val("").notRequired();
        $("#SectionEmpl2").hide();
        $(".SectionEmpl2").val("").notRequired()

    }

    if ($("#fjob").val() == 1) {
        $(".first_fjob, .jsearch_meth, .wks_fjob").show();
        $("#first_fjob, #jsearch_meth, #wks_fjob").required()
        $(".ynotlookjob").hide();
        $("#ynotlookjob").val("").notRequired()

    } else if ($("#fjob").val() == 2) {
        $(".first_fjob, .jsearch_meth, .wks_fjob").hide();
        $("#first_fjob, #jsearch_meth, #wks_fjob").val("").notRequired()
        $(".ynotlookjob, lastlookjob").show();
        $("#ynotlookjob, #lastlookjob").required()

    } else {
        $(".ynotlookjob").hide();
        $("#ynotlookjob").val("").notRequired()
        $(".first_fjob, .jsearch_meth, .wks_fjob").hide();
        $("#first_fjob, #jsearch_meth, #wks_fjob").val("").notRequired()

    }

    if ($("#jsearch_meth").val() == 6) {
        $(".jsearch_meth_o").show();
        $("#jsearch_meth_o").required()
    } else {
        $(".jsearch_meth_o").hide();
        $("#jsearch_meth_o").val("").notRequired()
    }

    if ($("#ynotlookjob").val() == 9) {
        $(".ynotlookjob_o").show();
        $("#ynotlookjob_o").required()
    } else {
        $(".ynotlookjob_o").hide();
        $("#ynotlookjob_o").val("").notRequired()
    }

    if (age >= 18) {
        $(".Section18").show();
    } else {
        $(".Section18").hide();
    }

    if ($("#mphihealind").val() == 1) {
        $(".mphiheal_type").show();
        $("#mphiheal_type").required();
        $(".mphiheal_depend").hide();
        $("#mphiheal_depend").val("").notRequired();
    } else {
        $(".mphiheal_type").hide();
        $("#mphiheal_type").val("").notRequired();
        $(".mphiheal_depend").show();
        $("#mphiheal_depend").required();
    }

    if ($("#healthcare_prov").val() == 9) {
        $(".healthcare_prov_o").show();
        $("#healthcare_prov_o").required();
    } else {
        $(".healthcare_prov_o").hide();
        $("#healthcare_prov_o").val("").notRequired();
    }

    if ((numpwd > 0 && pwds < numpwd && $("#age_yr").val() != "") || (numpwd > 0 && memIsPWD)) {
        $("#SectionPWD").show();
        $("#pwdind").required();
    } else {
        $("#SectionPWD").hide();
        $("#pwdind, .SubPWD").val("").notRequired();
    }

    if ($("#pwdind").val() == 1) {
        $("#SubPWD").show();
        $("#pwd_type, #pwd_cause, #pwd_id").required();
    } else {
        $("#SubPWD").hide();
        $(".SubPWD").val("").notRequired();
    }

    if ($("#pwd_type").val() == 17) {
        $(".pwdtype_o").show();
        $("#pwdtype_o").required();
    } else {
        $(".pwdtype_o").hide();
        $("#pwdtype_o").val("").notRequired();
    }

    if ($("#pwd_cause").val() == 5) {
        $(".pwd_cause_o").show();
        $("#pwd_cause_o").required();
    } else {
        $(".pwd_cause_o").hide();
        $("#pwd_cause_o").val("").notRequired();
    }

    if (age >= 60) {
        $("#SectionSenior").show();
        $("#sc_id").required();
    } else {
        $("#SectionSenior").hide();
        $("#sc_id").val("").notRequired();
    }

    if ($("#fam_plan").val() == 1) {
        $("#SubFamPlan").show();
        $("#fp_meth").required();
    } else {
        $("#SubFamPlan").hide();
        $(".SubFamPlan").val("").notRequired();
    }

    if ($("#fp_meth").val() == 18) {
        $(".fp_meth_o").show();
        $("#fp_meth_o").required();
    } else {
        $(".fp_meth_o").hide();
        $("#fp_meth_o").val("").notRequired();
    }

    if ($("#fp_prov").val() == 6) {
        $(".fp_prov_o").show();
        $("#fp_prov_o").required();
    } else {
        $(".fp_prov_o").hide();
        $("#fp_prov_o").val("").notRequired();
    }

    if ($("#preg5years").val() == 1) {
        $("#SubSDG").show();
        $(".preg5years").required();
    } else {
        $("#SubSDG").hide();
        $(".SubSDG").val("").notRequired();
    }

    if ($("#preg_deliver").val() == 6) {
        $(".preg_deliver_o").show();
        $("#preg_deliver_o").required();
    } else {
        $(".preg_deliver_o").hide();
        $("#preg_deliver_o").val("").notRequired();
    }

    if ($("#preg_deliver_assist").val() == 7) {
        $(".preg_deliver_assist_o").show();
        $("#preg_deliver_assist_o").required();
    } else {
        $(".preg_deliver_assist_o").hide();
        $("#preg_deliver_assist_o").val("").notRequired();
    }

    if ($("#breastfeedind").val() == 1) {
        $("#SubBreastFeed").show();
        $(".SubBreastFeed").required();
    } else {
        $("#SubBreastFeed").hide();
        $(".SubBreastFeed").val("").notRequired();
    }

    if ($("#mcrimeind").val() == 1) {
        $("#SubCrimeMem").show();
        $("#mcrimeind").required();
    } else {
        $("#SubCrimeMem").hide();
        $(".SubCrimeMem_inputs").val("").notRequired();
    }

    if ($("#mcrime").val() == 11) {
        $(".crime_o").show();
        $("#crime_o").required();
    } else {
        $(".crime_o").hide();
        $("#crime_o").val("").notRequired();
    }

    if ($("#ethgrp").val() == 999) {
        $(".ethgrp_o").show();
        $("#ethgrp_o").required();
    } else {
        $(".ethgrp_o").hide();
        $("#ethgrp_o").val("").notRequired();
    }

}
function update_reln() {

    var head_count = 0, spouse_count = 0;
    hhHeadDisabled = false;
    hhSpouseDisabled = false;

    $.each(hpq_mem, function (i, item) {

        if (item.nucfam == 1 && item.reln == 1) {
            head_count++;
        }
        if (item.nucfam == 1 && item.reln == 2) {
            spouse_count++;
        }

    });

    if (head_count > 0) { hhHeadDisabled = true };
    if (spouse_count > 0) { hhSpouseDisabled = true };

}
function update_reln2() {

    var xf_head_count = 0, xf_spouse_count = 0;
    xfHeadDisabled = false;
    xfSpouseDisabled = false;

    $.each(hpq_mem, function (i, item) {

        if (item.nucfam == $("#nucfam").val() && item.reln2 == 1) {
            xf_head_count++;
        }
        if (item.nucfam == $("#nucfam").val() && item.reln2 == 2) {
            xf_spouse_count++;
        }

    });

    if (xf_head_count > 0) { xfHeadDisabled = true };
    if (xf_spouse_count > 0) { xfSpouseDisabled = true };

}
function add_mem() {

    memEditMode = false;

    $("#hpq_mem_modal").modal("show");

}
function edit_mem(mem_to_edit) {

    memEditMode = true;
    memEdited = mem_to_edit;
    let hpq_mem_TEMP = JSON.parse(Android.getTemp("hpq_mem"));

    $("#hpq_mem_modal").modal("show");

    $.each(hpq_mem_TEMP, function (i, item) {

        if (item.memindex == mem_to_edit) {
            for (let prop in item) {

                if (item.reln == 1) { hhHeadDisabled = false };
                if (item.reln == 2) { hhSpouseDisabled = false };
                if (item.ofwind == 1) { memIsOFW = true } else { memIsOFW = false };
                if (item.uniparind == 1) { memIsUnipar = true } else { memIsUnipar = false };
                if (item.pwdind == 1) { memIsPWD = true } else { memIsPWD = false };
                if (item.sdg_pregind == 1) { memIsPregnant = true } else { memIsPregnant = false };

                $("#hpq_mem_form").find("#" + prop).val(item[prop]);

            }
        }
    });
}
function delete_mem(mem_index_to_delete) {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {

            let hpq_mem_TEMP = JSON.parse(Android.getTemp("hpq_mem"));

            let remmem = hpq_mem_TEMP.filter(items => items.memindex != mem_index_to_delete);

            Android.setTemp("hpq_mem", JSON.stringify(remmem));
            hpq_mem = remmem;
            get_members(hpq_mem);
            Swal.fire(
                'Deleted!',
                'Item removed.',
                'success'
            )
        }
    })

}
function get_members(memData) {

    let table_contents = [], nav_contents = [];
    $.each(memData, function (i, item) {
        table_contents.push('<tr>');
        table_contents.push('    <td>' + item.lname + ', ' + item.fname + ' ' + item.mname + '</td>');
        table_contents.push('    <td>' + _reln[item.reln] + '</td>');
        table_contents.push('    <td align="center">');
        if (hpqEditMode == 2) {
            table_contents.push('    <a onclick="edit_mem(' + item.memindex + ')" class="btn btn-success mb-1 text-light">');
            table_contents.push('        <i class="bi bi-eye"></i>');
            table_contents.push('    </a>');
        } else {
            table_contents.push('    <a onclick="edit_mem(' + item.memindex + ')" class="btn btn-success mb-1 text-light">');
            table_contents.push('        <i class="bi bi-pencil"></i>');
            table_contents.push('    </a>');
            table_contents.push('    <a onclick="delete_mem(' + item.memindex + ')" class="btn btn-danger mb-1 text-light">');
            table_contents.push('        <i class="bi bi-trash"></i>');
            table_contents.push('    </a>');
        }
        table_contents.push('    </td>');
        table_contents.push('</tr>');
        nav_contents.push(' <li class="dropdown">')
        nav_contents.push('     <a class="nav-link collapsed" href="#" data-bs-toggle="dropdown"><i class="bi arrow-right"></i><span>' + item.lname + ', ' + item.fname + '<br><sup>' + _reln[item.reln] + '</sup></span></a>')
        nav_contents.push('     <ul class="dropdown-menu">')
        if (hpqEditMode == 2) {
            nav_contents.push('         <a onclick="edit_mem(' + item.memindex + ')" class="dropdown-item d-flex btn btn-sm btn-outline-light">');
            nav_contents.push('             <span class="bi bi-eye text-secondary me-2"></span>View');
            nav_contents.push('         </a>');
        } else {
            nav_contents.push('         <a onclick="edit_mem(' + item.memindex + ')" class="dropdown-item d-flex btn btn-sm btn-outline-light">');
            nav_contents.push('             <span class="bi bi-eye text-secondary me-2"></span>View');
            nav_contents.push('         </a>');
            nav_contents.push('         <a onclick="edit_mem(' + item.memindex + ')" class="dropdown-item d-flex btn btn-sm btn-outline-light">');
            nav_contents.push('             <span class="bi bi-pencil-square text-secondary me-2"></span>Edit');
            nav_contents.push('         </a>');
            nav_contents.push('         <a onclick="delete_mem(' + item.memindex + ')" class="dropdown-item d-flex btn btn-sm btn-outline-light">');
            nav_contents.push('             <span class="bi bi-trash text-secondary me-2"></span>Delete');
            nav_contents.push('         </a>');
        }
        nav_contents.push('     </ul>')
        nav_contents.push(' </li>')
    });

    $("#hpq_mem_table").html(table_contents.join("").toString());
    $("#members_nav").html(nav_contents.join("").toString());
}
$("#hpq_mem_modal").on("show.bs.modal", function (e) {

    $("#birthdate")
        .attr("min", "1900-01-01")
        .attr("max", new Date().toISOString().split("T")[0]);

    $("#hpq_mem_form :input").on("change", function () {
        validated_add_mem_form();
        update_reln2();
        $("#hpq_mem_modal").modal("handleUpdate");
    });

    nucfamchoices = null;

    for (let i = 1; i <= nnucfam; i++) {
        nucfamchoices += "<option value='" + i + "'>" + i + "</option>"
    }
    $("#nucfam").html(nucfamchoices);

    update_reln();

    if (hpqEditMode == 2) {
        $(".add_edit_hpq").hide();
        $(".view_hpq").show();
    } else {
        $(".add_edit_hpq").show();
        $(".view_hpq").hide();
    }
});
$("#hpq_mem_form").on("submit", function (e) {
    e.preventDefault();

    let memData = $("#hpq_mem_form").serializeJSON();
    let hpq_mem_TEMP = JSON.parse(Android.getTemp("hpq_mem"));
    let memArr = [];
    let mem_last_index;

    if (hpq_mem_TEMP.length < 1) {
        hpq_mem_TEMP = [];
        mem_last_index = 0
    } else {
        $.each(hpq_mem_TEMP, function (i, item) {
            memArr.push(item.memindex);
        });
        mem_last_index = Math.max.apply(Math, memArr) + 1;
    }

    if (memEditMode) {
        hpq_mem_TEMP.splice(memEdited, 1, memData);
    } else {
        memData["memindex"] = mem_last_index;
        hpq_mem_TEMP.push(memData);
    }

    Android.setTemp("hpq_mem", JSON.stringify(hpq_mem_TEMP));
    hpq_mem = hpq_mem_TEMP;

    $("#hpq_mem_modal").modal("hide");
    document.getElementById("hpq_mem_form").reset();

    get_members(hpq_mem);

});
$("#hpq_mem_modal").on("shown.bs.modal", function (e) {

    validated_add_mem_form();

    $("#hpq_mem_form #fname").on("change", function () {
        var st = $(this).val();
        $(".dfname").html(st);
    });

    $("#psoc4_txt").autocomplete({
        source: psoc4,

        select: function (event, ui) {
            $("#psoc4").val(ui.item.idx);
        }
    });
    $("#psic4_txt").autocomplete({
        source: psic4,

        select: function (event, ui) {
            $("#psic4").val(ui.item.idx);
        }
    });
    $("#psced7_txt").autocomplete({
        source: psced7,

        select: function (event, ui) {
            $("#psced7").val(ui.item.idx);
        }
    });

});
$("#hpq_mem_modal").on("hidden.bs.modal", function (e) {
    $("#hpq_mem_form :input").off();
    $("#psoc4_txt, #psic4_txt, #psced7_txt").autocomplete("destroy");
    document.getElementById("hpq_mem_form").reset();
});
//#endregion end of add household members section
//#region add deceased section
function add_deceased() {

    deceasedEditMode = false;

    $("#hpq_death_modal").modal("show");

}
function edit_deceased(deceasedToEdit) {

    deceasedEditMode = true;
    deceasedEdited = deceasedToEdit;
    let hpq_death_TEMP = JSON.parse(Android.getTemp("hpq_death"));

    $("#hpq_death_modal").modal("show");

    console.log(JSON.stringify(hpq_death_TEMP, null, 4))

    $.each(hpq_death_TEMP, function (i, deceasedRow) {

        if (deceasedRow.deadindex == deceasedToEdit) {
            for (let key in deceasedRow) {

                $("#hpq_death_form").find("#" + key).val(deceasedRow[key]);
                console.log(key)
            }
        }
    });
}
function delete_deceased(dead_index_to_delete) {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            let hpq_death_TEMP = JSON.parse(Android.getTemp("hpq_death"));

            var remdeceased = hpq_death_TEMP.filter(items => items.deadindex != dead_index_to_delete);

            Android.setTemp("hpq_death", JSON.stringify(remdeceased));

            hpq_death = remdeceased;

            get_deceased(hpq_death);
            Swal.fire(
                'Deleted!',
                'Item removed.',
                'success'
            )
        }
    })
}
function get_deceased(deceasedData) {

    let c = [];
    $.each(deceasedData, function (i, item) {
        c.push('<tr>');
        c.push('    <td>' + item.dsname + ', ' + item.dfname + ' ' + item.dmname + '</td>');
        c.push('    <td>' + _sex[item.dsex] + '</td>');
        c.push('    <td>' + item.dage + '</td>');
        c.push('    <td align="center">');
        if (hpqEditMode == 2) {
            c.push('    <a onclick="edit_deceased(' + item.deadindex + ')" class="btn btn-success mb-1 text-light">');
            c.push('        <i class="bi bi-eye"></i>');
            c.push('    </a>');
        } else {
            c.push('    <a onclick="edit_deceased(' + item.deadindex + ')" class="btn btn-success mb-1 text-light">');
            c.push('        <i class="bi bi-pencil"></i>');
            c.push('    </a>');
            c.push('    <a onclick="delete_deceased(' + item.deadindex + ')" class="btn btn-danger mb-1 text-light">');
            c.push('        <i class="bi bi-trash"></i>');
            c.push('    </a>');
        }
        c.push('    </td>');
        c.push('</tr>');
    });

    $("#hpq_death_table").html(c.join("").toString());
}
$("#hpq_death_modal").on("show.bs.modal", function (e) {

    if (hpqEditMode == 2) {
        $(".add_edit_hpq").hide();
        $(".view_hpq").show();
    } else {
        $(".add_edit_hpq").show();
        $(".view_hpq").hide();
    }

});
$("#hpq_death_form").on("submit", function (e) {
    e.preventDefault();

    let deceasedData = $("#hpq_death_form").serializeJSON();
    let hpq_death_TEMP = JSON.parse(Android.getTemp("hpq_death"));
    let deadArr = [];
    let dead_last_index

    if (hpq_death_TEMP.length < 1) {
        hpq_death_TEMP = [];
        dead_last_index = 0
    } else {
        $.each(hpq_death_TEMP, function (i, item) {
            deadArr.push(item.deadindex);
        });
        dead_last_index = Math.max.apply(Math, deadArr) + 1;
    }

    if (deceasedEditMode) {
        hpq_death_TEMP.splice(deceasedEdited, 1, deceasedData);
    } else {
        deceasedData["deadindex"] = dead_last_index;
        hpq_death_TEMP.push(deceasedData);
    }

    Android.setTemp("hpq_death", JSON.stringify(hpq_death_TEMP));

    $("#hpq_death_modal").modal("hide");

    hpq_death = hpq_death_TEMP;

    get_deceased(hpq_death);

});
$("#hpq_death_modal").on("shown.bs.modal", function (e) {

    $("#mdeady").on("change", function () {
        if ($("#mdeady").val() == 13) {
            $(".mdeady_o").show();
            $("#mdeady_o").required();
        } else {
            $(".mdeady_o").hide();
            $("#mdeady_o").val("").notRequired();
        }
    });

});
$("#hpq_death_modal").on("hidden.bs.modal", function (e) {
    $("#mdeady").off();
    document.getElementById("hpq_death_form").reset();
});
//#endregion end of add deceased section
//#region add program section
function add_prog() {

    progEditMode = false;

    $("#hpq_prog_modal").modal("show");

}
$("#hpq_prog_modal").on("show.bs.modal", function (e) {

    get_refs(JSON.parse(Android.getTemp("hpq_mem")));
    $(".hpq_ref_msg_null").hide();

    if (hpqEditMode == 2) {
        $(".add_edit_hpq").hide();
        $(".view_hpq").show();
    } else {
        $(".add_edit_hpq").show();
        $(".view_hpq").hide();
    }
});
$("#hpq_prog_modal").on("shown.bs.modal", function (e) {

    $("#progtype").on("change", function () {
        if ($("#progtype").val() == 19) {
            $(".prog_type_o").show();
            $("#prog_type_o").required();
        } else {
            $(".prog_type_o").hide();
            $("#prog_type_o").val("").notRequired();
        }
    })

});
$("#hpq_prog_form").on("submit", function (e) {
    e.preventDefault();

    let progData = $("#hpq_prog_form").serializeJSON();

    try {
        var ref_len = progData["hpq_mem_ref"].length
        $(".hpq_ref_msg_null").hide();

        let hpq_prog_TEMP = JSON.parse(Android.getTemp("hpq_prog"));
        let progArr = [];

        $.each(hpq_prog, function (i, item) {

            progArr.push(item.progindex);

        });

        let prog_last_index = Math.max.apply(Math, progArr) + 1;

        if (hpq_prog_TEMP == null) {
            hpq_prog_TEMP = [];
            hpq_prog_TEMP_len = 0;
        } else {
            hpq_prog_TEMP_len = hpq_prog_TEMP.length;
        }

        try {
            hpq_prog_TEMP_len = hpq_prog_TEMP.length;
        } catch (error) {
            hpq_prog_TEMP_len = 0;
        }

        if (progEditMode) {
            hpq_prog_TEMP.splice(progEdited, 1, progData);
        } else {
            if (hpq_prog_TEMP_len < 1) {
                progData["progindex"] = 0;
            } else {
                progData["progindex"] = prog_last_index;
            }
            hpq_prog_TEMP.push(progData);
        }

        Android.setTemp("hpq_prog", JSON.stringify(hpq_prog_TEMP));

        $("#prog_type").off("change");

        $("#hpq_prog_modal").modal("hide");

        hpq_prog = hpq_prog_TEMP;

        get_prog(hpq_prog);

    } catch (error) {

        $(".hpq_ref_msg_null").show();

    }

});
$("#hpq_prog_modal").on("hidden.bs.modal", function (e) {
    document.getElementById("hpq_prog_form").reset();
});
function edit_prog(prog_index_to_edit) {

    progEditMode = true;
    progEdited = prog_index_to_edit;
    let hpq_prog_TEMP = JSON.parse(Android.getTemp("hpq_prog"));

    $("#hpq_prog_modal").modal("show");

    $.each(hpq_prog_TEMP, function (i, progRow) {

        if (progRow.progindex == prog_index_to_edit) {
            for (let key in progRow) {

                $("#hpq_prog_form").find("#" + key).val(progRow[key]);

            }
        }
    });
    $.each(hpq_prog_TEMP, function (i, progRow) {

        if (progRow.progindex == prog_index_to_edit) {
            for (let key in progRow["hpq_mem_ref"]) {

                $("#hpq_prog_form").find("#" + key).attr("checked", "checked");

            }
        }
    });
}
function delete_prog(prog_index_to_delete) {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            let hpq_prog_TEMP = JSON.parse(Android.getTemp("hpq_prog"));

            var remprog = hpq_prog_TEMP.filter(items => items.progindex != prog_index_to_delete);

            Android.setTemp("hpq_prog", JSON.stringify(remprog));

            get_prog(remprog);
            Swal.fire(
                'Deleted!',
                'Item removed.',
                'success'
            )
        }
    })
}
function get_prog(progData) {

    let c = [];
    $.each(progData, function (i, item) {
        c.push('<tr>');
        c.push('    <td>' + _prog[item.progtype] + '</td>');
        c.push('    <td>' + item.prog_name + '</td>');
        c.push('    <td align="center">');
        if (hpqEditMode == 2) {
            c.push('    <a onclick="edit_prog(' + item.progindex + ')" class="btn btn-success mb-1 text-light">');
            c.push('        <i class="bi bi-eye"></i>');
            c.push('    </a>');
        } else {
            c.push('    <a onclick="edit_prog(' + item.progindex + ')" class="btn btn-success mb-1 text-light">');
            c.push('        <i class="bi bi-pencil"></i>');
            c.push('    </a>');
            c.push('    <a onclick="delete_prog(' + item.progindex + ')" class="btn btn-danger mb-1 text-light">');
            c.push('        <i class="bi bi-trash"></i>');
            c.push('    </a>');
        }
        c.push('    </td>');
        c.push('</tr>');
    });

    $("#hpq_prog_table").html(c.join("").toString());
}
function get_refs(memData) {

    let c = [];
    $.each(memData, function (i, item) {
        c.push('<div class="form-check">');
        c.push('<input class="form-check-input" name="hpq_mem_ref[]' + item.memindex + '" type="checkbox" value="' + item.memindex + '" id="' + item.memindex + '">');
        c.push('<label class="form-check-label" for="' + item.memindex + '">');
        c.push(item.lname + ', ' + item.fname + ' ' + item.mname);
        c.push('</label>');
        c.push('</div>');
    });

    $("#hpq_ref").html(c.join(""));
}
//#endregion end of add program section
//#region add alp section
function add_alp() {

    alpEditMode = false;

    $("#hpq_alp_modal").modal("show");

}
function edit_alp(alpToEdit) {

    alpEditMode = true;
    alpEdited = alpToEdit;
    let hpq_alp_TEMP = JSON.parse(Android.getTemp("hpq_alp"));

    $("#hpq_alp_modal").modal("show");

    console.log(JSON.stringify(hpq_alp_TEMP, null, 4))

    $.each(hpq_alp_TEMP, function (i, alpRow) {

        if (alpRow.alpindex == alpToEdit) {
            for (let key in alpRow) {

                $("#hpq_alp_form").find("#" + key).val(alpRow[key]);
                console.log(key)
            }
        }
    });
}
function delete_alp(alp_index_to_delete) {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            let hpq_alp_TEMP = JSON.parse(Android.getTemp("hpq_alp"));

            var remalp = hpq_alp_TEMP.filter(items => items.alpindex != alp_index_to_delete);

            Android.setTemp("hpq_alp", JSON.stringify(remalp));

            hpq_alp = remalp;

            get_alp(hpq_alp);
            Swal.fire(
                'Deleted!',
                'Item removed.',
                'success'
            )
        }
    })
}
function get_alp(alpData) {

    let c = [];
    $.each(alpData, function (i, item) {
        c.push('<tr>');
        c.push('    <td>' + item.alpindex + '</td>');
        c.push('    <td>' + _alp_tenur[item.alp_tenur] + '</td>');
        c.push('    <td>' + item.alp_area + '</td>');
        c.push('    <td align="center">');
        if (hpqEditMode == 2) {
            c.push('    <a onclick="edit_alp(' + item.alpindex + ')" class="btn btn-success mb-1 text-light">');
            c.push('        <i class="bi bi-eye"></i>');
            c.push('    </a>');
        } else {
            c.push('    <a onclick="edit_alp(' + item.alpindex + ')" class="btn btn-success mb-1 text-light">');
            c.push('        <i class="bi bi-pencil"></i>');
            c.push('    </a>');
            c.push('    <a onclick="delete_alp(' + item.alpindex + ')" class="btn btn-danger mb-1 text-light">');
            c.push('        <i class="bi bi-trash"></i>');
            c.push('    </a>');
        }
        c.push('    </td>');
        c.push('</tr>');
    });

    $("#hpq_alp_table").html(c.join("").toString());
}
$("#hpq_alp_modal").on("show.bs.modal", function (e) {

    if (hpqEditMode == 2) {
        $(".add_edit_hpq").hide();
        $(".view_hpq").show();
    } else {
        $(".add_edit_hpq").show();
        $(".view_hpq").hide();
    }

});
$("#hpq_alp_form").on("submit", function (e) {
    e.preventDefault();

    let alpData = $("#hpq_alp_form").serializeJSON();
    let hpq_alp_TEMP = JSON.parse(Android.getTemp("hpq_alp"));
    let alpArr = [];
    let alp_last_index

    if (hpq_alp_TEMP.length < 1) {
        hpq_alp_TEMP = [];
        alp_last_index = 0
    } else {
        $.each(hpq_alp_TEMP, function (i, item) {
            alpArr.push(item.alpindex);
        });
        alp_last_index = Math.max.apply(Math, alpArr) + 1;
    }

    if (alpEditMode) {
        hpq_alp_TEMP.splice(alpEdited, 1, alpData);
    } else {
        alpData["alpindex"] = alp_last_index;
        hpq_alp_TEMP.push(alpData);
    }

    Android.setTemp("hpq_alp", JSON.stringify(hpq_alp_TEMP));

    $("#hpq_alp_modal").modal("hide");

    hpq_alp = hpq_alp_TEMP;

    get_alp(hpq_alp);

});
$("#hpq_alp_modal").on("shown.bs.modal", function (e) {

    $("#alp_tenur").on("change", function () {
        if ($("#alp_tenur").val() == 9) {
            $(".alp_tenur_o").show();
            $("#alp_tenur_o").required();
        } else {
            $(".alp_tenur_o").hide();
            $("#alp_tenur_o").val("").notRequired();
        }
    });

});
$("#hpq_alp_modal").on("hidden.bs.modal", function (e) {
    $("#alp_tenur").off();
    document.getElementById("hpq_alp_form").reset();
});
//#endregion end of add alp section
//#region add crop section
function add_crop() {

    cropEditMode = false;

    $("#hpq_alp_modal").modal("show");

}
function edit_crop(cropToEdit) {

    cropEditMode = true;
    cropEdited = cropToEdit;
    let hpq_crop_TEMP = JSON.parse(Android.getTemp("hpq_crop"));

    $("#hpq_crop_modal").modal("show");

    console.log(JSON.stringify(hpq_crop_TEMP, null, 4))

    $.each(hpq_crop_TEMP, function (i, cropRow) {

        if (cropRow.cropindex == cropToEdit) {
            for (let key in cropRow) {

                $("#hpq_crop_form").find("#" + key).val(cropRow[key]);
                console.log(key)
            }
        }
    });
}
function delete_crop(crop_index_to_delete) {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            let hpq_crop_TEMP = JSON.parse(Android.getTemp("hpq_crop"));

            var remcrop = hpq_crop_TEMP.filter(items => items.cropindex != crop_index_to_delete);

            Android.setTemp("hpq_crop", JSON.stringify(remcrop));

            hpq_crop = remcrop;

            get_crop(hpq_crop);
            Swal.fire(
                'Deleted!',
                'Item removed.',
                'success'
            )
        }
    })
}
function get_crop(cropData) {

    let c = [];
    $.each(cropData, function (i, item) {
        c.push('<tr>');
        c.push('    <td>' + item.cropindex + '</td>');
        c.push('    <td>' + _croptype[item.croptype] + '</td>');
        c.push('    <td>' + item.crop_vol + '</td>');
        c.push('    <td align="center">');
        if (hpqEditMode == 2) {
            c.push('    <a onclick="edit_crop(' + item.cropindex + ')" class="btn btn-success mb-1 text-light">');
            c.push('        <i class="bi bi-eye"></i>');
            c.push('    </a>');
        } else {
            c.push('    <a onclick="edit_crop(' + item.cropindex + ')" class="btn btn-success mb-1 text-light">');
            c.push('        <i class="bi bi-pencil"></i>');
            c.push('    </a>');
            c.push('    <a onclick="delete_crop(' + item.cropindex + ')" class="btn btn-danger mb-1 text-light">');
            c.push('        <i class="bi bi-trash"></i>');
            c.push('    </a>');
        }
        c.push('    </td>');
        c.push('</tr>');
    });

    $("#hpq_crop_table").html(c.join("").toString());
}
$("#hpq_crop_modal").on("show.bs.modal", function (e) {

    if (hpqEditMode == 2) {
        $(".add_edit_hpq").hide();
        $(".view_hpq").show();
    } else {
        $(".add_edit_hpq").show();
        $(".view_hpq").hide();
    }

});
$("#hpq_crop_form").on("submit", function (e) {
    e.preventDefault();

    let cropData = $("#hpq_crop_form").serializeJSON();
    let hpq_crop_TEMP = JSON.parse(Android.getTemp("hpq_crop"));
    let cropArr = [];
    let crop_last_index

    if (hpq_crop_TEMP.length < 1) {
        hpq_crop_TEMP = [];
        crop_last_index = 0
    } else {
        $.each(hpq_crop_TEMP, function (i, item) {
            cropArr.push(item.cropindex);
        });
        crop_last_index = Math.max.apply(Math, cropArr) + 1;
    }

    if (cropEditMode) {
        hpq_crop_TEMP.splice(cropEdited, 1, cropData);
    } else {
        cropData["cropindex"] = crop_last_index;
        hpq_crop_TEMP.push(cropData);
    }

    Android.setTemp("hpq_crop", JSON.stringify(hpq_crop_TEMP));

    $("#hpq_crop_modal").modal("hide");

    hpq_crop = hpq_crop_TEMP;

    get_crop(hpq_crop);

});
$("#hpq_crop_modal").on("shown.bs.modal", function (e) {

    $("#croptype").on("change", function () {
        if ($("#croptype").val() == 4) {
            $(".croptype_o").show();
            $("#croptype_o").required();
        } else {
            $(".croptype_o").hide();
            $("#croptype_o").val("").notRequired();
        }
    });

});
$("#hpq_crop_modal").on("hidden.bs.modal", function (e) {
    $("#croptype").off();
    document.getElementById("hpq_crop_form").reset();
});
//#endregion end of add crop section
//#region add aquaequip section
function add_aquaequip() {

    aquaequipEditMode = false;

    $("#hpq_alp_modal").modal("show");

}
function edit_aquaequip(aquaequipToEdit) {

    aquaequipEditMode = true;
    aquaequipEdited = aquaequipToEdit;
    let hpq_aquaequip_TEMP = JSON.parse(Android.getTemp("hpq_aquaequip"));

    $("#hpq_aquaequip_modal").modal("show");

    console.log(JSON.stringify(hpq_aquaequip_TEMP, null, 4))

    $.each(hpq_aquaequip_TEMP, function (i, aquaequipRow) {

        if (aquaequipRow.aquaequipindex == aquaequipToEdit) {
            for (let key in aquaequipRow) {

                $("#hpq_aquaequip_form").find("#" + key).val(aquaequipRow[key]);
                console.log(key)
            }
        }
    });
}
function delete_aquaequip(aquaequip_index_to_delete) {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            let hpq_aquaequip_TEMP = JSON.parse(Android.getTemp("hpq_aquaequip"));

            var remaquaequip = hpq_aquaequip_TEMP.filter(items => items.aquaequipindex != aquaequip_index_to_delete);

            Android.setTemp("hpq_aquaequip", JSON.stringify(remaquaequip));

            hpq_aquaequip = remaquaequip;

            get_aquaequip(hpq_aquaequip);
            Swal.fire(
                'Deleted!',
                'Item removed.',
                'success'
            )
        }
    })
}
function get_aquaequip(aquaequipData) {

    let c = [];
    $.each(aquaequipData, function (i, item) {
        c.push('<tr>');
        c.push('    <td>' + item.aquaequipindex + '</td>');
        c.push('    <td>' + _aquaequiptype[item.aquaequiptype] + '</td>');
        c.push('    <td>' + item.aquaequiptype_own + '</td>');
        c.push('    <td align="center">');
        if (hpqEditMode == 2) {
            c.push('    <a onclick="edit_aquaequip(' + item.aquaequipindex + ')" class="btn btn-success mb-1 text-light">');
            c.push('        <i class="bi bi-eye"></i>');
            c.push('    </a>');
        } else {
            c.push('    <a onclick="edit_aquaequip(' + item.aquaequipindex + ')" class="btn btn-success mb-1 text-light">');
            c.push('        <i class="bi bi-pencil"></i>');
            c.push('    </a>');
            c.push('    <a onclick="delete_aquaequip(' + item.aquaequipindex + ')" class="btn btn-danger mb-1 text-light">');
            c.push('        <i class="bi bi-trash"></i>');
            c.push('    </a>');
        }
        c.push('    </td>');
        c.push('</tr>');
    });

    $("#hpq_aquaequip_table").html(c.join("").toString());
}
$("#hpq_aquaequip_modal").on("show.bs.modal", function (e) {

    if (hpqEditMode == 2) {
        $(".add_edit_hpq").hide();
        $(".view_hpq").show();
    } else {
        $(".add_edit_hpq").show();
        $(".view_hpq").hide();
    }

});
$("#hpq_aquaequip_form").on("submit", function (e) {
    e.preventDefault();

    let aquaequipData = $("#hpq_aquaequip_form").serializeJSON();
    let hpq_aquaequip_TEMP = JSON.parse(Android.getTemp("hpq_aquaequip"));
    let aquaequipArr = [];
    let aquaequip_last_index

    if (hpq_aquaequip_TEMP.length < 1) {
        hpq_aquaequip_TEMP = [];
        aquaequip_last_index = 0
    } else {
        $.each(hpq_aquaequip_TEMP, function (i, item) {
            aquaequipArr.push(item.aquaequipindex);
        });
        aquaequip_last_index = Math.max.apply(Math, aquaequipArr) + 1;
    }

    if (aquaequipEditMode) {
        hpq_aquaequip_TEMP.splice(aquaequipEdited, 1, aquaequipData);
    } else {
        aquaequipData["aquaequipindex"] = aquaequip_last_index;
        hpq_aquaequip_TEMP.push(aquaequipData);
    }

    Android.setTemp("hpq_aquaequip", JSON.stringify(hpq_aquaequip_TEMP));

    $("#hpq_aquaequip_modal").modal("hide");

    hpq_aquaequip = hpq_aquaequip_TEMP;

    get_aquaequip(hpq_aquaequip);

});
$("#hpq_aquaequip_modal").on("shown.bs.modal", function (e) {

    $("#aquaequiptype").on("change", function () {
        if ($("#aquaequiptype").val() == 8) {
            $(".aquaequiptype_o").show();
            $("#aquaequiptype_o").required();
        } else {
            $(".aquaequiptype_o").hide();
            $("#aquaequiptype_o").val("").notRequired();
        }
    });

});
$("#hpq_aquaequip_modal").on("hidden.bs.modal", function (e) {
    $("#aquaequiptype").off();
    document.getElementById("hpq_aquaequip_form").reset();
});
//#endregion end of add aquaequip section
//#region add aquani section
function add_aquani() {

    aquaniEditMode = false;

    $("#hpq_alp_modal").modal("show");

}
function edit_aquani(aquaniToEdit) {

    aquaniEditMode = true;
    aquaniEdited = aquaniToEdit;
    let hpq_aquani_TEMP = JSON.parse(Android.getTemp("hpq_aquani"));

    $("#hpq_aquani_modal").modal("show");

    console.log(JSON.stringify(hpq_aquani_TEMP, null, 4))

    $.each(hpq_aquani_TEMP, function (i, aquaniRow) {

        if (aquaniRow.aquaniindex == aquaniToEdit) {
            for (let key in aquaniRow) {

                $("#hpq_aquani_form").find("#" + key).val(aquaniRow[key]);
                console.log(key)
            }
        }
    });
}
function delete_aquani(aquani_index_to_delete) {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            let hpq_aquani_TEMP = JSON.parse(Android.getTemp("hpq_aquani"));

            var remaquani = hpq_aquani_TEMP.filter(items => items.aquaniindex != aquani_index_to_delete);

            Android.setTemp("hpq_aquani", JSON.stringify(remaquani));

            hpq_aquani = remaquani;

            get_aquani(hpq_aquani);
            Swal.fire(
                'Deleted!',
                'Item removed.',
                'success'
            )
        }
    })
}
function get_aquani(aquaniData) {

    let c = [];
    $.each(aquaniData, function (i, item) {
        c.push('<tr>');
        c.push('    <td>' + item.aquaniindex + '</td>');
        c.push('    <td>' + _aquanitype[item.aquanitype] + '</td>');
        c.push('    <td>' + item.aquani_vol + '</td>');
        c.push('    <td align="center">');
        if (hpqEditMode == 2) {
            c.push('    <a onclick="edit_aquani(' + item.aquaniindex + ')" class="btn btn-success mb-1 text-light">');
            c.push('        <i class="bi bi-eye"></i>');
            c.push('    </a>');
        } else {
            c.push('    <a onclick="edit_aquani(' + item.aquaniindex + ')" class="btn btn-success mb-1 text-light">');
            c.push('        <i class="bi bi-pencil"></i>');
            c.push('    </a>');
            c.push('    <a onclick="delete_aquani(' + item.aquaniindex + ')" class="btn btn-danger mb-1 text-light">');
            c.push('        <i class="bi bi-trash"></i>');
            c.push('    </a>');
        }
        c.push('    </td>');
        c.push('</tr>');
    });

    $("#hpq_aquani_table").html(c.join("").toString());
}
$("#hpq_aquani_modal").on("show.bs.modal", function (e) {

    if (hpqEditMode == 2) {
        $(".add_edit_hpq").hide();
        $(".view_hpq").show();
    } else {
        $(".add_edit_hpq").show();
        $(".view_hpq").hide();
    }

});
$("#hpq_aquani_form").on("submit", function (e) {
    e.preventDefault();

    let aquaniData = $("#hpq_aquani_form").serializeJSON();
    let hpq_aquani_TEMP = JSON.parse(Android.getTemp("hpq_aquani"));
    let aquaniArr = [];
    let aquani_last_index

    if (hpq_aquani_TEMP.length < 1) {
        hpq_aquani_TEMP = [];
        aquani_last_index = 0
    } else {
        $.each(hpq_aquani_TEMP, function (i, item) {
            aquaniArr.push(item.aquaniindex);
        });
        aquani_last_index = Math.max.apply(Math, aquaniArr) + 1;
    }

    if (aquaniEditMode) {
        hpq_aquani_TEMP.splice(aquaniEdited, 1, aquaniData);
    } else {
        aquaniData["aquaniindex"] = aquani_last_index;
        hpq_aquani_TEMP.push(aquaniData);
    }

    Android.setTemp("hpq_aquani", JSON.stringify(hpq_aquani_TEMP));

    $("#hpq_aquani_modal").modal("hide");

    hpq_aquani = hpq_aquani_TEMP;

    get_aquani(hpq_aquani);

});
$("#hpq_aquani_modal").on("shown.bs.modal", function (e) {

    $("#aquanitype").on("change", function () {
        if ($("#aquanitype").val() == 6) {
            $(".aquanitype_o").show();
            $("#aquanitype_o").required();
        } else {
            $(".aquanitype_o").hide();
            $("#aquanitype_o").val("").notRequired();
        }
    });

});
$("#hpq_aquani_modal").on("hidden.bs.modal", function (e) {
    $("#aquanitype").off();
    document.getElementById("hpq_aquani_form").reset();
});
//#endregion end of add aquani section

function getProfile() {

    for (var prop in userDetails) {
        $("." + prop).val(userDetails[prop]);
    }

    $("#user-modal").modal("show");

}