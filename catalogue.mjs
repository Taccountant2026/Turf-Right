export const shop = Object.freeze({
  name: 'Stone & Sprig',
  baseUrl: 'https://stoneandsprig.co.uk/',
  checkoutEnabled: false,
  stockConfirmed: false,
  contactEmail: '',
  deliveryPence: 399,
  freeDeliveryPence: 5000,
  maxQuantity: 20,
});

// Catalogue prices and pack sizes are retained from the existing store.
// Availability and supplier specifications must be confirmed before sale.
export const products = [
  {id:1,slug:'garden-waste-bag',name:'Garden Waste Bag',price:999,category:'Tidy & care',art:'bag',description:'A reusable bag for gathering leaves and light garden cuttings as you work.',detail:'Keep a collection point beside a border or path while you tidy. Capacity, material and the final supplied model will be confirmed before orders open.',check:'Check the supplied capacity and lifting instructions. Keep loads manageable.',jobs:['tidy'],collections:['autumn-reset'],related:[2,4,12]},
  {id:2,slug:'gardening-gloves',name:'Latex Gardening Gloves · 3 Pair',price:999,category:'Tools & comfort',art:'gloves',description:'Three pairs of coated gardening gloves for everyday garden jobs.',detail:'A practical addition to a basic garden toolkit. Glove sizing and final material specifications will be confirmed before sale.',check:'Not specialist protective equipment. Check latex suitability and use protection appropriate to the task.',jobs:['tidy','grow'],collections:['autumn-reset','potting-bench'],related:[1,9,11]},
  {id:3,slug:'pruning-shears',name:'Pruning Shears',price:899,category:'Tools & comfort',art:'shears',description:'A compact hand tool for appropriate light pruning and garden care.',detail:'Choose pruning jobs for the particular plant and season. Cutting capacity, blade type and final supplied model are awaiting confirmation.',check:'Keep blades away from children. Follow the tool instructions and check plant-specific pruning advice.',jobs:['tidy'],collections:[],related:[2,11,15]},
  {id:4,slug:'patio-weed-brush',name:'Patio Weed Brush',price:799,category:'Tidy & care',art:'brush',description:'A hand brush for tidying weeds and debris around suitable paving joints.',detail:'Useful for small, targeted jobs around a patio. Bristle material and surface suitability must be checked against the final product.',check:'Test an inconspicuous area first and avoid damage to pointing or delicate surfaces.',jobs:['tidy'],collections:['autumn-reset'],related:[1,2,11]},
  {id:5,slug:'twistee-garden-wire',name:'Twistee Garden Wire · 50m',price:699,category:'Plant support',art:'wire',description:'A 50m garden wire option for suitable tying and support tasks.',detail:'Use a support method that suits the plant. Final wire gauge, coating and the supplied pack will be confirmed before ordering.',check:'Allow room for growth. Check regularly and avoid tight wire directly around soft stems.',jobs:['support'],collections:['plant-support'],related:[6,14,17]},
  {id:6,slug:'soft-twist-plant-tie',name:'Soft Twist Plant Tie · 10m',price:699,category:'Plant support',art:'tie',description:'A soft tie option for securing plants to suitable supports.',detail:'Cut a length to suit the support and leave room for the stem to develop. Final diameter and material specification will be confirmed.',check:'Inspect and loosen ties as plants grow. Do not overtighten.',jobs:['support'],collections:['plant-support'],related:[14,15,17]},
  {id:7,slug:'plant-twists',name:'Plant Twists · 100 Pack',price:699,category:'Plant support',art:'tie',description:'A pack of 100 ready-to-use twists for small tying tasks.',detail:'Keep quick ties to hand for suitable plant supports. The length and material of the final pack are awaiting confirmation.',check:'Choose ties suited to the plant, leave room for growth and check them regularly.',jobs:['support'],collections:[],related:[6,14,17]},
  {id:8,slug:'seed-labels-pencil',name:'Seed Labels + Pencil · 50 Pack',price:799,category:'Pots & planting',art:'labels',description:'Fifty labels with a pencil for keeping track of what you have planted.',detail:'Note the plant name and sowing or planting date to make future care easier. Label size and material will be confirmed before sale.',check:'Follow the seed or plant instructions for its own planting time and conditions.',jobs:['grow'],collections:['potting-bench'],related:[9,10,16]},
  {id:9,slug:'garden-hand-trowel',name:'Garden Hand Trowel',price:799,category:'Tools & comfort',art:'trowel',description:'An everyday hand tool for potting and suitable small planting jobs.',detail:'A simple starting point for a potting kit. Handle material, blade dimensions and final supplied model are awaiting confirmation.',check:'Check soil for hidden sharp objects and work within a comfortable reach.',jobs:['grow'],collections:['potting-bench'],related:[2,11,16]},
  {id:10,slug:'multi-purpose-trays',name:'Multi-Purpose Trays · 2 Pack',price:699,category:'Pots & planting',art:'tray',description:'Two trays for organising pots and small planting tasks.',detail:'Keep a potting area organised. Tray dimensions, depth and drainage details will be confirmed before orders open.',check:'Check drainage requirements; avoid leaving plants standing in water unnecessarily.',jobs:['grow'],collections:[],related:[8,9,16]},
  {id:11,slug:'jumbo-kneeling-pad',name:'Jumbo Kneeling Pad',price:799,category:'Tools & comfort',art:'pad',description:'A padded surface for short, low-level gardening tasks.',detail:'A useful comfort extra for planting or weeding. Exact dimensions, thickness and material will be confirmed before sale.',check:'Take breaks and choose a position that is comfortable for you; this is not medical equipment.',jobs:['tidy','grow'],collections:[],related:[2,9,12]},
  {id:12,slug:'garden-weeding-set',name:'Garden Weeding Set · 2 Pack',price:799,category:'Tidy & care',art:'tools',description:'Two hand tools for small weeding and border-tidying jobs.',detail:'For targeted garden jobs rather than a complete border overhaul. Tool types, materials and dimensions are awaiting supplier confirmation.',check:'Identify plants before removal and avoid disturbing roots of plants you want to keep.',jobs:['tidy'],collections:[],related:[1,2,11]},
  {id:13,slug:'garden-netting',name:'Garden Netting · 6 × 4m',price:999,category:'Plant support',art:'net',description:'A 6 × 4m netting option; suitability depends on the final mesh specification.',detail:'Mesh size, material and suitable uses must be confirmed before sale. General garden netting is not frost protection.',check:'Poorly secured netting can trap wildlife. Use only for a suitable task, secure it properly and inspect it regularly.',jobs:['support'],collections:[],related:[14,15,17]},
  {id:14,slug:'bamboo-flower-sticks',name:'Bamboo Flower Sticks · 20 Pack',price:799,category:'Plant support',art:'canes',description:'Twenty bamboo sticks for appropriately sized flowers and young plants.',detail:'Support suitable plants as they develop. Stick length and diameter will be confirmed before orders open.',check:'Choose a suitable height and fit protective tops where an exposed tip could cause injury.',jobs:['support'],collections:['plant-support'],related:[6,15,17]},
  {id:15,slug:'garden-twine',name:'Garden Twine · 200m',price:799,category:'Plant support',art:'twine',description:'A 200m roll for suitable general garden tying tasks.',detail:'A versatile addition to the potting bench. Material, breaking strength and final product specification are awaiting confirmation.',check:'Do not use for lifting or safety-critical loads. Leave growing stems room to expand.',jobs:['support'],collections:['plant-support'],related:[6,14,17]},
  {id:16,slug:'plant-pots',name:'Plant Pots · 13cm 3 Pack',price:799,category:'Pots & planting',art:'pots',description:'Three 13cm pots for plants suited to that container size.',detail:'Choose a pot that suits the plant and rootball. Material, drainage and exact dimensions will be confirmed before sale; plants are not included.',check:'Check drainage and plant requirements before potting. These pots are not a universal size for mature plants.',jobs:['grow'],collections:['potting-bench'],related:[8,9,10]},
  {id:17,slug:'hook-loop-tie-tape',name:'Hook & Loop Tie Tape · 3 Pack',price:799,category:'Plant support',art:'tie',description:'Three packs of adjustable hook-and-loop tie tape.',detail:'An adjustable option for appropriate support tasks. Pack lengths, width and material will be confirmed before sale.',check:'Leave room for growth and inspect ties as stems develop.',jobs:['support'],collections:[],related:[6,14,15]},
  {id:18,slug:'garden-tool-set',name:'Heavy-Duty Tool Set · 3 Pack',price:1299,category:'Tools & comfort',art:'tools',description:'A three-piece hand-tool set for routine small garden jobs.',detail:'Consider a set if you are starting a toolkit. The supplied tool types, materials and the heavy-duty specification must be confirmed before sale.',check:'Compare the final set contents with tools you already own before choosing it.',jobs:['tidy','grow'],collections:[],related:[2,11,16]},
].map(p => Object.freeze({...p, availability:'coming-soon'}));

