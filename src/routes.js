import express from 'express';

import { showHomePage } from './controllers/index.js';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './controllers/organizations.js';

import {
    showProjectsPage,
    showProjectsByOrganizationIdPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    projectValidation
} from './controllers/projects.js';

import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
} from './controllers/categories.js';

import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);

// Organization routes
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

router.get('/edit-organization/:id', showEditOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// Project routes
router.get('/projects', showProjectsPage);
router.get('/projects/organization/:organizationId', showProjectsByOrganizationIdPage);
router.get('/project/:id', showProjectDetailsPage);

router.get('/new-project', showNewProjectForm);
router.post('/new-project', projectValidation, processNewProjectForm);

router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', projectValidation, processEditProjectForm);

// Category routes
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

// New category routes
router.get('/new-category', showNewCategoryForm);
router.post('/new-category', categoryValidation, processNewCategoryForm);

// Edit category routes
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);

// Assign categories routes
router.get('/project/:projectId/assign-categories', showAssignCategoriesForm);
router.post('/project/:projectId/assign-categories', processAssignCategoriesForm);

// Error-handling routes
router.get('/test-error', testErrorPage);

export default router;