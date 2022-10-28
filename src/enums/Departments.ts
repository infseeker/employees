import { Department } from "../models/Department";

export const Departments: { readonly [k: string]: Department } = {
  All: { name: 'All', value: 'all' },
  Android: { name: 'Android', value: 'android' },
  Ios: { name: 'iOS', value: 'ios' },
  Design: { name: 'Design', value: 'design' },
  Management: { name: 'Management', value: 'management' },
  Qa: { name: 'QA', value: 'qa' },
  BackOffice: { name: 'Back Office', value: 'back_office' },
  Frontend: { name: 'Frontend', value: 'frontend' },
  Hr: { name: 'HR', value: 'hr' },
  Pr: { name: 'PR', value: 'pr' },
  Backend: { name: 'Backend', value: 'backend' },
  Support: { name: 'Support', value: 'support' },
  Analytics: { name: 'Analytics', value: 'analytics' },
};