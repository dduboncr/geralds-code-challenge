import { Request, Response } from 'express';
import { RiskProfile } from '../lib/RiskProfile';

export const getRiskProfile = (req: Request, res: Response) => {
	const { age, dependents, house, income, marital_status, risk_questions, vehicle } = req.body;

	const risk = new RiskProfile({
		age,
		dependents,
		income,
		marital_status,
		risk_questions,
		vehicle,
		house,
	});

	const riskProfile = risk.calculateRisk();

	res.json(riskProfile);
};
