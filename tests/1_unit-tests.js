const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('Whole number input', function() {
        const input = '5kg';
        assert.equal(convertHandler.getNum(input), 5);
    });

    test('Decimal number input', function() {
        const input = '2.5kg';
        assert.equal(convertHandler.getNum(input), 2.5);
    });

    test('Fractional input', function() {
        const input = '1/2kg';
        assert.equal(convertHandler.getNum(input), 0.5);
    });

    test('Fractional input with a decimal', function() {
        const input = '2.5/5kg';
        assert.equal(convertHandler.getNum(input), 0.5);
    });

    test('Error on a double-fraction', function() {
        const input = '3/2/3kg';
        assert.equal(convertHandler.getNum(input), null);
    });

    test('Fractional input', function() {
        const input = 'kg';
        assert.equal(convertHandler.getNum(input), 1);
    });

    test('Valid input units', function() {
        assert.equal(convertHandler.getUnit('5gal'), 'gal');
        assert.equal(convertHandler.getUnit('10L'), 'L');
        assert.equal(convertHandler.getUnit('15lbs'), 'lbs');
        assert.equal(convertHandler.getUnit('20kg'), 'kg');
        assert.equal(convertHandler.getUnit('25mi'), 'mi');
        assert.equal(convertHandler.getUnit('30km'), 'km');
    });

    test('Error for invalid input unit', function() {
        assert.equal(convertHandler.getUnit('5g'), null);
        assert.equal(convertHandler.getUnit('10liters'), null);
        assert.equal(convertHandler.getUnit('15pounds'), null);
        assert.equal(convertHandler.getUnit('20kilograms'), null);
        assert.equal(convertHandler.getUnit('25miles'), null);
        assert.equal(convertHandler.getUnit('30kilometers'), null);
    });

    test('Return unit for valid input unit', function() {
        assert.equal(convertHandler.getReturnUnit('gal'), 'L');
        assert.equal(convertHandler.getReturnUnit('L'), 'gal');
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
        assert.equal(convertHandler.getReturnUnit('mi'), 'km');
        assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    });
      
      
    test('Spelled-out string unit for valid input unit', function() {
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
        assert.equal(convertHandler.spellOutUnit('L'), 'liters');
        assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
        assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
    });

    test('Convert gal to L', function() {
        assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
    });

    test('Convert L to gal', function() {
        assert.equal(convertHandler.convert(1, 'L'), 0.26417);
    });
      
    test('Convert mi to km', function() {
        assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
    });
      
    test('Convert km to mi', function() {
        assert.equal(convertHandler.convert(1, 'km'), 0.62137);
    });
      
    test('Convert lbs to kg', function() {
        assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
    });
      
    test('Convert kg to lbs', function() {
        assert.equal(convertHandler.convert(1, 'kg'), 2.20462);
    });
});