export const collections = [
  {slug:'autumn-reset',name:'A little autumn reset',label:'Tidy & care',description:'Gather leaves and tackle a small patch of paving, one manageable job at a time.',ids:[1,2,4],guide:'autumn-reset'},
  {slug:'potting-bench',name:'Start at the potting bench',label:'Pots & planting',description:'A trowel, labels and a few pots: a simple starting point for your next planting project.',ids:[9,8,16],guide:'small-space-gardening'},
  {slug:'plant-support',name:'A helping hand for plants',label:'Plant support',description:'Combine suitable supports and gentle ties. Check the final sizes against your plants.',ids:[14,6,15],guide:'plant-support'},
];

export const guides = [
  {
  "slug": "photos-for-a-garden-enquiry",
  "title": "Five useful views for a clearer garden enquiry",
  "category": "Garden projects",
  "read": "4 min",
  "intro": "Show the space, the problem and the practical details without sharing more of your home than necessary.",
  "source": [],
  "products": [],
  "sections": [
    [
      "1. The space as a whole",
      "From a safe place you can already reach, take one view that shows the area you want to discuss. Explain which part matters and what you hope to change. You do not need to climb, move heavy objects or go onto slippery ground to get a better photograph."
    ],
    [
      "2. The specific problem",
      "Add a closer view of the patch, border, surface or awkward corner you mean. Describe what makes it difficult in everyday use. A photograph can start a conversation, but it cannot confirm a diagnosis, the ground conditions or which construction work is suitable."
    ],
    [
      "3. The access route",
      "If it is safe and relevant, show the route from the normal entrance to the work area, including visible steps or narrow sections. Add approximate measurements you can take comfortably. Keep gates, boundaries and neighbouring property in the correct context rather than implying access that has not been agreed."
    ],
    [
      "4. The nearby surfaces and features",
      "Show nearby paving, buildings or established planting that affects the brief. Note anything you already know about underground services, but do not dig to find them. If water is involved, describe when it appears and use the wet-garden guide to record observations without choosing a drainage fix."
    ],
    [
      "5. What you want to keep",
      "Include a view of an existing feature, plant or useful part of the garden that you would like to retain. Separate must-haves from ideas you are still considering. A short note about priorities can be more useful than a large folder of photographs with no explanation."
    ],
    [
      "Share the brief privately",
      "Check images for faces, children, number plates, house numbers, documents and neighbours' private spaces. Share only what is needed through the project-brief route; do not post a home layout publicly. Location, access, scope, timing and any written quote are reviewed individually. No visit or coverage is promised, and the planned shop is not taking orders."
    ]
  ],
  "published": "2026-10-24"
},
  {
    "slug": "wet-garden-before-project",
    "title": "A soggy garden? Make a useful plan before digging.",
    "category": "Garden projects",
    "read": "4 min",
    "intro": "Notice where rainwater collects, what stays wet and which questions to ask before changing the garden.",
    "source": [
      [
        "RHS: waterlogging and flooding",
        "https://www.rhs.org.uk/soil-composts-mulches/waterlogging-flooding"
      ],
      [
        "RHS: waterlogged lawns",
        "https://www.rhs.org.uk/lawns/waterlogging"
      ]
    ],
    "sections": [
      [
        "Map what happens after rain",
        "From a safe, dry spot, note where puddles form, how long they last and whether the water appears after ordinary rain or only heavy downpours. Record whether the problem affects the lawn, a border, paving or a route to the door. Photos from different days can make the pattern clearer."
      ],
      [
        "Avoid making the soil worse",
        "Keep off very wet lawns and borders where practical: walking or working on saturated ground can compact it further. Do not start digging drainage trenches or redirecting water towards buildings, neighbours or drains on the strength of a quick online tip."
      ],
      [
        "Separate the symptoms from the proposed fix",
        "A puddle can have several causes, including compaction, heavy soil, surface runoff or a drainage fault. Record what you observe without assuming a soakaway, new paving or a lawn replacement is the answer. Water from overflowing drains or suspected contaminated flooding needs the appropriate utility or specialist advice."
      ],
      [
        "Prepare a clearer project brief",
        "Write down the approximate affected area, access, slope, nearby hard surfaces, what you want to keep and the outcome you hope for. Mark anything you know about underground services and boundaries. Stone & Sprig can discuss a potential project only after its location, scope and suitability are reviewed individually; no visit, coverage or result is promised by this guide."
      ],
      [
        "Choose the next step thoughtfully",
        "Read the RHS guidance for your particular situation. Some gardens benefit from soil care or a different planting approach; others need professional assessment before structural drainage work. Use Stone & Sprig’s project brief to describe the issue privately, not as a public comment. The planned garden shop is not yet taking orders."
      ]
    ],
    "products": [],
    "updated": "23 October 2026",
    "updatedISO": "2026-10-23"
  },
  {slug:'autumn-reset',title:'An autumn reset, without clearing everything',category:'Seasonal notes',read:'3 min',intro:'Start with the paths you use, the lawn beneath your feet and a little space for wildlife.',source:[['RHS: October lawns','https://www.rhs.org.uk/advice/in-month/october/lawns'],['RHS: October flowers','https://www.rhs.org.uk/advice/in-month/october/flowers']],sections:[['Choose one useful job','Clear fallen leaves from the lawn and well-used paths. Work in small sections, with manageable loads rather than an overfilled bag.'],['Leave some life standing','Seed heads and some perennial stems can remain through winter as habitat. A tidy path and a less tidy border can sit happily together.'],['Let conditions decide','Avoid working on a frosty or waterlogged lawn. Check plant-specific advice before cutting back; autumn is not the right pruning season for every plant.']],products:[1,2,4]},
  {slug:'small-space-gardening',title:'A good garden can start with a few pots',category:'Small spaces',read:'3 min',intro:'A doorstep, patio or balcony can become a growing space. Start with the conditions you have.',source:[['RHS: Growing plants in containers','https://www.rhs.org.uk/container-gardening/growing-plants-in-containers']],sections:[['Read your space','Notice sunlight, wind and how easily you can reach water. Check balcony weight limits and permissions before adding heavy containers.'],['Match plant and pot','Choose a container size, drainage and growing medium suited to the plant. Reuse a sound pot where possible; a new pot is only useful if it fits the job.'],['Keep checking','Containers need regular attention to watering, especially in spring and summer. Check moisture rather than following a rigid timetable, and look out for winter waterlogging.']],products:[8,9,16]},
  {slug:'wildlife-friendly-corner',title:'Make room for the small garden visitors',category:'Wildlife',read:'3 min',intro:'A wildlife-friendly corner begins with thoughtful care, rather than a shopping list.',source:[['RHS: Wildlife in gardens','https://www.rhs.org.uk/wildlife/in-gardens'],['RHS: Pots and container habitats','https://www.rhs.org.uk/wildlife/pots-and-container-habitats']],sections:[['Keep some shelter','Leave a quiet area of stems, fallen leaves or suitable plant cover where practical. Think about how a small creature might move through the garden.'],['Grow for more of the year','Choose plants suited to your space that offer flowers, fruit or shelter at different times. Pots can contribute too.'],['Check what you put out','Inspect any netting for loose edges and trapped wildlife. Keep water containers clean and think carefully about their safe position and access.']],products:[]},
  {slug:'plant-support',title:'Support the plant. Leave room to grow.',category:'Practical skills',read:'2 min',intro:'The best tie is one that does the job without squeezing a growing stem.',source:[['RHS: Wildlife and garden netting','https://www.rhs.org.uk/prevention-protection/insect-proof-mesh']],sections:[['Choose a suitable support','Match the height and strength of the support to the plant. Check the final product dimensions before buying.'],['Check your ties','Allow space around the stem and revisit ties during the growing season. Adjust or replace them as the plant develops.'],['Treat netting separately','Netting needs the right mesh for the task and secure fitting. Loose folds can entangle wildlife. General netting does not provide frost protection.']],products:[6,14,15]},
  {slug:'plan-a-garden-project',title:'Turn “something needs doing” into a clear garden brief',category:'Garden projects',read:'4 min',intro:'You do not need a finished design to start a useful conversation. A clear goal is enough.',source:[],sections:[['Begin with the everyday problem','Describe what is difficult now: keeping up with a border, using a cramped corner or making the garden easier to care for. Note who uses the space and what you want to keep.'],['Record the practical details','Estimate the area, access width and any steps or slopes. Take photos for a later discussion, but keep sensitive details out of anything shared publicly.'],['Set priorities before promises','Separate essentials from nice-to-haves. Give an indicative budget and timing if you have them. Every project needs its own scope, location check and written agreement before work is arranged.']],products:[]},
];
