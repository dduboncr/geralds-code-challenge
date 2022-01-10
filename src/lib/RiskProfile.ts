export class RiskProfile {
	dependents: number;
	age: number;
	marital_status: 'single' | 'married';
	risk_questions: [number, number, number];
	income: number;
	house: {
		ownership_status: 'owned' | 'mortgaged';
	};
	vehicle: { year: number };

	baseRiskScore: {
		auto: undefined | number;
		disability: number | undefined;
		home: number | undefined;
		life: number | undefined;
	};

	constructor(profile: {
		age: number;
		dependents: number;
		marital_status: 'single' | 'married';
		risk_questions: [number, number, number];
		income?: number;
		house?: {
			ownership_status: 'owned' | 'mortgaged';
		};
		vehicle?: { year: number };
	}) {
		// sum array of numbers
		const sum = (arr: [number, number, number]) => arr.reduce((a, b) => a + b, 0);

		this.age = profile.age;
		this.dependents = profile.dependents;
		this.marital_status = profile.marital_status;
		this.risk_questions = profile.risk_questions;
		this.income = profile.income;
		this.house = profile.house;
		this.vehicle = profile.vehicle;

		const baseRiskScore: {
			auto: undefined | number;
			disability: number | undefined;
			home: number | undefined;
			life: number | undefined;
		} = {
			auto: sum(this.risk_questions),
			disability: sum(this.risk_questions),
			home: sum(this.risk_questions),
			life: sum(this.risk_questions),
		};

		this.baseRiskScore = baseRiskScore;
		console.log({
			baseRiskScore,
			age: this.age,
			dependents: this.dependents,
			marital_status: this.marital_status,
			risk_questions: this.risk_questions,
			income: this.income,
			house: this.house,
			vehicle: this.vehicle,
		});
	}

	private deductRiskPoint(currentValue: number | undefined, riskPoint: number) {
		if (currentValue === undefined) {
			return undefined;
		}

		return currentValue - riskPoint;
	}

	private addRiskPoint(currentValue: number | undefined, riskPoint: number) {
		if (currentValue === undefined) {
			return undefined;
		}

		return currentValue + riskPoint;
	}

	private getRiskScore(score: number | undefined) {
		if (score === undefined) {
			return 'ineligible';
		}

		if (score <= 0) {
			return 'economic';
		}

		if (score === 1 || score === 2) {
			return 'regular';
		}

		if (score >= 3) {
			return 'responsible';
		}
	}

	public calculateRisk() {

        const isInelegible = !this.vehicle || !this.house || !this.income;

		if (isInelegible) {
			this.baseRiskScore.auto = undefined;
			this.baseRiskScore.disability = undefined;
			this.baseRiskScore.home = undefined;

			console.log('baseRiskScore', this.baseRiskScore);
		}

		if (this.age > 60) {
			this.baseRiskScore.life = undefined;
			this.baseRiskScore.disability = undefined;
			console.log('baseRiskScore', this.baseRiskScore);
		}

		if (this.age < 30) {
			this.baseRiskScore.auto = this.deductRiskPoint(this.baseRiskScore.auto, 2);
			this.baseRiskScore.life = this.deductRiskPoint(this.baseRiskScore.auto, 2);
			this.baseRiskScore.home = this.deductRiskPoint(this.baseRiskScore.auto, 2);
			this.baseRiskScore.disability = this.deductRiskPoint(this.baseRiskScore.auto, 2);
			console.log('baseRiskScore', this.baseRiskScore);
		}

		if (this.age >= 30 && this.age <= 40) {
			this.baseRiskScore.auto = this.deductRiskPoint(this.baseRiskScore.auto, 1);
			this.baseRiskScore.life = this.deductRiskPoint(this.baseRiskScore.auto, 1);
			this.baseRiskScore.home = this.deductRiskPoint(this.baseRiskScore.auto, 1);
			this.baseRiskScore.disability = this.deductRiskPoint(this.baseRiskScore.auto, 1);
			console.log('baseRiskScore', this.baseRiskScore);
		}

		if (this.income > 200000) {
			this.baseRiskScore.auto = this.deductRiskPoint(this.baseRiskScore.auto, 1);
			this.baseRiskScore.life = this.deductRiskPoint(this.baseRiskScore.auto, 1);
			this.baseRiskScore.home = this.deductRiskPoint(this.baseRiskScore.auto, 1);
			this.baseRiskScore.disability = this.deductRiskPoint(this.baseRiskScore.auto, 1);
			console.log('baseRiskScore', this.baseRiskScore);
		}

		if (this.house?.ownership_status === 'mortgaged') {
			this.baseRiskScore.home = this.addRiskPoint(this.baseRiskScore.auto, 1);
			this.baseRiskScore.disability = this.addRiskPoint(this.baseRiskScore.auto, 1);
			console.log('baseRiskScore', this.baseRiskScore);
		}

		if (this.dependents > 0) {
			this.baseRiskScore.disability = this.addRiskPoint(this.baseRiskScore.auto, 1);
			this.baseRiskScore.life = this.addRiskPoint(this.baseRiskScore.auto, 1);
			console.log('baseRiskScore', this.baseRiskScore);
		}

		if (this.marital_status === 'married') {
			this.baseRiskScore.disability = this.deductRiskPoint(this.baseRiskScore.auto, 1);
			this.baseRiskScore.life = this.addRiskPoint(this.baseRiskScore.auto, 1);
			console.log('baseRiskScore', this.baseRiskScore);
		}

		// get todays year
		const currentYear = new Date().getFullYear();
		const isVehicleFiveYearsOld = currentYear - this.vehicle?.year >= 5;

		if (isVehicleFiveYearsOld) {
			this.baseRiskScore.auto = this.addRiskPoint(this.baseRiskScore.auto, 1);
		}

		console.log('baseRiskScore', this.baseRiskScore);
		const riskScore = {
			auto: this.getRiskScore(this.baseRiskScore.auto),
			disability: this.getRiskScore(this.baseRiskScore.disability),
			home: this.getRiskScore(this.baseRiskScore.home),
			life: this.getRiskScore(this.baseRiskScore.life),
		};

		return riskScore;
	}
}
