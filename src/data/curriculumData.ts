import { CurriculumGrade } from '../types';

export const CURRICULUM_DATASET: CurriculumGrade[] = [
  {
    grade: 'Grade 12',
    yearGroupLabel: 'Year 12 (SMA)',
    syllabusName: 'Cambridge International AS & A Level Chemistry (9701)',
    syllabusCode: '9701',
    defaultDepartment: 'Chemistry / Science',
    topics: [
      {
        id: 'g12-t1',
        title: 'Electrochemistry',
        subtopics: [
          {
            id: 'g12-t1-s1',
            title: 'Redox reactions revisited & Electrolysis',
            objectives: [
              {
                id: 'g12-t1-s1-o1',
                text: 'State and apply the relationship $F = L \\cdot e$ between the Faraday constant ($F$), the Avogadro constant ($L$), and the charge on the electron ($e$).',
                latex: 'F = L \\cdot e',
                cambridgeCode: '9701.24.1'
              },
              {
                id: 'g12-t1-s1-o2',
                text: 'Describe the determination of a value of the Avogadro constant by an electrolytic method.',
                latex: 'L = \\frac{I \\cdot t}{z \\cdot e \\cdot n}',
                cambridgeCode: '9701.24.2'
              }
            ]
          },
          {
            id: 'g12-t1-s2',
            title: 'Quantitative electrolysis',
            objectives: [
              {
                id: 'g12-t1-s2-o1',
                text: 'Calculate the quantity of charge passed during electrolysis using $Q = I \\times t$.',
                latex: 'Q = I \\times t',
                cambridgeCode: '9701.24.3a'
              },
              {
                id: 'g12-t1-s2-o2',
                text: 'Calculate the mass and/or volume of substance liberated at an electrode during electrolysis using Faraday\'s laws.',
                latex: 'm = \\frac{Q \\cdot M_r}{z \\cdot F}',
                cambridgeCode: '9701.24.3b'
              }
            ]
          },
          {
            id: 'g12-t1-s3',
            title: 'Electrode potentials & Standard Hydrogen Electrode',
            objectives: [
              {
                id: 'g12-t1-s3-o1',
                text: 'Define the terms: standard electrode (reduction) potential ($E^\\ominus$), standard cell potential ($E^\\ominus_{\\text{cell}}$), and describe the standard hydrogen electrode (SHE).',
                latex: 'E^\\ominus_{\\text{cell}} = E^\\ominus_{\\text{reduction}} - E^\\ominus_{\\text{oxidation}}',
                cambridgeCode: '9701.24.4'
              },
              {
                id: 'g12-t1-s3-o2',
                text: 'Deduce from $E^\\ominus$ values the relative reactivity of elements, compounds and ions as oxidising agents or as reducing agents.',
                latex: '\\text{Fe}^{3+} + e^- \\rightleftharpoons \\text{Fe}^{2+} \\quad (E^\\ominus = +0.77\\text{ V})',
                cambridgeCode: '9701.24.5a'
              },
              {
                id: 'g12-t1-s3-o3',
                text: 'Construct balanced redox equations using the relevant half-equations.',
                latex: '\\text{MnO}_4^- + 8\\text{H}^+ + 5e^- \\rightarrow \\text{Mn}^{2+} + 4\\text{H}_2\\text{O}',
                cambridgeCode: '9701.24.5b'
              }
            ]
          },
          {
            id: 'g12-t1-s4',
            title: 'Combining half-cells & Using E values',
            objectives: [
              {
                id: 'g12-t1-s4-o1',
                text: 'Describe methods used to measure standard electrode potentials of metals/non-metals in contact with their aqueous ions, and ions of the same element in different oxidation states.',
                latex: '\\text{Pt}(s) \\mid \\text{Fe}^{2+}(aq), \\text{Fe}^{3+}(aq) \\parallel \\text{Cu}^{2+}(aq) \\mid \\text{Cu}(s)',
                cambridgeCode: '9701.24.6a'
              },
              {
                id: 'g12-t1-s4-o2',
                text: 'Calculate a standard cell potential by combining two standard electrode potentials.',
                latex: 'E^\\ominus_{\\text{cell}} = E^\\ominus_{\\text{cathode}} - E^\\ominus_{\\text{anode}}',
                cambridgeCode: '9701.24.6b'
              },
              {
                id: 'g12-t1-s4-o3',
                text: 'Use standard cell potentials to deduce the polarity of electrodes, direction of electron flow in external circuits, and predict reaction feasibility ($\\Delta G^\\ominus < 0$).',
                latex: '\\Delta G^\\ominus = -n F E^\\ominus_{\\text{cell}}',
                cambridgeCode: '9701.24.7'
              }
            ]
          },
          {
            id: 'g12-t1-s5',
            title: 'More about electrolysis & Non-standard conditions',
            objectives: [
              {
                id: 'g12-t1-s5-o1',
                text: 'Predict qualitatively how the value of an electrode potential, $E$, varies with the concentrations of aqueous ions using Le Chatelier\'s principle.',
                latex: 'E = E^\\ominus + \\frac{0.059}{z} \\log\\left(\\frac{[\\text{oxidised}]}{[\\text{reduced}]}\\right)',
                cambridgeCode: '9701.24.8'
              }
            ]
          }
        ]
      },
      {
        id: 'g12-t2',
        title: 'Further aspect of equilibria',
        subtopics: [
          {
            id: 'g12-t2-s1',
            title: 'Conjugate acids and conjugate bases',
            objectives: [
              {
                id: 'g12-t2-s1-o1',
                text: 'Understand and use the terms conjugate acid and conjugate base.',
                latex: '\\text{HA} + \\text{H}_2\\text{O} \\rightleftharpoons \\text{A}^- + \\text{H}_3\\text{O}^+',
                cambridgeCode: '9701.21.1a'
              },
              {
                id: 'g12-t2-s1-o2',
                text: 'Define conjugate acid–base pairs and identify such pairs in complex aqueous reactions.',
                latex: '\\text{NH}_3 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{NH}_4^+ + \\text{OH}^-',
                cambridgeCode: '9701.21.1b'
              }
            ]
          },
          {
            id: 'g12-t2-s2',
            title: 'pH calculations & Ionic product of water',
            objectives: [
              {
                id: 'g12-t2-s2-o1',
                text: 'Calculate $[\\text{H}^+(aq)]$ and pH values for strong acids and strong alkalis using $K_w = [\\text{H}^+][\\text{OH}^-] = 1.0 \\times 10^{-14} \\text{ mol}^2\\text{dm}^{-6}$.',
                latex: '\\text{pH} = -\\log_{10}[\\text{H}^+]',
                cambridgeCode: '9701.21.2a'
              },
              {
                id: 'g12-t2-s2-o2',
                text: 'Define mathematically the terms $\\text{pH}, K_a, \\text{p}K_a$ and $K_w$ and use them in quantitative equilibria calculations.',
                latex: '\\text{p}K_a = -\\log_{10}K_a \\quad ; \\quad \\text{pH} + \\text{pOH} = 14',
                cambridgeCode: '9701.21.2b'
              }
            ]
          },
          {
            id: 'g12-t2-s3',
            title: 'Weak acids: using the acid dissociation constant, Ka',
            objectives: [
              {
                id: 'g12-t2-s3-o1',
                text: 'Write expressions for $K_a$ of weak acids and calculate $[\\text{H}^+(aq)]$ and pH for weak monoprotic acids.',
                latex: 'K_a = \\frac{[\\text{H}^+][\\text{A}^-]}{[\\text{HA}]} \\approx \\frac{[\\text{H}^+]^2}{c}',
                cambridgeCode: '9701.21.3a'
              },
              {
                id: 'g12-t2-s3-o2',
                text: 'State approximations used in weak acid calculations and explain circumstances where approximations fail.',
                latex: '[\\text{H}^+] = \\sqrt{K_a \\cdot [\\text{HA}]}',
                cambridgeCode: '9701.21.3b'
              }
            ]
          },
          {
            id: 'g12-t2-s4',
            title: 'Buffer solutions',
            objectives: [
              {
                id: 'g12-t2-s4-o1',
                text: 'Define a buffer solution and explain how acidic and alkaline buffer solutions are prepared.',
                latex: '\\text{CH}_3\\text{COOH} / \\text{CH}_3\\text{COONa}',
                cambridgeCode: '9701.21.4a'
              },
              {
                id: 'g12-t2-s4-o2',
                text: 'Explain how buffer solutions resist changes in pH upon addition of small amounts of acid or base using chemical equations.',
                latex: '\\text{CH}_3\\text{COO}^- + \\text{H}^+ \\rightarrow \\text{CH}_3\\text{COOH}',
                cambridgeCode: '9701.21.4b'
              },
              {
                id: 'g12-t2-s4-o3',
                text: 'Describe biological uses of buffers, including the role of $\\text{H}_2\\text{CO}_3 / \\text{HCO}_3^-$ in controlling pH in human blood.',
                latex: '\\text{CO}_2(aq) + \\text{H}_2\\text{O}(l) \\rightleftharpoons \\text{H}_2\\text{CO}_3(aq) \\rightleftharpoons \\text{H}^+(aq) + \\text{HCO}_3^-(aq)',
                cambridgeCode: '9701.21.4c'
              },
              {
                id: 'g12-t2-s4-o4',
                text: 'Calculate the pH of buffer solutions given concentrations and $K_a$ values.',
                latex: '\\text{pH} = \\text{p}K_a + \\log_{10}\\left(\\frac{[\\text{salt}]}{[\\text{acid}]}\\right)',
                cambridgeCode: '9701.21.4d'
              }
            ]
          },
          {
            id: 'g12-t2-s5',
            title: 'Equilibrium and solubility',
            objectives: [
              {
                id: 'g12-t2-s5-o1',
                text: 'Understand and use the term solubility product, $K_{sp}$, and write expressions for sparingly soluble ionic salts.',
                latex: 'K_{sp} = [\\text{M}^{m+}]^x [\\text{X}^{n-}]^y',
                cambridgeCode: '9701.21.5a'
              },
              {
                id: 'g12-t2-s5-o2',
                text: 'Calculate $K_{sp}$ from solubility data and vice versa with integer/simple decimal molar masses.',
                latex: '\\text{BaSO}_4(s) \\rightleftharpoons \\text{Ba}^{2+}(aq) + \\text{SO}_4^{2-}(aq) \\implies K_{sp} = s^2',
                cambridgeCode: '9701.21.5b'
              },
              {
                id: 'g12-t2-s5-o3',
                text: 'Understand and use the common ion effect to explain and calculate the decreased solubility of an ionic salt in a solution containing a common ion.',
                latex: 's\' = \\frac{K_{sp}}{[\\text{common ion}]}',
                cambridgeCode: '9701.21.5c'
              }
            ]
          }
        ]
      },
      {
        id: 'g12-t3',
        title: 'Reaction kinetics',
        subtopics: [
          {
            id: 'g12-t3-s1',
            title: 'Factors affecting reaction rate & Rate terms',
            objectives: [
              {
                id: 'g12-t3-s1-o1',
                text: 'Explain and use the terms: rate equation, order of reaction, overall order of reaction, rate constant, half-life, rate-determining step, and intermediate.',
                latex: '\\text{Rate} = k[\\text{A}]^m[\\text{B}]^n',
                cambridgeCode: '9701.22.1'
              }
            ]
          },
          {
            id: 'g12-t3-s2',
            title: 'Rate equations & Deducing reaction orders',
            objectives: [
              {
                id: 'g12-t3-s2-o1',
                text: 'Construct and use rate equations of the form $\\text{Rate} = k[\\text{A}]^m[\\text{B}]^n$ where $m$ and $n$ are 0, 1, or 2.',
                latex: 'm, n \\in \\{0, 1, 2\\}',
                cambridgeCode: '9701.22.2a'
              },
              {
                id: 'g12-t3-s2-o2',
                text: 'Deduce reaction orders from concentration-time graphs or experimental initial rates data.',
                latex: '\\frac{\\text{Rate}_2}{\\text{Rate}_1} = \\left(\\frac{[\\text{A}]_2}{[\\text{A}]_1}\\right)^m',
                cambridgeCode: '9701.22.2b'
              },
              {
                id: 'g12-t3-s2-o3',
                text: 'Interpret experimental data in graphical form, including concentration-time and rate-concentration curves.',
                latex: '\\text{Zero order: horizontal line} \\quad ; \\quad \\text{First order: straight through origin}',
                cambridgeCode: '9701.22.3'
              }
            ]
          },
          {
            id: 'g12-t3-s3',
            title: 'Kinetics, half-life & Reaction mechanisms',
            objectives: [
              {
                id: 'g12-t3-s3-o1',
                text: 'Show understanding that the half-life ($t_{1/2}$) of a first-order reaction is constant and independent of initial reactant concentration.',
                latex: 't_{1/2} = \\frac{\\ln 2}{k} = \\frac{0.693}{k}',
                cambridgeCode: '9701.22.4a'
              },
              {
                id: 'g12-t3-s3-o2',
                text: 'Calculate the numerical value and units of a rate constant, $k$, using half-life and initial rates data.',
                latex: 'k = \\frac{\\text{Rate}}{[\\text{A}]^m [\\text{B}]^n}',
                cambridgeCode: '9701.22.4b'
              },
              {
                id: 'g12-t3-s3-o3',
                text: 'Suggest a reaction mechanism consistent with a given rate equation, identifying the rate-determining step.',
                latex: '\\text{Slow step: } \\text{NO}_2 + \\text{NO}_2 \\rightarrow \\text{NO}_3 + \\text{NO}',
                cambridgeCode: '9701.22.4c'
              }
            ]
          },
          {
            id: 'g12-t3-s4',
            title: 'Catalysis: Homogeneous & Heterogeneous',
            objectives: [
              {
                id: 'g12-t3-s4-o1',
                text: 'Explain that catalysts provide an alternative pathway with lower activation energy ($E_a$) and can be homogeneous or heterogeneous.',
                latex: 'k = A \\cdot e^{-E_a / (RT)}',
                cambridgeCode: '9701.22.5a'
              },
              {
                id: 'g12-t3-s4-o2',
                text: 'Describe the mode of action of heterogeneous catalysts: adsorption, bond weakening, reaction, and desorption of products (e.g., Fe in Haber process, Pt/Rh in catalytic converters).',
                latex: '\\text{N}_2(g) + 3\\text{H}_2(g) \\xrightarrow{\\text{Fe}(s)} 2\\text{NH}_3(g)',
                cambridgeCode: '9701.22.5b'
              },
              {
                id: 'g12-t3-s4-o3',
                text: 'Describe the mode of action of homogeneous catalysts: participating in a step and regenerated in a subsequent step (e.g., $\\text{Fe}^{2+}/\\text{Fe}^{3+}$ in $\\text{I}^- / \\text{S}_2\\text{O}_8^{2-}$ reaction).',
                latex: '2\\text{Fe}^{2+} + \\text{S}_2\\text{O}_8^{2-} \\rightarrow 2\\text{Fe}^{3+} + 2\\text{SO}_4^{2-}',
                cambridgeCode: '9701.22.5c'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    grade: 'Grade 10',
    yearGroupLabel: 'Year 10 (SMA)',
    syllabusName: 'Cambridge IGCSE Chemistry (0620)',
    syllabusCode: '0620',
    defaultDepartment: 'Science / Chemistry',
    topics: [
      {
        id: 'g10-t1',
        title: 'Stoichiometry & The Mole Concept',
        subtopics: [
          {
            id: 'g10-t1-s1',
            title: 'Chemical formulae, balancing & Mole calculations',
            objectives: [
              {
                id: 'g10-t1-s1-o1',
                text: 'Deduce chemical formulae, balance symbol equations with state symbols, and determine ionic equations.',
                latex: '2\\text{Mg}(s) + \\text{O}_2(g) \\rightarrow 2\\text{MgO}(s)',
                cambridgeCode: '0620.3.1'
              },
              {
                id: 'g10-t1-s1-o2',
                text: 'Calculate stoichiometric reacting masses, moles ($n = m/M_r$), and molar gas volumes ($24\\text{ dm}^3$ at r.t.p.) using integer values.',
                latex: 'n = \\frac{m}{M_r} \\quad ; \\quad V = n \\times 24\\text{ dm}^3',
                cambridgeCode: '0620.3.2'
              },
              {
                id: 'g10-t1-s1-o3',
                text: 'Calculate concentration of solutions in $\\text{g/dm}^3$ and $\\text{mol/dm}^3$, and determine percentage yield.',
                latex: 'c = \\frac{n}{V} \\quad ; \\quad \\%\\text{ yield} = \\frac{\\text{actual}}{\\text{theoretical}} \\times 100\\%',
                cambridgeCode: '0620.3.3'
              }
            ]
          }
        ]
      },
      {
        id: 'g10-t2',
        title: 'Electrochemistry (IGCSE)',
        subtopics: [
          {
            id: 'g10-t2-s1',
            title: 'Electrolysis of molten and aqueous electrolytes',
            objectives: [
              {
                id: 'g10-t2-s1-o1',
                text: 'Define electrolysis as the decomposition of an ionic compound, when molten or in aqueous solution, by the passage of an electric current.',
                latex: '\\text{PbBr}_2(l) \\xrightarrow{\\text{electricity}} \\text{Pb}(l) + \\text{Br}_2(g)',
                cambridgeCode: '0620.4.1'
              },
              {
                id: 'g10-t2-s1-o2',
                text: 'Predict products at the anode and cathode during electrolysis of molten lead(II) bromide, concentrated aqueous sodium chloride, and dilute sulfuric acid.',
                latex: '2\\text{H}^+ + 2e^- \\rightarrow \\text{H}_2(g) \\quad ; \\quad 2\\text{Cl}^- \\rightarrow \\text{Cl}_2(g) + 2e^-',
                cambridgeCode: '0620.4.2'
              },
              {
                id: 'g10-t2-s1-o3',
                text: 'Describe electroplating of metals and the operation of simple hydrogen-oxygen fuel cells.',
                latex: '2\\text{H}_2 + \\text{O}_2 \\rightarrow 2\\text{H}_2\\text{O}',
                cambridgeCode: '0620.4.3'
              }
            ]
          }
        ]
      },
      {
        id: 'g10-t3',
        title: 'Chemical Energetics',
        subtopics: [
          {
            id: 'g10-t3-s1',
            title: 'Exothermic and endothermic reactions & Bond energies',
            objectives: [
              {
                id: 'g10-t3-s1-o1',
                text: 'Differentiate between exothermic and endothermic reactions with energy level reaction pathway diagrams.',
                latex: '\\Delta H < 0 \\text{ (exothermic)} \\quad ; \\quad \\Delta H > 0 \\text{ (endothermic)}',
                cambridgeCode: '0620.5.1'
              },
              {
                id: 'g10-t3-s1-o2',
                text: 'Calculate enthalpy changes of reactions using bond energy values with structured integer calculations.',
                latex: '\\Delta H = \\sum(\\text{bond breaking}) - \\sum(\\text{bond making})',
                cambridgeCode: '0620.5.2'
              }
            ]
          }
        ]
      },
      {
        id: 'g10-t4',
        title: 'Acids, Bases and Salts',
        subtopics: [
          {
            id: 'g10-t4-s1',
            title: 'Properties of acids & Preparation of salts',
            objectives: [
              {
                id: 'g10-t4-s1-o1',
                text: 'Describe characteristic properties of acids and bases in terms of their reactions with metals, bases, and carbonates.',
                latex: '\\text{CaCO}_3(s) + 2\\text{HCl}(aq) \\rightarrow \\text{CaCl}_2(aq) + \\text{H}_2\\text{O}(l) + \\text{CO}_2(g)',
                cambridgeCode: '0620.8.1'
              },
              {
                id: 'g10-t4-s1-o2',
                text: 'Describe laboratory preparation, separation, and purification of soluble and insoluble salts using crystallization and precipitation.',
                latex: '\\text{Ba}^{2+}(aq) + \\text{SO}_4^{2-}(aq) \\rightarrow \\text{BaSO}_4(s)',
                cambridgeCode: '0620.8.2'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    grade: 'Grade 11',
    yearGroupLabel: 'Year 11 (SMA)',
    syllabusName: 'Cambridge International AS Level Chemistry (9701)',
    syllabusCode: '9701',
    defaultDepartment: 'Chemistry / Science',
    topics: [
      {
        id: 'g11-t1',
        title: 'Atomic Structure & Chemical Bonding',
        subtopics: [
          {
            id: 'g11-t1-s1',
            title: 'Electronic configuration, ionization energy & VSEPR',
            objectives: [
              {
                id: 'g11-t1-s1-o1',
                text: 'Explain successive ionisation energies and interpret trends across periods and down groups.',
                latex: 'X(g) \\rightarrow X^+(g) + e^- \\quad (\\Delta H = \\text{IE}_1)',
                cambridgeCode: '9701.1.1'
              },
              {
                id: 'g11-t1-s1-o2',
                text: 'Apply VSEPR theory to deduce shapes and bond angles of simple molecules (linear, trigonal planar, tetrahedral, pyramidal, non-linear).',
                latex: '\\text{CH}_4 (109.5^\\circ) \\quad ; \\quad \\text{NH}_3 (107^\\circ) \\quad ; \\quad \\text{H}_2\\text{O} (104.5^\\circ)',
                cambridgeCode: '9701.3.1'
              }
            ]
          }
        ]
      },
      {
        id: 'g11-t2',
        title: 'Chemical Equilibria: Reversible Reactions & Kc',
        subtopics: [
          {
            id: 'g11-t2-s1',
            title: 'Dynamic equilibrium & Equilibrium constant Kc',
            objectives: [
              {
                id: 'g11-t2-s1-o1',
                text: 'Explain dynamic equilibrium and apply Le Chatelier\'s principle to deduce effects of temperature, pressure, concentration, and catalysts.',
                latex: '\\text{N}_2(g) + 3\\text{H}_2(g) \\rightleftharpoons 2\\text{NH}_3(g) \\quad (\\Delta H = -92\\text{ kJ/mol})',
                cambridgeCode: '9701.7.1'
              },
              {
                id: 'g11-t2-s1-o2',
                text: 'Deduce expressions for $K_c$ and calculate equilibrium concentrations and quantities using stoichiometric ICE tables with integer numbers.',
                latex: 'K_c = \\frac{[\\text{C}]^c [\\text{D}]^d}{[\\text{A}]^a [\\text{B}]^b}',
                cambridgeCode: '9701.7.2'
              }
            ]
          }
        ]
      }
    ]
  }
];
