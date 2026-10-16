import React, { useEffect } from 'react';
import { LessonPlanData } from '../types';
import { 
  getDefaultTeacherSignatureSvg, 
  getDefaultPrincipalSignatureSvg 
} from './SemestaLogo';
import { ExternalLink, CheckSquare } from 'lucide-react';

interface LessonPlanPreviewProps {
  data: LessonPlanData;
  onUpdateData: (updater: (prev: LessonPlanData) => LessonPlanData) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const LessonPlanPreview: React.FC<LessonPlanPreviewProps> = ({
  data,
  containerRef
}) => {
  // Re-run MathJax rendering whenever data changes
  useEffect(() => {
    if (window.MathJax && window.MathJax.typesetPromise && containerRef.current) {
      window.MathJax.typesetPromise([containerRef.current]).catch(err => {
        console.warn('MathJax typesetting error:', err);
      });
    }
  }, [data]);

  return (
    <div className="w-full flex justify-center py-4 px-1 sm:px-4">
      {/* 
        A4 Document Simulation Container
        Font: Arial, 11pt size, Line Spacing: 1.5, 2.0 cm margins
        Configured to match exact 170mm print content width.
      */}
      <div
        ref={containerRef}
        id="lesson-plan-document"
        className="bg-white text-slate-900 shadow-xl border border-slate-300 w-full max-w-[760px] p-6 sm:p-8 space-y-4 select-text"
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '10.5pt',
          lineHeight: '1.45',
          boxSizing: 'border-box'
        }}
      >
        {/* ================= BLOCK 1: DOCUMENT HEADER & TOP INFO TABLE ================= */}
        <div data-pdf-block="true" className="space-y-2.5">
          {/* Running Accreditation Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[8pt] text-slate-600 font-semibold tracking-wide border-b border-slate-200 pb-1 gap-1">
            <span>SEMESTA SCHOOL | EV-B3.1 | Sample Lesson Plans | WASC Initial Report 2026-2027</span>
            <span className="text-teal-800">Cambridge International Education | Criteria B.3, B.1, C.3</span>
          </div>

          {/* Optional Uploaded School Banner (only if uploaded) */}
          {data.headerLogoDataUri && (
            <div className="pt-0.5 flex justify-center">
              <img
                src={data.headerLogoDataUri}
                alt="School Header"
                className="max-h-12 object-contain"
              />
            </div>
          )}

          {/* Document Main Title & Subtopics */}
          <div className="pt-0.5">
            <h1 className="text-[13pt] font-extrabold text-teal-900 tracking-tight leading-tight">
              Lesson Plan : {data.syllabus} — {data.topicTitle}
            </h1>
            <p className="text-[9.5pt] font-semibold text-slate-700 mt-0.5 leading-snug">
              <span className="text-slate-900 font-bold">Subtopics: </span> {data.subtopicsSummary}
            </p>
          </div>

          {/* Top Information Bar Table */}
          <div className="overflow-hidden border border-slate-400 rounded-xs">
            <div
              className="py-1.5 px-3 text-center text-white font-bold text-[10pt] tracking-wide"
              style={{
                background: `linear-gradient(135deg, ${data.headerStartColor} 0%, ${data.headerEndColor} 100%)`
              }}
            >
              <div>{data.syllabus}</div>
              <div className="text-[9pt] font-medium opacity-95">
                {data.unitTitle}: {data.subtopicsSummary} | {data.currentLessonDisplay}
              </div>
            </div>

            <div className="grid grid-cols-4 divide-x divide-y divide-slate-300 text-[9pt] bg-slate-50/20">
              <div className="p-1.5 pl-2">
                <span className="block text-[7.5pt] font-bold text-slate-500 uppercase">Year Group</span>
                <span className="font-semibold text-slate-900">{data.yearGroup}</span>
              </div>
              <div className="p-1.5 pl-2">
                <span className="block text-[7.5pt] font-bold text-slate-500 uppercase">Lesson</span>
                <span className="font-semibold text-slate-900">{data.currentLessonDisplay}</span>
              </div>
              <div className="p-1.5 pl-2">
                <span className="block text-[7.5pt] font-bold text-slate-500 uppercase">Duration</span>
                <span className="font-semibold text-slate-900">{data.duration}</span>
              </div>
              <div className="p-1.5 pl-2">
                <span className="block text-[7.5pt] font-bold text-slate-500 uppercase">Date</span>
                <span className="font-semibold text-slate-900">{data.dateStr}</span>
              </div>

