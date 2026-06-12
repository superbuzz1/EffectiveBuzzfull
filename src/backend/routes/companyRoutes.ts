// src/backend/routes/companyRoutes.ts
import { Router } from 'express';
import { CompanyController } from '../controllers/CompanyController';
import { authenticateAccessToken } from '../middleware/authMiddleware';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();
const companyLimiter = rateLimiter({ limit: 65, windowSec: 60 });

// Secure all company-management endpoints with JWT bearer validation
router.use(authenticateAccessToken);

// Company workflows
router.get('/', companyLimiter, CompanyController.listCompanies);
router.post('/', companyLimiter, CompanyController.createCompany);
router.get('/industries', companyLimiter, CompanyController.listIndustries);
router.put('/:id', companyLimiter, CompanyController.updateCompany);
router.delete('/:id', companyLimiter, CompanyController.deleteCompany);
router.post('/:id/notes', companyLimiter, CompanyController.addCompanyNote);
router.post('/:id/restore', companyLimiter, CompanyController.restoreCompany);
router.post('/import-csv', companyLimiter, CompanyController.importCompaniesCSV);

export default router;
