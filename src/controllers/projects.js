// Import model functions
import { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects } from '../models/projects.js';
import { getProjectDetails } from '../models/projects.js';
// Constant for number of projects
const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Controller functions
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};

const showProjectsByOrganizationIdPage = async (req, res) => {
    const organizationId = req.params.organizationId;
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = 'Projects by Organization';

    res.render('projects', { title, projects });
};
const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;

    const project = await getProjectDetails(projectId);

    const title = 'Service Project Details';

    res.render('project', { title, project });
};
// Export controller functions
export { showProjectsPage, showProjectsByOrganizationIdPage, showProjectDetailsPage };