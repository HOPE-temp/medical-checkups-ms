import { StatusMedicalCheckup } from '../models/medialCheckup.status.model';

export const medialCheckupStatusFlow: Record<
  StatusMedicalCheckup,
  StatusMedicalCheckup[]
> = {
  [StatusMedicalCheckup.REGISTERED]: [
    StatusMedicalCheckup.IN_ATTENTION,
    StatusMedicalCheckup.CANCELLED,
  ],
  [StatusMedicalCheckup.IN_ATTENTION]: [StatusMedicalCheckup.COMPLETED],
  [StatusMedicalCheckup.COMPLETED]: [StatusMedicalCheckup.COMPLETED],
  [StatusMedicalCheckup.CANCELLED]: [StatusMedicalCheckup.CANCELLED],
};
