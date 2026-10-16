import React, { useState, useId } from 'react';
import { CURRICULUM_DATASET } from '../data/curriculumData';
import { GradeLevel, LessonPlanData } from '../types';
import { 
  Settings2, 
  BookOpen, 
  Palette, 
  FileEdit, 
  Upload, 
  RefreshCcw, 
  Check, 
  Link2, 
  UserCheck, 
  Calendar, 
  Clock, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface ControlPanelProps {
  gradeLevel: GradeLevel;
  setGradeLevel: (grade: GradeLevel) => void;
  selectedTopics: string[];
  setSelectedTopics: (topics: string[]) => void;
  selectedSubtopics: string[];
  setSelectedSubtopics: (subtopics: string[]) => void;
  selectedObjectives: string[];
  setSelectedObjectives: (objs: string[]) => void;
  
  teacherName: string;
  setTeacherName: (val: string) => void;
  principalName: string;
  setPrincipalName: (val: string) => void;
  department: string;
  setDepartment: (val: string) => void;
  duration: string;
  setDuration: (val: string) => void;
  meetingCount: number;
  setMeetingCount: (val: number) => void;
  dateStr: string;
  setDateStr: (val: string) => void;

  teachingMethod: string;
  setTeachingMethod: (val: string) => void;
  customLessonIdeas: string;
  setCustomLessonIdeas: (val: string) => void;
  sampleQuestions: string;
  setSampleQuestions: (val: string) => void;

  teacherResourceUrl: string;
  setTeacherResourceUrl: (val: string) => void;
  studentWorksheetUrl: string;
  setStudentWorksheetUrl: (val: string) => void;

  headerStartColor: string;
  setHeaderStartColor: (val: string) => void;
  headerEndColor: string;
  setHeaderEndColor: (val: string) => void;
  sectionBarColor: string;
  setSectionBarColor: (val: string) => void;

  headerLogoDataUri: string;
  setHeaderLogoDataUri: (val: string) => void;
  teacherSignatureDataUri: string;
  setTeacherSignatureDataUri: (val: string) => void;
  principalSignatureDataUri: string;
  setPrincipalSignatureDataUri: (val: string) => void;

  onGeneratePlan: () => void;
  onResetDefaults: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  gradeLevel,
  setGradeLevel,
  selectedTopics,
  setSelectedTopics,
  selectedSubtopics,
  setSelectedSubtopics,
  selectedObjectives,
  setSelectedObjectives,
  teacherName,
  setTeacherName,
  principalName,
  setPrincipalName,
  department,
  setDepartment,
  duration,
  setDuration,
  meetingCount,
  setMeetingCount,
  dateStr,
  setDateStr,
  teachingMethod,
  setTeachingMethod,
  customLessonIdeas,
  setCustomLessonIdeas,
  sampleQuestions,
  setSampleQuestions,
  teacherResourceUrl,
  setTeacherResourceUrl,
  studentWorksheetUrl,
  setStudentWorksheetUrl,
  headerStartColor,
  setHeaderStartColor,
  headerEndColor,
  setHeaderEndColor,
  sectionBarColor,
  setSectionBarColor,
  headerLogoDataUri,
  setHeaderLogoDataUri,
  teacherSignatureDataUri,
  setTeacherSignatureDataUri,
  principalSignatureDataUri,
  setPrincipalSignatureDataUri,
  onGeneratePlan,
  onResetDefaults
}) => {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'meta' | 'pedagogy' | 'media'>('curriculum');
  const [searchFilter, setSearchFilter] = useState('');
  const logoInputId = useId();
  const teacherSigInputId = useId();
  const principalSigInputId = useId();

  // Find active curriculum branch
  const currentGradeData = CURRICULUM_DATASET.find(g => g.grade === gradeLevel) || CURRICULUM_DATASET[0];

  // Helper for image upload with FileReader.readAsDataURL
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (dataUri: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setter(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle helpers for multi-select
  const toggleTopic = (title: string) => {
    if (selectedTopics.includes(title)) {
      if (selectedTopics.length > 1) {
        setSelectedTopics(selectedTopics.filter(t => t !== title));
      }
    } else {
      setSelectedTopics([...selectedTopics, title]);
    }
  };

  const toggleSubtopic = (title: string) => {
    if (selectedSubtopics.includes(title)) {
      if (selectedSubtopics.length > 1) {
        setSelectedSubtopics(selectedSubtopics.filter(s => s !== title));
      }
    } else {
      setSelectedSubtopics([...selectedSubtopics, title]);
    }
  };

  const toggleObjective = (text: string) => {
    if (selectedObjectives.includes(text)) {
      setSelectedObjectives(selectedObjectives.filter(o => o !== text));
    } else {
      setSelectedObjectives([...selectedObjectives, text]);
    }
  };

  // Active subtopics for the selected topics
  const availableSubtopics = currentGradeData.topics
    .filter(t => selectedTopics.includes(t.title))
    .flatMap(t => t.subtopics);

  // Active objectives
  const availableObjectives = availableSubtopics
    .filter(s => selectedSubtopics.includes(s.title))
    .flatMap(s => s.objectives);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col h-full overflow-hidden">
      {/* Panel Tab Navigation */}
      <div className="flex border-b border-slate-200 bg-slate-50/70 p-1.5 gap-1 shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab('curriculum')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'curriculum'
              ? 'bg-white text-teal-800 shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Curriculum</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('meta')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'meta'
              ? 'bg-white text-teal-800 shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Settings2 className="w-3.5 h-3.5" />
          <span>Lesson Meta</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('pedagogy')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'pedagogy'
              ? 'bg-white text-teal-800 shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileEdit className="w-3.5 h-3.5" />
          <span>Pedagogy</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('media')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'media'
              ? 'bg-white text-teal-800 shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Styling</span>
        </button>
      </div>

      {/* Tab Body */}
      <div className="p-4 overflow-y-auto flex-1 space-y-4 text-xs">
        {/* ================= CURRICULUM TAB ================= */}
        {activeTab === 'curriculum' && (
          <div className="space-y-4">
            {/* Grade Tier Selector */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Target Cambridge Syllabus & Grade:
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-lg">
                {(['Grade 12', 'Grade 10', 'Grade 11'] as GradeLevel[]).map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      setGradeLevel(g);
                      const targetData = CURRICULUM_DATASET.find(c => c.grade === g) || CURRICULUM_DATASET[0];
                      setSelectedTopics([targetData.topics[0].title]);
                      setSelectedSubtopics([targetData.topics[0].subtopics[0].title]);
                      setSelectedObjectives([]);
                    }}
                    className={`py-1.5 px-2 rounded-md font-bold text-center transition-all cursor-pointer ${
                      gradeLevel === g
                        ? 'bg-teal-800 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {g === 'Grade 12' ? 'Year 12 (AS/A)' : g === 'Grade 10' ? 'Year 10 (IGCSE)' : 'Year 11 (AS)'}
                  </button>
                ))}
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                {currentGradeData.syllabusName} ({currentGradeData.syllabusCode})
              </p>
            </div>

            {/* Topic Selector (Multi-select enabled) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-bold text-slate-700">
                  Select Topics (Multi-choice):
                </label>
                <span className="text-[10px] text-teal-700 font-semibold">
                  {selectedTopics.length} selected
                </span>
              </div>
              <div className="space-y-1 max-h-36 overflow-y-auto border border-slate-200 rounded-lg p-1.5 bg-slate-50/50">
                {currentGradeData.topics.map(t => {
                  const isChecked = selectedTopics.includes(t.title);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => toggleTopic(t.title)}
                      className={`w-full text-left p-2 rounded-md transition-all flex items-center justify-between cursor-pointer ${
                        isChecked
                          ? 'bg-teal-50 border border-teal-300 text-teal-900 font-bold'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-100'
                      }`}
                    >
                      <span>{t.title}</span>
                      {isChecked && <Check className="w-3.5 h-3.5 text-teal-700 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subtopics Selector */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-bold text-slate-700">
                  Subtopics (Multi-choice):
                </label>
                <span className="text-[10px] text-teal-700 font-semibold">
                  {selectedSubtopics.length} selected
                </span>
              </div>
              <div className="space-y-1 max-h-40 overflow-y-auto border border-slate-200 rounded-lg p-1.5 bg-slate-50/50">
                {availableSubtopics.map(sub => {
                  const isChecked = selectedSubtopics.includes(sub.title);
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => toggleSubtopic(sub.title)}
                      className={`w-full text-left p-2 rounded-md transition-all flex items-center justify-between cursor-pointer ${
                        isChecked
                          ? 'bg-teal-50 border border-teal-300 text-teal-900 font-semibold'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-100'
                      }`}
                    >
                      <span className="truncate pr-2">{sub.title}</span>
                      {isChecked && <Check className="w-3.5 h-3.5 text-teal-700 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Learning Objectives Selector */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-bold text-slate-700">
                  Cambridge Learning Objectives:
                </label>
                <span className="text-[10px] text-teal-700 font-semibold">
                  {selectedObjectives.length} custom chosen
                </span>
              </div>
              <div className="space-y-1 max-h-48 overflow-y-auto border border-slate-200 rounded-lg p-2 bg-slate-50/50">
                {availableObjectives.map(obj => {
                  const isChecked = selectedObjectives.includes(obj.text);
                  return (
                    <div
                      key={obj.id}
                      onClick={() => toggleObjective(obj.text)}
                      className={`p-2 rounded-md transition-all cursor-pointer border flex items-start gap-2 ${
                        isChecked
                          ? 'bg-teal-50/80 border-teal-400 text-teal-950 font-medium'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 rounded text-teal-700 focus:ring-teal-500 shrink-0"
                      />
                      <div className="space-y-0.5">
                        <p className="text-[11px] leading-tight">{obj.text}</p>
                        {obj.latex && (
                          <span className="inline-block px-1.5 py-0.5 font-mono text-[10px] bg-slate-100 text-slate-700 rounded border border-slate-200">
                            ${obj.latex}$
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= LESSON META TAB ================= */}
        {activeTab === 'meta' && (
          <div className="space-y-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Teacher Name:
              </label>
              <input
                type="text"
                value={teacherName}
                onChange={e => setTeacherName(e.target.value)}
                placeholder="e.g. Ratna Dwi Setyorini"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Principal Name:
              </label>
              <input
                type="text"
                value={principalName}
                onChange={e => setPrincipalName(e.target.value)}
                placeholder="e.g. Ahmad Nurani, S.T., M.Pd."
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Department:
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Duration per Session:
                </label>
                <select
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-xs bg-white"
                >
                  <option value="80 min (Double Period)">80 min (Double Period)</option>
                  <option value="40 min (Single Period)">40 min (Single Period)</option>
                  <option value="90 min (Extended Lab)">90 min (Extended Lab)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Number of Meetings (1–8):
                </label>
                <select
                  value={meetingCount}
                  onChange={e => setMeetingCount(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-xs bg-white"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Meeting' : 'Meetings'} (5E Sequence)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Date / Date Range:
                </label>
                <input
                  type="text"
                  value={dateStr}
                  onChange={e => setDateStr(e.target.value)}
                  placeholder="15 / 07 / 2026"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-xs"
                />
              </div>
            </div>

            {/* Resource URLs */}
            <div className="pt-2 border-t border-slate-200 space-y-2">
              <span className="font-bold text-slate-700 block">
                Official Links & Digital Materials:
              </span>
              <div>
                <label className="block text-slate-600 mb-0.5">
                  Teacher Resources Portal URL:
                </label>
                <input
                  type="url"
                  value={teacherResourceUrl}
                  onChange={e => setTeacherResourceUrl(e.target.value)}
                  placeholder="https://edunav.semesta.sch.id/..."
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-0.5">
                  Student Activities / Worksheets URL:
                </label>
                <input
                  type="url"
                  value={studentWorksheetUrl}
                  onChange={e => setStudentWorksheetUrl(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= PEDAGOGY TAB ================= */}
        {activeTab === 'pedagogy' && (
          <div className="space-y-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Teaching Method & Pedagogical Strategy:
              </label>
              <textarea
                rows={3}
                value={teachingMethod}
                onChange={e => setTeachingMethod(e.target.value)}
                placeholder="e.g. 5E Guided Inquiry with Worked Integer Examples, POE (Predict-Observe-Explain), Think-Pair-Share, and tiered differentiation."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Custom Lesson Ideas & Learning Scenario:
              </label>
              <textarea
                rows={3}
                value={customLessonIdeas}
                onChange={e => setCustomLessonIdeas(e.target.value)}
                placeholder="Write specific teacher notes, classroom hooks, lab safety precautions, or tailored analogies..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Custom Sample Questions & Worked Calculations:
              </label>
              <textarea
                rows={3}
                value={sampleQuestions}
                onChange={e => setSampleQuestions(e.target.value)}
                placeholder="e.g. Current I = 3A flows for t = 100s. Calculate Q in Coulombs ($Q = 300C$). Then find mass of Ag deposited ($Mr = 108$)."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-xs"
              />
            </div>

            <div className="p-2.5 bg-amber-50/80 border border-amber-200 rounded-lg text-amber-900">
              <span className="font-bold flex items-center gap-1 mb-1">
                <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                Scaffolding Strategy Note:
              </span>
              <p className="text-[11px] leading-relaxed">
                As per Semesta School standards, calculations default to friendly integer constants (F = 96500 C/mol, I = 2 A, t = 100 s) before introducing multi-step Cambridge examination numbers.
              </p>
            </div>
          </div>
        )}

        {/* ================= STYLING & MEDIA TAB ================= */}
        {activeTab === 'media' && (
          <div className="space-y-3">
            {/* Color Customizer */}
            <div className="space-y-2">
              <label className="font-bold text-slate-700 block">
                Table Header Gradient & Bar Colors:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[11px] text-slate-600 block mb-1">Gradient Start:</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={headerStartColor}
                      onChange={e => setHeaderStartColor(e.target.value)}
                      className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
                    />
                    <span className="font-mono text-[11px]">{headerStartColor}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-slate-600 block mb-1">Gradient End:</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={headerEndColor}
                      onChange={e => setHeaderEndColor(e.target.value)}
                      className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
                    />
                    <span className="font-mono text-[11px]">{headerEndColor}</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-600 block mb-1">Section Header Bar Color:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={sectionBarColor}
                    onChange={e => setSectionBarColor(e.target.value)}
                    className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
                  />
                  <span className="font-mono text-[11px]">{sectionBarColor}</span>
                </div>
              </div>
            </div>

            {/* Upload Header Image */}
            <div className="pt-2 border-t border-slate-200">
              <label htmlFor={logoInputId} className="block font-bold text-slate-700 mb-1">
                School Header Logo / Crest:
              </label>
              <div className="flex items-center gap-2">
                <label htmlFor={logoInputId} className="flex-1 py-1.5 px-3 border border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer text-center text-xs text-slate-700 font-medium flex items-center justify-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-slate-500" />
                  <span>Upload School PNG</span>
                </label>
                <input
                  id={logoInputId}
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileUpload(e, setHeaderLogoDataUri)}
                  className="hidden"
                />
                {headerLogoDataUri && (
                  <button
                    type="button"
                    onClick={() => setHeaderLogoDataUri('')}
                    className="px-2 py-1.5 text-xs text-rose-700 hover:bg-rose-50 rounded border border-rose-200 cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Signatures */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <label className="font-bold text-slate-700 block">
                Signatures Upload (PNG/JPG):
              </label>

              <div>
                <span className="text-[11px] text-slate-600 block mb-1">Teacher Signature:</span>
                <div className="flex items-center gap-2">
                  <label htmlFor={teacherSigInputId} className="flex-1 py-1.5 px-3 border border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer text-center text-xs text-slate-700 flex items-center justify-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-slate-500" />
                    <span>Upload Teacher Sig</span>
                  </label>
                  <input
                    id={teacherSigInputId}
                    type="file"
                    accept="image/*"
                    onChange={e => handleFileUpload(e, setTeacherSignatureDataUri)}
                    className="hidden"
                  />
                  {teacherSignatureDataUri && (
                    <button
                      type="button"
                      onClick={() => setTeacherSignatureDataUri('')}
                      className="px-2 py-1 text-xs text-rose-700 hover:bg-rose-50 rounded border border-rose-200 cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-600 block mb-1">Principal Signature:</span>
                <div className="flex items-center gap-2">
                  <label htmlFor={principalSigInputId} className="flex-1 py-1.5 px-3 border border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer text-center text-xs text-slate-700 flex items-center justify-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-slate-500" />
                    <span>Upload Principal Sig</span>
                  </label>
                  <input
                    id={principalSigInputId}
                    type="file"
                    accept="image/*"
                    onChange={e => handleFileUpload(e, setPrincipalSignatureDataUri)}
                    className="hidden"
                  />
                  {principalSignatureDataUri && (
                    <button
                      type="button"
                      onClick={() => setPrincipalSignatureDataUri('')}
                      className="px-2 py-1 text-xs text-rose-700 hover:bg-rose-50 rounded border border-rose-200 cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2 shrink-0">
        <button
          type="button"
          onClick={onResetDefaults}
          className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>

        <button
          type="button"
          onClick={onGeneratePlan}
          className="flex-1 py-2 px-4 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 active:scale-98 rounded-lg shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Apply & Rebuild Plan</span>
        </button>
      </div>
    </div>
  );
};
