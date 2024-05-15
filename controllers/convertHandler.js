function ConvertHandler() {
  
  this.getNum = function(input) {
    const numRegex = /^[0-9]+(?:\.[0-9]+)?(?:\/[0-9]+(?:\.[0-9]+)?)?/;
    const invRegex1 = /^[0-9]+(?:\.[0-9]+)?[+\-*/][0-9]+(?:\.[0-9]+)?[+\-*/][0-9]+(?:\.[0-9]+)?/;
    const invRegex2 = /[+\-*/][+\-*/]/;

    const result = input.match(numRegex);
    const invResult = input.match(invRegex1);
    const invResult2 = input.match(invRegex2);

    if (invResult !== null || invResult2 !== null) return null;
    
    if (result === null) return 1; // If no number provided, default to 1
    return eval(result[0]); // Evaluate the string to handle fractions, decimals, or both
  };
  
  this.getUnit = function(input) {
    // Separate unit from number
    const unitRegex = /[a-zA-Z]+$/;
    const result = input.match(unitRegex);
    
    if (result === null) return null; // No unit provided
    const unit = result[0].toLowerCase();
    
    // Convert to standard units
    switch(unit) {
      case 'gal':
        return 'gal';
      case 'l':
        return 'L';
      case 'lbs':
        return 'lbs';
      case 'kg':
        return 'kg';
      case 'mi':
        return 'mi';
      case 'km':
        return 'km';
      default:
        return null; // Invalid unit
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    // Convert from initial unit to target unit
    switch(initUnit) {
      case 'gal':
        return 'L';
      case 'L':
        return 'gal';
      case 'lbs':
        return 'kg';
      case 'kg':
        return 'lbs';
      case 'mi':
        return 'km';
      case 'km':
        return 'mi';
      default:
        return null; // Invalid unit
    }
  };

  this.spellOutUnit = function(unit) {
    // Spell out units for the return string
    switch(unit) {
      case 'gal':
        return 'gallons';
      case 'L':
        return 'liters';
      case 'lbs':
        return 'pounds';
      case 'kg':
        return 'kilograms';
      case 'mi':
        return 'miles';
      case 'km':
        return 'kilometers';
      default:
        return null; // Invalid unit
    }
  };
  
  this.convert = function(initNum, initUnit) {
    // Convert the input number and unit to target unit
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = null; // Invalid unit
    }
    
    // Round to 5 decimals
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    // Generate the output string
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
