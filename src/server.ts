// express server
import * as express from 'express';
import { getRiskProfile } from './controllers/riskProfile';

const app = express();


// body parser
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/risk/profile', getRiskProfile)

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
