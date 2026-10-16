/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { HeaderBar } from './components/HeaderBar';
import { ControlPanel } from './components/ControlPanel';
import { LessonPlanPreview } from './components/LessonPlanPreview';
import { CURRICULUM_DATASET } from './data/curriculumData';
import { generateLessonPlan } from './utils/lessonPlanGenerator';
import { exportLessonPlanToPdf, PdfExportProgress } from './utils/pdfExporter';
import { exportLessonPlanToDocx } from './utils/docxExporter';
import { GradeLevel, LessonPlanData } from './types';
import { SlidersHorizontal, Eye, Sparkles } from 'lucide-react';

export default function App() {
  // Document preview container reference for PDF capture
  const documentContainerRef = useRef<HTMLDivElement>(null);

  // Curriculum & Lesson State
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>('Grade 12');
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['Electrochemistry']);
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>([
    'Redox reactions revisited & Electrolysis',
    'Quantitative electrolysis'
  ]);
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([]);

  // Metadata
  const [teacherName, setTeacherName] = useState<string>('Ratna Dwi Setyorini');
  const [principalName, setPrincipalName] = useState<string>('Ahmad Nurani, S.T., M.Pd.');
  const [department, setDepartment] = useState<string>('Science / Chemistry');
  const [duration, setDuration] = useState<string>('80 min (Double Period)');
  const [meetingCount, setMeetingCount] = useState<number>(2);
  const [dateStr, setDateStr] = useState<string>('15 / 07 / 2026');

  // Pedagogy & Teacher inputs
  const [teachingMethod, setTeachingMethod] = useState<string>(
    '5E Guided Inquiry with Worked Integer Examples, Step-by-Step Scaffolding, and Multi-Tier Differentiation'
  );
  const [customLessonIdeas, setCustomLessonIdeas] = useState<string>(
    'Focus on integer constants (F = 96500 C/mol, I = 2 A, t = 100 s) before transitioning to fractional laboratory data. Provide bilingual terminology mats for EAL learners.'
  );
  const [sampleQuestions, setSampleQuestions] = useState<string>(
    '1. Calculate charge Q when I = 2 A passes for 100 s (Q = 200 C).\n2. Calculate mass of copper deposited when Q = 1930 C (0.635 g).'
  );

  // Digital Links
  const [teacherResourceUrl, setTeacherResourceUrl] = useState<string>(
    'https://edunav.semesta.sch.id/curriculum/chemistry-resources'
  );
  const [studentWorksheetUrl, setStudentWorksheetUrl] = useState<string>(
    'https://drive.google.com/semesta/chemistry-worksheets-2026'
  );

  // Styling
  const [headerStartColor, setHeaderStartColor] = useState<string>('#005C6E');
  const [headerEndColor, setHeaderEndColor] = useState<string>('#003A45');
  const [sectionBarColor, setSectionBarColor] = useState<string>('#005C6E');
  const [headerLogoDataUri, setHeaderLogoDataUri] = useState<string>('');
  const [teacherSignatureDataUri, setTeacherSignatureDataUri] = useState<string>('');
  const [principalSignatureDataUri, setPrincipalSignatureDataUri] = useState<string>('');

  // Mobile drawer toggle
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);

  // Active Lesson Plan Data
  const [lessonPlanData, setLessonPlanData] = useState<LessonPlanData>(() =>
    generateLessonPlan({
      yearGroup: 'Year 12 (SMA)',
      syllabus: 'Cambridge International AS & A Level Chemistry (9701)',
      selectedTopics: ['Electrochemistry'],
      selectedSubtopics: ['Redox reactions revisited & Electrolysis', 'Quantitative electrolysis'],
      selectedObjectives: [],
      teacherName: 'Ratna Dwi Setyorini',
      principalName: 'Ahmad Nurani, S.T., M.Pd.',
      department: 'Science / Chemistry',
      duration: '80 min (Double Period)',
      meetingCount: 2,
      dateStr: '15 / 07 / 2026',
      teachingMethod: '5E Guided Inquiry with Worked Integer Examples & Scaffolding',
      customLessonIdeas: '',
      sampleQuestions: '',
      teacherResourceUrl: 'https://edunav.semesta.sch.id/curriculum/chemistry-resources',
      studentWorksheetUrl: 'https://drive.google.com/semesta/chemistry-worksheets-2026',
      headerStartColor: '#005C6E',
      headerEndColor: '#003A45',
      sectionBarColor: '#005C6E'
    })
  );

  // Export Progress State
  const [pdfProgress, setPdfProgress] = useState<PdfExportProgress>({
    status: 'idle',
    message: '',
    progressPercent: 0
  });
  const [isCapturing, setIsCapturing] = useState<boolean>(false);

  // Generate / Refresh Plan
  const handleGeneratePlan = () => {
    const currentGrade = CURRICULUM_DATASET.find(g => g.grade === gradeLevel) || CURRICULUM_DATASET[0];
    const newPlan = generateLessonPlan({
      yearGroup: currentGrade.yearGroupLabel,
      syllabus: currentGrade.syllabusName,
      selectedTopics,
      selectedSubtopics,
      selectedObjectives,
      teacherName,
      principalName,
      department,
      duration,
      meetingCount,
      dateStr,
      teachingMethod,
      customLessonIdeas,
      sampleQuestions,
      teacherResourceUrl,
      studentWorksheetUrl,
      headerStartColor,
      headerEndColor,
      sectionBarColor,
      headerLogoDataUri,
      teacherSignatureDataUri,
      principalSignatureDataUri
    });

    setLessonPlanData(newPlan);
    setMobileDrawerOpen(false);
  };

  // Preset Handlers
  const handleApplyPreset = (preset: 'g12-electro' | 'g12-equilibria' | 'g12-kinetics' | 'g10-electro') => {
    if (preset === 'g12-electro') {
      setGradeLevel('Grade 12');
      setSelectedTopics(['Electrochemistry']);
      setSelectedSubtopics(['Redox reactions revisited & Electrolysis', 'Quantitative electrolysis']);
      setSelectedObjectives([]);
    } else if (preset === 'g12-equilibria') {
      setGradeLevel('Grade 12');
      setSelectedTopics(['Further aspect of equilibria']);
      setSelectedSubtopics(['Conjugate acids and conjugate bases', 'Buffer solutions']);
      setSelectedObjectives([]);
    } else if (preset === 'g12-kinetics') {
      setGradeLevel('Grade 12');
      setSelectedTopics(['Reaction kinetics']);
      setSelectedSubtopics(['Rate equations & Deducing reaction orders', 'Kinetics, half-life & Reaction mechanisms']);
      setSelectedObjectives([]);
    } else if (preset === 'g10-electro') {
      setGradeLevel('Grade 10');
      setSelectedTopics(['Electrochemistry (IGCSE)']);
      setSelectedSubtopics(['Electrolysis of molten and aqueous electrolytes']);
      setSelectedObjectives([]);
    }

    setTimeout(() => {
      handleGeneratePlan();
    }, 50);
  };

  // Reset to Defaults
  const handleResetDefaults = () => {
    setTeacherName('Ratna Dwi Setyorini');
    setPrincipalName('Ahmad Nurani, S.T., M.Pd.');
    setDepartment('Science / Chemistry');
    setDuration('80 min (Double Period)');
    setMeetingCount(2);
    setDateStr('15 / 07 / 2026');
    setHeaderStartColor('#005C6E');
    setHeaderEndColor('#003A45');
    setSectionBarColor('#005C6E');
    setHeaderLogoDataUri('');
    setTeacherSignatureDataUri('');
    setPrincipalSignatureDataUri('');
    handleApplyPreset('g12-electro');
  };

  // Export PDF Handler
  const handleExportPdf = async () => {
    if (!documentContainerRef.current) return;
    setIsCapturing(true);

    const safeFilename = `Semesta_${lessonPlanData.yearGroup.replace(/\s+/g, '_')}_${lessonPlanData.topicTitle.replace(/\s+/g, '_')}_Lesson_Plan.pdf`;

    try {
      await exportLessonPlanToPdf(
        documentContainerRef.current,
        safeFilename,
        progress => {
          setPdfProgress(progress);
        }
      );
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setIsCapturing(false);
      setTimeout(() => {
        setPdfProgress(prev => (prev.status === 'ready' ? { ...prev, status: 'idle' } : prev));
      }, 5000);
    }
  };

  // Export DOCX Handler
  const handleExportDocx = async () => {
    setIsCapturing(true);
    const safeFilename = `Semesta_${lessonPlanData.yearGroup.replace(/\s+/g, '_')}_${lessonPlanData.topicTitle.replace(/\s+/g, '_')}_Lesson_Plan.docx`;

    try {
      await exportLessonPlanToDocx(lessonPlanData, safeFilename);
      setPdfProgress({
        status: 'ready',
        message: 'DOCX generated and downloaded successfully.',
        progressPercent: 100
      });
    } catch (err: any) {
      console.error('DOCX export error:', err);
      setPdfProgress({
        status: 'error',
        message: `DOCX generation failed: ${err?.message || 'Error'}`,
        progressPercent: 0
      });
    } finally {
      setIsCapturing(false);
      setTimeout(() => {
        setPdfProgress(prev => (prev.status === 'ready' ? { ...prev, status: 'idle' } : prev));
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col font-sans">
      {/* Top Bar Contract (1 row, 3 zones) */}
      <HeaderBar
        onExportPdf={handleExportPdf}
        onExportDocx={handleExportDocx}
        pdfProgress={pdfProgress}
        onApplyPreset={handleApplyPreset}
        isCapturing={isCapturing}
      />

      {/* Main Workspace: Split View (Desktop Sidebar + Live Document Preview) */}
      <main className="flex-1 max-w-[1560px] w-full mx-auto p-4 sm:p-6 lg:p-8 flex gap-6">
        {/* Left Sticky Configuration Panel (Desktop) */}
        <aside className="hidden lg:block w-[400px] shrink-0 sticky top-20 h-[calc(100vh-100px)]">
          <ControlPanel
            gradeLevel={gradeLevel}
            setGradeLevel={setGradeLevel}
            selectedTopics={selectedTopics}
            setSelectedTopics={setSelectedTopics}
            selectedSubtopics={selectedSubtopics}
            setSelectedSubtopics={setSelectedSubtopics}
            selectedObjectives={selectedObjectives}
            setSelectedObjectives={setSelectedObjectives}
            teacherName={teacherName}
            setTeacherName={setTeacherName}
            principalName={principalName}
            setPrincipalName={setPrincipalName}
            department={department}
            setDepartment={setDepartment}
            duration={duration}
            setDuration={setDuration}
            meetingCount={meetingCount}
            setMeetingCount={setMeetingCount}
            dateStr={dateStr}
            setDateStr={setDateStr}
            teachingMethod={teachingMethod}
            setTeachingMethod={setTeachingMethod}
            customLessonIdeas={customLessonIdeas}
            setCustomLessonIdeas={setCustomLessonIdeas}
            sampleQuestions={sampleQuestions}
            setSampleQuestions={setSampleQuestions}
            teacherResourceUrl={teacherResourceUrl}
            setTeacherResourceUrl={setTeacherResourceUrl}
            studentWorksheetUrl={studentWorksheetUrl}
            setStudentWorksheetUrl={setStudentWorksheetUrl}
            headerStartColor={headerStartColor}
            setHeaderStartColor={setHeaderStartColor}
            headerEndColor={headerEndColor}
            setHeaderEndColor={setHeaderEndColor}
            sectionBarColor={sectionBarColor}
            setSectionBarColor={setSectionBarColor}
            headerLogoDataUri={headerLogoDataUri}
            setHeaderLogoDataUri={setHeaderLogoDataUri}
            teacherSignatureDataUri={teacherSignatureDataUri}
            setTeacherSignatureDataUri={setTeacherSignatureDataUri}
            principalSignatureDataUri={principalSignatureDataUri}
            setPrincipalSignatureDataUri={setPrincipalSignatureDataUri}
            onGeneratePlan={handleGeneratePlan}
            onResetDefaults={handleResetDefaults}
          />
        </aside>

        {/* Right Canvas: Live Official Document Preview */}
        <section className="flex-1 min-w-0 flex flex-col items-center">
          {/* Mobile Toolbar Toggle */}
          <div className="w-full max-w-[850px] mb-4 lg:hidden flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-700">
              {lessonPlanData.yearGroup} · {lessonPlanData.topicTitle}
            </span>
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 rounded-lg cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Configure Plan</span>
            </button>
          </div>

          {/* Quick Notice Banner */}
          <div className="w-full max-w-[850px] mb-3 px-4 py-2 bg-teal-900 text-teal-100 rounded-lg text-xs flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">Semesta Official Template:</span>
              <span className="hidden sm:inline">WASC Accredited · 5E Sequence · Keep-with-Next Pagination · LaTeX MathJax</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-teal-200">
              <span>{lessonPlanData.currentLessonDisplay}</span>
            </div>
          </div>

          {/* The Document */}
          <LessonPlanPreview
            data={lessonPlanData}
            onUpdateData={updater => setLessonPlanData(updater)}
            containerRef={documentContainerRef}
          />
        </section>
      </main>

      {/* Mobile Configuration Modal Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end lg:hidden">
          <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">Configure Lesson Plan</span>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="text-slate-500 hover:text-slate-800 p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-hidden p-3">
              <ControlPanel
                gradeLevel={gradeLevel}
                setGradeLevel={setGradeLevel}
                selectedTopics={selectedTopics}
                setSelectedTopics={setSelectedTopics}
                selectedSubtopics={selectedSubtopics}
                setSelectedSubtopics={setSelectedSubtopics}
                selectedObjectives={selectedObjectives}
                setSelectedObjectives={setSelectedObjectives}
                teacherName={teacherName}
                setTeacherName={setTeacherName}
                principalName={principalName}
                setPrincipalName={setPrincipalName}
                department={department}
                setDepartment={setDepartment}
                duration={duration}
                setDuration={setDuration}
                meetingCount={meetingCount}
                setMeetingCount={setMeetingCount}
                dateStr={dateStr}
                setDateStr={setDateStr}
                teachingMethod={teachingMethod}
                setTeachingMethod={setTeachingMethod}
                customLessonIdeas={customLessonIdeas}
                setCustomLessonIdeas={setCustomLessonIdeas}
                sampleQuestions={sampleQuestions}
                setSampleQuestions={setSampleQuestions}
                teacherResourceUrl={teacherResourceUrl}
                setTeacherResourceUrl={setTeacherResourceUrl}
                studentWorksheetUrl={studentWorksheetUrl}
                setStudentWorksheetUrl={setStudentWorksheetUrl}
                headerStartColor={headerStartColor}
                setHeaderStartColor={setHeaderStartColor}
                headerEndColor={headerEndColor}
                setHeaderEndColor={setHeaderEndColor}
                sectionBarColor={sectionBarColor}
                setSectionBarColor={setSectionBarColor}
                headerLogoDataUri={headerLogoDataUri}
                setHeaderLogoDataUri={setHeaderLogoDataUri}
                teacherSignatureDataUri={teacherSignatureDataUri}
                setTeacherSignatureDataUri={setTeacherSignatureDataUri}
                principalSignatureDataUri={principalSignatureDataUri}
                setPrincipalSignatureDataUri={setPrincipalSignatureDataUri}
                onGeneratePlan={handleGeneratePlan}
                onResetDefaults={handleResetDefaults}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
