import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT project_id, organization_id, title, description, location, project_date
        FROM public.service_projects;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM public.service_projects
        WHERE organization_id = $1
        ORDER BY date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};
export {getAllProjects, getProjectsByOrganizationId};