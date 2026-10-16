import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
  WidthType,
  AlignmentType,
  BorderStyle,
  Header,
  Footer,
  ShadingType
} from 'docx';
import { LessonPlanData } from '../types';
import { saveBlobFile } from './pdfExporter';

export async function exportLessonPlanToDocx(
  data: LessonPlanData,
  filename: string = 'Semesta_Chemistry_Lesson_Plan.docx'
): Promise<void> {
  const primaryColor = data.headerStartColor ? data.headerStartColor.replace('#', '') : '005C6E';
  const accentColor = 'E5A93C';
  const tableBorderColor = 'CBD5E1';

  // Common styles
  const defaultFont = 'Arial';
  const defaultSize = 22; // 11pt (half-points in docx)
  const headerSize = 24;  // 12pt
  const lineSpacing = 360; // 1.5 line spacing (240 * 1.5)

  const cellBorder = {
    top: { style: BorderStyle.SINGLE, size: 4, color: tableBorderColor },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: tableBorderColor },
    left: { style: BorderStyle.SINGLE, size: 4, color: tableBorderColor },
    right: { style: BorderStyle.SINGLE, size: 4, color: tableBorderColor }
  };

  const createCell = (text: string | Paragraph[], widthPercent: number, isHeader = false, customBg?: string): TableCell => {
    let paragraphs: Paragraph[] = [];
    if (typeof text === 'string') {
      paragraphs = [
        new Paragraph({
          children: [
            new TextRun({
              text,
              font: defaultFont,
              size: isHeader ? 20 : defaultSize,
              bold: isHeader,
              color: isHeader ? 'FFFFFF' : '0F172A'
            })
          ],
          spacing: { line: lineSpacing }
        })
      ];
    } else {
      paragraphs = text;
    }

    return new TableCell({
      width: { size: widthPercent, type: WidthType.PERCENTAGE },
      borders: cellBorder,
      shading: customBg ? { fill: customBg, type: ShadingType.CLEAR } : (isHeader ? { fill: primaryColor, type: ShadingType.CLEAR } : undefined),
      margins: { top: 120, bottom: 120, left: 140, right: 140 },
      children: paragraphs
    });
  };

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: defaultFont,
            size: defaultSize
          },
          paragraph: {
            spacing: { line: lineSpacing }
          }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1134,    // 2.0 cm (1134 twips)
              bottom: 1134, // 2.0 cm
              left: 1134,   // 2.0 cm
              right: 1134   // 2.0 cm
            }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: 'SEMESTA SCHOOL | EV-B3.1 | Sample Lesson Plans | WASC Initial Report 2026-2027',
                    font: defaultFont,
                    size: 16,
                    color: '64748B'
                  })
                ]
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: 'Cambridge International Education | WASC Evidence | Criteria B.3, B.1, C.3',
                    font: defaultFont,
                    size: 16,
                    color: '64748B'
                  })
                ]
              })
            ]
          })
        },
        children: [
          // Title
          new Paragraph({
            spacing: { before: 100, after: 120, line: lineSpacing },
            children: [
              new TextRun({
                text: `Lesson Plan : ${data.syllabus} — ${data.topicTitle}`,
                font: defaultFont,
                size: 26,
                bold: true,
                color: primaryColor
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 180, line: lineSpacing },
            children: [
              new TextRun({
                text: `Subtopics: ${data.subtopicsSummary}`,
                font: defaultFont,
                size: defaultSize,
                italics: true,
                color: '334155'
              })
            ]
          }),

          // Top Information Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    columnSpan: 4,
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    shading: { fill: primaryColor, type: ShadingType.CLEAR },
                    margins: { top: 140, bottom: 140, left: 160, right: 160 },
                    borders: cellBorder,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: `${data.syllabus} — ${data.unitTitle} | ${data.currentLessonDisplay}`,
                            font: defaultFont,
                            size: 22,
                            bold: true,
                            color: 'FFFFFF'
                          })
                        ]
                      })
                    ]
                  })
                ]
              }),
              new TableRow({
                children: [
                  createCell(`Year Group\n${data.yearGroup}`, 25),
                  createCell(`Lesson\n${data.currentLessonDisplay}`, 25),
                  createCell(`Duration\n${data.duration}`, 25),
                  createCell(`Date\n${data.dateStr}`, 25)
                ]
              }),
              new TableRow({
                children: [
                  createCell(`Teacher\n${data.teacherName}`, 25),
                  createCell(`Department\n${data.department}`, 25),
                  createCell(`Syllabus\n${data.syllabus}`, 25),
                  createCell(`Cambridge AOs\nAO1: Knowledge & concepts\nAO2: Problem solving\nAO3: Experimental`, 25)
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 200 } }),

          // WALT / WILF / SLO Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell('WALT\nWe Are Learning To', 33, true),
                  createCell("WILF\nWhat I'm Looking For", 34, true),
                  createCell('SLO Integration\nSchoolwide Learner Outcomes', 33, true)
                ]
              }),
              new TableRow({
                children: [
                  createCell(
                    data.walt.map(
                      w =>
                        new Paragraph({
                          children: [new TextRun({ text: `• ${w}`, font: defaultFont, size: defaultSize })],
                          spacing: { after: 100, line: lineSpacing }
                        })
                    ),
                    33
                  ),
                  createCell(
                    data.wilf.map(
                      wi =>
                        new Paragraph({
                          children: [new TextRun({ text: `${wi}`, font: defaultFont, size: defaultSize })],
                          spacing: { after: 100, line: lineSpacing }
                        })
                    ),
                    34
                  ),
                  createCell(
                    [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: 'By the end of the lesson, the student will be able to:',
                            bold: true,
                            font: defaultFont,
                            size: defaultSize
                          })
                        ],
                        spacing: { after: 80, line: lineSpacing }
                      }),
                      ...data.slo.map(
                        s =>
                          new Paragraph({
                            children: [new TextRun({ text: `• ${s}`, font: defaultFont, size: defaultSize })],
                            spacing: { after: 80, line: lineSpacing }
                          })
                      )
                    ],
                    33
                  )
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 180 } }),

          // CLIL & Language Objectives Box
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell(
                    [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: 'Language Objectives (CLIL): ',
                            bold: true,
                            font: defaultFont,
                            color: primaryColor,
                            size: defaultSize
                          }),
                          new TextRun({
                            text: data.clilKeyTerms,
                            font: defaultFont,
                            size: defaultSize
                          })
                        ],
                        spacing: { after: 100, line: lineSpacing }
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: 'EAL Support: ',
                            bold: true,
                            font: defaultFont,
                            color: primaryColor,
                            size: defaultSize
                          }),
                          new TextRun({
                            text: data.ealLanguageSupport,
                            font: defaultFont,
                            size: defaultSize
                          })
                        ],
                        spacing: { line: lineSpacing }
                      })
                    ],
                    100,
                    false,
                    'F0FDF4'
                  )
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 200 } }),

          // Differentiation Provisions Table (4 Columns)
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell('Struggled Scaffolding', 25, true, '0284C7'),
                  createCell('EAL Support\nEnglish as Additional Language', 25, true, '0F766E'),
                  createCell('SEN Scaffolding\nAdditional Learning Needs', 25, true, 'D97706'),
                  createCell('Extension Tasks\nHigh-Achieving Students', 25, true, '7E22CE')
                ]
              }),
              new TableRow({
                children: [
                  createCell(
                    [
                      ...data.struggledScaffolding.points.map(
                        p =>
                          new Paragraph({
                            children: [new TextRun({ text: `• ${p}`, font: defaultFont, size: defaultSize })],
                            spacing: { after: 80, line: lineSpacing }
                          })
                      ),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: data.struggledScaffolding.resourceDesk,
                            font: defaultFont,
                            size: 18,
                            italics: true,
                            color: 'B91C1C'
                          })
                        ],
                        spacing: { before: 80, line: lineSpacing }
                      })
                    ],
                    25
                  ),
                  createCell(
                    data.ealSupport.map(
                      e =>
                        new Paragraph({
                          children: [new TextRun({ text: `• ${e}`, font: defaultFont, size: defaultSize })],
                          spacing: { after: 80, line: lineSpacing }
                        })
                    ),
                    25
                  ),
                  createCell(
                    data.senScaffolding.map(
                      s =>
                        new Paragraph({
                          children: [new TextRun({ text: `• ${s}`, font: defaultFont, size: defaultSize })],
                          spacing: { after: 80, line: lineSpacing }
                        })
                    ),
                    25
                  ),
                  createCell(
                    data.extensionTasks.map(
                      ex =>
                        new Paragraph({
                          children: [new TextRun({ text: `• ${ex}`, font: defaultFont, size: defaultSize })],
                          spacing: { after: 80, line: lineSpacing }
                        })
                    ),
                    25
                  )
                ]
              })
            ]
          }),

          // 5E Instructional Model per Meeting
          ...data.meetings.flatMap(m => [
            new Paragraph({
              spacing: { before: 240, after: 120, line: lineSpacing },
              children: [
                new TextRun({
                  text: m.title,
                  font: defaultFont,
                  size: 24,
                  bold: true,
                  color: primaryColor
                })
              ]
            }),
            new Paragraph({
              spacing: { after: 140, line: lineSpacing },
              children: [
                new TextRun({
                  text: `Starter / Stimulus: ${m.starterStimulus}`,
                  font: defaultFont,
                  size: defaultSize,
                  italics: true
                })
              ]
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    createCell('Phase', 15, true),
                    createCell('Time', 12, true),
                    createCell('Teacher and Student Activity', 53, true),
                    createCell('Assessment / SLO', 20, true)
                  ]
                }),
                new TableRow({
                  children: [
                    createCell('Engage', 15, false, 'E2E8F0'),
                    createCell(m.engage.time, 12),
                    createCell(
                      [
                        new Paragraph({
                          children: [
                            new TextRun({ text: 'Teacher: ', bold: true }),
                            new TextRun({ text: m.engage.teacherActivity })
                          ],
                          spacing: { after: 60, line: lineSpacing }
                        }),
                        new Paragraph({
                          children: [
                            new TextRun({ text: 'Students: ', bold: true }),
                            new TextRun({ text: m.engage.studentActivity })
                          ],
                          spacing: { after: 60, line: lineSpacing }
                        }),
                        new Paragraph({
                          children: [new TextRun({ text: m.engage.waltDisplay, italics: true })],
                          spacing: { line: lineSpacing }
                        })
                      ],
                      53
                    ),
                    createCell(m.engage.assessment, 20)
                  ]
                }),
                new TableRow({
                  children: [
                    createCell('Explore', 15, false, 'E2E8F0'),
                    createCell(m.explore.time, 12),
                    createCell(
                      [
                        new Paragraph({
                          children: [
                            new TextRun({ text: 'Teacher: ', bold: true }),
                            new TextRun({ text: m.explore.teacherActivity })
                          ],
                          spacing: { after: 60, line: lineSpacing }
                        }),
                        new Paragraph({
                          children: [
                            new TextRun({ text: 'Students: ', bold: true }),
                            new TextRun({ text: m.explore.studentActivity })
                          ],
                          spacing: { line: lineSpacing }
                        })
                      ],
                      53
                    ),
                    createCell(m.explore.assessment, 20)
                  ]
                }),
                new TableRow({
                  children: [
                    createCell('Explain', 15, false, 'E2E8F0'),
                    createCell(m.explain.time, 12),
                    createCell(
                      [
                        new Paragraph({
                          children: [
                            new TextRun({ text: 'Teacher: ', bold: true }),
                            new TextRun({ text: m.explain.teacherActivity })
                          ],
                          spacing: { after: 60, line: lineSpacing }
                        }),
                        new Paragraph({
                          children: [
                            new TextRun({ text: 'Board Example: ', bold: true }),
                            new TextRun({ text: m.explain.boardExamples })
                          ],
                          spacing: { line: lineSpacing }
                        })
                      ],
                      53
                    ),
                    createCell(m.explain.assessment, 20)
                  ]
                }),
                new TableRow({
                  children: [
                    createCell('Elaborate', 15, false, 'E2E8F0'),
                    createCell(m.elaborate.time, 12),
                    createCell(
                      [
                        new Paragraph({
                          children: [
                            new TextRun({ text: 'Teacher: ', bold: true }),
                            new TextRun({ text: m.elaborate.teacherActivity })
                          ],
                          spacing: { after: 60, line: lineSpacing }
                        }),
                        new Paragraph({
                          children: [
                            new TextRun({ text: 'Scaffolded Tasks: ', bold: true }),
                            new TextRun({ text: m.elaborate.scaffoldedTasks })
                          ],
                          spacing: { line: lineSpacing }
                        })
                      ],
                      53
                    ),
                    createCell(m.elaborate.assessment, 20)
                  ]
                }),
                new TableRow({
                  children: [
                    createCell('Evaluate', 15, false, 'E2E8F0'),
                    createCell(m.evaluate.time, 12),
                    createCell(
                      [
                        new Paragraph({
                          children: [
                            new TextRun({ text: 'Teacher: ', bold: true }),
                            new TextRun({ text: m.evaluate.teacherActivity })
                          ],
                          spacing: { after: 60, line: lineSpacing }
                        }),
                        new Paragraph({
                          children: [
                            new TextRun({ text: 'Exit Ticket: ', bold: true }),
                            new TextRun({ text: m.evaluate.exitTicket })
                          ],
                          spacing: { line: lineSpacing }
                        })
                      ],
                      53
                    ),
                    createCell(m.evaluate.assessment, 20)
                  ]
                })
              ]
            })
          ]),

          new Paragraph({ spacing: { before: 200 } }),

          // Formative Assessment, Homework & Reflection Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell('Formative Assessment (in class)', 35, true),
                  createCell('Homework / Next Lesson (outside class)', 35, true),
                  createCell('Teacher Post-Lesson Reflection', 30, true)
                ]
              }),
              new TableRow({
                children: [
                  createCell(
                    data.formativeAssessmentInClass.map(
                      f =>
                        new Paragraph({
                          children: [new TextRun({ text: `• ${f}`, font: defaultFont, size: defaultSize })],
                          spacing: { after: 80, line: lineSpacing }
                        })
                    ),
                    35
                  ),
                  createCell(
                    data.homeworkNextLesson.map(
                      h =>
                        new Paragraph({
                          children: [new TextRun({ text: `• ${h}`, font: defaultFont, size: defaultSize })],
                          spacing: { after: 80, line: lineSpacing }
                        })
                    ),
                    35
                  ),
                  createCell(
                    data.teacherReflectionPrompts.map(
                      r =>
                        new Paragraph({
                          children: [new TextRun({ text: `• ${r}`, font: defaultFont, size: defaultSize })],
                          spacing: { after: 80, line: lineSpacing }
                        })
                    ),
                    30
                  )
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 200 } }),

          // Resource List Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell('Type', 20, true, '0284C7'),
                  createCell('Resource Name', 45, true, '0284C7'),
                  createCell('Location / Access', 35, true, '0284C7')
                ]
              }),
              ...data.resources.map(
                res =>
                  new TableRow({
                    children: [
                      createCell(res.type, 20),
                      createCell(res.name, 45),
                      createCell(res.location, 35)
                    ]
                  })
              )
            ]
          }),

          new Paragraph({ spacing: { before: 180 } }),

          // STQS Alignment Banner
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell(
                    'STQS Alignment: Domain 1 (Cambridge AOs) | Domain 2 (WALT/WILF, three-tier differentiation) | Domain 4 (5E model, higher-order questioning) | Domain 5 (Five embedded formative assessment points)',
                    100,
                    false,
                    'F8FAFC'
                  )
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 180 } }),

          // Sign-off Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell('Teacher', 50, true),
                  createCell('Head of Department — Science', 50, true)
                ]
              }),
              new TableRow({
                children: [
                  createCell(
                    [
                      new Paragraph({
                        children: [
                          new TextRun({ text: `Teacher: ${data.teacherName}`, bold: true }),
                          new TextRun({ text: `\nSigned: ${data.teacherSignedDate}` })
                        ],
                        spacing: { line: lineSpacing }
                      })
                    ],
                    50
                  ),
                  createCell(
                    [
                      new Paragraph({
                        children: [
                          new TextRun({ text: `HoD Review: ☑ Approved  ☐ Feedback provided` }),
                          new TextRun({ text: `\nDate: ${data.teacherSignedDate}` })
                        ],
                        spacing: { line: lineSpacing }
                      })
                    ],
                    50
                  )
                ]
              }),
              new TableRow({
                children: [
                  createCell(
                    [
                      new Paragraph({
                        children: [
                          new TextRun({ text: `Principal: ${data.principalName}`, bold: true }),
                          new TextRun({ text: `\nSubmitted to Edunav: ${data.principalSignedDate}` }),
                          new TextRun({ text: `\nStatus: Approved & Verified for WASC accreditation` })
                        ],
                        spacing: { line: lineSpacing }
                      })
                    ],
                    100,
                    false,
                    'F1F5F9'
                  )
                ]
              })
            ]
          })
        ]
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  saveBlobFile(blob, filename);
}
