export const byId = {
  '00080020': 'StudyDate',
  '00080030': 'StudyTime',
  '00080050': 'AccessionNumber',
  '00080061': 'ModalitiesInStudy',
  '00080090': 'ReferringPhysicianName',
  '00100010': 'PatientName',
  '00100020': 'PatientID',
  '0020000D': 'StudyInstanceUID',
  '00200010': 'StudyID'
};

export const byName = Object.keys(byId).reduce((result, id) => {
  result[byId[id]] = id;
  return result;
}, {});
