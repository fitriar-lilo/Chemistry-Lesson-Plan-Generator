import { LessonPlanData, LessonMeeting5E, ResourceItem } from '../types';

interface GenerateParams {
  yearGroup: string;
  syllabus: string;
  selectedTopics: string[];
  selectedSubtopics: string[];
  selectedObjectives: string[];
  teacherName: string;
  principalName: string;
  department: string;
  duration: string;
  meetingCount: number;
  dateStr: string;
  teachingMethod: string;
  customLessonIdeas: string;
  sampleQuestions: string;
  teacherResourceUrl: string;
  studentWorksheetUrl: string;
  headerStartColor?: string;
  headerEndColor?: string;
  sectionBarColor?: string;
  headerLogoDataUri?: string;
  teacherSignatureDataUri?: string;
  principalSignatureDataUri?: string;
}

export function generateLessonPlan(params: GenerateParams): LessonPlanData {
  const {
    yearGroup = 'Year 12 (SMA)',
    syllabus = 'Cambridge International AS & A Level Chemistry (9701)',
    selectedTopics = ['Electrochemistry'],
    selectedSubtopics = ['Redox reactions revisited & Electrolysis', 'Quantitative electrolysis'],
    selectedObjectives = [],
    teacherName = 'Ratna Dwi Setyorini',
    principalName = 'Ahmad Nurani, S.T., M.Pd.',
    department = 'Science / Chemistry',
    duration = '80 min (Double Period)',
    meetingCount = 2,
    dateStr = '15 / 07 / 2026',
    teachingMethod = '5E Guided Inquiry with Worked Integer Examples & Scaffolding',
    customLessonIdeas = '',
    sampleQuestions = '',
    teacherResourceUrl = 'https://edunav.semesta.sch.id/curriculum/chemistry-resources',
    studentWorksheetUrl = 'https://drive.google.com/semesta/chemistry-worksheets-2026',
    headerStartColor = '#005C6E',
    headerEndColor = '#003A45',
    sectionBarColor = '#005C6E',
    headerLogoDataUri = '',
    teacherSignatureDataUri = '',
    principalSignatureDataUri = ''
  } = params;

  const topicTitle = selectedTopics.join(', ') || 'Electrochemistry';
  const subtopicsSummary = selectedSubtopics.join('; ') || 'Quantitative electrolysis and Redox reactions';
  const unitTitle = `Unit: ${topicTitle}`;

  // Cambridge Assessment Objectives mapping
  const aoText = {
    ao1: 'Demonstrate knowledge and understanding of scientific phenomena, facts, laws, definitions, concepts and theories, using scientific vocabulary and mathematical conventions ($F = L \\cdot e$, $Q = I \\times t$).',
    ao2: 'Handle, translate, and evaluate scientific information and solve quantitative problems using structured integer values and multi-step stoichiometric calculations.',
    ao3: 'Plan and evaluate experimental investigations in electrochemistry and reaction kinetics, recording observations and identifying systematic errors.'
  };

  // Dynamic WALT generation based on subtopics & objectives
  const walt: string[] = [];
  if (selectedObjectives.length > 0) {
    selectedObjectives.forEach(obj => {
      walt.push(obj.replace(/^[•\s*-]+/, '').trim());
    });
  } else if (subtopicsSummary.toLowerCase().includes('electro')) {
    walt.push('Apply Faraday\'s relationship $F = L \\cdot e$ to calculate electron charges and Avogadro\'s constant using integer constants ($F = 96500\\text{ C/mol}$).');
    walt.push('Calculate the mass and gas volume liberated at electrodes during quantitative electrolysis using $Q = I \\times t$ with scaffolded positive integer values.');
    walt.push('Construct balanced ionic redox half-equations and predict galvanic cell voltage $E^\\ominus_{\\text{cell}}$ under standard conditions.');
  } else if (subtopicsSummary.toLowerCase().includes('equilibria') || subtopicsSummary.toLowerCase().includes('buffer')) {
    walt.push('Define conjugate acid–base pairs and calculate $[\\text{H}^+(aq)]$ and pH for strong and weak monoprotic acids using $K_a$ expressions.');
    walt.push('Explain the chemical mechanism of buffer resistance in biological systems using the carbonic acid–hydrogen carbonate equilibrium.');
    walt.push('Calculate the solubility product $K_{sp}$ and predict the precipitation of sparingly soluble ionic salts using the common ion effect.');
  } else {
    walt.push(`Master foundational principles and quantitative problem-solving in ${subtopicsSummary}.`);
    walt.push('Formulate balanced chemical equations, apply stoichiometric mole ratios, and justify reaction pathways using integer data.');
    walt.push('Explain reaction mechanics and evaluate experimental data with clear mathematical reasoning.');
  }

  // WILF: What I'm Looking For checklist (integer focused)
  const wilf: string[] = [
    '✔ I can state the relationship $F = L \\cdot e$ and recall standard constants accurately ($F = 96500\\text{ C mol}^{-1}, e = 1.60 \\times 10^{-19}\\text{ C}$).',
    '✔ I can calculate charge $Q = I \\times t$ in Coulombs using simple whole-number seconds ($t = 60\\text{ s}, 120\\text{ s}, 300\\text{ s}$).',
    '✔ I can follow the 3-step integer algorithm: (1) Find charge $Q$, (2) Divide by Faraday constant $F$ to find moles of electrons, (3) Use mole ratio to calculate mass liberated.',
    '✔ I can write state symbols accurately for electrode half-reactions: e.g. $\\text{Cu}^{2+}(aq) + 2e^- \\rightarrow \\text{Cu}(s)$.',
    '✔ I can verify my answer by checking units (Amperes, Coulombs, Grams, $\\text{dm}^3$) and significant figures.'
  ];

  // SLO: Measurable outcomes by end of lesson
  const slo: string[] = [
    'Solve at least 4 out of 5 quantitative calculation problems using positive integer values without calculation errors.',
    'State and define all Cambridge syllabus key terms with 100% conceptual precision on the exit ticket.',
    'Explain the role of the salt bridge and electron flow direction in electrochemical cells to a peer partner.',
    'Demonstrate Cambridge Learner Attribute: Reflective and Analytical in evaluating theoretical vs actual electrolytic yields.'
  ];

  // CLIL & Key Terms
  const clilKeyTerms = selectedTopics.includes('Reaction kinetics')
    ? 'Rate equation, order of reaction (0, 1st, 2nd), rate constant (k), half-life (t_1/2 = 0.693/k), rate-determining step, activation energy (Ea), homogeneous vs heterogeneous catalysis, adsorption, desorption.'
    : selectedTopics.includes('Further aspect of equilibria')
    ? 'Conjugate acid-base pair, acid dissociation constant (Ka), pKa (-log Ka), ionic product of water (Kw = 1.0 x 10^-14), buffer solution, Henderson-Hasselbalch, solubility product (Ksp), common ion effect.'
    : 'Faraday constant (F = 96500 C/mol), Avogadro constant (L = 6.02 x 10^23 mol^-1), elementary charge (e), cathode (reduction), anode (oxidation), inert graphite/platinum electrode, electrolyte, standard reduction potential (E°), SHE (Standard Hydrogen Electrode).';

  const ealLanguageSupport = 'Bilingual vocabulary mat provided (English–Bahasa Indonesia) e.g., "Reduction = Reduksi (penerimaan elektron)", "Oxidation = Oksidasi (pelepasan elektron)", "Electrode = Elektroda", "Buffer = Penyangga". Sentence starters provided on desk: "When current flows for ... seconds, the mass of metal deposited increases because ...".';

  // Differentiation Provisions Table (4 Columns)
  const struggledScaffolding = {
    points: [
      'Provide 3-step calculation template cards using integer values: Current $I = 2\\text{ A}$, time $t = 100\\text{ s} \\implies Q = 200\\text{ C}$.',
      'Pre-printed graphic organizer with color-coded boxes for Reactants $\\rightarrow$ Electrons transferred $\\rightarrow$ Mass liberated.',
      'Paired with peer mentor for guided worked examples before independent practice.',
      'Reference cheat-sheet with Faraday formula triangle: $Q = I \\times t$ and $n = Q / (z \\times F)$.'
    ],
    resourceDesk: 'Scaffolding Calculation Mat & Formula Reference Card (red tray, teacher\'s desk)'
  };

  const ealSupport = [
    'Bilingual visual flashcards with dual-language chemistry glossaries (English - Bahasa Indonesia).',
    'Sentence frames: "At the cathode, \\text{Cu}^{2+} ions undergo _______ (reduction/oxidation) by gaining _______ electrons."',
    'Annotated diagrams of electrolysis cells with arrows indicating direction of electron movement and ion migration.',
    'Permitted use of approved dual-language scientific dictionaries during formative checks.'
  ];

  const senScaffolding = [
    'Enlarged font worksheets (14pt high-contrast) and pastel paper to reduce visual fatigue.',
    'Chunked tasks: exercises broken into manageable 5-minute single-step micro-goals.',
    'Assigned designated quiet study corner with dedicated peer buddy for reading prompt questions.',
    'Structured checklists with checkboxes to tick off each completed calculation step.'
  ];

  const extensionTasks = [
    'Multi-step non-standard problem: Calculate the volume of chlorine gas produced at room temperature ($24\\text{ dm}^3$) when industrial brine is electrolyzed for 2 hours with an alternating efficiency of 92%.',
    'Evaluate why experimental determination of Avogadro\'s constant often yields minor deviations from $6.02 \\times 10^{23}$ due to secondary electrode side-reactions.',
    'Design an industrial copper electro-refining cell with impurity sludge recovery analysis and energy cost estimation.'
  ];

  // 5E Meetings Generation (up to meetingCount)
  const meetings: LessonMeeting5E[] = [];

  for (let m = 1; m <= meetingCount; m++) {
    const isFirst = m === 1;
    const meetingTitle = isFirst
      ? `Lesson Sequence — 5E Instructional Model (Meeting 1: Introduction & Foundational Integer Calculations)`
      : `Lesson Sequence — 5E Instructional Model (Meeting ${m}: Advanced Applications, Multi-Step Problem Solving & Lab Synthesis)`;

    meetings.push({
      meetingNumber: m,
      duration: duration,
      title: meetingTitle,
      starterStimulus: isFirst
        ? 'Real-world hook: Display an authentic gold-plated mobile phone connector and an automotive battery. Pose question: "How does electrical energy precisely deposit exactly 3 grams of pure metal atom by atom?"'
        : `Starter stimulus: Review diagnostic exit slip from Meeting ${m - 1}. Challenge students with a quick 3-minute "Find the Error in the Calculation" whiteboard competition using integer current and time.`,
      engage: {
        time: '10 min',
        teacherActivity: isFirst
          ? 'Showcase live mini-demonstration of copper plating using a copper strip, beaker of $\\text{CuSO}_4$, and a 9V battery with integer current of 1A. Write WALT clearly on main board.'
          : 'Project 3 integer calculation warm-up problems on board ($I = 3\\text{ A}, t = 200\\text{ s}, Q = 600\\text{ C}$). Circulate to check student entry tickets.',
        studentActivity: 'Active observation in pairs; record initial predictions in notebook; calculate diagnostic integer warm-up question; restate today\'s WALT in own words.',
        waltDisplay: 'WALT displayed prominently on interactive whiteboard with success criteria.',
        assessment: '▶ Diagnostic integer check\n▶ Active participation cold-call'
      },
      explore: {
        time: '20 min',
        teacherActivity: isFirst
          ? 'Facilitate guided inquiry station activity. Distribute scaffolded data cards where students examine integer current vs mass deposited data: $(2\\text{ A}, 100\\text{ s}) \\rightarrow 0.066\\text{ g Cu}$. Prompt students to deduce the mathematical proportionality $m \\propto Q$.'
          : 'Guide small group discovery on comparing electrolytic cells vs galvanic cells. Provide structured Venn diagrams and integer voltage test results.',
        studentActivity: 'Collaborate in assigned trios; plot integer coordinates on graph paper; test relationships using simple whole numbers ($Q = 100, 200, 300\\text{ C}$); deduce that doubling charge doubles liberated mass.',
        waltDisplay: 'WALT criteria checklist visible; groups self-monitor progress.',
        assessment: '▶ Guided inquiry observation\n▶ Scaffolding check at tables'
      },
      explain: {
        time: '15 min',
        teacherActivity: 'Explicit direct instruction on board. Break down the universal Faraday formula step-by-step: Step 1 ($Q = I \\times t$), Step 2 ($n(e^-) = Q / F$), Step 3 ($m = n \\times M_r / z$). Model a complete worked example using integer values: "A current of $2\\text{ A}$ passes through molten $\\text{NaCl}$ for $965\\text{ s}$. How many moles of sodium are produced? ($F = 96500\\text{ C/mol}$)"',
        studentActivity: 'Record Cornell notes; annotate the 3-step integer calculation flow diagram in color; choral-respond to intermediate calculation checks ($965 \\times 2 = 1930\\text{ C}$; $1930 / 96500 = 0.02\\text{ mol}$).',
        boardExamples: 'Board worked example: $Q = 2\\text{ A} \\times 965\\text{ s} = 1930\\text{ C} \\implies n(e^-) = \\frac{1930}{96500} = 0.02\\text{ mol}$. Since $\\text{Na}^+ + e^- \\rightarrow \\text{Na}$, $n(\\text{Na}) = 0.02\\text{ mol} \\implies m = 0.02 \\times 23 = 0.46\\text{ g}$.',
        assessment: '▶ Board check for understanding\n▶ Thumbs up/middle/down consensus'
      },
      elaborate: {
        time: '20 min',
        teacherActivity: 'Distribute 3-tiered differentiated practice sheets (Green = Struggled Scaffolding with positive integers; Yellow = Standard Cambridge Exam Questions; Blue = High-Achieving Extension). Provide targeted micro-interventions at red tray desk.',
        studentActivity: 'Individual and paired problem solving. Level 1 students complete positive integer calculations with guided step templates. Level 3 students solve multi-step electroplating thickness questions.',
        scaffoldedTasks: 'Tier 1: Current $1\\text{ A}, t = 965\\text{ s}$. Find mass of silver ($M_r = 108$). Answer: $1.08\\text{ g}$.\nTier 2: Current $5\\text{ A}, t = 1930\\text{ s}$ for copper ($z = 2$).\nTier 3: Industrial zinc extraction with $80\\%$ cell efficiency.',
        assessment: '▶ Tiered worksheet marking\n▶ Real-time error correction'
      },
      evaluate: {
        time: '15 min',
        teacherActivity: 'Administer individual Exit Ticket (2 short questions: 1 definition + 1 two-step integer calculation). Summarize key learnings against WALT/WILF.',
        studentActivity: 'Complete Exit Ticket independently without notes; hand to teacher upon dismissal; self-rate mastery on 1-4 scale against WILF checklist.',
        exitTicket: 'Exit Ticket Prompt: (1) State the equation linking $F, L$ and $e$. (2) Calculate the charge in Coulombs when $3\\text{ A}$ flows for $300\\text{ s}$. ($Q = 900\\text{ C}$).',
        assessment: '▶ Formative Exit Ticket submission\n▶ WILF self-assessment rating'
      }
    });
  }

  // Formative Assessment & Reflection Table
  const formativeAssessmentInClass = [
    'Diagnostic 3-question integer warm-up at the start of each period.',
    'Mini-whiteboard checks: students display calculated charge $Q = I \\times t$ simultaneously.',
    'Targeted oral questioning using Bloom\'s taxonomy (Recall, Calculate, Analyze).',
    'Exit Ticket evaluated before next lesson with immediate feedback loop.'
  ];

  const homeworkNextLesson = [
    'Consolidation Exercise: Complete Cambridge Coursebook Practice Questions 14.1 - 14.4 (Odd numbers, focused on integer calculation foundations).',
    'Digital assignment on Edunav portal: 5 self-grading multiple-choice questions on Faraday\'s constant and electrode reactions.',
    'Preparation for next meeting: Read Section 14.5 on Standard Electrode Potentials and annotate SHE diagram.'
  ];

  const teacherReflectionPrompts = [
    'Did students successfully transition from basic $Q = I \\times t$ to 3-step Faraday mass calculations?',
    'Were the integer-friendly values effective in reducing cognitive arithmetic load for struggling learners?',
    'Did the bilingual vocabulary mat enable EAL students to explain redox half-reactions in English accurately?',
    'Action plan for next lesson: Re-teach electron stoichiometry for multivalent ions ($z = 2$ vs $z = 3$) for small intervention group.'
  ];

  // Resources
  const resources: ResourceItem[] = [
    {
      type: 'Digital',
      name: 'Semesta Edunav Curriculum Portal & Slide Decks',
      location: teacherResourceUrl || 'https://edunav.semesta.sch.id',
      url: teacherResourceUrl
    },
    {
      type: 'Digital',
      name: 'Interactive PhET Circuit & Electrolysis Simulation',
      location: studentWorksheetUrl || 'https://phet.colorado.edu',
      url: studentWorksheetUrl
    },
    {
      type: 'Printed',
      name: 'Differentiated 3-Tier Worksheet (Integer Calculations)',
      location: 'Science Resource Cabinet Room 204'
    },
    {
      type: 'Physical',
      name: 'Electrolysis Apparatus (Hoffman Voltameter, DC Power Supply, Ammeter)',
      location: 'Chemistry Lab 2, Prep Room'
    },
    {
      type: 'Textbook',
      name: syllabus.includes('0620')
        ? 'Cambridge IGCSE Chemistry Coursebook (0620), 5th Edition'
        : 'Cambridge International AS & A Level Chemistry Coursebook (9701), 3rd Edition',
      location: 'Pages 210–234'
    },
    {
      type: 'ASP/SEN',
      name: 'Individual Support Plans & Bilingual Scaffolding Mats',
      location: 'Red Tray, Teacher\'s Desk'
    }
  ];

  const currentLessonDisplay = meetingCount > 1 ? `Lesson 1 to ${meetingCount} of 12` : 'Lesson 1 of 12';

  return {
    teacherName,
    principalName,
    department,
    yearGroup,
    syllabus,
    unitTitle,
    topicTitle,
    subtopicsSummary,
    duration,
    dateStr,
    meetingCount,
    currentLessonDisplay,
    aoText,
    walt,
    wilf,
    slo,
    clilKeyTerms,
    ealLanguageSupport,
    struggledScaffolding,
    ealSupport,
    senScaffolding,
    extensionTasks,
    meetings,
    formativeAssessmentInClass,
    homeworkNextLesson,
    teacherReflectionPrompts,
    resources,
    teachingMethod,
    customLessonIdeas,
    sampleQuestions,
    headerStartColor,
    headerEndColor,
    sectionBarColor,
    headerLogoDataUri,
    teacherSignatureDataUri,
    principalSignatureDataUri,
    teacherSignedDate: dateStr,
    principalSignedDate: dateStr
  };
}
