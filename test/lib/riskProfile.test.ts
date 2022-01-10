import { RiskProfile } from "../../src/lib/RiskProfile";

describe('RiskProfile', () => {

    it('should return ineligible when income 0', () => {
        const riskProfile = new RiskProfile({
			age: 30,
			dependents: 1,
			income: 0,
			marital_status: 'single',
			risk_questions: [1, 2, 3],
			house: {
				ownership_status: 'owned',
			},
			vehicle: {
				year: 2018,
			},
		});

		expect(riskProfile.calculateRisk()).toEqual({
			auto: "ineligible",
			disability: "ineligible",
			home: "ineligible",
			life: "ineligible",
		});
    })
	it('should calculate risk score all insurance for responsible ', () => {
		const riskProfile = new RiskProfile({
			age: 30,
			dependents: 1,
			income: 200000,
			marital_status: 'single',
			risk_questions: [1, 2, 3],
			house: {
				ownership_status: 'owned',
			},
			vehicle: {
				year: 2018,
			},
		});

		expect(riskProfile.calculateRisk()).toEqual({
			auto: "responsible",
			disability: "responsible",
			home: "responsible",
			life: "responsible",
		});
	});
    it('should calculate risk score all insurance for economic and regular ', () => {
		const riskProfile = new RiskProfile({
			age: 33,
			dependents: 0,
			income: 100000,
			marital_status: 'married',
			risk_questions: [0, 1, 0],
			house: {
				ownership_status: 'mortgaged',
			},
			vehicle: {
				year: 2020,
			},
		});

		expect(riskProfile.calculateRisk()).toEqual({
			auto: "economic",
			disability: "economic",
			home: "regular",
			life: "regular",
		});
	});

    it('should calculate risk score all insurance for all economic', () => {
		const riskProfile = new RiskProfile({
			age: 26,
			dependents: 0,
			income: 2000,
			marital_status: 'single',
			risk_questions: [0, 0, 0],
			house: {
				ownership_status: 'mortgaged',
			},
			vehicle: {
				year: 2010,
			},
		});

		expect(riskProfile.calculateRisk()).toEqual({
			auto: "economic",
			disability: "economic",
			home: "economic",
			life: "economic",
		});
	});
});
