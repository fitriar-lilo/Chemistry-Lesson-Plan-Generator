export type GradeLevel = 'Grade 10' | 'Grade 11' | 'Grade 12';

export interface ObjectiveItem {
  id: string;
  text: string;
  latex?: string;
  cambridgeCode?: string;
}

export interface SubtopicItem {
  id: string;
  title: string;
  objectives: ObjectiveItem[];
}

export interface TopicItem {
  id: string;
  title: string;
  subtopics: SubtopicItem[];
}

export interface CurriculumGrade {
  grade: GradeLevel;
  yearGroupLabel: string; // e.g. "Year 10 (SMA)" or "Year 12 (SMA)"
  syllabusName: string;   // e.g. "Cambridge IGCSE Chemistry (0620)" or "Cambridge International AS & A Level Chemistry (9701)"
  syllabusCode: string;   // "0620" or "9701"
  defaultDepartment: string;
  topics: TopicItem[];
}

export interface LessonMeeting5E {
  meetingNumber: number;
  duration: string;
  title: string;
  starterStimulus: string;
  engage: {
    time: string;
    teacherActivity: string;
    studentActivity: string;
    waltDisplay: string;
    assessment: string;
  };
  explore: {
    time: string;
    teacherActivity: string;
    studentActivity: string;
    waltDisplay: string;
    assessment: string;
  };
  explain: {
    time: string;
    teacherActivity: string;
    studentActivity: string;
    boardExamples: string;
    assessment: string;
  };
  elaborate: {
    time: string;
    teacherActivity: string;
    studentActivity: string;
    scaffoldedTasks: string;
    assessment: string;
  };
  evaluate: {
    time: string;
    teacherActivity: string;
    studentActivity: string;
    exitTicket: string;
    assessment: string;
  };
}

export interface ResourceItem {
  type: 'Digital' | 'Printed' | 'Physical' | 'Textbook' | 'ASP/SEN';
  name: string;
  location: string;
  url?: string;
}

export interface LessonPlanData {
  // Metadata
  teacherName: string;
  principalName: string;
  department: string;
  yearGroup: string;
  syllabus: string;
  unitTitle: string;
  topicTitle: string;
  subtopicsSummary: string;
  duration: string;
  dateStr: string;
  meetingCount: number;
  currentLessonDisplay: string; // e.g. "Lesson 1 to 2 of 12"

  // Cambridge Assessment Objectives
  aoText: {
    ao1: string;
    ao2: string;
    ao3?: string;
  };

  // WALT / WILF / SLO
  walt: string[];
  wilf: string[];
  slo: string[];

  // CLIL & Language
  clilKeyTerms: string;
  ealLanguageSupport: string;

  // Differentiation
  struggledScaffolding: {
    points: string[];
    resourceDesk: string;
  };
  ealSupport: string[];
  senScaffolding: string[];
  extensionTasks: string[];

  // 5E Meetings
  meetings: LessonMeeting5E[];

  // Formative Assessment & Reflection
  formativeAssessmentInClass: string[];
  homeworkNextLesson: string[];
  teacherReflectionPrompts: string[];

  // Resources
  resources: ResourceItem[];

  // Teacher custom inputs & pedagogical method
  teachingMethod: string;
  customLessonIdeas: string;
  sampleQuestions: string;

  // Styling & Branding
  headerStartColor: string;
  headerEndColor: string;
  sectionBarColor: string;
  headerLogoDataUri: string;
  teacherSignatureDataUri: string;
  principalSignatureDataUri: string;
  teacherSignedDate: string;
  principalSignedDate: string;
}
