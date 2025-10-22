import { formatCurrency } from "../../scripts/utils/money.js";

describe('Test suite: formatCurrency', () =>{
  it('converts cents to dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with zero', () =>{
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds numbers then converts to dollars', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });
  
  it('rounds number then converts to dollars', () =>{
    expect(formatCurrency(200.3)).toEqual('2.00');
  });
});