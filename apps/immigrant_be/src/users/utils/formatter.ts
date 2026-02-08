import { ImmigrationVisaType, Prisma } from 'generated/prisma';
import {
  PlanResponseDto,
  PlanStatus,
  PlanImmigrationVisaTypeDto,
} from '../dto/plan-response.dto';
type PlanWithRelations = Prisma.PlansGetPayload<{
  include: {
    country: true;
    suggestion: true;
    user: true;
    selected_visa_type: true;
  };
}>;

const formatVisaTypes = (
  visaTypes: ImmigrationVisaType[],
): PlanImmigrationVisaTypeDto[] => {
  return visaTypes.map((visaType) => ({
    id: visaType.id,
    category: visaType.category,
    description: visaType.description,
    source: visaType.source,
    country_id: visaType.country_id,
  }));
};

export const formatPlanResponse = (
  data: PlanWithRelations,
  visaTypes: ImmigrationVisaType[],
): PlanResponseDto => {
  return {
    id: data.id,
    user_id: data.user_id,
    suggestion_id: data.suggestion_id ?? undefined,
    country_id: data.country_id ?? undefined,
    steps: data.steps,
    steps_completed: data.steps_completed,
    steps_remaining: data.steps_remaining,
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
      ? {
          id: data.selected_visa_type.id,
          category: data.selected_visa_type.category,
          description: data.selected_visa_type.description,
          source: data.selected_visa_type.source,
          country_id: data.selected_visa_type.country_id,
        }
      : undefined,
  };
};
