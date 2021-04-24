import { selectType } from '../../../domain/shared/type/select.type';

export const typeValueObject: selectType[] = [
  { label: 'Nouvelle fonctionnalité', value: 'feature'},
  { label: 'Bogue', value: 'bug'},
  { label: 'Nouveau projet', value: 'project'},
  { label: 'Data export', value: 'data'},
];