              <div className="p-1.5 pl-2">
                <span className="block text-[7.5pt] font-bold text-slate-500 uppercase">Teacher</span>
                <span className="font-bold text-slate-900">[{data.teacherName}]</span>
              </div>
              <div className="p-1.5 pl-2">
                <span className="block text-[7.5pt] font-bold text-slate-500 uppercase">Department</span>
                <span className="font-semibold text-slate-900">{data.department}</span>
              </div>
              <div className="p-1.5 pl-2">
                <span className="block text-[7.5pt] font-bold text-slate-500 uppercase">Syllabus</span>
                <span className="font-semibold text-slate-900 truncate block">{data.syllabus}</span>
              </div>
              <div className="p-1.5 pl-2 text-[8pt] leading-tight">
                <span className="block text-[7.5pt] font-bold text-slate-500 uppercase">Cambridge AOs</span>
                <p><strong className="text-teal-900">AO1:</strong> {data.aoText.ao1.slice(0, 40)}...</p>
                <p><strong className="text-teal-900">AO2:</strong> {data.aoText.ao2.slice(0, 40)}...</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BLOCK 2: WALT / WILF / SLO TABLE + CLIL ================= */}
        <div data-pdf-block="true" className="space-y-2">
          <div className="overflow-hidden border border-slate-400 rounded-xs">
            <div 
              className="grid grid-cols-3 divide-x divide-slate-300 text-white font-bold text-[9.5pt] text-center"
              style={{ backgroundColor: data.sectionBarColor }}
            >
              <div className="py-1 px-2">
                <div>WALT</div>
                <div className="text-[7.5pt] font-normal opacity-90">We Are Learning To</div>
              </div>
              <div className="py-1 px-2">
                <div>WILF</div>
                <div className="text-[7.5pt] font-normal opacity-90">What I'm Looking For</div>
              </div>
              <div className="py-1 px-2">
                <div>SLO Integration</div>
                <div className="text-[7.5pt] font-normal opacity-90">Schoolwide Learner Outcomes</div>
              </div>
            </div>

            <div className="grid grid-cols-3 divide-x divide-slate-300 text-[9pt] bg-white">
              {/* WALT Column */}
              <div className="p-2 space-y-1">
                <ul className="space-y-1 list-disc pl-3 text-slate-800 leading-snug">
                  {data.walt.map((item, idx) => (
                    <li key={idx}>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* WILF Column */}
              <div className="p-2 space-y-1 bg-slate-50/30">
                <ul className="space-y-1 text-slate-800 leading-snug">
                  {data.wilf.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-teal-700 font-bold shrink-0">✔</span>
                      <span>{item.replace(/^✔\s*/, '')}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SLO Column */}
              <div className="p-2 space-y-1">
                <p className="font-bold text-slate-900 text-[8.5pt]">
                  By the end of the lesson, the student will be able to:
                </p>
                <ul className="space-y-1 list-disc pl-3 text-slate-800 leading-snug">
                  {data.slo.map((item, idx) => (
                    <li key={idx}>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* CLIL Box */}
          <div className="py-1.5 px-2.5 border border-teal-300 bg-teal-50/40 rounded-xs text-[8.5pt] space-y-0.5 leading-snug">
            <p>
              <strong className="text-teal-900">Language Objectives (CLIL):</strong> Key terms: {data.clilKeyTerms}
            </p>
            <p className="text-slate-700">
              <strong className="text-teal-900">EAL students:</strong> {data.ealLanguageSupport}
            </p>
          </div>
        </div>

        {/* ================= BLOCK 3: DIFFERENTIATION PROVISIONS TABLE ================= */}
        <div data-pdf-block="true" className="overflow-hidden border border-slate-400 rounded-xs">
          <div className="py-1 px-2.5 bg-slate-100 border-b border-slate-300 text-[9.5pt] font-extrabold text-slate-800 tracking-wide">
            Differentiation Provisions
          </div>

          <div className="grid grid-cols-4 divide-x divide-slate-300 text-white font-bold text-[8.5pt] text-center">
            <div className="py-1 px-1 bg-sky-700">
              Struggled Scaffolding
            </div>
            <div className="py-1 px-1 bg-teal-800">
              <div>EAL Support</div>
              <div className="text-[7pt] font-normal opacity-90">English as Additional Language</div>
            </div>
            <div className="py-1 px-1 bg-amber-700">
              <div>SEN Scaffolding</div>
              <div className="text-[7pt] font-normal opacity-90">Additional Learning Needs</div>
            </div>
            <div className="py-1 px-1 bg-purple-800">
              <div>Extension Tasks</div>
              <div className="text-[7pt] font-normal opacity-90">High-Achieving Students</div>
            </div>
          </div>

          <div className="grid grid-cols-4 divide-x divide-slate-300 text-[8.5pt] bg-white leading-snug">
            {/* Col 1 */}
            <div className="p-2 space-y-1">
              <ul className="list-disc pl-3 space-y-0.5 text-slate-800">
                {data.struggledScaffolding.points.map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>
              <div className="pt-1 text-[8pt] font-semibold text-rose-800 border-t border-slate-200">
                <strong>Resource:</strong> {data.struggledScaffolding.resourceDesk}
              </div>
            </div>

            {/* Col 2 */}
            <div className="p-2 space-y-0.5">
              <ul className="list-disc pl-3 space-y-0.5 text-slate-800">
                {data.ealSupport.map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>
            </div>

            {/* Col 3 */}
            <div className="p-2 space-y-0.5">
              <ul className="list-disc pl-3 space-y-0.5 text-slate-800">
                {data.senScaffolding.map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>
            </div>

            {/* Col 4 */}
            <div className="p-2 space-y-0.5">
              <ul className="list-disc pl-3 space-y-0.5 text-slate-800">
                {data.extensionTasks.map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ================= MEETINGS: 5E & FORMATIVE ASSESSMENT BLOCKS ================= */}
        {data.meetings.map(m => (
          <React.Fragment key={m.meetingNumber}>
            {/* BLOCK: 5E INSTRUCTIONAL MODEL FOR THIS MEETING */}
            <div data-pdf-block="true" className="space-y-1.5">
              <div className="overflow-hidden border border-slate-400 rounded-xs">
                {/* Meeting Header */}
                <div
                  className="py-1 px-2.5 text-white font-extrabold text-[9.5pt] flex items-center justify-between"
                  style={{ backgroundColor: data.sectionBarColor }}
                >
                  <span>{m.title}</span>
                  <span className="text-[8pt] font-medium bg-black/25 px-1.5 py-0.5 rounded">
                    {m.duration}
                  </span>
                </div>

                {/* Starter / Stimulus Box */}
                <div className="py-1 px-2.5 bg-amber-50/60 border-b border-slate-300 text-[8.5pt] text-slate-800 leading-snug">
                  <span className="font-bold text-amber-900">Starter / Stimulus: </span>
                  <span>{m.starterStimulus}</span>
                </div>

                {/* Table Header */}
                <div 
                  className="grid grid-cols-12 divide-x divide-slate-300 text-white font-bold text-[8.5pt] text-center"
                  style={{ backgroundColor: data.headerStartColor }}
                >
                  <div className="col-span-2 py-1 px-1">Phase</div>
                  <div className="col-span-1 py-1 px-1">Time</div>
                  <div className="col-span-7 py-1 px-2 text-left">Teacher and Student Activity</div>
                  <div className="col-span-2 py-1 px-1">Assessment / SLO</div>
                </div>

                {/* 5 Phases */}
                <div className="divide-y divide-slate-300 text-[8.5pt] bg-white leading-snug">
                  {/* Engage */}
                  <div className="grid grid-cols-12 divide-x divide-slate-300 items-stretch">
                    <div className="col-span-2 p-1.5 font-bold text-teal-900 bg-slate-50 flex items-center justify-center">
                      Engage
                    </div>
                    <div className="col-span-1 p-1.5 text-center text-slate-600 flex items-center justify-center font-medium">
                      {m.engage.time}
                    </div>
                    <div className="col-span-7 p-1.5 space-y-0.5 text-slate-800">
                      <p><strong className="text-slate-900">Teacher:</strong> {m.engage.teacherActivity}</p>
                      <p><strong className="text-slate-900">Students:</strong> {m.engage.studentActivity}</p>
                      <p className="text-[7.5pt] italic text-teal-800 font-semibold">{m.engage.waltDisplay}</p>
                    </div>
                    <div className="col-span-2 p-1.5 text-[8pt] text-slate-700 flex flex-col justify-center space-y-0.5 bg-slate-50/40">
                      {m.engage.assessment.split('\n').map((a, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <span className="text-teal-700">▶</span> {a.replace(/^[▶•\s]+/, '')}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Explore */}
                  <div className="grid grid-cols-12 divide-x divide-slate-300 items-stretch">
                    <div className="col-span-2 p-1.5 font-bold text-teal-900 bg-slate-50 flex items-center justify-center">
                      Explore
                    </div>
                    <div className="col-span-1 p-1.5 text-center text-slate-600 flex items-center justify-center font-medium">
                      {m.explore.time}
                    </div>
                    <div className="col-span-7 p-1.5 space-y-0.5 text-slate-800">
                      <p><strong className="text-slate-900">Teacher:</strong> {m.explore.teacherActivity}</p>
                      <p><strong className="text-slate-900">Students:</strong> {m.explore.studentActivity}</p>
                      <p className="text-[7.5pt] italic text-teal-800 font-semibold">{m.explore.waltDisplay}</p>
                    </div>
                    <div className="col-span-2 p-1.5 text-[8pt] text-slate-700 flex flex-col justify-center space-y-0.5 bg-slate-50/40">
                      {m.explore.assessment.split('\n').map((a, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <span className="text-teal-700">▶</span> {a.replace(/^[▶•\s]+/, '')}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Explain */}
                  <div className="grid grid-cols-12 divide-x divide-slate-300 items-stretch">
                    <div className="col-span-2 p-1.5 font-bold text-teal-900 bg-slate-50 flex items-center justify-center">
                      Explain
                    </div>
                    <div className="col-span-1 p-1.5 text-center text-slate-600 flex items-center justify-center font-medium">
                      {m.explain.time}
                    </div>
                    <div className="col-span-7 p-1.5 space-y-0.5 text-slate-800">
                      <p><strong className="text-slate-900">Teacher:</strong> {m.explain.teacherActivity}</p>
                      <p><strong className="text-slate-900">Students:</strong> {m.explain.studentActivity}</p>
                      <div className="p-1 bg-slate-100 rounded-xs text-[8pt] border border-slate-200">
                        <strong>Board:</strong> {m.explain.boardExamples}
                      </div>
                    </div>
                    <div className="col-span-2 p-1.5 text-[8pt] text-slate-700 flex flex-col justify-center space-y-0.5 bg-slate-50/40">
                      {m.explain.assessment.split('\n').map((a, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <span className="text-teal-700">▶</span> {a.replace(/^[▶•\s]+/, '')}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Elaborate */}
                  <div className="grid grid-cols-12 divide-x divide-slate-300 items-stretch">
                    <div className="col-span-2 p-1.5 font-bold text-amber-800 bg-amber-50/30 flex items-center justify-center">
                      Elaborate
                    </div>
                    <div className="col-span-1 p-1.5 text-center text-slate-600 flex items-center justify-center font-medium">
                      {m.elaborate.time}
                    </div>
                    <div className="col-span-7 p-1.5 space-y-0.5 text-slate-800">
                      <p><strong className="text-slate-900">Teacher:</strong> {m.elaborate.teacherActivity}</p>
                      <p><strong className="text-slate-900">Students:</strong> {m.elaborate.studentActivity}</p>
                      <p className="text-[8pt] text-slate-600 whitespace-pre-line font-medium">
                        {m.elaborate.scaffoldedTasks}
                      </p>
                    </div>
                    <div className="col-span-2 p-1.5 text-[8pt] text-slate-700 flex flex-col justify-center space-y-0.5 bg-slate-50/40">
                      {m.elaborate.assessment.split('\n').map((a, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <span className="text-amber-700">▶</span> {a.replace(/^[▶•\s]+/, '')}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Evaluate */}
                  <div className="grid grid-cols-12 divide-x divide-slate-300 items-stretch">
                    <div className="col-span-2 p-1.5 font-bold text-emerald-800 bg-emerald-50/30 flex items-center justify-center">
                      Evaluate
                    </div>
                    <div className="col-span-1 p-1.5 text-center text-slate-600 flex items-center justify-center font-medium">
                      {m.evaluate.time}
                    </div>
                    <div className="col-span-7 p-1.5 space-y-0.5 text-slate-800">
                      <p><strong className="text-slate-900">Teacher:</strong> {m.evaluate.teacherActivity}</p>
                      <p><strong className="text-slate-900">Students:</strong> {m.evaluate.studentActivity}</p>
                      <p className="text-[8pt] font-semibold text-teal-800">{m.evaluate.exitTicket}</p>
                    </div>
                    <div className="col-span-2 p-1.5 text-[8pt] text-slate-700 flex flex-col justify-center space-y-0.5 bg-slate-50/40">
                      {m.evaluate.assessment.split('\n').map((a, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <span className="text-emerald-700">▶</span> {a.replace(/^[▶•\s]+/, '')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BLOCK: FORMATIVE ASSESSMENT & REFLECTION FOR THIS MEETING */}
            <div data-pdf-block="true" className="overflow-hidden border border-slate-400 rounded-xs">
              <div className="py-1 px-2.5 bg-slate-100 border-b border-slate-300 text-[9.5pt] font-extrabold text-slate-800">
                Formative Assessment, Homework, and Teacher Reflection (Meeting {m.meetingNumber})
              </div>
              <div 
                className="grid grid-cols-3 divide-x divide-slate-300 text-white font-bold text-[8.5pt] text-center"
                style={{ backgroundColor: data.headerStartColor }}
              >
                <div className="py-1 px-1">Formative Assessment (in class)</div>
                <div className="py-1 px-1">Homework / Next Lesson (outside class)</div>
                <div className="py-1 px-1">Teacher Post-Lesson Reflection</div>
              </div>
              <div className="grid grid-cols-3 divide-x divide-slate-300 text-[8.5pt] bg-white leading-snug">
                <div className="p-2 space-y-1">
                  <ul className="list-disc pl-3 space-y-0.5 text-slate-800">
                    {data.formativeAssessmentInClass.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-2 space-y-1">
                  <ul className="list-disc pl-3 space-y-0.5 text-slate-800">
                    {data.homeworkNextLesson.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-2 space-y-1 text-slate-700 italic">
                  <ul className="list-disc pl-3 space-y-0.5">
                    {data.teacherReflectionPrompts.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}

        {/* ================= BLOCK: RESOURCE LIST TABLE ================= */}
        <div data-pdf-block="true" className="overflow-hidden border border-slate-400 rounded-xs">
          <div className="py-1 px-2.5 bg-sky-700 text-white font-extrabold text-[9.5pt]">
            Resource List
          </div>
          <div className="grid grid-cols-12 divide-x divide-slate-300 text-[8pt] font-bold bg-slate-100 border-b border-slate-300">
            <div className="col-span-2 py-1 px-2">Type</div>
            <div className="col-span-6 py-1 px-2">Resource Name</div>
            <div className="col-span-4 py-1 px-2">Location / Access</div>
          </div>
          <div className="divide-y divide-slate-200 text-[8.5pt] bg-white leading-snug">
            {data.resources.map((res, i) => (
              <div key={i} className="grid grid-cols-12 divide-x divide-slate-200 items-center">
                <div className="col-span-2 py-1 px-2 font-semibold text-slate-700">
                  {res.type}
                </div>
                <div className="col-span-6 py-1 px-2 text-slate-900">
                  {res.name}
                </div>
                <div className="col-span-4 py-1 px-2 text-teal-800 flex items-center gap-1 truncate">
                  {res.url ? (
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center gap-1"
                    >
                      <span className="truncate">{res.location}</span>
                      <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                    </a>
                  ) : (
                    <span className="truncate">{res.location}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= BLOCK: STQS & SIGN-OFF TABLE ================= */}
        <div data-pdf-block="true" className="space-y-2">
          {/* STQS Alignment Banner */}
          <div className="py-1 px-2 bg-slate-50 border border-slate-300 text-[8pt] text-slate-700 rounded-xs leading-snug">
            <strong className="text-slate-900">STQS Alignment:</strong> Domain 1 (Cambridge AOs) | Domain 2 (WALT/WILF, three-tier differentiation) | Domain 4 (5E model, higher-order questioning) | Domain 5 (Five embedded formative assessment points)
          </div>

          {/* Sign-off Table */}
          <div className="overflow-hidden border border-slate-400 rounded-xs">
            <div 
              className="grid grid-cols-2 divide-x divide-slate-300 text-white font-bold text-[9pt] text-center"
              style={{ backgroundColor: data.headerStartColor }}
            >
              <div className="py-1 px-1">Teacher & Preparation</div>
              <div className="py-1 px-1">Head of Department — Science</div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-slate-300 text-[8.5pt] bg-white">
              {/* Teacher Sign-off */}
              <div className="p-2 space-y-1 flex flex-col justify-between min-h-[90px]">
                <div>
                  <p className="font-bold text-slate-900">{data.teacherName}</p>
                  <p className="text-[7.5pt] text-slate-500">Chemistry Lead Teacher</p>
                </div>
                <div className="h-10 flex items-center">
                  {data.teacherSignatureDataUri ? (
                    <img src={data.teacherSignatureDataUri} alt="Teacher Sig" className="max-h-9 object-contain" />
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: getDefaultTeacherSignatureSvg(data.teacherName) }} className="h-9" />
                  )}
                </div>
                <div className="text-[7.5pt] text-slate-600 border-t border-slate-200 pt-0.5">
                  Date: {data.teacherSignedDate}
                </div>
              </div>

              {/* HoD Sign-off */}
              <div className="p-2 space-y-1 flex flex-col justify-between min-h-[90px]">
                <div>
                  <p className="font-bold text-slate-900">HoD Science Review</p>
                  <p className="text-[7.5pt] text-slate-500">Ratna Dwi Setyorini</p>
                </div>
                <div className="flex items-center gap-3 text-[8pt] font-semibold text-slate-700 my-auto">
                  <span className="flex items-center gap-1 text-teal-800">
                    <CheckSquare className="w-3.5 h-3.5 text-teal-700" /> Approved
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <span className="w-3.5 h-3.5 border border-slate-300 rounded-xs inline-block" /> Feedback provided
                  </span>
                </div>
                <div className="text-[7.5pt] text-slate-600 border-t border-slate-200 pt-0.5">
                  Date: {data.teacherSignedDate}
                </div>
              </div>
            </div>

            {/* Principal Approval Row */}
            <div className="py-2 px-2.5 bg-slate-50/80 border-t border-slate-300 text-[8.5pt] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <p className="font-bold text-slate-900">Principal: {data.principalName}</p>
                <p className="text-[8pt] text-slate-600">Submitted to Edunav: {data.principalSignedDate}</p>
                <p className="text-[7.5pt] text-emerald-800 font-semibold">Status: Verified for WASC Accreditation & Cambridge Inspection</p>
              </div>
              <div className="h-10 flex items-center pr-2">
                {data.principalSignatureDataUri ? (
                  <img src={data.principalSignatureDataUri} alt="Principal Sig" className="max-h-9 object-contain" />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: getDefaultPrincipalSignatureSvg(data.principalName) }} className="h-9" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Running Accreditation Footer on preview */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[7.5pt] text-slate-500 font-medium">
          <span>Cambridge International Education | WASC Evidence | Criteria B.3, B.1, C.3</span>
          <span>Semesta School Semarang</span>
        </div>
      </div>
    </div>
  );
};
