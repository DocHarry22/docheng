import type { UserRole } from "@/lib/auth";

export interface CalculatorField {
  key: string;
  label: string;
  unit?: string;
  min?: number;
  step?: number;
  placeholder: string;
}

export interface CalculatorResult {
  label: string;
  value: number;
  unit?: string;
}

export interface CalculatorComputation {
  headline: string;
  summary: string;
  results: CalculatorResult[];
  notes: string[];
}

export interface CalculatorDefinition {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  requiredRole: UserRole;
  fields: CalculatorField[];
  compute(values: Record<string, number>): CalculatorComputation;
}

export const calculatorDefinitions: CalculatorDefinition[] = [
  {
    slug: "solution-dilution",
    name: "Solution Dilution Calculator",
    shortName: "Dilution",
    description:
      "Solve C₁V₁ = C₂V₂ to prepare a target concentration and quantify the solvent required.",
    requiredRole: "viewer",
    fields: [
      {
        key: "stockConcentration",
        label: "Stock concentration",
        unit: "mol/L",
        min: 0.0001,
        step: 0.01,
        placeholder: "2.5",
      },
      {
        key: "targetConcentration",
        label: "Target concentration",
        unit: "mol/L",
        min: 0.0001,
        step: 0.01,
        placeholder: "0.5",
      },
      {
        key: "targetVolume",
        label: "Target volume",
        unit: "L",
        min: 0.001,
        step: 0.01,
        placeholder: "1.0",
      },
    ],
    compute(values) {
      const stockVolume =
        (values.targetConcentration * values.targetVolume) / values.stockConcentration;
      const solventVolume = values.targetVolume - stockVolume;

      return {
        headline: "Dilution recipe ready",
        summary:
          stockVolume <= values.targetVolume
            ? "Use the calculated stock volume and top up with solvent to the target volume."
            : "The requested target concentration exceeds the stock concentration.",
        results: [
          { label: "Stock solution required", value: stockVolume, unit: "L" },
          { label: "Solvent to add", value: solventVolume, unit: "L" },
        ],
        notes: [
          "Valid only when the stock concentration is greater than or equal to the target concentration.",
          "Volumes assume ideal mixing and no significant contraction on dilution.",
        ],
      };
    },
  },
  {
    slug: "heat-duty",
    name: "Heat Duty Calculator",
    shortName: "Heat Duty",
    description:
      "Estimate steady-state heat duty from mass flow, heat capacity, and temperature change.",
    requiredRole: "member",
    fields: [
      {
        key: "massFlow",
        label: "Mass flow rate",
        unit: "kg/s",
        min: 0.001,
        step: 0.01,
        placeholder: "1.25",
      },
      {
        key: "heatCapacity",
        label: "Specific heat capacity",
        unit: "kJ/kg·K",
        min: 0.001,
        step: 0.01,
        placeholder: "4.18",
      },
      {
        key: "deltaT",
        label: "Temperature change",
        unit: "K",
        min: 0.001,
        step: 0.1,
        placeholder: "35",
      },
    ],
    compute(values) {
      const duty = values.massFlow * values.heatCapacity * values.deltaT;
      const dutyMw = duty / 1000;

      return {
        headline: "Thermal load estimated",
        summary:
          "Positive values indicate energy added to the stream; reverse the sign convention if you are modelling cooling duty.",
        results: [
          { label: "Heat duty", value: duty, unit: "kW" },
          { label: "Heat duty", value: dutyMw, unit: "MW" },
        ],
        notes: [
          "Equation used: Q = m·Cp·ΔT.",
          "Ensure Cp is valid over the full temperature range for better accuracy.",
        ],
      };
    },
  },
  {
    slug: "reynolds-number",
    name: "Reynolds Number Calculator",
    shortName: "Reynolds",
    description:
      "Classify internal flow regimes from density, velocity, hydraulic diameter, and viscosity.",
    requiredRole: "member",
    fields: [
      {
        key: "density",
        label: "Fluid density",
        unit: "kg/m³",
        min: 0.001,
        step: 0.1,
        placeholder: "998",
      },
      {
        key: "velocity",
        label: "Average velocity",
        unit: "m/s",
        min: 0.001,
        step: 0.01,
        placeholder: "1.8",
      },
      {
        key: "diameter",
        label: "Hydraulic diameter",
        unit: "m",
        min: 0.0001,
        step: 0.001,
        placeholder: "0.05",
      },
      {
        key: "viscosity",
        label: "Dynamic viscosity",
        unit: "Pa·s",
        min: 0.000001,
        step: 0.0001,
        placeholder: "0.001",
      },
    ],
    compute(values) {
      const reynolds =
        (values.density * values.velocity * values.diameter) / values.viscosity;
      const regime =
        reynolds < 2300 ? "Laminar" : reynolds < 4000 ? "Transitional" : "Turbulent";

      return {
        headline: `${regime} flow predicted`,
        summary:
          "Use the Reynolds number as a screening metric before selecting friction-factor or heat-transfer correlations.",
        results: [
          { label: "Reynolds number", value: reynolds },
          { label: "Flow regime threshold offset", value: reynolds - 2300 },
        ],
        notes: [
          "Laminar < 2300, transitional 2300–4000, turbulent > 4000 for many internal flows.",
          "Pair this with roughness and geometry data before final equipment sizing.",
        ],
      };
    },
  },
  {
    slug: "pump-power",
    name: "Pump Power Calculator",
    shortName: "Pump Power",
    description:
      "Estimate hydraulic and shaft power from density, volumetric flow, total head, and pump efficiency.",
    requiredRole: "admin",
    fields: [
      {
        key: "density",
        label: "Fluid density",
        unit: "kg/m³",
        min: 0.001,
        step: 0.1,
        placeholder: "1000",
      },
      {
        key: "flowRate",
        label: "Volumetric flow rate",
        unit: "m³/s",
        min: 0.000001,
        step: 0.001,
        placeholder: "0.015",
      },
      {
        key: "head",
        label: "Total developed head",
        unit: "m",
        min: 0.001,
        step: 0.1,
        placeholder: "24",
      },
      {
        key: "efficiency",
        label: "Pump efficiency",
        unit: "%",
        min: 1,
        step: 0.1,
        placeholder: "72",
      },
    ],
    compute(values) {
      const hydraulicPower = values.density * 9.81 * values.flowRate * values.head;
      const shaftPower = hydraulicPower / (values.efficiency / 100);

      return {
        headline: "Pump sizing estimate generated",
        summary:
          "Use shaft power for motor sizing and add project-specific design margin before final selection.",
        results: [
          { label: "Hydraulic power", value: hydraulicPower / 1000, unit: "kW" },
          { label: "Estimated shaft power", value: shaftPower / 1000, unit: "kW" },
        ],
        notes: [
          "Equation used: P = ρgQH / η.",
          "This estimate excludes NPSH, mechanical losses outside the stated efficiency, and startup transients.",
        ],
      };
    },
  },
];

export function getCalculatorBySlug(slug: string) {
  return calculatorDefinitions.find((calculator) => calculator.slug === slug) ?? null;
}
