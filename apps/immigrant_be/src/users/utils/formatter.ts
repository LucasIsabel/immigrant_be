import { ImmigrationVisaType, Prisma } from 'generated/prisma';
import {
  PlanResponseDto,
  PlanStatus,
  PlanImmigrationVisaTypeDto,
} from '../dto/plan-response.dto';
import type { ResolvedStepItem } from './resolve-plan-steps';
export type PlanWithRelations = Prisma.PlansGetPayload<{
  include: {
    country: true;
    suggestion: true;
    user: true;
    selected_visa_type: true;
  };
}>;

/**
 * Projection of one visa type into the plan response.
 *
 * Written once and reused for the list and for `selected_visa_type`: the two
 * were copies of the same field list, and the catalogue fields would have had
 * to be added to both, which is exactly how one of them ends up missing a
 * field the frontend then reads as undefined.
 */
const formatVisaType = (
  visaType: ImmigrationVisaType,
): PlanImmigrationVisaTypeDto => ({
  id: visaType.id,
  category: visaType.category,
  description: visaType.description,
  source: visaType.source,
  processing_time: visaType.processing_time,
  estimated_cost: visaType.estimated_cost,
  main_requirements: visaType.main_requirements,
  country_id: visaType.country_id,
});

const formatVisaTypes = (
  visaTypes: ImmigrationVisaType[],
): PlanImmigrationVisaTypeDto[] => visaTypes.map(formatVisaType);

export const formatPlanResponse = (
  data: PlanWithRelations,
  visaTypes: ImmigrationVisaType[],
  resolved: {
    steps: Record<string, ResolvedStepItem[]>;
    language: string;
  } = { steps: {}, language: '' },
): PlanResponseDto => {
  return {
    id: data.id,
    user_id: data.user_id,
    suggestion_id: data.suggestion_id ?? undefined,
    country_id: data.country_id ?? undefined,
    steps: resolved.steps,
    completed_step_keys: data.completed_step_keys,
    language: resolved.language,
    documents: data.documents,
    selected_suggestion: data.selected_suggestion ?? undefined,
    status: data.status as PlanStatus,
    name: data.name ?? undefined,
    notes: data.notes ?? undefined,
    created_at: data.created_at,
    updated_at: data.updated_at,
    progress: data.progress ?? 0,
    description: data.description ?? undefined,
    selected_visa_type_id: data.selected_visa_type_id ?? undefined,
    visa_types: formatVisaTypes(visaTypes),
    selected_visa_type: data.selected_visa_type
      ? formatVisaType(data.selected_visa_type)
      : undefined,
  };
};
