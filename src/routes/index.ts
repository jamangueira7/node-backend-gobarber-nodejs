// src/routes/index.ts
import express, { Router } from 'express';
import appointmentsRouter from "./appiontments.routes";

const routes = Router();

routes.use('/appointments', appointmentsRouter);

export default routes;
