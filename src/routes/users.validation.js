const requiredFields = ['name', 'email'];

function missingRequiredFields(data) {
  return requiredFields.filter((field) => !data[field] || String(data[field]).trim() === '');
}

module.exports = { missingRequiredFields };
