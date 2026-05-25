import { body, validationResult } from 'express-validator';

import {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId,
    getCategoriesByProjectId,
    updateCategoryAssignments,
    createCategory,
    updateCategory
} from '../models/categories.js';

import { getProjectDetails } from '../models/projects.js';

// Validation rules
const categoryValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Category name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters')
];

// Main categories page
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};

// Category details page
const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const category = await getCategoryById(categoryId);

        if (!category) {
            req.flash('error', 'Category not found.');
            return res.redirect('/categories');
        }

        const projects = await getProjectsByCategoryId(categoryId);
        const title = 'Category Details';

        res.render('category', {
            title,
            category,
            projects
        });
    } catch (error) {
        console.error('Error loading category details:', error);
        req.flash('error', 'Unable to load category details.');
        res.redirect('/categories');
    }
};

// Show new category form
const showNewCategoryForm = async (req, res) => {
    const title = 'Add New Category';

    res.render('new-category', { title });
};

// Process new category form
const processNewCategoryForm = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-category');
    }

    const { name } = req.body;

    try {
        await createCategory(name);

        req.flash('success', 'Category created successfully!');
        res.redirect('/categories');
    } catch (error) {
        console.error('Error creating category:', error);
        req.flash('error', 'There was an error creating the category.');
        res.redirect('/new-category');
    }
};

// Show edit category form
const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const category = await getCategoryById(categoryId);

        if (!category) {
            req.flash('error', 'Category not found.');
            return res.redirect('/categories');
        }

        const title = 'Edit Category';

        res.render('edit-category', {
            title,
            category
        });
    } catch (error) {
        console.error('Error loading edit category form:', error);
        req.flash('error', 'Unable to load category.');
        res.redirect('/categories');
    }
};

// Process edit category form
const processEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect(`/edit-category/${categoryId}`);
    }

    const { name } = req.body;

    try {
        await updateCategory(categoryId, name);

        req.flash('success', 'Category updated successfully!');
        res.redirect(`/category/${categoryId}`);
    } catch (error) {
        console.error('Error updating category:', error);
        req.flash('error', 'There was an error updating the category.');
        res.redirect(`/edit-category/${categoryId}`);
    }
};

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    try {
        const projectDetails = await getProjectDetails(projectId);
        const categories = await getAllCategories();
        const assignedCategories = await getCategoriesByProjectId(projectId);

        if (!projectDetails) {
            req.flash('error', 'Project not found.');
            return res.redirect('/projects');
        }

        const title = 'Assign Categories to Project';

        res.render('assign-categories', {
            title,
            projectId,
            projectDetails,
            categories,
            assignedCategories
        });
    } catch (error) {
        console.error('Error loading assign categories form:', error);
        req.flash('error', 'Unable to load the assign categories form.');
        res.redirect('/projects');
    }
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categories || [];

    const categoryIdsArray = Array.isArray(selectedCategoryIds)
        ? selectedCategoryIds
        : [selectedCategoryIds];

    try {
        await updateCategoryAssignments(projectId, categoryIdsArray);

        req.flash('success', 'Categories updated successfully.');
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        console.error('Error updating category assignments:', error);
        req.flash('error', 'There was an error updating the categories.');
        res.redirect(`/project/${projectId}/assign-categories`);
    }
};

// Export controller functions
export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    categoryValidation
};