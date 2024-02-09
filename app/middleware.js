import express from 'express'
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

const globalMiddlewares=[morgan('dev'),cors({ origin: 'http://localhost:3000', credentials: true }),express.json(),cookieParser()];

export default globalMiddlewares