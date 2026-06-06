import express from 'express';
import cors from 'cors';
import tasksRouter from './routes/tasks';
import teamMembersRouter from './routes/teamMembers';

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/tasks', tasksRouter);
app.use('/api/team-members', teamMembersRouter);

export default app;
