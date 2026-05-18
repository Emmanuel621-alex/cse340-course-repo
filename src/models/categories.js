import db from './db.js';

const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM public.categories;
    `;

    const result = await db.query(query);
    return result.rows;
};

// Get single category by ID
const getCategoryById = async (categoryId) => {
    const query = `
        SELECT category_id, name
        FROM public.categories
        WHERE category_id = $1;
    `;

    const result = await db.query(query, [categoryId]);
    return result.rows[0];
};

// Get category details
const getCategoryDetails = async (categoryId) => {
    const query = `
        SELECT category_id, name
        FROM public.categories
        WHERE category_id = $1;
    `;

    const result = await db.query(query, [categoryId]);
    return result.rows[0];
};

// Get categories for a project
const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT
            c.category_id,
            c.name
        FROM categories c
        JOIN project_categories pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1;
    `;

    const result = await db.query(query, [projectId]);
    return result.rows;
};

// Get projects for a category
const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.location,
            sp.project_date,
            sp.organization_id
        FROM service_projects sp
        JOIN project_categories pc
            ON sp.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY sp.project_date;
    `;

    const result = await db.query(query, [categoryId]);
    return result.rows;
};

// Create new category
const createCategory = async (name) => {
    const query = `
        INSERT INTO categories (name)
        VALUES ($1)
        RETURNING *;
    `;

    const result = await db.query(query, [name]);
    return result.rows[0];
};

// Update category
const updateCategory = async (categoryId, name) => {
    const query = `
        UPDATE categories
        SET name = $1
        WHERE category_id = $2
        RETURNING *;
    `;

    const result = await db.query(query, [name, categoryId]);
    return result.rows[0];
};

const assignCategoryToProject = async (projectId, categoryId) => {
    const query = `
        INSERT INTO project_categories (project_id, category_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [projectId, categoryId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
    const deleteQuery = `
        DELETE FROM project_categories
        WHERE project_id = $1;
    `;

    await db.query(deleteQuery, [projectId]);

    for (const categoryId of categoryIds) {
        await assignCategoryToProject(projectId, categoryId);
    }
};

export {
    getAllCategories,
    getCategoryById,
    getCategoryDetails,
    getCategoriesByProjectId,
    getProjectsByCategoryId,
    createCategory,
    updateCategory,
    updateCategoryAssignments
};